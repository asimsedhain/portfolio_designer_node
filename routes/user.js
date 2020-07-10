const createError = require("http-errors")
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Portfolio = require("../models/portfolio")
const objectId = require("mongoose").Types.ObjectId
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

// GETs all the portfolios for the user
router.get("/portfolios", verifyAccessTokenMiddleware, async (req, res, next) =>{
	try{
		const portfolios = await Portfolio.find({userId: req.userId}, "_id portfolioName")
		res.json(portfolios)
	}catch(error){
		console.log(`${new Date().toLocaleString()}: ${error}`)
		next(createError(400))
	}	
})

// GETs the portfolio with the given id in query
router.get("/portfolio", verifyAccessTokenMiddleware, async (req, res, next)=>{
	try{
		const query = {_id: objectId(req.query.id), userId: req.userId}
		const portfolio = await Portfolio.findOne(query, "-userId").exec()
		console.log(portfolio)	
		if(portfolio){
			res.json(portfolio)
		} else{
			throw createError(400)
		}
	}catch (error){
		console.log(`${new Date().toLocaleString()}: ${error}`)
		next(createError(400))
	}
})

// POSTs new portfolio for the user 
router.post("/portfolio", verifyAccessTokenMiddleware, async (req, res, next)=>{
	try{
		const portfolioObject = {...req.body, userId: req.userId}
		const portfolio = new Portfolio(portfolioObject)
		await portfolio.save()
		res.json({status: "success"})
	} catch (error){
		console.log(`${new Date().toLocaleString()}: ${error}`)
		next(createError(400))
	}
})



module.exports = router
