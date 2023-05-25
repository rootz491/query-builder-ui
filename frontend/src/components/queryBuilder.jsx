import React, { useState, useCallback } from "react";

// import {
// 	Utils as Utils,
// 	Query,
// 	Builder,
// 	BasicConfig,
// } from "@react-awesome-query-builder/ui";
// import "@react-awesome-query-builder/ui/css/styles.css";
// or import '@react-awesome-query-builder/ui/css/compact_styles.css';
const InitialConfig = BasicConfig;
// <<<

import {
	Utils,
	Export,
	Import,
	BasicFuncs,
} from "@react-awesome-query-builder/ui";

import {
	Query,
	Builder,
	BasicConfig,
	VanillaWidgets,
	CustomOperators,
} from "@react-awesome-query-builder/ui";

// import "@react-awesome-query-builder/ui/css/styles.css";
import "@react-awesome-query-builder/ui/css/compact_styles.css";

// You need to provide your own config. See below 'Config format'
const config = {
	...InitialConfig,
	fields: {
		id: {
			label: "ID",
			type: "number",
			valueSources: ["value"],
			preferWidgets: ["number"],
		},
		name: {
			label: "Name",
			type: "text",
		},
		symbol: {
			label: "Symbol",
			type: "text",
		},
		sector: {
			label: "Sector",
			type: "text",
		},
		price: {
			label: "Price",
			type: "number",
			valueSources: ["value"],
			fieldSettings: {
				min: 10,
				max: 100,
			},
			preferWidgets: ["slider", "rangeslider"],
		},
		volume: {
			label: "Volume",
			type: "number",
			valueSources: ["value"],
			fieldSettings: {
				min: 0,
			},
			preferWidgets: ["number"],
		},
		timestamp: {
			label: "Timestamp",
			type: "datetime",
			valueSources: ["value"],
			preferWidgets: ["datetime"],
		},
		marketCap: {
			label: "Market Cap",
			type: "number",
			valueSources: ["value"],
			fieldSettings: {
				min: 0,
			},
			preferWidgets: ["number"],
		},
		earningsPerShare: {
			label: "Earnings Per Share",
			type: "number",
			valueSources: ["value"],
			fieldSettings: {
				min: 0,
			},
			preferWidgets: ["number"],
		},
		dividendYield: {
			label: "Dividend Yield",
			type: "number",
			valueSources: ["value"],
			fieldSettings: {
				min: 0,
			},
			preferWidgets: ["number"],
		},
		peRatio: {
			label: "P/E Ratio",
			type: "number",
			valueSources: ["value"],
			fieldSettings: {
				min: 0,
			},
			preferWidgets: ["number"],
		},
	},
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: Utils.uuid(), type: "group" };

const QueryBuilder = ({ onExecuteQuery }) => {
	const [state, setState] = useState({
		tree: Utils.checkTree(Utils.loadTree(queryValue), config),
		config: config,
	});

	const onChange = useCallback((immutableTree, config) => {
		// Tip: for better performance you can apply `throttle` - see `examples/demo`
		setState((prevState) => ({
			...prevState,
			tree: immutableTree,
			config: config,
		}));

		const jsonTree = Utils.getTree(immutableTree);
		console.log(jsonTree);
		// `jsonTree` can be saved to backend, and later loaded to `queryValue`
	}, []);

	const renderBuilder = useCallback(
		(props) => (
			<div className="query-builder-container" style={{ padding: "10px" }}>
				<div className="query-builder qb-lite">
					<Builder {...props} />
				</div>
			</div>
		),
		[]
	);

	const executeQuery = () => {
		console.log(
			"Mongoose Query",
			JSON.stringify(Utils.mongodbFormat(state.tree, state.config))
		);
		onExecuteQuery(Utils.mongodbFormat(state.tree, state.config));
	};

	return (
		<>
			<Query
				{...config}
				value={state.tree}
				onChange={onChange}
				renderBuilder={renderBuilder}
			/>
			<button onClick={() => executeQuery()}>Execute Query</button>
		</>
	);
};
export default QueryBuilder;
