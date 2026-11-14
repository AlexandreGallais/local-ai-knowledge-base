---
title: "Expressions (part 7 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/expressions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Expressions (part 7 of 8)

## Comparisons

Unlike C, all comparison operations in Python have the same priority, which is
lower than that of any arithmetic, shifting or bitwise operation.  Also unlike
C, expressions like `a < b < c` have the interpretation that is conventional
in mathematics:

```text
python-grammar
comparison: `or_expr` (`comp_operator` `or_expr`)*
comp_operator: "<" | ">" | "==" | ">=" | "<=" | "!="
             : | "is" ["not"] | ["not"] "in"
```

Comparisons yield boolean values: `True` or `False`. Custom
rich comparison methods may return non-boolean values. In this case
Python will call `bool()` on such value in boolean contexts.

Comparisons can be chained arbitrarily, e.g., `x < y <= z` is equivalent to
`x < y and y <= z`, except that `y` is evaluated only once (but in both
cases `z` is not evaluated at all when `x < y` is found to be false).

Formally, if *a*, *b*, *c*, ..., *y*, *z* are expressions and *op1*, *op2*, ...,
*opN* are comparison operators, then `a op1 b op2 c ... y opN z` is equivalent
to `a op1 b and b op2 c and ... y opN z`, except that each expression is
evaluated at most once.

Note that `a op1 b op2 c` doesn't imply any kind of comparison between *a* and
*c*, so that, e.g., `x < y > z` is perfectly legal (though perhaps not
pretty).

### Value comparisons

The operators `<`, `>`, `==`, `>=`, `<=`, and `!=` compare the
values of two objects.  The objects do not need to have the same type.

Chapter objects states that objects have a value (in addition to type
and identity).  The value of an object is a rather abstract notion in Python:
For example, there is no canonical access method for an object's value.  Also,
there is no requirement that the value of an object should be constructed in a
particular way, e.g. comprised of all its data attributes. Comparison operators
implement a particular notion of what the value of an object is.  One can think
of them as defining the value of an object indirectly, by means of their
comparison implementation.

Because all types are (direct or indirect) subtypes of `object`, they
inherit the default comparison behavior from `object`.  Types can
customize their comparison behavior by implementing
rich comparison methods like `__lt__()`, described in
customization.

The default behavior for equality comparison (`==` and `!=`) is based on
the identity of the objects.  Hence, equality comparison of instances with the
same identity results in equality, and equality comparison of instances with
different identities results in inequality.  A motivation for this default
behavior is the desire that all objects should be reflexive (i.e. `x is y`
implies `x == y`).

A default order comparison (`<`, `>`, `<=`, and `>=`) is not provided;
an attempt raises `TypeError`.  A motivation for this default behavior is
the lack of a similar invariant as for equality.

The behavior of the default equality comparison, that instances with different
identities are always unequal, may be in contrast to what types will need that
have a sensible definition of object value and value-based equality.  Such
types will need to customize their comparison behavior, and in fact, a number
of built-in types have done that.

The following list describes the comparison behavior of the most important
built-in types.

- Numbers of built-in numeric types (typesnumeric) and of the standard
library types `fractions.Fraction` and `decimal.Decimal` can be
compared within and across their types, with the restriction that complex
numbers do not support order comparison.  Within the limits of the types
involved, they compare mathematically (algorithmically) correct without loss
of precision.

The not-a-number values `float('NaN')` and `decimal.Decimal('NaN')` are
special.  Any ordered comparison of a number to a not-a-number value is false.
A counter-intuitive implication is that not-a-number values are not equal to
themselves.  For example, if `x = float('NaN')`, `3 < x`, `x < 3` and
`x == x` are all false, while `x != x` is true.  This behavior is
compliant with IEEE 754.

- `None` and `NotImplemented` are singletons.  8 advises that
comparisons for singletons should always be done with `is` or `is not`,
never the equality operators.

- Binary sequences (instances of `bytes` or `bytearray`) can be
compared within and across their types.  They compare lexicographically using
the numeric values of their elements.

