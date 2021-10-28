import Memory from './memory';
import Product from './product';

export default class Widget {
  constructor() {
    this.list = document.getElementById('table-body');
    this.add = document.querySelector('.add-product');
    this.popup = document.getElementById('pop-up');
    this.inputText = document.querySelector('.input-text');
    this.inputNumber = document.querySelector('.input-number');
    this.buttonSave = document.querySelector('.btn-save');
    this.buttonCancel = document.querySelector('.btn-cancel');
    this.deletePopup = document.getElementById('pop-up-delete');
    this.deleteOk = document.querySelector('.btn-delete-ok');
    this.deleteCancel = document.querySelector('.btn-delete-cancel');
    this.iconsList = null;
    this.editList = null;
    this.deleteElement = null;
    this.editElement = null;
    this.priceNumber = null;
    this.titleText = null;
  }

  renderDom() {
    const html = `
    <tr>
      <td>Название</td>
      <td>Стоимость</td>
      <td>Действия</td>
    </tr>
    `;
    this.list.innerHTML = html;
    this.updateDom();
  }

  updateDom() {
    const trData = document.querySelectorAll('.with-data');
    if (trData.length !== 0) {
      for (const i of trData) {
        i.remove();
      }
    }
    if (localStorage.product) {
      const products = Memory.loadList();
      const rowElement = this.list.firstElementChild;

      for (let i = 0; i < products.length; i += 1) {
        const cloneTr = rowElement.cloneNode();
        cloneTr.dataset.title = products[i].title;
        cloneTr.dataset.price = products[i].price;
        cloneTr.classList.add('with-data');
        this.list.appendChild(cloneTr);
      }

      const html = `
      <div class="icons">
        <span class="edit"></span>
        <span class="delete"></span>
      </div>
      `;

      const list = Array.from(document.querySelectorAll('.with-data'));

      list.forEach((elem) => {
        const cloneTdTitle = rowElement.firstElementChild.cloneNode();
        const cloneTdPrice = rowElement.firstElementChild.cloneNode();
        const cloneTdIcons = rowElement.firstElementChild.cloneNode();
        cloneTdTitle.textContent = elem.dataset.title;
        elem.appendChild(cloneTdTitle);
        cloneTdPrice.textContent = elem.dataset.price;
        elem.appendChild(cloneTdPrice);
        cloneTdIcons.innerHTML = html;
        elem.appendChild(cloneTdIcons);
      });
    }
    this.iconsList = document.querySelectorAll('.delete');
    this.editList = document.querySelectorAll('.edit');
    this.deleteClick();
    this.editClick();
  }

  events() {
    this.addClick(this.add);
    this.inputTitle(this.inputText);
    this.inputPrice(this.inputNumber);
    this.saveClick(this.buttonSave);
    this.cancelClick(this.buttonCancel);
    this.deleteOkClick(this.deleteOk);
    this.deleteCancelClick(this.deleteCancel);
  }

  addClick(element) {
    element.addEventListener('click', () => {
      if (this.popup.style.display === 'none') {
        this.popup.style.display = 'flex';
      } else {
        this.popup.style.display = 'none';
        this.priceNumber = null;
        this.titleText = null;
      }
    });
  }

  inputTitle(element) {
    element.addEventListener('input', (e) => {
      this.titleText = e.target.value;
    });
  }

  inputPrice(element) {
    element.addEventListener('input', (e) => {
      this.priceNumber = e.target.value;
    });
  }

  saveClick(element) {
    element.addEventListener('click', () => {
      Memory.saveList(new Product(this.titleText, this.priceNumber));
      if (this.popup.style.display === 'flex') {
        this.popup.style = 'display: none';
        if (this.editElement !== null) {
          Widget.updateListProducts(this.editElement);
        }
        this.priceNumber = null;
        this.titleText = null;
        this.inputText.value = null;
        this.inputNumber.value = null;
      }
      this.updateDom();
    });
  }

  cancelClick(element) {
    element.addEventListener('click', () => {
      if (this.popup.style.display === 'flex') {
        this.popup.style = 'display: none';
        this.priceNumber = null;
        this.titleText = null;
        this.inputText.value = null;
        this.inputNumber.value = null;
      }
    });
  }

  deleteClick() {
    for (const i of this.iconsList) {
      i.addEventListener('click', (e) => {
        if (this.deletePopup.style.display === 'none') {
          this.deletePopup.style.display = 'flex';
          this.deleteElement = e.target.closest('tr');
        }
      });
    }
  }

  deleteOkClick(element) {
    element.addEventListener('click', () => {
      this.deletePopup.style.display = 'none';
      Widget.updateListProducts(this.deleteElement);
      this.updateDom();
    });
  }

  deleteCancelClick(element) {
    element.addEventListener('click', () => {
      this.deletePopup.style.display = 'none';
    });
  }

  editClick() {
    for (const i of this.editList) {
      i.addEventListener('click', (e) => {
        if (this.popup.style.display === 'none') {
          this.popup.style.display = 'flex';
          this.priceNumber = e.target.closest('tr').dataset.price;
          this.titleText = e.target.closest('tr').dataset.title;
          this.inputText.value = e.target.closest('tr').dataset.title;
          this.inputNumber.value = e.target.closest('tr').dataset.price;
          this.editElement = e.target.closest('tr');
        }
      });
    }
  }

  static updateListProducts(element) {
    const list = Memory.loadList();
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].title === element.dataset.title && list[i].price === element.dataset.price) {
        list.splice(i, 1);
      }
    }
    Memory.clearStorage();
    Memory.saveList(list);
  }

  static popError(element) {
    element.focus();
    const error = document.createElement('div');
    const text = document.createElement('p');
    const title = document.createElement('h4');
    const arrow = document.createElement('div');
    title.textContent = 'Popover title';
    text.textContent = 'And heres some amazing content. Its very engaging. Right?';
    error.appendChild(title);
    error.appendChild(text);
    error.appendChild(arrow);
    arrow.className = 'arrow';
    error.className = 'error';
    element.offsetParent.appendChild(error);
    error.style.top = `${element.offsetTop - error.offsetHeight - arrow.offsetHeight}px`;
    error.style.left = `${element.offsetLeft - (error.offsetWidth - element.offsetWidth) / 2}px`;
  }
}
