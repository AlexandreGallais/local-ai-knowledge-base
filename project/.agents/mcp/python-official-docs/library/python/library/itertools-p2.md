---
title: "itertools --- Functions creating iterators for efficient looping (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/itertools.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# itertools --- Functions creating iterators for efficient looping (part 2 of 6)

## Itertool Functions

The following functions all construct and return iterators. Some provide
streams of infinite length, so they should only be accessed by functions or
loops that truncate the stream.

### `accumulate(iterable[, function, *, initial=None])`

Make an iterator that returns accumulated sums or accumulated
results from other binary functions.

The *function* defaults to addition.  The *function* should accept
two arguments, an accumulated total and a value from the *iterable*.

If an *initial* value is provided, the accumulation will start with
that value and the output will have one more element than the input
iterable.

Roughly equivalent to:

```
def accumulate(iterable, function=operator.add, *, initial=None):
    'Return running totals'
    # accumulate([1,2,3,4,5]) → 1 3 6 10 15
    # accumulate([1,2,3,4,5], initial=100) → 100 101 103 106 110 115
    # accumulate([1,2,3,4,5], operator.mul) → 1 2 6 24 120

    iterator = iter(iterable)
    total = initial
    if initial is None:
        try:
            total = next(iterator)
        except StopIteration:
            return

    yield total
    for element in iterator:
        total = function(total, element)
        yield total
```

To compute a running minimum, set *function* to `min()`.
For a running maximum, set *function* to `max()`.
Or for a running product, set *function* to `operator.mul()`.
To build an `amortization table
<https://www.ramseysolutions.com/real-estate/amortization-schedule>`_,
accumulate the interest and apply payments:

```python

>>> data = [3, 4, 6, 2, 1, 9, 0, 7, 5, 8]
>>> list(accumulate(data, max))              # running maximum
[3, 4, 6, 6, 6, 9, 9, 9, 9, 9]
>>> list(accumulate(data, operator.mul))     # running product
[3, 12, 72, 144, 144, 1296, 0, 0, 0, 0]

# Amortize a 5% loan of 1000 with 10 annual payments of 90
>>> update = lambda balance, payment: round(balance * 1.05) - payment
>>> list(accumulate(repeat(90, 10), update, initial=1_000))
[1000, 960, 918, 874, 828, 779, 728, 674, 618, 559, 497]
```

See `functools.reduce()` for a similar function that returns only the
final accumulated value.

> *Added in version 3.2.*

> *Changed in version 3.3.*
> Added the optional *function* parameter.

> *Changed in version 3.8.*
> Added the optional *initial* parameter.

### `batched(iterable, n, *, strict=False)`

Batch data from the *iterable* into tuples of length *n*. The last
batch may be shorter than *n*.

If *strict* is true, will raise a `ValueError` if the final
batch is shorter than *n*.

Loops over the input iterable and accumulates data into tuples up to
size *n*.  The input is consumed lazily, just enough to fill a batch.
The result is yielded as soon as the batch is full or when the input
iterable is exhausted:

```python

>>> flattened_data = ['roses', 'red', 'violets', 'blue', 'sugar', 'sweet']
>>> unflattened = list(batched(flattened_data, 2))
>>> unflattened
[('roses', 'red'), ('violets', 'blue'), ('sugar', 'sweet')]
```

Roughly equivalent to:

```
def batched(iterable, n, *, strict=False):
    # batched('ABCDEFG', 3) → ABC DEF G
    if n < 1:
        raise ValueError('n must be at least one')
    iterator = iter(iterable)
    while batch := tuple(islice(iterator, n)):
        if strict and len(batch) != n:
            raise ValueError('batched(): incomplete batch')
        yield batch
```

> *Added in version 3.12.*

> *Changed in version 3.13.*
> Added the *strict* option.

### `chain(*iterables)`

Make an iterator that returns elements from the first iterable until
it is exhausted, then proceeds to the next iterable, until all of the
iterables are exhausted.  This combines multiple data sources into a
single iterator.  Roughly equivalent to:

```
def chain(*iterables):
    # chain('ABC', 'DEF') → A B C D E F
    for iterable in iterables:
        yield from iterable
```

Note that unpacking in comprehensions
provides similar functionality so that `list(chain(p, q))` could be
written as `[*s for s in (p, q)]`.

### classmethod `chain.from_iterable(iterable)`

Alternate constructor for `chain()`.  Gets chained inputs from a
single iterable argument that is evaluated lazily.  Roughly equivalent to:

```
def from_iterable(iterables):
    # chain.from_iterable(['ABC', 'DEF']) → A B C D E F
    for iterable in iterables:
        yield from iterable
```

