

export const up = function (knex, Promise) {
  return knex.schema
    .createTable('wbWarehouse', function (table) {
      table.increments('warehouseId')
      table.text('warehouseName').notNullable()
      table.text('geoName')
    })
    .createTable('wbDelivery', function (table) {
      table.increments('deliveryId')
      table.text('date').notNullable()
      table.text('boxDeliveryBase')
      table.text('boxDeliveryCoefExpr')
      table.text('boxDeliveryLiter')
      table.text('boxDeliveryMarketplaceBase')
      table.text('boxDeliveryMarketplaceCoefExpr')
      table.text('boxDeliveryMarketplaceLiter')
      table.text('boxStorageBase')
      table.text('boxStorageCoefExpr')
      table.text('boxStorageLiter')
      table.integer('warehouseId').unsigned().references('wbWarehouse.warehouseId')
    })
}

export const down = function (knex, Promise) {
  return knex.schema
    .dropTable('wbWarehouse')
    .dropTable('wbDelivery')
}
