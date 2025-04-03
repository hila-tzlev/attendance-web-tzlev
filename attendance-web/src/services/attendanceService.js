
const db = require('../config/db');

const attendanceService = {
  async login(employeeId, password) {
    const query = 'SELECT * FROM employees WHERE employee_id = $1 AND password = $2';
    const result = await db.query(query, [employeeId, password]);
    return result.rows[0];
  },

  async saveAttendanceRecord(record) {
    const query = `
      INSERT INTO attendance_records (employee_id, date, time_in, time_out, approved)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      record.employeeId,
      record.date,
      record.timeIn,
      record.timeOut,
      false // דיווחים חדשים תמיד מתחילים כלא מאושרים
    ];
    return db.query(query, values);
  },

  async getEmployeeReports(employeeId) {
    const query = `
      SELECT * FROM attendance_records 
      WHERE employee_id = $1 
      ORDER BY date DESC, time_in DESC
    `;
    const result = await db.query(query, [employeeId]);
    return result.rows;
  },

  async getPendingApprovals() {
    const query = `
      SELECT ar.*, e.name as employee_name
      FROM attendance_records ar
      JOIN employees e ON ar.employee_id = e.employee_id
      WHERE ar.approved = false
      ORDER BY ar.date DESC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  async approveRecord(recordId) {
    const query = 'UPDATE attendance_records SET approved = true WHERE id = $1 RETURNING *';
    return db.query(query, [recordId]);
  }
};

module.exports = attendanceService;
