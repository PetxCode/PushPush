const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URL2).then(() => {
	console.log("Database now connected...!");
});

module.exports = mongoose;
