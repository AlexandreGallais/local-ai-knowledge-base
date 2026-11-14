---
title: "Compound statements (part 1 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/compound_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Compound statements

Compound statements contain (groups of) other statements; they affect or control
the execution of those other statements in some way.  In general, compound
statements span multiple lines, although in simple incarnations a whole compound
statement may be contained in one line.

The `if`, `while` and `for` statements implement
traditional control flow constructs.  `try` specifies exception
handlers and/or cleanup code for a group of statements, while the
`with` statement allows the execution of initialization and
finalization code around a block of code.  Function and class definitions are
also syntactically compound statements.

A compound statement consists of one or more 'clauses.'  A clause consists of a
header and a 'suite.'  The clause headers of a particular compound statement are
all at the same indentation level. Each clause header begins with a uniquely
identifying keyword and ends with a colon.  A suite is a group of statements
controlled by a clause.  A suite can be one or more semicolon-separated simple
statements on the same line as the header, following the header's colon, or it
can be one or more indented statements on subsequent lines.  Only the latter
form of a suite can contain nested compound statements; the following is illegal,
mostly because it wouldn't be clear to which `if` clause a following
`else` clause would belong:

```
if test1: if test2: print(x)
```

Also note that the semicolon binds tighter than the colon in this context, so
that in the following example, either all or none of the `print()` calls are
executed:

```
if x < y < z: print(x); print(y); print(z)
```

Summarizing:

```text
python-grammar
compound_stmt: `if_stmt`
             : | `while_stmt`
             : | `for_stmt`
             : | `try_stmt`
             : | `with_stmt`
             : | `match_stmt`
             : | `funcdef`
             : | `classdef`
             : | `async_with_stmt`
             : | `async_for_stmt`
             : | `async_funcdef`
suite: `stmt_list` NEWLINE | NEWLINE INDENT `statement`+ DEDENT
statement: `stmt_list` NEWLINE | `compound_stmt`
stmt_list: `simple_stmt` (";" `simple_stmt`)* [";"]
```

Note that statements always end in a `NEWLINE` possibly followed by a
`DEDENT`.  Also note that optional continuation clauses always begin with a
keyword that cannot start a statement, thus there are no ambiguities (the
'dangling `else`' problem is solved in Python by requiring nested
`if` statements to be indented).

The formatting of the grammar rules in the following sections places each clause
on a separate line for clarity.

## The `if` statement

The `if` statement is used for conditional execution:

```text
python-grammar
if_stmt: "if" `assignment_expression` ":" `suite`
       : ("elif" `assignment_expression` ":" `suite`)*
       : ["else" ":" `suite`]
```

It selects exactly one of the suites by evaluating the expressions one by one
until one is found to be true (see section booleans for the definition of
true and false); then that suite is executed (and no other part of the
`if` statement is executed or evaluated).  If all expressions are
false, the suite of the `else` clause, if present, is executed.

## The `while` statement

The `while` statement is used for repeated execution as long as an
expression is true:

```text
python-grammar
while_stmt: "while" `assignment_expression` ":" `suite`
          : ["else" ":" `suite`]
```

This repeatedly tests the expression and, if it is true, executes the first
suite; if the expression is false (which may be the first time it is tested) the
suite of the `else` clause, if present, is executed and the loop
terminates.

A `break` statement executed in the first suite terminates the loop
without executing the `else` clause's suite.  A `continue`
statement executed in the first suite skips the rest of the suite and goes back
to testing the expression.

## The `for` statement

The `for` statement is used to iterate over the elements of a sequence
(such as a string, tuple or list) or other iterable object:

```text
python-grammar
for_stmt: "for" `target_list` "in" `starred_expression_list` ":" `suite`
        : ["else" ":" `suite`]
```

The `python-grammar:starred_expression_list` expression is evaluated
once; it should yield an iterable object. An iterator is
created for that iterable. The first item provided by the iterator is then
assigned to the target list using the standard rules for assignments
(see assignment), and the suite is executed. This repeats for each
item provided by the iterator. When the iterator is exhausted,
the suite in the `else` clause,
if present, is executed, and the loop terminates.

