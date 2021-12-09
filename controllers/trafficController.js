//~~~~~~~~~INCLUDES~~~~~~~~~~~~
const Traffic = require('../models/trafficSystem');
const Log = require('../logger');
var axios = require("axios").default;
const trafficSystem = require('../models/trafficSystem');
//~~~~~~~EXPORTED FUNCTIONS~~~~~~~~~~
/*
GET REQUEST: getAllTrafficSystems()
GET REQUEST: getSpecificTrafficSystem(path = '/id')
POST REQUEST: createTrafficSystem(body = all params except for id)
PATCH REQUEST: updateTrafficSystem(path = '/id', body = all new params)
DELETE REQUEST: deleteTrafficSystem(path = '/id')
*/
exports.trafficController = {
    async getAllTrafficSystems(req, res) {
        Log.logger.info(`TRAFFIC CONTROLLER REQ: Get all traffic systems`);
        const answer = await Traffic.find()
            .catch(err => {
                Log.logger.info(`TRAFFIC CONTROLLER ERROR: getting the data from db ${err}`);
                res.status(500).json({status: 500 , msg: `Server error`});
            });
        if (answer.length!=0){
            Log.logger.info(`TRAFFIC CONTROLLER RES: Get all traffic systems`);
            res.json(answer);
        }
        else{
            Log.logger.info(`TRAFFIC CONTROLLER RES: no traffic systems in DB`);
            res.status(404).json({status: 404 , msg: `No traffic systems in DB`});
        }
    },
    async getSpecificTrafficSystem(req, res) {
        const TrafficSystem_id = req.path.substring(1)
        Log.logger.info(`TRAFFIC CONTROLLER REQ: Get specific traffic system number ${TrafficSystem_id}`);
        if (isNaN(TrafficSystem_id)){
            Log.logger.info(`TRAFFIC CONTROLLER RES: input is nan error "${TrafficSystem_id}"`);
            res.status(400).json({status: 400 , msg: `Input is nan error "${TrafficSystem_id}"`});
        }
        else{
            var trafficData = await trafficSystem.find({ id: Number(TrafficSystem_id)})
                .catch(err => {
                    Log.logger.info(`TRAFFIC CONTROLLER ERROR: getting the data from db ${err}`);
                    res.status(500).json({status: 500 , msg: `Server error`});
                });
            if (trafficData.length!=0){
                trafficData = trafficData[0];
                Log.logger.info(`TRAFFIC CONTROLLER RES: get traffic system data number: ${TrafficSystem_id}`);
                res.json(trafficData);
            }
            else{
                Log.logger.info(`TRAFFIC CONTROLLER RES: Didn't find traffic system number: ${TrafficSystem_id}`);
                res.status(404).json({status: 404 , msg: `Didn't find traffic system number: ${TrafficSystem_id}`});
            }
        }
    },
    async createTrafficSystem(req, res) {
        Log.logger.info(`TRAFFIC CONTROLLER REQ: POST add an traffic system`);
        let body = req.body;
        let TrafficSystem_id = await trafficSystem.find()
            .catch(err => {
                Log.logger.info(`TRAFFIC CONTROLLER ERROR: getting the data from db ${err}`);
                res.status(500).json({status: 500 , msg: `Server error`});
        });
        if (TrafficSystem_id.length!=0)
            TrafficSystem_id = TrafficSystem_id[(TrafficSystem_id.length)-1].id+1;
        else
            TrafficSystem_id=1;
        if (body.name &&
            body.ip &&
            body.program){
                const newTrafficSystem = new trafficSystem({
                    "name": body.name,
                    "ip": body.ip,
                    "program": body.program,
                    "id": TrafficSystem_id
                });
                const result = newTrafficSystem.save();
                if (result) {
                    Log.logger.info(`TRAFFIC CONTROLLER RES: add traffic system number ${TrafficSystem_id}`);
                    res.json(newTrafficSystem);
                } else {
                    Log.logger.info(`TRAFFIC CONTROLLER ERROR: getting the data from db ${err}`);
                    res.status(500).json({status: 500 , msg: `Server error`});
                }
        } else {
            Log.logger.info(`TRAFFIC CONTROLLER RES: Input error!`);
            res.status(400).json({status: 400 , msg: `Input error!`});
        }
    },
    async updateTrafficSystem(req, res) {
        const TrafficSystem_id = req.path.substring(1);
        Log.logger.info(`TRAFFIC CONTROLLER REQ: update an traffic system number: ${TrafficSystem_id}`);
        if (isNaN(TrafficSystem_id)){
            Log.logger.info(`TRAFFIC CONTROLLER RES: input is nan error "${TrafficSystem_id}"`);
            res.status(400).json({status: 400 , msg: `Input is nan error "${TrafficSystem_id}"`});
        }
        else {
            let body = req.body;
            let newTrafficSystem = await trafficSystem.find({ id: Number(TrafficSystem_id)})
                .catch(err => {
                    Log.logger.info(`TRAFFIC CONTROLLER ERROR: getting the data from db ${err}`);
                    res.status(500).json({status: 500 , msg: `Server error`});
                });
            if (newTrafficSystem.length == 0){
                Log.logger.info(`TRAFFIC CONTROLLER RES: Didn't find traffic system number: ${TrafficSystem_id}!`);
                res.status(404).json({status: 404 , msg: `Didn't find traffic system number: "${TrafficSystem_id}"!`});
            }
            else {
                newTrafficSystem = newTrafficSystem[0];
                if (body.name)
                    newTrafficSystem.name=body.name;
                if (body.ip)
                    newTrafficSystem.ip=body.ip;
                if (body.program)
                    newTrafficSystem.program=body.program;
                trafficSystem.updateOne({ id: TrafficSystem_id }, {
                name: newTrafficSystem.name,
                ip: newTrafficSystem.ip,
                program: newTrafficSystem.program})
                    .catch(err => {
                        Log.logger.info(`TRAFFIC CONTROLLER ERROR: update traffic system ${err}`);
                        res.status(500).json({status: 500 , msg: `Error update a traffic system`});
                    });
                res.json(body)
            }
        }
    },
    async deleteTrafficSystem(req, res) {
        const TrafficSystem_id = req.path.substring(1)
        Log.logger.info(`TRAFFIC CONTROLLER REQ: Get specific traffic system number ${TrafficSystem_id}`);
        if (isNaN(TrafficSystem_id)){
            Log.logger.info(`TRAFFIC CONTROLLER RES: input is nan error "${TrafficSystem_id}"`);
            res.status(400).json({status: 400 , msg: `Input is nan error "${TrafficSystem_id}"`});
        }
        else{
            Log.logger.info(`TRAFFIC CONTROLLER RES: delete traffic system number: ${TrafficSystem_id}`);
            trafficSystem.deleteOne ({ id: Number(TrafficSystem_id)})
                .then(docs => { res.json(docs)})
                .catch(err => {
                    Log.logger.info(`TRAFFIC CONTROLLER ERROR: deleting traffic system from db: ${err}`);
                    res.status(500).json({status: 500 , msg: `Server delete error`});
                });
        }
    }
};
