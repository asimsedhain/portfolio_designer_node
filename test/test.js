const app = require("../app")
const expect = require('chai').expect
const request = require("supertest")
const mongoose = require("mongoose")

const DB_URL = process.env.DB_URL 

before("Setting up", async () => {
	await mongoose.connect(DB_URL, { useNewUrlParser: true })
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

			it("should fail to get users", async ()=>{
				const res = await request(app).get("/users/adsfhoinadf")
				expect(res.statusCode).to.equal(401)
				expect(res.body).to.have.property("error")
			})

		})


	})

	describe("POST", async () => {


		// Testing the post endpoint
		describe("POST /users", async () => {
			it("should post the data and return the ID", async () => {
				const res = await request(app).post("/users").send({ Name: "Test", Bio: "Hey I am Test", Projects: [], Education: [], SocialMediaLinks: [], Experiences: [] })
				expect(res.statusCode).to.equal(200)
				expect(res.body).to.have.property("id")
				expect(res.body).to.not.have.property("error")
			})

			it("should not post data and should return an error", async () => {
				const res = await request(app).post("/users").send({ Bio: "Hey I am Test", Projects: [], Education: [], SocialMediaLinks: [], Experiences: [] })
				expect(res.statusCode).to.equal(401)
				expect(res.body).to.have.property("error")
			})

			it("should not post data and should return an error", async () => {
				const res = await request(app).post("/users").send({ Name: "Test", Projects: [], Education: [], SocialMediaLinks: [], Experiences: [] })
				expect(res.statusCode).to.equal(401)
				expect(res.body).to.have.property("error")
			})
		})
	})
})

