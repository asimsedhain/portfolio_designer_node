const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Project = { Title: { type: String, required: true }, SourceLink: String, DemoLink: String, Description: String, Highlights: [String] }

const Education = { InstituteName: { type: String, required: true }, StartDate: Date, EndDate: Date, Degree: String }

const SocialMediaLink = { Title: { type: String, required: true }, Link: { type: String, required: true } }

const Experience = { CompanyName: { type: String, required: true }, Position: { type: String, required: true }, StartDate: Date, EndDate: Date, Description: String, Highlights: [String] }


const portfolioSchema = new Schema({
	Name: {
		type: String,
		required: true,
		unique: false
	},

	Bio: {
		type: String,
		required: true
	},

	WebsiteState: {},

	Projects: [Project],

	Education: [Education],

	SocialMediaLinks: [SocialMediaLink],

	Experiences: [Experience],

	Skills: [String],

})


module.exports = mongoose.model("Portfolio", portfolioSchema)

