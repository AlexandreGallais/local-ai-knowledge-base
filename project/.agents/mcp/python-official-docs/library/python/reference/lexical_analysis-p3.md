---
title: "Lexical analysis (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/lexical_analysis.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Lexical analysis (part 3 of 4)

## String and Bytes literals

String literals are text enclosed in single quotes (`'`) or double
quotes (`"`). For example:

```python
"spam"
'eggs'
```

The quote used to start the literal also terminates it, so a string literal
can only contain the other quote (except with escape sequences, see below).
For example:

```python
'Say "Hello", please.'
"Don't do that!"
```

Except for this limitation, the choice of quote character (`'` or `"`)
does not affect how the literal is parsed.

Inside a string literal, the backslash (`\`) character introduces an
escape sequence, which has special meaning depending on the character
after the backslash.
For example, `\"` denotes the double quote character, and does *not* end
the string:

```pycon
>>> print("Say \"Hello\" to everyone!")
Say "Hello" to everyone!
```

See escape sequences below for a full list of such
sequences, and more details.

### Triple-quoted strings

Strings can also be enclosed in matching groups of three single or double
quotes.
These are generally referred to as triple-quoted strings:

```
"""This is a triple-quoted string."""
```

In triple-quoted literals, unescaped quotes are allowed (and are
retained), except that three unescaped quotes in a row terminate the literal,
if they are of the same kind (`'` or `"`) used at the start:

```
"""This string has "quotes" inside."""
```

Unescaped newlines are also allowed and retained:

```
'''This triple-quoted string
continues on the next line.'''
```

### String prefixes

String literals can have an optional prefix that influences how the
content of the literal is parsed, for example:

```python
b"data"
f'{result=}'
```

The allowed prefixes are:

- `b`: Bytes literal
- `r`: Raw string
- `f`: Formatted string literal ("f-string")
- `t`: Template string literal ("t-string")
- `u`: No effect (allowed for backwards compatibility)

See the linked sections for details on each type.

Prefixes are case-insensitive (for example, '`B`' works the same as '`b`').
The '`r`' prefix can be combined with '`f`', '`t`' or '`b`', so '`fr`',
'`rf`', '`tr`', '`rt`', '`br`', and '`rb`' are also valid prefixes.

> *Added in version 3.3.*
> The `'rb'` prefix of raw bytes literals has been added as a synonym
> of `'br'`.
> Support for the unicode legacy literal (`u'value'`) was reintroduced
> to simplify the maintenance of dual Python 2.x and 3.x codebases.
> See PEP 414 for more information.

### Formal grammar

String literals, except "f-strings" and
"t-strings", are described by the
following lexical definitions.

These definitions use negative lookaheads (`!`)
to indicate that an ending quote ends the literal.

```text

STRING:          [`stringprefix`] (`stringcontent`)
stringprefix:    <("r" | "u" | "b" | "br" | "rb"), case-insensitive>
stringcontent:
   | "'''" ( !"'''" `longstringitem`)* "'''"
   | '"""' ( !'"""' `longstringitem`)* '"""'
   | "'" ( !"'" `stringitem`)* "'"
   | '"' ( !'"' `stringitem`)* '"'
stringitem:      `stringchar` | `stringescapeseq`
stringchar:      <any `source_character`, except backslash and newline>
longstringitem:  `stringitem` | newline
stringescapeseq: "\" <any `source_character`>
```

Note that as in all lexical definitions, whitespace is significant.
In particular, the prefix (if any) must be immediately followed by the starting
quote.

### Escape sequences

Unless an '`r`' or '`R`' prefix is present, escape sequences in string and
bytes literals are interpreted according to rules similar to those used by
Standard C.  The recognized escape sequences are:

- * Escape Sequence
- Meaning
- * `\`<newline>
- string-escape-ignore
- * `\`
- Backslash
- * `\'`
- Single quote
- * `\"`
- Double quote
- * `\a`
- ASCII Bell (BEL)
- * `\b`
- ASCII Backspace (BS)
- * `\f`
- ASCII Formfeed (FF)
- * `\n`
- ASCII Linefeed (LF)
- * `\r`
- ASCII Carriage Return (CR)
- * `\t`
- ASCII Horizontal Tab (TAB)
- * `\v`
- ASCII Vertical Tab (VT)
- * `\\{ooo}`
- string-escape-oct
- * `\x{hh}`
- string-escape-hex
- * `\N\{{name}\}`
- string-escape-named
- * `\u{xxxx}`
- Hexadecimal Unicode character
- * `\U{xxxxxxxx}`
- Hexadecimal Unicode character

#### Ignored end of line

A backslash can be added at the end of a line to ignore the newline:

```
>>> 'This string will not include \
... backslashes or newline characters.'
'This string will not include backslashes or newline characters.'
```

The same result can be achieved using triple-quoted strings,
or parentheses and string literal concatenation.

#### Escaped characters

To include a backslash in a non-raw Python string
literal, it must be doubled. The `\` escape sequence denotes a single
backslash character:

```
>>> print('C:\\Program Files')
C:\Program Files
```

Similarly, the `\'` and `\"` sequences denote the single and double
quote character, respectively:

```
>>> print('\' and \"')
' and "
```

#### Octal character

The sequence `\\{ooo}` denotes a *character* with the octal (base 8)
value *ooo*:

```
>>> '\120'
'P'
```

Up to three octal digits (0 through 7) are accepted.

In a bytes literal, *character* means a *byte* with the given value.
In a string literal, it means a Unicode character with the given value.

> *Changed in version 3.11.*
> Octal escapes with value larger than `0o377` (255) produce a
> `DeprecationWarning`.

> *Changed in version 3.12.*
> Octal escapes with value larger than `0o377` (255) produce a
> `SyntaxWarning`.
> In a future Python version they will raise a `SyntaxError`.

#### Hexadecimal character

The sequence `\x{hh}` denotes a *character* with the hex (base 16)
value *hh*:

```
>>> '\x50'
'P'
```

Unlike in Standard C, exactly two hex digits are required.

In a bytes literal, *character* means a *byte* with the given value.
In a string literal, it means a Unicode character with the given value.

#### Named Unicode character

The sequence `\N\{{name}\}` denotes a Unicode character
with the given *name*:

```
>>> '\N{LATIN CAPITAL LETTER P}'
'P'
>>> '\N{SNAKE}'
'🐍'
```

This sequence cannot appear in bytes literals.

> *Changed in version 3.3.*
> Support for name aliases
> has been added.

#### Hexadecimal Unicode characters

These sequences `\u{xxxx}` and `\U{xxxxxxxx}` denote the
Unicode character with the given hex (base 16) value.
Exactly four digits are required for `\u`; exactly eight digits are
required for `\U`.
The latter can encode any Unicode character.

```pycon
>>> '\u1234'
'ሴ'
>>> '\U0001f40d'
'🐍'
```

These sequences cannot appear in bytes literals.

#### Unrecognized escape sequences

Unlike in Standard C, all unrecognized escape sequences are left in the string
unchanged, that is, *the backslash is left in the result*:

```
>>> print('\q')
\q
>>> list('\q')
['\\', 'q']
```

Note that for bytes literals, the escape sequences only recognized in string
literals (`\N...`, `\u...`, `\U...`) fall into the category of
unrecognized escapes.

> *Changed in version 3.6.*
> Unrecognized escape sequences produce a `DeprecationWarning`.

> *Changed in version 3.12.*
> Unrecognized escape sequences produce a `SyntaxWarning`.
> In a future Python version they will raise a `SyntaxError`.

### Bytes literals

Bytes literals are always prefixed with '`b`' or '`B`'; they produce an
instance of the `bytes` type instead of the `str` type.
They may only contain ASCII characters; bytes with a numeric value of 128
or greater must be expressed with escape sequences (typically
string-escape-hex or string-escape-oct):

```pycon
>>> b'\x89PNG\r\n\x1a\n'
b'\x89PNG\r\n\x1a\n'
>>> list(b'\x89PNG\r\n\x1a\n')
[137, 80, 78, 71, 13, 10, 26, 10]
```

Similarly, a zero byte must be expressed using an escape sequence (typically
`\0` or `\x00`).

### Raw string literals

Both string and bytes literals may optionally be prefixed with a letter '`r`'
or '`R`'; such constructs are called raw string literals
and raw bytes literals respectively and treat backslashes as
literal characters.
As a result, in raw string literals, escape sequences
are not treated specially:

```pycon
>>> r'\d{4}-\d{2}-\d{2}'
'\\d{4}-\\d{2}-\\d{2}'
```

Even in a raw literal, quotes can be escaped with a backslash, but the
backslash remains in the result; for example, `r"\""` is a valid string
literal consisting of two characters: a backslash and a double quote; `r"\"`
is not a valid string literal (even a raw string cannot end in an odd number of
backslashes).  Specifically, *a raw literal cannot end in a single backslash*
(since the backslash would escape the following quote character).  Note also
that a single backslash followed by a newline is interpreted as those two
characters as part of the literal, *not* as a line continuation.

### f-strings

> *Added in version 3.6.*

> *Changed in version 3.7.*
> The `await` and `async for` can be used in expressions
> within f-strings.

> *Changed in version 3.8.*
> Added the debug specifier (`=`)

> *Changed in version 3.12.*
> Many restrictions on expressions within f-strings have been removed.
> Notably, nested strings, comments, and backslashes are now permitted.

A formatted string literal or f-string is a string literal
that is prefixed with '`f`' or '`F`'.
Unlike other string literals, f-strings do not have a constant value.
They may contain *replacement fields* delimited by curly braces `{}`.
Replacement fields contain expressions which are evaluated at run time.
For example:

```
>>> who = 'nobody'
>>> nationality = 'Spanish'
>>> f'{who.title()} expects the {nationality} Inquisition!'
'Nobody expects the Spanish Inquisition!'
```

Any doubled curly braces (`{{` or `}}`) outside replacement fields
are replaced with the corresponding single curly brace:

```
>>> print(f'{{...}}')
{...}
```

Other characters outside replacement fields are treated like in ordinary
string literals.
This means that escape sequences are decoded (except when a literal is
also marked as a raw string), and newlines are possible in triple-quoted
f-strings:

```
>>> name = 'Galahad'
>>> favorite_color = 'blue'
>>> print(f'{name}:\t{favorite_color}')
Galahad:       blue
>>> print(rf"C:\Users\{name}")
C:\Users\Galahad
>>> print(f'''Three shall be the number of the counting
... and the number of the counting shall be three.''')
Three shall be the number of the counting
and the number of the counting shall be three.
```

Expressions in formatted string literals are treated like regular
Python expressions.
Each expression is evaluated in the context where the formatted string literal
appears, in order from left to right.
An empty expression is not allowed, and both `lambda` and
assignment expressions `:=` must be surrounded by explicit parentheses:

```
>>> f'{(half := 1/2)}, {half * 42}'
'0.5, 21.0'
```

Reusing the outer f-string quoting type inside a replacement field is
permitted:

```
>>> a = dict(x=2)
>>> f"abc {a["x"]} def"
'abc 2 def'
```

Backslashes are also allowed in replacement fields and are evaluated the same
way as in any other context:

```
>>> a = ["a", "b", "c"]
>>> print(f"List a contains:\n{"\n".join(a)}")
List a contains:
a
b
c
```

It is possible to nest f-strings:

```
>>> name = 'world'
>>> f'Repeated:{f' hello {name}' * 3}'
'Repeated: hello world hello world hello world'
```

Portable Python programs should not use more than 5 levels of nesting.

> **CPython implementation detail:** CPython does not limit nesting of f-strings.

Replacement expressions can contain newlines in both single-quoted and
triple-quoted f-strings and they can contain comments.
Everything that comes after a `#` inside a replacement field
is a comment (even closing braces and quotes).
This means that replacement fields with comments must be closed in a
different line:

```text
>>> a = 2
>>> f"abc{a  # This comment  }"  continues until the end of the line
...       + 3}"
'abc5'
```

After the expression, replacement fields may optionally contain:

- a *debug specifier* -- an equal sign (`=`), optionally surrounded by
whitespace on one or both sides;
- a *conversion specifier* -- `!s`, `!r` or `!a`; and/or
- a *format specifier* prefixed with a colon (`:`).

See the Standard Library section on f-strings
for details on how these fields are evaluated.

As that section explains, *format specifiers* are passed as the second argument
to the `format()` function to format a replacement field value.
For example, they can be used to specify a field width and padding characters
using the Format Specification Mini-Language:

```
>>> number = 14.3
>>> f'{number:20.7f}'
'          14.3000000'
```

Top-level format specifiers may include nested replacement fields:

```
>>> field_size = 20
>>> precision = 7
>>> f'{number:{field_size}.{precision}f}'
'          14.3000000'
```

These nested fields may include their own conversion fields and
format specifiers:

```
>>> number = 3
>>> f'{number:{field_size}}'
'                   3'
>>> f'{number:{field_size:05}}'
'00000000000000000003'
```

However, these nested fields may not include more deeply nested replacement
fields.

Formatted string literals cannot be used as docstrings,
even if they do not include expressions:

```
>>> def foo():
...     f"Not a docstring"
...
>>> print(foo.__doc__)
None
```

> **See also:** - PEP 498 -- Literal String Interpolation
> - PEP 701 -- Syntactic formalization of f-strings
> - `str.format()`, which uses a related format string mechanism.

### t-strings

> *Added in version 3.14.*

A template string literal or t-string is a string literal
that is prefixed with '`t`' or '`T`'.
These strings follow the same syntax rules as
formatted string literals.
For differences in evaluation rules, see the
Standard Library section on t-strings
