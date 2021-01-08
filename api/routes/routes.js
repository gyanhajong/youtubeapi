
module.exports = function(app) {
    const router = require('express').Router();
    const ctrl = require('../controller/controller');

    router.get("/", ctrl.findAll);
    app.use('/api/videos', router);
};