const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const utils = require('../util/utils');
const path = require('path');


const success = function (res, data) {
    return res.status(200).json({success: true, data: data});
};

const error_response = function (res, error, status = 500) {
    return res.status(status).json({success: false, error: error});
};

router.post('/resize', utils.upload.single('image'), function (req, res) {

    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);

    let output_path = `${process.env.UPLOAD_PATH}${height}__${width}__${req.file.originalname}`;

    if (isNaN(req.query.width) || isNaN(width) || width == null) {
        return error_response(res, "width should not be null", 400);
    }

    if (isNaN(req.query.height) || isNaN(height) || height == null) {
        return error_response(res, "height should not be null", 400);
    }
    try {
        sharp(req.file.path).resize({height: height, width: width})
            .toFile(output_path, (err, resizeImage) => {
                if (err) {
                    console.log(err);
                    return error_response(res, err);
                } else {
                    console.log(resizeImage);
                }
            });
        return success(res, {path: output_path});
    } catch (error) {
        console.error(error);
        return error_response(res, error, 500);
    }
});

router.get('/resize', function (req, res) {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const file_name = req.query.name;

    if (isNaN(req.query.width) || isNaN(width) || width == null) {
        return error_response(res, "width should not be null", 400);
    }

    if (isNaN(req.query.height) || isNaN(height) || height == null) {
        return error_response(res, "height should not be null", 400);
    }

    if(file_name == null) {
        return error_response(res, "file name is mandatory", 400);
    }

    let input_path = `${process.env.INPUT_PATH}${file_name}`;
    let output_path = `${process.env.OUTPUT_PATH}${height}__${width}__${file_name}`;

    try {
        sharp(input_path).resize({height: height, width: width})
            .toFile(output_path, (err, resizeImage) => {
                if (err) {
                    console.log(err);
                    return error_response(res, err);
                } else {
                    console.log(resizeImage);
                }
            });
        return success(res, {'path': output_path});
    } catch (error) {
        console.error(error);
        return error_response(res, error, 500);
    }

});

module.exports = router;