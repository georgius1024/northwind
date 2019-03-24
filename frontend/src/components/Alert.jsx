/*
 Show alert message when Api throws error
*/
import React, { memo, useState, useEffect } from 'react'
import Api from '../Api'
import Alert from 'react-bootstrap/Alert'

function AlertComponent() {
  const [ message, setMessage ] = useState('')

  function dismiss() {
    setMessage('')
  }

  useEffect(() => {
    const subscription = Api.error$.subscribe(error => {
      setMessage(error.toString())
      setTimeout(dismiss, 3000)
    })
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, [])

  return message && (
    <Alert dismissible variant="danger" onClose={dismiss}>
      {message}
    </Alert>
  )
}

export default memo(AlertComponent)