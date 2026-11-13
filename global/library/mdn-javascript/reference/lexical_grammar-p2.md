---
title: "Lexical grammar (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/lexical_grammar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Lexical grammar (part 2 of 3)

## Literals

> **Note:**
> This section discusses literals that are atomic tokens. Object literals and array literals are expressions that consist of a series of tokens.

### Null literal

See also `null` for more information.

```js
null
```

### Boolean literal

See also boolean type for more information.

```js
true
false
```

### Numeric literals

The Number and BigInt types use numeric literals.

#### Decimal

```js
1234567890
42
```

Decimal literals can start with a zero (`0`) followed by another decimal digit, but if all digits after the leading `0` are smaller than 8, the number is interpreted as an octal number. This is considered a legacy syntax, and number literals prefixed with `0`, whether interpreted as octal or decimal, cause a syntax error in strict mode — so, use the `0o` prefix instead.

```js
0888 // 888 parsed as decimal
0777 // parsed as octal, 511 in decimal
```

##### Exponential

The decimal exponential literal is specified by the following format: `beN`; where `b` is a base number (integer or floating), followed by an `E` or `e` character (which serves as separator or _exponent indicator_) and `N`, which is _exponent_ or _power_ number – a signed integer.

```js
0e-5   // 0
0e+5   // 0
5e1    // 50
175e-2 // 1.75
1e3    // 1000
1e-3   // 0.001
1E3    // 1000
```

#### Binary

Binary number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "B" (`0b` or `0B`). The digits after the prefix must be `0` or `1`.

```js
0b10000000000000000000000000000000 // 2147483648
0b01111111100000000000000000000000 // 2139095040
0B00000000011111111111111111111111 // 8388607
```

#### Octal

Octal number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "O" (`0o` or `0O`). The digits after the prefix must be in the range `0`–`7`.

```js
0O755 // 493
0o644 // 420
```

#### Hexadecimal

Hexadecimal number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "X" (`0x` or `0X`). The digits after the prefix must be in the ranges `0`–`9`, `A`–`F`, or `a`–`f`.

```js
0xFFFFFFFFFFFFF // 4503599627370495
0xabcdef123456  // 188900967593046
0XA             // 10
```

#### BigInt literal

The BigInt type is a numeric primitive in JavaScript that can represent integers with arbitrary precision. BigInt literals are created by appending `n` to the end of an integer.

```js
123456789123456789n     // 123456789123456789
0o777777777777n         // 68719476735
0x123456789ABCDEFn      // 81985529216486895
0b11101001010101010101n // 955733
```

Decimal BigInt literals cannot have leading zeros to avoid confusion with legacy octal literals.

```js
0755n; // SyntaxError: invalid BigInt syntax
```

For octal `BigInt` numbers, always use zero followed by the letter "o" (uppercase or lowercase):

```js
0o755n;
```

For more information about `BigInt`, see also JavaScript data structures.

#### Numeric separators

To improve readability for numeric literals, underscores (`_`, `U+005F`) can be used as separators:

```js
1_000_000_000_000
1_050.95
0b1010_0001_1000_0101
0o2_2_5_6
0xA0_B0_C0
1_000_000_000_000_000_000_000n
```

Note these limitations:

```js
// More than one underscore in a row is not allowed
100__000; // SyntaxError

// Not allowed at the end of numeric literals
100_; // SyntaxError

// Can not be used after leading 0
0_1; // SyntaxError
```

### String literals

A string literal is zero or more Unicode code points enclosed in single or double quotes. Unicode code points may also be represented by an escape sequence. All code points may appear literally in a string literal except for these code points:

- U+005C \ (backslash)
- U+000D \<CR>
- U+000A \<LF>
- The same kind of quote that begins the string literal

Any code points may appear in the form of an escape sequence. String literals evaluate to ECMAScript String values. When generating these String values Unicode code points are UTF-16 encoded.

```js
'foo'
"bar"
```

