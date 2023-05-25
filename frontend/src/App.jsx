import { useEffect, useState } from "react";
import Table from "./components/table";
import DateRangePicker from "./components/dateRangePicker";
import {
	CustomQueryBuilderWithValue,
	CustomQueryBuilderWithField,
	CustomQueryBuilder,
} from "./components/customizedQueryBuilder";

const App = () => {
	const [mongooseQuery, setMongooseQuery] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log("Updated Mongoose Query", mongooseQuery);
	}, [mongooseQuery]);

	useEffect(() => {
		queryData();
	}, []);

	const queryData = async () => {
		await fetch(`http://localhost:3000/?mongooseQuery=${mongooseQuery}`)
			/*
						&startDate=${moment(startDate).format(
							"YYYY-MM-DD HH:mm:ss"
						)}&endDate=${moment(endDate).format("YYYY-MM-DD HH:mm:ss")}
			 */
			.then((res) => res.json())
			.then((resData) => {
				setData(resData);
			});
	};

	return (
		<>
			<DateRangePicker
				onApplyCallback={(startDate, endDate) => {
					setStartDate(startDate);
					setEndDate(endDate);
				}}
			/>

			<h1>Default Query Builder</h1>

			<CustomQueryBuilder
				onExecuteQuery={(query) => {
					setMongooseQuery(query);
				}}
			/>

			<h1>Query Builder with Custom Field Component</h1>
			<CustomQueryBuilderWithField
				onExecuteQuery={(query) => {
					setMongooseQuery(query);
				}}
			/>

			<h1>Query Builder with Custom Value Component</h1>
			<CustomQueryBuilderWithValue />

			<button onClick={() => queryData()}>Query Data</button>

			<div
				style={{
					height: "170px",
					width: "100%",
				}}
			></div>

			<Table data={data} />
		</>
	);
};

export default App;
