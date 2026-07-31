import React, { useState, useEffect } from 'react';
import { X, PlusCircle, MinusCircle, Check, Lock, Edit2 } from 'lucide-react';
import { MOCK_GOOD_BEHAVIORS, MOCK_BAD_BEHAVIORS, calculateConductRating } from '../data/initialData';

export default function BehaviorActionModal({
  isOpen,
  onClose,
  onAddBehaviorLog,
  student,
  defaultType = 'BONUS' // 'BONUS' (+) | 'PENALTY' (-)
}) {
  if (!isOpen || !student) return null;

  const [type, setType] = useState(defaultType);
  const [selectedBehavior, setSelectedBehavior] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [note, setNote] = useState('');
  const [points, setPoints] = useState(5);
  const [pointsInput, setPointsInput] = useState('5');

  useEffect(() => {
    setType(defaultType);
    const catalog = defaultType === 'BONUS' ? MOCK_GOOD_BEHAVIORS : MOCK_BAD_BEHAVIORS;
    if (catalog.length > 0) {
      setSelectedBehavior(catalog[0].title);
      setPoints(catalog[0].points);
      setPointsInput(String(Math.abs(catalog[0].points)));
    }
    setCustomTitle('');
    setNote('');
  }, [defaultType, student, isOpen]);

  const isCustom = selectedBehavior === 'OTHER';
  const catalog = type === 'BONUS' ? MOCK_GOOD_BEHAVIORS : MOCK_BAD_BEHAVIORS;

  const handleSelectBehavior = (e) => {
    const val = e.target.value;
    setSelectedBehavior(val);

    if (val === 'OTHER') {
      setCustomTitle('');
      setPoints(type === 'BONUS' ? 5 : -5);
      setPointsInput('5');
    } else {
      const found = catalog.find(b => b.title === val);
      if (found) {
        setPoints(found.points);
        setPointsInput(String(Math.abs(found.points)));
      }
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    const newCatalog = newType === 'BONUS' ? MOCK_GOOD_BEHAVIORS : MOCK_BAD_BEHAVIORS;
    setSelectedBehavior(newCatalog[0].title);
    setPoints(newCatalog[0].points);
    setPointsInput(String(Math.abs(newCatalog[0].points)));
    setCustomTitle('');
    setNote('');
  };

  const handleCustomPointsChange = (e) => {
    const val = e.target.value;
    // Allow empty string so user can clear input completely without sticking 0
    if (val === '') {
      setPointsInput('');
      return;
    }
    // Strict numeric validation (only allow positive digits)
    if (/^\d*$/.test(val)) {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed) && parsed <= 100) {
        setPointsInput(parsed === 0 ? '0' : String(parsed));
      }
    }
  };

  // Calculate current score & preview score
  const logs = student.behaviorLogs || [];
  const currentBonus = logs.filter(l => l.type === 'BONUS').reduce((acc, curr) => acc + curr.points, 0);
  const currentPenalty = logs.filter(l => l.type === 'PENALTY').reduce((acc, curr) => acc + Math.abs(curr.points), 0);
  const currentTotal = (student.baseScore || 100) + currentBonus - currentPenalty;

  const activePoints = isCustom ? (parseInt(pointsInput, 10) || 0) : Math.abs(Number(points));
  const pointDelta = type === 'BONUS' ? activePoints : -activePoints;
  const previewScore = Math.max(0, currentTotal + pointDelta);
  const previewRating = calculateConductRating(previewScore);

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalTitle = isCustom ? customTitle.trim() : selectedBehavior;
    if (!finalTitle) {
      alert('Vui lòng chọn hoặc nhập tên hành vi rèn luyện!');
      return;
    }

    if (isCustom) {
      const parsedPoints = parseInt(pointsInput, 10);
      if (isNaN(parsedPoints) || parsedPoints <= 0) {
        alert('Vui lòng nhập số điểm rèn luyện hợp lệ (là số nguyên lớn hơn 0)!');
        return;
      }
    }

    const newLog = {
      id: 'LOG_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      type: type,
      title: finalTitle,
      note: note.trim(),
      points: pointDelta,
      loggedBy: 'GVCN'
    };

    onAddBehaviorLog(student.id, newLog);
    onClose();
  };

  return (
    /* Fix: Modal overlay no longer closes on backdrop click/hover so editing is never lost */
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: 540 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {type === 'BONUS' ? <PlusCircle size={20} color="#137333" /> : <MinusCircle size={20} color="#c5221f" />}
            <div>
              <h3 style={{ fontSize: 16 }}>{type === 'BONUS' ? 'Ghi Nhận Hành Vi Tốt (+ Điểm)' : 'Ghi Nhận Vi Phạm (- Điểm)'}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Học sinh: <strong>{student.name}</strong> ({student.code}) — Lớp {student.className}
              </p>
            </div>
          </div>
          <button className="icon-action-btn" type="button" onClick={onClose} title="Đóng hộp thoại">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Mode Switcher Buttons */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <button
                type="button"
                className={`toolbar-btn ${type === 'BONUS' ? 'active' : ''}`}
                style={{ flex: 1, justifyContent: 'center', padding: 8, color: type === 'BONUS' ? '#137333' : 'inherit' }}
                onClick={() => handleTypeChange('BONUS')}
              >
                <PlusCircle size={16} /> <strong>+ Cộng Điểm Hành Vi Tốt</strong>
              </button>

              <button
                type="button"
                className={`toolbar-btn ${type === 'PENALTY' ? 'active' : ''}`}
                style={{ flex: 1, justifyContent: 'center', padding: 8, color: type === 'PENALTY' ? '#c5221f' : 'inherit' }}
                onClick={() => handleTypeChange('PENALTY')}
              >
                <MinusCircle size={16} /> <strong>- Trừ Điểm Vi Phạm</strong>
              </button>
            </div>

            {/* Field 1: Behavior Select */}
            <div className="form-group">
              <label>1. Chọn Danh Mục Hành Vi Rèn Luyện</label>
              <select
                className="form-select"
                style={{ fontWeight: 500 }}
                value={selectedBehavior}
                onChange={handleSelectBehavior}
              >
                {catalog.map((b, idx) => (
                  <option key={idx} value={b.title}>
                    {b.title} ({b.points > 0 ? `+${b.points}` : `${b.points}`} điểm)
                  </option>
                ))}
                <option value="OTHER">✨ Hành vi Khác (Tự nhập nội dung & tự điều chỉnh điểm)...</option>
              </select>
            </div>

            {/* Field 1.5 (If Custom): Custom Title Input */}
            {isCustom && (
              <div className="form-group" style={{ background: '#f8f9fa', padding: 10, borderRadius: 6, border: '1px solid var(--border-light)' }}>
                <label style={{ color: 'var(--google-blue)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Edit2 size={13} /> Tên hành vi rèn luyện tùy chỉnh *
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập tên hành vi khác..."
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  required={isCustom}
                />
              </div>
            )}

            {/* Field 2 (Middle): Note / Comment (Cố định ở giữa) */}
            <div className="form-group">
              <label>2. Ghi Chú Chi Tiết / Lý Do Hành Vi (Tùy chọn)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ví dụ: Nhặt được ví tiền tại sân trường lúc 9h30, Trả bạn cùng lớp..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* Field 3: Points Input (Disabled if preset selected, enabled ONLY if OTHER selected) */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>3. Số Điểm Rèn Luyện ({type === 'BONUS' ? 'Cộng' : 'Trừ'})</label>
                {!isCustom ? (
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Lock size={12} /> Cố định theo danh mục hành vi
                  </span>
                ) : (
                  <span style={{ fontSize: 11, color: 'var(--google-blue)', fontWeight: 600 }}>
                    ✏️ Mở khóa cho phép nhập tự do
                  </span>
                )}
              </div>

              <input
                type="text"
                inputMode="numeric"
                className="form-input"
                value={isCustom ? pointsInput : Math.abs(points)}
                disabled={!isCustom}
                placeholder="Nhập số điểm..."
                style={{
                  background: !isCustom ? '#f1f3f4' : '#fff',
                  cursor: !isCustom ? 'not-allowed' : 'text',
                  fontWeight: 700,
                  fontSize: 15,
                  color: type === 'BONUS' ? '#137333' : '#c5221f'
                }}
                onChange={handleCustomPointsChange}
                required
              />
            </div>

            {/* Live Point & Rating Preview Box */}
            <div style={{
              background: type === 'BONUS' ? '#e6f4ea' : '#fce8e6',
              padding: 12,
              borderRadius: 8,
              border: `1px solid ${type === 'BONUS' ? '#ceebe1' : '#f5c6cb'}`,
              marginTop: 4
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Điểm rèn luyện hiện tại: <strong>{currentTotal} điểm</strong></span>
                <span style={{ fontSize: 13, fontWeight: 700, color: type === 'BONUS' ? '#137333' : '#c5221f' }}>
                  {pointDelta > 0 ? `+${pointDelta}` : `${pointDelta}`} điểm
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingTop: 6, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Tổng điểm sau thay đổi:</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {previewScore} điểm (<span style={{ color: previewRating === 'Tốt' ? '#137333' : previewRating === 'Khá' ? '#1a73e8' : '#c5221f' }}>HK {previewRating}</span>)
                </span>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{
                background: type === 'BONUS' ? '#137333' : '#c5221f',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Check size={16} />
              <span>Xác Nhận {type === 'BONUS' ? '+ Cộng Điểm' : '- Trừ Điểm'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
