import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import moment from "moment";

const Table = ({ data = [] }) => {
	//should be memoized or stable
	const columns = useMemo(
		() => [
			{
				accessorKey: "id",
				header: "ID",
			},
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "symbol",
				header: "Symbol",
			},
			{
				accessorKey: "sector",
				header: "Sector",
			},
			{
				accessorKey: "price",
				header: "Price",
			},
			{
				accessorKey: "volume",
				header: "Volume",
			},
			{
				accessorKey: "timestamp",
				header: "Timestamp",
			},
			{
				accessorKey: "marketCap",
				header: "Market Cap",
			},
			{
				accessorKey: "earningsPerShare",
				header: "Earnings Per Share",
			},
			{
				accessorKey: "dividendYield",
				header: "Dividend Yield",
			},
			{
				accessorKey: "peRatio",
				header: "P/E Ratio",
			},
		],
		[]
	);

	return (
		<MaterialReactTable
			columns={columns}
			// data={() =>
			// 	data.map((row) => ({
			// 		...row,
			// 		timestamp: moment(row.timestamp).format("DD-MM-YYYY HH:mm:ss"),
			// 	}))
			// }
      data={data}
		/>
	);
};

export default Table;
