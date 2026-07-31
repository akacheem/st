import React from 'react';
import { 
  Search, 
  UserPlus, 
  PanelLeft, 
  BarChart3, 
  Table, 
  X,
  Plus,
  ShieldCheck,
  Award,
  Printer
} from 'lucide-react';

export default function Toolbar({
  grades,
  activeGrade,
  setActiveGrade,
  classes,
  activeClassId,
  setActiveClassId,
  searchQuery,
  setSearchQuery,
  conductFilter,
  setConductFilter,
  onOpenAddStudent,
  onOpenAddClass,
  viewMode,
  setViewMode,
  sidebarOpen,
  setSidebarOpen,
  onPrint
}) {
  const currentGradeClasses = classes.filter(c => c.grade === activeGrade);

  return (
    <div className="docs-toolbar">
      <div className="toolbar-group">
        <button
          className={`toolbar-btn ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Thu gọn danh mục lớp" : "Mở danh mục lớp"}
        >
          <PanelLeft size={16} />
        </button>

        <div className="toolbar-divider" />

        {/* Grade Selection Tabs */}
        <div className="grade-tabs" title="Chọn khối lớp">
          {grades.map(g => (
            <button
              key={g.id}
              className={`grade-tab-btn ${activeGrade === g.id ? 'active' : ''}`}
              onClick={() => {
                setActiveGrade(g.id);
                const firstClassOfGrade = classes.find(c => c.grade === g.id);
                if (firstClassOfGrade) {
                  setActiveClassId(firstClassOfGrade.id);
                }
              }}
            >
              {g.name}
            </button>
          ))}
        </div>

        <div className="toolbar-divider" />

        {/* Class Chips */}
        <div className="class-chip-container">
          {currentGradeClasses.map(cls => (
            <button
              key={cls.id}
              className={`class-chip ${activeClassId === cls.id ? 'active' : ''}`}
              onClick={() => setActiveClassId(cls.id)}
            >
              {cls.name}
            </button>
          ))}

          <button
            className="class-chip"
            onClick={onOpenAddClass}
            style={{ borderStyle: 'dashed', background: 'transparent' }}
            title="Thêm lớp mới vào khối này"
          >
            <Plus size={12} style={{ marginRight: 2 }} /> Tạo lớp
          </button>
        </div>
      </div>

      <div className="toolbar-group">
        {/* Search Box */}
        <div className="docs-search-box">
          <Search size={14} color="#5f6368" />
          <input
            type="text"
            placeholder="Tìm theo tên, mã HS, nhận xét..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <X 
              size={14} 
              color="#5f6368" 
              style={{ cursor: 'pointer' }} 
              onClick={() => setSearchQuery('')} 
            />
          )}
        </div>

        {/* Conduct Filter */}
        <select
          className="form-select"
          style={{ fontSize: 12, padding: '4px 8px', fontWeight: 500 }}
          value={conductFilter}
          onChange={(e) => setConductFilter(e.target.value)}
          title="Lọc theo Xếp loại Hạnh kiểm"
        >
          <option value="ALL">Tất cả xếp loại hạnh kiểm</option>
          <option value="Tốt">Hạnh kiểm Tốt</option>
          <option value="Khá">Hạnh kiểm Khá</option>
          <option value="Đạt">Hạnh kiểm Đạt</option>
          <option value="Chưa đạt">Hạnh kiểm Chưa đạt</option>
        </select>

        <div className="toolbar-divider" />

        {/* View Switchers */}
        <button
          className={`toolbar-btn ${viewMode === 'table' ? 'active' : ''}`}
          onClick={() => setViewMode('table')}
          title="Sổ Đánh Giá Hạnh Kiểm"
        >
          <ShieldCheck size={16} />
          <span>Sổ Hạnh Kiểm</span>
        </button>

        <button
          className={`toolbar-btn ${viewMode === 'stats' ? 'active' : ''}`}
          onClick={() => setViewMode('stats')}
          title="Báo Cáo Thống Kê Rèn Luyện"
        >
          <BarChart3 size={16} />
          <span>Thống Kê</span>
        </button>

        {/* Add Student Action */}
        <button
          className="btn-primary"
          onClick={onOpenAddStudent}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
        >
          <UserPlus size={16} />
          <span>Thêm Học Sinh</span>
        </button>
      </div>
    </div>
  );
}
