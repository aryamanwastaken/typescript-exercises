export function isValid(isbn: string): boolean {
  const charsWithoutDash = [...isbn].filter(char => char !== '-');
  if (charsWithoutDash.length !== 10) {
    return false;
  }
  if (
    !charsWithoutDash.slice(0, 9).every((char, i) => char.match(/[0-9]/))
    || !(charsWithoutDash[9] === 'X' || charsWithoutDash[9].match(/[0-9]/))
  ) {
    return false;
  }
  const digits = charsWithoutDash.map(c => c === 'X' ? 10 : parseInt(c, 10));
  const sum = digits.reduce((acc, d, i) => acc + (d * (10 - i)), 0);
  return sum % 11 === 0;
}
