---
title: "Simple statements (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/simple_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Simple statements

A simple statement is comprised within a single logical line. Several simple
statements may occur on a single line separated by semicolons.  The syntax for
simple statements is:

```text
python-grammar
simple_stmt: `expression_stmt`
           : | `assert_stmt`
           : | `assignment_stmt`
           : | `augmented_assignment_stmt`
           : | `annotated_assignment_stmt`
           : | `pass_stmt`
           : | `del_stmt`
           : | `return_stmt`
           : | `yield_stmt`
           : | `raise_stmt`
           : | `break_stmt`
           : | `continue_stmt`
           : | `import_stmt`
           : | `future_stmt`
           : | `global_stmt`
           : | `nonlocal_stmt`
           : | `type_stmt`
```

## Expression statements

Expression statements are used (mostly interactively) to compute and write a
value, or (usually) to call a procedure (a function that returns no meaningful
result; in Python, procedures return the value `None`).  Other uses of
expression statements are allowed and occasionally useful.  The syntax for an
expression statement is:

```text
python-grammar
expression_stmt: `starred_expression`
```

An expression statement evaluates the expression list (which may be a single
expression).

In interactive mode, if the value is not `None`, it is converted to a string
using the built-in `repr()` function and the resulting string is written to
standard output on a line by itself (except if the result is `None`, so that
procedure calls do not cause any output.)

## Assignment statements

Assignment statements are used to (re)bind names to values and to modify
attributes or items of mutable objects:

```text
python-grammar
assignment_stmt: (`target_list` "=")+ (`starred_expression` | `yield_expression`)
target_list: `target` ("," `target`)* [","]
target: `identifier`
      : | "(" [`target_list`] ")"
      : | "[" [`target_list`] "]"
      : | `attributeref`
      : | `subscription`
      : | "*" `target`
```

(See section primaries for the syntax definitions for *attributeref*
and *subscription*.)

An assignment statement evaluates the expression list (remember that this can be
a single expression or a comma-separated list, the latter yielding a tuple) and
assigns the single resulting object to each of the target lists, from left to
right.

Assignment is defined recursively depending on the form of the target (list).
When a target is part of a mutable object (an attribute reference or
subscription), the mutable object must ultimately perform the assignment and
decide about its validity, and may raise an exception if the assignment is
unacceptable.  The rules observed by various types and the exceptions raised are
given with the definition of the object types (see section types).

Assignment of an object to a target list, optionally enclosed in parentheses or
square brackets, is recursively defined as follows.

- If the target list is a single target with no trailing comma,
optionally in parentheses, the object is assigned to that target.

- Else:

- If the target list contains one target prefixed with an asterisk, called a
"starred" target: The object must be an iterable with at least as many items
as there are targets in the target list, minus one.  The first items of the
iterable are assigned, from left to right, to the targets before the starred
target.  The final items of the iterable are assigned to the targets after
the starred target.  A list of the remaining items in the iterable is then
assigned to the starred target (the list can be empty).

- Else: The object must be an iterable with the same number of items as there
are targets in the target list, and the items are assigned, from left to
right, to the corresponding targets.

Assignment of an object to a single target is recursively defined as follows.

- If the target is an identifier (name):

- If the name does not occur in a `global` or `nonlocal`
statement in the current code block: the name is bound to the object in the
current local namespace.

- Otherwise: the name is bound to the object in the global namespace or the
outer namespace determined by `nonlocal`, respectively.

The name is rebound if it was already bound.  This may cause the reference
count for the object previously bound to the name to reach zero, causing the
object to be deallocated and its destructor (if it has one) to be called.

- If the target is an attribute reference: The primary expression in the
reference is evaluated.  It should yield an object with assignable attributes;
if this is not the case, `TypeError` is raised.  That object is then
asked to assign the assigned object to the given attribute; if it cannot
perform the assignment, it raises an exception (usually but not necessarily
`AttributeError`).

