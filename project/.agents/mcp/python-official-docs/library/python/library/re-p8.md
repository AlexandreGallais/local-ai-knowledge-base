---
title: "re --- Regular expression operations (part 8 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/re.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# re --- Regular expression operations (part 8 of 8)

## Regular expression examples

### Checking for a pair

In this example, we'll use the following helper function to display match
objects a little more gracefully:

```
def displaymatch(match):
    if match is None:
        return None
    return '<Match: %r, groups=%r>' % (match.group(), match.groups())
```

Suppose you are writing a poker program where a player's hand is represented as
a 5-character string with each character representing a card, "a" for ace, "k"
for king, "q" for queen, "j" for jack, "t" for 10, and "2" through "9"
representing the card with that value.

To see if a given string is a valid hand, one could do the following:

```
>>> valid_hand_re = re.compile(r"^[a2-9tjqk]{5}$")
>>> displaymatch(valid_hand_re.search("akt5q"))  # Valid.
"<Match: 'akt5q', groups=()>"
>>> displaymatch(valid_hand_re.search("akt5e"))  # Invalid.
>>> displaymatch(valid_hand_re.search("akt"))    # Invalid.
>>> displaymatch(valid_hand_re.search("727ak"))  # Valid.
"<Match: '727ak', groups=()>"
```

That last hand, `"727ak"`, contained a pair, or two of the same valued cards.
To match this with a regular expression, one could use backreferences as such:

```
>>> pair_re = re.compile(r".*(.).*\1")
>>> displaymatch(pair_re.prefixmatch("717ak"))     # Pair of 7s.
"<Match: '717', groups=('7',)>"
>>> displaymatch(pair_re.prefixmatch("718ak"))     # No pairs.
>>> displaymatch(pair_re.prefixmatch("354aa"))     # Pair of aces.
"<Match: '354aa', groups=('a',)>"
```

To find out what card the pair consists of, one could use the
`group()` method of the match object in the following manner:

```
>>> pair_re = re.compile(r".*(.).*\1")
>>> pair_re.prefixmatch("717ak").group(1)
'7'

# Error because prefixmatch() returns None, which doesn't have a group() method:
>>> pair_re.prefixmatch("718ak").group(1)
Traceback (most recent call last):
  File "<pyshell#23>", line 1, in <module>
    pair_re.prefixmatch("718ak").group(1)
AttributeError: 'NoneType' object has no attribute 'group'

>>> pair_re.prefixmatch("354aa").group(1)
'a'
```

### Simulating scanf()

Python does not currently have an equivalent to `scanf`.  Regular
expressions are generally more powerful, though also more verbose, than
`scanf` format strings.  The table below offers some more-or-less
equivalent mappings between `scanf` format tokens and regular
expressions.

```text
+--------------------------------+---------------------------------------------+
| :c:func:`!scanf` Token         | Regular Expression                          |
+================================+=============================================+
| ``%c``                         | ``.``                                       |
+--------------------------------+---------------------------------------------+
| ``%5c``                        | ``.{5}``                                    |
+--------------------------------+---------------------------------------------+
| ``%d``                         | ``[-+]?\d+``                                |
+--------------------------------+---------------------------------------------+
| ``%e``, ``%E``, ``%f``, ``%g`` | ``[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?`` |
+--------------------------------+---------------------------------------------+
| ``%i``                         | ``[-+]?(0[xX][\dA-Fa-f]+|0[0-7]*|\d+)``     |
+--------------------------------+---------------------------------------------+
| ``%o``                         | ``[-+]?[0-7]+``                             |
+--------------------------------+---------------------------------------------+
| ``%s``                         | ``\S+``                                     |
+--------------------------------+---------------------------------------------+
| ``%u``                         | ``\d+``                                     |
+--------------------------------+---------------------------------------------+
| ``%x``, ``%X``                 | ``[-+]?(0[xX])?[\dA-Fa-f]+``                |
+--------------------------------+---------------------------------------------+
```

To extract the filename and numbers from a string like:

```text
/usr/sbin/sendmail - 0 errors, 4 warnings
```

you would use a `scanf` format like:

```text
%s - %d errors, %d warnings
```

The equivalent regular expression would be:

```text
(\S+) - (\d+) errors, (\d+) warnings
```

### search() vs. prefixmatch()

Python offers different primitive operations based on regular expressions:

- `re.prefixmatch()` checks for a match only at the beginning of the string
- `re.search()` checks for a match anywhere in the string
(this is what Perl does by default)
- `re.fullmatch()` checks for entire string to be a match

For example:

```
>>> re.prefixmatch("c", "abcdef")  # No match
>>> re.search("c", "abcdef")       # Match
<re.Match object; span=(2, 3), match='c'>
>>> re.fullmatch("p.*n", "python") # Match
<re.Match object; span=(0, 6), match='python'>
>>> re.fullmatch("r.*n", "python") # No match
```

Regular expressions beginning with `'^'` can be used with `search()` to
restrict the match at the beginning of the string:

