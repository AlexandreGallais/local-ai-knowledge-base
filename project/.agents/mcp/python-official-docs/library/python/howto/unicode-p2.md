---
title: "Unicode HOWTO (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/unicode.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Unicode HOWTO (part 2 of 3)

## Python's Unicode Support

Now that you've learned the rudiments of Unicode, we can look at Python's
Unicode features.

### The String Type

Since Python 3.0, the language's `str` type contains Unicode
characters, meaning any string created using `"unicode rocks!"`, ``'unicode
rocks!'``, or the triple-quoted string syntax is stored as Unicode.

The default encoding for Python source code is UTF-8, so you can simply
include a Unicode character in a string literal:

```
try:
    with open('/tmp/input.txt', 'r') as f:
        ...
except OSError:
    # 'File not found' error message.
    print("Fichier non trouvé")
```

Side note: Python 3 also supports using Unicode characters in identifiers:

```
répertoire = "/tmp/records.log"
with open(répertoire, "w") as f:
    f.write("test\n")
```

If you can't enter a particular character in your editor or want to
keep the source code ASCII-only for some reason, you can also use
escape sequences in string literals. (Depending on your system,
you may see the actual capital-delta glyph instead of a \u escape.):

```
>>> "\N{GREEK CAPITAL LETTER DELTA}"  # Using the character name
'\u0394'
>>> "\u0394"                          # Using a 16-bit hex value
'\u0394'
>>> "\U00000394"                      # Using a 32-bit hex value
'\u0394'
```

In addition, one can create a string using the `decode()` method of
`bytes`.  This method takes an *encoding* argument, such as `UTF-8`,
and optionally an *errors* argument.

The *errors* argument specifies the response when the input string can't be
converted according to the encoding's rules.  Legal values for this argument are
`'strict'` (raise a `UnicodeDecodeError` exception), `'replace'` (use
`U+FFFD`, `REPLACEMENT CHARACTER`), `'ignore'` (just leave the
character out of the Unicode result), or `'backslashreplace'` (inserts a
`\xNN` escape sequence).
The following examples show the differences:

```
>>> b'\x80abc'.decode("utf-8", "strict")  #doctest: +NORMALIZE_WHITESPACE
Traceback (most recent call last):
    ...
UnicodeDecodeError: 'utf-8' codec can't decode byte 0x80 in position 0:
  invalid start byte
>>> b'\x80abc'.decode("utf-8", "replace")
'\ufffdabc'
>>> b'\x80abc'.decode("utf-8", "backslashreplace")
'\\x80abc'
>>> b'\x80abc'.decode("utf-8", "ignore")
'abc'
```

Encodings are specified as strings containing the encoding's name.  Python
comes with roughly 100 different encodings; see the Python Library Reference at
standard-encodings for a list.  Some encodings have multiple names; for
example, `'latin-1'`, `'iso_8859_1'` and `'8859`' are all synonyms for
the same encoding.

One-character Unicode strings can also be created with the `chr()`
built-in function, which takes integers and returns a Unicode string of length 1
that contains the corresponding code point.  The reverse operation is the
built-in `ord()` function that takes a one-character Unicode string and
returns the code point value:

```
>>> chr(57344)
'\ue000'
>>> ord('\ue000')
57344
```

### Converting to Bytes

The opposite method of `bytes.decode()` is `str.encode()`,
which returns a `bytes` representation of the Unicode string, encoded in the
requested *encoding*.

The *errors* parameter is the same as the parameter of the
`decode()` method but supports a few more possible handlers. As well as
`'strict'`, `'ignore'`, and `'replace'` (which in this case
inserts a question mark instead of the unencodable character), there is
also `'xmlcharrefreplace'` (inserts an XML character reference),
`backslashreplace` (inserts a `\uNNNN` escape sequence) and
`namereplace` (inserts a `\N{...}` escape sequence).

The following example shows the different results:

