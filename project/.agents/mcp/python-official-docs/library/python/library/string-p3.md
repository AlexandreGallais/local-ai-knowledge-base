---
title: "string --- Common string operations (part 3 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/string.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# string --- Common string operations (part 3 of 5)

### Format specification mini-language

"Format specifications" are used within replacement fields contained within a
format string to define how individual values are presented (see
formatstrings, f-strings, and t-strings).
They can also be passed directly to the built-in
`format()` function.  Each formattable type may define how the format
specification is to be interpreted.

Most built-in types implement the following options for format specifications,
although some of the formatting options are only supported by the numeric types.

A general convention is that an empty format specification produces
the same result as if you had called `str()` on the value. A
non-empty format specification typically modifies the result.

The general form of a *standard format specifier* is:

```text
format-spec
format_spec: [`options`][`width_and_precision`][`type`]
options: [[`fill`]`align`][`sign`]["z"]["#"]["0"]
fill: <any character>
align: "<" | ">" | "=" | "^"
sign: "+" | "-" | " "
width_and_precision: [`width_with_grouping`][`precision_with_grouping`]
width_with_grouping: [`width`][`grouping`]
precision_with_grouping: "." [`precision`][`grouping`] | "." `grouping`
width: `~python-grammar:digit`+
precision: `~python-grammar:digit`+
grouping: "," | "_"
type: "b" | "c" | "d" | "e" | "E" | "f" | "F" | "g"
    : | "G" | "n" | "o" | "s" | "x" | "X" | "%"
```

If a valid *align* value is specified, it can be preceded by a *fill*
character that can be any character and defaults to a space if omitted.
It is not possible to use a literal curly brace ("`{`" or "`}`") as
the *fill* character in a :ref:`formatted string literal
<f-strings>` or when using the `str.format()`
method.  However, it is possible to insert a curly brace
with a nested replacement field.  This limitation doesn't
affect the `format()` function.

The meaning of the various alignment options is as follows:

```text
+---------+----------------------------------------------------------+
| Option  | Meaning                                                  |
+=========+==========================================================+
| ``'<'`` | Forces the field to be left-aligned within the available |
|         | space (this is the default for most objects).            |
+---------+----------------------------------------------------------+
| ``'>'`` | Forces the field to be right-aligned within the          |
|         | available space (this is the default for numbers).       |
+---------+----------------------------------------------------------+
| ``'='`` | Forces the padding to be placed after the sign (if any)  |
|         | but before the digits.  This is used for printing fields |
|         | in the form '<example-phone>'. This alignment option is only  |
|         | valid for numeric types, excluding :class:`complex`.     |
|         | It becomes the default for numbers when '0' immediately  |
|         | precedes the field width.                                |
+---------+----------------------------------------------------------+
| ``'^'`` | Forces the field to be centered within the available     |
|         | space.                                                   |
+---------+----------------------------------------------------------+
```

Note that unless a minimum field width is defined, the field width will always
be the same size as the data to fill it, so that the alignment option has no
meaning in this case.

The *sign* option is only valid for number types, and can be one of the
following:

```text
+---------+----------------------------------------------------------+
| Option  | Meaning                                                  |
+=========+==========================================================+
| ``'+'`` | Indicates that a sign should be used for both            |
|         | positive as well as negative numbers.                    |
+---------+----------------------------------------------------------+
| ``'-'`` | Indicates that a sign should be used only for negative   |
|         | numbers (this is the default behavior).                  |
+---------+----------------------------------------------------------+
| space   | Indicates that a leading space should be used on         |
|         | positive numbers, and a minus sign on negative numbers.  |
+---------+----------------------------------------------------------+
```

The `'z'` option coerces negative zero floating-point values to positive
zero after rounding to the format precision.  This option is only valid for
floating-point presentation types.

> *Changed in version 3.11.*
> Added the `'z'` option (see also PEP 682).

The `'#'` option causes the "alternate form" to be used for the
conversion.  The alternate form is defined differently for different
types.  This option is only valid for integer, float and complex
types. For integers, when binary, octal, or hexadecimal output
is used, this option adds the respective prefix `'0b'`, `'0o'`,
`'0x'`, or `'0X'` to the output value. For float and complex the
alternate form causes the result of the conversion to always contain a
decimal-point character, even if no digits follow it. Normally, a
decimal-point character appears in the result of these conversions
only if a digit follows it. In addition, for `'g'` and `'G'`
conversions, trailing zeros are not removed from the result.

The *width* is a decimal integer defining the minimum total field width,
including any prefixes, separators, and other formatting characters.
If not specified, then the field width will be determined by the content.

