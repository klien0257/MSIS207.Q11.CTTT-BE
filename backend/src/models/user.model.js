const { getPool } = require("../config/db");

// Tìm user theo email
async function findUserByEmail(email) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("Email", email)
    .query("SELECT * FROM Users WHERE Email = @Email");
  return result.recordset[0];
}

// Tạo tài khoản mới
async function createUser({ fullName, email, passwordHash }) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("FullName", fullName)
    .input("Email", email)
    .input("PasswordHash", passwordHash)
    .query(`
      INSERT INTO Users (FullName, Email, PasswordHash)
      OUTPUT INSERTED.*
      VALUES (@FullName, @Email, @PasswordHash)
    `);
  return result.recordset[0];
}

module.exports = {
  findUserByEmail,
  createUser,
};
