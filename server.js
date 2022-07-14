/**
    *Module dependencies. 
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT | 3001;
const db = require('./app/src/models/index');
const app = express();
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync({ force: false });

/**
    *Route initiation.
*/
require('./app/src/routes/menu.routes')(app)
require('./app/src/routes/cart.routes')(app)
require('./app/src/routes/transaction.routes')(app)



app.use('/', (req, res, next) => {
    res.send('Welcome to McWarteg back-end service! API is Ready.')
})

/**
    *Launch server. 
*/
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

// https.createServer({
//     key:    fs.readFileSync(path.join(__dirname, 'app/config/cert', 'key.pem')),
//     cert:   fs.readFileSync(path.join(__dirname, 'app/config/cert', 'cert.pem'))
// }, app).listen(PORT, () => {
//     console.log(`Server is running on PORT ${PORT}`);
// })