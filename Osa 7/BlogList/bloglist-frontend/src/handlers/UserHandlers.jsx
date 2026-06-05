export const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({ username, password })
    setUser(user)
    setUsername('')
    setPassword('')
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    navigate('/')
  } catch (error) {
    console.log("Error couldn't login", error)
    setErrorMessage({
      content: 'Wrong username or password',
      type: 'alert',
    })
    setTimeout(() => setErrorMessage(null), 2000)
  }
}

export const handleLogout = () => {
  window.localStorage.clear()
  setUser(null)
}
