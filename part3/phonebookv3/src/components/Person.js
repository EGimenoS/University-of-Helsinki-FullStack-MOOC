import React from 'react'

const Person = ({person, removeContact}) => {
  return(
    <>
      <p> {person.name} - {person.number} <button onClick={() => removeContact(person)}>Delete</button></p>
    </>
  )
}

export default Person