const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const colors = require('colors');
const { readdirSync } = require('fs');


// Middlewares
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


// DB Connection
mongoose.connect(process.env.DATABASE).then(() => console.log("DB Connected Successfully".green.bold)).catch((err) =>console.log("DB Error ==> ", err.red.bold));


// Routes Middlewares
readdirSync("./src/routes").map(r => app.use("/api/v1", require(`./src/routes/${r}`)));


// Server
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});