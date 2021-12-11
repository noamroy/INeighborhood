//~~~~~~~~~INCLUDES~~~~~~~~~~~~
const NeighborhoodSystem = require('../models/neighborhoodSystem');
const Log = require('./logger');
//~~~~~~~EXPORTED FUNCTIONS~~~~~~~~~~
/*
GET REQUEST: getAllNeighborhoodSystems()
GET REQUEST: getSpecificNeighborhoodSystem(path = '/id')
POST REQUEST: createNeighborhoodSystem(body = all params except for id)
PATCH REQUEST: updateNeighborhoodSystem(path = '/id', body = all new params)
DELETE REQUEST: deleteNeighborhoodSystem(path = '/id')
*/
exports.neighborhoodSystemController = {
    async getAllNeighborhoodSystems(req, res) {
        Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER REQ: Get all neighborhood systems`);
        const answer = await NeighborhoodSystem.find()
            .catch(err => {
                Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER ERROR: getting the data from db ${err}`);
                res.status(500).json({status: 500 , msg: `Server error`});
            });
        if (answer.length!=0){
            Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: Get all neighborhood systems`);
            res.json(answer);
        }
        else{
            Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: no neighborhood systems in DB`);
            res.status(404).json({status: 404 , msg: `No Neighborhood systems in DB`});
        }
    },
    async getSpecificNeighborhoodSystem(req, res) {
        const NeighborhoodSystem_id = req.path.substring(1)
        Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER REQ: Get specific neighborhood system number ${NeighborhoodSystem_id}`);
        if (isNaN(NeighborhoodSystem_id)){
            Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: input is nan error "${NeighborhoodSystem_id}"`);
            res.status(400).json({status: 400 , msg: `Input is nan error "${NeighborhoodSystem_id}"`});
        }
        else{
            var neighborhoodSystemData = await NeighborhoodSystem.find({ id: Number(NeighborhoodSystem_id)})
                .catch(err => {
                    Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER ERROR: getting the data from db ${err}`);
                    res.status(500).json({status: 500 , msg: `Server error`});
                });
            if (neighborhoodSystemData.length!=0){
                neighborhoodSystemData = neighborhoodSystemData[0];
                Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: get neighborhood system data number: ${NeighborhoodSystem_id}`);
                res.json(neighborhoodSystemData);
            }
            else{
                Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: Didn't find neighborhood system number: ${NeighborhoodSystem_id}`);
                res.status(404).json({status: 404 , msg: `Didn't find neighborhood system number: ${NeighborhoodSystem_id}`});
            }
        }
    },
    async createNeighborhoodSystem(req, res) {
        Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER REQ: POST add an neighborhood system`);
        const body = req.body;
        let NeighborhoodSystem_id = await NeighborhoodSystem.find()
            .catch(err => {
                Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER ERROR: getting the data from db ${err}`);
                res.status(500).json({status: 500 , msg: `Server error`});
        });
        if (NeighborhoodSystem_id.length!=0)
            NeighborhoodSystem_id = NeighborhoodSystem_id[(NeighborhoodSystem_id.length)-1].id+1;
        else
            NeighborhoodSystem_id=1;
        if (body.type && body.name && body.address &&
            body.ip && body.mode && body.active){
                const newNeighborhoodSystem = new NeighborhoodSystem({
                    "type": body.type,
                    "name": body.name,
                    "address": body.address,
                    "ip": body.ip,
                    "mode": body.mode,
                    "active": body.active,
                    "id": NeighborhoodSystem_id
                });
                const result = newNeighborhoodSystem.save();
                if (result) {
                    Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: add neighborhood system number ${NeighborhoodSystem_id}`);
                    res.json(newNeighborhoodSystem);
                } else {
                    Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER ERROR: getting the data from db ${err}`);
                    res.status(500).json({status: 500 , msg: `Server error`});
                }
        } else {
            Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: Input error!`);
            res.status(400).json({status: 400 , msg: `Input error!`});
        }
    },
    async updateNeighborhoodSystem(req, res) {
        const NeighborhoodSystem_id = req.path.substring(1);
        Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER REQ: update an neighborhood system number: ${NeighborhoodSystem_id}`);
        if (isNaN(NeighborhoodSystem_id)){
            Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: input is nan error "${NeighborhoodSystem_id}"`);
            res.status(400).json({status: 400 , msg: `Input is nan error "${NeighborhoodSystem_id}"`});
        }
        else {
            let body = req.body;
            let newNeighborhoodSystem = await NeighborhoodSystem.find({ id: Number(NeighborhoodSystem_id)})
                .catch(err => {
                    Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER ERROR: getting the data from db ${err}`);
                    res.status(500).json({status: 500 , msg: `Server error`});
                });
            if (newNeighborhoodSystem.length == 0){
                Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: Didn't find neighborhood system number: ${NeighborhoodSystem_id}`);
                res.status(404).json({status: 404 , msg: `Didn't find neighborhood system number: "${NeighborhoodSystem_id}"`});
            }
            else {
                newNeighborhoodSystem = newNeighborhoodSystem[0];
                if (body.type)
                    newNeighborhoodSystem.type=body.type;
                if (body.name)
                newNeighborhoodSystem.name=body.name;
                if (body.address)
                newNeighborhoodSystem.address=body.address;
                if (body.ip)
                    newNeighborhoodSystem.ip=body.ip;
                if (body.mode)
                newNeighborhoodSystem.mode=body.mode;
                if (body.active)
                    newNeighborhoodSystem.active=body.active;
                NeighborhoodSystem.updateOne({ id: NeighborhoodSystem_id }, {
                type: newNeighborhoodSystem.type,
                name: newNeighborhoodSystem.name,
                address: newNeighborhoodSystem.address,
                ip: newNeighborhoodSystem.ip,
                mode: newNeighborhoodSystem.mode,
                active: newNeighborhoodSystem.active})
                    .catch(err => {
                        Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER ERROR: update neighborhood system ${err}`);
                        res.status(500).json({status: 500 , msg: `Error update a neighborhood system`});
                    });
                res.json(body)
            }
        }
    },
    async deleteNeighborhoodSystem(req, res) {
        const NeighborhoodSystem_id = req.path.substring(1)
        Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER REQ: Get specific neighborhood system number ${NeighborhoodSystem_id}`);
        if (isNaN(NeighborhoodSystem_id)){
            Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: input is nan error "${NeighborhoodSystem_id}"`);
            res.status(400).json({status: 400 , msg: `Input is nan error "${NeighborhoodSystem_id}"`});
        }
        else{
            Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: delete neighborhood system number: ${NeighborhoodSystem_id}`);
            NeighborhoodSystem.deleteOne ({ id: Number(NeighborhoodSystem_id)})
                .then(docs => { res.json(docs)})
                .catch(err => {
                    Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER ERROR: deleting neighborhood system from db: ${err}`);
                    res.status(500).json({status: 500 , msg: `Server delete error`});
                });
        }
    }
};
