---
title: "difflib --- Helpers for computing deltas (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/difflib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# difflib --- Helpers for computing deltas (part 3 of 3)

## SequenceMatcher objects

### class `SequenceMatcher(isjunk=None, a='', b='', autojunk=True)`

Optional argument *isjunk* must be `None` (the default) or a one-argument
function that takes a sequence element and returns true if and only if the
element is "junk" and should be ignored. Passing `None` for *isjunk* is
equivalent to passing `lambda x: False`; in other words, no elements are ignored.
For example, pass:

```
lambda x: x in " \t"
```

if you're comparing lines as sequences of characters, and don't want to synch up
on blanks or hard tabs.

The optional arguments *a* and *b* are sequences to be compared; both default to
empty strings.  The elements of both sequences must be hashable.

The optional argument *autojunk* can be used to disable the automatic junk
heuristic.

> *Changed in version 3.2.*
> Added the *autojunk* parameter.

SequenceMatcher objects get three data attributes: *bjunk* is the
set of elements of *b* for which *isjunk* is `True`; *bpopular* is the set of
non-junk elements considered popular by the heuristic (if it is not
disabled); *b2j* is a dict mapping the remaining elements of *b* to a list
of positions where they occur. All three are reset whenever *b* is reset
with `set_seqs()` or `set_seq2()`.

> *Added in version 3.2.*
> The *bjunk* and *bpopular* attributes.

`SequenceMatcher` objects have the following methods:

### `set_seqs(a, b)`

Set the two sequences to be compared.

`SequenceMatcher` computes and caches detailed information about the
second sequence, so if you want to compare one sequence against many
sequences, use `set_seq2()` to set the commonly used sequence once and
call `set_seq1()` repeatedly, once for each of the other sequences.

### `set_seq1(a)`

Set the first sequence to be compared.  The second sequence to be compared
is not changed.

### `set_seq2(b)`

Set the second sequence to be compared.  The first sequence to be compared
is not changed.

### `find_longest_match(alo=0, ahi=None, blo=0, bhi=None)`

Find longest matching block in `a[alo:ahi]` and `b[blo:bhi]`.

