// server.js
require('dotenv').config();
const express = require('express');
const midjourneyRouter = require('./router/midjourney');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/midjourney', midjourneyRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
