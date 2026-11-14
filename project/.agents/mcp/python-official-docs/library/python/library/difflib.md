---
title: "difflib --- Helpers for computing deltas (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/difflib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `difflib` --- Helpers for computing deltas

Module `difflib`.

**Source code:** Lib/difflib.py

This module provides classes and functions for comparing sequences.
Most of them compare sequences of text lines (for example lists of strings,
or file objects) and
produce diffs -- reports on the differences.
Diffs can be produced in various formats, including HTML and context
and unified diffs -- formats produced by tools like
diff and git diff.

Comparisons are done using a matching algorithm implemented in
`SequenceMatcher` -- a flexible class for comparing pairs of sequences
of any type, not just text, so long as the sequence elements are
hashable.

## Junk heuristic

`difflib` uses a junk heuristic: some items are deemed to be
junk, and ignored when searching for similarities.
Ideally, these are uninteresting or common items, such as blank lines
or whitespace.

This heuristic can speed the algorithm up (because it reduces the number of
possible combinations) and it can produce results that are more understandable
for humans (typically breaking on whitespace).
But it can also cause pathological cases:

- Inappropriately chosen junk items can cause an unexpectedly **large** (but
still correct) result.
- The default heuristic is **asymmetric**: only the second sequence is
inspected when determining what is considered junk, so comparing A to B can
give different results than comparing B to A and reversing the result.

By default, if the second input sequence is at least 200 items long, items
that account for more than 1% it are considered *junk*.

Depending on your data, you should consider turning this heuristic off
(setting `SequenceMatcher`'s *autojunk* argument to `False`)
or tuning it (using the *isjunk* argument, perhaps to one of the
predefined functions).

## The `difflib` algorithm

The algorithm used in `SequenceMatcher` predates, and is a little
fancier than, an algorithm published in the late 1980s by Ratcliff and
Obershelp under the hyperbolic name "gestalt pattern matching."
The idea is to find the longest contiguous subsequence common to both inputs,
then recursively handle the pieces of the sequences to the left and to the
right of the matching subsequence.

> **See also:** Pattern Matching: The Gestalt Approach
> Discussion of a similar algorithm by John W. Ratcliff and D. E. Metzener. This
> was published in Dr. Dobb's Journal in July, 1988.

As an extension to the Ratcliff and Obershelp algorithm, `difflib`
searches for the longest *junk-free* contiguous subsequence.
See the difflib-junk section for details.

> **CPython implementation detail:** Timing
>
> The basic <example-value> algorithm is cubic time in the worst
> case and quadratic time in the expected case.
> `difflib`'s algorithm is quadratic time for the worst case and has
> expected-case behavior dependent in a complicated way on how many elements
> the sequences have in common;
> best case time is linear.
