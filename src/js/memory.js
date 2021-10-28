export default class Memory {
  constructor() {
    this.storage = localStorage;
  }

  static saveList(product) {
    if (product) {
      const arrayProduct = [];
      if (localStorage.product) {
        const storage = Array.from(JSON.parse(localStorage.product));
        storage.push(product);
        localStorage.setItem('product', JSON.stringify(storage));
      } else if (product.title) {
        arrayProduct.push(product);
        localStorage.setItem('product', JSON.stringify(arrayProduct));
      } else if (product.length !== 0) {
        localStorage.setItem('product', JSON.stringify(product));
      }
    } else {
      throw new Error('Product is null');
    }
  }

  static loadList() {
    try {
      return JSON.parse(localStorage.product);
    } catch (e) {
      throw new Error('Invalid product');
    }
  }

  static clearStorage() {
    localStorage.clear();
  }
}
