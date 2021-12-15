//~~~~~~~~~INCLUDES~~~~~~~~~~~~
const User = require('../models/user');
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
    async loginUser(req, res) {
        const userid = request.body.id;
        const password = request.body.password;
        Log.logger.info(`LOGIN SYSTEM CONTROLLER REQ: Login id:${id}`);

        if (userid && password) {
            const userDataResponse = await User.find({ id: userid })
                .catch(err => {
                    Log.logger.info(`LOGIN SYSTEM CONTROLLER ERROR: Data base retriving error `);
                    res.status(503).json({ "status": 503, "msg": `Database retriving error` });
                    return;
                });
            if (userDataResponse.length != 0) {
                const userData = userDataResponse[0];
                if (password == userData.id) {
                    //****************************************************** ADD WHAT TO DO WHEN LOGIN ******************************************
                    Log.logger.info(`Login SYSTEM CONTROLLER RES: Succesfull login: ${userid}`);
                    res.json(userData);
                }
                else {
                    Log.logger.info(`Login SYSTEM CONTROLLER ERROR: Failed login attempt: ${userid}`);
                    res.status(401).json({ "status": 401, "msg": `Incorrect password` });
                }

            }
        }
        else {
            res.status(401).json({ "status": 401, "msg": `Please enter username and password` });
        }
    },
    async registerUser(req, res) {
        Log.logger.info(`REGISTER SYSTEM CONTROLLER REQ: POST add a new user`);
        const body = req.body;
        if (body.id && body.password) {
            const userDataResponse = await User.find({ id: body.id })
                .catch(err => {
                    Log.logger.info(`REGISTER SYSTEM CONTROLLER ERROR: Database retriving error`);
                    res.status(503).json({ "status": 503, "msg": `Database retriving error` });
                    return;
                });
            if (userDataResponse.length != 0) {
                Log.logger.info(`REGISTER SYSTEM CONTROLLER ERROR: ID exists`);
                res.status(401).json({ "status": 401, "msg": `ID exists` });
                return;
            }
            try {
                const newUser = new User({
                    "id": body.id,
                    "firstName": body.firstName,
                    "lastName": body.lastName,
                    "password": body.password
                });
                const result = newUser.save();
            }
            catch((err) => {
                res.status(503).json({ "status": 503, "msg": `Error creating user` });
            })
            
        }
        else {
            res.status(401).json({ "status": 401, "msg": `Please enter username and password` });
        }
        const NeighborhoodSystem_id = await NeighborhoodSystem.find()
            .catch(err => {
                Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER ERROR: getting the data from db ${err}`);
                res.status(500).json({ status: 500, msg: `Server error` });
            });
        if (NeighborhoodSystem_id.length != 0)
            NeighborhoodSystem_id = NeighborhoodSystem_id[(NeighborhoodSystem_id.length) - 1].id + 1;
        else
            NeighborhoodSystem_id = 1;
        if (body.type && body.name && body.address &&
            body.ip && body.mode && body.active) {
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
                res.status(500).json({ status: 500, msg: `Server error` });
            }
        } else {
            Log.logger.info(`NEIGHBORHOOD SYSTEM CONTROLLER RES: Input error!`);
            res.status(400).json({ status: 400, msg: `Input error!` });
        }
    }
};
