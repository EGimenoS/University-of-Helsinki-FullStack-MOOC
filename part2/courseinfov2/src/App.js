import React from "react";
import Course from './components/Course/Course'

const App = ({ course }) => {
	return (
		<>
			<Course course={course} />
		</>
	);
};

export default App;
