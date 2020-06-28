const { verifyRefreshToken, verifyAccessToken} = require("../utility/webTokens")

const verifyAccessTokenMiddleware = (req, res, next) => {
	const encodedToken = req.headers["authorization"]
	try {

		const token = verifyAccessToken(encodedToken)
		req.userName = token.name
		req.userId = token.id
		next()
	} catch (error) {
		console.log(error)
		next(error)
	}
}


const verifyRefreshTokenMiddleware = (req, res, next)=>{
	const encodedToken = req.cookies.rwt
	try{
		const token = verifyRefreshToken(encodedToken)
		req.userId = token.id
		next()
	}catch(error){
		console.log(error)
		next(error)
	}
}


module.exports = {verifyAccessTokenMiddleware, verifyRefreshTokenMiddleware}