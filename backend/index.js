const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const DATE_FIELD = "timestamp";

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
		const startDate = req.query.startDate; // Unix timestamp
		const endDate = req.query.endDate; // Unix timestamp

		const skip = Number(req.query.skip) || 0;
		const limit = Number(req.query.limit) || 10;

		const pipeline = [];

		// Stage 1: Filter by date range using Unix timestamps
		pipeline.push({
			$match: {
				[DATE_FIELD]: {
					$gte: new Date(startDate * 1000), // Convert Unix timestamp to milliseconds
					$lte: new Date(endDate * 1000), // Convert Unix timestamp to milliseconds
				},
			},
		});

		// Stage 2: Add custom query conditions based on dynamicConditions
		pipeline.push({
			$match: JSON.parse(mongooseQuery || "{}"),
		});

		// Stage 3: Apply any additional stages or operations to the pipeline as needed

		// Execute the aggregate query
		const result = await Company.aggregate(pipeline)
			.skip(skip)
			.limit(limit)
			.exec();

		res.json(result);
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
		});
});
