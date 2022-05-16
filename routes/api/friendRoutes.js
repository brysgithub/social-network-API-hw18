const router = require('express').Router();

const {
    getFriend,
    getSingleFriend,
    createFriend,
    deleteFriend,
} = require('../../controllers/friendController');

router.route('/').get(getFriend).post(createFriend);
router.route('/:friendId').get(getSingleFriend);
router.route('/destory/:friendId').delete(deleteFriend);

module.exports = router;
