---
title: "Formatter class (java.util) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Formatter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Formatter class (java.util) (part 3 of 5)

The width is the minimum number of characters to
be written to the output.  This includes any signs, digits, grouping
separators, radix indicator, and parentheses.  If the length of the
converted value is less than the width then the output will be padded by
spaces (`'\u0020'`) until the total number of characters equals
width.  The padding is on the left by default.  If `'-'` flag is
given then the padding will be on the right.  If width is not specified then
there is no minimum.

 The precision is not applicable.  If precision is specified then an
`IllegalFormatPrecisionException` will be thrown.

** BigInteger **

 The following conversions may be applied to `java.math.BigInteger`.

bIntConv

 Conversion
     Unicode
     Description

 `'d'`
     `'\u0064'`
     Requires the output to be formatted as a decimal integer. The localization algorithm is applied.

 If the `'#'` flag is given `FormatFlagsConversionMismatchException` will be thrown.

 `'o'`
     `'\u006f'`
     Requires the output to be formatted as an integer in base eight.
    No localization is applied.

 If *x* is negative then the result will be a signed value
    beginning with `'-'` (`'\u002d'`).  Signed output is
    allowed for this type because unlike the primitive types it is not
    possible to create an unsigned equivalent without assuming an explicit
    data-type size.

 If *x* is positive or zero and the `'+'` flag is given
    then the result will begin with `'+'` (`'\u002b'`).

 If the `'#'` flag is given then the output will always begin
    with `'0'` prefix.

 If the `'0'` flag is given then the output will be padded
    with leading zeros to the field width following any indication of sign.

 If the `','` flag is given then a `FormatFlagsConversionMismatchException` will be thrown.

 `'x'`
     `'\u0078'`
     Requires the output to be formatted as an integer in base
    sixteen.  No localization is applied.

 If *x* is negative then the result will be a signed value
    beginning with `'-'` (`'\u002d'`).  Signed output is
    allowed for this type because unlike the primitive types it is not
    possible to create an unsigned equivalent without assuming an explicit
    data-type size.

 If *x* is positive or zero and the `'+'` flag is given
    then the result will begin with `'+'` (`'\u002b'`).

 If the `'#'` flag is given then the output will always begin
    with the radix indicator `"0x"`.

 If the `'0'` flag is given then the output will be padded to
    the field width with leading zeros after the radix indicator or sign (if
    present).

 If the `','` flag is given then a `FormatFlagsConversionMismatchException` will be thrown.

 `'X'`
     `'\u0058'`
     The upper-case variant of `'x'`.  The entire string
    representing the number will be converted to upper case including the `'x'` (if any) and
    all hexadecimal digits `'a'` - `'f'`
    (`'\u0061'` - `'\u0066'`).

 If the conversion is `'o'`, `'x'`, or `'X'` and
both the `'#'` and the `'0'` flags are given, then result will
contain the base indicator (`'0'` for octal and `"0x"` or
`"0X"` for hexadecimal), some number of zeros (based on the width),
and the value.

 If the `'0'` flag is given and the value is negative, then the
zero padding will occur after the sign.

 If the `'-'` flag is not given, then the space padding will occur
before the sign.

 All flags defined for Byte, Short, Integer, and
Long apply.  The default behavior when no flags are
given is the same as for Byte, Short, Integer, and Long.

 The specification of width is the same as
defined for Byte, Short, Integer, and Long.

 The precision is not applicable.  If precision is specified then an
`IllegalFormatPrecisionException` will be thrown.

** Float and Double**

 The following conversions may be applied to `float`, `Float`, `double` and `Double`.