```
>>> u = chr(40960) + 'abcd' + chr(1972)
>>> u.encode('utf-8')
b'\xea\x80\x80abcd\xde\xb4'
>>> u.encode('ascii')  #doctest: +NORMALIZE_WHITESPACE
Traceback (most recent call last):
    ...
UnicodeEncodeError: 'ascii' codec can't encode character '\ua000' in
  position 0: ordinal not in range(128)
>>> u.encode('ascii', 'ignore')
b'abcd'
>>> u.encode('ascii', 'replace')
b'?abcd?'
>>> u.encode('ascii', 'xmlcharrefreplace')
b'&#40960;abcd&#1972;'
>>> u.encode('ascii', 'backslashreplace')
b'\\ua000abcd\\u07b4'
>>> u.encode('ascii', 'namereplace')
b'\\N{YI SYLLABLE IT}abcd\\u07b4'
```

The low-level routines for registering and accessing the available
encodings are found in the `codecs` module.  Implementing new
encodings also requires understanding the `codecs` module.
However, the encoding and decoding functions returned by this module
are usually more low-level than is comfortable, and writing new encodings
is a specialized task, so the module won't be covered in this HOWTO.

### Unicode Literals in Python Source Code

In Python source code, specific Unicode code points can be written using the
`\u` escape sequence, which is followed by four hex digits giving the code
point.  The `\U` escape sequence is similar, but expects eight hex digits,
not four:

```
>>> s = "a\xac\u1234\u20ac\U00008000"
... #     ^^^^ two-digit hex escape
... #         ^^^^^^ four-digit Unicode escape
... #                     ^^^^^^^^^^ eight-digit Unicode escape
>>> [ord(c) for c in s]
[97, 172, 4660, 8364, 32768]
```

Using escape sequences for code points greater than 127 is fine in small doses,
but becomes an annoyance if you're using many accented characters, as you would
in a program with messages in French or some other accent-using language.  You
can also assemble strings using the `chr()` built-in function, but this is
even more tedious.

Ideally, you'd want to be able to write literals in your language's natural
encoding.  You could then edit Python source code with your favorite editor
which would display the accented characters naturally, and have the right
characters used at runtime.

Python supports writing source code in UTF-8 by default, but you can use almost
any encoding if you declare the encoding being used.  This is done by including
a special comment as either the first or second line of the source file:

```
#!/usr/bin/env python
# -*- coding: latin-1 -*-

u = 'abcdé'
print(ord(u[-1]))
```

The syntax is inspired by Emacs's notation for specifying variables local to a
file.  Emacs supports many different variables, but Python only supports
'coding'.  The `-*-` symbols indicate to Emacs that the comment is special;
they have no significance to Python but are a convention.  Python looks for
`coding: name` or `coding=name` in the comment.

If you don't include such a comment, the default encoding used will be UTF-8 as
already mentioned.  See also PEP 263 for more information.

### Unicode Properties

The Unicode specification includes a database of information about
code points.  For each defined code point, the information includes
the character's name, its category, the numeric value if applicable
(for characters representing numeric concepts such as the Roman
numerals, fractions such as one-third and four-fifths, etc.).  There
are also display-related properties, such as how to use the code point
in bidirectional text.

The following program displays some information about several characters, and
prints the numeric value of one particular character:

```
import unicodedata

u = chr(233) + chr(0x0bf2) + chr(3972) + chr(6000) + chr(13231)

for i, c in enumerate(u):
    print(i, '%04x' % ord(c), unicodedata.category(c), end=" ")
    print(unicodedata.name(c))

# Get numeric value of second character
print(unicodedata.numeric(u[1]))
```

When run, this prints:

```none
0 00e9 Ll LATIN SMALL LETTER E WITH ACUTE
1 0bf2 No TAMIL NUMBER ONE THOUSAND
2 0f84 Mn TIBETAN MARK HALANTA
3 1770 Lo TAGBANWA LETTER SA
4 33af So SQUARE RAD OVER S SQUARED
1000.0
```

The category codes are abbreviations describing the nature of the character.
These are grouped into categories such as "Letter", "Number", "Punctuation", or
"Symbol", which in turn are broken up into subcategories.  To take the codes
from the above output, `'Ll'` means 'Letter, lowercase', `'No'` means
"Number, other", `'Mn'` is "Mark, nonspacing", and `'So'` is "Symbol,
other".  See
the General Category Values section of the Unicode Character Database documentation for a
list of category codes.

### Comparing Strings

