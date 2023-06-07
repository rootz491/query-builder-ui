import { useEffect, useState } from "react";
import moment from "moment";
import Table from "./components/table";
import DateRangePicker from "./components/dateRangePicker";
import {
	CustomQueryBuilderWithValue,
	CustomQueryBuilderWithField,
	CustomQueryBuilder,
} from "./components/customizedQueryBuilder";

const App = () => {
	const [mongooseQuery, setMongooseQuery] = useState("");
	const [startDate, setStartDate] = useState(
		moment(new Date(2022, 0, 1)).unix()
	);
	const [endDate, setEndDate] = useState(moment().subtract(3, "days").unix());
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log("Updated Mongoose Query", mongooseQuery);
	}, [mongooseQuery]);

	useEffect(() => {
		queryData();
	}, []);

	const queryData = async () => {
		// const localStartDate = moment(new Date(2022, 0, 1)).unix();
		// const localEndDate = moment(new Date(2023, 0, 20)).unix();

		await fetch(
			`http://localhost:3000/?mongooseQuery=${mongooseQuery}&startDate=${startDate}&endDate=${endDate}`
			// `http://localhost:3000/?mongooseQuery=${mongooseQuery}&startDate=${localStartDate}&endDate=${localEndDate}`
		)
			.then((res) => res.json())
			.then((resData) => {
				setData(resData);
			});
	};

	return (
		<>
			<DateRangePicker
				startDate={startDate}
				endDate={endDate}
				onApplyCallback={(startDate, endDate) => {
					console.log(
						"Start Date",
						moment(startDate).unix(),
						moment(startDate).format("DD-MM-YYYY HH:mm")
					);
					// change date to miliseconds and assign to state
					setStartDate(moment(startDate).unix());
					setEndDate(moment(endDate).unix());
				}}
			/>

			{/* <h1>Default Query Builder</h1>

			<CustomQueryBuilder
				onExecuteQuery={(query) => {
					setMongooseQuery(query);
				}}
			/> */}

			<h1>Query Builder with Custom Field Component</h1>
			<CustomQueryBuilderWithField
				onExecuteQuery={(query) => {
					setMongooseQuery(query);
				}}
			/>

			{/* <h1>Query Builder with Custom Value Component</h1>
			<CustomQueryBuilderWithValue /> */}

			<button onClick={() => queryData()}>Query Data</button>

			<div
				style={{
					height: "170px",
					width: "100%",
				}}
			></div>

			<Table
				data={data}
				limit={limit}
				skip={skip}
				onLimitChange={(limit) => {
					setLimit(limit);
				}}
				onSkipChange={(skip) => {
					setSkip(skip);
				}}
			/>
		</>
	);
};

export default App;
