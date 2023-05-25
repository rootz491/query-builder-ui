import React from "react";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";

const DatePicker = ({ now = new Date(), onApplyCallback }) => {
	const [start, setStart] = React.useState(
		moment(
			new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
		)
	);
	const [end, setEnd] = React.useState(
		moment(now).add(1, "days").subtract(1, "seconds")
	);

	const applyCallback = (startDate, endDate) => {
		setStart(startDate);
		setEnd(endDate);
		onApplyCallback && onApplyCallback(startDate, endDate);
	};

	let ranges = {
		"Today Only": [moment(start), moment(end)],
		"Yesterday Only": [
			moment(start).subtract(1, "days"),
			moment(end).subtract(1, "days"),
		],
		"3 Days": [moment(start).subtract(3, "days"), moment(end)],
	};
	let local = {
		format: "DD-MM-YYYY HH:mm",
		sundayFirst: false,
	};
	let maxDate = moment(start).add(24, "hour");

	return (
		<div>
			<DateTimeRangeContainer
				ranges={ranges}
				start={start}
				end={end}
				local={local}
				maxDate={maxDate}
				applyCallback={applyCallback}
			>
				<button className="btn btn-default">
					<div className="pull-left">
						<i className="fa fa-calendar" />
					</div>
					<div className="pull-right">
						<span>
							{start.format("DD-MM-YYYY HH:mm")} -{" "}
							{end.format("DD-MM-YYYY HH:mm")}
						</span>
					</div>
				</button>
			</DateTimeRangeContainer>
		</div>
	);
};

// class DateRangePicker extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		let now = new Date();
// 		let start = moment(
// 			new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
// 		);
// 		let end = moment(start).add(1, "days").subtract(1, "seconds");
// 		this.state = {
// 			start: start,
// 			end: end,
// 		};

// 		this.applyCallback = this.applyCallback.bind(this);
// 	}

// 	applyCallback(startDate, endDate) {
// 		this.setState({
// 			start: startDate,
// 			end: endDate,
// 		});
// 	}

// 	render() {
// 		let now = new Date();
// 		let start = moment(
// 			new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
// 		);
// 		let end = moment(start).add(1, "days").subtract(1, "seconds");
// 		let ranges = {
// 			"Today Only": [moment(start), moment(end)],
// 			"Yesterday Only": [
// 				moment(start).subtract(1, "days"),
// 				moment(end).subtract(1, "days"),
// 			],
// 			"3 Days": [moment(start).subtract(3, "days"), moment(end)],
// 		};
// 		let local = {
// 			format: "DD-MM-YYYY HH:mm",
// 			sundayFirst: false,
// 		};
// 		let maxDate = moment(start).add(24, "hour");

// 		return (
// 			<div>
// 				<DateTimeRangeContainer
// 					ranges={ranges}
// 					start={this.state.start}
// 					end={this.state.end}
// 					local={local}
// 					maxDate={maxDate}
// 					applyCallback={this.applyCallback}
// 				>
// 					<button className="btn btn-default">
// 						<div className="pull-left">
// 							<i className="fa fa-calendar" />
// 						</div>
// 						<div className="pull-right">
// 							<span>
// 								{this.state.start.format("DD-MM-YYYY HH:mm")} -{" "}
// 								{this.state.end.format("DD-MM-YYYY HH:mm")}
// 							</span>
// 						</div>
// 					</button>
// 				</DateTimeRangeContainer>
// 			</div>
// 		);
// 	}
// }

// export default DateRangePicker;

export default DatePicker;
