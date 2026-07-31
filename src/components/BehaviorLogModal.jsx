import React from 'react';
import { X, History, PlusCircle, MinusCircle, Trash2, ShieldCheck, Award, Printer } from 'lucide-react';
import { calculateConductRating } from '../data/initialData';

export default function BehaviorLogModal({
  isOpen,
  onClose,
  student,
  onDeleteLog,
  onOpenAddBonus,
  onOpenAddPenalty,
  onViewPrintTranscript
}) {
  if (!isOpen || !student) return null;

  const logs = student.behaviorLogs || [];
  const baseScore = student.baseScore || 100;

  const totalBonus = logs.filter(l => l.type === 'BONUS').reduce((acc, curr) => acc + curr.points, 0);
  const totalPenalty = logs.filter(l => l.type === 'PENALTY').reduce((acc, curr) => acc + Math.abs(curr.points), 0);
  const currentTotal = Math.max(0, baseScore + totalBonus - totalPenalty);
  const rating = calculateConductRating(currentTotal);

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: 720, width: '90%' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <History size={20} color="#1a73e8" />
            <div>
              <h3 style={{ fontSize: 16 }}>Sổ Nhật Ký Điểm Rèn Luyện & Ghi Chú Hành Vi</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Học sinh: <strong>{student.name}</strong> ({student.code}) — Lớp {student.className}
              </p>
            </div>
          </div>
          <button className="icon-action-btn" type="button" onClick={onClose} title="Đóng">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Summary Metric Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, background: '#f8f9fa', padding: 12, borderRadius: 8, border: '1px solid var(--border-light)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Điểm khởi điểm</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>100 đ</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#137333' }}>Tổng điểm cộng (+)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#137333' }}>+{totalBonus} đ</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#c5221f' }}>Tổng điểm trừ (-)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#c5221f' }}>-{totalPenalty} đ</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--google-blue)' }}>Điểm hiện tại</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--google-blue)' }}>
                {currentTotal} đ <span style={{ fontSize: 11, color: rating === 'Tốt' ? '#137333' : '#c5221f' }}>({rating})</span>
              </div>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              Lịch sử ghi nhận rèn luyện ({logs.length} lượt):
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: 12, color: '#137333', borderColor: '#ceebe1', background: '#e6f4ea' }}
                onClick={() => onOpenAddBonus(student)}
              >
                + Cộng điểm
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: 12, color: '#c5221f', borderColor: '#f5c6cb', background: '#fce8e6' }}
                onClick={() => onOpenAddPenalty(student)}
              >
                - Trừ điểm
              </button>
            </div>
          </div>

          {/* Timeline Table */}
          {logs.length === 0 ? (
            <div className="empty-state" style={{ padding: 24 }}>
              <p>Chưa có ghi nhận biến động điểm cho học sinh này (Đang giữ 100 điểm ban đầu).</p>
            </div>
          ) : (
            <div className="table-responsive" style={{ maxHeight: 280, overflowY: 'auto' }}>
              <table className="docs-table">
                <thead>
                  <tr>
                    <th style={{ width: 85 }}>Ngày ghi</th>
                    <th>Nội dung hành vi rèn luyện</th>
                    <th>Ghi chú chi tiết / Lý do</th>
                    <th style={{ width: 80, textAlign: 'center' }}>Điểm</th>
                    <th style={{ width: 40, textAlign: 'center' }}>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{log.date}</td>
                      <td>
                        <span style={{ fontWeight: 500, color: log.type === 'BONUS' ? '#137333' : '#c5221f' }}>
                          {log.type === 'BONUS' ? '➕ ' : '➖ '} {log.title}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                        {log.note || '—'}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: log.type === 'BONUS' ? '#137333' : '#c5221f' }}>
                        {log.points > 0 ? `+${log.points}` : `${log.points}`}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="icon-action-btn delete"
                          onClick={() => onDeleteLog(student.id, log.id)}
                          title="Xóa lượt ghi nhận này"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={() => onViewPrintTranscript(student)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Printer size={16} /> Xem & In Phiếu A4
          </button>
          <button className="btn-primary" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
