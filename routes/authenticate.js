const express = require('express');
const router = express.Router();
const User = require('../models/user')
const {decode} = require('jsonwebtoken')
const {createAccessToken, createRefreshToken} = require("../utility/webTokens");
const { getGoogleIdTokenFromCode } = require("../utility/getGoogleIdTokenFromCode");

// POST gets code from google api and returns access token and refresh token
router.post("/google", async (req, res) => {
	try {

		// Getting the jwt from google
		const jwtIdToken = await getGoogleIdTokenFromCode(req.body.code)


		// idToken will have the follow field:
		// sub: id token unique among google accounts
		// email
		// name: full name of the user
		// these three will be used to create/verify user
		idToken = decode(jwtIdToken)

		
		let existingUser = await User.findById(idToken.sub).exec()

		if (!existingUser) {
			const newUser = new User({ fullName: idToken.name, email: idToken.email, picture: idToken.picture, _id: idToken.sub, profile: idToken.profile})
			await newUser.save()
			existingUser = newUser
		}

		// Setting the cookie and responding back with the access token
		res.cookie("rwt", createRefreshToken(existingUser._id), { httpOnly: true })
		res.json({"awt": createAccessToken(existingUser._id, existingUser.name)})

	} catch (e) {
		console.log(e)
		res.json({ error: "User login error" })
	}

});




module.exports = router