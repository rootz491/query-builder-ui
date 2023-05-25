import { useMemo } from "react";
// import { Field, FieldSelectorProps } from "react-querybuilder";
import Select from "react-select";
import ReactSelect from "./ReactSelect";

export const CustomFieldSelector = (props) => {
	const options = useMemo(
		() => props.options.map((f) => ({ value: f.name, label: f.label })),
		[props.options]
	);

	const value = useMemo(
		() => options.find((f) => f.value === props.value),
		[props.value, options]
	);

	return (
		<Select
			className={props.className}
			options={options}
			value={value}
			onChange={(v) => {
				console.log("react select", v);
				props.handleOnChange(v?.value);
			}}
			isSearchable={true}
			isClearable={true}
			defaultValue={options[0]}
			styles={{
				zIndex: 1000,
			}}
		/>

		// <h1>rootz491</h1>

		// <ReactSelect
		// 	className={props.className}
		// 	options={options}
		// 	value={value}
		// 	onChange={(v) => props.handleOnChange(v)}
		// />
	);
};
