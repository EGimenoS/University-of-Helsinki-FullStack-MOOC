import React from "react";
import Course from './components/Course/Course'

const App = ({ courses }) => {
	return (
		<>
    <h1>Course Development Curriculum</h1>
    {courses.map(course => 	<Course key={course.id} course={course} />)}
		</>
	);
};

export default App;
