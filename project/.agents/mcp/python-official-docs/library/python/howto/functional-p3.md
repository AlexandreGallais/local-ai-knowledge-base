---
title: "Functional Programming HOWTO (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/functional.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Functional Programming HOWTO (part 3 of 4)

## Built-in functions

Let's look in more detail at built-in functions often used with iterators.

Two of Python's built-in functions, `map()` and `filter()` duplicate the
features of generator expressions:

`map(f, iterA, iterB, ...)` returns an iterator over the sequence
`f(iterA[0], iterB[0]), f(iterA[1], iterB[1]), f(iterA[2], iterB[2]), ...`.

```python
>>> def upper(s):
...     return s.upper()
```

```python
>>> list(map(upper, ['sentence', 'fragment']))
['SENTENCE', 'FRAGMENT']
>>> [upper(s) for s in ['sentence', 'fragment']]
['SENTENCE', 'FRAGMENT']
```

You can of course achieve the same effect with a list comprehension.

`filter(predicate, iter)` returns an iterator over all the
sequence elements that meet a certain condition, and is similarly duplicated by
list comprehensions.  A **predicate** is a function that returns the truth
value of some condition; for use with `filter()`, the predicate must take a
single value.

```python
>>> def is_even(x):
...     return (x % 2) == 0
```

```python
>>> list(filter(is_even, range(10)))
[0, 2, 4, 6, 8]
```

This can also be written as a list comprehension:

```python
>>> list(x for x in range(10) if is_even(x))
[0, 2, 4, 6, 8]
```

`enumerate(iter, start=0)` counts off the elements in the
iterable returning 2-tuples containing the count (from *start*) and
each element.:

```
>>> for item in enumerate(['subject', 'verb', 'object']):
...     print(item)
(0, 'subject')
(1, 'verb')
(2, 'object')
```

`enumerate()` is often used when looping through a list and recording the
indexes at which certain conditions are met:

```
f = open('data.txt', 'r')
for i, line in enumerate(f):
    if line.strip() == '':
        print('Blank line at line #%i' % i)
```

`sorted(iterable, key=None, reverse=False)` collects all the
elements of the iterable into a list, sorts the list, and returns the sorted
result.  The *key* and *reverse* arguments are passed through to the
constructed list's `sort()` method.:

```
>>> import random
>>> # Generate 8 random numbers between [0, 10000)
>>> rand_list = random.sample(range(10000), 8)
>>> rand_list  #doctest: +SKIP
[769, 7953, 9828, 6431, 8442, 9878, 6213, 2207]
>>> sorted(rand_list)  #doctest: +SKIP
[769, 2207, 6213, 6431, 7953, 8442, 9828, 9878]
>>> sorted(rand_list, reverse=True)  #doctest: +SKIP
[9878, 9828, 8442, 7953, 6431, 6213, 2207, 769]
```

(For a more detailed discussion of sorting, see the sortinghowto.)

The `any(iter)` and `all(iter)` built-ins look at the
truth values of an iterable's contents.  `any()` returns `True` if any element
in the iterable is a true value, and `all()` returns `True` if all of the
elements are true values:

```python
>>> any([0, 1, 0])
True
>>> any([0, 0, 0])
False
>>> any([1, 1, 1])
True
>>> all([0, 1, 0])
False
>>> all([0, 0, 0])
False
>>> all([1, 1, 1])
True
```

`zip(iterA, iterB, ...)` takes one element from each iterable and
returns them in a tuple:

```
zip(['a', 'b', 'c'], (1, 2, 3)) =>
  ('a', 1), ('b', 2), ('c', 3)
```

It doesn't construct an in-memory list and exhaust all
the input iterators before returning; instead tuples are constructed and
returned only if they're requested.
(The technical term for this behaviour is `lazy evaluation
<https://en.wikipedia.org/wiki/Lazy_evaluation>`__.)

This iterator is intended to be used with iterables that are all of the same
length.  If the iterables are of different lengths, the resulting stream will be
the same length as the shortest iterable.:

```
zip(['a', 'b'], (1, 2, 3)) =>
  ('a', 1), ('b', 2)
```

You should avoid doing this, though, because an element may be taken from the
longer iterators and discarded.  This means you can't go on to use the iterators
further because you risk skipping a discarded element.

## The itertools module

The `itertools` module contains a number of commonly used iterators as well
as functions for combining several iterators.  This section will introduce the
module's contents by showing small examples.

The module's functions fall into a few broad classes:

