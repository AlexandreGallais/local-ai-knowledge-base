---
title: "re --- Regular expression operations (part 6 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/re.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# re --- Regular expression operations (part 6 of 8)

### `sub(pattern, repl, string, count=0, flags=0)`

Return the string obtained by replacing the leftmost non-overlapping occurrences
of *pattern* in *string* by the replacement *repl*.  If the pattern isn't found,
*string* is returned unchanged.  *repl* can be a string or a function; if it is
a string, any backslash escapes in it are processed.  That is, `\n` is
converted to a single newline character, `\r` is converted to a carriage return, and
so forth.  Unknown escapes of ASCII letters are reserved for future use and
treated as errors.  Other unknown escapes such as `\&` are left alone.
Backreferences, such
as `\6`, are replaced with the substring matched by group 6 in the pattern.
For example:

```
>>> re.sub(r'def\s+([a-zA-Z_][a-zA-Z_0-9]*)\s*\(\s*\):',
...        r'static PyObject*\npy_\1(void)\n{',
...        'def myfunc():')
'static PyObject*\npy_myfunc(void)\n{'
```

If *repl* is a function, it is called for every non-overlapping occurrence of
*pattern*.  The function takes a single `Match` argument, and returns
the replacement string.  For example:

```
>>> def dashrepl(matchobj):
...     if matchobj.group(0) == '-': return ' '
...     else: return '-'
...
>>> re.sub('-{1,2}', dashrepl, 'pro----gram-files')
'pro--gram files'
>>> re.sub(r'\sAND\s', ' & ', 'Baked Beans And Spam', flags=re.IGNORECASE)
'Baked Beans & Spam'
```

The pattern may be a string or a `Pattern`.

The optional argument *count* is the maximum number of pattern occurrences to be
replaced; *count* must be a non-negative integer.  If omitted or zero, all
occurrences will be replaced.

Adjacent empty matches are not possible, but an empty match can occur
immediately after a non-empty match.
As a result, `sub('x*', '-', 'abxd')` returns `'-a-b--d-'`
instead of `'-a-b-d-'`.

In string-type *repl* arguments, in addition to the character escapes and
backreferences described above,
`\g<name>` will use the substring matched by the group named `name`, as
defined by the `(?P<name>...)` syntax. `\g<number>` uses the corresponding
group number; `\g<2>` is therefore equivalent to `\2`, but isn't ambiguous
in a replacement such as `\g<2>0`.  `\20` would be interpreted as a
reference to group 20, not a reference to group 2 followed by the literal
character `'0'`.  The backreference `\g<0>` substitutes in the entire
substring matched by the RE.

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

> *Changed in version 3.1.*
> Added the optional flags argument.

> *Changed in version 3.5.*
> Unmatched groups are replaced with an empty string.

> *Changed in version 3.6.*
> Unknown escapes in *pattern* consisting of `'\'` and an ASCII letter
> now are errors.

> *Changed in version 3.7.*
> Unknown escapes in *repl* consisting of `'\'` and an ASCII letter
> now are errors.
> An empty match can occur immediately after a non-empty match.

> *Changed in version 3.12.*
> Group *id* can only contain ASCII digits.
> In `bytes` replacement strings, group *name* can only contain bytes
> in the ASCII range (`b'\x00'`-`b'\x7f'`).

> *Deprecated since version 3.13.*
> Passing *count* and *flags* as positional arguments is deprecated.
> In future Python versions they will be
> keyword-only parameters.

### `subn(pattern, repl, string, count=0, flags=0)`

Perform the same operation as `sub()`, but return a tuple ``(new_string,
number_of_subs_made)``.

The expression's behaviour can be modified by specifying a *flags* value.
Values can be any of the flags variables, combined using bitwise OR
(the `|` operator).

### `escape(pattern)`

Escape special characters in *pattern*.
This is useful if you want to match an arbitrary literal string that may
have regular expression metacharacters in it.  For example:

