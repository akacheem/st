import React, { useState } from 'react';
import { 
  FileText, 
  Star, 
  Cloud, 
  Printer, 
  Download, 
  Lock,
  FileSpreadsheet
} from 'lucide-react';

export default function Header({ docTitle, setDocTitle, onPrint, onExportExcel, onExportCSV }) {
  const [isStar, setIsStar] = useState(false);

  return (
    <header className="docs-header">
      <div className="docs-header-left">
        <div className="docs-logo" title="Google Docs Student Conduct Manager">
          <FileText size={22} color="#1a73e8" />
        </div>

        <div className="docs-title-block">
          <div className="docs-title-row">
            <input
              type="text"
              className="docs-title-input"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              title="Nhấp để đổi tên tài liệu"
            />
            <Star
              size={16}
              className="star-icon"
              fill={isStar ? '#f4b400' : 'none'}
              color={isStar ? '#f4b400' : '#80868b'}
              onClick={() => setIsStar(!isStar)}
              title="Đánh dấu sao"
            />
            <div className="saved-badge" title="Tất cả thay đổi đã được tự động lưu vào bộ nhớ trình duyệt">
              <Cloud size={16} color="#5f6368" />
              <span>Đã lưu tự động</span>
            </div>
          </div>

          <div className="docs-menu-bar">
            <span className="menu-item" onClick={onPrint}><Printer size={12} style={{marginRight: 4}} /> In sổ điểm</span>
            <span className="menu-item" onClick={onExportExcel}><FileSpreadsheet size={12} style={{marginRight: 4}} /> Xuất Excel (.xls)</span>
            <span className="menu-item" onClick={onExportCSV}><Download size={12} style={{marginRight: 4}} /> Xuất CSV (.csv)</span>
            <span className="menu-item">Chỉnh sửa</span>
            <span className="menu-item">Trợ giúp</span>
          </div>
        </div>
      </div>

      <div className="docs-header-right">
        <button className="toolbar-btn" onClick={onPrint} title="In sổ điểm rèn luyện">
          <Printer size={16} />
          <span>In Sổ Điểm</span>
        </button>

        <button className="toolbar-btn" onClick={onExportExcel} style={{ color: '#137333' }} title="Tải tệp Excel chuẩn định dạng (.xls)">
          <FileSpreadsheet size={16} color="#137333" />
          <span>Xuất Excel</span>
        </button>

        <button className="btn-pill-blue" title="Chia sẻ tài liệu">
          <Lock size={14} />
          <span>Chia sẻ</span>
        </button>

        <div className="avatar-circle" title="Tài khoản Admin / GVCN">
          A
        </div>
      </div>
    </header>
  );
}
