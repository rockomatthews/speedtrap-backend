const dotenv = require('dotenv')

let ENV_FILE_NAME = '.env';
dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "https://speedtrapracing.com";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "https://speedtrapracing.com";

// Database URL (from env)
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  projectConfig: {
    redis_url: null,
    database_url: DATABASE_URL,
    database_type: "postgres",
    database_extra: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins: [
    `medusa-fulfillment-manual`,
    `medusa-payment-manual`,
    {
      resolve: `@medusajs/file-local`,
      options: {
        upload_dir: "uploads"
      }
    }
  ],
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-local"
    },
    cacheService: {
      resolve: "@medusajs/cache-inmemory"
    }
  }
}