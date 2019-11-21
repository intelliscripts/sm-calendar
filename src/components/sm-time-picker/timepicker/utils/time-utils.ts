export function getDisplayValue(str) {
  if (str.toString().length === 1) {
    return '0' + str;
  }
  return str;
}
