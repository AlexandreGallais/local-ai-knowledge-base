---
title: "Formatter class (java.util) (part 2 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Formatter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Formatter class (java.util) (part 2 of 5)

'  '  -
     -
     y4
     y
     -
     The result will include a leading space for positive values

 '0'  -
     -
     y
     y
     -
     The result will be zero-padded

 ','  -
     -
     y2
     y5
     -
     The result will include locale-specific grouping separators

 '('  -
     -
     y4
     y5
     -
     The result will enclose negative numbers in parentheses

 1 Depends on the definition of `Formattable`.

 2 For `'d'` conversion only.

 3 For `'o'`, `'x'`, and `'X'`
conversions only.

 4 For `'d'`, `'o'`, `'x'`, and
`'X'` conversions applied to BigInteger
or `'d'` applied to `byte`, `Byte`, `short`, `Short`, `int` and `Integer`, `long`, and `Long`.

 5 For `'e'`, `'E'`, `'f'`,
`'g'`, and `'G'` conversions only.

 Any characters not explicitly defined as flags are illegal and are
reserved for future extensions.

####  Width

 The width is the minimum number of characters to be written to the
output.  For the line separator conversion, width is not applicable; if it
is provided, an exception will be thrown.

####  Precision

 For general argument types, the precision is the maximum number of
characters to be written to the output.

 For the floating-point conversions `'a'`, `'A'`, `'e'`,
`'E'`, and `'f'` the precision is the number of digits after the
radix point.  If the conversion is `'g'` or `'G'`, then the
precision is the total number of digits in the resulting magnitude after
rounding.

 For character, integral, and date/time argument types and the percent
and line separator conversions, the precision is not applicable; if a
precision is provided, an exception will be thrown.

####  Argument Index

 The argument index is a decimal integer indicating the position of the
argument in the argument list.  The first argument is referenced by
"`1$`", the second by "`2$`", etc.

 Another way to reference arguments by position is to use the
`'<'` (`'\u003c'`) flag, which causes the argument for
the previous format specifier to be re-used.  For example, the following two
statements would produce identical strings:

```java
  Calendar c = ...;
  String s1 = String.format("Duke's Birthday: %1$tm %1$te,%1$tY", c);

  String s2 = String.format("Duke's Birthday: %1$tm %<te,%<tY", c);
```

#### Details

 This section is intended to provide behavioral details for formatting,
including conditions and exceptions, supported data types, localization, and
interactions between flags, conversions, and data types.  For an overview of
formatting concepts, refer to the Summary

 Any characters not explicitly defined as conversions, date/time
conversion suffixes, or flags are illegal and are reserved for
future extensions.  Use of such a character in a format string will
cause an `UnknownFormatConversionException` or `UnknownFormatFlagsException` to be thrown.

 If the format specifier contains a width or precision with an invalid
value or which is otherwise unsupported, then a `IllegalFormatWidthException` or `IllegalFormatPrecisionException`
respectively will be thrown. Similarly, values of zero for an argument
index will result in an `IllegalFormatException`.

 If a format specifier contains a conversion character that is not
applicable to the corresponding argument, then an `IllegalFormatConversionException` will be thrown.

 Values of *precision* must be in the range zero to
`Integer.MAX_VALUE`, inclusive, otherwise
`IllegalFormatPrecisionException` is thrown.

 Values of *width* must be in the range one to
`Integer.MAX_VALUE`, inclusive, otherwise
`IllegalFormatWidthException` will be thrown
Note that widths can appear to have a negative value, but the negative sign
is a *flag*. For example in the format string `"%-20s"` the
*width* is *20* and the *flag* is "-".

 Values of *index* must be in the range one to
`Integer.MAX_VALUE`, inclusive, otherwise
`IllegalFormatException` will be thrown.

 All specified exceptions may be thrown by any of the `format`
methods of `Formatter` as well as by any `format` convenience
methods such as String.format and
PrintStream.printf.

 For category *General*, *Character*, *Numeric*,
*Integral* and *Date/Time* conversion, unless otherwise specified,
if the argument *arg* is `null`, then the result is "`null`".

 Conversions denoted by an upper-case character (i.e. `'B'`,
`'H'`, `'S'`, `'C'`, `'X'`, `'E'`,
`'G'`, `'A'`, and `'T'`) are the same as those for the
corresponding lower-case conversion characters except that the result is
converted to upper case according to the rules of the prevailing Locale. If there is no explicit locale specified,
either at the construction of the instance or as a parameter to its method
invocation, then the default locale
is used.

#### General

 The following general conversions may be applied to any argument type:

