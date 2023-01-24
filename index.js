import express from "express";
import cors from "cors";
import winston from "winston";
// ? import expressBasicAuth from 'express-basic-auth';
import clientsRoute from "./routes/client.route.js";
import suppliersRoute from "./routes/supplier.route.js";
import productsRoute from "./routes/prooduct.route.js";
import salesRoute from "./routes/sale.route.js";

const app = express();
app.use(express.json());

const { combine, timestamp, label, printf } = winston.format;
const myFormt = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "store-api.log" }),
  ],
  format: combine(label({ label: "store-api" }), timestamp(), myFormt),
});

const port = 4422;

app.use(cors());
app.use("/client", clientsRoute);
app.use("/supplier", suppliersRoute);
app.use("/product", productsRoute);
app.use("/sale", salesRoute);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`Servidor na porta: ${port}`);
});
