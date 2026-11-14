---
title: "Regular expression HOWTO (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/regex.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Regular expression HOWTO (part 2 of 6)

## Using regular expressions

Now that we've looked at some simple regular expressions, how do we actually use
them in Python?  The `re` module provides an interface to the regular
expression engine, allowing you to compile REs into objects and then perform
matches with them.

### Compiling regular expressions

Regular expressions are compiled into pattern objects, which have
methods for various operations such as searching for pattern matches or
performing string substitutions.:

```
>>> import re
>>> p = re.compile('ab*')
>>> p
re.compile('ab*')
```

`re.compile()` also accepts an optional *flags* argument, used to enable
various special features and syntax variations.  We'll go over the available
settings later, but for now a single example will do:

```
>>> p = re.compile('ab*', re.IGNORECASE)
```

The RE is passed to `re.compile()` as a string.  REs are handled as strings
because regular expressions aren't part of the core Python language, and no
special syntax was created for expressing them.  (There are applications that
don't need REs at all, so there's no need to bloat the language specification by
including them.) Instead, the `re` module is simply a C extension module
included with Python, just like the `socket` or `zlib` modules.

Putting REs in strings keeps the Python language simpler, but has one
disadvantage which is the topic of the next section.

### The backslash plague

As stated earlier, regular expressions use the backslash character (`'\'`) to
indicate special forms or to allow special characters to be used without
invoking their special meaning. This conflicts with Python's usage of the same
character for the same purpose in string literals.

Let's say you want to write a RE that matches the string `\section`, which
might be found in a LaTeX file.  To figure out what to write in the program
code, start with the desired string to be matched.  Next, you must escape any
backslashes and other metacharacters by preceding them with a backslash,
resulting in the string `\section`.  The resulting string that must be passed
to `re.compile()` must be `\section`.  However, to express this as a
Python string literal, both backslashes must be escaped *again*.

```text
+-------------------+------------------------------------------+
| Characters        | Stage                                    |
+===================+==========================================+
| ``\section``      | Text string to be matched                |
+-------------------+------------------------------------------+
| ``\\section``     | Escaped backslash for :func:`re.compile` |
+-------------------+------------------------------------------+
| ``"\\\\section"`` | Escaped backslashes for a string literal |
+-------------------+------------------------------------------+
```

In short, to match a literal backslash, one has to write `'\\'` as the RE
string, because the regular expression must be `\`, and each backslash must
be expressed as `\` inside a regular Python string literal.  In REs that
feature backslashes repeatedly, this leads to lots of repeated backslashes and
makes the resulting strings difficult to understand.

The solution is to use Python's raw string notation for regular expressions;
backslashes are not handled in any special way in a string literal prefixed with
`'r'`, so `r"\n"` is a two-character string containing `'\'` and `'n'`,
while `"\n"` is a one-character string containing a newline. Regular
expressions will often be written in Python code using this raw string notation.

In addition, special escape sequences that are valid in regular expressions,
but not valid as Python string literals, now result in a
`SyntaxWarning` and will eventually become a `SyntaxError`,
which means the sequences will be invalid if raw string notation or escaping
the backslashes isn't used.

```text
+-------------------+------------------+
| Regular String    | Raw string       |
+===================+==================+
| ``"ab*"``         | ``r"ab*"``       |
+-------------------+------------------+
| ``"\\\\section"`` | ``r"\\section"`` |
+-------------------+------------------+
| ``"\\w+\\s+\\1"`` | ``r"\w+\s+\1"``  |
+-------------------+------------------+
```

### Performing matches

Once you have an object representing a compiled regular expression, what do you
do with it?  Pattern objects have several methods and attributes.
Only the most significant ones will be covered here; consult the `re` docs
for a complete listing.