dgConv

 Conversion
     Unicode
     Description

 `'b'`
     `'\u0062'`
     Produces either "`true`" or "`false`" as returned by
    `Boolean.toString(boolean)`.

 If the argument is `null`, then the result is
    "`false`".  If the argument is a `boolean` or `Boolean`, then the result is the string returned by String.valueOf().  Otherwise, the result is
    "`true`".

 If the `'#'` flag is given, then a `FormatFlagsConversionMismatchException` will be thrown.

 `'B'`
     `'\u0042'`
     The upper-case variant of `'b'`.

 `'h'`
     `'\u0068'`
     Produces a string representing the hash code value of the object.

 The result is obtained by invoking
    `Integer.toHexString(arg.hashCode())`.

 If the `'#'` flag is given, then a `FormatFlagsConversionMismatchException` will be thrown.

 `'H'`
     `'\u0048'`
     The upper-case variant of `'h'`.

 `'s'`
     `'\u0073'`
     Produces a string.

 If the argument implements `Formattable`, then
    its formatTo method is invoked.
    Otherwise, the result is obtained by invoking the argument's
    `toString()` method.

 If the `'#'` flag is given and the argument is not a `Formattable`, then a `FormatFlagsConversionMismatchException`
    will be thrown.

 `'S'`
     `'\u0053'`
     The upper-case variant of `'s'`.

 The following flags apply to general conversions:

dFlags

 Flag
     Unicode
     Description

 `'-'`
     `'\u002d'`
     Left justifies the output.  Spaces (`'\u0020'`) will be
    added at the end of the converted value as required to fill the minimum
    width of the field.  If the width is not provided, then a `MissingFormatWidthException` will be thrown.  If this flag is not given
    then the output will be right-justified.

 `'#'`
     `'\u0023'`
     Requires the output use an alternate form.  The definition of the
    form is specified by the conversion.

 The width is the minimum number of characters to
be written to the
output.  If the length of the converted value is less than the width then
the output will be padded by `'  '` (`'\u0020'`)
until the total number of characters equals the width.  The padding is on
the left by default.  If the `'-'` flag is given, then the padding
will be on the right.  If the width is not specified then there is no
minimum.

 The precision is the maximum number of characters to be written to the
output.  The precision is applied before the width, thus the output will be
truncated to `precision` characters even if the width is greater than
the precision.  If the precision is not specified then there is no explicit
limit on the number of characters.

#### Character

This conversion may be applied to `char` and `Character`.  It
may also be applied to the types `byte`, `Byte`,
`short`, and `Short`, `int` and `Integer` when
`Character.isValidCodePoint` returns `true`.  If it returns
`false` then an `IllegalFormatCodePointException` will be
thrown.

charConv

 Conversion
     Unicode
     Description

 `'c'`
     `'\u0063'`
     Formats the argument as a Unicode character as described in Unicode Character
    Representation.  This may be more than one 16-bit `char` in
    the case where the argument represents a supplementary character.

 If the `'#'` flag is given, then a `FormatFlagsConversionMismatchException` will be thrown.

 `'C'`
     `'\u0043'`
     The upper-case variant of `'c'`.

 The `'-'` flag defined for General
conversions applies.  If the `'#'` flag is given, then a `FormatFlagsConversionMismatchException` will be thrown.

 The width is defined as for General conversions.

 The precision is not applicable.  If the precision is specified then an
`IllegalFormatPrecisionException` will be thrown.

#### Numeric

 Numeric conversions are divided into the following categories:

-  **Byte, Short, Integer, and Long**

-  **BigInteger**

-  **Float and Double**

-  **BigDecimal**

 Numeric types will be formatted according to the following algorithm:

** Number Localization Algorithm**

 After digits are obtained for the integer part, fractional part, and
exponent (as appropriate for the data type), the following transformation
is applied:

-  Each digit character *d* in the string is replaced by a
locale-specific digit computed relative to the current locale's
zero digit
*z*; that is *d - * `'0'`
* + z*.

-  If a decimal separator is present, a locale-specific decimal separator is
substituted.

-  If the `','` (`'\u002c'`)
flag is given, then the locale-specific grouping separator is
inserted by scanning the integer part of the string from least significant
to most significant digits and inserting a separator at intervals defined by
the locale's grouping size.

-  If the `'0'` flag is given, then the locale-specific zero digits are inserted
after the sign character, if any, and before the first non-zero digit, until
the length of the string is equal to the requested field width.

-  If the value is negative and the `'('` flag is given, then a
`'('` (`'\u0028'`) is prepended and a `')'`
(`'\u0029'`) is appended.

