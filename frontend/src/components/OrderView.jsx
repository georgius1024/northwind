/*
  Order view panel with order display and items list
*/
import React, { memo } from 'react'
import Splitter from './Splitter'
import styles from './OrderView.module.scss'
import OrderView from './OrderDetails'
import OrderItems from './OrderItems'

function OrderDetailsComponent({order, items}) {
  
  return (
    <Splitter id="details-splitter" direction="vertical" gutterSize={12} dragInterval={10} minSize={200}>
      <div className={styles['order-details']}>
        <OrderView order={order}  items={items}/>
      </div>
      <div className={styles['order-items']}>
        <OrderItems order={order} items={items}/>
      </div>
    </Splitter>
  )
}

export default memo(OrderDetailsComponent)
