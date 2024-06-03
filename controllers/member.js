const Member = require('../models/Member');
const Community = require('../models/Community');
const Role = require('../models/Role');

exports.addMember = async (req, res) => {
    const { community, user, role } = req.body;

    try {
        const communityDetails = await Community.findById(community);
        if (!communityDetails) {
            return res.status(404).json({ error: 'Community not found' });
        }

        if (communityDetails.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Only Community Admin can add user' });
        }

        const roleDetails = await Role.findById(role);
        if (!roleDetails) {
            return res.status(404).json({ error: 'Role not found' });
        }

        const existingMember = await Member.findOne({ community, user });
        if (existingMember) {
            return res.status(400).json({ status: false, error: 'Member already exists in the community' });
        }

        const member = new Member({
            community,
            user,
            role
        });
        await member.save();

        res.status(201).json({
            "status": true,
            "content": {
                "data": member
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

exports.removeMember = async (req, res) => {
    const memberId = req.params.id;
    const userId = req.user.id;

    try {
        const member = await Member.findById(memberId).populate('community role user');
        if (!member) {
            return res.status(404).json({ status: false, error: 'Member not found' });
        }

        const communityDetails = await Community.findById(member.community);
        if (!communityDetails) {
            return res.status(404).json({ status: false, error: 'Community not found' });
        }

        const requesterRoles = await Member.find({ community: communityDetails.id, user: userId }).populate('role');

        const isAdminOrModerator = requesterRoles.some(member => 
            member.role.name === 'Community Admin' || member.role.name === 'Community Moderator'
        );

        if (!isAdminOrModerator) {
            return res.status(403).json({ status: false, error: 'Only Community Admin or Community Moderator can remove users' });
        }

        await Member.findByIdAndDelete(memberId);

        res.status(200).json({ status: true });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};