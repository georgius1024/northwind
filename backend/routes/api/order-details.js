/**
 * Created by georgius on 23.07.18.
 */

const Router = require('koa-router')
const { 
  OrderDetailsView
} = require('../../models')
const logger = require('../../classes/logger')
const Response = require('../../classes/response')
const Crud = require('../../classes/crud')
const Browse = require('../../classes/browse')

const router = new Router()
const browse = new Browse(OrderDetailsView)
const crud = new Crud(OrderDetailsView)
const attributes = [
  'id',
  'order_id',
  'product_id',
  'quantity',
  'unit_price',
  'discount',
  'status_id',
  'product_code',
  'product_name',
  'quantity_per_unit',
  'category',
  'description',
  'status_name'
]

router.get('/:orderId', async (ctx) => {
  const orderId = Number(ctx.params.orderId)
  const options = {
    attributes,
    order: [[ctx.query.sort_column || 'id', ctx.query.sort_order || 'asc']],
    limit: Number(ctx.query.rows_per_page) || 10,
    page: Number(ctx.query.page_no) || 0,
    search: ctx.query.search,
    searchColumns: ['id', 'customer_name', 'product_code', 'product_name', 'category', 'status_name'],
    where: {
      order_id: orderId
    },
    highlight: {
      color: 'red',
    },
    locate: Number(ctx.query.locate)
  }
  try {
    const {data, meta} = await browse.pagination(options)
    return Response.list(ctx, data, meta)
  } catch (error) {
    logger.error(error)
    return Response.error(ctx, error)
  }
})

router.get('/:orderId/:id', async (ctx) => {
  const orderId = Number(ctx.params.orderId)
  try {
    const options = {
      attributes,
      where: {
        order_id: orderId
      }
    }
    const instance = await crud.show(ctx.params.id, options)
    return Response.show(ctx, instance)
  } catch (error) {
    logger.error(error)
    if (error.name === 'notFoundError') {
      return Response.notFound(ctx)
    } else {
      return Response.error(ctx, error.message)
    }
  }
})


module.exports = router
