/**
 * Created by georgius on 23.07.18.
 */

const Router = require('koa-router')
const { 
  OrdersView
} = require('../../models')
const logger = require('../../classes/logger')
const Response = require('../../classes/response')
const Crud = require('../../classes/crud')
const Browse = require('../../classes/browse')

const router = new Router()
const browse = new Browse(OrdersView)
const crud = new Crud(OrdersView)
const attributes = [
  'id', 
  'employee_id', 
  'customer_id', 
  'order_date', 
  'shipped_date', 
  'shipper_id', 
  'ship_name', 
  'ship_address', 
  'ship_city', 
  'ship_state_province', 
  'ship_zip_postal_code', 
  'ship_country_region', 
  'shipping_fee', 
  'taxes', 
  'payment_type', 
  'paid_date', 
  'notes', 
  'tax_rate', 
  'tax_status_id', 
  'status_id', 
  'status_name', 
  'customer_name', 
  'employee_last_name', 
  'employee_first_name', 
  'employee_job_title'
]

router.get('/', async (ctx) => {
  const options = {
    attributes,
    order: [[ctx.query.sort_column || 'id', ctx.query.sort_order || 'asc']],
    limit: Number(ctx.query.rows_per_page) || 10,
    page: Number(ctx.query.page_no) || 0,
    search: ctx.query.search,
    searchColumns: ['id', 'customer_name', 'employee_last_name', 'employee_first_name', 'status_name'],
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

router.get('/:id', async (ctx) => {
  try {
    const options = {
      attributes
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
