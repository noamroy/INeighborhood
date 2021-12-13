const { Router } = require('express');
const { remoteApiController } = require('../controllers/remoteApiController');
const remoteApiRouter = new Router();
module.exports = { remoteApiRouter };

remoteApiRouter.post('/sun', remoteApiController.getSun); // {host}/api/remote
//remoteApiRouter.post('/weather', remoteApiController/*.*/); // {host}/api/remote