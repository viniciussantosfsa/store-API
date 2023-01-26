import productRepository from "../repositories/product.repository.js";
import supplierRepository from "../repositories/supplier.repository.js";

async function createProduct(product) {
  if (await supplierRepository.getSupplier(product.suppliers_id)) {
    throw new Error("O supplier_id informando não existe.");
  }
  return await productRepository.insertProduct(product);
}

async function getProducts() {
  return await productRepository.getProducts();
}

async function getProduct(id) {
  return await productRepository.getProduct(id);
}

async function deleteProduct(id) {
  await productRepository.deleteProduct(id);
}

async function updateProduct(product) {
  if (await supplierRepository.getSupplier(product.suppliers_id)) {
    throw new Error("O supplier_id informando não existe.");
  }
  return productRepository.updateProduct(product);
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
