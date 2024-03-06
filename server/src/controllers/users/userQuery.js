const pool = require("../../utils/db");

const fetchUsersQuery = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM users");
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};
const fetchSingleUserQuery = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM users where userid = ?",
      [id]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const createUserQuery = async (userid, name) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "INSERT INTO users(userid, name) Values(?,?)",
      [userid, name]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const updateUserQuery = async (name, id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "UPDATE users SET name = ? where userid = ?",
      [name, id]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const deleteUserQuery = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "DELETE FROM users where userid = ?",
      [id]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};
module.exports = {
  fetchUsersQuery,
  fetchSingleUserQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
};