When no explicit alignment is given, preceding the *width* field by a zero
(`'0'`) character enables sign-aware zero-padding for numeric types,
excluding `complex`.  This is equivalent to a *fill* character of
`'0'` with an *alignment* type of `'='`.

> *Changed in version 3.10.*
> Preceding the *width* field by `'0'` no longer affects the default
> alignment for strings.

The *precision* is a decimal integer indicating how many digits should be
displayed after the decimal point for presentation types
`'f'` and `'F'`, or before and after the decimal point for presentation
types `'g'` or `'G'`.  For string presentation types the field
indicates the maximum field size - in other words, how many characters will be
used from the field content.  The *precision* is not allowed for integer
presentation types.

The *grouping* option after *width* and *precision* fields specifies
a digit group separator for the integral and fractional parts
of a number respectively. It can be one of the following:

```text
+---------+----------------------------------------------------------+
| Option  | Meaning                                                  |
+=========+==========================================================+
| ``','`` | Inserts a comma every 3 digits for                       |
|         | integer presentation type ``'d'`` and                    |
|         | floating-point presentation types, excluding ``'n'``.    |
|         | For other presentation types,                            |
|         | this option is not supported.                            |
+---------+----------------------------------------------------------+
| ``'_'`` | Inserts an underscore every 3 digits for                 |
|         | integer presentation type ``'d'`` and                    |
|         | floating-point presentation types, excluding ``'n'``.    |
|         | For integer presentation types                           |
|         | ``'b'``, ``'o'``, ``'x'``, and ``'X'``,                  |
|         | underscores are inserted every 4 digits.                 |
|         | For other presentation types,                            |
|         | this option is not supported.                            |
+---------+----------------------------------------------------------+
```

For a locale-aware separator, use the `'n'`
float presentation type or
integer presentation type instead.

> *Changed in version 3.1.*
> Added the `','` option (see also PEP 378).

> *Changed in version 3.6.*
> Added the `'_'` option (see also PEP 515).

> *Changed in version 3.14.*
> Support the *grouping* option for the fractional part.

Finally, the *type* determines how the data should be presented.

The available string presentation types are:

```text
   +---------+----------------------------------------------------------+
   | Type    | Meaning                                                  |
   +=========+==========================================================+
   | ``'s'`` | String format. This is the default type for strings and  |
   |         | may be omitted.                                          |
   +---------+----------------------------------------------------------+
   | None    | The same as ``'s'``.                                     |
   +---------+----------------------------------------------------------+
```

The available integer presentation types are:

```text
   +---------+----------------------------------------------------------+
   | Type    | Meaning                                                  |
   +=========+==========================================================+
   | ``'b'`` | Binary format. Outputs the number in base 2.             |
   +---------+----------------------------------------------------------+
   | ``'c'`` | Character. Converts the integer to the corresponding     |
   |         | unicode character before printing.                       |
   +---------+----------------------------------------------------------+
   | ``'d'`` | Decimal Integer. Outputs the number in base 10.          |
   +---------+----------------------------------------------------------+
   | ``'o'`` | Octal format. Outputs the number in base 8.              |
   +---------+----------------------------------------------------------+
   | ``'x'`` | Hex format. Outputs the number in base 16, using         |
   |         | lower-case letters for the digits above 9.               |
   +---------+----------------------------------------------------------+
   | ``'X'`` | Hex format. Outputs the number in base 16, using         |
   |         | upper-case letters for the digits above 9.               |
   |         | In case ``'#'`` is specified, the prefix ``'0x'`` will   |
   |         | be upper-cased to ``'0X'`` as well.                      |
   +---------+----------------------------------------------------------+
   | ``'n'`` | .. _n-format-integer:                                    |
   |         |                                                          |
   |         | Number. This is the same as ``'d'``, except that it uses |
   |         | the current locale setting to insert the appropriate     |
   |         | digit group separators. Note that the default locale is  |
   |         | not the system locale. Depending on your use case, you   |
   |         | may wish to set :const:`~locale.LC_NUMERIC` with         |
   |         | :func:`locale.setlocale` before using ``'n'``.           |
   +---------+----------------------------------------------------------+
   | None    | The same as ``'d'``.                                     |
   +---------+----------------------------------------------------------+
```

In addition to the above presentation types, integers can be formatted
with the floating-point presentation types listed below (except
`'n'` and `None`). When doing so, `float()` is used to convert the
integer to a floating-point number before formatting.

The available presentation types for `float` and
`Decimal` values are:
