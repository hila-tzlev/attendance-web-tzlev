
const db = require('../config/db');

const attendanceService = {
  async saveAttendanceReport(report) {
    const query = `
      INSERT INTO attendance_reports 
      (employee_id, date_in, time_in, date_out, time_out) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    
    const values = [
      report.employeeId,
      report.dateIn,
      report.timeIn,
      report.dateOut,
      report.timeOut
    ];
    
    return db.query(query, values);
  },

  async getEmployeeReports(employeeId) {
    const query = 'SELECT * FROM attendance_reports WHERE employee_id = $1 ORDER BY date_in DESC';
    return db.query(query, [employeeId]);
  },

  async getAllReports() {
    const query = 'SELECT * FROM attendance_reports ORDER BY date_in DESC';
    return db.query(query);
  }
};

module.exports = attendanceService;
