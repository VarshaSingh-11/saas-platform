const Community = require('../models/Community');
const Member = require('../models/Member');
const Role = require('../models/Role');
const User = require('../models/User');

exports.createCommunity = async (req, res) => {
    const { name } = req.body;

    try {
        const community = new Community({ name, slug: name, owner: req.user.id });
        await community.save();

        const adminRole = await Role.findOne({ name: 'Community Admin' });
        const member = new Member({ community: community.id, user: req.user.id, role: adminRole.id });
        await member.save();

        res.status(201).json({
            "status": true,
            "content": {
                "data": community
            }
        });
    } catch (error) {
        res.status(400).json({ status: false, error: error.message });
    }
};

exports.getAllCommunities = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const total = await Community.countDocuments();
        const pages = Math.ceil(total / limit);
        const communities = await Community.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const result = await Promise.all(communities.map(async (community) => {
            const user = await User.findById(community.owner);
            return {
                id: community.id,
                name: community.name,
                slug: community.slug,
                owner: {
                    id: user.id,
                    name: user.name
                },
                created_at: community.created_at,
                updated_at: community.updated_at
            };
        }));

        res.json({
            "status": true,
            "content": {
                "meta": {
                    total,
                    pages,
                    page,
                },
                "data": result
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

exports.getCommunityMembers = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        const community = await Community.findOne({ name: id });

        if (!community) {
            return res.status(404).json({ error: 'Community not found' });
        }

        const total = await Member.countDocuments({ community: community.id });
        const pages = Math.ceil(total / limit);
        const members = await Member.find({ community: community.id })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const expandedMembers = await Promise.all(members.map(async (member) => {
            const user = await User.findById(member.user, { name: 1 }); // Select only name
            const role = await Role.findById(member.role, { name: 1 }); // Select only name
            return {
                id: member.id,
                user: { id: user.id, name: user.name },
                role: { id: role.id, name: role.name },
                created_at: member.created_at,
                updated_at: member.updated_at
            };
        }));

        res.json({
            meta: {
                total,
                pages,
                page,
            },
            data: expandedMembers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMyOwnedCommunities = async (req, res) => {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    try {
        const total = await Community.countDocuments({ owner: userId });
        const pages = Math.ceil(total / limit);
        const communities = await Community.find({ owner: userId })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({
            meta: {
                total,
                pages,
                page: parseInt(page),
            },
            data: communities
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMyJoinedCommunities = async (req, res) => {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    try {
        const members = await Member.find({ user: userId });

        if (!members || members.length === 0) {
            return res.status(404).json({ error: 'Member not found for the user' });
        }

        const communityIds = [...new Set(members.map(member => member.community))];
        const total = communityIds.length;
        const pages = Math.ceil(total / limit);

        const communities = await Community.find({ _id: { $in: communityIds } })
            .populate({
                path: 'owner',
                select: 'id name'
            })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({
            meta: {
                total,
                pages,
                page: parseInt(page),
            },
            data: communities
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
