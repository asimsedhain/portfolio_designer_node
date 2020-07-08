const createError = require("http-errors")
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { decode } = require('jsonwebtoken')
const { createAccessToken, createRefreshToken, verifyAccessToken } = require("../utility/webTokens");
const { verifyRefreshTokenMiddleware, verifyAccessTokenMiddleware} = require("../middleware/webTokensMiddleware")

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

//GETs all the portfolios for the user
router.get("/portfolios", verifyAccessTokenMiddleware, async (req, res) =>{
	
})

//GETs the portfolio with the given id in query
router.get("/portfolio", verifyAccessTokenMiddleware, async (req, res)=>{
	res.json({ok: "ok"})

})


module.exports = router
