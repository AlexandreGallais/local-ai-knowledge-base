---
title: "operator --- Standard operators as functions (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/operator.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# operator --- Standard operators as functions (part 2 of 2)

## Mapping Operators to Functions

This table shows how abstract operations correspond to operator symbols in the
Python syntax and the functions in the `operator` module.

```text
+-----------------------+-------------------------+---------------------------------------+
| Operation             | Syntax                  | Function                              |
+=======================+=========================+=======================================+
| Addition              | ``a + b``               | ``add(a, b)``                         |
+-----------------------+-------------------------+---------------------------------------+
| Concatenation         | ``seq1 + seq2``         | ``concat(seq1, seq2)``                |
+-----------------------+-------------------------+---------------------------------------+
| Containment Test      | ``obj in seq``          | ``contains(seq, obj)``                |
+-----------------------+-------------------------+---------------------------------------+
| Division              | ``a / b``               | ``truediv(a, b)``                     |
+-----------------------+-------------------------+---------------------------------------+
| Division              | ``a // b``              | ``floordiv(a, b)``                    |
+-----------------------+-------------------------+---------------------------------------+
| Bitwise And, or       | ``a & b``               | ``and_(a, b)``                        |
| Intersection          |                         |                                       |
+-----------------------+-------------------------+---------------------------------------+
| Bitwise Exclusive Or, | ``a ^ b``               | ``xor(a, b)``                         |
| or Symmetric          |                         |                                       |
| Difference            |                         |                                       |
+-----------------------+-------------------------+---------------------------------------+
| Bitwise Inversion, or | ``~ a``                 | ``invert(a)``                         |
| Complement            |                         |                                       |
+-----------------------+-------------------------+---------------------------------------+
| Bitwise Or, or        | ``a | b``               | ``or_(a, b)``                         |
| Union                 |                         |                                       |
+-----------------------+-------------------------+---------------------------------------+
| Exponentiation        | ``a ** b``              | ``pow(a, b)``                         |
+-----------------------+-------------------------+---------------------------------------+
| Identity              | ``a is b``              | ``is_(a, b)``                         |
+-----------------------+-------------------------+---------------------------------------+
| Identity              | ``a is not b``          | ``is_not(a, b)``                      |
+-----------------------+-------------------------+---------------------------------------+
| Identity              | ``a is None``           | ``is_none(a)``                        |
+-----------------------+-------------------------+---------------------------------------+
| Identity              | ``a is not None``       | ``is_not_none(a)``                    |
+-----------------------+-------------------------+---------------------------------------+
| Indexed Assignment    | ``obj[k] = v``          | ``setitem(obj, k, v)``                |
+-----------------------+-------------------------+---------------------------------------+
| Indexed Deletion      | ``del obj[k]``          | ``delitem(obj, k)``                   |
+-----------------------+-------------------------+---------------------------------------+
| Indexing              | ``obj[k]``              | ``getitem(obj, k)``                   |
+-----------------------+-------------------------+---------------------------------------+
| Left Shift            | ``a << b``              | ``lshift(a, b)``                      |
+-----------------------+-------------------------+---------------------------------------+
| Modulo                | ``a % b``               | ``mod(a, b)``                         |
+-----------------------+-------------------------+---------------------------------------+
| Multiplication        | ``a * b``               | ``mul(a, b)``                         |
+-----------------------+-------------------------+---------------------------------------+
| Matrix Multiplication | ``a @ b``               | ``matmul(a, b)``                      |
+-----------------------+-------------------------+---------------------------------------+
| Negation (Arithmetic) | ``- a``                 | ``neg(a)``                            |
+-----------------------+-------------------------+---------------------------------------+
| Negation (Logical)    | ``not a``               | ``not_(a)``                           |
+-----------------------+-------------------------+---------------------------------------+
| Positive              | ``+ a``                 | ``pos(a)``                            |
+-----------------------+-------------------------+---------------------------------------+
| Right Shift           | ``a >> b``              | ``rshift(a, b)``                      |
+-----------------------+-------------------------+---------------------------------------+
| Slice Assignment      | ``seq[i:j] = values``   | ``setitem(seq, slice(i, j), values)`` |
+-----------------------+-------------------------+---------------------------------------+
| Slice Deletion        | ``del seq[i:j]``        | ``delitem(seq, slice(i, j))``         |
+-----------------------+-------------------------+---------------------------------------+
| Slicing               | ``seq[i:j]``            | ``getitem(seq, slice(i, j))``         |
+-----------------------+-------------------------+---------------------------------------+
| String Formatting     | ``s % obj``             | ``mod(s, obj)``                       |
+-----------------------+-------------------------+---------------------------------------+
| Subtraction           | ``a - b``               | ``sub(a, b)``                         |
+-----------------------+-------------------------+---------------------------------------+
| Truth Test            | ``obj``                 | ``truth(obj)``                        |
+-----------------------+-------------------------+---------------------------------------+
| Ordering              | ``a < b``               | ``lt(a, b)``                          |
+-----------------------+-------------------------+---------------------------------------+
| Ordering              | ``a <= b``              | ``le(a, b)``                          |
+-----------------------+-------------------------+---------------------------------------+
| Equality              | ``a == b``              | ``eq(a, b)``                          |
+-----------------------+-------------------------+---------------------------------------+
| Difference            | ``a != b``              | ``ne(a, b)``                          |
+-----------------------+-------------------------+---------------------------------------+
| Ordering              | ``a >= b``              | ``ge(a, b)``                          |
+-----------------------+-------------------------+---------------------------------------+
| Ordering              | ``a > b``               | ``gt(a, b)``                          |
+-----------------------+-------------------------+---------------------------------------+
```