- Strings (instances of `str`) compare lexicographically using the
numerical Unicode code points (the result of the built-in function
`ord()`) of their characters.

Strings and binary sequences cannot be directly compared.

- Sequences (instances of `tuple`, `list`, or `range`) can
be compared only within each of their types, with the restriction that ranges
do not support order comparison.  Equality comparison across these types
results in inequality, and ordering comparison across these types raises
`TypeError`.

Sequences compare lexicographically using comparison of corresponding
elements.  The built-in containers typically assume identical objects are
equal to themselves.  That lets them bypass <example-value> tests for identical
objects to improve performance and to maintain their internal invariants.

Lexicographical comparison between built-in collections works as follows:

- For two collections to compare equal, they must be of the same type, have
the same length, and each pair of corresponding elements must compare
equal (for example, `[1,2] == (1,2)` is false because the type is not the
same).

- Collections that support order comparison are ordered the same as their
first unequal elements (for example, `[1,2,x] <= [1,2,y]` has the same
value as `x <= y`).  If a corresponding element does not exist, the
shorter collection is ordered first (for example, `[1,2] < [1,2,3]` is
true).

- Mappings (instances of `dict`) compare equal if and only if they have
equal `(key, value)` pairs. Equality comparison of the keys and values
enforces reflexivity.

Order comparisons (`<`, `>`, `<=`, and `>=`) raise `TypeError`.

- Sets (instances of `set` or `frozenset`) can be compared within
and across their types.

They define order
comparison operators to mean subset and superset tests.  Those relations do
not define total orderings (for example, the two sets `{1,2}` and `{2,3}`
are not equal, nor subsets of one another, nor supersets of one
another).  Accordingly, sets are not appropriate arguments for functions
which depend on total ordering (for example, `min()`, `max()`, and
`sorted()` produce undefined results given a list of sets as inputs).

Comparison of sets enforces reflexivity of its elements.

- Most other built-in types have no comparison methods implemented, so they
inherit the default comparison behavior.

User-defined classes that customize their comparison behavior should follow
some consistency rules, if possible:

- Equality comparison should be reflexive.
In other words, identical objects should compare equal:

`x is y` implies `x == y`

- Comparison should be symmetric.
In other words, the following expressions should have the same result:

`x == y` and `y == x`

`x != y` and `y != x`

`x < y` and `y > x`

`x <= y` and `y >= x`

- Comparison should be transitive.
The following (non-exhaustive) examples illustrate that:

`x > y and y > z` implies `x > z`

`x < y and y <= z` implies `x < z`

- Inverse comparison should result in the boolean negation.
In other words, the following expressions should have the same result:

`x == y` and `not x != y`

`x < y` and `not x >= y` (for total ordering)

`x > y` and `not x <= y` (for total ordering)

The last two expressions apply to totally ordered collections (e.g. to
sequences, but not to sets or mappings). See also the
total_ordering decorator.

- The `hash()` result should be consistent with equality.
Objects that are equal should either have the same hash value,
or be marked as unhashable.

Python does not enforce these consistency rules. In fact, the not-a-number
values are an example for not following these rules.

### Membership test operations

The operators `in` and `not in` test for membership.  ``x in
s` evaluates to `True` if *x* is a member of *s*, and `False`` otherwise.
`x not in s` returns the negation of `x in s`.  All built-in sequences and
set types support this as well as dictionary, for which `in` tests
whether the dictionary has a given key. For container types such as list, tuple,
set, frozenset, dict, or collections.deque, the expression `x in y` is equivalent
to `any(x is e or x == e for e in y)`.

For the string and bytes types, `x in y` is `True` if and only if *x* is a
substring of *y*.  An equivalent test is `y.find(x) != -1`.  Empty strings are
always considered to be a substring of any other string, so `"" in "abc"` will
return `True`.

For user-defined classes which define the `__contains__()` method, ``x in
y` returns `True` if `y.__contains__(x)`` returns a true value, and
`False` otherwise.

