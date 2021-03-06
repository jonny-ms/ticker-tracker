import * as React from "react";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";

export function Chart(props) {
	const [chartData, setChartData] = React.useState([]);
	const scope = Object.keys(props.data)[0];

	React.useEffect(() => {
		if (chartData[0] && scope === chartData[0].id) return;

		console.log("in chart", props.data);

		let parsedData = [];

		for (let i in props.data[scope]) {
			parsedData.unshift({ x: i, y: Number(props.data[scope][i].close) });
		}

		setChartData([{ id: scope, data: parsedData }]);
	}, [props.data, chartData]);

	return (
		<>
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
					enableArea={true}
					useMesh={true}
					animate={true}
					crosshairType="x"
					onMouseMove={point => props.onChange(point.data.y)}
					markers={
						scope === "1D"
							? [
									{
										axis: "y",
										value: props.marketOpen,
										lineStyle: {
											stroke: "grey",
											strokeWidth: 2,
											strokeDasharray: "5, 10",
											strokeOpacity: 0.5
										},
										legend: "open",
										legendOrientation: "vertical"
									}
							  ]
							: []
					}
					tooltip={({ point }) => (
						<span className="tooltip">{point.data.xFormatted}</span>
					)}
				/>
			</div>
		</>
	);
}
