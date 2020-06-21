const app = require("../app")
const expect = require('chai').expect
const request = require("supertest")
const mongoose = require("mongoose")
const Portfolio = require("../models/portfolio")
mongoose.Promise = global.Promise;
const DB_URL = "mongodb://localhost:27017"


const vaild_doc = [{ fullName: "hey", "bio": "Hey I am Test", projects: [], education: [], experiences: [] }, { fullName: "Hey", bio: "I am another test" }, {
	fullName: 'Susan Lee',
	email: 'SLee@gmail.com',
	bio: 'Web Developer at FANNG',

	github: 'github.com/SLee',
	linkedin: '',

	skills: ["Git", "JavaScript", "Docker", "Python", "HTML", "Databases", "Go"],

	projects: [{
		Title: "Halting Machine",
		Description: "A machine that answers if an algorithm will halt or not. Created to answer the age old question of reality.",
		SourceLink: "github.com/slee/haltingmachine",
		DemoLink: "slee.github.io",
		Highlights: ["Solves P vs NP problem.", "Won the Turning Award.", "Used Java, Python, C, Assembly, and every language known to man."],
		StartDate: "May 2020",
		EndDate: "June 2020"
	}],
	experiences: [{
		CompanyName: "Amazon",
		Position: "Web Developer",
		StartDate: "June 2018",
		EndDate: "Current",
		Highlights: ["Created the front website.", "Redesigned the color scheme."]
	}, {
		CompanyName: "Google",
		Position: "ML Engineer",
		StartDate: "June 2020",
		EndDate: "Current",
		Highlights: ["Lead the Google Brain Team", "Made Billion dollar in profit."]
	}],
	education: [{
		InstituteName: "Princton University",
		StartDate: "May 2015",
		EndDate: "Aug 2019",
		Degree: "Phd in Computer Science",
		Courses: ["Big Data", "Machine Learning", "Operating Systems", "Distributed Systems"]
	}, {
		InstituteName: "Harvard University",
		StartDate: "May 2010",
		EndDate: "Aug 2014",
		Degree: "Bsc in Computer Science",
		Courses: ["A.I.", "Linear Algebra"]
	}],
}]



before("Setting up", async () => {
	mongoose.connect(DB_URL, { useNewUrlParser: true })

})

// Testing all the api endpoints
describe("API Tests", () => {


	// Testing all the GET requests
	describe("GET", async () => {

		// Testing the /users endpoint
		describe("GET /users", async () => {
			it("should fail to get users", async () => {
				const res = await request(app).get("/users")
				expect(res.statusCode).to.equal(401)
				expect(res.body).to.have.property("error")
			})

			it("should fail to get users", async () => {
				const res = await request(app).get("/users/adsfhoinadf")
				expect(res.statusCode).to.equal(401)
				expect(res.body).to.have.property("error")
			})


		})



	})

	describe("POST", async () => {


		// Testing the post endpoint
		describe("POST /users", async () => {

			// Tesitng with the correct data
			vaild_doc.map((doc) => {
				it("should post the data and return the ID", async () => {
					const res = await request(app).post("/users").send(doc)
					expect(res.statusCode).to.equal(200)
					expect(res.body).to.have.property("id")
					expect(res.body).to.not.have.property("error")
				})
			})



		})
	})
})

