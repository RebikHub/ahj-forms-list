export default class Memory {
  constructor() {
    this.storage = localStorage;
  }

  static saveList(product) {
    console.log(product);
    if (product) {
      const arrayProduct = [];
      if (localStorage.length !== 0) {
        const storage = JSON.parse(localStorage.product);
        storage.push(product);
        localStorage.setItem('product', JSON.stringify(storage));
      } else if (!product.length) {
        arrayProduct.push(product);
        localStorage.setItem('product', JSON.stringify(arrayProduct));
      } else if (product.length) {
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
