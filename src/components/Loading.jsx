import React from "react";

export function Loading(props) {
	return (
		<>
			{props.show && (
				<img
					className="spinner"
					src="/images/loading.svg"
					alt="Loading Indicator"
				/>
			)}
		</>
	);
}
