import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import contactsService from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [showNames, setShowNames] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		contactsService
			.getAll()
			.then(initialContacts => setPersons(initialContacts));
	}, []);

	const isDuplicated = name => {
		return persons.some(person => person.name === name);
	};

	const removeContact = personToRemove => {
		if (!window.confirm(`Delete ${personToRemove.name}?`)) {
			return;
		}
		contactsService.removeContact(personToRemove.id).then(data => {
			console.log(data);
			setPersons(persons.filter(person => person.id !== personToRemove.id));
		});
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

		contactsService.create(newContact).then(returnedContact => {
			setPersons(persons.concat(returnedContact));
			setNewName("");
			setNewNumber("");
			setSuccessMessage(`added ${returnedContact.name}`);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		});
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
			<Notification message={successMessage} />
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
			<Persons
				persons={persons}
				showNames={showNames}
				removeContact={removeContact}
			/>
		</div>
	);
};

export default App;
