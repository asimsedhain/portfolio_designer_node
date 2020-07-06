const {sign, verify} = require('jsonwebtoken')


const createAccessToken = (id, name)=>{
	return sign({id, name}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

const createRefreshToken = (id)=>{
	return sign({id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}

const verifyAccessToken = (token)=>{
	return verify(token, process.env.ACCESS_TOKEN_SECRET)
}

const verifyRefreshToken = (token)=>{
	return verify(token, process.env.REFRESH_TOKEN_SECRET)
}



module.exports = {createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken}