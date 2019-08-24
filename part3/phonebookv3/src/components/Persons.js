import React from 'react'
import Person from './Person'

const Persons = ({persons, showNames, removeContact}) => {
  return(
    <>
    {persons
      .map(person =>
        Object.assign(person, { nameToSearch: person.name.toLowerCase() })
      ) //object spread operator throwing an error? {...person, nameToSearch: person.name.toLoweCase()}
      .filter(person => person.nameToSearch.includes(showNames.toLowerCase()))
      .map(person => {
        return <Person key={person.name} person={person} removeContact={removeContact} />;
      })}
      </>
  )
}

export default Persons