```text
+------------------+-----------------------------------------------+
| Method/Attribute | Purpose                                       |
+==================+===============================================+
| ``search()``     | Scan through a string, looking for any        |
|                  | location where this RE matches.               |
+------------------+-----------------------------------------------+
| ``prefixmatch()``| Determine if the RE matches at the beginning  |
|                  | of the string. Previously named :ref:`match() |
|                  | <prefixmatch-vs-match>`.                      |
+------------------+-----------------------------------------------+
| ``findall()``    | Find all substrings where the RE matches, and |
|                  | return them as a list.                        |
+------------------+-----------------------------------------------+
| ``finditer()``   | Find all substrings where the RE matches, and |
|                  | return them as an :term:`iterator`.           |
+------------------+-----------------------------------------------+
```

`search()` and `prefixmatch()` return `None` if no match can be found.  If
they're successful, a match object instance is returned,
containing information about the match: where it starts and ends, the substring
it matched, and more.

You can learn about this by interactively experimenting with the `re`
module.

This HOWTO uses the standard Python interpreter for its examples. First, run the
Python interpreter, import the `re` module, and compile a RE:

```
>>> import re
>>> p = re.compile('[a-z]+')
>>> p
re.compile('[a-z]+')
```

Now, you can try matching various strings against the RE `[a-z]+`.  An empty
string shouldn't match at all, since `+` means 'one or more repetitions'.
`search()` should return `None` in this case, which will cause the
interpreter to print no output.  You can explicitly print the result of
`search()` to make this clear.:

```
>>> p.search("")
>>> print(p.search(""))
None
```

Now, let's try it on a string that it should match, such as `tempo`.  In this
case, `search()` will return a match object, so you
should store the result in a variable for later use.:

```
>>> m = p.search('tempo')
>>> m
<re.Match object; span=(0, 5), match='tempo'>
```

Now you can query the match object for information
about the matching string.  Match object instances
also have several methods and attributes; the most important ones are:

```text
+------------------+--------------------------------------------+
| Method/Attribute | Purpose                                    |
+==================+============================================+
| ``group()``      | Return the string matched by the RE        |
+------------------+--------------------------------------------+
| ``start()``      | Return the starting position of the match  |
+------------------+--------------------------------------------+
| ``end()``        | Return the ending position of the match    |
+------------------+--------------------------------------------+
| ``span()``       | Return a tuple containing the (start, end) |
|                  | positions  of the match                    |
+------------------+--------------------------------------------+
```

Trying these methods will soon clarify their meaning:

```
>>> m.group()
'tempo'
>>> m.start(), m.end()
(0, 5)
>>> m.span()
(0, 5)
```

`group()` returns the substring that was matched by the RE.  `start()`
and `end()` return the starting and ending index of the match. `span()`
returns both start and end indexes in a single tuple.
The `search()` method of patterns
scans through the string, so the match may not start at zero.
However, the `prefixmatch()`
method only checks if the RE matches at the start of a string, so `start()`
will always be zero in that case.:

```
>>> m = p.search('::: message'); print(m)
<re.Match object; span=(4, 11), match='message'>
>>> m.group()
'message'
>>> m.span()
(4, 11)
>>> print(p.prefixmatch('::: message'))
None
```

In actual programs, the most common style is to store the
match object in a variable, and then check if it was
`None`.  This usually looks like:

```
p = re.compile( ... )
m = p.search( 'string goes here' )
if m:
    print('Match found: ', m.group())
else:
    print('No match')
```

Two pattern methods return all of the matches for a pattern.
`findall()` returns a list of matching strings:

```
>>> p = re.compile(r'\d+')
>>> p.findall('12 drummers drumming, 11 pipers piping, 10 lords a-leaping')
['12', '11', '10']
```

The `r` prefix, making the literal a raw string literal, is needed in this
example because escape sequences in a normal "cooked" string literal that are
not recognized by Python, as opposed to regular expressions, now result in a
`SyntaxWarning` and will eventually become a `SyntaxError`.  See
the-backslash-plague.

`findall()` has to create the entire list before it can be returned as the
result.  The `finditer()` method returns a sequence of
match object instances as an iterator:

