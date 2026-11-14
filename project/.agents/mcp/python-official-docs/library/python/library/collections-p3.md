---
title: "collections --- Container datatypes (part 3 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/collections.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# collections --- Container datatypes (part 3 of 5)

## `deque` objects

### class `deque([iterable, [maxlen]])`

Returns a new deque object initialized left-to-right (using `append()`) with
data from *iterable*.  If *iterable* is not specified, the new deque is empty.

Deques are a generalization of stacks and queues (the name is pronounced "deck"
and is short for "double-ended queue").  Deques support thread-safe, memory
efficient appends and pops from either side of the deque with approximately the
same *O*(1) performance in either direction.

Though `list` objects support similar operations, they are optimized for
fast fixed-length operations and incur *O*(*n*) memory movement costs for
`pop(0)` and `insert(0, v)` operations which change both the size and
position of the underlying data representation.

If *maxlen* is not specified or is `None`, deques may grow to an
arbitrary length.  Otherwise, the deque is bounded to the specified maximum
length.  Once a bounded length deque is full, when new items are added, a
corresponding number of items are discarded from the opposite end.  Bounded
length deques provide functionality similar to the `tail` filter in
Unix. They are also useful for tracking transactions and other pools of data
where only the most recent activity is of interest.

Deques are generic over the type of their contents.

Deque objects support the following methods:

### `append(item, /)`

Add *item* to the right side of the deque.

### `appendleft(item, /)`

Add *item* to the left side of the deque.

### `clear()`

Remove all elements from the deque leaving it with length 0.

### `copy()`

Create a shallow copy of the deque.

> *Added in version 3.5.*

### `count(value, /)`

Count the number of deque elements equal to *value*.

> *Added in version 3.2.*

### `extend(iterable, /)`

Extend the right side of the deque by appending elements from the iterable
argument.

### `extendleft(iterable, /)`

Extend the left side of the deque by appending elements from *iterable*.
Note, the series of left appends results in reversing the order of
elements in the iterable argument.

### `index(value[, start[, stop]])`

Return the position of *value* in the deque (at or after index *start*
and before index *stop*).  Returns the first match or raises
`ValueError` if not found.

> *Added in version 3.5.*

### `insert(index, value, /)`

Insert *value* into the deque at position *index*.

If the insertion would cause a bounded deque to grow beyond *maxlen*,
an `IndexError` is raised.

> *Added in version 3.5.*

### `pop()`

Remove and return an element from the right side of the deque. If no
elements are present, raises an `IndexError`.

### `popleft()`

Remove and return an element from the left side of the deque. If no
elements are present, raises an `IndexError`.

### `remove(value, /)`

Remove the first occurrence of *value*.  If not found, raises a
`ValueError`.

### `reverse()`

Reverse the elements of the deque in-place and then return `None`.

> *Added in version 3.2.*

### `rotate(n=1, /)`

Rotate the deque *n* steps to the right.  If *n* is negative, rotate
to the left.

When the deque is not empty, rotating one step to the right is equivalent
to `d.appendleft(d.pop())`, and rotating one step to the left is
equivalent to `d.append(d.popleft())`.

Deque objects also provide one read-only attribute:

### `maxlen`

Maximum size of a deque or `None` if unbounded.

> *Added in version 3.1.*

In addition to the above, deques support iteration, pickling, `len(d)`,
`reversed(d)`, `copy.copy(d)`, `copy.deepcopy(d)`, membership testing with
the `in` operator, and subscript references such as `d[0]` to access
the first element.  Indexed access is *O*(1) at both ends but slows to *O*(*n*) in
the middle.  For fast random access, use lists instead.

Starting in version 3.5, deques support `__add__()`, `__mul__()`,
and `__imul__()`.

Example:

```python

>>> from collections import deque
>>> d = deque('ghi')                 # make a new deque with three items
>>> for elem in d:                   # iterate over the deque's elements
...     print(elem.upper())
G
H
I

>>> d.append('j')                    # add a new entry to the right side
>>> d.appendleft('f')                # add a new entry to the left side
>>> d                                # show the representation of the deque
deque(['f', 'g', 'h', 'i', 'j'])

>>> d.pop()                          # return and remove the rightmost item
'j'
>>> d.popleft()                      # return and remove the leftmost item
'f'
>>> list(d)                          # list the contents of the deque
['g', 'h', 'i']
>>> d[0]                             # peek at leftmost item
'g'
>>> d[-1]                            # peek at rightmost item
'i'

>>> list(reversed(d))                # list the contents of a deque in reverse
['i', 'h', 'g']
>>> 'h' in d                         # search the deque
True
>>> d.extend('jkl')                  # add multiple elements at once
>>> d
deque(['g', 'h', 'i', 'j', 'k', 'l'])
>>> d.rotate(1)                      # right rotation
>>> d
deque(['l', 'g', 'h', 'i', 'j', 'k'])
>>> d.rotate(-1)                     # left rotation
>>> d
deque(['g', 'h', 'i', 'j', 'k', 'l'])

>>> deque(reversed(d))               # make a new deque in reverse order
deque(['l', 'k', 'j', 'i', 'h', 'g'])
>>> d.clear()                        # empty the deque
>>> d.pop()                          # cannot pop from an empty deque
Traceback (most recent call last):
    File "<pyshell#6>", line 1, in -toplevel-
        d.pop()
IndexError: pop from an empty deque

>>> d.extendleft('abc')              # extendleft() reverses the input order
>>> d
deque(['c', 'b', 'a'])
```

### `deque` Recipes

This section shows various approaches to working with deques.

Bounded length deques provide functionality similar to the `tail` filter
in Unix:

```
def tail(filename, n=10):
    'Return the last n lines of a file'
    with open(filename) as f:
        return deque(f, n)
```

Another approach to using deques is to maintain a sequence of recently
added elements by appending to the right and popping to the left:

```
def moving_average(iterable, n=3):
    # moving_average([40, 30, 50, 46, 39, 44]) --> 40.0 42.0 45.0 43.0
    # https://en.wikipedia.org/wiki/Moving_average
    it = iter(iterable)
    d = deque(itertools.islice(it, n-1))
    d.appendleft(0)
    s = sum(d)
    for elem in it:
        s += elem - d.popleft()
        d.append(elem)
        yield s / n
```

A `round-robin scheduler
<https://en.wikipedia.org/wiki/Round-robin_scheduling>`_ can be implemented with
input iterators stored in a `deque`.  Values are yielded from the active
iterator in position zero.  If that iterator is exhausted, it can be removed
with `popleft()`; otherwise, it can be cycled back to the end with
the `rotate()` method:

```
def roundrobin(*iterables):
    "roundrobin('ABC', 'D', 'EF') --> A D E B F C"
    iterators = deque(map(iter, iterables))
    while iterators:
        try:
            while True:
                yield next(iterators[0])
                iterators.rotate(-1)
        except StopIteration:
            # Remove an exhausted iterator.
            iterators.popleft()
```

The `rotate()` method provides a way to implement `deque` slicing and
deletion.  For example, a pure Python implementation of `del d[n]` relies on
the `rotate()` method to position elements to be popped:

```
def delete_nth(d, n):
    d.rotate(-n)
    d.popleft()
    d.rotate(n)
```

To implement `deque` slicing, use a similar approach applying
`rotate()` to bring a target element to the left side of the deque. Remove
old entries with `popleft()`, add new entries with `extend()`, and then
reverse the rotation.
With minor variations on that approach, it is easy to implement Forth style
stack manipulations such as `dup`, `drop`, `swap`, `over`, `pick`,
`rot`, and `roll`.

## `defaultdict` objects

### class `defaultdict(default_factory=None, /, **kwargs)`

```python
defaultdict(default_factory, mapping, /, **kwargs)
defaultdict(default_factory, iterable, /, **kwargs)
```