Note: If the object is a class instance and the attribute reference occurs on
both sides of the assignment operator, the right-hand side expression, `a.x` can access
either an instance attribute or (if no instance attribute exists) a class
attribute.  The left-hand side target `a.x` is always set as an instance attribute,
creating it if necessary.  Thus, the two occurrences of `a.x` do not
necessarily refer to the same attribute: if the right-hand side expression refers to a
class attribute, the left-hand side creates a new instance attribute as the target of the
assignment:

```
class Cls:
    x = 3             # class variable
inst = Cls()
inst.x = inst.x + 1   # writes inst.x as 4 leaving Cls.x as 3
```

This description does not necessarily apply to descriptor attributes, such as
properties created with property.

- If the target is a subscription: The primary expression in the reference is
evaluated.
Next, the subscript expression is evaluated.
Then, the primary's `__setitem__()` method is called with
two arguments: the subscript and the assigned object.

Typically, `__setitem__()` is defined on mutable sequence objects
(such as lists) and mapping objects (such as dictionaries), and behaves as
follows.

If the primary is a mutable sequence object (such as a list), the subscript
must yield an integer.  If it is negative, the sequence's length is added to
it.  The resulting value must be a nonnegative integer less than the
sequence's length, and the sequence is asked to assign the assigned object to
its item with that index.  If the index is out of range, `IndexError` is
raised (assignment to a subscripted sequence cannot add new items to a list).

If the primary is a mapping object (such as a dictionary), the subscript must
have a type compatible with the mapping's key type, and the mapping is then
asked to create a key/value pair which maps the subscript to the assigned
object.  This can either replace an existing key/value pair with the same key
value, or insert a new key/value pair (if no key with the same value existed).

If the target is a slicing: The primary expression should evaluate to
a mutable sequence object (such as a list).
The assigned object should be iterable.
The slicing's lower and upper bounds should be integers; if they are `None`
(or not present), the defaults are zero and the sequence's length.
If either bound is negative, the sequence's length is added to it.  The
resulting bounds are clipped to lie between zero and the sequence's length,
inclusive.  Finally, the sequence object is asked to replace the slice with
the items of the assigned sequence.  The length of the slice may be different
from the length of the assigned sequence, thus changing the length of the
target sequence, if the target sequence allows it.

Although the definition of assignment implies that overlaps between the
left-hand side and the right-hand side are 'simultaneous' (for example ``a, b =
b, a`` swaps two variables), overlaps *within* the collection of assigned-to
variables occur left-to-right, sometimes resulting in confusion.  For instance,
the following program prints `[0, 2]`:

```
x = [0, 1]
i = 0
i, x[i] = 1, 2         # i is updated, then x[i] is updated
print(x)
```

> **See also:** PEP 3132 - Extended Iterable Unpacking
> The specification for the `*target` feature.

### Augmented assignment statements

Augmented assignment is the combination, in a single statement, of a binary
operation and an assignment statement:

```text
python-grammar
augmented_assignment_stmt: `augtarget` `augop` (`expression_list` | `yield_expression`)
augtarget: `identifier` | `attributeref` | `subscription`
augop: "+=" | "-=" | "*=" | "@=" | "/=" | "//=" | "%=" | "**="
     : | ">>=" | "<<=" | "&=" | "^=" | "|="
```

(See section primaries for the syntax definitions of the last three
symbols.)

An augmented assignment evaluates the target (which, unlike normal assignment
statements, cannot be an unpacking) and the expression list, performs the binary
operation specific to the type of assignment on the two operands, and assigns
the result to the original target.  The target is only evaluated once.

An augmented assignment statement like `x += 1` can be rewritten as ``x = x +
1`` to achieve a similar, but not exactly equal effect. In the augmented
version, `x` is only evaluated once. Also, when possible, the actual operation
is performed *in-place*, meaning that rather than creating a new object and
assigning that to the target, the old object is modified instead.

Unlike normal assignments, augmented assignments evaluate the left-hand side
*before* evaluating the right-hand side.  For example, `a[i] += f(x)` first
looks-up `a[i]`, then it evaluates `f(x)` and performs the addition, and
lastly, it writes the result back to `a[i]`.

