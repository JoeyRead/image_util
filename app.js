const path = require('path');
const express = require('express');
const sharp = require('sharp');
const utils = require('./util/utils');

const app = express();
const image_resize = require('./routes/resize');
const port = 3000;

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const success = function (res, data) {
    return res.status(200).json({success: true, data: data});
};

const error_response = function (res, error, status = 500) {
    return res.status(status).json({success: false, error: error});
};

//Upload route
app.post('/upload', utils.upload.single('image'), (req, res, next) => {
    try {
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        if (isNaN(req.query.width) || isNaN(width) || width == null) {
            return error_response(res, "width should not be null", 400);
        }

        if (isNaN(req.query.height) || isNaN(height) || height == null) {
            return error_response(res, "height should not be null", 400);
        }

        sharp(req.file.path).resize({height: height, width: width})
            .toFile('uploads/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
                if (err) {
                    console.log(err);
                    return error_response(res, err);
                } else {
                    console.log(resizeImage);
                }
            });
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

app.use('/image', image_resize);
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(port, () => console.log(`node application started listening on port ${port}`));