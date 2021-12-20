const { Router } = require('express');
const { programController } = require('../controllers/programController');
const programRouter = new Router();
module.exports = { programRouter };
programRouter.get('/', programController.getAllPrograms); // {host}/api/program
programRouter.get('/:id', programController.getSpecificProgram); // {host}/api/program/:id
programRouter.post('/', programController.createProgram); // {host}/api/program
programRouter.put('/:id', programController.updateProgram); // {host}/api/program/:id
programRouter.delete('/:id', programController.deleteProgram); // {host}/api/program/:id