```
>>> re.prefixmatch("c", "abcdef")  # No match
>>> re.search("^c", "abcdef")      # No match
>>> re.search("^a", "abcdef")      # Match
<re.Match object; span=(0, 1), match='a'>
```

Note however that in `MULTILINE` mode `prefixmatch()` only matches at the
beginning of the string, whereas using `search()` with a regular expression
beginning with `'^'` will match at the beginning of each line.:

```
>>> re.prefixmatch("X", "A\nB\nX", re.MULTILINE)  # No match
>>> re.search("^X", "A\nB\nX", re.MULTILINE)  # Match
<re.Match object; span=(4, 5), match='X'>
```

### prefixmatch() vs. match()

Why is the `match()` function and method discouraged in
favor of the longer `prefixmatch()` spelling?

Many other languages have gained regex support libraries since regular
expressions were added to Python. However in the most popular of those, they
use the term *match* in their APIs to mean the unanchored behavior provided in
Python by `search()`. Thus use of the plain term *match* can be
unclear to those used to other languages when reading or writing code and
not familiar with the Python API's divergence from what otherwise become the
industry norm.

Quoting from the Zen Of Python (`python3 -m this`): *"Explicit is better than
implicit"*. Anyone reading the name `prefixmatch()` is likely to
understand the intended semantics. When reading `match()` there remains
a seed of doubt about the intended behavior to anyone not already familiar with
this old Python gotcha.

We **do not** plan to remove the older `match()` name,
as it has been used in code for over 30 years.
It has been soft deprecated:
code supporting older versions of Python should continue to use `match()`,
while new code should prefer `prefixmatch()`.

> *Added in version 3.15.*
> `prefixmatch()`

3.15
`match()`

### Making a phonebook

`split()` splits a string into a list delimited by the passed pattern.  The
method is invaluable for converting textual data into data structures that can be
easily read and modified by Python as demonstrated in the following example that
creates a phonebook.

First, here is the input.  Normally it may come from a file, here we are using
triple-quoted string syntax

```python

>>> text = """Ross McFluff: 834.345.1254 155 Elm Street
...
... Ronald Heathmore: 892.345.3428 436 Finley Avenue
... Frank Burger: 925.541.7625 662 South Dogwood Way
...
...
... Heather Albrecht: 548.326.4584 919 Park Place"""
```

The entries are separated by one or more newlines. Now we convert the string
into a list with each nonempty line having its own entry:

```python

>>> entries = re.split("\n+", text)
>>> entries
['Ross McFluff: 834.345.1254 155 Elm Street',
'Ronald Heathmore: 892.345.3428 436 Finley Avenue',
'Frank Burger: 925.541.7625 662 South Dogwood Way',
'Heather Albrecht: 548.326.4584 919 Park Place']
```

Finally, split each entry into a list with first name, last name, telephone
number, and address.  We use the `maxsplit` parameter of `split()`
because the address has spaces, our splitting pattern, in it:

```python

>>> [re.split(":? ", entry, maxsplit=3) for entry in entries]
[['Ross', 'McFluff', '834.345.1254', '155 Elm Street'],
['Ronald', 'Heathmore', '892.345.3428', '436 Finley Avenue'],
['Frank', 'Burger', '925.541.7625', '662 South Dogwood Way'],
['Heather', 'Albrecht', '548.326.4584', '919 Park Place']]
```

The `:?` pattern matches the colon after the last name, so that it does not
occur in the result list.  With a `maxsplit` of `4`, we could separate the
house number from the street name:

```python

>>> [re.split(":? ", entry, maxsplit=4) for entry in entries]
[['Ross', 'McFluff', '834.345.1254', '155', 'Elm Street'],
['Ronald', 'Heathmore', '892.345.3428', '436', 'Finley Avenue'],
['Frank', 'Burger', '925.541.7625', '662', 'South Dogwood Way'],
['Heather', 'Albrecht', '548.326.4584', '919', 'Park Place']]
```

### Text munging

`sub()` replaces every occurrence of a pattern with a string or the
result of a function.  This example demonstrates using `sub()` with
a function to "munge" text, or randomize the order of all the characters
in each word of a sentence except for the first and last characters:

```
>>> def repl(m):
...     inner_word = list(m.group(2))
...     random.shuffle(inner_word)
...     return m.group(1) + "".join(inner_word) + m.group(3)
...
>>> text = "Professor Abdolmalek, please report your absences promptly."
>>> re.sub(r"(\w)(\w+)(\w)", repl, text)
'Poefsrosr Aealmlobdk, pslaee reorpt your abnseces plmrptoy.'
>>> re.sub(r"(\w)(\w+)(\w)", repl, text)
'Pofsroser Aodlambelk, plasee reoprt yuor asnebces potlmrpy.'
```

### Finding all adverbs

`findall()` matches *all* occurrences of a pattern, not just the first
one as `search()` does.  For example, if a writer wanted to
find all of the adverbs in some text, they might use `findall()` in
the following manner:

