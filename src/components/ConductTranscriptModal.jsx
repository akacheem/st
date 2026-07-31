import React from 'react';
import { X, Printer, ShieldCheck, Award, FileText, CheckCircle2, History } from 'lucide-react';
import { calculateConductRating } from '../data/initialData';

export default function ConductTranscriptModal({
  isOpen,
  onClose,
  student,
  activeClass
}) {
  if (!isOpen || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  const logs = student.behaviorLogs || [];
  const baseScore = student.baseScore || 100;

  const totalBonus = logs.filter(l => l.type === 'BONUS').reduce((acc, curr) => acc + curr.points, 0);
  const totalPenalty = logs.filter(l => l.type === 'PENALTY').reduce((acc, curr) => acc + Math.abs(curr.points), 0);
  const currentTotal = Math.max(0, baseScore + totalBonus - totalPenalty);
  const rating = calculateConductRating(currentTotal);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: 840, width: '90%', maxHeight: '90vh', background: 'var(--bg-workspace)', padding: 16 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={20} color="#1a73e8" />
            <h3 style={{ fontSize: 16 }}>Phiếu Đánh Giá Điểm Rèn Luyện Cá Nhân (100 Điểm Ban Đầu)</h3>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-primary" onClick={handlePrint} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Printer size={16} /> In Phiếu Điểm A4
            </button>
            <button className="icon-action-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{ overflowY: 'auto', paddingRight: 4 }}>
          {/* Printable A4 Paper Document */}
          <div className="doc-page" style={{ margin: '0 auto', boxShadow: 'none', borderWidth: 1, minHeight: 'auto', padding: '36px 44px' }}>
            
            {/* School Header */}
            <div className="doc-page-header">
              <div className="school-header">
                <div className="school-info">
                  <h4>SỞ GIÁO DỤC VÀ ĐÀO TẠO</h4>
                  <h3>TRƯỜNG THPT AN PHÚ</h3>
                </div>
                <div className="doc-meta">
                  <p><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p>
                  <p style={{ fontStyle: 'italic' }}>Độc lập - Tự do - Hạnh phúc</p>
                </div>
              </div>

              <div className="doc-main-title">
                <h1>PHIẾU ĐÁNH GIÁ ĐIỂM RÈN LUYỆN & ĐẠO ĐỨC HỌC SINH</h1>
                <p style={{ fontStyle: 'italic', fontSize: 13 }}>Năm học 2025 - 2026</p>
              </div>
            </div>

            {/* Student Meta Profile & Score Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', background: '#f8f9fa', padding: 16, borderRadius: 8, border: '1px solid var(--border-light)', marginBottom: 20 }}>
              <div><strong>Họ và tên học sinh:</strong> <span style={{ color: 'var(--google-blue)', fontSize: 15, fontWeight: 700 }}>{student.name}</span></div>
              <div><strong>Mã Học Sinh:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>{student.code}</span></div>
              <div><strong>Lớp:</strong> {student.className} (Khối {student.grade})</div>
              <div><strong>Giáo viên chủ nhiệm:</strong> {activeClass ? activeClass.headTeacher : '—'}</div>
              <div><strong>Điểm Khởi Điểm:</strong> <span style={{ fontWeight: 600 }}>100 điểm</span></div>
              <div>
                <strong>Tổng Điểm Rèn Luyện:</strong>{' '}
                <span style={{ fontSize: 16, fontWeight: 700, color: rating === 'Tốt' ? '#137333' : '#1a73e8' }}>
                  {currentTotal} điểm
                </span>{' '}
                <span className={`badge ${rating === 'Tốt' ? 'badge-xuatsac' : 'badge-gioi'}`} style={{ marginLeft: 6 }}>
                  Hạnh kiểm {rating}
                </span>
              </div>
            </div>

            {/* Itemized Behavior Transaction Ledger Table */}
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
              I. NHẬT KÝ CHI TIẾT BIẾN ĐỘNG ĐIỂM RÈN LUYỆN
            </h4>

            {logs.length === 0 ? (
              <div style={{ padding: 16, textAlign: 'center', background: '#fff', border: '1px solid var(--border-light)', borderRadius: 6, marginBottom: 20, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                Học sinh chưa có lượt cộng / trừ điểm nào. Giữ nguyên 100/100 điểm rèn luyện ban đầu.
              </div>
            ) : (
              <table className="docs-table" style={{ marginBottom: 20 }}>
                <thead>
                  <tr>
                    <th style={{ width: 40, textAlign: 'center' }}>STT</th>
                    <th style={{ width: 95 }}>Ngày ghi</th>
                    <th>Nội dung hành vi rèn luyện (Cộng / Trừ điểm)</th>
                    <th style={{ width: 100, textAlign: 'center' }}>Số điểm</th>
                    <th style={{ width: 120 }}>Người ghi nhận</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={log.id}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ fontSize: 12 }}>{log.date}</td>
                      <td>
                        <span style={{ fontWeight: 500, color: log.type === 'BONUS' ? '#137333' : '#c5221f' }}>
                          {log.type === 'BONUS' ? '➕ ' : '➖ '} {log.title}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: log.type === 'BONUS' ? '#137333' : '#c5221f' }}>
                        {log.points > 0 ? `+${log.points}` : `${log.points}`}
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{log.loggedBy || 'GVCN'}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f8f9fa', fontWeight: 700 }}>
                    <td colSpan="3" style={{ textAlign: 'right' }}>TỔNG ĐIỂM TÍCH LŨY CUỐI CÙNG:</td>
                    <td style={{ textAlign: 'center', color: 'var(--google-blue)', fontSize: 15 }}>
                      {currentTotal} / 100
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            )}

            {/* Homeroom Teacher Qualitative Comments */}
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              II. NHẬN XÉT ĐÁNH GIÁ CỦA GIÁO VIÊN CHỦ NHIỆM
            </h4>
            <div style={{ background: '#f8f9fa', padding: 14, borderRadius: 6, border: '1px solid var(--border-light)', fontSize: 13, lineHeight: 1.6, marginBottom: 24, fontStyle: 'italic' }}>
              "{student.teacherComment || 'Học sinh có ý thức tự giác rèn luyện đạo đức tốt, chấp hành nghiêm túc quy định nhà trường.'}"
            </div>

            {/* Parent Feedback Section */}
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              III. Ý KIẾN PHẢN HỒI CỦA PHỤ HUYNH HỌC SINH
            </h4>
            <div style={{ border: '1px dashed var(--border-light)', padding: 12, borderRadius: 6, minHeight: 45, marginBottom: 28, fontSize: 12, color: 'var(--text-muted)' }}>
              (Phụ huynh học sinh ghi ý kiến phản hồi hoặc ký tên xác nhận...)
            </div>

            {/* Signatures */}
            <div className="doc-page-footer">
              <div className="signature-block">
                <p><strong>PHỤ HUYNH HỌC SINH</strong></p>
                <p style={{ fontStyle: 'italic', fontSize: 11 }}>(Ký và ghi rõ họ tên)</p>
                <div className="signature-space"></div>
              </div>

              <div className="signature-block">
                <p><strong>GIÁO VIÊN CHỦ NHIỆM</strong></p>
                <p style={{ fontStyle: 'italic', fontSize: 11 }}>(Ký và ghi rõ họ tên)</p>
                <div className="signature-space"></div>
                <p style={{ fontWeight: 600 }}></p>
              </div>

              <div className="signature-block">
                <p style={{ fontStyle: 'italic', fontSize: 11 }}>Ngày ..... tháng ..... năm 2025</p>
                <p><strong>HIỆU TRƯỜNG</strong></p>
                <p style={{ fontStyle: 'italic', fontSize: 11 }}>(Ký và đóng dấu)</p>
                <div className="signature-space"></div>
                <p style={{ fontWeight: 600 }}></p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
