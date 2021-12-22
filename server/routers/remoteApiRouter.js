const { Router } = require('express');
const { remoteApiController } = require('../controllers/remoteApiController');
const remoteApiRouter = new Router();
module.exports = { remoteApiRouter };

remoteApiRouter.get('/sun', remoteApiController.getSun); // {host}/api/remote/sun
// remoteApiRouter.post('/sun', remoteApiController.getCordinates); // {host}/api/remote/sun ## In development