import saleRepository from "../repositories/sale.repository.js";
import clientRepository from "../repositories/client.repository.js";
import productRepository from "../repositories/product.repository.js";

async function createSale(sale) {
  if (!(await clientRepository.getClient(sale.client_id))) {
    error("Client_id");
  }
  let product = await productRepository.getProduct(sale.product_id);

  if (!product) {
    error("Product_id");
  }

  if (product.stock > 0) {
    sale = await saleRepository.insertSale(sale);
    product.stock--;
    await productRepository.updateProduct(product);
    return sale;
  } else {
    throw new Error("The specified product is out of stock");
  }
}

async function getSales() {
  return await saleRepository.getSales();
}

async function getSale(id) {
  return await saleRepository.getSale(id);
}

async function deleteSale(id) {
  await saleRepository.deleteSale(id);
}

async function updateSale(sale) {
  if (!(await clientRepository.getClient(sale.client_id))) {
    error("Client_id");
  }
  if (!(await productRepository.getProduct(sale.product_id))) {
    error("Product_id");
  }
  return saleRepository.updateSale(sale);
}

function error(e) {
  throw new Error(`The ${e} reported does not exist.`);
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
