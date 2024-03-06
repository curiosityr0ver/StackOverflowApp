const pool = require("../../utils/db");

const fetchCommentsQuery = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM comments");
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const fetchSingleCommentQuery = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM comments WHERE commentid = ? OR parentcommentid = ?",
      [id, id]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const createCommentQuery = async (commentid, userid, aid, description) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "INSERT INTO comments(commentid, userid, aid, description) VALUES (?, ?, ?, ?)",
      [commentid, userid, aid, description]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const updateCommentQuery = async (description, id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "UPDATE comments SET description = ? WHERE commentid = ?",
      [description, id]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

const deleteCommentQuery = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "DELETE FROM comments WHERE commentid = ? OR parentcommentid = ?",
      [id, id]
    );
    return { error: null, output: rows };
  } catch (error) {
    return { error: error, output: null };
  }
};

module.exports = {
  fetchCommentsQuery,
  fetchSingleCommentQuery,
  createCommentQuery,
  updateCommentQuery,
  deleteCommentQuery,
};
