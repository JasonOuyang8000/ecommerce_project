const express = require('express');
const rowdyLogger = require('rowdy-logger');
const { findUser } = require('./middlewares/userAuth');

const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config()

require('./models');

const rowdyReporter = rowdyLogger.begin(app);

app.use(express.json());
app.use(require('cors')());
app.use(findUser);

const userRouter = require('./routers/UserRouter');
app.use('/user', userRouter);

const itemRouter = require('./routers/ItemRouter')
app.use('/item', itemRouter)

const cartRouter = require('./routers/CartRouter');
app.use('/cart', cartRouter);

app.listen(port, () => {
    
    rowdyReporter.print();
});