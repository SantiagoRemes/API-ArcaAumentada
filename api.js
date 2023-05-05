const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const app = express()
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(require('./routes/routes.js'))
app.use(bodyParser.json());
app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})