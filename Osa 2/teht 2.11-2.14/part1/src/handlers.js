import PersonsService from './Services/PersonsService'

const createPhonebookHandlers = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setErrorMessage,
  fetchPersons
}) => {
  const handleDel = (event) => {
    const value = event.target.value
    const unit = persons.find(person => person.id === value)

    if (window.confirm('Delete ' + unit.name + '?')) {
      PersonsService
        .del(unit.id)
        .then(response => {
          console.log(response.data, 'removed')
          fetchPersons()
          setErrorMessage({ content: response.data.name + ' removed', type: 'alert' })
          setTimeout(() => {
            setErrorMessage({ content: null, type: true })
          }, 3000)
        })
        .catch(error => console.log(error, 'error removing person'))
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
    console.log('painettu:', event.target)
    const nameObj =
    {
      name: newName,
      number: newNumber,
    }

    let copyName = false
    let copyNumber = false
    persons.forEach((person) => {
      console.log('tarkistettu:', person.name)
      if (person.name == newName) {
        copyName = true
      }
      console.log('tarkistettu:', person.number)
      if (person.number == newNumber) {
        copyNumber = true
      }
    }
    )
    if (copyName) {
      setErrorMessage({ content: 'name: ' + nameObj.name + ' is already added', type: 'alert' })
      setTimeout(() => {
        setErrorMessage({ content: null, type: true })
      }, 3000)
    } else if (copyNumber) {
      setErrorMessage({ content: 'number: ' + nameObj.number + ' is already added', type: 'alert' })
      setTimeout(() => {
        setErrorMessage({ content: null, type: true })
      }, 3000)
    } else {
      PersonsService
        .create(nameObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setErrorMessage({ content: nameObj.name + ' added', type: 'notification' })
          setTimeout(() => {
            setErrorMessage({ content: null, type: true })
          }, 3000)
          console.log('palautus:', response)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  return { handleDel, handleNumberChange, handleNameChange, addName }
}

export { createPhonebookHandlers }
