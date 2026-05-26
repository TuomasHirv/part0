import '../index.css'

const Notification = ({ message }) => {

    if (!message || !message.content) {
      return null
    }

    return (
      <div className= { message.type } >
        {message.content}
      </div>
    )
  }

export default Notification
