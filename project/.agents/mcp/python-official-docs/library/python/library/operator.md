---
title: "operator --- Standard operators as functions (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/operator.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `operator` --- Standard operators as functions

Module `operator`.

**Source code:** Lib/operator.py

The `operator` module exports a set of efficient functions corresponding to
the intrinsic operators of Python.  For example, `operator.add(x, y)` is
equivalent to the expression `x+y`. Many function names are those used for
special methods, without the double underscores.  For backward compatibility,
many of these have a variant with the double underscores kept. The variants
without the double underscores are preferred for clarity.

The functions fall into categories that perform object comparisons, logical
operations, mathematical operations and sequence operations.

The object comparison functions are useful for all objects, and are named after
the rich comparison operators they support:

### `lt(a, b)`

```python
le(a, b)
eq(a, b)
ne(a, b)
ge(a, b)
gt(a, b)
__lt__(a, b)
__le__(a, b)
__eq__(a, b)
__ne__(a, b)
__ge__(a, b)
__gt__(a, b)
```

Perform "rich comparisons" between *a* and *b*. Specifically, `lt(a, b)` is
equivalent to `a < b`, `le(a, b)` is equivalent to `a <= b`, ``eq(a,
b)` is equivalent to `a == b`, `ne(a, b)` is equivalent to `a != b``,
`gt(a, b)` is equivalent to `a > b` and `ge(a, b)` is equivalent to ``a
>= b``.  Note that these functions can return any value, which may
or may not be interpretable as a Boolean value.  See
comparisons for more information about rich comparisons.

The logical operations are also generally applicable to all objects, and support
truth tests, identity tests, and boolean operations:

### `not_(obj)`

```python
__not__(obj)
```

Return the outcome of `not` *obj*.  (Note that there is no
`__not__()` method for object instances; only the interpreter core defines
this operation.  The result is affected by the `__bool__()` and
`__len__()` methods.)

### `truth(obj)`

Return `True` if *obj* is true, and `False` otherwise.  This is
equivalent to using the `bool` constructor.

### `is_(a, b)`

Return `a is b`.  Tests object identity.

### `is_not(a, b)`

Return `a is not b`.  Tests object identity.

### `is_none(a)`

Return `a is None`.  Tests object identity.

> *Added in version 3.14.*

### `is_not_none(a)`

Return `a is not None`.  Tests object identity.

> *Added in version 3.14.*

The mathematical and bitwise operations are the most numerous:

### `abs(obj)`

```python
__abs__(obj)
```

Return the absolute value of *obj*.

### `add(a, b)`

```python
__add__(a, b)
```

Return `a + b`, for *a* and *b* numbers.

### `and_(a, b)`

```python
__and__(a, b)
```

Return `a & b`.

### `floordiv(a, b)`

```python
__floordiv__(a, b)
```

Return `a // b`.

### `index(a)`

```python
__index__(a)
```

Return *a* converted to an integer.  Equivalent to `a.__index__()`.

> *Changed in version 3.10.*
> The result always has exact type `int`.  Previously, the result
> could have been an instance of a subclass of `int`.

### `inv(obj)`

```python
invert(obj)
__inv__(obj)
__invert__(obj)
```

Return `~obj`.

### `lshift(a, b)`

```python
__lshift__(a, b)
```

Return `a << b`.

### `mod(a, b)`

```python
__mod__(a, b)
```

Return `a % b`.

### `mul(a, b)`

```python
__mul__(a, b)
```

Return `a * b`.

### `matmul(a, b)`

```python
__matmul__(a, b)
```

Return `a @ b`.

> *Added in version 3.5.*

### `neg(obj)`

```python
__neg__(obj)
```

Return *obj* negated (`-obj`).

### `or_(a, b)`

```python
__or__(a, b)
```

Return `a | b`.

### `pos(obj)`

```python
__pos__(obj)
```

Return `+obj`.

### `pow(a, b)`

```python
__pow__(a, b)
```

Return `a ** b`.

### `rshift(a, b)`

```python
__rshift__(a, b)
```

Return `a >> b`.

### `sub(a, b)`

```python
__sub__(a, b)
```

Return `a - b`.

### `truediv(a, b)`

```python
__truediv__(a, b)
```

Return `a / b` where 2/3 is .66 rather than 0.  This is also known as
"true" division.

### `xor(a, b)`

```python
__xor__(a, b)
```

Return `a ^ b`.

Operations which work with sequences (some of them with mappings too) include:

### `concat(a, b)`

```python
__concat__(a, b)
```

