import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString: PROCESS.ENV.URL,
  });

  global.connection = pool;

  return pool.connect();
}

export default {
  connect,
};
