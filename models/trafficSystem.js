const { Schema, model } = require('mongoose');
const trafficSystemSchema = new Schema({
    trafficSystem_id: {type : Number, required: true },
    trafficSystem_name: {type : String, required: true },
    trafficSystem_ip: {type : String, required: true },
    trafficSystem_program: {type : Number, required: true },
}, { collection: 'trafficSystems' });
const trafficSystem = model('trafficSystem', trafficSystemSchema);
module.exports = trafficSystem;