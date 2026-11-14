---
title: "Expressions (part 3 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/expressions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Expressions (part 3 of 8)

### Comprehensions

List, set and dictionary comprehensions are a form of
container displays where items are computed via a set of
looping and filtering instructions rather than listed explicitly.

In its simplest form, a comprehension consists of a single expression
followed by a `for` clause.
The `for` clause has the same syntax as the header of a
for statement, without a trailing colon.

For example, a list of the first ten squares is:

```
>>> [x**2 for x in range(10)]
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

At run time, a list comprehension creates a new list.
The expression after `in` must evaluate to an iterable.
For each element of this iterable, the element is bound to the `for`
clause's target as in a `for` statement, then the expression
before `for` is evaluated with the target in scope and the result
is added to the new list.
Thus, the example above is roughly equivalent to defining and calling
the following function:

```
def make_list_of_squares(iterable):
    result = []
    for x in iterable:
        result.append(x**2)
    return result

make_list_of_squares(range(10))
```

Set comprehensions work similarly.
For example, here is a set of lowercase letters:

```
>>> {x.lower() for x in ['a', 'A', 'b', 'C']}
{'c', 'a', 'b'}
```

At run time, this corresponds roughly to calling this function:

```
def make_lowercase_set(iterable):
    result = set(iterable)
    for x in iterable:
        result.append(x.lower())
    return result

make_lowercase_set(['a', 'A', 'b', 'C'])
```

Dictionary comprehensions start with a colon-separated key-value pair instead
of an expression. For example:

```
>>> {func.__name__: func for func in [print, hex, any]}
{'print': <built-in function print>,
 'hex': <built-in function hex>,
 'any': <built-in function any>}
```

At run time, this corresponds roughly to:

```
def make_dict_mapping_names_to_functions(iterable):
    result = {}
    for func in iterable:
        result[func.__name__] = func
    return result

iterable([print, hex, any])
```

As in other kinds of dictionary displays, the same key may be specified
multiple times.
Earlier values are overwritten by ones that are evaluated later.

There are no *tuple comprehensions*.
A similar syntax is instead used for generator expressions,
from which you can construct a tuple like this:

```
>>> tuple(x**2 for x in range(10))
(0, 1, 4, 9, 16, 25, 36, 49, 64, 81)
```

> *Changed in version 3.8.*
> Prior to Python 3.8, in dict comprehensions, the evaluation order of key
> and value was not well-defined.  In CPython, the value was evaluated before
> the key.  Starting with 3.8, the key is evaluated before the value, as
> proposed by PEP 572.

#### Filtering in comprehensions

The `for` clause may be followed by an `if` clause
with an expression.

For example, a list of names from the `math` module
that start with `f` is:

```
>>> [name for name in vars(math) if name.startswith('f')]
['fabs', 'factorial', 'floor', 'fma', 'fmod', 'frexp', 'fsum']
```

At run time, the expression after `if` is evaluated before
each element is added to the resulting container, and if it is false,
the element is skipped.
Thus, the above example roughly corresponds to defining and calling the
following function:

```
def get_math_f_names(iterable):
    result = []
    for name in iterable:
        if name.startswith('f'):
           result.append(name)
    return result