- Functions that create a new iterator based on an existing iterator.
- Functions for treating an iterator's elements as function arguments.
- Functions for selecting portions of an iterator's output.
- A function for grouping an iterator's output.

### Creating new iterators

`itertools.count(start, step)` returns an infinite
stream of evenly spaced values.  You can optionally supply the starting number,
which defaults to 0, and the interval between numbers, which defaults to 1:

```
itertools.count() =>
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...
itertools.count(10) =>
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, ...
itertools.count(10, 5) =>
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55, ...
```

`itertools.cycle(iter)` saves a copy of the contents of
a provided iterable and returns a new iterator that returns its elements from
first to last.  The new iterator will repeat these elements infinitely.:

```
itertools.cycle([1, 2, 3, 4, 5]) =>
  1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
```

`itertools.repeat(elem, [n])` returns the provided
element *n* times, or returns the element endlessly if *n* is not provided.:

```
itertools.repeat('abc') =>
  abc, abc, abc, abc, abc, abc, abc, abc, abc, abc, ...
itertools.repeat('abc', 5) =>
  abc, abc, abc, abc, abc
```

`itertools.chain(iterA, iterB, ...)` takes an arbitrary
number of iterables as input, and returns all the elements of the first
iterator, then all the elements of the second, and so on, until all of the
iterables have been exhausted.:

```
itertools.chain(['a', 'b', 'c'], (1, 2, 3)) =>
  a, b, c, 1, 2, 3
```

`itertools.islice(iter, [start], stop, [step])` returns
a stream that's a slice of the iterator.  With a single *stop* argument, it
will return the first *stop* elements.  If you supply a starting index, you'll
get *stop-start* elements, and if you supply a value for *step*, elements
will be skipped accordingly.  Unlike Python's string and list slicing, you can't
use negative values for *start*, *stop*, or *step*.:

```
itertools.islice(range(10), 8) =>
  0, 1, 2, 3, 4, 5, 6, 7
itertools.islice(range(10), 2, 8) =>
  2, 3, 4, 5, 6, 7
itertools.islice(range(10), 2, 8, 2) =>
  2, 4, 6
```

`itertools.tee(iter, [n])` replicates an iterator; it
returns *n* independent iterators that will all return the contents of the
source iterator.
If you don't supply a value for *n*, the default is 2.  Replicating iterators
requires saving some of the contents of the source iterator, so this can consume
significant memory if the iterator is large and one of the new iterators is
consumed more than the others.:

```
itertools.tee( itertools.count() ) =>
   iterA, iterB

where iterA ->
   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...

and   iterB ->
   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...
```

### Calling functions on elements

The `operator` module contains a set of functions corresponding to Python's
operators.  Some examples are `operator.add(a, b)` (adds
two values), `operator.ne(a, b)` (same as `a != b`), and
`operator.attrgetter('id')`
(returns a callable that fetches the `.id` attribute).

`itertools.starmap(func, iter)` assumes that the
iterable will return a stream of tuples, and calls *func* using these tuples as
the arguments:

```
itertools.starmap(os.path.join,
                  [('/bin', 'python'), ('/usr', 'bin', 'java'),
                   ('/usr', 'bin', 'perl'), ('/usr', 'bin', 'ruby')])
=>
  /bin/python, /usr/bin/java, /usr/bin/perl, /usr/bin/ruby
```

### Selecting elements

Another group of functions chooses a subset of an iterator's elements based on a
predicate.

`itertools.filterfalse(predicate, iter)` is the
opposite of `filter()`, returning all elements for which the predicate
returns false:

```
itertools.filterfalse(is_even, itertools.count()) =>
  1, 3, 5, 7, 9, 11, 13, 15, ...
```

`itertools.takewhile(predicate, iter)` returns
elements for as long as the predicate returns true.  Once the predicate returns
false, the iterator will signal the end of its results.:

```
def less_than_10(x):
    return x < 10

itertools.takewhile(less_than_10, itertools.count()) =>
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9

itertools.takewhile(is_even, itertools.count()) =>
  0
```

`itertools.dropwhile(predicate, iter)` discards
elements while the predicate returns true, and then returns the rest of the
iterable's results.:

```
itertools.dropwhile(less_than_10, itertools.count()) =>
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, ...

itertools.dropwhile(is_even, itertools.count()) =>
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...
```

`itertools.compress(data, selectors)` takes two
iterators and returns only those elements of *data* for which the corresponding
element of *selectors* is true, stopping whenever either one is exhausted:

