const express = require('express');
const router = express.Router();
const objectId = require("mongoose").objectId
const Portfolio = require("../models/portfolio")

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send(JSON.stringify({ "error": "Please insert ID" }))
});

router.get("/:id", async (req, res) => {
	try {
		const user = await Portfolio.findById(objectId(req.param.id))
		if (user) {
			res.json(user)
		} else {
			throw "User is null"
		}
	} catch (error) {
		console.log(`${new Date().toLocaleString()}: ${error}`)
		res.statusCode = 401
		res.json({ "error": "Invalid ID" })
	}
})

router.post("/:id", async (req, res) => {
	try {
		const user = new Portfolio(req.body)
		const info = await user.save()
		res.json({ user, info })
	} catch (error) {

		console.log(`${new Date().toLocaleString()}: ${error}`)
		res.statusCode = 401
		res.json({ "error": "Invalid ID" })

	}
})

module.exports = router;
