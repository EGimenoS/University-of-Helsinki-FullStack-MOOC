import React from "react";

const Country = ({ country, detailed }) => {
	const detailView = () => {
		return (
    <>
    <h1>{country.name}</h1>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population} </p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(language => <li>{language.name}</li>)}
    </ul>
    <img src={country.flag}></img>
    </>
    );
	};
	const regularView = () => {
		return <p>{country.name}</p>;
	};
	return <>{detailed ? detailView() : regularView()}</>;
};

export default Country;
