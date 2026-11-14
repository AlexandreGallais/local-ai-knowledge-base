---
title: "Lexical analysis (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/lexical_analysis.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Lexical analysis (part 4 of 4)

### Formal grammar for f-strings

F-strings are handled partly by the lexical analyzer, which produces the
tokens `FSTRING_START`, `FSTRING_MIDDLE`
and `FSTRING_END`, and partly by the parser, which handles
expressions in the replacement field.
The exact way the work is split is a CPython implementation detail.

Correspondingly, the f-string grammar is a mix of
lexical and syntactic definitions.

Whitespace is significant in these situations:

- There may be no whitespace in `FSTRING_START` (between
the prefix and quote).
- Whitespace in `FSTRING_MIDDLE` is part of the literal
string contents.
- In `fstring_replacement_field`, if `f_debug_specifier` is present,
all whitespace after the opening brace until the `f_debug_specifier`,
as well as whitespace immediately following `f_debug_specifier`,
is retained as part of the expression.

> **CPython implementation detail:** The expression is not handled in the tokenization phase; it is
> retrieved from the source code using locations of the `{` token
> and the token after `=`.

The `FSTRING_MIDDLE` definition uses
negative lookaheads (`!`)
to indicate special characters (backslash, newline, `{`, `}`) and
sequences (`f_quote`).

```text

fstring:    `FSTRING_START` `fstring_middle`* `FSTRING_END`

FSTRING_START:      `fstringprefix` ("'" | '"' | "'''" | '"""')
FSTRING_END:        `f_quote`
fstringprefix:      <("f" | "fr" | "rf"), case-insensitive>
f_debug_specifier:  '='
f_quote:            <the quote character(s) used in FSTRING_START>

fstring_middle:
   | `fstring_replacement_field`
   | `FSTRING_MIDDLE`
FSTRING_MIDDLE:
   | (!"\" !`newline` !'{' !'}' !`f_quote`) `source_character`
   | `stringescapeseq`
   | "{{"
   | "}}"
   | <newline, in triple-quoted f-strings only>
fstring_replacement_field:
   | '{' `f_expression` [`f_debug_specifier`] [`fstring_conversion`]
         [`fstring_full_format_spec`] '}'
fstring_conversion:
   | "!" ("s" | "r" | "a")
fstring_full_format_spec:
   | ':' `fstring_format_spec`*
fstring_format_spec:
   | `FSTRING_MIDDLE`
   | `fstring_replacement_field`
f_expression:
   | ','.(`conditional_expression` | "*" `or_expr`)+ [","]
   | `yield_expression`
```

> **Note:** In the above grammar snippet, the `f_quote` and `FSTRING_MIDDLE` rules
> are context-sensitive -- they depend on the contents of `FSTRING_START`
> of the nearest enclosing `fstring`.
>
> Constructing a more traditional formal grammar from this template is left
> as an exercise for the reader.

The grammar for t-strings is identical to the one for f-strings, with *t*
instead of *f* at the beginning of rule and token names and in the prefix.

```text

tstring:    TSTRING_START tstring_middle* TSTRING_END

<rest of the t-string grammar is omitted; see above>
```

## Numeric literals

`NUMBER` tokens represent numeric literals, of which there are
three types: integers, floating-point numbers, and imaginary numbers.

```text

NUMBER: `integer` | `floatnumber` | `imagnumber`
```

The numeric value of a numeric literal is the same as if it were passed as a
string to the `int`, `float` or `complex` class
constructor, respectively.
Note that not all valid inputs for those constructors are also valid literals.

Numeric literals do not include a sign; a phrase like `-1` is
actually an expression composed of the unary operator '`-`' and the literal
`1`.

### Integer literals

Integer literals denote whole numbers. For example:

```
7
3
2147483647
```

There is no limit for the length of integer literals apart from what can be
stored in available memory:

```
7922816251426433759354395033679228162514264337593543950336
```

Underscores can be used to group digits for enhanced readability,
and are ignored for determining the numeric value of the literal.
For example, the following literals are equivalent:

```
100_000_000_000
100000000000
1_00_00_00_00_000
```

Underscores can only occur between digits.
For example, `_123`, `321_`, and `123__321` are *not* valid literals.

Integers can be specified in binary (base 2), octal (base 8), or hexadecimal
(base 16) using the prefixes `0b`, `0o` and `0x`, respectively.
Hexadecimal digits 10 through 15 are represented by letters `A`-`F`,
case-insensitive.  For example:

```
0b100110111
0b_1110_0101
0o177
0o377
0xdeadbeef
0xDead_Beef
```

An underscore can follow the base specifier.
For example, `0x_1f` is a valid literal, but `0_x1f` and `0x__1f` are
not.

Leading zeros in a non-zero decimal number are not allowed.
For example, `0123` is not a valid literal.
This is for disambiguation with C-style octal literals, which Python used
before version 3.0.

Formally, integer literals are described by the following lexical definitions:

```text

integer:      `decinteger` | `bininteger` | `octinteger` | `hexinteger` | `zerointeger`
decinteger:   `nonzerodigit` (["_"] `digit`)*
bininteger:   "0" ("b" | "B") (["_"] `bindigit`)+
octinteger:   "0" ("o" | "O") (["_"] `octdigit`)+
hexinteger:   "0" ("x" | "X") (["_"] `hexdigit`)+
zerointeger:  "0"+ (["_"] "0")*
nonzerodigit: "1"..."9"
digit:        "0"..."9"
bindigit:     "0" | "1"
octdigit:     "0"..."7"
hexdigit:     `digit` | "a"..."f" | "A"..."F"
```

