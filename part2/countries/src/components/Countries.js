import React from "react";
import Country from './Country'

const Countries = ({ countries }) => {
  const detailed = countries.length === 1 ? true : false
	return (
		<>
			<p>Results:</p>
			{countries.map(country => (
        <Country key={country.numericCode} detailed={detailed} country={country} />
			))}
		</>
	);
};

export default Countries;
