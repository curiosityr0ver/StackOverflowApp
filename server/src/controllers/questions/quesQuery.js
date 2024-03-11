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
const fetchSingleQuesQuery = async (payload) => {
    console.log(id);
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM questions where qid = ?', payload);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) connection.release();
        return { error: null, output: rows };
    } catch (error) {
        return { error: error, output: null };
    }
};
const fetchMyQuesQuery = async (payload) => {

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM questions where userid = ?', payload);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) connection.release();
        return { error: null, output: rows };
    } catch (error) {
        return { error: error, output: null };
    }
};

const createQuesQuery = async (payload) => {
    // console.log(qid, userid, title, description);
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('INSERT INTO questions(userid, title, description) Values(?,?,?)', payload);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) {
            const [data] = await connection.execute(
                "SELECT * FROM questions ORDER BY created DESC LIMIT 1");
            if (data) connection.release();
            return { error: null, output: data[0] };
        }
        return { error: "Failed to Create Question", output: null };
    } catch (error) {
        return { error: error, output: null };
    }
};

const updateQuesQuery = async (payload) => {
    // console.log(userid, qid, title, description);
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('Update questions set title= ?, description= ? where qid = ?', payload);
        setTimeout(() => {
            connection.release();
        }, 250);
        if (rows) {
            const [data] = await connection.execute(
                "SELECT * FROM questions ORDER BY updated DESC LIMIT 1");
            if (data) connection.release();
            return { error: null, output: data[0] };
        }
    } catch (error) {
        return { error: error, output: null };
    }
};



const deleteQuesQuery = async (payload) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('DELETE FROM questions where qid = ?', payload);
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