With the exception of assigning to tuples and multiple targets in a single
statement, the assignment done by augmented assignment statements is handled the
same way as normal assignments. Similarly, with the exception of the possible
*in-place* behavior, the binary operation performed by augmented assignment is
the same as the normal binary operations.

For targets which are attribute references, the same :ref:`caveat about class
and instance attributes <attr-target-note>` applies as for regular assignments.

### Annotated assignment statements

Annotation assignment is the combination, in a single
statement, of a variable or attribute annotation and an optional assignment statement:

```text
python-grammar
annotated_assignment_stmt: `augtarget` ":" `expression`
                         : ["=" (`starred_expression` | `yield_expression`)]
```

The difference from normal assignment is that only a single target is allowed.

The assignment target is considered "simple" if it consists of a single
name that is not enclosed in parentheses.
For simple assignment targets, if in class or module scope,
the annotations are gathered in a lazily evaluated
annotation scope. The annotations can be
evaluated using the `__annotations__` attribute of a
class or module, or using the facilities in the `annotationlib`
module.

If the assignment target is not simple (an attribute, subscript node, or
parenthesized name), the annotation is never evaluated.

If a name is annotated in a function scope, then this name is local for
that scope. Annotations are never evaluated and stored in function scopes.

If the right hand side is present, an annotated
assignment performs the actual assignment as if there was no annotation
present. If the right hand side is not present for an expression
target, then the interpreter evaluates the target except for the last
`__setitem__() or setattr__()` call.

> **See also:** PEP 526 - Syntax for Variable Annotations
> The proposal that added syntax for annotating the types of variables
> (including class variables and instance variables), instead of expressing
> them through comments.
>
> PEP 484 - Type hints
> The proposal that added the `typing` module to provide a standard
> syntax for type annotations that can be used in static analysis tools and
> IDEs.

> *Changed in version 3.8.*
> Now annotated assignments allow the same expressions in the right hand side as
> regular assignments. Previously, some expressions (like un-parenthesized
> tuple expressions) caused a syntax error.

> *Changed in version 3.14.*
> Annotations are now lazily evaluated in a separate annotation scope.
> If the assignment target is not simple, annotations are never evaluated.

## The `assert` statement

Assert statements are a convenient way to insert debugging assertions into a
program:

```text
python-grammar
assert_stmt: "assert" `expression` ["," `expression`]
```

The simple form, `assert expression`, is equivalent to:

```
if __debug__:
    if not expression: raise AssertionError
```

The extended form, `assert expression1, expression2`, is equivalent to:

```
if __debug__:
    if not expression1: raise AssertionError(expression2)
```

These equivalences assume that `__debug__` and `AssertionError` refer to
the built-in variables with those names.  In the current implementation, the
built-in variable `__debug__` is `True` under normal circumstances,
`False` when optimization is requested (command line option `-O`).  The current
code generator emits no code for an `assert` statement when optimization is
requested at compile time.  Note that it is unnecessary to include the source
code for the expression that failed in the error message; it will be displayed
as part of the stack trace.

Assignments to `__debug__` are illegal.  The value for the built-in variable
is determined when the interpreter starts.

## The `pass` statement

```text
python-grammar
pass_stmt: "pass"
```

`pass` is a null operation --- when it is executed, nothing happens.
It is useful as a placeholder when a statement is required syntactically, but no
code needs to be executed, for example:

```
def f(arg): pass    # a function that does nothing (yet)

class C: pass       # a class with no methods (yet)
```

## The `del` statement

```text
python-grammar
del_stmt: "del" `target_list`
```

Deletion is recursively defined very similar to the way assignment is defined.
Rather than spelling it out in full details, here are some hints.

Deletion of a target list recursively deletes each target, from left to right.

Deletion of a name removes the binding of that name from the local or global
namespace, depending on whether the name occurs in a `global` statement
in the same code block.  Trying to delete an unbound name raises a
`NameError` exception.

Deletion of attribute references and subscriptions is passed to the
primary object involved; deletion of a slicing is in general equivalent to
assignment of an empty slice of the right type (but even this is determined by
the sliced object).

> *Changed in version 3.2.*
> Previously it was illegal to delete a name from the local namespace if it
> occurs as a free variable in a nested block.
