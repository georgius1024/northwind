/**
 * Created by georgius on 23.07.18.
 */

const Router = require('koa-router')

const root = new Router()

// Api
const api = new Router()
useFile(api, '/orders', './api/orders')
useFile(api, '/order-details', './api/order-details')
root.use('/api', api.routes())

module.exports = root.routes()

function useFile(parent, path, fileName) {
  const router = require(fileName)
  parent.use(path, router.routes(), router.allowedMethods())
}