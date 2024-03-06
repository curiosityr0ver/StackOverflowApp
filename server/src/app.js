const express = require("express");
const bodyParser = require('body-parser');
const ansRouter = require('./controllers/answers/ansRouter');
const commentRouter = require('./controllers/comments/commentRouter');
const quesRouter = require('./controllers/questions/quesRouter');
const userRouter = require('./controllers/users/userRouter');
const authRouter = require('./controllers/authentication/authRouter');
const searchRouter = require('./controllers/search/searchRouter');
const { errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');

const PORT = 5000;
console.clear();
const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
        data: {
            "routes": ['user', 'ques', 'ans', 'comments', 'auth', 'search']
        }
    });
});



app.use('/users', userRouter);
app.use('/ques', quesRouter);
app.use('/ans', ansRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server live on port ${PORT}`);
});
