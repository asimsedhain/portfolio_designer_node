const createError = require("http-errors")
const express = require('express');
const router = express.Router();
const Portfolio = require("../models/portfolio")
const { verifyAccessTokenMiddleware, verifyAccessTokenLooseMiddleware} = require("../middleware/webTokensMiddleware")



// GETs all the portfolios for the user
router.get("/list", verifyAccessTokenMiddleware, async (req, res, next) =>{
	try{
		const portfolios = await Portfolio.find({userId: req.userId}, "_id portfolioName").exec()
		res.json(portfolios)
	}catch(error){
		next(createError(404))
	}	
})

// GETs the portfolio with the given id in query
router.get("/", async (req, res, next)=>{
	try{
		const portfolio = await Portfolio.findById(req.query.id, "-userId -portfolioName -_id").exec()
		if(portfolio){
			res.json(portfolio)
		} else{
			throw createError(404)
		}
	}catch (error){
		next(createError(404))
	}
})

// POSTs new portfolio for the user 
// returns id for portfolio
router.post("/", verifyAccessTokenLooseMiddleware, async (req, res, next)=>{
	try{
		const portfolioObject = {...req.body, userId: req.userId}
		const portfolio = new Portfolio(portfolioObject)
		await portfolio.save()
		res.json({id: portfolio._id})
	} catch (error){
		next(createError(400))
	}
})



module.exports = router
