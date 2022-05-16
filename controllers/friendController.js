const { Friend } = require('../models');

module.exports = {
    getFriend(req, res) {
        Friend.find({})
            .then((friends) => res.json(friends))
            .catch((err) => res.status(500).json(err));
    },
    getSingleFriend(req, res) {
        Friend.findOne({ _id: req.params.friendId })
            .select('-__v')
            .then((friends) => 
                !friends
                    ? res.status(404).json({ message: 'ID does not match existing friend' })
                    : res.json(friends)
            ).catch((err) => res.status(500).json(err));
    },
    createFriend(req, res) {
        Friend.create(req.body)
            .then((friends) => res.json(friends))
            .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        Friend.findOneAndDelete({ _id: req.params.friendId })
            .then((friends) => res.json(friends))
            .catch((err) => res.status(500).json(err));
    }
};