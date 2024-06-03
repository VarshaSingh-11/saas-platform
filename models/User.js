const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const userSchema = new mongoose.Schema({
    _id: { type: String, default: () => Snowflake.generate().toString() },
    name: { type: String, maxlength: 64 },
    email: { type: String, maxlength: 128, unique: true, required: true },
    password: { type: String, maxlength: 64, required: true },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);