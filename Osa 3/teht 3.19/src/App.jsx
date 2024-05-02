import { useState, useEffect } from 'react'
import NameNumber from './NameNumber'
import PersonsService from './Services/PersonsService'
import Notification from './Message'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    content: null,
    type: false
  })


  const hook = () => {
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
  useEffect(hook, [])

  const handleDel = (event) => {
    const value = event.target.value
    console.log("list of persons before delete:",persons)
    console.log(value, "to be deleted")
    const unit = persons.find(person => person.id === value)
    console.log(unit)
    if (window.confirm("Delete "+ unit.name+ "?")) {
        PersonsService
        .del(unit.id)
        .then(response => {
         console.log(response.data, "removed")
         hook()
         setErrorMessage({content: unit.name+" removed", type: "alert"})
         setTimeout(() => {
           setErrorMessage({content: null, type: true})
         }, 3000);
 
        })
        .catch(error => console.log(error, "error removing person"))
    }
}    
  const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const addName = (event) => {
  event.preventDefault()
  console.log("painettu:", event.target)
  const nameObj = 
  {
    name: newName,
    number: newNumber,
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
    setErrorMessage({content: "name: "+ nameObj.name+" is already added", type: "alert"})
    setTimeout(() => {
      setErrorMessage({content: null, type: true})
    }, 3000);}
  else if(copyNumber){
    setErrorMessage({content: "number: "+ nameObj.number+" is already added", type: "alert"})
    setTimeout(() => {
      setErrorMessage({content: null, type: true})
    }, 3000);
  } 
  if (!copyName && !copyNumber) {
    PersonsService      
    .create(nameObj)
      .then(response=> {
        setPersons(persons.concat(response.data))
        setErrorMessage({content: nameObj.name+" added", type: "notification"})
        setTimeout(() => {
          setErrorMessage({content: null, type: true})
        }, 3000);
        console.log("palautus:", response)
      })
      .catch(error => 
        {console.log("error message: ",error)
          setErrorMessage({content: "Either name is <3 or number is <8", type: "alert"})
        setTimeout(() => {
          setErrorMessage({content: null, type: true})
        }, 3000);
      })
  }
  setNewName('')
  setNewNumber('')
  }

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