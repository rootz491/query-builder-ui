import { useEffect, useState } from "react";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { CustomValueEditor } from "./customValueEditor";
import { CustomFieldSelector } from "./customFieldEditor";
// import CustomFieldSelector from "./customFieldSelector";

const fields = [
	{
		name: "id",
		label: "ID",
		type: "number",
		valueSources: ["value"],
		preferWidgets: ["number"],
	},
	{
		name: "name",
		label: "Name",
		type: "text",
	},
	{
		name: "symbol",
		label: "Symbol",
		type: "text",
	},
	{
		name: "sector",
		label: "Sector",
		type: "text",
	},
	{
		name: "price",
		label: "Price",
		type: "number",
		valueSources: ["value"],
		fieldSettings: {
			min: 10,
			max: 100,
		},
		preferWidgets: ["slider", "rangeslider"],
	},
	{
		name: "volume",
		label: "Volume",
		type: "number",
		valueSources: ["value"],
		fieldSettings: {
			min: 0,
		},
		preferWidgets: ["number"],
	},
	{
		name: "timestamp",
		label: "Timestamp",
		type: "datetime",
		valueSources: ["value"],
		preferWidgets: ["datetime"],
	},
	{
		name: "marketCap",
		label: "Market Cap",
		type: "number",
		valueSources: ["value"],
		fieldSettings: {
			min: 0,
		},
		preferWidgets: ["number"],
	},
	{
		name: "earningsPerShare",
		label: "Earnings Per Share",
		type: "number",
		valueSources: ["value"],
		fieldSettings: {
			min: 0,
		},
		preferWidgets: ["number"],
	},
	{
		name: "dividendYield",
		label: "Dividend Yield",
		type: "number",
		valueSources: ["value"],
		fieldSettings: {
			min: 0,
		},
		preferWidgets: ["number"],
	},
	{
		name: "peRatio",
		label: "P/E Ratio",
		type: "number",
		valueSources: ["value"],
		fieldSettings: {
			min: 0,
		},
		preferWidgets: ["number"],
	},
];

const initialQuery = {
	combinator: "and",
	rules: [],
};

export const CustomQueryBuilder = () => {
	const [query, setQuery] = useState(initialQuery);

	useEffect(() => {
		console.log("Updated Query", query);
	}, [query]);

	return (
		<QueryBuilder
			fields={fields}
			query={query}
			onQueryChange={(q) => setQuery(q)}
		/>
	);
};

export function CustomQueryBuilderWithValue() {
	const [query, setQuery] = useState({ combinator: "and", rules: [] });
	return (
		<QueryBuilder
			fields={fields}
			query={query}
			onQueryChange={(q) => setQuery(q)}
			controlElements={{ valueEditor: CustomValueEditor }}
		/>
	);
}

export const CustomQueryBuilderWithField = ({ onExecuteQuery }) => {
	const [query, setQuery] = useState({ combinator: "OR", rules: [] });

	useEffect(() => {
		console.log("Updated Query", query, formatQuery(query, "mongodb"));
		onExecuteQuery(formatQuery(query, "mongodb"));
	}, [query]);

	return (
		<QueryBuilder
			fields={fields}
			query={query}
			onQueryChange={(q) => setQuery(q)}
			controlElements={{
				fieldSelector: CustomFieldSelector,
			}}
		/>
	);
};
