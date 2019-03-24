import React, { memo } from 'react'
import styles from './OrderItems.module.scss'

function noItems() {
  return (
    <div className={styles.alert + ' alert alert-warning'} role='alert'>
      Order is empty
    </div>
  )
}

function itemsTable(items) {
  const [totalAmount, totalQuantity] = items.reduce(
    (accum, item) => {
      accum[0] += item.unit_price * item.quantity
      accum[1] += Number(item.quantity)
      return accum
    },
    [0, 0]
  )
  const rows = items.map(row => (
    <tr key={row.id}>
      <td>{row.product_name}</td>
      <td className={styles.right}>
        {Number(Math.floor(row.quantity)).toFixed(2)}
      </td>
      <td className={styles.right}>{Number(row.unit_price).toFixed(2)}</td>
      <td className={styles.right}>
        {Number(row.unit_price * row.quantity).toFixed(2)}
      </td>
    </tr>
  ))

  return (
    <div className={styles.wrapper}>
      <div className={styles['table-wrapper']}>
        <table className='orders table table-hover table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th>Product Name</th>
              <th width='80' className={styles.right}>
                Qty
              </th>
              <th width='80' className={styles.right}>
                Price
              </th>
              <th width='80' className={styles.right}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
      <table className={'table ' + styles['footer-table']}>
        <thead className='thead-dark'>
          <tr>
            <th>Total</th>

            <th width='80' className={styles.right}>
              {Number(Math.floor(totalQuantity)).toFixed(2)}
            </th>
            <th width='80'>&nbsp;</th>
            <th width='80' className={styles.right}>
              {Number(totalAmount).toFixed(2)}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

function OrderItemsComponent({ items }) {
  if (Array.isArray(items) && items.length) {
    return itemsTable(items)
  } else {
    return noItems()
  }
}

export default memo(OrderItemsComponent)
