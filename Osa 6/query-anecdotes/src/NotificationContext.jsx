import { createContext, useState, useRef, useContext } from 'react'
const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState("")
    const timeOutID = useRef(null)
    const createNotification = (text) => {
        if (timeOutID.current !== null) {
            timeOutID.current = null
        }

        setNotification(text)
        timeOutID.current = setTimeout(() => {
            setNotification("")
            timeOutID = null
        }, 5000)
    }

    return (
        <NotificationContext.Provider value={{ notification, createNotification}}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotify = () => {
    const context = useContext(NotificationContext)
    return context
}