import React, { useState } from 'react';
import { X, FolderPlus, AlertCircle } from 'lucide-react';

export default function AddClassModal({
  isOpen,
  onClose,
  onAddClass,
  grades,
  currentGrade
}) {
  if (!isOpen) return null;

  const [grade, setGrade] = useState(currentGrade || 10);
  const [className, setClassName] = useState(`${currentGrade || 10}A5`);
  const [headTeacher, setHeadTeacher] = useState('Thầy/Cô Chủ Nhiệm');
  const [room, setRoom] = useState('Phòng 105');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!className.trim()) {
      setError('Vui lòng nhập tên lớp học!');
      return;
    }

    onAddClass({
      id: className.trim(),
      grade: Number(grade),
      name: `Lớp ${className.trim()}`,
      headTeacher: headTeacher.trim(),
      room: room.trim(),
      totalTarget: 40
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3>Tạo Lớp Học Mới</h3>
          <button className="icon-action-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{
                background: '#fce8e6',
                color: '#c5221f',
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label>Thuộc Khối Lớp</label>
              <select
                className="form-select"
                value={grade}
                onChange={(e) => {
                  const g = Number(e.target.value);
                  setGrade(g);
                  setClassName(`${g}A${Math.floor(Math.random() * 5) + 4}`);
                }}
              >
                {grades.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Tên Lớp (Mã Lớp) *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ví dụ: 10A5, 11A4..."
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Giáo Viên Chủ Nhiệm</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ví dụ: Cô Nguyễn Thu Hà"
                value={headTeacher}
                onChange={(e) => setHeadTeacher(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phòng Học</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ví dụ: Phòng 105"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <FolderPlus size={16} />
              <span>Tạo Lớp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
