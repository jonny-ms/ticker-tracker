import * as React from "react";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";

export function Chart(props) {
	const [chartData, setChartData] = React.useState([]);
	const [marketOpen, setMarketOpen] = React.useState(null);
	const [temp, setTemp] = React.useState();

	React.useEffect(() => {
		console.log("in chart", props.data);
		const scope = Object.keys(props.data)[0];

		let parsedData = [];

		for (let i in props.data[scope]) {
			parsedData.unshift({ x: i, y: Number(props.data[scope][i].close) });
		}

		setChartData([{ id: scope, data: parsedData }]);

		scope === "1D"
			? // If day-scoped setMarketOpen to the first data-point's open value
			  setMarketOpen(props.data[scope][Object.keys(props.data[scope])[0]].open)
			: setMarketOpen(null);
	}, [props.data]);

	return (
		<>
			{temp && <p>{temp}</p>}
			<div style={{ height: "40vh" }}>
				<ResponsiveLine
					data={chartData}
					xFormat={x => moment(x, "YYYY-MM-DD HH:mm:ss").format("lll")}
					yScale={{ type: "linear", min: "auto", max: "auto" }}
					margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
					axisBottom={null}
					axisLeft={null}
					enableGridX={false}
					enableGridY={false}
					enablePoints={false}
					// colors={{ scheme: "blues" }}
					enableArea={true}
					useMesh={true}
					crosshairType="x"
					// onClick={point => setTemp(point.data.y)}
					onMouseMove={point => setTemp(point.data.y)}
					// onMouseEnter={(p, e) => console.log("Enter", p, e)}
					markers={
						marketOpen
							? [
									{
										axis: "y",
										value: marketOpen,
										lineStyle: { stroke: "#b0413e", strokeWidth: 2 },
										legend: "open",
										legendOrientation: "horizontal"
									}
							  ]
							: []
					}
					tooltip={({ point }) => <strong>{point.data.xFormatted}</strong>}
				/>
			</div>
		</>
	);
}
