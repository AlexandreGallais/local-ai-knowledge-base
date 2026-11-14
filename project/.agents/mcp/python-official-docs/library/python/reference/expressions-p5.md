---
title: "Expressions (part 5 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/expressions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Expressions (part 5 of 8)

## Primaries

Primaries represent the most tightly bound operations of the language. Their
syntax is:

```text
python-grammar
primary: `atom` | `attributeref` | `subscription` | `call`
```

### Attribute references

An attribute reference is a primary followed by a period and a name:

```text
python-grammar
attributeref: `primary` "." `identifier`
```

The primary must evaluate to an object of a type that supports attribute
references, which most objects do.  This object is then asked to produce the
attribute whose name is the identifier. The type and value produced is
determined by the object.  Multiple evaluations of the same attribute
reference may yield different objects.

This production can be customized by overriding the
`__getattribute__() method or the getattr__()`
method.  The `__getattribute__()` method is called first and either
returns a value or raises `AttributeError` if the attribute is not
available.

If an `AttributeError is raised and the object has a getattr__()`
method, that method is called as a fallback.

### Subscriptions and slicings

The subscription syntax is usually used for selecting an element from a
container -- for example, to get a value from
a `dict`:

```
>>> digits_by_name = {'one': 1, 'two': 2}
>>> digits_by_name['two']  # Subscripting a dictionary using the key 'two'
2
```

In the subscription syntax, the object being subscribed -- a
primary -- is followed by a subscript in
square brackets.
In the simplest case, the subscript is a single expression.

Depending on the type of the object being subscribed, the subscript is
sometimes called a key (for mappings), index (for sequences),
or *type argument* (for generic types).
Syntactically, these are all equivalent:

```
>>> colors = ['red', 'blue', 'green', 'black']
>>> colors[3]  # Subscripting a list using the index 3
'black'

>>> list[str]  # Parameterizing the list type using the type argument str
list[str]
```

At runtime, the interpreter will evaluate the primary and
the subscript, and call the primary's `__getitem__()` or
`__class_getitem__()` special method with the subscript
as argument.
For more details on which of these methods is called, see
classgetitem-versus-getitem.

To show how subscription works, we can define a custom object that
implements `__getitem__()` and prints out the value of
the subscript:

```
>>> class SubscriptionDemo:
...     def __getitem__(self, key):
...         print(f'subscripted with: {key!r}')
...
>>> demo = SubscriptionDemo()
>>> demo[1]
subscripted with: 1
>>> demo['a' * 3]
subscripted with: 'aaa'
```

See `__getitem__()` documentation for how built-in types handle
subscription.

Subscriptions may also be used as targets in assignment or
deletion statements.
In these cases, the interpreter will call the subscripted object's
`__setitem__() or delitem__()`
special method, respectively, instead of `__getitem__()`.

```
>>> colors = ['red', 'blue', 'green', 'black']
>>> colors[3] = 'white'  # Setting item at index
>>> colors
['red', 'blue', 'green', 'white']
>>> del colors[3]  # Deleting item at index 3
>>> colors
['red', 'blue', 'green']
```

All advanced forms of *subscript* documented in the following sections
are also usable for assignment and deletion.

#### Slicings

A more advanced form of subscription, slicing, is commonly used
to extract a portion of a sequence.
In this form, the subscript is a slice: up to three
expressions separated by colons.
Any of the expressions may be omitted, but a slice must contain at least one
colon:

```
>>> number_names = ['zero', 'one', 'two', 'three', 'four', 'five']
>>> number_names[1:3]
['one', 'two']
>>> number_names[1:]
['one', 'two', 'three', 'four', 'five']
>>> number_names[:3]
['zero', 'one', 'two']
>>> number_names[:]
['zero', 'one', 'two', 'three', 'four', 'five']
>>> number_names[::2]
['zero', 'two', 'four']
>>> number_names[:-3]
['zero', 'one', 'two']
>>> del number_names[4:]
>>> number_names
['zero', 'one', 'two', 'three']
```

When a slice is evaluated, the interpreter constructs a `slice` object
whose `start`, `stop` and
`step` attributes, respectively, are the results of the
expressions between the colons.
Any missing expression evaluates to `None`.
This `slice object is then passed to the getitem__()`
or `__class_getitem__()` special method, as above.:

```
# continuing with the SubscriptionDemo instance defined above:
>>> demo[2:3]
subscripted with: slice(2, 3, None)
>>> demo[::'spam']
subscripted with: slice(None, None, 'spam')
```

