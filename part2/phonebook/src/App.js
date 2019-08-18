import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" }
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [showNames, setShowNames] = useState("");

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
				Filter by name:{" "}
				<input value={showNames} onChange={handleSearch} type="text" />
			</div>
			<h3>Add a new Contact</h3>
			<form onSubmit={addContact}>
				<div>
					name: <input value={newName} onChange={handleChangeName} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleChangeNumber} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
      {persons
        .map(person => Object.assign(person, {nameToSearch: person.name.toLowerCase()}) ) //object spread operator throwing an error? {...person, nameToSearch...
				.filter(person => person.nameToSearch.includes(showNames.toLowerCase()))
				.map(person => {
					return <Person key={person.name} person={person} />;
				})}
		</div>
	);
};

export default App;