If *isjunk* was omitted or `None`, `find_longest_match()` returns
`(i, j, k)` such that `a[i:i+k]` is equal to `b[j:j+k]`, where ``alo
<= i <= i+k <= ahi` and `blo <= j <= j+k <= bhi`. For all `(i', j',
k')` meeting those conditions, the additional conditions `k >= k'`, `i
<= i'`, and if `i == i'`, `j <= j'`` are also met. In other words, of
all maximal matching blocks, return one that starts earliest in *a*, and
of all those maximal matching blocks that start earliest in *a*, return
the one that starts earliest in *b*.

```python
>>> s = SequenceMatcher(None, " abcd", "abcd abcd")
>>> s.find_longest_match(0, 5, 0, 9)
Match(a=0, b=4, size=5)
```

If *isjunk* was provided, first the longest matching block is determined
as above, but with the additional restriction that no junk element appears
in the block.  Then that block is extended as far as possible by matching
(only) junk elements on both sides. So the resulting block never matches
on junk except as identical junk happens to be adjacent to an interesting
match.

Here's the same example as before, but considering blanks to be junk. That
prevents `' abcd'` from matching the `' abcd'` at the tail end of the
second sequence directly.  Instead only the `'abcd'` can match, and
matches the leftmost `'abcd'` in the second sequence:

```python
>>> s = SequenceMatcher(lambda x: x==" ", " abcd", "abcd abcd")
>>> s.find_longest_match(0, 5, 0, 9)
Match(a=1, b=0, size=4)
```

If no blocks match, this returns `(alo, blo, 0)`.

This method returns a named tuple `Match(a, b, size)`.

> *Changed in version 3.9.*
> Added default arguments.

### `get_matching_blocks()`

Return list of triples describing non-overlapping matching subsequences.
Each triple is of the form `(i, j, n)`,
and means that `a[i:i+n] == b[j:j+n]`.  The
triples are monotonically increasing in *i* and *j*.

The last triple is a dummy, and has the value `(len(a), len(b), 0)`.  It
is the only triple with `n == 0`.  If `(i, j, n)` and `(i', j', n')`
are adjacent triples in the list, and the second is not the last triple in
the list, then `i+n < i'` or `j+n < j'`; in other words, adjacent
triples always describe non-adjacent equal blocks.

```python

>>> s = SequenceMatcher(None, "abxcd", "abcd")
>>> s.get_matching_blocks()
[Match(a=0, b=0, size=2), Match(a=3, b=2, size=2), Match(a=5, b=4, size=0)]
```

### `get_opcodes()`

Return list of 5-tuples describing how to turn *a* into *b*. Each tuple is
of the form `(tag, i1, i2, j1, j2)`.  The first tuple has ``i1 == j1 ==
0``, and remaining tuples have *i1* equal to the *i2* from the preceding
tuple, and, likewise, *j1* equal to the previous *j2*.

The *tag* values are strings, with these meanings:

```text
+---------------+---------------------------------------------+
| Value         | Meaning                                     |
+===============+=============================================+
| ``'replace'`` | ``a[i1:i2]`` should be replaced by          |
|               | ``b[j1:j2]``.                               |
+---------------+---------------------------------------------+
| ``'delete'``  | ``a[i1:i2]`` should be deleted.  Note that  |
|               | ``j1 == j2`` in this case.                  |
+---------------+---------------------------------------------+
| ``'insert'``  | ``b[j1:j2]`` should be inserted at          |
|               | ``a[i1:i1]``. Note that ``i1 == i2`` in     |
|               | this case.                                  |
+---------------+---------------------------------------------+
| ``'equal'``   | ``a[i1:i2] == b[j1:j2]`` (the sub-sequences |
|               | are equal).                                 |
+---------------+---------------------------------------------+
```

For example:

```
>>> a = "qabxcd"
>>> b = "abycdf"
>>> s = SequenceMatcher(None, a, b)
>>> for tag, i1, i2, j1, j2 in s.get_opcodes():
...     print('{:7}   a[{}:{}] --> b[{}:{}] {!r:>8} --> {!r}'.format(
...         tag, i1, i2, j1, j2, a[i1:i2], b[j1:j2]))
delete    a[0:1] --> b[0:0]      'q' --> ''
equal     a[1:3] --> b[0:2]     'ab' --> 'ab'
replace   a[3:4] --> b[2:3]      'x' --> 'y'
equal     a[4:6] --> b[3:5]     'cd' --> 'cd'
insert    a[6:6] --> b[5:6]       '' --> 'f'
```

### `get_grouped_opcodes(n=3)`

Return a generator of groups with up to *n* lines of context.

Starting with the groups returned by `get_opcodes()`, this method
splits out smaller change clusters and eliminates intervening ranges which
have no changes.

The groups are returned in the same format as `get_opcodes()`.

### `ratio()`

Return a measure of the sequences' similarity as a float in the range [0,
1].

Where T is the total number of elements in both sequences, and M is the
number of matches, this is 2.0*M / T. Note that this is `1.0` if the
sequences are identical, and `0.0` if they have nothing in common.

This is expensive to compute if `get_matching_blocks()` or
`get_opcodes()` hasn't already been called, in which case you may want
to try `quick_ratio()` or `real_quick_ratio()` first to get an
upper bound.

### `quick_ratio()`

Return an upper bound on `ratio()` relatively quickly.

### `real_quick_ratio()`

Return an upper bound on `ratio()` very quickly.

The three methods that return the ratio of matching to total characters can give
different results due to differing levels of approximation, although
`quick_ratio()` and `real_quick_ratio()`
are always at least as large as `ratio()`:

