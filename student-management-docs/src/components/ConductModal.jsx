import React, { useState, useEffect } from 'react';
import { X, Award, ShieldCheck, AlertCircle, FileText, CheckCircle } from 'lucide-react';

export default function ConductModal({
  isOpen,
  onClose,
  onSave,
  student
}) {
  if (!isOpen || !student) return null;

  const [conduct, setConduct] = useState(student.conduct || 'Tốt');
  const [criteria, setCriteria] = useState(student.criteria || {
    noiQuyPhapLuat: 'Tốt',
    chuyenCanThaiDo: 'Tốt',
    daoDucLoiSong: 'Tốt',
    hoatDongDoanDoi: 'Tốt',
    veSinhTaiSan: 'Tốt'
  });

  const [rewards, setRewards] = useState(student.rewards || 'Không có');
  const [violations, setViolations] = useState(student.violations || 'Không có');
  const [teacherComment, setTeacherComment] = useState(student.teacherComment || '');

  useEffect(() => {
    if (student) {
      setConduct(student.conduct || 'Tốt');
      setCriteria(student.criteria || {
        noiQuyPhapLuat: 'Tốt',
        chuyenCanThaiDo: 'Tốt',
        daoDucLoiSong: 'Tốt',
        hoatDongDoanDoi: 'Tốt',
        veSinhTaiSan: 'Tốt'
      });
      setRewards(student.rewards || 'Không có');
      setViolations(student.violations || 'Không có');
      setTeacherComment(student.teacherComment || '');
    }
  }, [student]);

  const handleCriteriaChange = (key, value) => {
    setCriteria(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...student,
      conduct,
      criteria,
      rewards,
      violations,
      teacherComment
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={20} color="#1a73e8" />
            <div>
              <h3 style={{ fontSize: 16 }}>Đánh Giá Đạo Đức & Hạnh Kiểm</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Học sinh: <strong>{student.name}</strong> ({student.code}) — Lớp {student.className}
              </p>
            </div>
          </div>
          <button className="icon-action-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Overall Conduct Level */}
            <div className="form-group" style={{ background: 'var(--google-blue-light)', padding: 14, borderRadius: 8, border: '1px solid var(--google-blue-border)' }}>
              <label style={{ color: 'var(--google-blue)', fontSize: 13, fontWeight: 700 }}>
                XẾP LOẠI HẠNH KIỂM CHUNG HỌC KỲ / NĂM HỌC
              </label>
              <select
                className="form-select"
                style={{ fontSize: 14, fontWeight: 600, marginTop: 4, background: '#fff' }}
                value={conduct}
                onChange={(e) => setConduct(e.target.value)}
              >
                <option value="Tốt">Tốt (Xuất sắc & Gương mẫu)</option>
                <option value="Khá">Khá (Tốt, đạt chuẩn đạo đức)</option>
                <option value="Đạt">Đạt (Cần cố gắng thêm)</option>
                <option value="Chưa đạt">Chưa đạt (Vi phạm kỷ luật)</option>
              </select>
            </div>

            {/* 5 Behavior Criteria Breakdown */}
            <div style={{ marginTop: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
                Đánh giá 5 Tiêu chí Đạo đức & Rèn luyện:
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>1. Chấp hành Pháp luật & Nội quy Trường/Lớp</span>
                  <select className="form-select" style={{ fontSize: 12, padding: '2px 8px' }} value={criteria.noiQuyPhapLuat} onChange={(e) => handleCriteriaChange('noiQuyPhapLuat', e.target.value)}>
                    <option value="Tốt">Tốt</option>
                    <option value="Khá">Khá</option>
                    <option value="Đạt">Đạt</option>
                    <option value="Chưa đạt">Chưa đạt</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>2. Thái độ Học tập, Chuyên cần & Đúng giờ</span>
                  <select className="form-select" style={{ fontSize: 12, padding: '2px 8px' }} value={criteria.chuyenCanThaiDo} onChange={(e) => handleCriteriaChange('chuyenCanThaiDo', e.target.value)}>
                    <option value="Tốt">Tốt</option>
                    <option value="Khá">Khá</option>
                    <option value="Đạt">Đạt</option>
                    <option value="Chưa đạt">Chưa đạt</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>3. Đạo đức Lối sống & Lễ phép với Thầy Cô, Bạn bè</span>
                  <select className="form-select" style={{ fontSize: 12, padding: '2px 8px' }} value={criteria.daoDucLoiSong} onChange={(e) => handleCriteriaChange('daoDucLoiSong', e.target.value)}>
                    <option value="Tốt">Tốt</option>
                    <option value="Khá">Khá</option>
                    <option value="Đạt">Đạt</option>
                    <option value="Chưa đạt">Chưa đạt</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>4. Tích cực tham gia Hoạt động Đoàn/Đội & Phong trào</span>
                  <select className="form-select" style={{ fontSize: 12, padding: '2px 8px' }} value={criteria.hoatDongDoanDoi} onChange={(e) => handleCriteriaChange('hoatDongDoanDoi', e.target.value)}>
                    <option value="Tốt">Tốt</option>
                    <option value="Khá">Khá</option>
                    <option value="Đạt">Đạt</option>
                    <option value="Chưa đạt">Chưa đạt</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>5. Ý thức Giữ gìn Vệ sinh chung & Bảo vệ Tài sản</span>
                  <select className="form-select" style={{ fontSize: 12, padding: '2px 8px' }} value={criteria.veSinhTaiSan} onChange={(e) => handleCriteriaChange('veSinhTaiSan', e.target.value)}>
                    <option value="Tốt">Tốt</option>
                    <option value="Khá">Khá</option>
                    <option value="Đạt">Đạt</option>
                    <option value="Chưa đạt">Chưa đạt</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rewards & Violations */}
            <div className="form-grid" style={{ marginTop: 8 }}>
              <div className="form-group">
                <label style={{ color: '#137333' }}>Ghi nhận Khen thưởng / Tuyên dương</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ví dụ: Tuyên dương lớp trưởng gương mẫu..."
                  value={rewards}
                  onChange={(e) => setRewards(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label style={{ color: '#c5221f' }}>Nhắc nhở / Khắc phục Vi phạm</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ví dụ: Đi học muộn 1 lần..."
                  value={violations}
                  onChange={(e) => setViolations(e.target.value)}
                />
              </div>
            </div>

            {/* Homeroom Teacher Qualitative Comments */}
            <div className="form-group full-width">
              <label style={{ fontWeight: 600 }}>Nhận xét của Giáo viên Chủ Nhiệm (Đánh giá định tính)</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Nhập nhận xét chi tiết về ưu điểm, hạn chế và sự tiến bộ đạo đức của học sinh..."
                value={teacherComment}
                onChange={(e) => setTeacherComment(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle size={16} />
              <span>Lưu Đánh Giá</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
