const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const communitySchema = new mongoose.Schema({
    _id: { type: String, default: () => Snowflake.generate().toString() },
    name: { type: String, maxlength: 128, required: true },
    slug: { type: String, maxlength: 255, unique: true, required: true },
    owner: { type: String, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Community', communitySchema);