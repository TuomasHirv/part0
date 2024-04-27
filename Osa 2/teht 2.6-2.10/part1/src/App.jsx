import { useState } from 'react'
import NameNumber from './NameNumber'
const App = () => {

  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: "040157234",
      id: 1
    },
    { 
      name: 'as ds',
      number: "0401434324",
      id: 2
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const handleNumberChange = (event) => 
{
  setNewNumber(event.target.value)
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
  console.log(newName)

}
const addName = (event) => {
  event.preventDefault()
  console.log("painettu:", event.target)
  const nameObj = 
  {
    name: newName,
    number: newNumber,
    id: persons.length +1
  }

  let copyName = false
  let copyNumber = false
  persons.forEach((person) => {
    console.log("tarkistettu:",person.name)
    if (person.name == newName) {
      copyName = true
    }
    console.log("tarkistettu:",person.number)
    if (person.number == newNumber) {
      copyNumber = true}
    }
  )
  if (copyName) {
    (alert(`${newName} is already added to phonebook`))
  } 
  else if(copyNumber){
    (alert(`${newNumber} is already added to phonebook`))
  }
  else{
  setPersons(persons.concat(nameObj))
  }
  setNewName('')
  setNewNumber('')
}


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}
      >
        <div>
          name: <input 
          value = {newName} 
          onChange = {handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value = {newNumber} 
          onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Name & Number</h2>
      <ul>
          {persons.map(person => 
          <NameNumber key = {person.id} person = {person}/>
        )}
      </ul>
    </div>
  )

}



export default App