---
title: "re --- Regular expression operations (part 5 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/re.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# re --- Regular expression operations (part 5 of 8)

## Module contents

The module defines several functions, constants, and an exception. Some of the
functions are simplified versions of the full featured methods for compiled
regular expressions.  Most non-trivial applications always use the compiled
form.

### Flags

> *Changed in version 3.6.*
> Flag constants are now instances of `RegexFlag`, which is a subclass of
> `enum.IntFlag`.

### class `RegexFlag`

An `enum.IntFlag` class containing the regex options listed below.

> *Added in version 3.11.*

### `A`

```python
ASCII
```

Make `\w`, `\W`, `\b`, `\B`, `\d`, `\D`, `\s` and `\S`
perform ASCII-only matching instead of full Unicode matching.  This is only
meaningful for Unicode (str) patterns, and is ignored for bytes patterns.

Corresponds to the inline flag `(?a)`.

> **Note:** The `U` flag still exists for backward compatibility,
> but is redundant in Python 3 since
> matches are Unicode by default for `str` patterns,
> and Unicode matching isn't allowed for bytes patterns.
> `UNICODE` and the inline flag `(?u)` are similarly redundant.

### `DEBUG`

Display debug information about compiled expression.

No corresponding inline flag.

### `I`

```python
IGNORECASE
```

Perform case-insensitive matching;
expressions like `[A-Z]` will also  match lowercase letters.
Full Unicode matching (such as `Ü` matching `ü`)
also works unless the `ASCII` flag
is used to disable non-ASCII matches.
The current locale does not change the effect of this flag
unless the `LOCALE` flag is also used.

Corresponds to the inline flag `(?i)`.

Note that when the Unicode patterns `[a-z]` or `[A-Z]` are used in
combination with the `IGNORECASE` flag, they will match the 52 ASCII
letters and 4 additional non-ASCII letters: 'İ' (U+0130, Latin capital
letter I with dot above), 'ı' (U+0131, Latin small letter dotless i),
'ſ' (U+017F, Latin small letter long s) and 'K' (U+212A, Kelvin sign).
If the `ASCII` flag is used, only letters 'a' to 'z'
and 'A' to 'Z' are matched.

### `L`

```python
LOCALE
```

Make `\w`, `\W`, `\b`, `\B` and case-insensitive matching
dependent on the current locale.
This flag can be used only with bytes patterns.

Corresponds to the inline flag `(?L)`.

> **Warning:** This flag is discouraged; consider Unicode matching instead.
> The locale mechanism is very unreliable
> as it only handles one "culture" at a time
> and only works with 8-bit locales.
> Unicode matching is enabled by default for Unicode (str) patterns
> and it is able to handle different locales and languages.

> *Changed in version 3.6.*
> `LOCALE` can be used only with bytes patterns
> and is not compatible with `ASCII`.

> *Changed in version 3.7.*
> Compiled regular expression objects with the `LOCALE` flag
> no longer depend on the locale at compile time.
> Only the locale at matching time affects the result of matching.

### `M`

```python
MULTILINE
```

When specified, the pattern character `'^'` matches at the beginning of the
string and at the beginning of each line (immediately following each newline);
and the pattern character `'$'` matches at the end of the string and at the
end of each line (immediately preceding each newline).  By default, `'^'`
matches only at the beginning of the string, and `'$'` only at the end of the
string and immediately before the newline (if any) at the end of the string.

Corresponds to the inline flag `(?m)`.

### `NOFLAG`

Indicates no flag being applied, the value is `0`.  This flag may be used
as a default value for a function keyword argument or as a base value that
will be conditionally ORed with other flags.  Example of use as a default
value:

```
def myfunc(pattern, text, flag=re.NOFLAG):
    return re.search(pattern, text, flag)
```

> *Added in version 3.11.*

### `S`

```python
DOTALL
```

Make the `'.'` special character match any character at all, including a
newline; without this flag, `'.'` will match anything *except* a newline.

Corresponds to the inline flag `(?s)`.

### `U`

```python
UNICODE
```

In Python 3, Unicode characters are matched by default
for `str` patterns.
This flag is therefore redundant with **no effect**
and is only kept for backward compatibility.

See `ASCII` to restrict matching to ASCII characters instead.

### `X`

```python
VERBOSE
```

This flag allows you to write regular expressions that look nicer and are
more readable by allowing you to visually separate logical sections of the
pattern and add comments. Whitespace within the pattern is ignored, except
when in a character class, or when preceded by an unescaped backslash,
or within tokens like `*?`, `(?:` or `(?P<...>`. For example, `(? :`
and `* ?` are not allowed.
When a line contains a `#` that is not in a character class and is not
preceded by an unescaped backslash, all characters from the leftmost such
`#` through the end of the line are ignored.

This means that the two following regular expression objects that match a
decimal number are functionally equal:

```
a = re.compile(r"""\d +  # the integral part
                   \.    # the decimal point
                   \d *  # some fractional digits""", re.X)
b = re.compile(r"\d+\.\d*")
```

Corresponds to the inline flag `(?x)`.

### `compile(pattern, flags=0)`