floatConv

 Conversion
     Unicode
     Description

 `'e'`
     `'\u0065'`
     Requires the output to be formatted using computerized scientific notation.  The localization algorithm is applied.

 A `float` or `Float` argument is first converted to
    `double` or `Double`, without loss of precision.

 The formatting of the magnitude *m* depends upon its value.

 If *m* is NaN or infinite, the literal strings "NaN" or
    "Infinity", respectively, will be output.  These values are not
    localized.

 If *m* is positive-zero or negative-zero, then the exponent
    will be `"+00"`.

 Otherwise, the result is a string that represents the sign and
    magnitude (absolute value) of the argument.  The formatting of the sign
    is described in the localization
    algorithm. The formatting of the magnitude *m* depends upon its
    value.

 Let *n* be the unique integer such that 10*n*
    <= *m* < 10*n*+1; then let *a* be the
    mathematically exact quotient of *m* and 10*n* so
    that 1 <= *a* < 10. The magnitude is then represented as the
    integer part of *a*, as a single decimal digit, followed by the
    decimal separator followed by decimal digits representing the fractional
    part of *a*, followed by the exponent symbol `'e'`
    (`'\u0065'`), followed by the sign of the exponent, followed
    by a representation of *n* as a decimal integer, as produced by the
    method int), and zero-padded to include at
    least two digits.

 The number of digits in the result for the fractional part of
    *m* or *a* is equal to the precision.  If the precision is not
    specified then the default value is `6`. If the precision is less
    than the number of digits which would appear after the decimal point in
    the string returned by `Double.toString(double)`, then the value will be rounded
    using the round half up algorithm.  Otherwise, zeros may be appended to reach the precision.
    For a canonical representation of the value, use `Float.toString(float)` or `Double.toString(double)` as
    appropriate.

If the `','` flag is given, then an `FormatFlagsConversionMismatchException` will be thrown.

 `'E'`
     `'\u0045'`
     The upper-case variant of `'e'`.  The exponent symbol
    will be `'E'` (`'\u0045'`).

 `'g'`
     `'\u0067'`
     Requires the output to be formatted in general scientific notation
    as described below. The localization
    algorithm is applied.

 After rounding for the precision, the formatting of the resulting
    magnitude *m* depends on its value.

 If *m* is greater than or equal to 10-4 but less
    than 10precision then it is represented in *decimal format*.

 If *m* is less than 10-4 or greater than or equal to
    10precision, then it is represented in *computerized scientific notation*.

 The total number of significant digits in *m* is equal to the
    precision.  If the precision is not specified, then the default value is
    `6`.  If the precision is `0`, then it is taken to be
    `1`.

 If the `'#'` flag is given then an `FormatFlagsConversionMismatchException` will be thrown.

 `'G'`
     `'\u0047'`
     The upper-case variant of `'g'`.

 `'f'`
     `'\u0066'`
     Requires the output to be formatted using decimal
    format.  The localization algorithm is
    applied.

 A `float` or `Float` argument is first converted to
    `double` or `Double`, without loss of precision.

 The result is a string that represents the sign and magnitude
    (absolute value) of the argument.  The formatting of the sign is
    described in the localization
    algorithm. The formatting of the magnitude *m* depends upon its
    value.

 If *m* NaN or infinite, the literal strings "NaN" or
    "Infinity", respectively, will be output.  These values are not
    localized.

 The magnitude is formatted as the integer part of *m*, with no
    leading zeroes, followed by the decimal separator followed by one or
    more decimal digits representing the fractional part of *m*.

 The number of digits in the result for the fractional part of
    *m* or *a* is equal to the precision.  If the precision is not
    specified then the default value is `6`. If the precision is less
    than the number of digits which would appear after the decimal point in
    the string returned by `Double.toString(double)`, then the value will be rounded
    using the round half up algorithm.  Otherwise, zeros may be appended to reach the precision.
    For a canonical representation of the value, use `Float.toString(float)` or `Double.toString(double)` as
    appropriate.

 `'a'`
     `'\u0061'`
     Requires the output to be formatted in hexadecimal exponential
    form.  No localization is applied.

 The result is a string that represents the sign and magnitude
    (absolute value) of the argument *x*.

 If *x* is negative or a negative-zero value then the result
    will begin with `'-'` (`'\u002d'`).

 If *x* is positive or a positive-zero value and the
    `'+'` flag is given then the result will begin with `'+'`
    (`'\u002b'`).

 The formatting of the magnitude *m* depends upon its value.

-  If the value is NaN or infinite, the literal strings "NaN" or
    "Infinity", respectively, will be output.

-  If *m* is zero then it is represented by the string
    `"0x0.0p0"`.

-  If *m* is a `double` value with a normalized
    representation then substrings are used to represent the significand and
    exponent fields.  The significand is represented by the characters
    `"0x1."` followed by the hexadecimal representation of the rest
    of the significand as a fraction.  The exponent is represented by
    `'p'` (`'\u0070'`) followed by a decimal string of the
    unbiased exponent as if produced by invoking Integer.toString on the exponent value.  If the
    precision is specified, the value is rounded to the given number of
    hexadecimal digits.

