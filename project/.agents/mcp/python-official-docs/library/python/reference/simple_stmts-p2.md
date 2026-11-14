---
title: "Simple statements (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/simple_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Simple statements (part 2 of 4)

## The `return` statement

```text
python-grammar
return_stmt: "return" [`expression_list`]
```

`return` may only occur syntactically nested in a function definition,
not within a nested class definition.

If an expression list is present, it is evaluated, else `None` is substituted.

`return` leaves the current function call with the expression list (or
`None`) as return value.

When `return` passes control out of a `try` statement with a
`finally` clause, that `finally` clause is executed before
really leaving the function.

In a generator function, the `return` statement indicates that the
generator is done and will cause `StopIteration` to be raised. The returned
value (if any) is used as an argument to construct `StopIteration` and
becomes the `StopIteration.value` attribute.

In an asynchronous generator function, an empty `return` statement
indicates that the asynchronous generator is done and will cause
`StopAsyncIteration` to be raised.  A non-empty `return`
statement is a syntax error in an asynchronous generator function.

## The `yield` statement

```text
python-grammar
yield_stmt: `yield_expression`
```

A `yield` statement is semantically equivalent to a :ref:`yield
expression <yieldexpr>`. The `yield` statement can be used to omit the
parentheses that would otherwise be required in the equivalent yield expression
statement. For example, the yield statements:

```
yield <expr>
yield from <expr>
```

are equivalent to the yield expression statements:

```
(yield <expr>)
(yield from <expr>)
```

Yield expressions and statements are only used when defining a generator
function, and are only used in the body of the generator function.  Using `yield`
in a function definition is sufficient to cause that definition to create a
generator function instead of a normal function.

For full details of `yield` semantics, refer to the
yieldexpr section.

## The `raise` statement

```text
python-grammar
raise_stmt: "raise" [`expression` ["from" `expression`]]
```

If no expressions are present, `raise` re-raises the
exception that is currently being handled, which is also known as the *active exception*.
If there isn't currently an active exception, a `RuntimeError` exception is raised
indicating that this is an error.

Otherwise, `raise` evaluates the first expression as the exception
object.  It must be either a subclass or an instance of `BaseException`.
If it is a class, the exception instance will be obtained when needed by
instantiating the class with no arguments.

The type of the exception is the exception instance's class, the
value is the instance itself.

A traceback object is normally created automatically when an exception is raised
and attached to it as the `__traceback__` attribute.
You can create an exception and set your own traceback in one step using the
`with_traceback()` exception method (which returns the
same exception instance, with its traceback set to its argument), like so:

```
raise Exception("foo occurred").with_traceback(tracebackobj)
```

The `from` clause is used for exception chaining: if given, the second
*expression* must be another exception class or instance. If the second
expression is an exception instance, it will be attached to the raised
exception as the `__cause__` attribute (which is writable). If the
expression is an exception class, the class will be instantiated and the
resulting exception instance will be attached to the raised exception as the
`__cause__` attribute. If the raised exception is not handled, both
exceptions will be printed:

```pycon
>>> try:
...     print(1 / 0)
... except Exception as exc:
...     raise RuntimeError("Something bad happened") from exc
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
    print(1 / 0)
          ~~^~~
ZeroDivisionError: division by zero

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
    raise RuntimeError("Something bad happened") from exc
RuntimeError: Something bad happened
```

A similar mechanism works implicitly if a new exception is raised when
an exception is already being handled.  An exception may be handled
when an `except` or `finally` clause, or a
`with` statement, is used.  The previous exception is then
attached as the new exception's `__context__` attribute:

```pycon
>>> try:
...     print(1 / 0)
... except:
...     raise RuntimeError("Something bad happened")
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
    print(1 / 0)
          ~~^~~
ZeroDivisionError: division by zero

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
    raise RuntimeError("Something bad happened")
RuntimeError: Something bad happened
```

Exception chaining can be explicitly suppressed by specifying `None` in
the `from` clause:

```python

>>> try:
...     print(1 / 0)
... except:
...     raise RuntimeError("Something bad happened") from None
...
Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
RuntimeError: Something bad happened
```

Additional information on exceptions can be found in section exceptions,
and information about handling exceptions is in section try.

> *Changed in version 3.3.*
> `None` is now permitted as `Y` in `raise X from Y`.
> Added the `__suppress_context__` attribute to suppress
> automatic display of the exception context.

> *Changed in version 3.11.*
> If the traceback of the active exception is modified in an `except`
> clause, a subsequent `raise` statement re-raises the exception with the
> modified traceback. Previously, the exception was re-raised with the
> traceback it had when it was caught.

## The `break` statement

```text
python-grammar
break_stmt: "break"
```

`break` may only occur syntactically nested in a `for` or
`while` loop, but not nested in a function or class definition within
that loop.

It terminates the nearest enclosing loop, skipping the optional `else`
clause if the loop has one.

If a `for` loop is terminated by `break`, the loop control
target keeps its current value.

When `break` passes control out of a `try` statement with a
`finally` clause, that `finally` clause is executed before
really leaving the loop.

## The `continue` statement

```text
python-grammar
continue_stmt: "continue"
```

`continue` may only occur syntactically nested in a `for` or
`while` loop, but not nested in a function or class definition within
that loop.  It continues with the next cycle of the nearest enclosing loop.

When `continue` passes control out of a `try` statement with a
`finally` clause, that `finally` clause is executed before
really starting the next loop cycle.
