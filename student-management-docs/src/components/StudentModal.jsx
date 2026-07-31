import React, { useState, useEffect } from 'react';
import { X, UserCheck, AlertCircle } from 'lucide-react';

export default function StudentModal({
  isOpen,
  onClose,
  onSave,
  student,
  grades,
  classes,
  currentGrade,
  currentClassId
}) {
  if (!isOpen) return null;

  const isEdit = Boolean(student && student.id);

  const [formData, setFormData] = useState({
    id: '',
    code: '',
    name: '',
    gender: 'Nam',
    dob: '2010-01-01',
    grade: currentGrade || 10,
    className: currentClassId || '10A1',
    academic: 'Giỏi',
    conduct: 'Tốt',
    phone: '',
    email: '',
    notes: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id || '',
        code: student.code || '',
        name: student.name || '',
        gender: student.gender || 'Nam',
        dob: student.dob || '2010-01-01',
        grade: student.grade || currentGrade || 10,
        className: student.className || currentClassId || '10A1',
        academic: student.academic || 'Giỏi',
        conduct: student.conduct || 'Tốt',
        phone: student.phone || '',
        email: student.email || '',
        notes: student.notes || ''
      });
    } else {
      // Auto generate code for new student
      const randomCode = '2025' + (currentGrade || 10) + Math.floor(1000 + Math.random() * 9000);
      setFormData({
        id: '',
        code: randomCode,
        name: '',
        gender: 'Nam',
        dob: '2010-01-01',
        grade: currentGrade || 10,
        className: currentClassId || '10A1',
        academic: 'Giỏi',
        conduct: 'Tốt',
        phone: '',
        email: '',
        notes: ''
      });
    }
    setError('');
  }, [student, currentGrade, currentClassId, isOpen]);

  // When grade changes in form, update available class names
  const availableClasses = classes.filter(c => c.grade === Number(formData.grade));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // If grade changed, auto select first class of that grade
      if (name === 'grade') {
        const firstCls = classes.find(c => c.grade === Number(value));
        if (firstCls) {
          updated.className = firstCls.id;
        }
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Vui lòng nhập họ và tên học sinh!');
      return;
    }
    if (!formData.code.trim()) {
      setError('Vui lòng nhập mã học sinh!');
      return;
    }

    onSave({
      ...formData,
      grade: Number(formData.grade)
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? 'Chỉnh Sửa Thông Tin Học Sinh' : 'Thêm Học Sinh Mới'}</h3>
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

            <div className="form-grid">
              <div className="form-group">
                <label>Mã Học Sinh *</label>
                <input
                  type="text"
                  name="code"
                  className="form-input"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Họ và Tên *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Giới Tính</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ngày Sinh</label>
                <input
                  type="date"
                  name="dob"
                  className="form-input"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Khối Lớp</label>
                <select
                  name="grade"
                  className="form-select"
                  value={formData.grade}
                  onChange={handleChange}
                >
                  {grades.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Lớp Học</label>
                <select
                  name="className"
                  className="form-select"
                  value={formData.className}
                  onChange={handleChange}
                >
                  {availableClasses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Học Lực</label>
                <select
                  name="academic"
                  className="form-select"
                  value={formData.academic}
                  onChange={handleChange}
                >
                  <option value="Xuất sắc">Xuất sắc</option>
                  <option value="Giỏi">Giỏi</option>
                  <option value="Khá">Khá</option>
                  <option value="Trung bình">Trung bình</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hạnh Kiểm</label>
                <select
                  name="conduct"
                  className="form-select"
                  value={formData.conduct}
                  onChange={handleChange}
                >
                  <option value="Tốt">Tốt</option>
                  <option value="Khá">Khá</option>
                  <option value="Trung bình">Trung bình</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Số Điện Thoại Phụ Huynh</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="0912..."
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email Học Sinh</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="an@hocsinh.edu.vn"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Ghi Chú / Đội Tuyển Học Sinh</label>
              <textarea
                name="notes"
                className="form-textarea"
                rows="2"
                placeholder="Ví dụ: Đội tuyển Toán, Lớp phó..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <UserCheck size={16} />
              <span>{isEdit ? 'Cập Nhật' : 'Thêm Mới'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
