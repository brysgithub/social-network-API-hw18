const router = require('express').Router();

const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getSingleUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);
router.route('/:userId').get(getSingleUser);
router.route('/update/:userId').put(updateUser);
router.route('/destroy/:userId').delete(deleteUser);
router.route('/:userId/friends/:friendsId').put(addFriend);
router.route('/:userId/friends/:friendsId').delete(removeFriend);

module.exports = router;