```
>>> text = "He was carefully disguised but captured quickly by police."
>>> re.findall(r"\w+ly\b", text)
['carefully', 'quickly']
```

### Finding all adverbs and their positions

If one wants more information about all matches of a pattern than the matched
text, `finditer()` is useful as it provides `Match` objects
instead of strings.  Continuing with the previous example, if a writer wanted
to find all of the adverbs *and their positions* in some text, they would use
`finditer()` in the following manner:

```
>>> text = "He was carefully disguised but captured quickly by police."
>>> for m in re.finditer(r"\w+ly\b", text):
...     print('%02d-%02d: %s' % (m.start(), m.end(), m.group(0)))
07-16: carefully
40-47: quickly
```

### Raw string notation

Raw string notation (`r"text"`) keeps regular expressions sane.  Without it,
every backslash (`'\'`) in a regular expression would have to be prefixed with
another one to escape it.  For example, the two following lines of code are
functionally identical:

```
>>> re.search(r"\W(.)\1\W", " ff ")
<re.Match object; span=(0, 4), match=' ff '>
>>> re.search("\\W(.)\\1\\W", " ff ")
<re.Match object; span=(0, 4), match=' ff '>
```

When one wants to match a literal backslash, it must be escaped in the regular
expression.  With raw string notation, this means `r"\"`.  Without raw string
notation, one must use `"\\"`, making the following lines of code
functionally identical:

```
>>> re.search(r"\\", r"\\")
<re.Match object; span=(0, 1), match='\\'>
>>> re.search("\\\\", r"\\")
<re.Match object; span=(0, 1), match='\\'>
```

### Writing a tokenizer

A tokenizer or scanner
analyzes a string to categorize groups of characters.  This is a useful first
step in writing a compiler or interpreter.

The text categories are specified with regular expressions.  The technique is
to combine those into a single master regular expression and to loop over
successive matches:

```
from typing import NamedTuple
import re

class Token(NamedTuple):
    type: str
    value: int | float | str
    line: int
    column: int

def tokenize(code):
    keywords = {'IF', 'THEN', 'ENDIF', 'FOR', 'NEXT', 'GOSUB', 'RETURN'}
    token_specification = [
        ('NUMBER',   r'\d+(\.\d*)?'),  # Integer or decimal number
        ('ASSIGN',   r':='),           # Assignment operator
        ('END',      r';'),            # Statement terminator
        ('ID',       r'[A-Za-z]+'),    # Identifiers
        ('OP',       r'[+\-*/]'),      # Arithmetic operators
        ('NEWLINE',  r'\n'),           # Line endings
        ('SKIP',     r'[ \t]+'),       # Skip over spaces and tabs
        ('MISMATCH', r'.'),            # Any other character
    ]
    tok_regex = '<example-value>'.join('<example-value>' % pair for pair in token_specification)
    line_num = 1
    line_start = 0
    for mo in re.finditer(tok_regex, code):
        kind = mo.lastgroup
        value = mo.group()
        column = mo.start() - line_start
        if kind == 'NUMBER':
            value = float(value) if '.' in value else int(value)
        elif kind == 'ID' and value in keywords:
            kind = value
        elif kind == 'NEWLINE':
            line_start = mo.end()
            line_num += 1
            continue
        elif kind == 'SKIP':
            continue
        elif kind == 'MISMATCH':
            raise RuntimeError(f'{value!r} unexpected on line {line_num}')
        yield Token(kind, value, line_num, column)

statements = '''
    IF quantity THEN
        total := total + price * quantity;
        tax := price * 0.05;
    ENDIF;
'''

for token in tokenize(statements):
    print(token)
```

The tokenizer produces the following output:

```
Token(type='IF', value='IF', line=2, column=4)
Token(type='ID', value='<example-value>', line=2, column=7)
Token(type='THEN', value='THEN', line=2, column=16)
Token(type='ID', value='<example-value>', line=3, column=8)
Token(type='ASSIGN', value='<example-value>', line=3, column=14)
Token(type='ID', value='<example-value>', line=3, column=17)
Token(type='OP', value='<example-value>', line=3, column=23)
Token(type='ID', value='<example-value>', line=3, column=25)
Token(type='OP', value='<example-value>', line=3, column=31)
Token(type='ID', value='<example-value>', line=3, column=33)
Token(type='END', value='<example-value>', line=3, column=41)
Token(type='ID', value='<example-value>', line=4, column=8)
Token(type='ASSIGN', value='<example-value>', line=4, column=12)
Token(type='ID', value='<example-value>', line=4, column=15)
Token(type='OP', value='<example-value>', line=4, column=21)
Token(type='NUMBER', value=0.05, line=4, column=23)
Token(type='END', value='<example-value>', line=4, column=27)
Token(type='ENDIF', value='ENDIF', line=5, column=4)
Token(type='END', value='<example-value>', line=5, column=9)
```
