---
title: "difflib --- Helpers for computing deltas (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/difflib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# difflib --- Helpers for computing deltas (part 2 of 3)

## Diff generation

### class `Differ`

This is a class for comparing sequences of lines of text, and producing
human-readable differences or deltas.  Differ uses `SequenceMatcher`
both to compare sequences of lines, and to compare sequences of characters
within similar (near-matching) lines.

Each line of a `Differ` delta begins with a two-letter code:

```text
+----------+-------------------------------------------+
| Code     | Meaning                                   |
+==========+===========================================+
| ``'- '`` | line unique to sequence 1                 |
+----------+-------------------------------------------+
| ``'+ '`` | line unique to sequence 2                 |
+----------+-------------------------------------------+
| ``'  '`` | line common to both sequences             |
+----------+-------------------------------------------+
| ``'? '`` | line not present in either input sequence |
+----------+-------------------------------------------+
```

Lines beginning with '`?`' attempt to guide the eye to intraline differences,
and were not present in either input sequence. These lines can be confusing if
the sequences contain whitespace characters, such as spaces, tabs or line breaks.

Note that `Differ`-generated deltas make no claim to be **minimal**
diffs. To the contrary, minimal diffs are often counter-intuitive for humans,
because they synch up anywhere possible, sometimes at accidental matches
100 pages apart.
Restricting synch points to contiguous matches preserves some notion of
locality, at the occasional cost of producing a longer diff.

The `Differ` class has this constructor:

### `__init__(linejunk=None, charjunk=None)`

Optional keyword parameters *linejunk* and *charjunk* are for filter functions
(or `None`):

*linejunk*: A function that accepts a single string argument, and returns true
if the string is junk.  The default is `None`, meaning that no line is
considered junk.

*charjunk*: A function that accepts a single character argument (a string of
length 1), and returns true if the character is junk. The default is `None`,
meaning that no character is considered junk.

These junk-filtering functions speed up matching to find
differences and do not cause any differing lines or characters to
be ignored.  Read the description of the
`find_longest_match()` method's *isjunk*
parameter for an explanation.

`Differ` objects are used (deltas generated) via a single method:

### `Differ.compare(a, b)`

Compare two sequences of lines, and generate the delta (a sequence of lines).

Each sequence must contain individual single-line strings ending with
newlines.  Such sequences can be obtained from the
`readlines()` method of file-like objects.  The generated
delta also consists of newline-terminated strings, ready to be
printed as-is via the `writelines()` method of a
file-like object.

### class `HtmlDiff`

This class can be used to create an HTML table (or a complete HTML file
containing the table) showing a side by side, line by line comparison of text
with inter-line and intra-line change highlights.  The table can be generated in
either full or contextual difference mode.

> **Warning:** The trailing newlines get stripped before the diff, so the result can be
> incomplete. See 71896 for details.

The constructor for this class is:

### `__init__(tabsize=8, wrapcolumn=None, linejunk=None, charjunk=IS_CHARACTER_JUNK)`

Initializes instance of `HtmlDiff`.

*tabsize* is an optional keyword argument to specify tab stop spacing and
defaults to `8`.

*wrapcolumn* is an optional keyword to specify column number where lines are
broken and wrapped, defaults to `None` where lines are not wrapped.

*linejunk* and *charjunk* are optional keyword arguments passed into `ndiff()`
(used by `HtmlDiff` to generate the side by side HTML differences).  See
`ndiff()` documentation for argument default values and descriptions.

The following methods are public:

### `make_file(fromlines, tolines, fromdesc='', todesc='', context=False, \`

```python
numlines=5, *, charset='utf-8')
```

Compares *fromlines* and *tolines* (lists of strings) and returns a string which
is a complete HTML file containing a table showing line by line differences with
inter-line and intra-line changes highlighted.

*fromdesc* and *todesc* are optional keyword arguments to specify from/to file
column header strings (both default to an empty string).

*context* and *numlines* are both optional keyword arguments. Set *context* to
`True` when contextual differences are to be shown, else the default is
`False` to show the full files. *numlines* defaults to `5`.  When *context*
is `True` *numlines* controls the number of context lines which surround the
difference highlights.  When *context* is `False` *numlines* controls the
number of lines which are shown before a difference highlight when using the
"next" hyperlinks (setting to zero would cause the "next" hyperlinks to place
the next difference highlight at the top of the browser without any leading
context).

