const express = require('express');
const app = express();
const image_resize = require('./routes/resize');
const port = 3000;
require('dotenv').config();
const fs = require("fs");

const check_dir = function (path) {
    try {
        if (fs.existsSync(path)) {
            console.log("Directory exists.", path);
        } else {
            console.log("Directory does not exist.", path);
        }
    } catch
        (e) {
        console.log("An error occurred", e);
    }
};

check_dir(process.env.INPUT_PATH);
check_dir(process.env.OUTPUT_PATH);

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/image', image_resize);
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(port, () => console.log(`node application started listening on port ${port}`));