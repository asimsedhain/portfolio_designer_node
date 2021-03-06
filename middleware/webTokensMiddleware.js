const createError = require("http-errors");
const {
	verifyRefreshToken,
	verifyAccessToken,
} = require("../utility/webTokens");

const verifyAccessTokenMiddleware = (req, res, next) => {
	const header = req.headers["authorization"];
	if (!header) {
		next(createError(401));
		return;
	}
	try {
		// header comes in "Bearer TOKEN" format.
		// we split the token and decode it
		const token = verifyAccessToken(header.split(" ")[1]);
		req.userName = token.name;
		req.userId = token.id;
		next();
	} catch (error) {
		console.log(error);
		next(createError(401));
	}
};

const verifyRefreshTokenMiddleware = (req, res, next) => {
	const encodedToken = req.cookies.rwt;
	if (!encodedToken) {
		next(createError(401));
		return
	}
	try {
		const token = verifyRefreshToken(encodedToken);
		req.userId = token.id;
		next();
	} catch (error) {
		console.log(error);
		next(createError(401));
	}
};

const verifyAccessTokenLooseMiddleware = (req, res, next)=>{
	const header = req.headers["authorization"];
	if (!header) {
		next();
		return;
	}
	try {
		// header comes in "Bearer TOKEN" format.
		// we split the token and decode it
		const token = verifyAccessToken(header.split(" ")[1]);
		req.userName = token.name;
		req.userId = token.id;
		next();
	} catch (error) {
		console.log(error);
		next();
	}


}

module.exports = { verifyAccessTokenMiddleware, verifyRefreshTokenMiddleware , verifyAccessTokenLooseMiddleware};