get_math_f_names(vars(math))
```

Filtering is a special case of more complex comprehensions.
See the next section for a more formal description.

#### Complex comprehensions

Generally, a comprehension's initial `for` clause may be followed by
zero or more additional `for` or `if` clauses.
For example, here is a list of names exposed by two Python modules,
filtered to only include names that start with `a`:

```
>>> import array
>>> import math
>>> [
...     name
...     for module in [array, math]
...     for name in vars(module)
...     if name.startswith('a')
... ]
['array', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh']
```

At run time, this roughly corresponds to defining and calling:

```
def get_a_names(iterable):
    result = []
    for module in iterable:
        for name in vars(module):
            if name.startswith('a'):
                result.append(name)
    return result

get_a_names([array, math])
```

The elements of the new container are those that would be produced by
considering each of the `for` or `if` clauses a block,
nesting from left to right, and evaluating the expression to produce an
element (or dictionary entry) each time the innermost block is reached.

Aside from the iterable expression in the leftmost `for` clause,
the comprehension is executed in a separate implicitly nested scope.
This ensures that names assigned to in the target list don't "leak" into
the enclosing scope.
For example:

```
>>> x = 'old value'
>>> [x**2 for x in range(10)]  # this `x` is local to the comprehension
>>> x
'old value'
```

The iterable expression in the leftmost `for` clause is evaluated
directly in the enclosing scope and then passed as an argument to the implicitly
nested scope.

Subsequent `for` clauses and any filter condition in the
leftmost `for` clause cannot be evaluated in the enclosing scope as
they may depend on the values obtained from the leftmost iterable.

To ensure the comprehension always results in a container of the appropriate
type, `yield` and `yield from` expressions are prohibited in the implicitly
nested scope.

Assignment expressions are not allowed
inside comprehension iterable expressions (that is, the expressions after
the `in` keyword), nor anywhere within comprehensions that
appear directly in a class definition.

> *Changed in version 3.8.*
> `yield` and `yield from` prohibited in the implicitly nested scope.

#### Unpacking in comprehensions

If the expression of a list or set comprehension is starred, the result will
be unpacked to produce
zero or more elements.

This is often used for "flattening" lists, for example:

```
>>> students = ['Petr', 'Blaise', 'Jarka']
>>> teachers = ['Salim', 'Bartosz']
>>> lists_of_people = [students, teachers]
>>> [*people for people in lists_of_people]
['Petr', 'Blaise', 'Jarka', 'Salim', 'Bartosz']
```

At run time, this comprehension roughly corresponds to:

```
def flatten_names(lists_of_people):
    result = []
    for people in lists_of_people:
        result.extend(people)
    return result
```

In dict comprehensions, a double-starred expression will be evaluated and
then unpacked using dictionary unpacking,
inserting zero or more key/value pairs into the new dictionary.
As in other kinds of dictionary displays, if the same key is specified
multiple times, the associated value in the resulting dictionary
will be the last one specified.

For example:

```
>>> system_defaults = {'color': 'blue', 'count': 8}
>>> user_defaults = {'color': 'yellow'}
>>> overrides = {'count': 5}

>>> configuration_sets = [system_defaults, user_defaults, overrides]

>>> {**d for d in configuration_sets}
{'color': 'yellow', 'count': 5}
```

> *Added in version 3.15.*
> Unpacking in comprehensions using the `*` and `**` operators
> was introduced in PEP 798.

#### Asynchronous comprehensions

In an `async def` function, an `async for`
clause may be used to iterate over a asynchronous iterator.
A comprehension in an `async def` function may consist of either a
`for` or `async for` clause following the leading
expression, may contain additional `for` or `async for`
clauses, and may also use `await` expressions.

If a comprehension contains `async for` clauses, or if it contains
`await` expressions or other asynchronous comprehensions anywhere except
the iterable expression in the leftmost `for` clause, it is called an
asynchronous comprehension. An asynchronous comprehension may suspend the
execution of the coroutine function in which it appears.

> *Added in version 3.6.*
> Asynchronous comprehensions were introduced in PEP 530.

> *Changed in version 3.11.*
> Asynchronous comprehensions are now allowed inside comprehensions in
> asynchronous functions. Outer comprehensions implicitly become
> asynchronous.

#### Formal grammar for comprehensions

The formal grammar for comprehensions is:

```text

listcomp:      '[' `comprehension` ']'
setcomp:       '{' `comprehension` '}'
comprehension: `flexible_expression` `for_if_clause`+

dictcomp:
    | '{' `kvpair` `for_if_clause`+ '}'
    | '{' '**' `expression` `for_if_clause`+ '}'

for_if_clause:
    | ['async'] 'for' `target_list` 'in' `or_test` ('if' `or_test`)*
```

### Generator expressions

The syntax for generator expressions is the same as for
list comprehensions, except that they are enclosed in
parentheses instead of brackets.
For example:

```
>>> iterator = (x ** 2 for x in range(10))
>>> iterator
<generator object <genexpr> at ...>
```

At runtime, a generator expression evaluates to a generator iterator
which yields the same values as the corresponding list comprehension:

```
>>> list(iterator)
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Thus, the example above is roughly equivalent to defining and calling
the following generator function:

```
def make_generator_of_squares(iterator):
    for x in iterator:
        yield x ** 2

make_generator_of_squares(iter(range(10)))
```

The enclosing parentheses can be omitted in calls when the generator
expression is the only positional argument and there are no keyword
arguments.
See the Calls section for details.
For example:

```
# The parentheses after `sum` are part of the call syntax:
>>> sum(x ** 2 for x in range(10))
285

# The generator needs its own parentheses if it's not the only argument:
>>> sum((x ** 2 for x in range(10)), start=1000)
1285
```

The iterable expression in the leftmost `for` clause is
evaluated immediately, so that an error raised by this expression will be
emitted at the point where the generator expression is defined,
rather than at the point where the first value is retrieved:

```
>>> (x ** 2 for x in nonexistent_iterable)
Traceback (most recent call last):
  ...
NameError: name 'nonexistent_iterable' is not defined
```

After the expression is evaluated, an iterator is created
from the result, as if `iter()` was called on it.
Any error raised when creating the iterator is also emitted immediately:

```
>>> (x ** 2 for x in None)
Traceback (most recent call last):
  ...
TypeError: 'NoneType' object is not iterable
```

All other expressions are evaluated lazily, in the same fashion as normal
generators (that is, when the iterator is asked to yield a value):

```
>>> iterator = (nonexistent_value for x in range(10))
>>> iterator
<generator object <genexpr> at ...>
>>> list(iterator)
Traceback (most recent call last):
  ...
NameError: name 'nonexistent_value' is not defined
```

```
>>> iterator = (x * y for x in range(10) for y in nonexistent_iterable)
>>> iterator
<generator object <genexpr> at ...>
>>> list(iterator)
Traceback (most recent call last):
  ...
NameError: name 'nonexistent_iterable' is not defined
```

To avoid interfering with the expected operation of the generator expression
itself, `yield` and `yield from` expressions are prohibited inside
the implicitly nested scope.

If a generator expression contains either `async for`
clauses or `await` expressions it is called an
asynchronous generator expression.
An asynchronous generator expression returns a new asynchronous generator
object, which is an asynchronous iterator (see async-iterators).

The formal grammar for generator expressions is:

```text

generator_expression: "(" `comprehension` ")"
```

> *Added in version 3.6.*
> Asynchronous generator expressions were introduced.

> *Changed in version 3.7.*
> Prior to Python 3.7, asynchronous generator expressions could
> only appear in `async def` coroutines.  Starting
> with 3.7, any function can use asynchronous generator expressions.

> *Changed in version 3.8.*
> `yield` and `yield from` prohibited in the implicitly nested scope.