A `break` statement executed in the first suite terminates the loop
without executing the `else` clause's suite.  A `continue`
statement executed in the first suite skips the rest of the suite and continues
with the next item, or with the `else` clause if there is no next
item.

The for-loop makes assignments to the variables in the target list.
This overwrites all previous assignments to those variables including
those made in the suite of the for-loop:

```
for i in range(10):
    print(i)
    i = 5             # this will not affect the for-loop
                      # because i will be overwritten with the next
                      # index in the range
```

Names in the target list are not deleted when the loop is finished, but if the
sequence is empty, they will not have been assigned to at all by the loop.  Hint:
the built-in type `range()` represents immutable arithmetic sequences of integers.
For instance, iterating `range(3)` successively yields 0, 1, and then 2.

> *Changed in version 3.11.*
> Starred elements are now allowed in the expression list.

## The `try` statement

The `try` statement specifies exception handlers and/or cleanup code
for a group of statements:

```text
python-grammar
try_stmt: `try1_stmt` | `try2_stmt` | `try3_stmt`
try1_stmt: "try" ":" `suite`
         : ("except" [`expression` ["as" `identifier`]] ":" `suite`)+
         : ["else" ":" `suite`]
         : ["finally" ":" `suite`]
try2_stmt: "try" ":" `suite`
         : ("except" "*" `expression` ["as" `identifier`] ":" `suite`)+
         : ["else" ":" `suite`]
         : ["finally" ":" `suite`]
try3_stmt: "try" ":" `suite`
         : "finally" ":" `suite`
```

Additional information on exceptions can be found in section exceptions,
and information on using the `raise` statement to generate exceptions
may be found in section raise.

> *Changed in version 3.14.*
> Support for optionally dropping grouping parentheses when using multiple exception types. See PEP 758.

### `except` clause

The `except` clause(s) specify one or more exception handlers. When no
exception occurs in the `try` clause, no exception handler is executed.
When an exception occurs in the `try` suite, a search for an exception
handler is started. This search inspects the `except` clauses in turn
until one is found that matches the exception.
An expression-less `except` clause, if present, must be last;
it matches any exception.

For an `except` clause with an expression, the
expression must evaluate to an exception type or a tuple of exception types. Parentheses
can be dropped if multiple exception types are provided and the `as` clause is not used.
The raised exception matches an `except` clause whose expression evaluates
to the class or a non-virtual base class of the exception object,
or to a tuple that contains such a class.

If no `except` clause matches the exception,
the search for an exception handler
continues in the surrounding code and on the invocation stack.

If the evaluation of an expression
in the header of an `except` clause raises an exception,
the original search for a handler is canceled and a search starts for
the new exception in the surrounding code and on the call stack (it is treated
as if the entire `try` statement raised the exception).

When a matching `except` clause is found,
the exception is assigned to the target
specified after the `as` keyword in that `except` clause,
if present, and the `except` clause's suite is executed.
All `except` clauses must have an executable block.
When the end of this block is reached, execution continues
normally after the entire `try` statement.
(This means that if two nested handlers exist for the same exception,
and the exception occurs in the `try` clause of the inner handler,
the outer handler will not handle the exception.)

When an exception has been assigned using `as target`, it is cleared at the
end of the `except` clause.  This is as if:

```
except E as N:
    foo
```

was translated to:

```
except E as N:
    try:
        foo
    finally:
        del N
```

This means the exception must be assigned to a different name to be able to
refer to it after the `except` clause.
Exceptions are cleared because with the
traceback attached to them, they form a reference cycle with the stack frame,
keeping all locals in that frame alive until the next garbage collection occurs.

Before an `except` clause's suite is executed,
the exception is stored in the `sys` module, where it can be accessed
from within the body of the `except` clause by calling
`sys.exception()`. When leaving an exception handler, the exception
stored in the `sys` module is reset to its previous value:

```
>>> print(sys.exception())
None
>>> try:
...     raise TypeError
... except:
...     print(repr(sys.exception()))
...     try:
...          raise ValueError
...     except:
...         print(repr(sys.exception()))
...     print(repr(sys.exception()))
...
TypeError()
ValueError()
TypeError()
>>> print(sys.exception())
None
```

