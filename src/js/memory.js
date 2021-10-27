export default class Memory {
  constructor() {
    this.storage = localStorage;
  }

  static saveList(product) {
    const arrayProduct = [];
    if (localStorage.length !== 0) {
      const storage = JSON.parse(localStorage.product);
      storage.push(product);
      localStorage.setItem('product', JSON.stringify(storage));
    } else if (!product.length) {
      arrayProduct.push(product);
      localStorage.setItem('product', JSON.stringify(arrayProduct));
    } else {
      localStorage.setItem('product', JSON.stringify(product));
    }
  }

  static loadList() {
    try {
      return JSON.parse(localStorage.product);
    } catch (e) {
      throw new Error('Invalid product');
    }
  }

  clearStorage() {
    this.storage.clear();
  }
}
