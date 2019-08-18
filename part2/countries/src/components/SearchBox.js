import React from "react";

const SearchBox = ({searchTerm, handleSearchInput}) => {
	return (
		<>
			Search by country name:
			<input value={searchTerm} onChange={handleSearchInput} type="text" />
		</>
	);
};

export default SearchBox
