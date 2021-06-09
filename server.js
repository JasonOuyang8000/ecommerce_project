const express = require('express');
const rowdyLogger = require('rowdy-logger');
<<<<<<< HEAD
const { findUser } = require('./middlewears/userAuth');
=======
const { findUser } = require('./middlewares/userAuth');
const cartRouter = require('./routers/CartRouter');
>>>>>>> af870d29c0c71c4b00887e5bed91fce1dafbe1d6
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