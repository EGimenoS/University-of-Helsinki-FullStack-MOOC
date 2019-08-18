import React from "react";

const Total = ({ parts }) => {
	const total = parts.reduce((sum, part) => {
		return sum + part.exercises;
	}, 0);

	return (
		<>
			<p>Total Number of exercises is {total}</p>
		</>
	);
};

export default Total;
