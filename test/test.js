const app = require("../app")
const expect = require('chai').expect
const request = require("supertest")
const mongoose = require("mongoose")
const Portfolio = require("../models/portfolio")

const DB_URL = "mongodb://localhost:27017"
mongoose.set('bufferCommands', false);

let ids;
const vaild_doc = [{ Name: "hey", "Bio": "Hey I am Test", Projects: [], Education: [], SocialMediaLinks: [], Experiences: [] }, { Name: "Hey", Bio: "I am another test" }]
const invalid_doc = [{ "Bio": "Hey I am Test", Projects: [], Education: [], SocialMediaLinks: [], Experiences: [] }, { Name: "Test", Projects: [], Education: [], SocialMediaLinks: [], Experiences: [] }]



before("Setting up", async () => {
	await mongoose.connect(DB_URL, { useNewUrlParser: true })

	ids = (await Portfolio.insertMany(vaild_doc)).map(doc => doc._id)

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

			ids.map((id) => {
				it("should get the users", async () => {
					const res = await request(app).get(`/users/${id}`)
					expect(res.statusCode).to.equal(200)
					expect(res.body).to.have.property("Name")
					expect(res.body).to.have.property("Bio")
					expect(res.body).to.not.have.property("error")
				})
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


			// Testing with incorrect data
			invalid_doc.map((doc) => {
				it("should not post data and should return an error", async () => {
					const res = await request(app).post("/users").send(doc)
					expect(res.statusCode).to.equal(401)
					expect(res.body).to.have.property("error")
				})
			})


		})
	})
})

