import '../index.css'
import Alert from '@mui/material/Alert';

const Notification = ({ message }) => {

    if (!message || !message.content) {
      return null
    }

    return (
      <div>
        {message.type === 'notification' ? (
        <Alert severity="success">
          {message.content}
        </Alert>) : (
          <Alert severity="warning">
            {message.content}
          </Alert>
        )
        }
      </div>
    )
  }

export default Notification
