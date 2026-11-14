---
title: "itertools --- Functions creating iterators for efficient looping (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/itertools.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# itertools --- Functions creating iterators for efficient looping (part 3 of 6)

### `permutations(iterable, r=None)`

Return successive *r* length `permutations of elements
<https://www.britannica.com/science/permutation>`_ from the *iterable*.

If *r* is not specified or is `None`, then *r* defaults to the length
of the *iterable* and all possible full-length permutations
are generated.

The output is a subsequence of `product()` where entries with
repeated elements have been filtered out.  The length of the output is
given by `math.perm()` which computes `n! / (n - r)!` when
`0 ≤ r ≤ n` or zero when `r > n`.

The permutation tuples are emitted in lexicographic order according to
the order of the input *iterable*.  If the input *iterable* is sorted,
the output tuples will be produced in sorted order.

Elements are treated as unique based on their position, not on their
value.  If the input elements are unique, there will be no repeated
values within a permutation.

Roughly equivalent to:

```
def permutations(iterable, r=None):
    # permutations('ABCD', 2) → AB AC AD BA BC BD CA CB CD DA DB DC
    # permutations(range(3)) → 012 021 102 120 201 210

    pool = tuple(iterable)
    n = len(pool)
    r = n if r is None else r
    if r > n:
        return

    indices = list(range(n))
    cycles = list(range(n, n-r, -1))
    yield tuple(pool[i] for i in indices[:r])

    while n:
        for i in reversed(range(r)):
            cycles[i] -= 1
            if cycles[i] == 0:
                indices[i:] = indices[i+1:] + indices[i:i+1]
                cycles[i] = n - i
            else:
                j = cycles[i]
                indices[i], indices[-j] = indices[-j], indices[i]
                yield tuple(pool[i] for i in indices[:r])
                break
        else:
            return
```

### `product(*iterables, repeat=1)`

Cartesian product
of the input iterables.

Roughly equivalent to nested for-loops in a generator expression. For example,
`product(A, B)` returns the same as `((x,y) for x in A for y in B)`.

The nested loops cycle like an odometer with the rightmost element advancing
on every iteration.  This pattern creates a lexicographic ordering so that if
the input's iterables are sorted, the product tuples are emitted in sorted
order.

To compute the product of an iterable with itself, specify the number of
repetitions with the optional *repeat* keyword argument.  For example,
`product(A, repeat=4)` means the same as `product(A, A, A, A)`.

This function is roughly equivalent to the following code, except that the
actual implementation does not build up intermediate results in memory:

```
def product(*iterables, repeat=1):
    # product('ABCD', 'xy') → Ax Ay Bx By Cx Cy Dx Dy
    # product(range(2), repeat=3) → 000 001 010 011 100 101 110 111

    if repeat < 0:
        raise ValueError('repeat argument cannot be negative')
    pools = [tuple(pool) for pool in iterables] * repeat

    result = [[]]
    for pool in pools:
        result = [x+[y] for x in result for y in pool]

    for prod in result:
        yield tuple(prod)
```

Before `product()` runs, it completely consumes the input iterables,
keeping pools of values in memory to generate the products.  Accordingly,
it is only useful with finite inputs.

### `repeat(object[, times])`

Make an iterator that returns *object* over and over again. Runs indefinitely
unless the *times* argument is specified.

Roughly equivalent to:

```
def repeat(object, times=None):
    # repeat(10, 3) → 10 10 10
    if times is None:
        while True:
            yield object
    else:
        for i in range(times):
            yield object
```

A common use for *repeat* is to supply a stream of constant values to *map*
or *zip*:

```python

>>> list(map(pow, range(10), repeat(2)))
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

### `starmap(function, iterable)`

Make an iterator that computes the *function* using arguments obtained
from the *iterable*.  Used instead of `map()` when argument
parameters have already been "pre-zipped" into tuples.

The difference between `map()` and `starmap()` parallels the
distinction between `function(a,b)` and `function(*c)`. Roughly
equivalent to:

```
def starmap(function, iterable):
    # starmap(pow, [(2,5), (3,2), (10,3)]) → 32 9 1000
    for args in iterable:
        yield function(*args)
