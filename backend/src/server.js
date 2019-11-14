const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3456;

const app = express();

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect('mongodb+srv://' + process.env.DB_NAME + ':' + process.env.DB_PASSW + '@primocluster-37ks4.mongodb.net/txtsCA?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen (port, () => console.log(`Rodando suavemente na porta ${port}`));