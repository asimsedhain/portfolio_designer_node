const app = require("./app")
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017"

const PORT = process.env.PORT || 5000


mongoose.connect(DB_URL, {useNewUrlParser: true})

app.listen(PORT, () => {
	console.log(`${new Date().toLocaleString()}: Listening on: http://localhost:${PORT}`)
})