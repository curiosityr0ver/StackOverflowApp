
const pool = require("../../utils/db");

const fetchTokenQuery = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT userid FROM users");

    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const fetchSingleTokenQuery = async (userid) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT password FROM users where userid = ?", [userid]);

    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};
module.exports = { fetchTokenQuery, fetchSingleTokenQuery };