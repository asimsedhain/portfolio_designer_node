const express = require('express');
const router = express.Router();
const Portfolio = require("../models/portfolio")

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.statusCode=401
	res.json({"error": "Please insert ID"})
});

router.get("/:id", async (req, res) => {
	try {

		const user = await Portfolio.findById(req.params.id).exec()
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
	// res.json({id:req.params.id})
})

router.post("/", async (req, res) => {
	try {
		const user = new Portfolio(req.body)
		await user.save()
		res.json({ id: user._id})
	} catch (error) {

		console.log(`${new Date().toLocaleString()}: ${error}`)
		res.statusCode = 401
		res.json({ "error": "Invalid Data" })

	}
})

module.exports = router;