> *Changed in version 3.6.*
> Underscores are now allowed for grouping purposes in literals.

### Floating-point literals

Floating-point (float) literals, such as `3.14` or `1.5`, denote
approximations of real numbers.

They consist of *integer* and *fraction* parts, each composed of decimal digits.
The parts are separated by a decimal point, `.`:

```
2.71828
4.0
```

Unlike in integer literals, leading zeros are allowed.
For example, `077.010` is legal, and denotes the same number as `77.01`.

As in integer literals, single underscores may occur between digits to help
readability:

```
96_485.332_123
3.14_15_93
```

Either of these parts, but not both, can be empty. For example:

```
10.  # (equivalent to 10.0)
.001  # (equivalent to 0.001)
```

Optionally, the integer and fraction may be followed by an *exponent*:
the letter `e` or `E`, followed by an optional sign, `+` or `-`,
and a number in the same format as the integer and fraction parts.
The `e` or `E` represents "times ten raised to the power of":

```
1.0e3  # (represents 1.0×10³, or 1000.0)
1.166e-5  # (represents 1.166×10⁻⁵, or 0.00001166)
6.02214076e+23  # (represents 6.02214076×10²³, or 602214076000000000000000.)
```

In floats with only integer and exponent parts, the decimal point may be
omitted:

```
1e3  # (equivalent to 1.e3 and 1.0e3)
0e0  # (equivalent to 0.)
```

Formally, floating-point literals are described by the following
lexical definitions:

```text

floatnumber:
   | `digitpart` "." [`digitpart`] [`exponent`]
   | "." `digitpart` [`exponent`]
   | `digitpart` `exponent`
digitpart: `digit` (["_"] `digit`)*
exponent:  ("e" | "E") ["+" | "-"] `digitpart`
```

> *Changed in version 3.6.*
> Underscores are now allowed for grouping purposes in literals.

### Imaginary literals

Python has complex number objects, but no complex
literals.
Instead, *imaginary literals* denote complex numbers with a zero
real part.

For example, in math, the complex number 3+4.2*i* is written
as the real number 3 added to the imaginary number 4.2*i*.
Python uses a similar syntax, except the imaginary unit is written as `j`
rather than *i*:

```
3+4.2j
```

This is an expression composed
of the integer literal `3`,
the operator '`+`',
and the imaginary literal `4.2j`.
Since these are three separate tokens, whitespace is allowed between them:

```
3 + 4.2j
```

No whitespace is allowed *within* each token.
In particular, the `j` suffix, may not be separated from the number
before it.

The number before the `j` has the same syntax as a floating-point literal.
Thus, the following are valid imaginary literals:

```
4.2j
3.14j
10.j
.001j
1e100j
3.14e-10j
3.14_15_93j
```

Unlike in a floating-point literal the decimal point can be omitted if the
imaginary number only has an integer part.
The number is still evaluated as a floating-point number, not an integer:

```
10j
0j
1000000000000000000000000j   # equivalent to 1e+24j
```

The `j` suffix is case-insensitive.
That means you can use `J` instead:

```
3.14J   # equivalent to 3.14j
```

Formally, imaginary literals are described by the following lexical definition:

```text

imagnumber: (`floatnumber` | `digitpart`) ("j" | "J")
```

## Operators and delimiters

The following grammar defines operator and delimiter tokens,
that is, the generic `OP` token type.
A list of these tokens and their names
is also available in the `token` module documentation.

```text

OP:
   | assignment_operator
   | bitwise_operator
   | comparison_operator
   | enclosing_delimiter
   | other_delimiter
   | arithmetic_operator
   | "..."
   | other_op

assignment_operator:   "+=" | "-=" | "*=" | "**=" | "/="  | "//=" | "%=" |
                       "&=" | "|=" | "^=" | "<<=" | ">>=" | "@="  | ":="
bitwise_operator:      "&"  | "|"  | "^"  | "~"   | "<<"  | ">>"
comparison_operator:   "<=" | ">=" | "<"  | ">"   | "=="  | "!="
enclosing_delimiter:   "("  | ")"  | "["  | "]"   | "{"   | "}"
other_delimiter:       ","  | ":"  | "!"  | ";"   | "="   | "->"
arithmetic_operator:   "+"  | "-"  | "**" | "*"   | "//"  | "/"   | "%"
other_op:              "."  | "@"
```

> **Note:** Generally, *operators* are used to combine expressions,
> while *delimiters* serve other purposes.
> However, there is no clear, formal distinction between the two categories.
>
> Some tokens can serve as either operators or delimiters, depending on usage.
> For example, `*` is both the multiplication operator and a delimiter used
> for sequence unpacking, and `@` is both the matrix multiplication and
> a delimiter that introduces decorators.
>
> For some tokens, the distinction is unclear.
> For example, some people consider `.`, `(`, and `)` to be delimiters, while others
> see the `getattr()` operator and the function call operator(s).
>
> Some of Python's operators, like `and`, `or`, and `not in`, use
> keyword tokens rather than "<example-value>" (operator tokens).

A sequence of three consecutive periods (`...`) has a special
meaning as an `Ellipsis` literal.
