const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Project = { Title: { type: String, required: true }, SourceLink: String, DemoLink: String, Description: String, Highlights: [String] , StartDate: String, EndDate: String}

const Education = { InstituteName: { type: String, required: true }, StartDate: String, EndDate: String, Degree: String, Courses: [String] }

const Experience = { CompanyName: { type: String, required: true }, Position: { type: String, required: true }, StartDate: String, EndDate: String, Description: String, Highlights: [String] }


const portfolioSchema = new Schema({
	fullName: {
		type: String,
		unique: false
	},
	email: String,

	github: String,
	linkedin: String,

	bio: {
		type: String,
	},

	websiteState: {},

	projects: [Project],

	education: [Education],

	experiences: [Experience],

	skills: [String],

})


module.exports = mongoose.model("Portfolio", portfolioSchema)

