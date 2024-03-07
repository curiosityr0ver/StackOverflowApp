const pool = require('../../utils/db');


const fetchQuesQuery = async () => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM questions');
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) connection.release();
        return { error: null, output: rows };
    } catch (error) {
        connection.release();
        return { error: error, output: null };
    }
};
const fetchSingleQuesQuery = async (id) => {
    console.log(id);
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM questions where qid = ?', [id]);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) connection.release();
        return { error: null, output: rows };
    } catch (error) {
        return { error: error, output: null };
    }
};
const fetchMyQuesQuery = async (id) => {

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM questions where userid = ?', [id]);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) connection.release();
        return { error: null, output: rows };
    } catch (error) {
        return { error: error, output: null };
    }
};

const createQuesQuery = async (userid, title, description) => {
    // console.log(qid, userid, title, description);
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('INSERT INTO questions(userid, title, description) Values(?,?,?)', [userid, title, description]);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) connection.release();
        // console.log(rows);
        return { error: null, output: rows };
    } catch (error) {
        return { error: error, output: null };
    }
};


const updateQuesQuery = async (title, description, id) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('Update questions set title= ?, description= ? where qid = ?', [title, description, id]);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) connection.release();
        return { error: null, output: rows };
    } catch (error) {
        return { error: error, output: null };
    }
};



const deleteQuesQuery = async (id) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('DELETE FROM questions where qid = ?', [id]);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) connection.release();
        return { error: null, output: rows };
    } catch (error) {
        return { error: error, output: null };
    }


};
module.exports = { fetchQuesQuery, fetchSingleQuesQuery, fetchMyQuesQuery, createQuesQuery, updateQuesQuery, deleteQuesQuery };