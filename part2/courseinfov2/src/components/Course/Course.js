import React from "react";
import Header from './Header/Header'
import Content from './Content/Content'

const Course = ({course}) => {
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
			{/* <Total parts={course.parts} /> */}
		</>
	);
};

export default Course