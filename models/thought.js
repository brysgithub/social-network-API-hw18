const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, "Reaction cannot be longer than 280 characters."]
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

reactionSchema.get(function() {
    return this.createdAt.Date.now;
});

const thoughtSchema = new Schema({
    id: Schema.Types.ObjectId,
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'Thought length must be >1'],
        maxlength: 280,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
});

thoughtSchema.virtual('reactionCount')
    .get(function () {
        const numberOfReactions = this.reactions.length;
        return numberOfReactions;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;