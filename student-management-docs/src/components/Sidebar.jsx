import React from 'react';
import { 
  Folder, 
  FolderOpen, 
  Users, 
  Plus, 
  Award, 
  CheckCircle2, 
  GraduationCap,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export default function Sidebar({
  isOpen,
  grades,
  classes,
  students,
  activeGrade,
  setActiveGrade,
  activeClassId,
  setActiveClassId,
  onOpenAddClass
}) {
  if (!isOpen) return null;

  // Calculate totals
  const totalStudents = students.length;
  const excellentCount = students.filter(s => s.academic === 'Xuất sắc').length;
  const goodCount = students.filter(s => s.academic === 'Giỏi').length;
  const fairCount = students.filter(s => s.academic === 'Khá').length;

  return (
    <aside className={`docs-sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        <span>Danh mục Khối Lớp</span>
        <button
          className="icon-action-btn"
          onClick={onOpenAddClass}
          title="Tạo lớp học mới"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="sidebar-tree">
        {grades.map(grade => {
          const gradeClasses = classes.filter(c => c.grade === grade.id);
          const isGradeActive = activeGrade === grade.id;

          return (
            <div key={grade.id} className="tree-grade-group">
              <div 
                className="tree-grade-title"
                onClick={() => {
                  setActiveGrade(grade.id);
                  if (gradeClasses.length > 0) {
                    setActiveClassId(gradeClasses[0].id);
                  }
                }}
              >
                {isGradeActive ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {isGradeActive ? <FolderOpen size={16} color="#1a73e8" /> : <Folder size={16} color="#5f6368" />}
                <span>{grade.name}</span>
                <span className="count-badge" style={{ marginLeft: 'auto' }}>
                  {students.filter(s => s.grade === grade.id).length} HS
                </span>
              </div>

              <div className="tree-class-list">
                {gradeClasses.map(cls => {
                  const classStudentCount = students.filter(s => s.className === cls.id).length;
                  const isSelected = activeClassId === cls.id;

                  return (
                    <div
                      key={cls.id}
                      className={`tree-class-item ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        setActiveGrade(grade.id);
                        setActiveClassId(cls.id);
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <GraduationCap size={14} color={isSelected ? "#1a73e8" : "#80868b"} />
                        <span>{cls.name}</span>
                      </span>
                      <span className="count-badge">
                        {classStudentCount} HS
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics Card in Sidebar */}
      <div className="sidebar-stats">
        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Award size={14} color="#1a73e8" />
          <span>Tổng Quan Trường</span>
        </div>
        <div className="stat-row">
          <span>Tổng số học sinh:</span>
          <strong>{totalStudents}</strong>
        </div>
        <div className="stat-row">
          <span>Học sinh Xuất sắc:</span>
          <strong style={{ color: '#137333' }}>{excellentCount}</strong>
        </div>
        <div className="stat-row">
          <span>Học sinh Giỏi:</span>
          <strong style={{ color: '#1a73e8' }}>{goodCount}</strong>
        </div>
        <div className="stat-row">
          <span>Học sinh Khá:</span>
          <strong style={{ color: '#b06000' }}>{fairCount}</strong>
        </div>
      </div>
    </aside>
  );
}
