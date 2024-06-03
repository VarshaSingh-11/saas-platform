const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    const { name } = req.body;

    try {
        const role = new Role({ name });
        await role.save();
        res.status(201).json({
            "status": true,
            "content": {
                "data": role
            }
        });
    } catch (error) {
        res.status(400).json({ status: false, error: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const total = await Role.countDocuments();
        const pages = Math.ceil(total / limit);
        const roles = await Role.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({
            "status": true,
            "content": {
                "meta": {
                    total,
                    pages,
                    page,
                },
                "data": roles,
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};