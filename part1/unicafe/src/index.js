import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({text, number}) => {
	return (
		<>
			<p>
				{text} <span>{number}</span>
			</p>
		</>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const average = (good - bad) / total || 0;
	const positivePercent = (good / total) * 100 || 0;
	if (total === 0) {
		return <div>No feedback given</div>;
	}
	return (
		<>
      <Statistic text="good" number={good}/>
			<Statistic text="neutral" number={neutral}/>
			<Statistic text="bad" number={bad}/>
			<Statistic text="total" number={total}/>
			<Statistic text="average" number={average}/>
			<Statistic text="positive %" number={positivePercent}/>
		</>
	);
};

const Button = ({ clickHandler, text }) => {
	return (
		<>
			<button onClick={clickHandler}>{text}</button>
		</>
	);
};

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const addToGood = () => {
		setGood(good + 1);
	};

	const addToNeutral = () => {
		setNeutral(neutral + 1);
	};

	const addToBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>Give FeedBack</h1>
			<Button clickHandler={addToGood} text="good" />
			<Button clickHandler={addToNeutral} text="neutral" />
			<Button clickHandler={addToBad} text="bad" />
			<h1>Statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
