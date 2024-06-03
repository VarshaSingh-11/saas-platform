const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const roleSchema = new mongoose.Schema({
    _id: { type: String, default: () => Snowflake.generate().toString() },
    name: { type: String, maxlength: 64, unique: true, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Role', roleSchema);