> **Note:** *fromdesc* and *todesc* are interpreted as unescaped HTML and should be
> properly escaped while receiving input from untrusted sources.

> *Changed in version 3.5.*
> *charset* keyword-only argument was added.  The default charset of
> HTML document changed from `'ISO-8859-1'` to `'utf-8'`.

### `make_table(fromlines, tolines, fromdesc='', todesc='', context=False, numlines=5)`

Compares *fromlines* and *tolines* (lists of strings) and returns a string which
is a complete HTML table showing line by line differences with inter-line and
intra-line changes highlighted.

The arguments for this method are the same as those for the `make_file()`
method.

### `context_diff(a, b, fromfile='', tofile='', fromfiledate='', tofiledate='', n=3, lineterm='\n')`

Compare *a* and *b* (lists of strings); return a delta (a generator
generating the delta lines) in context diff format.

Context diffs are a compact way of showing just the lines that have changed plus
a few lines of context.  The changes are shown in a before/after style.  The
number of context lines is set by *n* which defaults to three.

By default, the diff control lines (those with `***` or `---`) are created
with a trailing newline.  This is helpful so that inputs created from
`io.IOBase.readlines()` result in diffs that are suitable for use with
`io.IOBase.writelines()` since both the inputs and outputs have trailing
newlines.

For inputs that do not have trailing newlines, set the *lineterm* argument to
`""` so that the output will be uniformly newline free.

The context diff format normally has a header for filenames and modification
times.  Any or all of these may be specified using strings for *fromfile*,
*tofile*, *fromfiledate*, and *tofiledate*.  The modification times are normally
expressed in the ISO 8601 format. If not specified, the
strings default to blanks.

```python
>>> import sys
>>> from difflib import *
>>> s1 = ['bacon\n', 'eggs\n', 'ham\n', 'guido\n']
>>> s2 = ['python\n', 'eggy\n', 'hamster\n', 'guido\n']
>>> sys.stdout.writelines(context_diff(s1, s2, fromfile='before.py',
...                        tofile='after.py'))
*** before.py
--- after.py
***************
*** 1,4 ****
! bacon
! eggs
! ham
```

guido
--- 1,4 ----
! python
! eggy
! hamster
guido

See difflib-interface for a more detailed example.

### `get_close_matches(word, possibilities, n=3, cutoff=0.6)`

Return a list of the best "good enough" matches.  *word* is a sequence for which
close matches are desired (typically a string), and *possibilities* is a list of
sequences against which to match *word* (typically a list of strings).

Optional argument *n* (default `3`) is the maximum number of close matches to
return; *n* must be greater than `0`.

Optional argument *cutoff* (default `0.6`) is a float in the range [0, 1].
Possibilities that don't score at least that similar to *word* are ignored.

The best (no more than *n*) matches among the possibilities are returned in a
list, sorted by similarity score, most similar first.

```python
>>> get_close_matches('appel', ['ape', 'apple', 'peach', 'puppy'])
['apple', 'ape']
>>> import keyword
>>> get_close_matches('wheel', keyword.kwlist)
['while']
>>> get_close_matches('pineapple', keyword.kwlist)
[]
>>> get_close_matches('accept', keyword.kwlist)
['except']
```

### `ndiff(a, b, linejunk=None, charjunk=IS_CHARACTER_JUNK)`

Compare *a* and *b* (lists of strings); return a `Differ`-style
delta (a generator generating the delta lines).

Optional keyword parameters *linejunk* and *charjunk* are filtering functions
(or `None`):

*linejunk*: A function that accepts a single string argument, and returns
true if the string is junk, or false if not. The default is `None`. There
is also a module-level function `IS_LINE_JUNK()`, which filters out lines
without visible characters, except for at most one hash character (`'#'`)
-- however the underlying `SequenceMatcher` class does a dynamic
analysis of which lines are so frequent as to constitute noise, and this
usually works better than using this function.

