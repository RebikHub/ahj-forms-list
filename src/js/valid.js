function validationTitle(input) {
  if (input !== '' && input.trim() !== '') {
    return true;
  }
  return false;
}

function validationPrice(input) {
  if (input !== '' && input > 0) {
    return true;
  }
  return false;
}

export { validationTitle, validationPrice };
