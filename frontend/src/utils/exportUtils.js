// src/utils/exportUtils.js
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToExcel = (tasks) => {
  // แปลงข้อมูลให้เหมาะสมกับ Excel
  const data = tasks.map(task => ({
    'Title': task.title,
    'Description': task.description || '',
    'Status': task.status,
    'Priority': task.priority,
    'Category': task.category?.name || 'No Category',
    'Due Date': task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
    'Importance': task.importance,
    'Urgency': task.urgency,
    'Created At': new Date(task.createdAt).toLocaleDateString(),
    'Notes': task.notes?.map(note => note.content).join(', ') || ''
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
  
  // สร้างไฟล์ Excel
  XLSX.writeFile(wb, 'tasks.xlsx');
};

export const exportToPDF = (tasks) => {
  const doc = new jsPDF();

  // หัวข้อเอกสาร
  doc.setFontSize(20);
  doc.text('Tasks List', 14, 20);

  // สร้างข้อมูลสำหรับตาราง
  const tableData = tasks.map(task => [
    task.title,
    task.status,
    task.priority,
    task.category?.name || 'No Category',
    task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'
  ]);

  // สร้างตาราง
  doc.autoTable({
    startY: 30,
    head: [['Title', 'Status', 'Priority', 'Category', 'Due Date']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: 255
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });

  // บันทึกไฟล์
  doc.save('tasks.pdf');
};