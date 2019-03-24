/**
 * Created by georgius on 11.08.18.
 */
'use strict'
const chai = require('chai')
let chaiHttp = require('chai-http')

chai.use(chaiHttp)
const app = require('../index.js')

const assert = chai.assert
chai.should()

describe('Order details controller', async function () {
  this.slow(200)

  let user
  let requester

  before(async () => {
    requester = chai.request(app).keepOpen()
  })

  it('Can get order details list', async () => {
    const response = await requester
    .get('/api/order-details/51')
    response.should.have.status(200)
    response.body.status.should.be.eql('success')
  })

  it('Can get certain detail', async () => {
    const response = await requester
    .get('/api/order-details/51/60')
    response.should.have.status(200)
    response.body.status.should.be.eql('success')
  })

  after(() => {
    requester.close()
  })
})
