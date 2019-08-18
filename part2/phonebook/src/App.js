import React, { useState } from "react";
import Person from './components/Person'

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  
  const addContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName
    }
    setPersons(persons.concat(newContact))
    setNewName('')
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addContact} >
				<div>
					name: <input value={newName} onChange={handleChangeName} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => {
        return <Person key={person.name} person={person} />
      })}
		</div>
	);
};

export default App;
