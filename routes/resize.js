const express = require('express');
const router = express.Router();
const image_service = require('../service/image_resize');
const sharp = require('sharp');
const utils = require('../util/utils');


const success = function (res, data) {
    return res.status(200).json({success: true, data: data});
};

const error_response = function (res, error, status = 500) {
    return res.status(status).json({success: false, error: error});
};

router.post('/resize', utils.upload.single('image'), function (req, res) {

    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);

    if (isNaN(req.query.width) || isNaN(width) || width == null) {
        return error_response(res, "width should not be null", 400);
    }

    if (isNaN(req.query.height) || isNaN(height) || height == null) {
        return error_response(res, "height should not be null", 400);
    }
    try {
        sharp(req.file.path).resize({height: height, width: width})
            .toFile('uploads/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
                if (err) {
                    console.log(err);
                    return error_response(res, err);
                } else {
                    console.log(resizeImage);
                }
            });
        return success(res, "file path");
    } catch (error) {
        console.error(error);
        return error_response(res, error, 500);
    }
});

router.get('/resize', function (req, res) {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const file_path = req.query.path;

    if (isNaN(req.query.width) || isNaN(width) || width == null) {
        return error_response(res, "width should not be null", 400);
    }

    if (isNaN(req.query.height) || isNaN(height) || height == null) {
        return error_response(res, "height should not be null", 400);
    }

    if(file_path == null) {
        return error_response(res, "file path is mandatory", 400);
    }

    try {
        sharp(file_path).resize({height: height, width: width})
            .toFile('uploads/' + 'thumbnails-' + '1.jpg', (err, resizeImage) => {
                if (err) {
                    console.log(err);
                    return error_response(res, err);
                } else {
                    console.log(resizeImage);
                }
            });
        return success(res, "file path");
    } catch (error) {
        console.error(error);
        return error_response(res, error, 500);
    }

});

module.exports = router;