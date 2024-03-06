const pool = require('../../utils/db')


const fetchSearchedResultsQuery = async (type, keyword) => {
    try {
        const connection = await pool.getConnection();
        let query = '';

        if (type === 'question') {
            query = `SELECT * FROM questions WHERE title LIKE '%${keyword}%'`;
        } else if (type === 'answer') {
            query = `SELECT * FROM answers WHERE description LIKE '%${keyword}%'`;
        } else {
            throw new Error('Invalid Type');
        }

        const [rows] = await connection.execute(query);

        // Check if there are no results
        if (rows.length === 0) {
            return { error: null, output: null, message: `No results found for '${keyword}'` };
        }

        return { error: null, output: rows };
    } catch (error) {
        return { error: error, output: null, message: `Error searching data for '${keyword}'` };
    }
};

module.exports = fetchSearchedResultsQuery;