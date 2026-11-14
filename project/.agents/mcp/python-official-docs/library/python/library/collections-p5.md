---
title: "collections --- Container datatypes (part 5 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/collections.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# collections --- Container datatypes (part 5 of 5)

## `OrderedDict` objects

Ordered dictionaries are just like regular dictionaries but have some extra
capabilities relating to ordering operations.  They have become less
important now that the built-in `dict` class gained the ability
to remember insertion order (this new behavior became guaranteed in
Python 3.7).

Some differences from `dict` still remain:

- The regular `dict` was designed to be very good at mapping
operations.  Tracking insertion order was secondary.

- The `OrderedDict` was designed to be good at reordering operations.
Space efficiency, iteration speed, and the performance of update
operations were secondary.

- The `OrderedDict` algorithm can handle frequent reordering operations
better than `dict`.  As shown in the recipes below, this makes it
suitable for implementing various kinds of LRU caches.

- The equality operation for `OrderedDict` checks for matching order.

A regular `dict` can emulate the order sensitive equality test with
`p == q and all(k1 == k2 for k1, k2 in zip(p, q))`.

- The `popitem()` method of `OrderedDict` has a different
signature.  It accepts an optional argument to specify which item is popped.

A regular `dict` can emulate OrderedDict's `od.popitem(last=True)`
with `d.popitem()` which is guaranteed to pop the rightmost (last) item.

A regular `dict` can emulate OrderedDict's `od.popitem(last=False)`
with `(k := next(iter(d)), d.pop(k))` which will return and remove the
leftmost (first) item if it exists.

- `OrderedDict` has a `move_to_end()` method to efficiently
reposition an element to an endpoint.

A regular `dict` can emulate OrderedDict's ``od.move_to_end(k,
last=True)` with `d[k] = d.pop(k)`` which will move the key and its
associated value to the rightmost (last) position.

A regular `dict` does not have an efficient equivalent for
OrderedDict's `od.move_to_end(k, last=False)` which moves the key
and its associated value to the leftmost (first) position.

- Until Python 3.8, `dict lacked a reversed__()` method.

### class `OrderedDict(**kwargs)`

```python
OrderedDict(mapping, /, **kwargs)
OrderedDict(iterable, /, **kwargs)
```

Return an instance of a `dict` subclass that has methods
specialized for rearranging dictionary order.

> *Added in version 3.1.*

### `popitem(last=True)`

The `popitem()` method for ordered dictionaries returns and removes a
(key, value) pair.  The pairs are returned in
LIFO (last-in, first-out) order if *last* is true
or FIFO (first-in, first-out) order if false.

### `move_to_end(key, last=True)`

Move an existing *key* to either end of an ordered dictionary.  The item
is moved to the right end if *last* is true (the default) or to the
beginning if *last* is false.  Raises `KeyError` if the *key* does
not exist:

```python

>>> d = OrderedDict.fromkeys('abcde')
>>> d.move_to_end('b')
>>> ''.join(d)
'acdeb'
>>> d.move_to_end('b', last=False)
>>> ''.join(d)
'bacde'
```

> *Added in version 3.2.*

In addition to the usual mapping methods, ordered dictionaries also support
reverse iteration using `reversed()`.

Equality tests between `OrderedDict` objects are order-sensitive
and are roughly equivalent to `list(od1.items())==list(od2.items())`.

Equality tests between `OrderedDict` objects and other
`Mapping` objects are order-insensitive like regular
dictionaries.  This allows `OrderedDict` objects to be substituted
anywhere a regular dictionary is used.

> *Changed in version 3.5.*
> The items, keys, and values views
> of `OrderedDict` now support reverse iteration using `reversed()`.

> *Changed in version 3.6.*
> With the acceptance of PEP 468, order is retained for keyword arguments
> passed to the `OrderedDict` constructor and its `update()`
> method.

> *Changed in version 3.9.*
> Added merge (`|`) and update (`|=`) operators, specified in PEP 584.

### `OrderedDict` Examples and Recipes

It is straightforward to create an ordered dictionary variant
that remembers the order the keys were *last* inserted.
If a new entry overwrites an existing entry, the
original insertion position is changed and moved to the end:

```
class LastUpdatedOrderedDict(OrderedDict):
    'Store items in the order that the keys were last updated.'

    def __setitem__(self, key, value):
        super().__setitem__(key, value)
        self.move_to_end(key)
```

An `OrderedDict` would also be useful for implementing
variants of functools.lru_cache:

```python

from collections import OrderedDict
from time import monotonic

class TimeBoundedLRU:
    "LRU Cache that invalidates and refreshes old entries."

    def __init__(self, func, maxsize=128, maxage=30):
        self.cache = OrderedDict()      # { args : (timestamp, result)}
        self.func = func
        self.maxsize = maxsize
        self.maxage = maxage

    def __call__(self, *args):
        if args in self.cache:
            self.cache.move_to_end(args)
            timestamp, result = self.cache[args]
            if monotonic() - timestamp <= self.maxage:
                return result
        result = self.func(*args)
        self.cache[args] = monotonic(), result
        if len(self.cache) > self.maxsize:
            self.cache.popitem(last=False)
        return result
```