```
>>> iterator = p.finditer('12 drummers drumming, 11 ... 10 ...')
>>> iterator  #doctest: +ELLIPSIS
<callable_iterator object at 0x...>
>>> for match in iterator:
...     print(match.span())
...
(0, 2)
(22, 24)
(29, 31)
```

### Module-level functions

You don't have to create a pattern object and call its methods; the
`re` module also provides top-level functions called `search()`,
`prefixmatch()`, `findall()`, `sub()`, and so forth.  These functions
take the same arguments as the corresponding pattern method with
the RE string added as the first argument, and still return either `None` or a
match object instance.:

```
>>> print(re.prefixmatch(r'From\s+', 'Fromage amk'))
None
>>> re.prefixmatch(r'From\s+', 'From amk Thu May 14 19:12:10 1998')  #doctest: +ELLIPSIS
<re.Match object; span=(0, 5), match='From '>
```

Under the hood, these functions simply create a pattern object for you
and call the appropriate method on it.  They also store the compiled
object in a cache, so future calls using the same RE won't need to
parse the pattern again and again.

Should you use these module-level functions, or should you get the
pattern and call its methods yourself?  If you're accessing a regex
within a loop, pre-compiling it will save a few function calls.
Outside of loops, there's not much difference thanks to the internal
cache.

### Compilation flags

Compilation flags let you modify some aspects of how regular expressions work.
Flags are available in the `re` module under two names, a long name such as
`IGNORECASE` and a short, one-letter form such as `I`.  (If you're
familiar with Perl's pattern modifiers, the one-letter forms use the same
letters; the short form of `re.VERBOSE` is `re.X`, for example.)
Multiple flags can be specified by bitwise OR-ing them; `re.I | re.M` sets
both the `I` and `M` flags, for example.

Here's a table of the available flags, followed by a more detailed explanation
of each one.

```text
+---------------------------------+--------------------------------------------+
| Flag                            | Meaning                                    |
+=================================+============================================+
| :const:`ASCII`, :const:`A`      | Makes several escapes like ``\w``, ``\b``, |
|                                 | ``\s`` and ``\d`` match only on ASCII      |
|                                 | characters with the respective property.   |
+---------------------------------+--------------------------------------------+
| :const:`DOTALL`, :const:`S`     | Make ``.`` match any character, including  |
|                                 | newlines.                                  |
+---------------------------------+--------------------------------------------+
| :const:`IGNORECASE`, :const:`I` | Do case-insensitive matches.               |
+---------------------------------+--------------------------------------------+
| :const:`LOCALE`, :const:`L`     | Do a locale-aware match.                   |
+---------------------------------+--------------------------------------------+
| :const:`MULTILINE`, :const:`M`  | Multi-line matching, affecting ``^`` and   |
|                                 | ``$``.                                     |
+---------------------------------+--------------------------------------------+
| :const:`VERBOSE`, :const:`X`    | Enable verbose REs, which can be organized |
| (for 'extended')                | more cleanly and understandably.           |
+---------------------------------+--------------------------------------------+
```

### `I`

```python
IGNORECASE
```

Perform case-insensitive matching; character class and literal strings will
match letters by ignoring case.  For example, `[A-Z]` will match lowercase
letters, too. Full Unicode matching also works unless the `ASCII`
flag is used to disable non-ASCII matches.  When the Unicode patterns
`[a-z]` or `[A-Z]` are used in combination with the `IGNORECASE`
flag, they will match the 52 ASCII letters and 4 additional non-ASCII
letters: 'İ' (U+0130, Latin capital letter I with dot above), 'ı' (U+0131,
Latin small letter dotless i), 'ſ' (U+017F, Latin small letter long s) and
'K' (U+212A, Kelvin sign).  `Spam` will match `'Spam'`, `'spam'`,
`'spAM'`, or `'ſpam'` (the latter is matched only in Unicode mode).
This lowercasing doesn't take the current locale into account;
it will if you also set the `LOCALE` flag.
