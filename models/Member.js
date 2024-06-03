const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const memberSchema = new mongoose.Schema({
    _id: { type: String, default: () => Snowflake.generate().toString() },
    community: { type: String, ref: 'Community', required: true },
    user: { type: String, ref: 'User', required: true },
    role: { type: String, ref: 'Role', required: true },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Member', memberSchema);