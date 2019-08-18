import React from "react";

const Search = ({ showNames, handleSearch }) => {
	return (
		<>
			<span>Filter by Name</span>{" "}
			<input value={showNames} onChange={handleSearch} type="text" />
		</>
	);
};

export default Search;
