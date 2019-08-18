import React from "react";
import Part from "./Part/Part";

const Content = ({ parts }) => {
	return (
		<>
			<ul>
				{parts.map(part => {
					return <Part key={part.id} part={part} />;
				})}
			</ul>
		</>
	);
};

export default Content;
