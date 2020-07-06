const axios = require('axios');

async function getGoogleIdTokenFromCode(code) {

	const { data } = await axios({
		url: `https://oauth2.googleapis.com/token`,
		method: 'post',
		data: {
			client_id: process.env.GOOGLE_APP_ID,
			client_secret: process.env.GOOGLE_APP_SECRET,
			redirect_uri: process.env.GOOGLE_REDIRECT_URL,
			grant_type: 'authorization_code',
			code: code
		},
	});
	return data.id_token;
}
exports.getGoogleIdTokenFromCode = getGoogleIdTokenFromCode;