#### Comma-separated subscripts

The subscript can also be given as two or more comma-separated expressions
or slices:

```
# continuing with the SubscriptionDemo instance defined above:
>>> demo[1, 2, 3]
subscripted with: (1, 2, 3)
>>> demo[1:2, 3]
subscripted with: (slice(1, 2, None), 3)
```

This form is commonly used with numerical libraries for slicing
multi-dimensional data.
In this case, the interpreter constructs a `tuple` of the results of the
expressions or slices, and passes this tuple to the `__getitem__()`
or `__class_getitem__()` special method, as above.

The subscript may also be given as a single expression or slice followed
by a comma, to specify a one-element tuple:

```
>>> demo['spam',]
subscripted with: ('spam',)
```

#### "Starred" subscriptions

> *Added in version 3.11.*
> Expressions in *tuple_slices* may be starred. See PEP 646.

The subscript can also contain a starred expression.
In this case, the interpreter unpacks the result into a tuple, and passes
this tuple to `__getitem__() or class_getitem__()`:

```
# continuing with the SubscriptionDemo instance defined above:
>>> demo[*range(10)]
subscripted with: (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
```

Starred expressions may be combined with comma-separated expressions
and slices:

```
>>> demo['a', 'b', *range(3), 'c']
subscripted with: ('a', 'b', 0, 1, 2, 'c')
```

#### Formal subscription grammar

```text

subscription:     `primary` '[' `subscript` ']'
subscript:        `single_subscript` | `tuple_subscript`
single_subscript: `proper_slice` | `assignment_expression`
proper_slice:     [`expression`] ":" [`expression`] [ ":" [`expression`] ]
tuple_subscript:  ','.(`single_subscript` | `starred_expression`)+ [',']
```

Recall that the `|` operator denotes ordered choice.
Specifically, in `subscript`, if both alternatives would match, the
first (`single_subscript`) has priority.

### Calls

A call calls a callable object (e.g., a function) with a possibly empty
series of arguments:

```text
python-grammar
call: `primary` "(" [`argument_list` [","] | `comprehension`] ")"
argument_list: `positional_arguments` ["," `starred_and_keywords`]
             :   ["," `keywords_arguments`]
             : | `starred_and_keywords` ["," `keywords_arguments`]
             : | `keywords_arguments`
positional_arguments: `positional_item` ("," `positional_item`)*
positional_item: `assignment_expression` | "*" `expression`
starred_and_keywords: ("*" `expression` | `keyword_item`)
             : ("," "*" `expression` | "," `keyword_item`)*
keywords_arguments: (`keyword_item` | "**" `expression`)
             : ("," `keyword_item` | "," "**" `expression`)*
keyword_item: `identifier` "=" `expression`
```

An optional trailing comma may be present after the positional and keyword arguments
but does not affect the semantics.

The primary must evaluate to a callable object (user-defined functions, built-in
functions, methods of built-in objects, class objects, methods of class
instances, and all objects having a `__call__()` method are callable).  All
argument expressions are evaluated before the call is attempted.  Please refer
to section function for the syntax of formal parameter lists.

If keyword arguments are present, they are first converted to positional
arguments, as follows.  First, a list of unfilled slots is created for the
formal parameters.  If there are N positional arguments, they are placed in the
first N slots.  Next, for each keyword argument, the identifier is used to
determine the corresponding slot (if the identifier is the same as the first
formal parameter name, the first slot is used, and so on).  If the slot is
already filled, a `TypeError` exception is raised. Otherwise, the
argument is placed in the slot, filling it (even if the expression is
`None`, it fills the slot).  When all arguments have been processed, the slots
that are still unfilled are filled with the corresponding default value from the
function definition.  (Default values are calculated, once, when the function is
defined; thus, a mutable object such as a list or dictionary used as default
value will be shared by all calls that don't specify an argument value for the
corresponding slot; this should usually be avoided.)  If there are any unfilled
slots for which no default value is specified, a `TypeError` exception is
raised.  Otherwise, the list of filled slots is used as the argument list for
the call.

> **CPython implementation detail:** An implementation may provide built-in functions whose positional parameters
> do not have names, even if they are 'named' for the purpose of documentation,
> and which therefore cannot be supplied by keyword.  In CPython, this is the
> case for functions implemented in C that use `PyArg_ParseTuple` to
> parse their arguments.

If there are more positional arguments than there are formal parameter slots, a
`TypeError` exception is raised, unless a formal parameter using the syntax
`*identifier` is present; in this case, that formal parameter receives a tuple
containing the excess positional arguments (or an empty tuple if there were no
excess positional arguments).

