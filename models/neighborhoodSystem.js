const { Schema, model } = require('mongoose');
const neighborhoodSystemSchema = new Schema({
    id: {type : Number, required: true },
    type: {type : String, required: true },
    name: {type : String, required: true },
    address: {type : String, required: true },
    ip: {type : String, required: true },
    mode: {type : String, required: true },
    active: {type : Number, required: true }
}, { collection: 'neighborhoodSystems' });
const NeighborhoodSystem = model('NeighborhoodSystem', neighborhoodSystemSchema);
module.exports = NeighborhoodSystem;