```
>>> print(re.escape('https://www.python.org'))
https://www\.python\.org

>>> legal_chars = string.ascii_lowercase + string.digits + "!#$%&'*+-.^_`|~:"
>>> print('[%s]+' % re.escape(legal_chars))
[abcdefghijklmnopqrstuvwxyz0123456789!\#\$%\&'\*\+\-\.\^_`\|\~:]+

>>> operators = ['+', '-', '*', '/', '**']
>>> print('|'.join(map(re.escape, sorted(operators, reverse=True))))
/|\-|\+|\*\*|\*
```

This function must not be used for the replacement string in `sub()`
and `subn()`, only backslashes should be escaped.  For example:

```
>>> digits_re = r'\d+'
>>> sample = '/usr/sbin/sendmail - 0 errors, 12 warnings'
>>> print(re.sub(digits_re, digits_re.replace('\\', r'\\'), sample))
/usr/sbin/sendmail - \d+ errors, \d+ warnings
```

> *Changed in version 3.3.*
> The `'_'` character is no longer escaped.

> *Changed in version 3.7.*
> Only characters that can have special meaning in a regular expression
> are escaped. As a result, `'!'`, `'"'`, `'%'`, `"'"`, `','`,
> `'/'`, `':'`, `';'`, `'<'`, `'='`, `'>'`, `'@'`, and
> `"`"` are no longer escaped.

### `purge()`

Clear the regular expression cache.

### exception `PatternError(msg, pattern=None, pos=None)`

Exception raised when a string passed to one of the functions here is not a
valid regular expression (for example, it might contain unmatched parentheses)
or when some other error occurs during compilation or matching.  It is never an
error if a string contains no match for a pattern.  The `PatternError` instance has
the following additional attributes:

### `msg`

The unformatted error message.

### `pattern`

The regular expression pattern.

### `pos`

The index in *pattern* where compilation failed (may be `None`).

### `lineno`

The line corresponding to *pos* (may be `None`).

### `colno`

The column corresponding to *pos* (may be `None`).

> *Changed in version 3.5.*
> Added additional attributes.

> *Changed in version 3.13.*
> `PatternError` was originally named `error`; the latter is kept as an alias for
> backward compatibility.

## Regular expression objects

### class `Pattern`

Compiled regular expression object returned by `re.compile()`.

Patterns are generic over the type of string they handle
(`str` or `bytes`).

> *Changed in version 3.9.*
> `re.Pattern` supports `[]` to indicate a Unicode (str) or bytes pattern.
> See types-genericalias.

### `Pattern.search(string[, pos[, endpos]])`

Scan through *string* looking for the first location where this regular
expression produces a match, and return a corresponding `Match`.
Return `None` if no position in the string matches the pattern; note that
this is different from finding a zero-length match at some point in the string.

The optional second parameter *pos* gives an index in the string where the
search is to start; it defaults to `0`.  This is not completely equivalent to
slicing the string; the `'^'` pattern character matches at the real beginning
of the string and at positions just after a newline, but not necessarily at the
index where the search is to start.

The optional parameter *endpos* limits how far the string will be searched; it
will be as if the string is *endpos* characters long, so only the characters
from *pos* to `endpos - 1` will be searched for a match.  If *endpos* is less
than *pos*, no match will be found; otherwise, if *rx* is a compiled regular
expression object, `rx.search(string, 0, 50)` is equivalent to
`rx.search(string[:50], 0)`.:

```
>>> pattern = re.compile("d")
>>> pattern.search("dog")     # Match at index 0
<re.Match object; span=(0, 1), match='d'>
>>> pattern.search("dog", 1)  # No match; search doesn't include the "d"
```

### `Pattern.prefixmatch(string[, pos[, endpos]])`

If zero or more characters at the *beginning* of *string* match this regular
expression, return a corresponding `Match`. Return `None` if the
string does not match the pattern; note that this is different from a
zero-length match.

Note that even in `MULTILINE` mode, this will only match at the
beginning of the string and not at the beginning of each line.

The optional *pos* and *endpos* parameters have the same meaning as for the
`search()` method.:

```
>>> pattern = re.compile("o")
>>> pattern.prefixmatch("dog")     # No match as "o" is not at the start of "dog".
>>> pattern.prefixmatch("dog", 1)  # Match as "o" is the 2nd character of "dog".
<re.Match object; span=(1, 2), match='o'>
```

If you want to locate a match anywhere in *string*, use
`search()` instead (see also search-vs-match).

This method now has two names and has long been known as
`match()`.  Use that name when you need to retain compatibility
with older Python versions.

> *Added in version 3.15.*

### `Pattern.match(string[, pos[, endpos]])`

3.15
`match()` has been soft deprecated in favor of
the alternate `prefixmatch()` name of this API which is
more explicitly descriptive. Use it to
better express intent. The norm in other languages and regular expression
implementations is to use the term *match* to refer to the behavior of
what Python has always called `search()`.
See prefixmatch-vs-match.

### `Pattern.fullmatch(string[, pos[, endpos]])`

If the whole *string* matches this regular expression, return a corresponding
`Match`.  Return `None` if the string does not match the pattern;
note that this is different from a zero-length match.

The optional *pos* and *endpos* parameters have the same meaning as for the
`search()` method.:

```
>>> pattern = re.compile("o[gh]")
>>> pattern.fullmatch("dog")      # No match as "o" is not at the start of "dog".
>>> pattern.fullmatch("ogre")     # No match as not the full string matches.
>>> pattern.fullmatch("doggie", 1, 3)   # Matches within given limits.
<re.Match object; span=(1, 3), match='og'>
```

> *Added in version 3.4.*

### `Pattern.split(string, maxsplit=0)`

Identical to the `split()` function, using the compiled pattern.

### `Pattern.findall(string[, pos[, endpos]])`

Similar to the `findall()` function, using the compiled pattern, but
also accepts optional *pos* and *endpos* parameters that limit the search
region like for `search()`.

### `Pattern.finditer(string[, pos[, endpos]])`

Similar to the `finditer()` function, using the compiled pattern, but
also accepts optional *pos* and *endpos* parameters that limit the search
region like for `search()`.

### `Pattern.sub(repl, string, count=0)`

Identical to the `sub()` function, using the compiled pattern.

### `Pattern.subn(repl, string, count=0)`

Identical to the `subn()` function, using the compiled pattern.

### `Pattern.flags`

The regex matching flags.  This is a combination of the flags given to
`.compile()`, any `(?...)` inline flags in the pattern, and implicit
flags such as `UNICODE` if the pattern is a Unicode string.

### `Pattern.groups`

The number of capturing groups in the pattern.

### `Pattern.groupindex`

A dictionary mapping any symbolic group names defined by `(?P<id>)` to group
numbers.  The dictionary is empty if no symbolic groups were used in the
pattern.

### `Pattern.pattern`

The pattern string from which the pattern object was compiled.

> *Changed in version 3.7.*
> Added support of `copy.copy()` and `copy.deepcopy()`.  Compiled
> regular expression objects are considered atomic.