*charjunk*: A function that accepts a character (a string of length 1), and
returns if the character is junk, or false if not. The default is module-level
function `IS_CHARACTER_JUNK()`, which filters out whitespace characters (a
blank or tab; it's a bad idea to include newline in this!).

```python
>>> diff = ndiff('one\ntwo\nthree\n'.splitlines(keepends=True),
...              'ore\ntree\nemu\n'.splitlines(keepends=True))
>>> print(''.join(diff), end="")
- one
?  ^
+ ore
?  ^
- two
- three
?  -
+ tree
+ emu
```

### `restore(sequence, which)`

Return one of the two sequences that generated a delta.

Given a *sequence* produced by `Differ.compare()` or `ndiff()`, extract
lines originating from file 1 or 2 (parameter *which*), stripping off line
prefixes.

Example:

```python
>>> diff = ndiff('one\ntwo\nthree\n'.splitlines(keepends=True),
...              'ore\ntree\nemu\n'.splitlines(keepends=True))
>>> diff = list(diff) # materialize the generated delta into a list
>>> print(''.join(restore(diff, 1)), end="")
one
two
three
>>> print(''.join(restore(diff, 2)), end="")
ore
tree
emu
```

### `unified_diff(a, b, fromfile='', tofile='', fromfiledate='', tofiledate='', n=3, lineterm='\n', *, color=False)`

Compare *a* and *b* (lists of strings); return a delta (a generator
generating the delta lines) in unified diff format.

Unified diffs are a compact way of showing just the lines that have changed plus
a few lines of context.  The changes are shown in an inline style (instead of
separate before/after blocks).  The number of context lines is set by *n* which
defaults to three.

By default, the diff control lines (those with `---`, `+++`, or `@@`) are
created with a trailing newline.  This is helpful so that inputs created from
`io.IOBase.readlines()` result in diffs that are suitable for use with
`io.IOBase.writelines()` since both the inputs and outputs have trailing
newlines.

For inputs that do not have trailing newlines, set the *lineterm* argument to
`""` so that the output will be uniformly newline free.

Set *color* to `True` to enable output in color, similar to
`git diff --color`. Even if enabled, it can be
controlled using environment variables.

The unified diff format normally has a header for filenames and modification
times.  Any or all of these may be specified using strings for *fromfile*,
*tofile*, *fromfiledate*, and *tofiledate*.  The modification times are normally
expressed in the ISO 8601 format. If not specified, the
strings default to blanks.

```python
>>> s1 = ['bacon\n', 'eggs\n', 'ham\n', 'guido\n']
>>> s2 = ['python\n', 'eggy\n', 'hamster\n', 'guido\n']
>>> sys.stdout.writelines(unified_diff(s1, s2, fromfile='before.py', tofile='after.py'))
--- before.py
+++ after.py
@@ -1,4 +1,4 @@
-bacon
-eggs
-ham
+python
+eggy
+hamster
```

guido

See difflib-interface for a more detailed example.

> *Changed in version 3.15.*
> Added the *color* parameter.

### `diff_bytes(dfunc, a, b, fromfile=b'', tofile=b'', fromfiledate=b'', tofiledate=b'', n=3, lineterm=b'\n')`

Compare *a* and *b* (lists of bytes objects) using *dfunc*; yield a
sequence of delta lines (also bytes) in the format returned by *dfunc*.
*dfunc* must be a callable, typically either `unified_diff()` or
`context_diff()`.

Allows you to compare data with unknown or inconsistent encoding. All
inputs except *n* must be bytes objects, not str. Works by losslessly
converting all inputs (except *n*) to str, and calling ``dfunc(a, b,
fromfile, tofile, fromfiledate, tofiledate, n, lineterm)``. The output of
*dfunc* is then converted back to bytes, so the delta lines that you
receive have the same unknown/inconsistent encodings as *a* and *b*.

> *Added in version 3.5.*

## Junk definition functions

### `IS_LINE_JUNK(line)`

Return `True` for ignorable lines.  The line *line* is ignorable if *line* is
blank or contains a single `'#'`, otherwise it is not ignorable.  Used as a
default for parameter *linejunk* in `ndiff()` in older versions.

### `IS_CHARACTER_JUNK(ch)`

Return `True` for ignorable characters.  The character *ch* is ignorable if *ch*
is a space or tab, otherwise it is not ignorable.  Used as a default for
parameter *charjunk* in `ndiff()`.