```
itertools.compress([1, 2, 3, 4, 5], [True, True, False, False, True]) =>
   1, 2, 5
```

### Combinatoric functions

The `itertools.combinations(iterable, r)`
returns an iterator giving all possible *r*-tuple combinations of the
elements contained in *iterable*.:

```
itertools.combinations([1, 2, 3, 4, 5], 2) =>
  (1, 2), (1, 3), (1, 4), (1, 5),
  (2, 3), (2, 4), (2, 5),
  (3, 4), (3, 5),
  (4, 5)

itertools.combinations([1, 2, 3, 4, 5], 3) =>
  (1, 2, 3), (1, 2, 4), (1, 2, 5), (1, 3, 4), (1, 3, 5), (1, 4, 5),
  (2, 3, 4), (2, 3, 5), (2, 4, 5),
  (3, 4, 5)
```

The elements within each tuple remain in the same order as
*iterable* returned them.  For example, the number 1 is always before
2, 3, 4, or 5 in the examples above.  A similar function,
`itertools.permutations(iterable, r=None)`,
removes this constraint on the order, returning all possible
arrangements of length *r*:

```
itertools.permutations([1, 2, 3, 4, 5], 2) =>
  (1, 2), (1, 3), (1, 4), (1, 5),
  (2, 1), (2, 3), (2, 4), (2, 5),
  (3, 1), (3, 2), (3, 4), (3, 5),
  (4, 1), (4, 2), (4, 3), (4, 5),
  (5, 1), (5, 2), (5, 3), (5, 4)

itertools.permutations([1, 2, 3, 4, 5]) =>
  (1, 2, 3, 4, 5), (1, 2, 3, 5, 4), (1, 2, 4, 3, 5),
  ...
  (5, 4, 3, 2, 1)
```

If you don't supply a value for *r* the length of the iterable is used,
meaning that all the elements are permuted.

Note that these functions produce all of the possible combinations by
position and don't require that the contents of *iterable* are unique:

```
itertools.permutations('aba', 3) =>
  ('a', 'b', 'a'), ('a', 'a', 'b'), ('b', 'a', 'a'),
  ('b', 'a', 'a'), ('a', 'a', 'b'), ('a', 'b', 'a')
```

The identical tuple `('a', 'a', 'b')` occurs twice, but the two 'a'
strings came from different positions.

The `itertools.combinations_with_replacement(iterable, r)`
function relaxes a different constraint: elements can be repeated
within a single tuple.  Conceptually an element is selected for the
first position of each tuple and then is replaced before the second
element is selected.:

```
itertools.combinations_with_replacement([1, 2, 3, 4, 5], 2) =>
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
  (2, 2), (2, 3), (2, 4), (2, 5),
  (3, 3), (3, 4), (3, 5),
  (4, 4), (4, 5),
  (5, 5)
```

### Grouping elements

The last function I'll discuss, :func:`itertools.groupby(iter, key_func=None)
<itertools.groupby>`, is the most complicated.  `key_func(elem)` is a function
that can compute a key value for each element returned by the iterable.  If you
don't supply a key <example-value>, the key is simply each element itself.

`groupby()` collects all the consecutive elements from the
underlying iterable that have the same key value, and returns a stream of
2-tuples containing a key value and an iterator for the elements with that key.

```
city_list = [('Decatur', 'AL'), ('Huntsville', 'AL'), ('Selma', 'AL'),
             ('Anchorage', 'AK'), ('Nome', 'AK'),
             ('Flagstaff', 'AZ'), ('Phoenix', 'AZ'), ('Tucson', 'AZ'),
             ...
            ]

def get_state(city_state):
    return city_state[1]

itertools.groupby(city_list, get_state) =>
  ('AL', iterator-1),
  ('AK', iterator-2),
  ('AZ', iterator-3), ...

where
iterator-1 =>
  ('Decatur', 'AL'), ('Huntsville', 'AL'), ('Selma', 'AL')
iterator-2 =>
  ('Anchorage', 'AK'), ('Nome', 'AK')
iterator-3 =>
  ('Flagstaff', 'AZ'), ('Phoenix', 'AZ'), ('Tucson', 'AZ')
```

`groupby()` assumes that the underlying iterable's contents will
already be sorted based on the key.  Note that the returned iterators also use
the underlying iterable, so you have to consume the results of iterator-1 before
requesting iterator-2 and its corresponding key.
