const { User } = require('../models');
const { Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thoughts) => 
                !thoughts
                    ? res.status(404).json({ message: 'No matching ID for thought'})
                    : res.json(thoughts)
            ).catch((err) => res.status(500).json(err));
    },
    async updateThought(req, res) {
        let updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { thoughtText: req.body.thoughtText}, {new: true})
        res.json(updatedThought);
    },
    async deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((deletedThought) => res.json(deletedThought))
            .catch((err) => res.status(500).json(err));
    },
    async addReaction(req, res) {
        let newReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {
            $push: {
                reactions: {
                    reactionBody: req.body.reactionBody,
                    username: req.body.username
                }
            }
        }, { new: true });
            res.json(newReaction);
    },

    async deletedReaction(req, res) {
        let deletedReact = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {
            $pull: {
                reactions: {
                    _id: req.params.reactionId
                }
            }
        }, { new: true });
        res.json(deletedReact)
    }
}