-  If *m* is a `double` value with a subnormal
    representation then, unless the precision is specified to be in the range
    1 through 12, inclusive, the significand is represented by the characters
    `'0x0.'` followed by the hexadecimal representation of the rest of
    the significand as a fraction, and the exponent represented by
    `'p-1022'`.  If the precision is in the interval
    [1, 12], the subnormal value is normalized such that it
    begins with the characters `'0x1.'`, rounded to the number of
    hexadecimal digits of precision, and the exponent adjusted
    accordingly.  Note that there must be at least one nonzero digit in a
    subnormal significand.

 If the `'('` or `','` flags are given, then a `FormatFlagsConversionMismatchException` will be thrown.

 `'A'`
     `'\u0041'`
     The upper-case variant of `'a'`.  The entire string
    representing the number will be converted to upper case including the
    `'x'` (`'\u0078'`) and `'p'`
    (`'\u0070'` and all hexadecimal digits `'a'` -
    `'f'` (`'\u0061'` - `'\u0066'`).

 All flags defined for Byte, Short, Integer, and
Long apply.

 If the `'#'` flag is given, then the decimal separator will
always be present.

 If no flags are given the default formatting
is as follows:

-  The output is right-justified within the `width`

-  Negative numbers begin with a `'-'`

-  Positive numbers and positive zero do not include a sign or extra
leading space

-  No grouping separators are included

-  The decimal separator will only appear if a digit follows it

 The width is the minimum number of characters
to be written to the output.  This includes any signs, digits, grouping
separators, decimal separators, exponential symbol, radix indicator,
parentheses, and strings representing infinity and NaN as applicable.  If
the length of the converted value is less than the width then the output
will be padded by spaces (`'\u0020'`) until the total number of
characters equals width.  The padding is on the left by default.  If the
`'-'` flag is given then the padding will be on the right.  If width
is not specified then there is no minimum.

 If the conversion is `'e'`,
`'E'` or `'f'`, then the precision is the number of digits
after the decimal separator.  If the precision is not specified, then it is
assumed to be `6`.

 If the conversion is `'g'` or `'G'`, then the precision is
the total number of significant digits in the resulting magnitude after
rounding.  If the precision is not specified, then the default value is
`6`.  If the precision is `0`, then it is taken to be
`1`.

 If the conversion is `'a'` or `'A'`, then the precision
is the number of hexadecimal digits after the radix point.  If the
precision is not provided, then all of the digits as returned by `Double.toHexString(double)` will be output.

** BigDecimal **

 The following conversions may be applied BigDecimal.

floatConv

 Conversion
     Unicode
     Description

 `'e'`
     `'\u0065'`
     Requires the output to be formatted using computerized scientific notation.  The localization algorithm is applied.

 The formatting of the magnitude *m* depends upon its value.

 If *m* is positive-zero or negative-zero, then the exponent
    will be `"+00"`.

 Otherwise, the result is a string that represents the sign and
    magnitude (absolute value) of the argument.  The formatting of the sign
    is described in the localization
    algorithm. The formatting of the magnitude *m* depends upon its
    value.

 Let *n* be the unique integer such that 10*n*
    <= *m* < 10*n*+1; then let *a* be the
    mathematically exact quotient of *m* and 10*n* so
    that 1 <= *a* < 10. The magnitude is then represented as the
    integer part of *a*, as a single decimal digit, followed by the
    decimal separator followed by decimal digits representing the fractional
    part of *a*, followed by the exponent symbol `'e'`
    (`'\u0065'`), followed by the sign of the exponent, followed
    by a representation of *n* as a decimal integer, as produced by the
    method int), and zero-padded to include at
    least two digits.

 The number of digits in the result for the fractional part of
    *m* or *a* is equal to the precision.  If the precision is not
    specified then the default value is `6`.  If the precision is
    less than the number of digits to the right of the decimal point then
    the value will be rounded using the
    round half up algorithm.  Otherwise, zeros may be appended to reach the precision.
    For a canonical representation of the value, use `BigDecimal.toString()`.

 If the `','` flag is given, then an `FormatFlagsConversionMismatchException` will be thrown.

 `'E'`
     `'\u0045'`
     The upper-case variant of `'e'`.  The exponent symbol
    will be `'E'` (`'\u0045'`).

 `'g'`
     `'\u0067'`
     Requires the output to be formatted in general scientific notation
    as described below. The localization
    algorithm is applied.

 After rounding for the precision, the formatting of the resulting
    magnitude *m* depends on its value.

 If *m* is greater than or equal to 10-4 but less
    than 10precision then it is represented in *decimal format*.