### `except*` clause

The `except*` clause(s) specify one or more handlers for groups of
exceptions (`BaseExceptionGroup` instances). A `try` statement
can have either `except` or `except*` clauses, but not both.
The exception type for matching is mandatory in the case of `except*`,
so `except*:` is a syntax error. The type is interpreted as in the case of
`except`, but matching is performed on the exceptions contained in the
group that is being handled. A `TypeError` is raised if a matching
type is a subclass of `BaseExceptionGroup`, because that would have
ambiguous semantics.

When an exception group is raised in the try block, each `except*`
clause splits (see `split()`) it into the subgroups
of matching and non-matching exceptions. If the matching subgroup is not empty,
it becomes the handled exception (the value returned from `sys.exception()`)
and assigned to the target of the `except*` clause (if there is one).
Then, the body of the `except*` clause executes. If the non-matching
subgroup is not empty, it is processed by the next `except*` in the
same manner. This continues until all exceptions in the group have been matched,
or the last `except*` clause has run.

After all `except*` clauses execute, the group of unhandled exceptions
is merged with any exceptions that were raised or re-raised from within
`except*` clauses. This merged exception group propagates on:

```
>>> try:
...     raise ExceptionGroup("eg",
...         [ValueError(1), TypeError(2), OSError(3), OSError(4)])
... except* TypeError as e:
...     print(f'caught {type(e)} with nested {e.exceptions}')
... except* OSError as e:
...     print(f'caught {type(e)} with nested {e.exceptions}')
...
caught <class 'ExceptionGroup'> with nested (TypeError(2),)
caught <class 'ExceptionGroup'> with nested (OSError(3), OSError(4))
  + Exception Group Traceback (most recent call last):
  |   File "<doctest default[0]>", line 2, in <module>
  |     raise ExceptionGroup("eg",
  |         [ValueError(1), TypeError(2), OSError(3), OSError(4)])
  | ExceptionGroup: eg (1 sub-exception)
  +-+---------------- 1 ----------------
    | ValueError: 1
    +------------------------------------
```

If the exception raised from the `try` block is not an exception group
and its type matches one of the `except*` clauses, it is caught and
wrapped by an exception group with an empty message string. This ensures that the
type of the target `e` is consistently `BaseExceptionGroup`:

```
>>> try:
...     raise BlockingIOError
... except* BlockingIOError as e:
...     print(repr(e))
...
ExceptionGroup('', (BlockingIOError(),))
```

`break`, `continue` and `return`
cannot appear in an `except*` clause.

### `else` clause

The optional `else` clause is executed if the control flow leaves the
`try` suite, no exception was raised, and no `return`,
`continue`, or `break` statement was executed.  Exceptions in
the `else` clause are not handled by the preceding `except`
clauses.

### `finally` clause

If `finally` is present, it specifies a 'cleanup' handler.  The
`try` clause is executed, including any `except`
and `else` clauses.
If an exception occurs in any of the clauses and is not handled,
the exception is temporarily saved.
The `finally` clause is executed.  If there is a saved exception
it is re-raised at the end of the `finally` clause.
If the `finally` clause raises another exception, the saved exception
is set as the context of the new exception.
If the `finally` clause executes a `return`, `break`
or `continue` statement, the saved exception is discarded. For example,
this function returns 42.

```
def f():
    try:
        1/0
    finally:
        return 42
```

The exception information is not available to the program during execution of
the `finally` clause.

When a `return`, `break` or `continue` statement is
executed in the `try` suite of a `try`...`finally`
statement, the `finally` clause is also executed 'on the way out.'

The return value of a function is determined by the last `return`
statement executed.  Since the `finally` clause always executes, a
`return` statement executed in the `finally` clause will
always be the last one executed. The following function returns 'finally'.

```
def foo():
    try:
        return 'try'
    finally:
        return 'finally'
```

> *Changed in version 3.8.*
> Prior to Python 3.8, a `continue` statement was illegal in the
> `finally` clause due to a problem with the implementation.

> *Changed in version 3.14.*
> The compiler emits a `SyntaxWarning` when a `return`,
> `break` or `continue` appears in a `finally`
> block (see PEP 765).