```

### `takewhile(predicate, iterable)`

Make an iterator that returns elements from the *iterable* as long as
the *predicate* is true.  Roughly equivalent to:

```
def takewhile(predicate, iterable):
    # takewhile(lambda x: x<5, [1,4,6,3,8]) → 1 4
    for x in iterable:
        if not predicate(x):
            break
        yield x
```

Note, the element that first fails the predicate condition is
consumed from the input iterator and there is no way to access it.
This could be an issue if an application wants to further consume the
input iterator after *takewhile* has been run to exhaustion.
To work around this problem, consider using `more-itertools before_and_after()
<https://more-itertools.readthedocs.io/en/stable/api.html#more_itertools.before_and_after>`__
instead.

### `tee(iterable, n=2)`

Return *n* independent iterators from a single iterable.

Roughly equivalent to:

```
def tee(iterable, n=2):
    if n < 0:
        raise ValueError
    if n == 0:
        return ()
    iterator = _tee(iterable)
    result = [iterator]
    for _ in range(n - 1):
        result.append(_tee(iterator))
    return tuple(result)

class _tee:

    def __init__(self, iterable):
        it = iter(iterable)
        if isinstance(it, _tee):
            self.iterator = it.iterator
            self.link = it.link
        else:
            self.iterator = it
            self.link = [None, None]

    def __iter__(self):
        return self

    def __next__(self):
        link = self.link
        if link[1] is None:
            link[0] = next(self.iterator)
            link[1] = [None, None]
        value, self.link = link
        return value
```

When the input *iterable* is already a tee iterator object, all
members of the return tuple are constructed as if they had been
produced by the upstream `tee()` call.  This "flattening step"
allows nested `tee()` calls to share the same underlying data
chain and to have a single update step rather than a chain of calls.

The flattening property makes tee iterators efficiently peekable:

```python

def lookahead(tee_iterator):
     "Return the next value without moving the input forward"
     [forked_iterator] = tee(tee_iterator, 1)
     return next(forked_iterator)
```

```python

>>> iterator = iter('abcdef')
>>> [iterator] = tee(iterator, 1)   # Make the input peekable
>>> next(iterator)                  # Move the iterator forward
'a'
>>> lookahead(iterator)             # Check next value
'b'
>>> next(iterator)                  # Continue moving forward
'b'
```

`tee` iterators are not threadsafe. A `RuntimeError` may be
raised when simultaneously using iterators returned by the same `tee()`
call, even if the original *iterable* is threadsafe.

This itertool may require significant auxiliary storage (depending on how
much temporary data needs to be stored). In general, if one iterator uses
most or all of the data before another iterator starts, it is faster to use
`list()` instead of `tee()`.

### `zip_longest(*iterables, fillvalue=None)`

Make an iterator that aggregates elements from each of the
*iterables*.

If the iterables are of uneven length, missing values are filled-in
with *fillvalue*.  If not specified, *fillvalue* defaults to `None`.

Iteration continues until the longest iterable is exhausted.

Roughly equivalent to:

```
def zip_longest(*iterables, fillvalue=None):
    # zip_longest('ABCD', 'xy', fillvalue='-') → Ax By C- D-

    iterators = list(map(iter, iterables))
    num_active = len(iterators)
    if not num_active:
        return

    while True:
        values = []
        for i, iterator in enumerate(iterators):
            try:
                value = next(iterator)
            except StopIteration:
                num_active -= 1
                if not num_active:
                    return
                iterators[i] = repeat(fillvalue)
                value = fillvalue
            values.append(value)
        yield tuple(values)
```

If one of the iterables is potentially infinite, then the `zip_longest()`
function should be wrapped with something that limits the number of calls
(for example `islice()` or `takewhile()`).
