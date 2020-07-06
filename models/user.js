const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
	_id: Number,
	fullName: String,
	email: String,
	picture: String,
	profile: String	

})


module.exports = mongoose.model("User", userSchema)