If any keyword argument does not correspond to a formal parameter name, a
`TypeError` exception is raised, unless a formal parameter using the syntax
`**identifier` is present; in this case, that formal parameter receives a
dictionary containing the excess keyword arguments (using the keywords as keys
and the argument values as corresponding values), or a (new) empty dictionary if
there were no excess keyword arguments.

If the syntax `*expression` appears in the function call, `expression` must
evaluate to an iterable.  Elements from these iterables are
treated as if they were additional positional arguments.  For the call
`f(x1, x2, *y, x3, x4)`, if *y* evaluates to a sequence *y1*, ..., *yM*,
this is equivalent to a call with M+4 positional arguments *x1*, *x2*,
*y1*, ..., *yM*, *x3*, *x4*.

A consequence of this is that although the `*expression` syntax may appear
*after* explicit keyword arguments, it is processed *before* the
keyword arguments (and any `**expression` arguments -- see below).  So:

```
>>> def f(a, b):
...     print(a, b)
...
>>> f(b=1, *(2,))
2 1
>>> f(a=1, *(2,))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: f() got multiple values for keyword argument 'a'
>>> f(1, *(2,))
1 2
```

It is unusual for both keyword arguments and the `*expression` syntax to be
used in the same call, so in practice this confusion does not often arise.

If the syntax `**expression` appears in the function call, `expression` must
evaluate to a mapping, the contents of which are treated as
additional keyword arguments. If a parameter matching a key has already been
given a value (by an explicit keyword argument, or from another unpacking),
a `TypeError` exception is raised.

When `**expression` is used, each key in this mapping must be
a string.
Each value from the mapping is assigned to the first formal parameter
eligible for keyword assignment whose name is equal to the key.
A key need not be a Python identifier (e.g. `"max-temp °F"` is acceptable,
although it will not match any formal parameter that could be declared).
If there is no match to a formal parameter
the key-value pair is collected by the `**` parameter, if there is one,
or if there is not, a `TypeError` exception is raised.

Formal parameters using the syntax `*identifier` or `**identifier` cannot be
used as positional argument slots or as keyword argument names.

> *Changed in version 3.5.*
> Function calls accept any number of `*` and `**` unpackings,
> positional arguments may follow iterable unpackings (`*`),
> and keyword arguments may follow dictionary unpackings (`**`).
> Originally proposed by PEP 448.

A call always returns some value, possibly `None`, unless it raises an
exception.  How this value is computed depends on the type of the callable
object.

If it is---

a user-defined function:

The code block for the function is executed, passing it the argument list.  The
first thing the code block will do is bind the formal parameters to the
arguments; this is described in section function.  When the code block
executes a `return` statement, this specifies the return value of the
function call.  If execution reaches the end of the code block without
executing a `return` statement, the return value is `None`.

a built-in function or method:

The result is up to the interpreter; see built-in-funcs for the
descriptions of built-in functions and methods.

a class object:

A new instance of that class is returned.

a class instance method:

The corresponding user-defined function is called, with an argument list that is
one longer than the argument list of the call: the instance becomes the first
argument.

a class instance:

The class must define a `__call__()` method; the effect is then the same as
if that method was called.

## Await expression

Suspend the execution of coroutine on an awaitable object.
Can only be used inside a coroutine function.

```text
python-grammar
await_expr: "await" `primary`
```

> *Added in version 3.5.*

## The power operator

The power operator binds more tightly than unary operators on its left; it binds
less tightly than unary operators on its right.  The syntax is:

```text
python-grammar
power: (`await_expr` | `primary`) ["**" `u_expr`]
```

Thus, in an unparenthesized sequence of power and unary operators, the operators
are evaluated from right to left (this does not constrain the evaluation order
for the operands): `-1**2` results in `-1`.

The power operator has the same semantics as the built-in `pow()` function,
when called with two arguments: it yields its left argument raised to the power
of its right argument.
Numeric arguments are first converted to a common type,
and the result is of that type.

For int operands, the result has the same type as the operands unless the second
argument is negative; in that case, all arguments are converted to float and a
float result is delivered. For example, `10**2` returns `100`, but
`10**-2` returns `0.01`.

Raising `0.0` to a negative power results in a `ZeroDivisionError`.
Raising a negative number to a fractional power results in a `complex`
number. (In earlier versions it raised a `ValueError`.)

This operation can be customized using the special `__pow__()` and
`__rpow__()` methods.
