const express = require('express');
const rowdyLogger = require('rowdy-logger');
const { findUser } = require('./middlewears/userAuth');
const cartRouter = require('./routers/CartRouter');
const app = express();
const port = process.env.PORT || 3001;
const userRouter = require('./routers/UserRouter');
require('dotenv').config()

require('./models');

const rowdyReporter = rowdyLogger.begin(app);

app.use(express.json());
app.use(require('cors')());
app.use(findUser);

app.use('/user', userRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
    
    rowdyReporter.print();
});