Unicode adds some complication to comparing strings, because the same
set of characters can be represented by different sequences of code
points.  For example, a letter like 'ê' can be represented as a single
code point U+00EA, or as U+0065 U+0302, which is the code point for
'e' followed by a code point for 'COMBINING CIRCUMFLEX ACCENT'.  These
will produce the same output when printed, but one is a string of
length 1 and the other is of length 2.

One tool for a case-insensitive comparison is the
`casefold()` string method that converts a string to a
case-insensitive form following an algorithm described by the Unicode
Standard.  This algorithm has special handling for characters such as
the German letter 'ß' (code point U+00DF), which becomes the pair of
lowercase letters 'ss'.

```
>>> street = 'Gürzenichstraße'
>>> street.casefold()
'gürzenichstrasse'
```

A second tool is the `unicodedata` module's
`normalize()` function that converts strings to one
of several normal forms, where letters followed by a combining character are
replaced with single characters.  `normalize()` can
be used to perform string comparisons that won't falsely report
inequality if two strings use combining characters differently:

```
import unicodedata

def compare_strs(s1, s2):
    def NFD(s):
        return unicodedata.normalize('NFD', s)

    return NFD(s1) == NFD(s2)

single_char = 'ê'
multiple_chars = '\N{LATIN SMALL LETTER E}\N{COMBINING CIRCUMFLEX ACCENT}'
print('length of first string=', len(single_char))
print('length of second string=', len(multiple_chars))
print(compare_strs(single_char, multiple_chars))
```

When run, this outputs:

```shell-session
$ python compare-strs.py
length of first string= 1
length of second string= 2
True
```

The first argument to the `normalize()` function is a
string giving the desired normalization form, which can be one of
'NFC', 'NFKC', 'NFD', and 'NFKD'.

The Unicode Standard also specifies how to do caseless comparisons:

```
import unicodedata

def compare_caseless(s1, s2):
    def NFD(s):
        return unicodedata.normalize('NFD', s)

    return NFD(NFD(s1).casefold()) == NFD(NFD(s2).casefold())

# Example usage
single_char = 'ê'
multiple_chars = '\N{LATIN CAPITAL LETTER E}\N{COMBINING CIRCUMFLEX ACCENT}'

print(compare_caseless(single_char, multiple_chars))
```

This will print `True`.  (Why is `NFD()` invoked twice?  Because
there are a few characters that make `casefold()` return a
non-normalized string, so the result needs to be normalized again. See
section 3.13 of the Unicode Standard for a discussion and an example.)

### Unicode Regular Expressions

The regular expressions supported by the `re` module can be provided
either as bytes or strings.  Some of the special character sequences such as
`\d` and `\w` have different meanings depending on whether
the pattern is supplied as bytes or a string.  For example,
`\d` will match the characters `[0-9]` in bytes but
in strings will match any character that's in the `'Nd'` category.

The string in this example has the number 57 written in both Thai and
Arabic numerals:

```
import re
p = re.compile(r'\d+')

s = "Over \u0e55\u0e57 57 flavours"
m = p.search(s)
print(repr(m.group()))
```

When executed, `\d+` will match the Thai numerals and print them
out.  If you supply the `re.ASCII` flag to
`compile()`, `\d+` will match the substring "57" instead.

Similarly, `\w` matches a wide variety of Unicode characters but
only `[a-zA-Z0-9_]` in bytes or if `re.ASCII` is supplied,
and `\s` will match either Unicode whitespace characters or
`[ \t\n\r\f\v]`.

### References

Some good alternative discussions of Python's Unicode support are:

- Processing Text Files in Python 3, by Nick Coghlan.
- Pragmatic Unicode, a PyCon 2012 presentation by Ned Batchelder.

The `str` type is described in the Python library reference at
textseq.

The documentation for the `unicodedata` module.

The documentation for the `codecs` module.

Marc-André Lemburg gave `a presentation titled "Python and Unicode" (PDF slides)
<https://downloads.egenix.com/python/Unicode-EPC2002-Talk.pdf>`_ at
EuroPython 2002.  The slides are an excellent overview of the design of Python
2's Unicode features (where the Unicode string type is called `unicode` and
literals start with `u`).
