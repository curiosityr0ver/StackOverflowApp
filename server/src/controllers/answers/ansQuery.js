const pool = require("../../utils/db");

const fetchAnsQuery = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM answers");
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const fetchSingleAnsQuery = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM answers where aid = ?", [id]);
    setTimeout(() => {
      connection.release();
    }, 250);
    if (rows) connection.release();
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const fetchSingleQuesAnsQuery = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM answers where qid = ?", [id]);
    setTimeout(() => {
      connection.release();
    }, 250);
    if (rows) connection.release();
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const fetchMyAnsQuery = async (id) => {

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM answers where userid = ?', [id]);
    setTimeout(() => {
      connection.release();
    }, 250);
    if (rows) connection.release();
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const createAnsQuery = async (userid, description) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "INSERT INTO answers(userid, description) Values(?,?)",
      [userid, description]
    );
    if (rows) {
      const [data] = await connection.execute(
        "SELECT * FROM answers ORDER BY created DESC LIMIT 1");
      return { error: null, output: data[0] };
    }
    return { error: "Failed to Insert Answer", output: null };
  } catch (error) {
    return { error: error, output: null };
  }
};

const updateAnsQuery = async (description, id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "Update answers set description= ? where aid = ?",
      [description, id]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const deleteAnsQuery = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "DELETE FROM answers where aid = ?",
      [id]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};
module.exports = {
  fetchAnsQuery,
  fetchSingleAnsQuery,
  fetchSingleQuesAnsQuery,
  fetchMyAnsQuery,
  createAnsQuery,
  updateAnsQuery,
  deleteAnsQuery,
};