-  If the value is negative (or floating-point negative zero) and
`'('` flag is not given, then a `'-'` (`'\u002d'`)
is prepended.

-  If the `'+'` flag is given and the value is positive or zero (or
floating-point positive zero), then a `'+'` (`'\u002b'`)
will be prepended.

 If the value is NaN or positive infinity the literal strings "NaN" or
"Infinity" respectively, will be output.  If the value is negative infinity,
then the output will be "(Infinity)" if the `'('` flag is given
otherwise the output will be "-Infinity".  These values are not localized.

** Byte, Short, Integer, and Long **

 The following conversions may be applied to `byte`, `Byte`,
`short`, `Short`, `int` and `Integer`,
`long`, and `Long`.

IntConv

 Conversion
     Unicode
     Description

 `'d'`
     `'\u0064'`
     Formats the argument as a decimal integer. The localization algorithm is applied.

 If the `'0'` flag is given and the value is negative, then
    the zero padding will occur after the sign.

 If the `'#'` flag is given then a `FormatFlagsConversionMismatchException` will be thrown.

 `'o'`
     `'\u006f'`
     Formats the argument as an integer in base eight.  No localization
    is applied.

 If *x* is negative then the result will be an unsigned value
    generated by adding 2n to the value where `n` is the
    number of bits in the type as returned by the static `SIZE` field
    in the Byte, Short,
    Integer, or Long
    classes as appropriate.

 If the `'#'` flag is given then the output will always begin
    with the radix indicator `'0'`.

 If the `'0'` flag is given then the output will be padded
    with leading zeros to the field width following any indication of sign.

 If `'('`, `'+'`, '  ', or `','` flags
    are given then a `FormatFlagsConversionMismatchException` will be
    thrown.

 `'x'`
     `'\u0078'`
     Formats the argument as an integer in base sixteen. No
    localization is applied.

 If *x* is negative then the result will be an unsigned value
    generated by adding 2n to the value where `n` is the
    number of bits in the type as returned by the static `SIZE` field
    in the Byte, Short,
    Integer, or Long
    classes as appropriate.

 If the `'#'` flag is given then the output will always begin
    with the radix indicator `"0x"`.

 If the `'0'` flag is given then the output will be padded to
    the field width with leading zeros after the radix indicator or sign (if
    present).

 If `'('`, `'  '`, `'+'`, or
    `','` flags are given then a `FormatFlagsConversionMismatchException` will be thrown.

 `'X'`
     `'\u0058'`
     The upper-case variant of `'x'`.  The entire string
    representing the number will be converted to upper case including the `'x'` (if any) and
    all hexadecimal digits `'a'` - `'f'`
    (`'\u0061'` -  `'\u0066'`).

 If the conversion is `'o'`, `'x'`, or `'X'` and
both the `'#'` and the `'0'` flags are given, then result will
contain the radix indicator (`'0'` for octal and `"0x"` or
`"0X"` for hexadecimal), some number of zeros (based on the width),
and the value.

 If the `'-'` flag is not given, then the space padding will occur
before the sign.

 The following flags apply to numeric integral
conversions:

intFlags

 Conversion
     Unicode
     Description

 `'+'`
     `'\u002b'`
     Requires the output to include a positive sign for all positive
    numbers.  If this flag is not given then only negative values will
    include a sign.

 If both the `'+'` and `'  '` flags are given
    then an `IllegalFormatFlagsException` will be thrown.

 `'  '`
     `'\u0020'`
     Requires the output to include a single extra space
    (`'\u0020'`) for non-negative values.

 If both the `'+'` and `'  '` flags are given
    then an `IllegalFormatFlagsException` will be thrown.

 `'0'`
     `'\u0030'`
     Requires the output to be padded with leading zeros to the minimum field
    width following any sign or radix indicator except when converting NaN
    or infinity.  If the width is not provided, then a `MissingFormatWidthException` will be thrown.

 If both the `'-'` and `'0'` flags are given then an
    `IllegalFormatFlagsException` will be thrown.

 `','`
     `'\u002c'`
     Requires the output to include the locale-specific group separators as
    described in the "group" section of the
    localization algorithm.

 `'('`
     `'\u0028'`
     Requires the output to prepend a `'('`
    (`'\u0028'`) and append a `')'`
    (`'\u0029'`) to negative values.

 If no flags are given the default formatting is
as follows:

-  The output is right-justified within the `width`

-  Negative numbers begin with a `'-'` (`'\u002d'`)

-  Positive numbers and zero do not include a sign or extra leading
space

-  No grouping separators are included
