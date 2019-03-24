/**
 * Created by georgius on 11.08.18.
 */
"use strict"
const assert = require('chai').assert
const {
  OrdersView,
  OrderDetailsView
} = require('../models')

describe('Models working', async () => {
  it('orders-view model', async function() {
    const order = await OrdersView.findOne()
    assert.isOk(order)
  })
  it('orders-details-view model', async function() {
    const orderDetails = await OrderDetailsView.findOne()
    assert.isOk(orderDetails)
  })
})