Return a new dictionary-like object.  `defaultdict` is a subclass of the
built-in `dict` class.  It overrides one method and adds one writable
instance variable.  The remaining functionality is the same as for the
`dict` class and is not documented here.

The first argument provides the initial value for the `default_factory`
attribute; it defaults to `None`. All remaining arguments are treated the same
as if they were passed to the `dict` constructor, including keyword
arguments.

`defaultdict`\s are generic over two types,
signifying (respectively) the types of the dictionary's keys and values.

`defaultdict` objects support the following method in addition to the
standard `dict` operations:

### `__missing__(key, /)`

If the `default_factory` attribute is `None`, this raises a
`KeyError` exception with the *key* as argument.

If `default_factory` is not `None`, it is called without arguments
to provide a default value for the given *key*, this value is inserted in
the dictionary for the *key*, and returned.

If calling `default_factory` raises an exception this exception is
propagated unchanged.

This method is called by the `__getitem__()` method of the
`dict` class when the requested key is not found; whatever it
returns or raises is then returned or raised by `__getitem__()`.

Note that `__missing__()` is *not* called for any operations besides
`__getitem__()`. This means that `get()` will, like
normal dictionaries, return `None` as a default rather than using
`default_factory`.

`defaultdict` objects support the following instance variable:

### `default_factory`

This attribute is used by the `__missing__()` method;
it is initialized from the first argument to the constructor, if present,
or to `None`, if absent.

> *Changed in version 3.9.*
> Added merge (`|`) and update (`|=`) operators, specified in
> PEP 584.

### `defaultdict` Examples

Using `list` as the `default_factory`, it is easy to group a
sequence of key-value pairs into a dictionary of lists:

```python
>>> s = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]
>>> d = defaultdict(list)
>>> for k, v in s:
...     d[k].append(v)
...
>>> sorted(d.items())
[('blue', [2, 4]), ('red', [1]), ('yellow', [1, 3])]
```

When each key is encountered for the first time, it is not already in the
mapping; so an entry is automatically created using the `default_factory`
function which returns an empty `list`.  The `list.append()`
operation then attaches the value to the new list.  When keys are encountered
again, the look-up proceeds normally (returning the list for that key) and the
`list.append()` operation adds another value to the list. This technique is
simpler and faster than an equivalent technique using `dict.setdefault()`:

```python
>>> d = {}
>>> for k, v in s:
...     d.setdefault(k, []).append(v)
...
>>> sorted(d.items())
[('blue', [2, 4]), ('red', [1]), ('yellow', [1, 3])]
```

Setting the `default_factory` to `int` makes the
`defaultdict` useful for counting (like a bag or multiset in other
languages):

```python
>>> s = 'mississippi'
>>> d = defaultdict(int)
>>> for k in s:
...     d[k] += 1
...
>>> sorted(d.items())
[('i', 4), ('m', 1), ('p', 2), ('s', 4)]
```

When a letter is first encountered, it is missing from the mapping, so the
`default_factory` function calls `int()` to supply a default count of
zero.  The increment operation then builds up the count for each letter.

The function `int()` which always returns zero is just a special case of
constant functions.  A faster and more flexible way to create constant functions
is to use a lambda function which can supply any constant value (not just
zero):

```python
>>> def constant_factory(value):
...     return lambda: value
...
>>> d = defaultdict(constant_factory('<missing>'))
>>> d.update(name='John', action='ran')
>>> '%(name)s %(action)s to %(object)s' % d
'John ran to <missing>'
```

Setting the `default_factory` to `set` makes the
`defaultdict` useful for building a dictionary of sets:

```python
>>> s = [('red', 1), ('blue', 2), ('red', 3), ('blue', 4), ('red', 1), ('blue', 4)]
>>> d = defaultdict(set)
>>> for k, v in s:
...     d[k].add(v)
...
>>> sorted(d.items())
[('blue', {2, 4}), ('red', {1, 3})]
```
