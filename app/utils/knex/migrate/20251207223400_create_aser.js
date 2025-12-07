

export const up = function (knex, Promise) {
  return knex.schema
    .createTable('wbWarehouse', function (table) {
      table.increments('warehouseId')
      table.string('warehouseName').notNullable()
      table.string('geoName')
    })
    .createTable('wbDelivery', function (table) {
      table.increments('deliveryId')
      table.string('date').notNullable()
      table.string('boxDeliveryBase')
      table.string('boxDeliveryCoefExpr')
      table.string('boxDeliveryLiter')
      table.string('boxDeliveryMarketplaceBase')
      table.string('boxDeliveryMarketplaceCoefExpr')
      table.string('boxDeliveryMarketplaceLiter')
      table.string('boxStorageBase')
      table.string('boxStorageCoefExpr')
      table.string('boxStorageLiter')
      table.integer('warehouseId').unsigned().references('wbWarehouse.warehouseId')
    })
}

export const down = function (knex, Promise) {
  return knex.schema
    .dropTable('wbWarehouse')
    .dropTable('wbDelivery')
}
