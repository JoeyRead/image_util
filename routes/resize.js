const express = require('express');
const router = express.Router();
const image_service = require('../service/image_resize');

router.get('/resize', function (req, res) {
    res.json({
        'hello': 'world'
    })
});

module.exports = router;