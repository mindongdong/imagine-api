// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const midjourneyRouter = require('./router/midjourney');
const dalleRouter = require('./router/dalle');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/midjourney', midjourneyRouter);
app.use('/dalle', dalleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
