import saleRepository from "../repositories/sale.repository.js";
import clientRepository from "../repositories/client.repository.js";
import productRepository from "../repositories/product.repository.js";

async function error(e) {
  throw new Error(` O ${e} informado não existe.`);
}

async function createSale(sale) {
  if (!(await clientRepository.getClient(sale.client_id))) {
    error("Client_id");
  }

  const product = await productRepository.getProduct(sale.product_id);

  if (!product) {
    error("Product_id");
  }

  // * A funçao não está descrementando o valor do STOCK

  if (product.stock > 0) {
    await saleRepository.insertSale(sale);
    product.stock--;
    await productRepository.updateProduct(product);
    return sale;
} else {
    throw new Error("O produto informado não possui estoque.");
}
}

async function getSales() {
  return await saleRepository.getSales();
}

async function getSale(id) {
  return await saleRepository.getSale(id);
}
// * A validação do deleteSale ainda n funciona até resolver o problema do stock
async function deleteSale(id) {
  const sale = await productRepository.getProduct(sale.product_id)
  await saleRepository.deleteSale(id);
  product.stock++;
  await productRepository.updateProduct(product)
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

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
