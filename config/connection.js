const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socialAPIhw18', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;