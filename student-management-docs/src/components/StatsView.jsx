import React from 'react';
import { ShieldCheck, Award, Users, AlertTriangle, CheckCircle2, Star } from 'lucide-react';

export default function StatsView({ activeGrade, classes, students }) {
  const gradeStudents = students.filter(s => s.grade === activeGrade);
  const gradeClasses = classes.filter(c => c.grade === activeGrade);

  const total = gradeStudents.length;

  const countConduct = (rank) => gradeStudents.filter(s => s.conduct === rank).length;
  const rewardsCount = gradeStudents.filter(s => s.rewards && s.rewards !== 'Không có').length;
  const violationsCount = gradeStudents.filter(s => s.violations && s.violations !== 'Không có').length;

  return (
    <div className="document-canvas-container">
      <div className="doc-page" style={{ minHeight: 'auto' }}>
        <div className="doc-page-header">
          <div className="doc-main-title" style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: 20 }}>BÁO CÁO THỐNG KÊ ĐẠO ĐỨC & RÈN LUYỆN - KHỐI {activeGrade}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              Phân tích xếp loại hạnh kiểm, biểu dương khen thưởng và nhắc nhở kỷ luật học sinh
            </p>
          </div>
        </div>

        {/* Metric Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#e6f4ea', padding: 16, borderRadius: 8, border: '1px solid #ceebe1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#137333', fontSize: 13, fontWeight: 600 }}>
              <ShieldCheck size={18} />
              <span>Hạnh Kiểm Tốt (Xuất Sắc)</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#137333', marginTop: 8 }}>
              {countConduct('Tốt')}
              <span style={{ fontSize: 13, fontWeight: 400 }}> ({total ? Math.round((countConduct('Tốt') / total) * 100) : 0}%)</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Đạt chuẩn gương mẫu
            </div>
          </div>

          <div style={{ background: '#e8f0fe', padding: 16, borderRadius: 8, border: '1px solid #d2e3fc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1a73e8', fontSize: 13, fontWeight: 600 }}>
              <CheckCircle2 size={18} />
              <span>Hạnh Kiểm Khá</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1a73e8', marginTop: 8 }}>
              {countConduct('Khá')}
              <span style={{ fontSize: 13, fontWeight: 400 }}> ({total ? Math.round((countConduct('Khá') / total) * 100) : 0}%)</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Chấp hành tốt quy định
            </div>
          </div>

          <div style={{ background: '#fef7e0', padding: 16, borderRadius: 8, border: '1px solid #fce8b2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#b06000', fontSize: 13, fontWeight: 600 }}>
              <Award size={18} />
              <span>Ghi Nhận Khen Thưởng</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#b06000', marginTop: 8 }}>
              {rewardsCount}
              <span style={{ fontSize: 13, fontWeight: 400 }}> học sinh</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Thành tích rèn luyện xuất sắc
            </div>
          </div>

          <div style={{ background: '#fce8e6', padding: 16, borderRadius: 8, border: '1px solid #f5c6cb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c5221f', fontSize: 13, fontWeight: 600 }}>
              <AlertTriangle size={18} />
              <span>Cần Khắc Phục / Vi Phạm</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#c5221f', marginTop: 8 }}>
              {violationsCount}
              <span style={{ fontSize: 13, fontWeight: 400 }}> trường hợp</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Cần phối hợp phụ huynh
            </div>
          </div>
        </div>

        {/* Conduct Distribution Table per Class */}
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
          Phân bố Xếp loại Hạnh kiểm theo từng Lớp học (Khối {activeGrade})
        </h3>

        <table className="docs-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Lớp</th>
              <th>Giáo viên chủ nhiệm</th>
              <th style={{ textAlign: 'center' }}>Sĩ số</th>
              <th style={{ textAlign: 'center' }}>HK Tốt</th>
              <th style={{ textAlign: 'center' }}>HK Khá</th>
              <th style={{ textAlign: 'center' }}>HK Đạt</th>
              <th style={{ textAlign: 'center' }}>Chưa đạt</th>
              <th style={{ textAlign: 'center' }}>Khen thưởng</th>
            </tr>
          </thead>
          <tbody>
            {gradeClasses.map(cls => {
              const clsStudents = students.filter(s => s.className === cls.id);
              const tot = clsStudents.filter(s => s.conduct === 'Tốt').length;
              const kha = clsStudents.filter(s => s.conduct === 'Khá').length;
              const dat = clsStudents.filter(s => s.conduct === 'Đạt').length;
              const chuaDat = clsStudents.filter(s => s.conduct === 'Chưa đạt').length;
              const rew = clsStudents.filter(s => s.rewards && s.rewards !== 'Không có').length;

              return (
                <tr key={cls.id}>
                  <td style={{ fontWeight: 600, color: 'var(--google-blue)' }}>{cls.name}</td>
                  <td>{cls.headTeacher}</td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{clsStudents.length}</td>
                  <td style={{ textAlign: 'center', color: '#137333', fontWeight: 700 }}>{tot}</td>
                  <td style={{ textAlign: 'center', color: '#1a73e8', fontWeight: 600 }}>{kha}</td>
                  <td style={{ textAlign: 'center', color: '#b06000' }}>{dat}</td>
                  <td style={{ textAlign: 'center', color: '#c5221f', fontWeight: 600 }}>{chuaDat}</td>
                  <td style={{ textAlign: 'center', color: '#137333', fontWeight: 600 }}>{rew}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
