const express = require('express');
const app = express();
const image_resize = require('./routes/resize');
const port = 3000;

app.use('/image', image_resize);
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(port, () => console.log(`node application started listening on port ${port}`));