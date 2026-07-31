import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import DocumentCanvas from './components/DocumentCanvas';
import StatsView from './components/StatsView';
import StudentModal from './components/StudentModal';
import BehaviorActionModal from './components/BehaviorActionModal';
import BehaviorLogModal from './components/BehaviorLogModal';
import ConductTranscriptModal from './components/ConductTranscriptModal';
import AddClassModal from './components/AddClassModal';
import { 
  INITIAL_GRADES, 
  INITIAL_CLASSES, 
  INITIAL_STUDENTS,
  calculateConductRating 
} from './data/initialData';

export default function App() {
  const [docTitle, setDocTitle] = useState(() => {
    return localStorage.getItem('doc_title') || 'Sổ Quản Lý Điểm Rèn Luyện Học Sinh (Khởi Điểm 100 Điểm)';
  });

  const [grades] = useState(INITIAL_GRADES);

  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('doc_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('doc_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // Default selection: Khối 10, Lớp 10A1
  const [activeGrade, setActiveGrade] = useState(10);
  const [activeClassId, setActiveClassId] = useState('10A1');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [conductFilter, setConductFilter] = useState('ALL');

  // UI view states
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'stats'
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modals
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  
  // Behavior Action Modal (+ / - Points)
  const [isBehaviorActionModalOpen, setIsBehaviorActionModalOpen] = useState(false);
  const [behaviorActionType, setBehaviorActionType] = useState('BONUS'); // 'BONUS' | 'PENALTY'
  const [targetBehaviorStudent, setTargetBehaviorStudent] = useState(null);

  // Behavior Timeline Log Modal
  const [isBehaviorLogModalOpen, setIsBehaviorLogModalOpen] = useState(false);
  const [timelineStudent, setTimelineStudent] = useState(null);

  // Individual Printable A4 Conduct Sheet Modal
  const [isConductTranscriptOpen, setIsConductTranscriptOpen] = useState(false);
  const [transcriptStudent, setTranscriptStudent] = useState(null);

  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);

  // LocalStorage Persist Effects
  useEffect(() => {
    localStorage.setItem('doc_title', docTitle);
  }, [docTitle]);

  useEffect(() => {
    localStorage.setItem('doc_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('doc_students', JSON.stringify(students));
  }, [students]);

  const activeClass = classes.find(c => c.id === activeClassId);

  // Student CRUD Operations
  const handleSaveStudent = (studentData) => {
    if (studentData.id) {
      setStudents(prev => prev.map(s => s.id === studentData.id ? studentData : s));
    } else {
      const newStudent = {
        ...studentData,
        id: 'HS' + Date.now().toString().slice(-6),
        baseScore: 100,
        behaviorLogs: [],
        teacherComment: 'Học sinh có ý thức rèn luyện đạo đức tốt.'
      };
      setStudents(prev => [newStudent, ...prev]);
    }
  };

  // Behavior Log Add Operation (+ / - Points)
  const handleAddBehaviorLog = (studentId, newLog) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedLogs = [...(s.behaviorLogs || []), newLog];
        return {
          ...s,
          behaviorLogs: updatedLogs
        };
      }
      return s;
    }));
  };

  // Delete specific behavior log entry
  const handleDeleteBehaviorLog = (studentId, logId) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedLogs = (s.behaviorLogs || []).filter(l => l.id !== logId);
        return {
          ...s,
          behaviorLogs: updatedLogs
        };
      }
      return s;
    }));
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa học sinh "${name}" khỏi danh sách?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  // Triggers for Modals
  const handleOpenAddBonus = (student) => {
    setTargetBehaviorStudent(student);
    setBehaviorActionType('BONUS');
    setIsBehaviorActionModalOpen(true);
  };

  const handleOpenAddPenalty = (student) => {
    setTargetBehaviorStudent(student);
    setBehaviorActionType('PENALTY');
    setIsBehaviorActionModalOpen(true);
  };

  const handleOpenBehaviorLog = (student) => {
    setTimelineStudent(student);
    setIsBehaviorLogModalOpen(true);
  };

  const handleOpenConductTranscript = (student) => {
    setTranscriptStudent(student);
    setIsConductTranscriptOpen(true);
  };

  const handleOpenEditStudent = (student) => {
    setEditingStudent(student);
    setIsStudentModalOpen(true);
  };

  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setIsStudentModalOpen(true);
  };

  // Add Class Operation
  const handleAddClass = (newClassObj) => {
    if (classes.some(c => c.id.toLowerCase() === newClassObj.id.toLowerCase())) {
      alert(`Lớp ${newClassObj.id} đã tồn tại!`);
      return;
    }

    setClasses(prev => [...prev, newClassObj]);
    setActiveGrade(newClassObj.grade);
    setActiveClassId(newClassObj.id);
  };

  // 1. Export Excel (.xls) with full formatting, colors, and 100% Vietnamese UTF-8 encoding
  const handleExportExcel = () => {
    const activeClassStudents = students.filter(s => s.grade === activeGrade && s.className === activeClassId);
    
    if (activeClassStudents.length === 0) {
      alert('Không có học sinh nào trong lớp này để xuất dữ liệu.');
      return;
    }

    let tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Điểm Rèn Luyện ${activeClassId}</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; font-family: Arial, sans-serif; font-size: 13px; }
          th { background-color: #1a73e8; color: #ffffff; border: 1px solid #cccccc; padding: 10px; font-weight: bold; }
          td { border: 1px solid #cccccc; padding: 8px; }
          .title { font-size: 18px; font-weight: bold; color: #1a73e8; text-align: center; }
        </style>
      </head>
      <body>
        <h2 class="title">BẢNG QUẢN LÝ ĐIỂM RÈN LUYỆN - LỚP ${activeClassId}</h2>
        <p style="text-align: center; color: #555;">Năm học 2025-2026 | Khởi điểm 100 điểm ban đầu</p>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Học Sinh</th>
              <th>Họ và Tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Lớp</th>
              <th>Điểm Ban Đầu</th>
              <th>Tổng Điểm Hiện Tại</th>
              <th>Xếp Loại Hạnh Kiểm</th>
              <th>Lượt Cộng Điểm (+)</th>
              <th>Lượt Trừ Điểm (-)</th>
              <th>Hành Vi Mới Nhất</th>
              <th>Ghi Chú Chi Tiết</th>
              <th>Nhận Xét GVCN</th>
            </tr>
          </thead>
          <tbody>
    `;

    activeClassStudents.forEach((s, index) => {
      const logs = s.behaviorLogs || [];
      const bonus = logs.filter(l => l.type === 'BONUS').reduce((acc, curr) => acc + curr.points, 0);
      const penalty = logs.filter(l => l.type === 'PENALTY').reduce((acc, curr) => acc + Math.abs(curr.points), 0);
      const totalScore = Math.max(0, (s.baseScore || 100) + bonus - penalty);
      const rating = calculateConductRating(totalScore);
      const latestLog = logs.length > 0 ? logs[logs.length - 1] : null;

      tableHtml += `
        <tr>
          <td style="text-align:center;">${index + 1}</td>
          <td>${s.code}</td>
          <td><b>${s.name}</b></td>
          <td style="text-align:center;">${s.gender}</td>
          <td style="text-align:center;">${s.dob}</td>
          <td style="text-align:center;">${s.className}</td>
          <td style="text-align:center;">100</td>
          <td style="text-align:center; font-weight:bold; color:${totalScore>=90?'#137333':'#1a73e8'};">${totalScore}</td>
          <td style="text-align:center; font-weight:bold;">${rating}</td>
          <td style="text-align:center; color:#137333;">+${bonus}đ (${logs.filter(l=>l.type==='BONUS').length} lần)</td>
          <td style="text-align:center; color:#c5221f;">-${penalty}đ (${logs.filter(l=>l.type==='PENALTY').length} lần)</td>
          <td>${latestLog ? `${latestLog.title} (${latestLog.points>0?`+${latestLog.points}`:latestLog.points}đ)` : 'Giữ 100đ ban đầu'}</td>
          <td>${latestLog && latestLog.note ? latestLog.note : '—'}</td>
          <td>${s.teacherComment || ''}</td>
        </tr>
      `;
    });

    tableHtml += `</tbody></table></body></html>`;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bang_Diem_Ren_Luyen_${activeClassId}_2025-2026.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Export CSV (.csv) with UTF-8 BOM
  const handleExportCSV = () => {
    const activeClassStudents = students.filter(s => s.grade === activeGrade && s.className === activeClassId);
    
    if (activeClassStudents.length === 0) {
      alert('Không có học sinh nào trong lớp này để xuất dữ liệu.');
      return;
    }

    let csvContent = "\uFEFF";
    csvContent += "STT,Mã Học Sinh,Họ và Tên,Giới Tính,Ngày Sinh,Khối,Lớp,Điểm Ban Đầu,Tổng Điểm Hiện Tại,Xếp Loại Hạnh Kiểm,Lượt Cộng Điểm (+),Lượt Trừ Điểm (-),Hành Vi Mới Nhất,Ghi Chú Chi Tiết,Nhận Xét GVCN\n";

    activeClassStudents.forEach((s, index) => {
      const logs = s.behaviorLogs || [];
      const bonus = logs.filter(l => l.type === 'BONUS').reduce((acc, curr) => acc + curr.points, 0);
      const penalty = logs.filter(l => l.type === 'PENALTY').reduce((acc, curr) => acc + Math.abs(curr.points), 0);
      const totalScore = Math.max(0, (s.baseScore || 100) + bonus - penalty);
      const rating = calculateConductRating(totalScore);
      const latestLog = logs.length > 0 ? logs[logs.length - 1] : null;

      const latestTitle = latestLog ? `${latestLog.title} (${latestLog.points>0?`+${latestLog.points}`:latestLog.points}đ)` : 'Giữ 100đ ban đầu';
      const latestNote = latestLog && latestLog.note ? latestLog.note : '';

      csvContent += `${index + 1},"${s.code}","${s.name}","${s.gender}","${s.dob}",${s.grade},"${s.className}",100,${totalScore},"${rating}","+${bonus}đ","-${penalty}đ","${latestTitle}","${latestNote}","${s.teacherComment || ''}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `So_diem_ren_luyen_${activeClassId}_2025-2026.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <Header
        docTitle={docTitle}
        setDocTitle={setDocTitle}
        onPrint={handlePrint}
        onExportExcel={handleExportExcel}
        onExportCSV={handleExportCSV}
      />

      <Toolbar
        grades={grades}
        activeGrade={activeGrade}
        setActiveGrade={setActiveGrade}
        classes={classes}
        activeClassId={activeClassId}
        setActiveClassId={setActiveClassId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        conductFilter={conductFilter}
        setConductFilter={setConductFilter}
        onOpenAddStudent={handleOpenAddStudent}
        onOpenAddClass={() => setIsAddClassModalOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onPrint={handlePrint}
      />

      <div className="main-workspace">
        <Sidebar
          isOpen={sidebarOpen}
          grades={grades}
          classes={classes}
          students={students}
          activeGrade={activeGrade}
          setActiveGrade={setActiveGrade}
          activeClassId={activeClassId}
          setActiveClassId={setActiveClassId}
          onOpenAddClass={() => setIsAddClassModalOpen(true)}
        />

        {viewMode === 'table' ? (
          <DocumentCanvas
            activeGrade={activeGrade}
            activeClass={activeClass}
            students={students}
            searchQuery={searchQuery}
            conductFilter={conductFilter}
            onOpenAddBonus={handleOpenAddBonus}
            onOpenAddPenalty={handleOpenAddPenalty}
            onViewBehaviorLog={handleOpenBehaviorLog}
            onViewConductTranscript={handleOpenConductTranscript}
            onEditStudent={handleOpenEditStudent}
            onDeleteStudent={handleDeleteStudent}
            onOpenAddStudent={handleOpenAddStudent}
          />
        ) : (
          <StatsView
            activeGrade={activeGrade}
            classes={classes}
            students={students}
          />
        )}
      </div>

      {/* Modals */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudent}
        student={editingStudent}
        grades={grades}
        classes={classes}
        currentGrade={activeGrade}
        currentClassId={activeClassId}
      />

      <BehaviorActionModal
        isOpen={isBehaviorActionModalOpen}
        onClose={() => setIsBehaviorActionModalOpen(false)}
        onAddBehaviorLog={handleAddBehaviorLog}
        student={targetBehaviorStudent}
        defaultType={behaviorActionType}
      />

      <BehaviorLogModal
        isOpen={isBehaviorLogModalOpen}
        onClose={() => setIsBehaviorLogModalOpen(false)}
        student={students.find(s => s.id === (timelineStudent ? timelineStudent.id : ''))}
        onDeleteLog={handleDeleteBehaviorLog}
        onOpenAddBonus={handleOpenAddBonus}
        onOpenAddPenalty={handleOpenAddPenalty}
        onViewPrintTranscript={handleOpenConductTranscript}
      />

      <ConductTranscriptModal
        isOpen={isConductTranscriptOpen}
        onClose={() => setIsConductTranscriptOpen(false)}
        student={students.find(s => s.id === (transcriptStudent ? transcriptStudent.id : ''))}
        activeClass={activeClass}
      />

      <AddClassModal
        isOpen={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
        onAddClass={handleAddClass}
        grades={grades}
        currentGrade={activeGrade}
      />
    </div>
  );
}
