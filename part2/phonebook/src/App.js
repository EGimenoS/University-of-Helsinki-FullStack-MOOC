import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [showNames, setShowNames] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:3001/persons")
			.then(response => setPersons(response.data));
	}, []);

	const isDuplicated = name => {
		return persons.some(person => person.name === name);
	};

	const addContact = event => {
		event.preventDefault();

		if (isDuplicated(newName)) {
			alert(`${newName} is already in the Phonebook`);
			return;
		}

		const newContact = {
			name: newName,
			number: newNumber
		};
		setPersons(persons.concat(newContact));
		setNewName("");
		setNewNumber("");
	};

	const handleChangeName = event => {
		setNewName(event.target.value);
	};

	const handleChangeNumber = event => {
		setNewNumber(event.target.value);
	};

	const handleSearch = event => {
		setShowNames(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				<Search handleSearch={handleSearch} showNames={showNames} />
			</div>
			<h3>Add a new Contact</h3>
			<PersonForm
				addContact={addContact}
				handleChangeName={handleChangeName}
				handleChangeNumber={handleChangeNumber}
				newName={newName}
				newNumber={newNumber}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} showNames={showNames} />
		</div>
	);
};

export default App;
