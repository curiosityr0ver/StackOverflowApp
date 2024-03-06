const jwt = require("jsonwebtoken");
const { fetchTokenQuery, fetchSingleTokenQuery } = require('./authQuery');
const response = require('../../utils/response');

const secretKey = process.env.JWT_SECRET;
const showLogin = async (req, res) => {
    const { error, output } = await fetchTokenQuery();

    error
        ? response(401, "Invalid Authorisation", error, res)
        : response(200, "Tokens Received", tokenTable(output), res);
};
const loginHandler = async (req, res) => {
    const { userid, password } = req.body;
    const { error, output } = await fetchSingleTokenQuery(userid);
    // console.log(output);

    error || !output[0] || output[0].password != password
        ? response(401, "Invalid Authorisation", error, res)
        : response(200, "Tokens Generated", jwt.sign({ userid }, secretKey, { expiresIn: "14h" }), res);
};


const tokenTable = (useridArray) => {
    const table = [];
    useridArray.forEach(({ userid }) => {

        const token = jwt.sign({ userid }, secretKey, { expiresIn: "14h" });
        table.push({ userid, token });
    });
    return table;
};

module.exports = { loginHandler, showLogin };