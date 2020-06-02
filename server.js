const app = require("./app")
const mongoose = require("mongoose")


const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000


// mongoose.connect(DB_URL, {useNewUrlParser: true})

app.listen(PORT, () => {
	console.log(`${new Date().toLocaleString()}: Listening on: http://localhost:${PORT}`)
})