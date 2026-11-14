---
title: "Compound statements (part 2 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/compound_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Compound statements (part 2 of 7)

## The `with` statement

The `with` statement is used to wrap the execution of a block with
methods defined by a context manager (see section context-managers).
This allows common `try`...`except`...`finally`
usage patterns to be encapsulated for convenient reuse.

```text
python-grammar
with_stmt: "with" ( "(" `with_stmt_contents` ","? ")" | `with_stmt_contents` ) ":" `suite`
with_stmt_contents: `with_item` ("," `with_item`)*
with_item: `expression` ["as" `target`]
```

The execution of the `with` statement with one "item" proceeds as follows:

1. The context expression (the expression given in the
`python-grammar:with_item`) is evaluated to obtain a context manager.

1. The context manager's `__enter__()` is loaded for later use.

1. The context manager's `__exit__()` is loaded for later use.

1. The context manager's `__enter__()` method is invoked.

1. If a target was included in the `with` statement, the return value
from `__enter__()` is assigned to it.

> **Note:** The `with statement guarantees that if the enter__()`
> method returns without an error, then `__exit__()` will always be
> called. Thus, if an error occurs during the assignment to the target list,
> it will be treated the same as an error occurring within the suite would
> be. See step 7 below.

1. The suite is executed.

1. The context manager's `__exit__()` method is invoked.  If an exception
caused the suite to be exited, its type, value, and traceback are passed as
arguments to `__exit__()`. Otherwise, three `None` arguments are
supplied.

If the suite was exited due to an exception, and the return value from the
`__exit__()` method was false, the exception is reraised.  If the return
value was true, the exception is suppressed, and execution continues with the
statement following the `with` statement.

If the suite was exited for any reason other than an exception, the return
value from `__exit__()` is ignored, and execution proceeds at the normal
location for the kind of exit that was taken.

The following code:

```
with EXPRESSION as TARGET:
    SUITE
```

is semantically equivalent to:

```
manager = (EXPRESSION)
enter = manager.__enter__
exit = manager.__exit__
value = enter()
hit_except = False

try:
    TARGET = value
    SUITE
except:
    hit_except = True
    if not exit(*sys.exc_info()):
        raise
finally:
    if not hit_except:
        exit(None, None, None)
```

except that implicit special method lookup is used
for `__enter__() and exit__()`.

With more than one item, the context managers are processed as if multiple
`with` statements were nested:

```
with A() as a, B() as b:
    SUITE
```

is semantically equivalent to:

```
with A() as a:
    with B() as b:
        SUITE
```

You can also write multi-item context managers in multiple lines if
the items are surrounded by parentheses. For example:

```
with (
    A() as a,
    B() as b,
):
    SUITE
```

> *Changed in version 3.1.*
> Support for multiple context expressions.

> *Changed in version 3.10.*
> Support for using grouping parentheses to break the statement in multiple lines.

> **See also:** PEP 343 - The "with" statement
> The specification, background, and examples for the Python `with`
> statement.
