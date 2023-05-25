import React from "react";

import AsyncSelect from "react-select/async";

const colourOptions = [
	{ value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
	{ value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
	{ value: "purple", label: "Purple", color: "#5243AA" },
	{ value: "red", label: "Red", color: "#FF5630", isFixed: true },
];

export default ({
	options = colourOptions,
	onChange = (v) => console.log(v),
	value = null,
	className = "",
}) => {
	const filterColors = (inputValue) => {
		return options.filter((i) =>
			i.label.toLowerCase().includes(inputValue.toLowerCase())
		);
	};

	const promiseOptions = (inputValue) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(filterColors(inputValue));
			}, 1000);
		});

	return (
		<AsyncSelect
			className={className}
			value={value}
			onChange={onChange}
			loadOptions={promiseOptions}
			cacheOptions
			defaultOptions
		/>
	);
};
