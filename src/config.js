// Add path to your .env file here:
require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  oai_api_key: process.env.OPENAI_API_KEY,
};