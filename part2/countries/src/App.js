import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import Countries from "./components/Countries";

function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [countries, setCountries] = useState([]);

	const handleSearchInput = event => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		axios
			.get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
			.then(response => setCountries(response.data));
	}, [searchTerm]);

	// if (countries.length > 10) {
	//   return <div>Too many matches, specify another filter</div>
	// }

	return (
		<>
			<SearchBox
				handleSearchInput={handleSearchInput}
				searchTerm={searchTerm}
			/>
      {countries.length >10 ? <div>Too many, specify more filters</div> : <Countries countries={countries} />  }
		</>
	);
}

export default App;