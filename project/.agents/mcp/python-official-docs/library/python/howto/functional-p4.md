---
title: "Functional Programming HOWTO (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/functional.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Functional Programming HOWTO (part 4 of 4)

## The functools module

The `functools` module contains some higher-order functions.
A **higher-order function** takes one or more functions as input and returns a
new function.  The most useful tool in this module is the
`functools.partial()` function.

For programs written in a functional style, you'll sometimes want to construct
variants of existing functions that have some of the parameters filled in.
Consider a Python function `f(a, b, c)`; you may wish to create a new function
`g(b, c)` that's equivalent to `f(1, b, c)`; you're filling in a value for
one of `f()`'s parameters.  This is called "partial function application".

The constructor for `partial()` takes the arguments
`(function, arg1, arg2, ..., kwarg1=value1, kwarg2=value2)`.  The resulting
object is callable, so you can just call it to invoke `function` with the
filled-in arguments.

Here's a small but realistic example:

```
import functools

def log(message, subsystem):
    """Write the contents of 'message' to the specified subsystem."""
    print('%s: %s' % (subsystem, message))
    ...

server_log = functools.partial(log, subsystem='server')
server_log('Unable to open socket')
```

`functools.reduce(func, iter, [initial_value])`
cumulatively performs an operation on all the iterable's elements and,
therefore, can't be applied to infinite iterables. *func* must be a function
that takes two elements and returns a single value.  `functools.reduce()`
takes the first two elements A and B returned by the iterator and calculates
`func(A, B)`.  It then requests the third element, C, calculates
`func(func(A, B), C)`, combines this result with the fourth element returned,
and continues until the iterable is exhausted.  If the iterable returns no
values at all, a `TypeError` exception is raised.  If the initial value is
supplied, it's used as a starting point and `func(initial_value, A)` is the
first calculation.:

```
>>> import operator, functools
>>> functools.reduce(operator.concat, ['A', 'BB', 'C'])
'ABBC'
>>> functools.reduce(operator.concat, [])
Traceback (most recent call last):
  ...
TypeError: reduce() of empty iterable with no initial value
>>> functools.reduce(operator.mul, [1, 2, 3], 1)
6
>>> functools.reduce(operator.mul, [], 1)
1
```

If you use `operator.add()` with `functools.reduce()`, you'll add up all the
elements of the iterable.  This case is so common that there's a special
built-in called `sum()` to compute it:

```python
>>> import functools, operator
>>> functools.reduce(operator.add, [1, 2, 3, 4], 0)
10
>>> sum([1, 2, 3, 4])
10
>>> sum([])
0
```

For many uses of `functools.reduce()`, though, it can be clearer to just
write the obvious `for` loop:

```
import functools
# Instead of:
product = functools.reduce(operator.mul, [1, 2, 3], 1)

# You can write:
product = 1
for i in [1, 2, 3]:
    product *= i
```

A related function is :func:`itertools.accumulate(iterable, func=operator.add)
<itertools.accumulate>`.  It performs the same calculation, but instead of
returning only the final result, `accumulate()` returns an iterator
that also yields each partial result:

```
itertools.accumulate([1, 2, 3, 4, 5]) =>
  1, 3, 6, 10, 15

itertools.accumulate([1, 2, 3, 4, 5], operator.mul) =>
  1, 2, 6, 24, 120
```

### The operator module

The `operator` module was mentioned earlier.  It contains a set of
functions corresponding to Python's operators.  These functions are often useful
in functional-style code because they save you from writing trivial functions
that perform a single operation.

Some of the functions in this module are:

- Math operations: `add()`, `sub()`, `mul()`, `floordiv()`, `abs()`, ...
- Logical operations: `not_()`, `truth()`.
- Bitwise operations: `and_()`, `or_()`, `invert()`.
- Comparisons: `eq()`, `ne()`, `lt()`, `le()`, `gt()`, and `ge()`.
- Object identity: `is_()`, `is_not()`.

Consult the operator module's documentation for a complete list.

## Small functions and the lambda expression

When writing functional-style programs, you'll often need little functions that
act as predicates or that combine elements in some way.

If there's a Python built-in or a module function that's suitable, you don't
need to define a new function at all:

```
stripped_lines = [line.strip() for line in lines]
existing_files = filter(os.path.exists, file_list)
```

