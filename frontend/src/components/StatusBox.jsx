import React, { memo } from 'react'
import styles from './StatusBox.module.scss'
function StatusBoxComponent({status}) {
  const className = styles.box + ' ' + styles['status-' + String(status).toLowerCase()]
  return (
    <div className={className}></div>
  )
}

export default memo(StatusBoxComponent)