Compile a regular expression pattern into a :ref:`regular expression object
<re-objects>`, which can be used for matching using its
`prefixmatch()`,
`search()`, and other methods, described below.

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

The sequence:

```
prog = re.compile(pattern)
result = prog.search(string)
```

is equivalent to:

```
result = re.search(pattern, string)
```

but using `re.compile()` and saving the resulting regular expression
object for reuse is more efficient when the expression will be used several
times in a single program.

> **Note:** The compiled versions of the most recent patterns passed to
> `re.compile()` and the module-level matching functions are cached, so
> programs that use only a few regular expressions at a time needn't worry
> about compiling regular expressions.

### `search(pattern, string, flags=0)`

Scan through *string* looking for the first location where the regular expression
*pattern* produces a match, and return a corresponding `Match`. Return
`None` if no position in the string matches the pattern; note that this is
different from finding a zero-length match at some point in the string.

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

### `prefixmatch(pattern, string, flags=0)`

If zero or more characters at the beginning of *string* match the regular
expression *pattern*, return a corresponding `Match`.  Return
`None` if the string does not match the pattern; note that this is
different from a zero-length match.

> **Note:** Even in `MULTILINE` mode, this will only match at the
> beginning of the string and not at the beginning of each line.

If you want to locate a match anywhere in *string*, use `search()`
instead (see also search-vs-match).

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

This function now has two names and has long been known as
`match()`.  Use that name when you need to retain compatibility with
older Python versions.

> *Added in version 3.15.*

### `match(pattern, string, flags=0)`

3.15
`match()` has been soft deprecated in favor of
the alternate `prefixmatch()` name of this API which is
more explicitly descriptive. Use it to better
express intent. The norm in other languages and regular expression
implementations is to use the term *match* to refer to the behavior of
what Python has always called `search()`.
See prefixmatch-vs-match.

### `fullmatch(pattern, string, flags=0)`

If the whole *string* matches the regular expression *pattern*, return a
corresponding `Match`.  Return `None` if the string does not match
the pattern; note that this is different from a zero-length match.

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

> *Added in version 3.4.*

### `split(pattern, string, maxsplit=0, flags=0)`

Split *string* by the occurrences of *pattern*.  If capturing parentheses are
used in *pattern*, then the text of all groups in the pattern are also returned
as part of the resulting list. If *maxsplit* is nonzero, at most *maxsplit*
splits occur, and the remainder of the string is returned as the final element
of the list.:

```
>>> re.split(r'\W+', 'Words, words, words.')
['Words', 'words', 'words', '']
>>> re.split(r'(\W+)', 'Words, words, words.')
['Words', ', ', 'words', ', ', 'words', '.', '']
>>> re.split(r'\W+', 'Words, words, words.', maxsplit=1)
['Words', 'words, words.']
>>> re.split('[a-f]+', '0a3B9', flags=re.IGNORECASE)
['0', '3', '9']
```

If there are capturing groups in the separator and it matches at the start of
the string, the result will start with an empty string.  The same holds for
the end of the string:

```
>>> re.split(r'(\W+)', '...words, words...')
['', '...', 'words', ', ', 'words', '...', '']
```

That way, separator components are always found at the same relative
indices within the result list.

Adjacent empty matches are not possible, but an empty match can occur
immediately after a non-empty match.

```pycon
>>> re.split(r'\b', 'Words, words, words.')
['', 'Words', ', ', 'words', ', ', 'words', '.']
>>> re.split(r'\W*', '...words...')
['', '', 'w', 'o', 'r', 'd', 's', '', '']
>>> re.split(r'(\W*)', '...words...')
['', '...', '', '', 'w', '', 'o', '', 'r', '', 'd', '', 's', '...', '', '', '']
```

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

> *Changed in version 3.1.*
> Added the optional flags argument.

> *Changed in version 3.7.*
> Added support of splitting on a pattern that could match an empty string.

> *Deprecated since version 3.13.*
> Passing *maxsplit* and *flags* as positional arguments is deprecated.
> In future Python versions they will be
> keyword-only parameters.

### `findall(pattern, string, flags=0)`

Return all non-overlapping matches of *pattern* in *string*, as a list of
strings or tuples.  The *string* is scanned left-to-right, and matches
are returned in the order found.  Empty matches are included in the result.

The result depends on the number of capturing groups in the pattern.
If there are no groups, return a list of strings matching the whole
pattern.  If there is exactly one group, return a list of strings
matching that group.  If multiple groups are present, return a list
of tuples of strings matching the groups.  Non-capturing groups do not
affect the form of the result.

```python
>>> re.findall(r'\bf[a-z]*', 'which foot or hand fell fastest')
['foot', 'fell', 'fastest']
>>> re.findall(r'(\w+)=(\d+)', 'set width=20 and height=10')
[('width', '20'), ('height', '10')]
```

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

> *Changed in version 3.7.*
> Non-empty matches can now start just after a previous empty match.

### `finditer(pattern, string, flags=0)`

Return an iterator yielding `Match` objects over
all non-overlapping matches for the RE *pattern* in *string*.  The *string*
is scanned left-to-right, and matches are returned in the order found.  Empty
matches are included in the result.

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

> *Changed in version 3.7.*
> Non-empty matches can now start just after a previous empty match.
