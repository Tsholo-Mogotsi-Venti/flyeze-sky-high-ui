require('dotenv').config();

module.exports = {
  cosmosDb: {
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY,
    databaseId: "flyeeze",
    containers: {
      services: "services",
      pricing: "pricingRules",
      users: "users"
    }
  },
  azureAd: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    redirectUri: process.env.AZURE_REDIRECT_URI
  }
};