---
title: "Regular expression HOWTO (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/regex.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Regular expression HOWTO (part 3 of 6)

### `L`

```python
LOCALE
```

Make `\w`, `\W`, `\b`, `\B` and case-insensitive matching dependent
on the current locale instead of the Unicode database.

Locales are a feature of the C library intended to help in writing programs
that take account of language differences.  For example, if you're
processing encoded French text, you'd want to be able to write `\w+` to
match words, but `\w` only matches the character class `[A-Za-z]` in
bytes patterns; it won't match bytes corresponding to `é` or `ç`.
If your system is configured properly and a French locale is selected,
certain C functions will tell the program that the byte corresponding to
`é` should also be considered a letter.
Setting the `LOCALE` flag when compiling a regular expression will cause
the resulting compiled object to use these C functions for `\w`; this is
slower, but also enables `\w+` to match French words as you'd expect.
The use of this flag is discouraged in Python 3 as the locale mechanism
is very unreliable, it only handles one "culture" at a time, and it only
works with 8-bit locales.  Unicode matching is already enabled by default
in Python 3 for Unicode (str) patterns, and it is able to handle different
locales/languages.

### `M`

```python
MULTILINE
```

(`^` and `$` haven't been explained yet;  they'll be introduced in section
more-metacharacters.)

Usually `^` matches only at the beginning of the string, and `$` matches
only at the end of the string and immediately before the newline (if any) at the
end of the string. When this flag is specified, `^` matches at the beginning
of the string and at the beginning of each line within the string, immediately
following each newline.  Similarly, the `$` metacharacter matches either at
the end of the string and at the end of each line (immediately preceding each
newline).

### `S`

```python
DOTALL
```

Makes the `'.'` special character match any character at all, including a
newline; without this flag, `'.'` will match anything *except* a newline.

### `A`

```python
ASCII
```

Make `\w`, `\W`, `\b`, `\B`, `\s` and `\S` perform ASCII-only
matching instead of full Unicode matching. This is only meaningful for
Unicode patterns, and is ignored for byte patterns.

### `X`

```python
VERBOSE
```

This flag allows you to write regular expressions that are more readable by
granting you more flexibility in how you can format them.  When this flag has
been specified, whitespace within the RE string is ignored, except when the
whitespace is in a character class or preceded by an unescaped backslash; this
lets you organize and indent the RE more clearly.  This flag also lets you put
comments within a RE that will be ignored by the engine; comments are marked by
a `'#'` that's neither in a character class nor preceded by an unescaped
backslash.

For example, here's a RE that uses `re.VERBOSE`; see how much easier it
is to read?:

```
charref = re.compile(r"""
 &[#]                # Start of a numeric entity reference
 (
     0[0-7]+         # Octal form
   | [0-9]+          # Decimal form
   | x[0-9a-fA-F]+   # Hexadecimal form
 )
 ;                   # Trailing semicolon
""", re.VERBOSE)
```

Without the verbose setting, the RE would look like this:

```
charref = re.compile("&#(0[0-7]+"
                     "|[0-9]+"
                     "|x[0-9a-fA-F]+);")
```

In the above example, Python's automatic concatenation of string literals has
been used to break up the RE into smaller pieces, but it's still more difficult
to understand than the version using `re.VERBOSE`.
