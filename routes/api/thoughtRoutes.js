const router = require('express').Router();

const { Thought } = require('../../models')
const { User } = require('../../models')

const {
    getThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        const updateUser = await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: newThought } });
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.route('/').get(getThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought);
router.route('/destroy/:thoughtId').delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;