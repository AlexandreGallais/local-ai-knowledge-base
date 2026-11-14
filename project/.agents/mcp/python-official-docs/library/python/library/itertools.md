---
title: "itertools --- Functions creating iterators for efficient looping (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/itertools.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `itertools` --- Functions creating iterators for efficient looping

Module `itertools`.

This module implements a number of iterator building blocks inspired
by constructs from APL, Haskell, and SML.  Each has been recast in a form
suitable for Python.

The module standardizes a core set of fast, memory efficient tools that are
useful by themselves or in combination.  Together, they form an "iterator
algebra" making it possible to construct specialized tools succinctly and
efficiently in pure Python.

For instance, SML provides a tabulation tool: `tabulate(f)` which produces a
sequence `f(0), f(1), ...`.  The same effect can be achieved in Python
by combining `map()` and `count()` to form `map(f, count())`.

**General iterators:**

```text
============================    ============================    =================================================   =============================================================
Iterator                        Arguments                       Results                                             Example
============================    ============================    =================================================   =============================================================
:func:`accumulate`              p [,func]                       p0, p0+p1, p0+p1+p2, ...                            ``accumulate([1,2,3,4,5]) → 1 3 6 10 15``
:func:`batched`                 p, n                            (p0, p1, ..., p_n-1), ...                           ``batched('ABCDEFG', n=3) → ABC DEF G``
:func:`chain`                   p, q, ...                       p0, p1, ... plast, q0, q1, ...                      ``chain('ABC', 'DEF') → A B C D E F``
:func:`chain.from_iterable`     iterable                        p0, p1, ... plast, q0, q1, ...                      ``chain.from_iterable(['ABC', 'DEF']) → A B C D E F``
:func:`compress`                data, selectors                 (d[0] if s[0]), (d[1] if s[1]), ...                 ``compress('ABCDEF', [1,0,1,0,1,1]) → A C E F``
:func:`count`                   [start[, step]]                 start, start+step, start+2*step, ...                ``count(10) → 10 11 12 13 14 ...``
:func:`cycle`                   p                               p0, p1, ... plast, p0, p1, ...                      ``cycle('ABCD') → A B C D A B C D ...``
:func:`dropwhile`               predicate, seq                  seq[n], seq[n+1], starting when predicate fails     ``dropwhile(lambda x: x<5, [1,4,6,3,8]) → 6 3 8``
:func:`filterfalse`             predicate, seq                  elements of seq where predicate(elem) fails         ``filterfalse(lambda x: x<5, [1,4,6,3,8]) → 6 8``
:func:`groupby`                 iterable[, key]                 sub-iterators grouped by value of key(v)            ``groupby(['A','B','DEF'], len) → (1, A B) (3, DEF)``
:func:`islice`                  seq, [start,] stop [, step]     elements from seq[start:stop:step]                  ``islice('ABCDEFG', 2, None) → C D E F G``
:func:`pairwise`                iterable                        (p[0], p[1]), (p[1], p[2])                          ``pairwise('ABCDEFG') → AB BC CD DE EF FG``
:func:`repeat`                  elem [,n]                       elem, elem, elem, ... endlessly or up to n times    ``repeat(10, 3) → 10 10 10``
:func:`starmap`                 func, seq                       func(\*seq[0]), func(\*seq[1]), ...                 ``starmap(pow, [(2,5), (3,2), (10,3)]) → 32 9 1000``
:func:`takewhile`               predicate, seq                  seq[0], seq[1], until predicate fails               ``takewhile(lambda x: x<5, [1,4,6,3,8]) → 1 4``
:func:`tee`                     it, n                           it1, it2, ... itn  splits one iterator into n       ``tee('ABC', 2) → A B C, A B C``
:func:`zip_longest`             p, q, ...                       (p[0], q[0]), (p[1], q[1]), ...                     ``zip_longest('ABCD', 'xy', fillvalue='-') → Ax By C- D-``
============================    ============================    =================================================   =============================================================
```

**Combinatoric iterators:**

```text
==============================================   ====================       =============================================================
Iterator                                         Arguments                  Results
==============================================   ====================       =============================================================
:func:`product`                                  p, q, ... [repeat=1]       cartesian product, equivalent to a nested for-loop
:func:`permutations`                             p[, r]                     r-length tuples, all possible orderings, no repeated elements
:func:`combinations`                             p, r                       r-length tuples, in sorted order, no repeated elements
:func:`combinations_with_replacement`            p, r                       r-length tuples, in sorted order, with repeated elements
==============================================   ====================       =============================================================
```

```text
==============================================   =============================================================
Examples                                         Results
==============================================   =============================================================
``product('ABCD', repeat=2)``                    ``AA AB AC AD BA BB BC BD CA CB CC CD DA DB DC DD``
``permutations('ABCD', 2)``                      ``AB AC AD BA BC BD CA CB CD DA DB DC``
``combinations('ABCD', 2)``                      ``AB AC AD BC BD CD``
``combinations_with_replacement('ABCD', 2)``     ``AA AB AC AD BB BC BD CC CD DD``
==============================================   =============================================================
```
