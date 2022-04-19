const mongoose = require('mongoose');
//const Schema = mongoose.Schema; same as the below line
const { Schema } = mongoose;

//can add or remove properties of the schema without issue
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0}
});

//2 inputs means we're putting into mongo
mongoose.model('users', userSchema);