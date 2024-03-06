
const jwt = require('jsonwebtoken');    
const secretKey = process.env.JWT_SECRET;

const currentLogin = (req)=>{
     const token = req.headers.authorization.split(' ')[1];
       var result = -1;

    jwt.verify(token, secretKey, (err, decodedToken) => {
        const {userid} = decodedToken;
         console.log(userid);
         result = userid;

        // res.json({userid, decodeduserid})
   });
   return result;
}

module.exports = currentLogin;
