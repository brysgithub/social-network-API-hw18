const { User } = require('../models');
const { Thought } = require('../models');

module.exports = {
    getUser(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'No user matches ID'})
                    : res.json(users)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate( req.params.userId, req.body, { new: true})
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { friends: req.params.friendsId })
            .then((newFriend) => res.json(newFriend))
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId}, { $pull: { friends: req.params.friendsId }}, { new: true })
            .then((oldFriend) => res.json(oldFriend))
            .catch((err) => res.status(500).json(err));
    }
}