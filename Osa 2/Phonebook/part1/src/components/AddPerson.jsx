import App from 'C:/Users/hirvo/OneDrive/Desktop/Fullstack/part1/Phonebook/part1/src/App'

const AddPerson = (event) => {
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
  App.persons.forEach((person) => {
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
    (alert(`${App.newName} is already added to phonebook`))
  } 
  else if(copyNumber){
    (alert(`${App.newNumber} is already added to phonebook`))
  }
  else{
  setPersons(App.persons.concat(nameObj))
  }
  setNewName('')
  setNewNumber('')
}

  export default AddPerson