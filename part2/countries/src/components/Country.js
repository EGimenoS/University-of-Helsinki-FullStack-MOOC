import React, {useState} from "react";
import '../main.css'

const Country = ({ country, detailed }) => {
  const [viewDetailed, setViewDetailed] = useState(false)
  const toggleView = () => {
    setViewDetailed(true)
  }
	const detailView = () => {
		return (
			<>
				<h1>{country.name}</h1>
				<p>Capital: {country.capital}</p>
				<p>Population: {country.population} </p>
				<h2>Languages</h2>
				<ul>
					{country.languages.map(language => (
						<li key={language.name}>{language.name}</li>
					))}
				</ul>
				<img src={country.flag} alt={`the flag from ${country.name}`} />
			</>
		);
	};
	const regularView = () => {
		return (
			<>
				<div>
					{country.name}
					<button onClick={toggleView}>View</button>
          { viewDetailed ? detailView() : ''}
				</div>
			</>
		);
	};
	return <>{detailed ? detailView() : regularView()}</>;
};

export default Country;
