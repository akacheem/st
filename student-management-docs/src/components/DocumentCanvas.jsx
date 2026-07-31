import React from 'react';
import { 
  PlusCircle, 
  MinusCircle, 
  History, 
  Printer, 
  Edit3, 
  Trash2, 
  UserPlus, 
  ShieldCheck, 
  Award,
  AlertCircle
} from 'lucide-react';
import { calculateConductRating } from '../data/initialData';

export default function DocumentCanvas({
  activeGrade,
  activeClass,
  students,
  searchQuery,
  conductFilter,
  onOpenAddBonus,
  onOpenAddPenalty,
  onViewBehaviorLog,
  onViewConductTranscript,
  onEditStudent,
  onDeleteStudent,
  onOpenAddStudent
}) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const getScoreBadgeStyle = (score) => {
    if (score >= 90) return { bg: '#e6f4ea', text: '#137333', border: '#ceebe1' };
    if (score >= 75) return { bg: '#e8f0fe', text: '#1a73e8', border: '#d2e3fc' };
    if (score >= 50) return { bg: '#fef7e0', text: '#b06000', border: '#fce8b2' };
    return { bg: '#fce8e6', text: '#c5221f', border: '#f5c6cb' };
  };

  const filteredStudents = students.filter(student => {
    if (student.grade !== activeGrade) return false;
    if (activeClass && student.className !== activeClass.id) return false;

    // Calculate score
    const logs = student.behaviorLogs || [];
    const bonus = logs.filter(l => l.type === 'BONUS').reduce((acc, curr) => acc + curr.points, 0);
    const penalty = logs.filter(l => l.type === 'PENALTY').reduce((acc, curr) => acc + Math.abs(curr.points), 0);
    const totalScore = Math.max(0, (student.baseScore || 100) + bonus - penalty);
    const rating = calculateConductRating(totalScore);

    if (conductFilter !== 'ALL' && rating !== conductFilter) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = student.name.toLowerCase().includes(query);
      const matchCode = student.code.toLowerCase().includes(query);
      const matchComment = (student.teacherComment || '').toLowerCase().includes(query);
      if (!matchName && !matchCode && !matchComment) return false;
    }

    return true;
  });

  return (
    <div className="document-canvas-container">
      <div className="doc-page">
        {/* Document Formal Header */}
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
            <h1>SỔ QUẢN LÝ ĐIỂM RÈN LUYỆN & HẠNH KIỂM {activeClass ? activeClass.name.toUpperCase() : `KHỐI ${activeGrade}`}</h1>
            <p style={{ fontStyle: 'italic', fontSize: 13, color: 'var(--text-secondary)' }}>
              Năm học 2025 - 2026 (Khởi điểm 100 điểm rèn luyện)
            </p>
          </div>

          {activeClass && (
            <div className="doc-sub-info">
              <span><strong>GVCN:</strong> </span>
              <span>•</span>
              <span><strong>Phòng học:</strong> {activeClass.room}</span>
              <span>•</span>
              <span><strong>Sĩ số:</strong> {filteredStudents.length} học sinh</span>
            </div>
          )}
        </div>

        {/* Behavior Score Table */}
        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <ShieldCheck size={48} color="#dadce0" />
            <p style={{ fontWeight: 600, marginTop: 12, color: 'var(--text-primary)' }}>
              Chưa có dữ liệu điểm rèn luyện
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              Không tìm thấy học sinh phù hợp với bộ lọc điểm rèn luyện.
            </p>
            <button
              className="btn-primary"
              onClick={onOpenAddStudent}
              style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <UserPlus size={16} /> Thêm Học Sinh Mới
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="docs-table">
              <thead>
                <tr>
                  <th style={{ width: 36, textAlign: 'center' }}>STT</th>
                  <th style={{ width: 95 }}>Mã HS</th>
                  <th style={{ width: 140 }}>Họ và Tên</th>
                  <th style={{ width: 65, textAlign: 'center' }}>Ban đầu</th>
                  <th style={{ width: 110, textAlign: 'center' }}>Điểm Hiện Tại</th>
                  <th style={{ width: 90, textAlign: 'center' }}>Xếp Loại</th>
                  <th>Hành vi rèn luyện mới nhất</th>
                  <th style={{ width: 140, textAlign: 'center' }}>Thao tác Điểm Rèn Luyện</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => {
                  const logs = student.behaviorLogs || [];
                  const bonus = logs.filter(l => l.type === 'BONUS').reduce((acc, curr) => acc + curr.points, 0);
                  const penalty = logs.filter(l => l.type === 'PENALTY').reduce((acc, curr) => acc + Math.abs(curr.points), 0);
                  const totalScore = Math.max(0, (student.baseScore || 100) + bonus - penalty);
                  const rating = calculateConductRating(totalScore);
                  const style = getScoreBadgeStyle(totalScore);

                  const latestLog = logs.length > 0 ? logs[logs.length - 1] : null;

                  return (
                    <tr key={student.id}>
                      <td style={{ textAlign: 'center', fontWeight: 500, color: 'var(--text-secondary)' }}>
                        {index + 1}
                      </td>
                      <td>
                        <span className="std-code">{student.code}</span>
                      </td>
                      <td>
                        <span className="std-name">{student.name}</span>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {student.gender} • {formatDate(student.dob)}
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
                        100 đ
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{
                          background: style.bg,
                          color: style.text,
                          border: `1px solid ${style.border}`,
                          padding: '4px 10px',
                          borderRadius: 16,
                          fontWeight: 700,
                          fontSize: 13,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4
                        }}>
                          <span>{totalScore} đ</span>
                          <span style={{ fontSize: 10, opacity: 0.8 }}>
                            ({bonus > 0 ? `+${bonus}` : ''}{penalty > 0 ? ` -${penalty}` : ''})
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`badge ${rating === 'Tốt' ? 'badge-xuatsac' : rating === 'Khá' ? 'badge-gioi' : 'badge-kha'}`}>
                          {rating}
                        </span>
                      </td>
                      <td style={{ fontSize: 12 }}>
                        {latestLog ? (
                          <div style={{ color: latestLog.type === 'BONUS' ? '#137333' : '#c5221f' }}>
                            <span>{latestLog.type === 'BONUS' ? '➕ ' : '➖ '}</span>
                            <span>{latestLog.title}</span>
                            <span style={{ fontWeight: 600, marginLeft: 4 }}>
                              ({latestLog.points > 0 ? `+${latestLog.points}` : `${latestLog.points}`}đ)
                            </span>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Giữ 100 điểm ban đầu</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="action-btn-group" style={{ justifyContent: 'center' }}>
                          <button
                            className="icon-action-btn"
                            onClick={() => onOpenAddBonus(student)}
                            title="+ Cộng điểm hành vi tốt"
                            style={{ color: '#137333' }}
                          >
                            <PlusCircle size={16} />
                          </button>
                          <button
                            className="icon-action-btn"
                            onClick={() => onOpenAddPenalty(student)}
                            title="- Trừ điểm vi phạm"
                            style={{ color: '#c5221f' }}
                          >
                            <MinusCircle size={16} />
                          </button>
                          <button
                            className="icon-action-btn"
                            onClick={() => onViewBehaviorLog(student)}
                            title="Xem nhật ký lịch sử điểm"
                            style={{ color: '#1a73e8' }}
                          >
                            <History size={16} />
                          </button>
                          <button
                            className="icon-action-btn"
                            onClick={() => onViewConductTranscript(student)}
                            title="In Phiếu A4"
                          >
                            <Printer size={15} />
                          </button>
                          <button
                            className="icon-action-btn delete"
                            onClick={() => onDeleteStudent(student.id, student.name)}
                            title="Xóa học sinh"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Document Footer */}
        <div className="doc-page-footer">
          <div className="signature-block">
            <p><strong>NGƯỜI LẬP SỔ</strong></p>
            <p style={{ fontStyle: 'italic', fontSize: 11 }}>(Ký, ghi rõ họ tên)</p>
            <div className="signature-space"></div>
            <p style={{ fontWeight: 500 }}>Văn phòng Nhà trường</p>
          </div>

          <div className="signature-block">
            <p><strong>GIÁO VIÊN CHỦ NHIỆM</strong></p>
            <p style={{ fontStyle: 'italic', fontSize: 11 }}>(Ký, ghi rõ họ tên)</p>
            <div className="signature-space"></div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}></p>
          </div>

          <div className="signature-block">
            <p style={{ fontStyle: 'italic', fontSize: 11 }}>Ngày ..... tháng ..... năm 2025</p>
            <p><strong>HIỆU TRƯỜNG</strong></p>
            <p style={{ fontStyle: 'italic', fontSize: 11 }}>(Ký và đóng dấu)</p>
            <div className="signature-space"></div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}></p>
          </div>
        </div>

      </div>
    </div>
  );
}
