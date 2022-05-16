const { Schema, model } = require('mongoose');

// TODO: make sure this works
const validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Error: Email adress invalid'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email']
    },
    thoughts: [
        {
            type: Schema.Types.Array,
            ref: 'thought',
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getter: true
    },
    id: false,
});

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;