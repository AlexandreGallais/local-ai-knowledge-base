---
title: "Data model (part 9 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/datamodel.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Data model (part 9 of 10)

### Emulating container types

The following methods can be defined to implement container objects. None of them
are provided by the `object` class itself. Containers usually are
sequences (such as `lists` or
`tuples`) or mappings (like
dictionaries),
but can represent other containers as well.  The first set of methods is used
either to emulate a sequence or to emulate a mapping; the difference is that for
a sequence, the allowable keys should be the integers *k* for which ``0 <= k <
N`` where *N* is the length of the sequence, or `slice` objects, which define a
range of items.  It is also recommended that mappings provide the methods
`keys()`, `values()`, `items()`, `get()`, `clear()`,
`setdefault()`, `pop()`, `popitem()`, `copy()`, and
`update()` behaving similar to those for Python's standard `dictionary`
objects.  The `collections.abc` module provides a
`MutableMapping`
abstract base class to help create those methods from a base set of
`__getitem__(), setitem__()`,
`__delitem__()`, and `keys()`.

Mutable sequences should provide methods
`append()`, `clear()`, `count()`,
`extend()`, `index()`, `insert()`,
`pop()`, `remove()`, and `reverse()`,
like Python standard `list` objects.
Finally, sequence types should implement addition (meaning concatenation) and
multiplication (meaning repetition) by defining the methods
`__add__(), radd__(), iadd__()`,
`__mul__(), rmul__() and imul__()`
described below; they should not define other numerical
operators.

It is recommended that both mappings and sequences implement the
`__contains__()` method to allow efficient use of the `in`
operator; for
mappings, `in` should search the mapping's keys; for sequences, it should
search through the values.  It is further recommended that both mappings and
sequences implement the `__iter__()` method to allow efficient iteration
through the container; for mappings, `__iter__()` should iterate
through the object's keys; for sequences, it should iterate through the values.

### `object.__len__(self)`

Called to implement the built-in function `len()`.  Should return the length
of the object, an integer `>=` 0.  Also, an object that doesn't define a
`__bool__() method and whose len__()` method returns zero is
considered to be false in a Boolean context.

> **CPython implementation detail:** In CPython, the length is required to be at most `sys.maxsize`.
> If the length is larger than `sys.maxsize` some features (such as
> `len()`) may raise `OverflowError`.  To prevent raising
> `OverflowError` by truth value testing, an object must define a
> `__bool__()` method.

### `object.__length_hint__(self)`

Called to implement `operator.length_hint()`. Should return an estimated
length for the object (which may be greater or less than the actual length).
The length must be an integer `>=` 0. The return value may also be
`NotImplemented`, which is treated the same as if the
`__length_hint__` method didn't exist at all. This method is purely an
optimization and is never required for correctness.

> *Added in version 3.4.*

### `object.__getitem__(self, subscript)`

Called to implement *subscription*, that is, `self[subscript]`.
See subscriptions for details on the syntax.

There are two types of built-in objects that support subscription
via `__getitem__()`:

- **sequences**, where *subscript* (also called
index) should be an integer or a `slice` object.
See the sequence documentation for the expected
behavior, including handling `slice` objects and negative indices.
- **mappings**, where *subscript* is also called the key.
See mapping documentation for the expected
behavior.

If *subscript* is of an inappropriate type, `__getitem__()`
should raise `TypeError`.
If *subscript* has an inappropriate value, `__getitem__()`
should raise an `LookupError` or one of its subclasses
(`IndexError` for sequences; `KeyError` for mappings).

> **Note:** Slicing is handled by `__getitem__(), setitem__()`,
> and `__delitem__()`.
> A call like:
>
>
> ```
> a[1:2] = b
> ```
>
>
> is translated to:
>
>
> ```
> a[slice(1, 2, None)] = b
> ```
>
>
> and so forth. Missing slice items are always filled in with `None`.

> **Note:** The sequence iteration protocol (used, for example, in `for`
> loops), expects that an `IndexError` will be raised for illegal
> indexes to allow proper detection of the end of a sequence.

> **Note:** When subscripting a *class*, the special
> class method `__class_getitem__()` may be called instead of
> `__getitem__()`. See classgetitem-versus-getitem for more
> details.

### `object.__setitem__(self, key, value)`

Called to implement assignment to `self[key]`.  Same note as for
`__getitem__()`.  This should only be implemented for mappings if the
objects support changes to the values for keys, or if new keys can be added, or
for sequences if elements can be replaced.  The same exceptions should be raised
for improper *key* values as for the `__getitem__()` method.

