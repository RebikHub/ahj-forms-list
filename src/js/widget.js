export default class Popover {
  constructor() {
    this.popover = document.querySelector('#popover');
  }

  renderDom() {
    const button = document.createElement('button');
    button.textContent = 'Click to toggle popover';
    this.popover.appendChild(button);
    Popover.inputClick(button);
  }

  static inputClick(element) {
    element.addEventListener('click', () => {
      if (document.querySelector('.error') !== null) {
        document.querySelector('.error').remove();
      } else {
        Popover.popError(element);
      }
    });
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
