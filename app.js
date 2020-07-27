const path = require('path');
const express = require('express');
const sharp = require('sharp');
const utils = require('./util/utils');

const app = express();
const image_resize = require('./routes/resize');
const port = 3000;

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/image', image_resize);
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(port, () => console.log(`node application started listening on port ${port}`));