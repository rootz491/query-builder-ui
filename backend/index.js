const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const CompanySchema = new mongoose.Schema({
	id: Number,
	name: String,
	symbol: String,
	sector: String,
	price: Number,
	volume: Number,
	timestamp: Date,
	marketCap: Number,
	earningsPerShare: Number,
	dividendYield: Number,
	peRatio: Number,
});
const Company = mongoose.model("Company", CompanySchema);

app.get("/", async (req, res) => {
	try {
		const mongooseQuery = req.query.mongooseQuery;
		const startDate = req.query.startDate;
		const endDate = req.query.endDate;

		//	aggregate query to:
		//	1. filter by date range
		//	2. filter using provided mongoose query

		

		const data = await Company.find(
			mongooseQuery ? JSON.parse(mongooseQuery) : {}
		);

		res.json(data);
	} catch (error) {
		console.log(error);
		res.json([]);
	}
});

app.post("/bulk", async (req, res) => {
	try {
		const out = await Company.insertMany(req.body);
		res.json(out ? "success" : "failure");
	} catch (error) {
		console.log(error);
		res.json("failure");
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
	mongoose
		.connect("mongodb://localhost:27017/ecommerce", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Connected to MongoDB");
			// Company.deleteMany({}).then(() => {
			// 	console.log("Deleted all documents");
			// });
		});
});
