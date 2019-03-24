'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetailsView = sequelize.define('OrderDetailsView', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    unit_price: DataTypes.DECIMAL,
    discount: DataTypes.DOUBLE,
    status_id: DataTypes.INTEGER,
    date_allocated: DataTypes.DATE,
    product_code: DataTypes.STRING(25),
    product_name: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    quantity_per_unit: DataTypes.STRING(50),
    category: DataTypes.STRING(50),
    status_name: DataTypes.STRING(50),
  }, {
    tableName: 'order_details_view',
    timestamps: false,
    underscored: false,
    paranoid: true,
  });
  return OrderDetailsView;
};