## In-place Operators

Many operations have an "in-place" version.  Listed below are functions
providing a more primitive access to in-place operators than the usual syntax
does; for example, the statement `x += y` is equivalent to
`x = operator.iadd(x, y)`.  Another way to put it is to say that
`z = operator.iadd(x, y)` is equivalent to the compound statement
`z = x; z += y`.

In those examples, note that when an in-place method is called, the computation
and assignment are performed in two separate steps.  The in-place functions
listed below only do the first step, calling the in-place method.  The second
step, assignment, is not handled.

For immutable targets such as strings, numbers, and tuples, the updated
value is computed, but not assigned back to the input variable:

```python
>>> a = 'hello'
>>> iadd(a, ' world')
'hello world'
>>> a
'hello'
```

For mutable targets such as lists and dictionaries, the in-place method
will perform the update, so no subsequent assignment is necessary:

```python
>>> s = ['h', 'e', 'l', 'l', 'o']
>>> iadd(s, [' ', 'w', 'o', 'r', 'l', 'd'])
['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
>>> s
['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
```

### `iadd(a, b)`

```python
__iadd__(a, b)
```

`a = iadd(a, b)` is equivalent to `a += b`.

### `iand(a, b)`

```python
__iand__(a, b)
```

`a = iand(a, b)` is equivalent to `a &= b`.

### `iconcat(a, b)`

```python
__iconcat__(a, b)
```

`a = iconcat(a, b)` is equivalent to `a += b` for *a* and *b* sequences.

### `ifloordiv(a, b)`

```python
__ifloordiv__(a, b)
```

`a = ifloordiv(a, b)` is equivalent to `a //= b`.

### `ilshift(a, b)`

```python
__ilshift__(a, b)
```

`a = ilshift(a, b)` is equivalent to `a <<= b`.

### `imod(a, b)`

```python
__imod__(a, b)
```

`a = imod(a, b)` is equivalent to `a %= b`.

### `imul(a, b)`

```python
__imul__(a, b)
```

`a = imul(a, b)` is equivalent to `a *= b`.

### `imatmul(a, b)`

```python
__imatmul__(a, b)
```

`a = imatmul(a, b)` is equivalent to `a @= b`.

> *Added in version 3.5.*

### `ior(a, b)`

```python
__ior__(a, b)
```

`a = ior(a, b)` is equivalent to `a |= b`.

### `ipow(a, b)`

```python
__ipow__(a, b)
```

`a = ipow(a, b)` is equivalent to `a **= b`.

### `irshift(a, b)`

```python
__irshift__(a, b)
```

`a = irshift(a, b)` is equivalent to `a >>= b`.

### `isub(a, b)`

```python
__isub__(a, b)
```

`a = isub(a, b)` is equivalent to `a -= b`.

### `itruediv(a, b)`

```python
__itruediv__(a, b)
```

`a = itruediv(a, b)` is equivalent to `a /= b`.

### `ixor(a, b)`

```python
__ixor__(a, b)
```

`a = ixor(a, b)` is equivalent to `a ^= b`.
