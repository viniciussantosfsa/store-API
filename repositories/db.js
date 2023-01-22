import pg from "pg";
// ! import dotenv from "dotenv";
// ! dotenv.config();

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString: "postgres://rdvdhoee:xo8ZiXj8VJUd-ycBsrup0peIz6P8yVBL@babar.db.elephantsql.com/rdvdhoee",
  });

  global.connection = pool;

  return pool.connect();
}

export {
  connect
};
