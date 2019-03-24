'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrdersView = sequelize.define('OrdersView', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    employee_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    shipped_date: DataTypes.DATE,
    shipper_id: DataTypes.INTEGER,
    ship_name: DataTypes.STRING(50),
    ship_address: DataTypes.TEXT,
    ship_city: DataTypes.STRING(50),
    ship_state_province: DataTypes.STRING(50),
    ship_zip_postal_code: DataTypes.STRING(50),
    ship_country_region: DataTypes.STRING(50),
    shipping_fee: DataTypes.DECIMAL,
    taxes: DataTypes.DECIMAL,
    payment_type: DataTypes.STRING(50),
    paid_date: DataTypes.DATE,
    notes: DataTypes.TEXT,
    tax_rate: DataTypes.DOUBLE,
    tax_status_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    tableName: 'orders_view',
    timestamps: false,
    underscored: false,
    paranoid: true,
  });
  return OrdersView;
};