For user-defined classes which do not define `__contains__()` but do define
`__iter__()`, `x in y` is `True` if some value `z`, for which the
expression `x is z or x == z` is true, is produced while iterating over `y`.
If an exception is raised during the iteration, it is as if `in` raised
that exception.

Lastly, the old-style iteration protocol is tried: if a class defines
`__getitem__()`, `x in y` is `True` if and only if there is a non-negative
integer index *i* such that `x is y[i] or x == y[i]`, and no lower integer index
raises the `IndexError` exception.  (If any other exception is raised, it is as
if `in` raised that exception).

The operator `not in` is defined to have the inverse truth value of
`in`.

### Identity comparisons

The operators `is` and `is not` test for an object's identity: ``x
is y`` is true if and only if *x* and *y* are the same object.  An Object's identity
is determined using the `id()` function.  `x is not y` yields the inverse
truth value.

## Boolean operations

```text
python-grammar
or_test: `and_test` | `or_test` "or" `and_test`
and_test: `not_test` | `and_test` "and" `not_test`
not_test: `comparison` | "not" `not_test`
```

In the context of Boolean operations, and also when expressions are used by
control flow statements, the following values are interpreted as false:
`False`, `None`, numeric zero of all types, and empty strings and containers
(including strings, tuples, lists, dictionaries, sets and frozensets).  All
other values are interpreted as true.  User-defined objects can customize their
truth value by providing a `__bool__()` method.

The operator `not` yields `True` if its argument is false, `False`
otherwise.

The expression `x and y` first evaluates *x*; if *x* is false, its value is
returned; otherwise, *y* is evaluated and the resulting value is returned.

The expression `x or y` first evaluates *x*; if *x* is true, its value is
returned; otherwise, *y* is evaluated and the resulting value is returned.

Note that neither `and` nor `or` restrict the value and type
they return to `False` and `True`, but rather return the last evaluated
argument.  This is sometimes useful, e.g., if `s` is a string that should be
replaced by a default value if it is empty, the expression `s or 'foo'` yields
the desired value.  Because `not` has to create a new value, it
returns a boolean value regardless of the type of its argument
(for example, `not 'foo'` produces `False` rather than `''`.)

## Assignment expressions

```text
python-grammar
assignment_expression: [`identifier` ":="] `expression`
```

An assignment expression (sometimes also called a "named expression" or
"walrus") assigns an `python-grammar:expression` to an
`python-grammar:identifier`, while also returning the value of the
`python-grammar:expression`.

One common use case is when handling matched regular expressions:

```python
if matching := pattern.search(data):
    do_something(matching)
```

Or, when processing a file stream in chunks:

```python
while chunk := file.read(9000):
    process(chunk)
```

Assignment expressions must be surrounded by parentheses when
used as expression statements and when used as sub-expressions in
slicing, conditional, lambda,
keyword-argument, and comprehension-if expressions and
in `assert`, `with`, and `assignment` statements.
In all other places where they can be used, parentheses are not required,
including in `if` and `while` statements.

> *Added in version 3.8.*
> See PEP 572 for more details about assignment expressions.

## Conditional expressions

```text
python-grammar
conditional_expression: `or_test` ["if" `or_test` "else" `expression`]
expression: `conditional_expression` | `lambda_expr`
```

A conditional expression (sometimes called a "ternary operator") is an
alternative to the if-else statement. As it is an expression, it returns a value
and can appear as a sub-expression.

The expression `x if C else y` first evaluates the condition, *C* rather than *x*.
If *C* is true, *x* is evaluated and its value is returned; otherwise, *y* is
evaluated and its value is returned.

See PEP 308 for more details about conditional expressions.

## Lambdas

```text
python-grammar
lambda_expr: "lambda" [`parameter_list`] ":" `expression`
```

Lambda expressions (sometimes called lambda forms) are used to create anonymous
functions. The expression `lambda parameters: expression` yields a function
object.  The unnamed object behaves like a function object defined with:

```none
def <lambda>(parameters):
    return expression
```

See section function for the syntax of parameter lists.  Note that
functions created with lambda expressions cannot contain statements or
annotations.