If the function you need doesn't exist, you need to write it.  One way to write
small functions is to use the `lambda` expression.  `lambda` takes a
number of parameters and an expression combining these parameters, and creates
an anonymous function that returns the value of the expression:

```
adder = lambda x, y: x+y

print_assign = lambda name, value: name + '=' + str(value)
```

An alternative is to just use the `def` statement and define a function in the
usual way:

```
def adder(x, y):
    return x + y

def print_assign(name, value):
    return name + '=' + str(value)
```

Which alternative is preferable?  That's a style question; my usual course is to
avoid using `lambda`.

One reason for my preference is that `lambda` is quite limited in the
functions it can define.  The result has to be computable as a single
expression, which means you can't have multiway `if... elif... else`
comparisons or `try... except` statements.  If you try to do too much in a
`lambda` statement, you'll end up with an overly complicated expression that's
hard to read.  Quick, what's the following code doing?:

```
import functools
total = functools.reduce(lambda a, b: (0, a[1] + b[1]), items)[1]
```

You can figure it out, but it takes time to disentangle the expression to figure
out what's going on.  Using a short nested `def` statements makes things a
little bit better:

```
import functools
def combine(a, b):
    return 0, a[1] + b[1]

total = functools.reduce(combine, items)[1]
```

But it would be best of all if I had simply used a `for` loop:

```
total = 0
for a, b in items:
    total += b
```

Or the `sum()` built-in and a generator expression:

```
total = sum(b for a, b in items)
```

Many uses of `functools.reduce()` are clearer when written as `for` loops.

Fredrik Lundh once suggested the following set of rules for refactoring uses of
`lambda`:

1. Write a lambda function.
1. Write a comment explaining what the heck that lambda does.
1. Study the comment for a while, and think of a name that captures the essence
of the comment.
1. Convert the lambda to a def statement, using that name.
1. Remove the comment.

I really like these rules, but you're free to disagree
about whether this lambda-free style is better.

## Revision History and Acknowledgements

This HOWTO was originally written by A. M. Kuchling. The author would like to
thank the following people for offering suggestions,
corrections and assistance with various drafts of this article: Ian Bicking,
Nick Coghlan, Nick Efford, Raymond Hettinger, Jim Jewett, Mike Krell, Leandro
Lameiro, Jussi Salmela, Collin Winter, Blake Winton.

Version 0.1: posted June 30 2006.

Version 0.11: posted July 1 2006.  Typo fixes.

Version 0.2: posted July 10 2006.  Merged genexp and listcomp sections into one.
Typo fixes.

Version 0.21: Added more references suggested on the tutor mailing list.

Version 0.30: Adds a section on the `functional` module written by Collin
Winter; adds short section on the operator module; a few other edits.

## References

### General

**Structure and Interpretation of Computer Programs**, by Harold Abelson and
Gerald Jay Sussman with Julie Sussman.  The book can be found at
https://mitpress.mit.edu/sicp.  In this classic textbook of computer science,
chapters 2 and 3 discuss the use of sequences and streams to organize the data
flow inside a program.  The book uses Scheme for its examples, but many of the
design approaches described in these chapters are applicable to functional-style
Python code.

https://defmacro.org/2006/06/19/fp.html: A general introduction to functional
programming that uses Java examples and has a lengthy historical introduction.

https://en.wikipedia.org/wiki/Functional_programming: General Wikipedia entry
describing functional programming.

https://en.wikipedia.org/wiki/Coroutine: Entry for coroutines.

https://en.wikipedia.org/wiki/Partial_application: Entry for the concept of partial function application.

https://en.wikipedia.org/wiki/Currying: Entry for the concept of currying.

### Python-specific

https://gnosis.cx/TPiP/: The first chapter of David Mertz's book
Text Processing in Python discusses functional programming
for text processing, in the section titled "Utilizing Higher-Order Functions in
Text Processing".

Mertz also wrote a 3-part series of articles on functional programming
for IBM's DeveloperWorks site; see
part 1,
part 2, and
part 3.

### Python documentation

Documentation for the `itertools` module.

Documentation for the `functools` module.

Documentation for the `operator` module.

PEP 289: "Generator Expressions"

PEP 342: "Coroutines via Enhanced Generators" describes the new generator
features in Python 2.5.