```python

class MultiHitLRUCache:
    """ LRU cache that defers caching a result until
        it has been requested multiple times.

        To avoid flushing the LRU cache with one-time requests,
        we don't cache until a request has been made more than once.

    """

    def __init__(self, func, maxsize=128, maxrequests=4096, cache_after=1):
        self.requests = OrderedDict()   # { uncached_key : <example-value> }
        self.cache = OrderedDict()      # { cached_key : <example-value> }
        self.func = func
        self.maxrequests = maxrequests  # max number of uncached requests
        self.maxsize = maxsize          # max number of stored return values
        self.cache_after = cache_after

    def __call__(self, *args):
        if args in self.cache:
            self.cache.move_to_end(args)
            return self.cache[args]
        result = self.func(*args)
        self.requests[args] = self.requests.get(args, 0) + 1
        if self.requests[args] <= self.cache_after:
            self.requests.move_to_end(args)
            if len(self.requests) > self.maxrequests:
                self.requests.popitem(last=False)
        else:
            self.requests.pop(args, None)
            self.cache[args] = result
            if len(self.cache) > self.maxsize:
                self.cache.popitem(last=False)
        return result
```

```python

>>> def square(x):
...     return x * x
...
>>> f = MultiHitLRUCache(square, maxsize=4, maxrequests=6)
>>> list(map(f, range(10)))  # First requests, don't cache
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
>>> f(4)  # Cache the second request
16
>>> f(6)  # Cache the second request
36
>>> f(2)  # The first request aged out, so don't cache
4
>>> f(6)  # Cache hit
36
>>> f(4)  # Cache hit and move to front
16
>>> list(f.cache.values())
[36, 16]
>>> set(f.requests).isdisjoint(f.cache)
True
>>> list(map(f, [9, 8, 7]))   # Cache these second requests
[81, 64, 49]
>>> list(map(f, [7, 9]))  # Cache hits
[49, 81]
>>> list(f.cache.values())
[16, 64, 49, 81]
>>> set(f.requests).isdisjoint(f.cache)
True
```

## `UserDict` objects

The class, `UserDict` acts as a wrapper around dictionary objects.
The need for this class has been partially supplanted by the ability to
subclass directly from `dict`; however, this class can be easier
to work with because the underlying dictionary is accessible as an
attribute.

### class `UserDict(**kwargs)`

```python
UserDict(mapping, /, **kwargs)
UserDict(iterable, /, **kwargs)
```

Class that simulates a dictionary.  The instance's contents are kept in a
regular dictionary, which is accessible via the `data` attribute of
`UserDict` instances.  If arguments are provided, they are used to
initialize `data`, like a regular dictionary.

In addition to supporting the methods and operations of mappings,
`UserDict` instances provide the following attribute:

### `data`

A real dictionary used to store the contents of the `UserDict`
class.

`UserDict` instances also override the following method:

### `popitem`

Remove and return a `(key, value)` pair from the wrapped dictionary. Pairs are
returned in the same order as `data.popitem()`. (For the default
`dict.popitem()`, this order is LIFO (last-in, first-out).) If the
dictionary is empty, raises a `KeyError`.

## `UserList` objects

This class acts as a wrapper around list objects.  It is a useful base class
for your own list-like classes which can inherit from them and override
existing methods or add new ones.  In this way, one can add new behaviors to
lists.

The need for this class has been partially supplanted by the ability to
subclass directly from `list`; however, this class can be easier
to work with because the underlying list is accessible as an attribute.

### class `UserList([list])`

Class that simulates a list.  The instance's contents are kept in a regular
list, which is accessible via the `data` attribute of `UserList`
instances.  The instance's contents are initially set to a copy of *list*,
defaulting to the empty list `[]`.  *list* can be any iterable, for
example a real Python list or a `UserList` object.

In addition to supporting the methods and operations of mutable sequences,
`UserList` instances provide the following attribute:

### `data`

A real `list` object used to store the contents of the
`UserList` class.

**Subclassing requirements:** Subclasses of `UserList` are expected to
offer a constructor which can be called with either no arguments or one
argument.  List operations which return a new sequence attempt to create an
instance of the actual implementation class.  To do so, it assumes that the
constructor can be called with a single parameter, which is a sequence object
used as a data source.

If a derived class does not wish to comply with this requirement, all of the
special methods supported by this class will need to be overridden; please
consult the sources for information about the methods which need to be provided
in that case.

## `UserString` objects

The class, `UserString` acts as a wrapper around string objects.
The need for this class has been partially supplanted by the ability to
subclass directly from `str`; however, this class can be easier
to work with because the underlying string is accessible as an
attribute.

### class `UserString(seq)`

Class that simulates a string object.  The instance's
content is kept in a regular string object, which is accessible via the
`data` attribute of `UserString` instances.  The instance's
contents are initially set to a copy of *seq*.  The *seq* argument can
be any object which can be converted into a string using the built-in
`str()` function.

In addition to supporting the methods and operations of strings,
`UserString` instances provide the following attribute:

### `data`

A real `str` object used to store the contents of the
`UserString` class.

> *Changed in version 3.5.*
> New methods `__getnewargs__`, `__rmod__`, `casefold`,
> `format_map`, `isprintable`, and `maketrans`.
