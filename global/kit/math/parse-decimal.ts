/**
 * Reads a decimal number from a text strictly: spaces removed, one separator, else NaN.
 *
 * Formula: sign, digits, one decimal separator, exponent; anything else gives NaN
 * @param text - Text to read.
 * @param decimalSeparator - The decimal separator of the text: "." by default, or ",".
 * @returns The number the formula gives.
 * @example
 * parseDecimal('3.14'); // 3.14
 * @see docs/math/parse-numbers.md
 */
export function parseDecimal(
  text: string,
  decimalSeparator: ',' | '.' = '.',
): number {
  const compact = text.replaceAll(
    /\s/g,
    '',
  );
  const normalized = decimalSeparator === ','
    ? compact.replace(
        ',',
        '.',
      )
    : compact;
  const isDecimal = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(normalized);

  return isDecimal ? Number(normalized) : Number.NaN;
}