Note that unpacking in comprehensions
provides similar functionality so that `list(chain.from_iterable(iterables))`
could be written as `[*s for s in iterables]`.

### `combinations(iterable, r)`

Return *r* length subsequences of elements from the input *iterable*.

The output is a subsequence of `product()` keeping only entries that
are subsequences of the *iterable*.  The length of the output is given
by `math.comb()` which computes `n! / r! / (n - r)!` when ``0 ≤ r
≤ n` or zero when `r > n``.

The combination tuples are emitted in lexicographic order according to
the order of the input *iterable*. If the input *iterable* is sorted,
the output tuples will be produced in sorted order.

Elements are treated as unique based on their position, not on their
value.  If the input elements are unique, there will be no repeated
values within each combination.

Roughly equivalent to:

```
def combinations(iterable, r):
    # combinations('ABCD', 2) → AB AC AD BC BD CD
    # combinations(range(4), 3) → 012 013 023 123

    pool = tuple(iterable)
    n = len(pool)
    if r > n:
        return
    indices = list(range(r))

    yield tuple(pool[i] for i in indices)
    while True:
        for i in reversed(range(r)):
            if indices[i] != i + n - r:
                break
        else:
            return
        indices[i] += 1
        for j in range(i+1, r):
            indices[j] = indices[j-1] + 1
        yield tuple(pool[i] for i in indices)
```

### `combinations_with_replacement(iterable, r)`

Return *r* length subsequences of elements from the input *iterable*
allowing individual elements to be repeated more than once.

The output is a subsequence of `product()` that keeps only entries
that are subsequences (with possible repeated elements) of the
*iterable*.  The number of subsequence returned is ``(n + r - 1)! / r! /
(n - 1)!` when `n > 0``.

The combination tuples are emitted in lexicographic order according to
the order of the input *iterable*. if the input *iterable* is sorted,
the output tuples will be produced in sorted order.

Elements are treated as unique based on their position, not on their
value.  If the input elements are unique, the generated combinations
will also be unique.

Roughly equivalent to:

```
def combinations_with_replacement(iterable, r):
    # combinations_with_replacement('ABC', 2) → AA AB AC BB BC CC

    pool = tuple(iterable)
    n = len(pool)
    if not n and r:
        return
    indices = [0] * r

    yield tuple(pool[i] for i in indices)
    while True:
        for i in reversed(range(r)):
            if indices[i] != n - 1:
                break
        else:
            return
        indices[i:] = [indices[i] + 1] * (r - i)
        yield tuple(pool[i] for i in indices)
```

> *Added in version 3.1.*

### `compress(data, selectors)`

Make an iterator that returns elements from *data* where the
corresponding element in *selectors* is true.  Stops when either the
*data* or *selectors* iterables have been exhausted.  Roughly
equivalent to:

```
def compress(data, selectors):
    # compress('ABCDEF', [1,0,1,0,1,1]) → A C E F
    return (datum for datum, selector in zip(data, selectors) if selector)
```

> *Added in version 3.1.*

### `count(start=0, step=1)`

Make an iterator that returns evenly spaced values beginning with
*start*. Can be used with `map()` to generate consecutive data
points or with `zip()` to add sequence numbers.  Roughly
equivalent to:

```
def count(start=0, step=1):
    # count(10) → 10 11 12 13 14 ...
    # count(2.5, 0.5) → 2.5 3.0 3.5 ...
    n = start
    while True:
        yield n
        n += step
```

When counting with floating-point numbers, better accuracy can sometimes be
achieved by substituting multiplicative code such as: ``(start + step * i
for i in count())``.

> *Changed in version 3.1.*
> Added *step* argument and allowed non-integer arguments.

### `cycle(iterable)`

Make an iterator returning elements from the *iterable* and saving a
copy of each.  When the iterable is exhausted, return elements from
the saved copy.  Repeats indefinitely.  Roughly equivalent to:

```
def cycle(iterable):
    # cycle('ABCD') → A B C D A B C D A B C D ...

    saved = []
    for element in iterable:
        yield element
        saved.append(element)

    while saved:
        for element in saved:
            yield element
```

This itertool may require significant auxiliary storage (depending on
the length of the iterable).

### `dropwhile(predicate, iterable)`

Make an iterator that drops elements from the *iterable* while the
*predicate* is true and afterwards returns every element.  Roughly
equivalent to:

```
def dropwhile(predicate, iterable):
    # dropwhile(lambda x: x<5, [1,4,6,3,8]) → 6 3 8

    iterator = iter(iterable)
    for x in iterator:
        if not predicate(x):
            yield x
            break

    for x in iterator:
        yield x
```

