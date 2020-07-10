const createError = require("http-errors")
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { createAccessToken, createRefreshToken} = require("../utility/webTokens");
const { verifyRefreshTokenMiddleware} = require("../middleware/webTokensMiddleware")

router.get("/refresh_token", verifyRefreshTokenMiddleware, async (req, res) => {
	let existingUser = await User.findById(req.userId).exec()
	if (!existingUser) {
		throw createError(401)
	}
	// Setting the cookie and responding back with the access token
	res.cookie("rwt", createRefreshToken(existingUser._id), { httpOnly: true })
	res.json({ "awt": createAccessToken(existingUser._id, existingUser.fullName) })
})

router.get("/logout", async (req, res)=>{
	res.clearCookie("rwt")
	res.json({status: "ok"})
})



module.exports = router