### `object.__delitem__(self, key)`

Called to implement deletion of `self[key]`.  Same note as for
`__getitem__()`.  This should only be implemented for mappings if the
objects support removal of keys, or for sequences if elements can be removed
from the sequence.  The same exceptions should be raised for improper *key*
values as for the `__getitem__()` method.

### `object.__missing__(self, key)`

Called by `dict.getitem__()` to implement `self[key]` for dict subclasses
when key is not in the dictionary.

### `object.__iter__(self)`

This method is called when an iterator is required for a container.
This method should return a new iterator object that can iterate over all the
objects in the container.  For mappings, it should iterate over the keys of
the container.

### `object.__reversed__(self)`

Called (if present) by the `reversed()` built-in to implement
reverse iteration.  It should return a new iterator object that iterates
over all the objects in the container in reverse order.

If the `__reversed__()` method is not provided, the `reversed()`
built-in will fall back to using the sequence protocol (`__len__()` and
`__getitem__()`).  Objects that support the sequence protocol should
only provide `__reversed__()` if they can provide an implementation
that is more efficient than the one provided by `reversed()`.

The membership test operators (`in` and `not in`) are normally
implemented as an iteration through a container. However, container objects can
supply the following special method with a more efficient implementation, which
also does not require the object be iterable.

### `object.__contains__(self, item)`

Called to implement membership test operators.  Should return true if *item*
is in *self*, false otherwise.  For mapping objects, this should consider the
keys of the mapping rather than the values or the key-item pairs.

For objects that don't define `__contains__()`, the membership test first
tries iteration via `__iter__()`, then the old sequence iteration
protocol via `__getitem__()`, see :ref:`this section in the language
reference <membership-test-details>`.

### Emulating numeric types

The following methods can be defined to emulate numeric objects. Methods
corresponding to operations that are not supported by the particular kind of
number implemented (e.g., bitwise operations for non-integral numbers) should be
left undefined.

### `object.__add__(self, other)`

```python
object.__sub__(self, other)
object.__mul__(self, other)
object.__matmul__(self, other)
object.__truediv__(self, other)
object.__floordiv__(self, other)
object.__mod__(self, other)
object.__divmod__(self, other)
object.__pow__(self, other[, modulo])
object.__lshift__(self, other)
object.__rshift__(self, other)
object.__and__(self, other)
object.__xor__(self, other)
object.__or__(self, other)
```

These methods are called to implement the binary arithmetic operations
(`+`, `-`, `*`, `@`, `/`, `//`, `%`, `divmod()`,
`pow()`, `**`, `<<`, `>>`, `&`, `^`, `|`).  For instance, to
evaluate the expression `x + y`, where *x* is an instance of a class that
has an `__add__()` method, `type(x).__add__(x, y)` is called.  The
`__divmod__()` method should be the equivalent to using
`__floordiv__() and mod__()`; it should not be related to
`__truediv__().  Note that pow__()` should be defined to accept
an optional third argument if the three-argument version of the built-in `pow()`
function is to be supported.

If one of those methods does not support the operation with the supplied
arguments, it should return `NotImplemented`.

### `object.__radd__(self, other)`

```python
object.__rsub__(self, other)
object.__rmul__(self, other)
object.__rmatmul__(self, other)
object.__rtruediv__(self, other)
object.__rfloordiv__(self, other)
object.__rmod__(self, other)
object.__rdivmod__(self, other)
object.__rpow__(self, other[, modulo])
object.__rlshift__(self, other)
object.__rrshift__(self, other)
object.__rand__(self, other)
object.__rxor__(self, other)
object.__ror__(self, other)
```

These methods are called to implement the binary arithmetic operations
(`+`, `-`, `*`, `@`, `/`, `//`, `%`, `divmod()`,
`pow()`, `**`, `<<`, `>>`, `&`, `^`, `|`) with reflected
(swapped) operands.  These functions are only called if the operands
are of different types, when the left operand does not support the corresponding
operation, or the right operand's class is derived from the left operand's
class. For instance, to evaluate the expression `x - y`, where *y* is
an instance of a class that has an `__rsub__()` method, `type(y).__rsub__(y, x)`
is called if `type(x).__sub__(x, y)` returns `NotImplemented` or `type(y)`
is a subclass of `type(x)`.

Note that `__rpow__()` should be defined to accept an optional third
argument if the three-argument version of the built-in `pow()` function
is to be supported.

