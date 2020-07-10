const createError = require("http-errors")
const express = require('express');
const router = express.Router();
const Portfolio = require("../models/portfolio")
const {  verifyAccessTokenMiddleware} = require("../middleware/webTokensMiddleware")



// GETs all the portfolios for the user
router.get("/list", verifyAccessTokenMiddleware, async (req, res, next) =>{
	try{
		const portfolios = await Portfolio.find({userId: req.userId}, "_id portfolioName")
		res.json(portfolios)
	}catch(error){
		console.log(`${new Date().toLocaleString()}: ${error}`)
		next(createError(400))
	}	
})

// GETs the portfolio with the given id in query
router.get("/", verifyAccessTokenMiddleware, async (req, res, next)=>{
	try{
		const portfolio = await Portfolio.findById(req.query.id).exec()
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
router.post("/", verifyAccessTokenMiddleware, async (req, res, next)=>{
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