Return `a + b` for *a* and *b* sequences.

### `contains(a, b)`

```python
__contains__(a, b)
```

Return the outcome of the test `b in a`. Note the reversed operands.

### `countOf(a, b)`

Return the number of occurrences of *b* in *a*.

### `delitem(a, b)`

```python
__delitem__(a, b)
```

Remove the value of *a* at index *b*.

### `getitem(a, b)`

```python
__getitem__(a, b)
```

Return the value of *a* at index *b*.

### `indexOf(a, b)`

Return the index of the first of occurrence of *b* in *a*.

### `setitem(a, b, c)`

```python
__setitem__(a, b, c)
```

Set the value of *a* at index *b* to *c*.

### `length_hint(obj, default=0)`

Return an estimated length for the object *obj*. First try to return its
actual length, then an estimate using `object.__length_hint__()`, and
finally return the default value.

> *Added in version 3.4.*

The following operation works with callables:

### `call(obj, /, *args, **kwargs)`

```python
__call__(obj, /, *args, **kwargs)
```

Return `obj(*args, **kwargs)`.

> *Added in version 3.11.*

The `operator` module also defines tools for generalized attribute and item
lookups.  These are useful for making fast field extractors as arguments for
`map()`, `sorted()`, `itertools.groupby()`, or other functions that
expect a function argument.

### `attrgetter(attr)`

```python
attrgetter(*attrs)
```

Return a callable object that fetches *attr* from its operand.
If more than one attribute is requested, returns a tuple of attributes.
The attribute names can also contain dots. For example:

- After `f = attrgetter('name')`, the call `f(b)` returns `b.name`.

- After `f = attrgetter('name', 'date')`, the call `f(b)` returns
`(b.name, b.date)`.

- After `f = attrgetter('name.first', 'name.last')`, the call `f(b)`
returns `(b.name.first, b.name.last)`.

Equivalent to:

```
def attrgetter(*items):
    if any(not isinstance(item, str) for item in items):
        raise TypeError('attribute name must be a string')
    if len(items) == 1:
        attr = items[0]
        def g(obj):
            return resolve_attr(obj, attr)
    else:
        def g(obj):
            return tuple(resolve_attr(obj, attr) for attr in items)
    return g

def resolve_attr(obj, attr):
    for name in attr.split("."):
        obj = getattr(obj, name)
    return obj
```

### `itemgetter(item)`

```python
itemgetter(*items)
```

Return a callable object that fetches *item* from its operand using the
operand's `__getitem__()` method.  If multiple items are specified,
returns a tuple of lookup values.  For example:

- After `f = itemgetter(2)`, the call `f(r)` returns `r[2]`.

- After `g = itemgetter(2, 5, 3)`, the call `g(r)` returns
`(r[2], r[5], r[3])`.

Equivalent to:

```
def itemgetter(*items):
    if len(items) == 1:
        item = items[0]
        def g(obj):
            return obj[item]
    else:
        def g(obj):
            return tuple(obj[item] for item in items)
    return g
```

The items can be any type accepted by the operand's `__getitem__()`
method.  Dictionaries accept any hashable value.  Lists, tuples, and
strings accept an index or a slice:

```python
>>> itemgetter(1)('ABCDEFG')
'B'
>>> itemgetter(1, 3, 5)('ABCDEFG')
('B', 'D', 'F')
>>> itemgetter(slice(2, None))('ABCDEFG')
'CDEFG'
>>> soldier = dict(rank='captain', name='dotterbart')
>>> itemgetter('rank')(soldier)
'captain'
```

Example of using `itemgetter()` to retrieve specific fields from a
tuple record:

```python
>>> inventory = [('apple', 3), ('banana', 2), ('pear', 5), ('orange', 1)]
>>> getcount = itemgetter(1)
>>> list(map(getcount, inventory))
[3, 2, 5, 1]
>>> sorted(inventory, key=<example-value>)
[('orange', 1), ('banana', 2), ('apple', 3), ('pear', 5)]
```

### `methodcaller(name, /, *args, **kwargs)`

Return a callable object that calls the method *name* on its operand.  If
additional arguments and/or keyword arguments are given, they will be given
to the method as well.  For example:

- After `f = methodcaller('name')`, the call `f(b)` returns `b.name()`.

- After `f = methodcaller('name', 'foo', bar=1)`, the call `f(b)`
returns `b.name('foo', bar=1)`.

Equivalent to:

```
def methodcaller(name, /, *args, **kwargs):
    def caller(obj):
        return getattr(obj, name)(*args, **kwargs)
    return caller
```
