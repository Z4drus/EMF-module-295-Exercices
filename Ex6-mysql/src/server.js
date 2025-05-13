const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const tasksRoute = require('./routes/tasksRoute');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(tasksRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});