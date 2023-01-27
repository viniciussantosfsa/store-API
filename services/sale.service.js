import saleRepository from "../repositories/sale.repository.js";
import clientRepository from '../repositories/client.repository.js';
import productRepository from '../repositories/product.repository.js';

function error(e) {
  throw new Error(`${e} informado não existe.`);
};

async function createSale(sale) {
  if (!await clientRepository.getClient(sale.client_id)) {
    error('Client_id');
  }
  if (!await productRepository.getProduct(sale.product_id)) {
    error('Product_id');
  }
  return await saleRepository.insertSale(sale);
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
  if (!await clientRepository.getClient(sale.client_id)) {
    error('Client_id');
  }
  if (!await productRepository.getProduct(sale.product_id)) {
    error('Product_id');
  }
  return saleRepository.updateSale(sale);
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
