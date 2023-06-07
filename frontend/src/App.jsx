import { useEffect, useState } from "react";
import moment from "moment";
import Table from "./components/table";
import DateRangePicker from "./components/dateRangePicker";
import {
	CustomQueryBuilderWithValue,
	CustomQueryBuilderWithField,
	CustomQueryBuilder,
} from "./components/customizedQueryBuilder";
import Select from "react-select";

const columnOptions = [
	{ label: "id", value: "id" },
	{ label: "name", value: "name" },
	{ label: "symbol", value: "symbol" },
	{ label: "sector", value: "sector" },
	{ label: "price", value: "price" },
	{ label: "volume", value: "volume" },
	{ label: "timestamp", value: "timestamp" },
	{ label: "marketCap", value: "marketCap" },
	{ label: "earningsPerShare", value: "earningsPerShare" },
	{ label: "dividendYield", value: "dividendYield" },
	{ label: "peRatio", value: "peRatio" },
];

const App = () => {
	const [selectedColumns, setSelectedColumns] = useState(columnOptions);
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
			`http://localhost:3000/?mongooseQuery=${mongooseQuery}&startDate=${startDate}&endDate=${endDate}&skip=${skip}&limit=${limit}`
			// `http://localhost:3000/?mongooseQuery=${mongooseQuery}&startDate=${localStartDate}&endDate=${localEndDate}`
		)
			.then((res) => res.json())
			.then((resData) => {
				setData(resData);
			});
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "15px",
				}}
			>
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

				<Select
					styles={{
						container: (provided) => ({
							...provided,
							width: "500px",
						}),
					}}
					value={selectedColumns}
					options={columnOptions}
					isMulti
					onChange={(selectedOptions) => {
						console.log("Selected Options", selectedOptions);
						setSelectedColumns(selectedOptions);
					}}
				/>
			</div>

			{/* <h1>Default Query Builder</h1>

			<CustomQueryBuilder
				onExecuteQuery={(query) => {
					setMongooseQuery(query);
				}}
			/> */}

			<div>
				<h1>Query Builder with Custom Field Component</h1>
				<CustomQueryBuilderWithField
					onExecuteQuery={(query) => {
						setMongooseQuery(query);
					}}
				/>
			</div>

			{/* <h1>Query Builder with Custom Value Component</h1>
			<CustomQueryBuilderWithValue /> */}

			<div
				style={{
					display: "flex",
					gap: "10px",
					margin: "50px 0px",
				}}
			>
				<div>
					<h3>Skip</h3>
					<input
						type="number"
						value={skip}
						onChange={(e) => {
							setSkip(e.target.value);
						}}
					/>
				</div>

				<div>
					<h3>Limit</h3>
					<input
						type="number"
						value={limit}
						onChange={(e) => {
							setLimit(e.target.value);
						}}
					/>
				</div>
			</div>

			<button onClick={() => queryData()}>Query Data</button>

			<div
				style={{
					height: "170px",
					width: "100%",
				}}
			>
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
			</div>
		</>
	);
};

export default App;
