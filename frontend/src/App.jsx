import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.scss';
import Splitter from './components/Splitter'
import Alert from './components/Alert'
import Loading from './components/Loading'
import Orders from './components/Orders'
import OrderView from './components/OrderView'
import Api from './Api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      pageCount: 0,
      pageNo: 0,
      selectedOrderId: 0,
      selectedOrder: {},
      selectedOrderItems: []
    }
    this.refresh = this.refresh.bind(this)
    this.select = this.select.bind(this)
    this.paginate = this.paginate.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  paginate (no) {
    this.setState({ 
      pageNo: no,
    }, this.refresh)
  }
  refresh() {
    Api.get('orders?page_no=' + this.state.pageNo).subscribe(({data: body}) => {
      this.setState({ 
        orders: body.data,
        pageCount: body.meta.pages,
        pageNo: body.meta.pageNo
      }, () => {this.select(body.data[0].id)})
    })
  }
  select(id) {
    this.setState({ selectedOrderId: id }) // Race condition
    Api.get('orders/' + id).subscribe(({data: body}) => {
      if (body.data.id === this.state.selectedOrderId) {
        this.setState({ selectedOrder: body.data })
      }
    })
    Api.get('order-details/' + id).subscribe(({data: body}) => {
      this.setState({ selectedOrderItems: body.data })
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <Loading />
        <Alert />
        <Splitter className="full-height" id="main-h-splitter" gutterSize={12} dragInterval={10} sizes={[25, 75]} minSize={400}>
            <Orders
              data={this.state.orders}
              pageCount={this.state.pageCount} 
              pageNo={this.state.pageNo} 
              onSelect={this.select} 
              onPaginate={this.paginate}
              selected={this.state.selectedOrderId} />
          <OrderView order={this.state.selectedOrder} items={this.state.selectedOrderItems} />
        </Splitter>
      </div>
    );
  }
}

export default App;
