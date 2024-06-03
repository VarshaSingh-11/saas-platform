const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role');
const authController = require('../controllers/auth');
const communityController = require('../controllers/community');
const memberController = require('../controllers/member');
const authMiddleware = require('../middlewares/auth');

router.post('/v1/role', roleController.createRole);
router.get('/v1/role', roleController.getAllRoles);

router.post('/v1/auth/signup', authController.signup);
router.post('/v1/auth/signin', authController.signin);
router.get('/v1/auth/me', authMiddleware, authController.getMe);

router.post('/v1/community', authMiddleware, communityController.createCommunity);
router.get('/v1/community', communityController.getAllCommunities);
router.get('/v1/community/:id/members', communityController.getCommunityMembers);
router.get('/v1/community/me/owner', authMiddleware, communityController.getMyOwnedCommunities);
router.get('/v1/community/me/member', authMiddleware, communityController.getMyJoinedCommunities);

router.post('/v1/member', authMiddleware, memberController.addMember);
router.delete('/v1/member/:id', authMiddleware, memberController.removeMember);

module.exports = router;