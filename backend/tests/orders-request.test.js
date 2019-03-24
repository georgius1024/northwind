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

describe('Orders controller', async function () {
  this.slow(200)

  let user
  let requester

  before(async () => {
    requester = chai.request(app).keepOpen()
  })

  it('Can get orders list', async () => {
    const response = await requester
    .get('/api/orders')
    response.should.have.status(200)
    response.body.status.should.be.eql('success')
  })

  it('Can get certain order', async () => {
    const response = await requester
    .get('/api/orders/51')
    response.should.have.status(200)
    response.body.status.should.be.eql('success')
  })

  after(() => {
    requester.close()
  })
})
