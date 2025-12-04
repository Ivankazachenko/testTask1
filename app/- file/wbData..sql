CREATE TABLE
  IF NOT EXISTS "wbWarehouse" (
    "warehouseId" SERIAL PRIMARY KEY,
    "warehouseName" TEXT NOT NULL,
    "geoName" TEXT NULL DEFAULT NULL
  );

CREATE TABLE
  IF NOT EXISTS "wbDelivery" (
    "deliveryId" SERIAL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "boxDeliveryBase" TEXT NULL DEFAULT NULL,
    "boxDeliveryCoefExpr" TEXT NULL DEFAULT NULL,
    "boxDeliveryLiter" TEXT NULL DEFAULT NULL,
    "boxDeliveryMarketplaceBase" TEXT NULL DEFAULT NULL,
    "boxDeliveryMarketplaceCoefExpr" TEXT NULL DEFAULT NULL,
    "boxDeliveryMarketplaceLiter" TEXT NULL DEFAULT NULL,
    "boxStorageBase" TEXT NULL DEFAULT NULL,
    "boxStorageCoefExpr" TEXT NULL DEFAULT NULL,
    "boxStorageLiter" TEXT NULL DEFAULT NULL,
    "warehouseId" INT REFERENCES "wbWarehouse" ("warehouseId") ON DELETE CASCADE NOT NULL
  );