```python
>>> s = SequenceMatcher(None, "abcd", "bcde")
>>> s.ratio()
0.75
>>> s.quick_ratio()
0.75
>>> s.real_quick_ratio()
1.0
```

## Examples

### SequenceMatcher examples

This example compares two strings, considering blanks to be "junk":

```python
>>> s = SequenceMatcher(lambda x: x == " ",
...                     "private Thread currentThread;",
...                     "private volatile Thread currentThread;")
```

`ratio()` returns a float in [0, 1], measuring the similarity of the
sequences.  As a rule of thumb, a `ratio()` value over 0.6 means the
sequences are close matches:

```python
>>> print(round(s.ratio(), 3))
0.866
```

If you're only interested in where the sequences match,
`get_matching_blocks()` is handy:

```python
>>> for block in s.get_matching_blocks():
...     print("a[%d] and b[%d] match for %d elements" % block)
a[0] and b[0] match for 8 elements
a[8] and b[17] match for 21 elements
a[29] and b[38] match for 0 elements
```

Note that the last tuple returned by `get_matching_blocks()`
is always a dummy, `(len(a), len(b), 0)`, and this is the only case in which the last
tuple element (number of elements matched) is `0`.

If you want to know how to change the first sequence into the second, use
`get_opcodes()`:

```python
>>> for opcode in s.get_opcodes():
...     print("%6s a[%d:%d] b[%d:%d]" % opcode)
```

equal a[0:8] b[0:8]
insert a[8:8] b[8:17]
equal a[8:29] b[17:38]

> **See also:** - The `get_close_matches()` function in this module which shows how
> simple code building on `SequenceMatcher` can be used to do useful
> work.
>
> - `Simple version control recipe
> <https://code.activestate.com/recipes/576729-simple-version-control/>`_ for a small application
> built with `SequenceMatcher`.

### Differ example

This example compares two texts. First we set up the texts, sequences of
individual single-line strings ending with newlines (such sequences can also be
obtained from the `readlines()` method of file-like objects):

```python
>>> text1 = '''  1. Beautiful is better than ugly.
...   2. Explicit is better than implicit.
...   3. Simple is better than complex.
...   4. Complex is better than complicated.
... '''.splitlines(keepends=True)
>>> len(text1)
4
>>> text1[0][-1]
'\n'
>>> text2 = '''  1. Beautiful is better than ugly.
...   3.   Simple is better than complex.
...   4. Complicated is better than complex.
...   5. Flat is better than nested.
... '''.splitlines(keepends=True)
```

Next we instantiate a Differ object:

```python
>>> d = Differ()
```

Note that when instantiating a `Differ` object we may pass <example-value> to
filter out line and character "junk."  See the `Differ()` constructor for
details.

Finally, we compare the two:

```python
>>> result = list(d.compare(text1, text2))
```

`result` is a list of strings, so let's pretty-print it:

```python
>>> from pprint import pprint
>>> pprint(result)
['    1. Beautiful is better than ugly.\n',
```

'-   2. Explicit is better than implicit.\n',
'-   3. Simple is better than complex.\n',
'+   3.   Simple is better than complex.\n',
'?     ++\n',
'-   4. Complex is better than complicated.\n',
'?            ^                     ---- ^\n',
'+   4. Complicated is better than complex.\n',
'?           ++++ ^                      ^\n',
'+   5. Flat is better than nested.\n']

As a single multi-line string it looks like this:

```python
>>> import sys
>>> sys.stdout.writelines(result)
```

1. Beautiful is better than ugly.
- 2. Explicit is better than implicit.
- 3. Simple is better than complex.
- 3.   Simple is better than complex.
?     ++
-   4. Complex is better than complicated.
?            ^                     ---- ^
+   4. Complicated is better than complex.
?           ++++ ^                      ^
+   5. Flat is better than nested.

### A command-line interface to difflib

This example shows how to use difflib to create a `diff`-like utility.

### ndiff example

This example shows how to use `difflib.ndiff()`.
