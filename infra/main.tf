resource "azurerm_cosmosdb_sql_container" "pricing_rules" {
  name                = "pricingRules"
  resource_group_name = azurerm_resource_group.flyeeze.name
  account_name        = azurerm_cosmosdb_account.flyeeze_db.name
  database_name       = azurerm_cosmosdb_sql_database.main.name
  partition_key_path  = "/serviceType"

  indexing_policy {
    indexing_mode = "consistent"
    included_path {
      path = "/minMultiplier/?"
    }
    included_path {
      path = "/maxMultiplier/?"
    }
  }
}

resource "azurerm_redis_cache" "flyeeze" {
  name                = "flyeeze-cache"
  location            = azurerm_resource_group.flyeeze.location
  resource_group_name = azurerm_resource_group.flyeeze.name
  capacity            = 1
  family              = "C"
  sku_name            = "Standard"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"
}