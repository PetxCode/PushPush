const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
require("./utils/db");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./router/userRouter"));

app.listen(port, () => {
	console.log("server is ready!!!");
});