> *Changed in version 3.14.*
> Three-argument `pow() now try calling rpow__()` if necessary.
> Previously it was only called in two-argument `pow()` and the binary
> power operator.

> **Note:** If the right operand's type is a subclass of the left operand's type and
> that subclass provides a different implementation of the reflected method
> for the operation, this method will be called before the left operand's
> non-reflected method. This behavior allows subclasses to override their
> ancestors' operations.

### `object.__iadd__(self, other)`

```python
object.__isub__(self, other)
object.__imul__(self, other)
object.__imatmul__(self, other)
object.__itruediv__(self, other)
object.__ifloordiv__(self, other)
object.__imod__(self, other)
object.__ipow__(self, other[, modulo])
object.__ilshift__(self, other)
object.__irshift__(self, other)
object.__iand__(self, other)
object.__ixor__(self, other)
object.__ior__(self, other)
```

These methods are called to implement the augmented arithmetic assignments
(`+=`, `-=`, `*=`, `@=`, `/=`, `//=`, `%=`, `**=`, `<<=`,
`>>=`, `&=`, `^=`, `|=`).  These methods should attempt to do the
operation in-place (modifying *self*) and return the result (which could be,
but does not have to be, *self*).  If a specific method is not defined, or if
that method returns `NotImplemented`, the
augmented assignment falls back to the normal methods.  For instance, if *x*
is an instance of a class with an `__iadd__()` method, `x += y` is
equivalent to `x = x.__iadd__(y)` . If `__iadd__()` does not exist, or if `x.__iadd__(y)`
returns `NotImplemented`, `x.__add__(y)` and
`y.__radd__(x)` are considered, as with the evaluation of `x + y`. In
certain situations, augmented assignment can result in unexpected errors (see
faq-augmented-assignment-tuple-error), but this behavior is in fact
part of the data model.

### `object.__neg__(self)`

```python
object.__pos__(self)
object.__abs__(self)
object.__invert__(self)
```

Called to implement the unary arithmetic operations (`-`, `+`, `abs()`
and `~`).

### `object.__complex__(self)`

```python
object.__int__(self)
object.__float__(self)
```

Called to implement the built-in functions `complex()`,
`int()` and `float()`.  Should return a value
of the appropriate type.

### `object.__index__(self)`

Called to implement `operator.index()`, and whenever Python needs to
losslessly convert the numeric object to an integer object (such as in
slicing, or in the built-in `bin()`, `hex()` and `oct()`
functions). Presence of this method indicates that the numeric object is
an integer type.  Must return an integer.

If `__int__(), float__() and complex__()` are not
defined then corresponding built-in functions `int()`, `float()`
and `complex() fall back to index__()`.

### `object.__round__(self, [,ndigits])`

```python
object.__trunc__(self)
object.__floor__(self)
object.__ceil__(self)
```

Called to implement the built-in function `round()` and `math`
functions `trunc()`, `floor()` and `ceil()`.
Unless *ndigits* is passed to `__round__()` all these methods should
return the value of the object truncated to an `Integral`
(typically an `int`).

> *Changed in version 3.14.*
> `int() no longer delegates to the trunc__()` method.

### With Statement Context Managers

A context manager is an object that defines the runtime context to be
established when executing a `with` statement. The context manager
handles the entry into, and the exit from, the desired runtime context for the
execution of the block of code.  Context managers are normally invoked using the
`with` statement (described in section with), but can also be
used by directly invoking their methods.

Typical uses of context managers include saving and restoring various kinds of
global state, locking and unlocking resources, closing opened files, etc.

For more information on context managers, see typecontextmanager.
The `object` class itself does not provide the context manager methods.

### `object.__enter__(self)`

Enter the runtime context related to this object. The `with` statement
will bind this method's return value to the target(s) specified in the
`as` clause of the statement, if any.

### `object.__exit__(self, exc_type, exc_value, traceback)`

Exit the runtime context related to this object. The parameters describe the
exception that caused the context to be exited. If the context was exited
without an exception, all three arguments will be `None`.

If an exception is supplied, and the method wishes to suppress the exception
(i.e., prevent it from being propagated), it should return a true value.
Otherwise, the exception will be processed normally upon exit from this method.

Note that `__exit__()` methods should not reraise the passed-in exception;
this is the caller's responsibility.

> **See also:** PEP 343 - The "with" statement
> The specification, background, and examples for the Python `with`
> statement.