The following subsections describe various escape sequences (`\` followed by one or more characters) available in string literals. Any escape sequence not listed below becomes an "identity escape" that becomes the code point itself. For example, `\z` is the same as `z`. There's a deprecated octal escape sequence syntax described in the Deprecated and obsolete features page. Many of these escape sequences are also valid in regular expressions — see Character escape.

#### Escape sequences

Special characters can be encoded using escape sequences:

| Escape sequence                                        | Unicode code point                           |
| ------------------------------------------------------ | -------------------------------------------- |
| `\0`                                                   | null character (U+0000 NULL)                 |
| `\'`                                                   | single quote (U+0027 APOSTROPHE)             |
| `\"`                                                   | double quote (U+0022 QUOTATION MARK)         |
| `\\`                                                   | backslash (U+005C REVERSE SOLIDUS)           |
| `\n`                                                   | newline (U+000A LINE FEED; LF)               |
| `\r`                                                   | carriage return (U+000D CARRIAGE RETURN; CR) |
| `\v`                                                   | vertical tab (U+000B LINE TABULATION)        |
| `\t`                                                   | tab (U+0009 CHARACTER TABULATION)            |
| `\b`                                                   | backspace (U+0008 BACKSPACE)                 |
| `\f`                                                   | form feed (U+000C FORM FEED)                 |
| `\` followed by a line terminator | empty string                                 |

The last escape sequence, `\` followed by a line terminator, is useful for splitting a string literal across multiple lines without changing its meaning.

```js
const longString =
  "This is a very long string which needs \
to wrap across multiple lines because \
otherwise my code is unreadable.";
```

Make sure there is no space or any other character after the backslash (except for a line break), otherwise it will not work. If the next line is indented, the extra spaces will also be present in the string's value.

You can also use the `+` operator to append multiple strings together, like this:

```js
const longString =
  "This is a very long string which needs " +
  "to wrap across multiple lines because " +
  "otherwise my code is unreadable.";
```

Both of the above methods result in identical strings.

#### Hexadecimal escape sequences

Hexadecimal escape sequences consist of `\x` followed by exactly two hexadecimal digits representing a code unit or code point in the range 0x0000 to 0x00FF.

```js
"\xA9"; // "©"
```

#### Unicode escape sequences

A Unicode escape sequence consists of exactly four hexadecimal digits following `\u`. It represents a code unit in the UTF-16 encoding. For code points U+0000 to U+FFFF, the code unit is equal to the code point. Code points U+10000 to U+10FFFF require two escape sequences representing the two code units (a surrogate pair) used to encode the character; the surrogate pair is distinct from the code point.

See also `String.fromCharCode()` and `String.prototype.charCodeAt()`.

```js
"\u00A9"; // "©" (U+A9)
```

#### Unicode code point escapes

A Unicode code point escape consists of `\u{`, followed by a code point in hexadecimal base, followed by `}`. The value of the hexadecimal digits must be in the range 0 and 0x10FFFF inclusive. Code points in the range U+10000 to U+10FFFF do not need to be represented as a surrogate pair.

See also `String.fromCodePoint()` and `String.prototype.codePointAt()`.

```js
"\u{2F804}"; // CJK COMPATIBILITY IDEOGRAPH-2F804 (U+2F804)

// the same character represented as a surrogate pair
"\uD87E\uDC04";
```

### Regular expression literals

Regular expression literals are enclosed by two forward slashes (`/`). The lexer consumes all characters up to the next unescaped forward slash or the end of the line, unless the forward slash appears within a character class (`[]`). Some characters (namely, those that are identifier parts) can appear after the closing slash, denoting flags.

The lexical grammar is very lenient: not all regular expression literals that get identified as one token are valid regular expressions.

See also `RegExp` for more information.

```js
/ab+c/g;
/[/]/;
```

A regular expression literal cannot start with two forward slashes (`//`), because that would be a line comment. To specify an empty regular expression, use `/(?:)/`.

### Template literals

One template literal consists of several tokens: `` `xxx${ `` (template head), `}xxx${` (template middle), and `` }xxx` `` (template tail) are individual tokens, while any expression may come between them.

See also template literals for more information.

```js
`string text`;

`string text line 1
 string text line 2`;

`string text ${expression} string text`;

tag`string text ${expression} string text`;
```
