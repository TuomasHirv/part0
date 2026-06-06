const getUser = () => window.localStorage.getItem('loggedUser')

const setUser = (loggedUser) =>
  window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))

const removeUser = () => window.localStorage.clear()

export default { getUser, setUser, removeUser }
