---
title: "re --- Regular expression operations (part 4 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/re.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# re --- Regular expression operations (part 4 of 8)

Matches if the current position in the string is preceded by a match for `...`
that ends at the current position.  This is called a :dfn:`positive lookbehind
assertion`. `(?<=abc)def` will find a match in `'abcdef'`, since the
lookbehind will back up 3 characters and check if the contained pattern matches.
The contained pattern must only match strings of some fixed length, meaning that
`abc` or `a|b` are allowed, but `a*` and `a{3,4}` are not.  Note that
patterns which start with positive lookbehind assertions will not match at the
beginning of the string being searched; you will most likely want to use the
`search()` function rather than the `match()` function:

```python
>>> import re
>>> m = re.search('(?<=abc)def', 'abcdef')
>>> m.group(0)
'def'
```

This example looks for a word following a hyphen:

```python
>>> m = re.search(r'(?<=-)\w+', 'spam-egg')
>>> m.group(0)
'egg'
```

> *Changed in version 3.5.*
> Added support for group references of fixed length.

#### `(?<!...)`

Matches if the current position in the string is not preceded by a match for
`...`.  This is called a negative lookbehind assertion.  Similar to
positive lookbehind assertions, the contained pattern must only match strings of
some fixed length.  Patterns which start with negative lookbehind assertions may
match at the beginning of the string being searched.

#### `(?(id/name)yes-pattern|no-pattern)`

Will try to match with `yes-pattern` if the group with given *id* or
*name* exists, and with `no-pattern` if it doesn't. `no-pattern` is
optional and can be omitted. For example,
`(<)?(\w+@\w+(?:\.\w+)+)(?(1)>|$)` is a poor email matching pattern, which
matches `'<user@example.com>'` as well as `'user@example.com'`, but does not
match `'<user@example.com'` nor `'user@example.com>'` in their entirety
(`re.search()` finds only `'user@example.com'` in the former).

> *Changed in version 3.12.*
> Group *id* can only contain ASCII digits.
> In `bytes` patterns, group *name* can only contain bytes
> in the ASCII range (`b'\x00'`-`b'\x7f'`).

### Special sequences

The special sequences consist of `'\'` and a character from the list below.
If the ordinary character is not an ASCII digit or an ASCII letter, then the
resulting RE will match the second character.  For example, `\$` matches the
character `'$'`.

#### `\number`

Matches the contents of the group of the same number.  Groups are numbered
starting from 1.  For example, `(.+) \1` matches `'the the'` or `'55 55'`,
but not `'thethe'` (note the space after the group).  This special sequence
can only be used to match one of the first 99 groups.  If the first digit of
*number* is 0, or *number* is 3 octal digits long, it will not be interpreted as
a group match, but as the character with octal value *number*. Inside the
`'['` and `']'` of a character class, all numeric escapes are treated as
characters.

#### `\A`

Matches only at the start of the string.

#### `\b`

Matches the empty string, but only at the beginning or end of a word.
A word is defined as a sequence of word characters.
Note that formally, `\b` is defined as the boundary
between a `\w` and a `\W` character (or vice versa),
or between `\w` and the beginning or end of the string.
This means that `r'\bat\b'` matches `'at'`, `'at.'`, `'(at)'`,
and `'as at ay'` but not `'attempt'` or `'atlas'`.

The default word characters in Unicode (str) patterns
are Unicode alphanumerics and the underscore,
but this can be changed by using the `ASCII` flag.
Word boundaries are determined by the current locale
if the `LOCALE` flag is used.

> **Note:** Inside a character range, `\b` represents the backspace character,
> for compatibility with Python's string literals.

#### `\B`

Matches the empty string,
but only when it is *not* at the beginning or end of a word.
This means that `r'at\B'` matches `'athens'`, `'atom'`,
`'attorney'`, but not `'at'`, `'at.'`, or `'at!'`.
`\B` is the opposite of `\b`,
so word characters in Unicode (str) patterns
are Unicode alphanumerics or the underscore,
although this can be changed by using the `ASCII` flag.
Word boundaries are determined by the current locale
if the `LOCALE` flag is used.

> *Changed in version 3.14.*
> `\B` now matches empty input string.

#### `\d`

For Unicode (str) patterns:
Matches any Unicode decimal digit
(that is, any character in Unicode character category [Nd]).
This includes `[0-9]`, and also many other digit characters.

Matches `[0-9]` if the `ASCII` flag is used.

__ https://www.unicode.org/versions/Unicode15.0.0/ch04.pdf#G134153

For 8-bit (bytes) patterns:
Matches any decimal digit in the ASCII character set;
this is equivalent to `[0-9]`.

#### `\D`

Matches any character which is not a decimal digit.
This is the opposite of `\d`.

Matches `[^0-9]` if the `ASCII` flag is used.

#### `\s`

For Unicode (str) patterns:
Matches Unicode whitespace characters (as defined by `str.isspace()`).
This includes `[ \t\n\r\f\v]`, and also many other characters, for example the
non-breaking spaces mandated by typography rules in many languages.

Matches `[ \t\n\r\f\v]` if the `ASCII` flag is used.

For 8-bit (bytes) patterns:
Matches characters considered whitespace in the ASCII character set;
this is equivalent to `[ \t\n\r\f\v]`.

#### `\S`

Matches any character which is not a whitespace character. This is
the opposite of `\s`.

Matches `[^ \t\n\r\f\v]` if the `ASCII` flag is used.

#### `\w`

For Unicode (str) patterns:
Matches Unicode word characters;
this includes all Unicode alphanumeric characters
(as defined by `str.isalnum()`),
as well as the underscore (`_`).

Matches `[a-zA-Z0-9_]` if the `ASCII` flag is used.

For 8-bit (bytes) patterns:
Matches characters considered alphanumeric in the ASCII character set;
this is equivalent to `[a-zA-Z0-9_]`.
If the `LOCALE` flag is used,
matches characters considered alphanumeric in the current locale and the underscore.

#### `\W`

Matches any character which is not a word character.
This is the opposite of `\w`.
By default, matches non-underscore (`_`) characters
for which `str.isalnum()` returns `False`.

Matches `[^a-zA-Z0-9_]` if the `ASCII` flag is used.

If the `LOCALE` flag is used,
matches characters which are neither alphanumeric in the current locale
nor the underscore.

#### `\z`

Matches only at the end of the string.

> *Added in version 3.14.*

#### `\Z`

The same as `\z`.  For compatibility with old Python versions.

### Standard escapes

Most of the escape sequences supported by Python
string literals are also accepted by the regular expression parser:

```
\a      \b      \f      \n
\N      \r      \t      \u
\U      \v      \x      \\
```

(Note that `\b` is used to represent word boundaries, and means "backspace"
only inside character classes.)

`'\u'`, `'\U'`, and `'\N'` escape sequences are
only recognized in Unicode (str) patterns.
In bytes patterns they are errors.
Unknown escapes of ASCII letters are reserved
for future use and treated as errors.

Octal escapes are included in a limited form.  If the first digit is a 0, or if
there are three octal digits, it is considered an octal escape. Otherwise, it is
a group reference.  As for string literals, octal escapes are always at most
three digits in length.

> *Changed in version 3.3.*
> The `'\u'` and `'\U'` escape sequences have been added.

> *Changed in version 3.6.*
> Unknown escapes consisting of `'\'` and an ASCII letter now are errors.

> *Changed in version 3.8.*
> The `'\N\{{name}\}'` escape sequence has been added. As in string literals,
> it expands to the named Unicode character (e.g. `'\N{EM DASH}'`).
