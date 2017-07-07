export function validDay(string) {
  let numericVal = parseInt(string);
  return checkValue(0, numericVal, 32);
}

export function validMonth(string) {
  let numericVal = parseInt(string);
  return checkValue(0, numericVal, 13);
}

export function validYear(string) {
  let numericVal = parseInt(string);
  return checkValue(1900, numericVal, currentYear())
}

export function currentYear() {
  return new Date().getFullYear();
}

function checkValue(a, b, c){
  return (a < b && b < c);
}