Note this does not produce *any* output until the predicate first
becomes false, so this itertool may have a lengthy start-up time.

### `filterfalse(predicate, iterable)`

Make an iterator that filters elements from the *iterable* returning
only those for which the *predicate* returns a false value.  If
*predicate* is `None`, returns the items that are false.  Roughly
equivalent to:

```
def filterfalse(predicate, iterable):
    # filterfalse(lambda x: x<5, [1,4,6,3,8]) → 6 8

    if predicate is None:
        predicate = bool

    for x in iterable:
        if not predicate(x):
            yield x
```

### `groupby(iterable, key=None)`

Make an iterator that returns consecutive keys and groups from the *iterable*.
The *key* is a function computing a key value for each element.  If not
specified or is `None`, *key* defaults to an identity function and returns
the element unchanged.  Generally, the iterable needs to already be sorted on
the same key function.

The operation of `groupby()` is similar to the `uniq` filter in Unix.  It
generates a break or new group every time the value of the key <example-value> changes
(which is why it is usually necessary to have sorted the data using the same key
function).  That behavior differs from SQL's GROUP BY which aggregates common
elements regardless of their input order.

The returned group is itself an iterator that shares the underlying iterable
with `groupby()`.  Because the source is shared, when the `groupby()`
object is advanced, the previous group is no longer visible.  So, if that data
is needed later, it should be stored as a list:

```
groups = []
uniquekeys = []
data = sorted(data, key=<example-value>)
for k, g in groupby(data, keyfunc):
    groups.append(list(g))      # Store group iterator as a list
    uniquekeys.append(k)
```

`groupby()` is roughly equivalent to:

```
def groupby(iterable, key=None):
    # [k for k, g in groupby('AAAABBBCCDAABBB')] → A B C D A B
    # [list(g) for k, g in groupby('AAAABBBCCD')] → AAAA BBB CC D

    keyfunc = (lambda x: x) if key is None else key
    iterator = iter(iterable)
    exhausted = False

    def _grouper(target_key):
        nonlocal curr_value, curr_key, exhausted
        yield curr_value
        for curr_value in iterator:
            curr_key = keyfunc(curr_value)
            if curr_key != target_key:
                return
            yield curr_value
        exhausted = True

    try:
        curr_value = next(iterator)
    except StopIteration:
        return
    curr_key = keyfunc(curr_value)

    while not exhausted:
        target_key = <example-value>
        curr_group = _grouper(target_key)
        yield curr_key, curr_group
        if curr_key == target_key:
            for _ in curr_group:
                pass
```

### `islice(iterable, stop)`

```python
islice(iterable, start, stop[, step])
```

Make an iterator that returns selected elements from the iterable.
Works like sequence slicing but does not support negative values for
*start*, *stop*, or *step*.

If *start* is zero or `None`, iteration starts at zero.  Otherwise,
elements from the iterable are skipped until *start* is reached.

If *stop* is `None`, iteration continues until the input is
exhausted, if at all.  Otherwise, it stops at the specified position.

If *step* is `None`, the step defaults to one.  Elements are returned
consecutively unless *step* is set higher than one which results in
items being skipped.

Roughly equivalent to:

```
def islice(iterable, *args):
    # islice('ABCDEFG', 2) → A B
    # islice('ABCDEFG', 2, 4) → C D
    # islice('ABCDEFG', 2, None) → C D E F G
    # islice('ABCDEFG', 0, None, 2) → A C E G

    s = slice(*args)
    start = 0 if s.start is None else s.start
    stop = s.stop
    step = 1 if s.step is None else s.step
    if start < 0 or (stop is not None and stop < 0) or step <= 0:
        raise ValueError

    indices = count() if stop is None else range(max(start, stop))
    next_i = start
    for i, element in zip(indices, iterable):
        if i == next_i:
            yield element
            next_i += step
```

If the input is an iterator, then fully consuming the *islice*
advances the input iterator by `max(start, stop)` steps regardless
of the *step* value.

### `pairwise(iterable)`

Return successive overlapping pairs taken from the input *iterable*.

The number of 2-tuples in the output iterator will be one fewer than the
number of inputs.  It will be empty if the input iterable has fewer than
two values.

Roughly equivalent to:

```
def pairwise(iterable):
    # pairwise('ABCDEFG') → AB BC CD DE EF FG

    iterator = iter(iterable)
    a = next(iterator, None)

    for b in iterator:
        yield a, b
        a = b
```

> *Added in version 3.10.*
