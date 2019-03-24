import React, { memo } from 'react'
import dayjs from 'dayjs'
import StatusBox from './StatusBox'
function noOrder() {
  return (
    <div className="alert alert-warning" role="alert">
      Order not selected!
    </div>
  )
}
function OrderView(order, items) {
  if (order) {
    if(Array.isArray(items)) {
      order.amount = items.reduce((sum, item) => {
        return sum + item.quantity * item.unit_price
      }, 0)
    } else {
      order.amount = 0
    }
  } 
  const address = 
  [ 
    order.ship_address,
    order.ship_city,
    order.ship_state_province,
    order.ship_country_region
  ].filter(e => !!e).join(', ')
  return (
    <dl className="row">
      <dt className="col-sm-3">Order #:</dt>
      <dd className="col-sm-9">{order.id}</dd>
      <dt className="col-sm-3">Date:</dt>
      <dd className="col-sm-9">{dayjs(order.order_date).format('DD.MM.YYYY HH:mm')}</dd>
      <dt className="col-sm-3">Status:</dt>
      <dd className="col-sm-9" style={{display: 'flex'}}><StatusBox status={order.status_name}/> {order.status_name}</dd>
      <dt className="col-sm-3">Total:</dt>
      <dd className="col-sm-9">{Number(order.amount).toFixed(2)}</dd>
      <dt className="col-sm-3">Customer:</dt>
      <dd className="col-sm-9">{order.customer_name}</dd>
      <dt className="col-sm-3">Ship address:</dt>
      <dd className="col-sm-9">{address}</dd>
      <dt className="col-sm-3">Ship postal code:</dt>
      <dd className="col-sm-9">{order.ship_zip_postal_code}</dd>
    </dl>
  )
}
function OrderViewComponent({order, items}) {
  return order ? OrderView(order, items) : noOrder()
}

export default memo(OrderViewComponent)