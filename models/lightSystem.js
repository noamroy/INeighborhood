const { Schema, model } = require('mongoose');
const lightSystemSchema = new Schema({
    lightSystem_id: {type : Number, required: true },
    lightSystem_name: {type : String, required: true },
    lightSystem_ip: {type : String, required: true },
    lightSystem_mode: {type : String, required: true },
    lightSystem_active: {type : Number, required: true }
}, { collection: 'lightsSystems' });
const LightSystem = model('LightSystem', lightSystemSchema);
module.exports = LightSystem;