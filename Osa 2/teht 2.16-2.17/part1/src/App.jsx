import { useState, useEffect } from 'react'
import NameNumber from './NameNumber'
import PersonsService from './Services/PersonsService'
import Notification from './Message'
import { createPhonebookHandlers } from './handlers'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    content: null,
    type: false
  })


  const fetchPersons = () => {
    console.log("effect")
    PersonsService
      .getAll()
        .then(response=> {
          setPersons(response.data)
          console.log("response:",response)
          console.log("persons:",persons)
        }
      )
  }
  useEffect(fetchPersons, [])

  const { handleDel, handleNumberChange, handleNameChange, addName } = createPhonebookHandlers({
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    setErrorMessage,
    fetchPersons
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
          <NameNumber key = {person.id} person = {person} handleDel = {handleDel}/> 
        )}
      </ul>
    </div>
  )

}



export default App