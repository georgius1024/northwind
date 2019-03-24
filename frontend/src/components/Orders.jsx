import React, { memo } from 'react'
import dayjs from 'dayjs'
import Pagination from 'react-bootstrap/Pagination'
import StatusBox from './StatusBox'
import styles from './Orders.module.scss'
function Orders(props) {
  const rows = props.data.map(row => 
    <tr key={row.id} onClick={() => props.onSelect(row.id)} className={row.id === props.selected ? styles.selected : ""}>
      <td>
        <StatusBox status={row.status_name} />
      </td>
      <td>
        {row.id}
      </td>
      <td>{dayjs(row.order_date).format('DD.MM.YYYY HH:mm')}</td>
      <td>{row.status_name}</td>
      <td>{row.customer_name}</td>
    </tr>
  )
  const pages = []
  for(let p = 0; p < props.pageCount; p++) {
    pages.push(
      <Pagination.Item onClick={()=>props.onPaginate(p)} active={p === props.pageNo} key={p}>{p+1}</Pagination.Item>
    )
  }
  return (
    <div className={styles.panel}>
      <div className={styles['table-wrapper']}>
        <table className={styles.orders + ' table table-hover table-striped'}>
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th scope="col">Order #</th>
              <th scope="col">Order date</th>
              <th scope="col">Order status</th>
              <th scope="col">Client name</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      <div className={styles.footer}>
        <Pagination>
          {pages}
        </Pagination>
       <div className={styles['status-snippet']}><StatusBox status="New" /> New</div>
       <div className={styles['status-snippet']}><StatusBox status="Closed" /> Closed</div>
       <div className={styles['status-snippet']}><StatusBox status="Shipped" /> Shipped</div>
      </div>
    </div>
  )
}

export default memo(Orders)