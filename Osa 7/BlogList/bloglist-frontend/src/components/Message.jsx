import '../index.css'
import Alert from '@mui/material/Alert'
import { useNotification, useNotificationType } from '../BlogStore'

const Notification = () => {
  const message = useNotification()
  const type = useNotificationType()
  if (!message || !type) {
    return null
  }

  return (
    <div>
      {type === 'notification' ? (
        <Alert severity="success">{message}</Alert>
      ) : (
        <Alert severity="warning">{message}</Alert>
      )}
    </div>
  )
}

export default Notification
