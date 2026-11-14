---
title: "dis --- Disassembler for Python bytecode (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/dis.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# dis --- Disassembler for Python bytecode (part 4 of 4)

### opcode `PUSH_NULL`

Pushes a `NULL` to the stack.
Used in the call sequence to match the `NULL` pushed by
`LOAD_ATTR` for non-method calls.

> *Added in version 3.11.*

### opcode `MAKE_FUNCTION`

Pushes a new function object on the stack built from the code object at `STACK[-1]`.

> *Changed in version 3.10.*
> Flag value `0x04` is a tuple of strings instead of dictionary

> *Changed in version 3.11.*
> Qualified name at `STACK[-1]` was removed.

> *Changed in version 3.13.*
> Extra function attributes on the stack, signaled by oparg flags, were
> removed. They now use `SET_FUNCTION_ATTRIBUTE`.

### opcode `SET_FUNCTION_ATTRIBUTE (flag)`

Sets an attribute on a function object. Expects the function at `STACK[-1]`
and the attribute value to set at `STACK[-2]`; consumes both and leaves the
function at `STACK[-1]`. The flag determines which attribute to set:

- `0x01` a tuple of default values for positional-only and
positional-or-keyword parameters in positional order
- `0x02` a dictionary of keyword-only parameters' default values
- `0x04` a tuple of strings containing parameters' annotations
- `0x08` a tuple containing cells for free variables, making a closure
- `0x10` the annotate function for the function object

> *Added in version 3.13.*

> *Changed in version 3.14.*
> Added `0x10` to indicate the annotate function for the function object.

### opcode `BUILD_SLICE (argc)`

Pushes a slice object on the stack.  *argc* must be 2 or 3.  If it is 2, implements:

```
end = STACK.pop()
start = STACK.pop()
STACK.append(slice(start, end))
```

if it is 3, implements:

```
step = STACK.pop()
end = STACK.pop()
start = STACK.pop()
STACK.append(slice(start, end, step))
```

See the `slice()` built-in function for more information.

### opcode `EXTENDED_ARG (ext)`

Prefixes any opcode which has an argument too big to fit into the default one
byte. *ext* holds an additional byte which act as higher bits in the argument.
For each opcode, at most three prefixal `EXTENDED_ARG` are allowed, forming
an argument from two-byte to four-byte.

### opcode `CONVERT_VALUE (oparg)`

Convert value to a string, depending on `oparg`:

```
value = STACK.pop()
result = func(value)
STACK.append(result)
```

- `oparg == 1`: call `str()` on *value*
- `oparg == 2`: call `repr()` on *value*
- `oparg == 3`: call `ascii()` on *value*

Used for implementing formatted string literals (f-strings).

> *Added in version 3.13.*

### opcode `FORMAT_SIMPLE`

Formats the value on top of stack:

```
value = STACK.pop()
result = value.__format__("")
STACK.append(result)
```

Used for implementing formatted string literals (f-strings).

> *Added in version 3.13.*

### opcode `FORMAT_WITH_SPEC`

Formats the given value with the given format spec:

```
spec = STACK.pop()
value = STACK.pop()
result = value.__format__(spec)
STACK.append(result)
```

Used for implementing formatted string literals (f-strings).

> *Added in version 3.13.*

### opcode `MATCH_CLASS (count)`

`STACK[-1]` is a tuple of keyword attribute names, `STACK[-2]` is the class
being matched against, and `STACK[-3]` is the match subject.  *count* is the
number of positional sub-patterns.

Pop `STACK[-1]`, `STACK[-2]`, and `STACK[-3]`. If `STACK[-3]` is an
instance of `STACK[-2]` and has the positional and keyword attributes
required by *count* and `STACK[-1]`, push a tuple of extracted attributes.
Otherwise, push `None`.

> *Added in version 3.10.*

> *Changed in version 3.11.*
> Previously, this instruction also pushed a boolean value indicating
> success (`True`) or failure (`False`).

### opcode `RESUME (context)`

A no-op. Performs internal tracing, debugging and optimization checks.

The `context` operand consists of two parts. The lowest two bits
indicate where the `RESUME` occurs:

- `0` The start of a function, which is neither a generator, coroutine
nor an async generator
- `1` After a `yield` expression
- `2` After a `yield from` expression
- `3` After an `await` expression

The next bit is `1` if the RESUME is at except-depth `1`, and `0`
otherwise.

> *Added in version 3.11.*

> *Changed in version 3.13.*
> The oparg value changed to include information about except-depth

### opcode `RETURN_GENERATOR`

Create a generator, coroutine, or async generator from the current frame.
Used as first opcode of in code object for the above mentioned callables.
Clear the current frame and return the newly created generator.

> *Added in version 3.11.*

### opcode `SEND (delta)`

Equivalent to `STACK[-1] = STACK[-2].send(STACK[-1])`. Used in `yield from`
and `await` statements.

If the call raises `StopIteration`, pop the top value from the stack,
push the exception's `value` attribute, and increment the bytecode counter
by *delta*.

> *Added in version 3.11.*

### opcode `HAVE_ARGUMENT`

This is not really an opcode.  It identifies the dividing line between
opcodes in the range [0,255] which don't use their argument and those
that do (`< HAVE_ARGUMENT` and `>= HAVE_ARGUMENT`, respectively).

If your application uses pseudo instructions or specialized instructions,
use the `hasarg` collection instead.

> *Changed in version 3.6.*
> Now every instruction has an argument, but opcodes `< HAVE_ARGUMENT`
> ignore it. Before, only opcodes `>= HAVE_ARGUMENT` had an argument.

> *Changed in version 3.12.*
> Pseudo instructions were added to the `dis` module, and for them
> it is not true that comparison with `HAVE_ARGUMENT` indicates whether
> they use their arg.

> *Deprecated since version 3.13.*
> Use `hasarg` instead.

### opcode `CALL_INTRINSIC_1`

Calls an intrinsic function with one argument. Passes `STACK[-1]` as the
argument and sets `STACK[-1]` to the result. Used to implement
functionality that is not performance critical.

The operand determines which intrinsic function is called:

```text
+-----------------------------------+-----------------------------------+
| Operand                           | Description                       |
+===================================+===================================+
| ``INTRINSIC_1_INVALID``           | Not valid                         |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_PRINT``               | Prints the argument to standard   |
|                                   | out. Used in the REPL.            |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_IMPORT_STAR``         | Performs ``import *`` for the     |
|                                   | named module.                     |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_STOPITERATION_ERROR`` | Extracts the return value from a  |
|                                   | ``StopIteration`` exception.      |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_ASYNC_GEN_WRAP``      | Wraps an async generator value    |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_UNARY_POSITIVE``      | Performs the unary ``+``          |
|                                   | operation                         |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_LIST_TO_TUPLE``       | Converts a list to a tuple        |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_TYPEVAR``             | Creates a :class:`typing.TypeVar` |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_PARAMSPEC``           | Creates a                         |
|                                   | :class:`typing.ParamSpec`         |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_TYPEVARTUPLE``        | Creates a                         |
|                                   | :class:`typing.TypeVarTuple`      |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_SUBSCRIPT_GENERIC``   | Returns :class:`typing.Generic`   |
|                                   | subscripted with the argument     |
+-----------------------------------+-----------------------------------+
| ``INTRINSIC_TYPEALIAS``           | Creates a                         |
|                                   | :class:`typing.TypeAliasType`;    |
|                                   | used in the :keyword:`type`       |
|                                   | statement. The argument is a tuple|
|                                   | of the type alias's name,         |
|                                   | type parameters, and value.       |
+-----------------------------------+-----------------------------------+
```

> *Added in version 3.12.*

### opcode `CALL_INTRINSIC_2`

Calls an intrinsic function with two arguments. Used to implement functionality
that is not performance critical:

```
arg2 = STACK.pop()
arg1 = STACK.pop()
result = intrinsic2(arg1, arg2)
STACK.append(result)
```

The operand determines which intrinsic function is called:

```text
+----------------------------------------+-----------------------------------+
| Operand                                | Description                       |
+========================================+===================================+
| ``INTRINSIC_2_INVALID``                | Not valid                         |
+----------------------------------------+-----------------------------------+
| ``INTRINSIC_PREP_RERAISE_STAR``        | Calculates the                    |
|                                        | :exc:`ExceptionGroup` to raise    |
|                                        | from a ``try-except*``.           |
+----------------------------------------+-----------------------------------+
| ``INTRINSIC_TYPEVAR_WITH_BOUND``       | Creates a :class:`typing.TypeVar` |
|                                        | with a bound.                     |
+----------------------------------------+-----------------------------------+
| ``INTRINSIC_TYPEVAR_WITH_CONSTRAINTS`` | Creates a                         |
|                                        | :class:`typing.TypeVar` with      |
|                                        | constraints.                      |
+----------------------------------------+-----------------------------------+
| ``INTRINSIC_SET_FUNCTION_TYPE_PARAMS`` | Sets the ``__type_params__``      |
|                                        | attribute of a function.          |
+----------------------------------------+-----------------------------------+
```

> *Added in version 3.12.*

### opcode `LOAD_SPECIAL`

Performs special method lookup on `STACK[-1]`.
If `type(STACK[-1]).__xxx__` is a method, leave
`type(STACK[-1]).__xxx__; STACK[-1]` on the stack.
If `type(STACK[-1]).__xxx__` is not a method, leave
`STACK[-1].__xxx__; NULL` on the stack.

> *Added in version 3.14.*

**Pseudo-instructions**

These opcodes do not appear in Python bytecode. They are used by the compiler
but are replaced by real opcodes or removed before bytecode is generated.

### opcode `SETUP_FINALLY (target)`

Set up an exception handler for the following code block. If an exception
occurs, the value stack level is restored to its current state and control
is transferred to the exception handler at `target`.

### opcode `SETUP_CLEANUP (target)`

Like `SETUP_FINALLY`, but in case of an exception also pushes the last
instruction (`lasti`) to the stack so that `RERAISE` can restore it.
If an exception occurs, the value stack level and the last instruction on
the frame are restored to their current state, and control is transferred
to the exception handler at `target`.

### opcode `SETUP_WITH (target)`

Like `SETUP_CLEANUP`, but in case of an exception one more item is popped
from the stack before control is transferred to the exception handler at
`target`.

This variant is used in `with` and `async with`
constructs, which push the return value of the context manager's
`__enter__() or aenter__()` to the stack.

### opcode `POP_BLOCK`

Marks the end of the code block associated with the last `SETUP_FINALLY`,
`SETUP_CLEANUP` or `SETUP_WITH`.

### opcode `JUMP`

```python
JUMP_NO_INTERRUPT
```

Undirected relative jump instructions which are replaced by their
directed (forward/backward) counterparts by the assembler.

### opcode `JUMP_IF_TRUE`

```python
JUMP_IF_FALSE
```

Conditional jumps which do not impact the stack. Replaced by the sequence
`COPY 1`, `TO_BOOL`, `POP_JUMP_IF_TRUE/FALSE`.

### opcode `LOAD_CLOSURE (i)`

Pushes a reference to the cell contained in slot `i` of the "fast locals"
storage.

Note that `LOAD_CLOSURE` is replaced with `LOAD_FAST` in the assembler.

> *Changed in version 3.13.*
> This opcode is now a pseudo-instruction.

## Opcode collections

These collections are provided for automatic introspection of bytecode
instructions:

> *Changed in version 3.12.*
> The collections now contain pseudo instructions and instrumented
> instructions as well. These are opcodes with values `>= MIN_PSEUDO_OPCODE`
> and `>= MIN_INSTRUMENTED_OPCODE`.

### `opname`

Sequence of operation names, indexable using the bytecode.

### `opmap`

Dictionary mapping operation names to bytecodes.

### `cmp_op`

Sequence of all compare operation names.

### `hasarg`

Sequence of bytecodes that use their argument.

> *Added in version 3.12.*

### `hasconst`

Sequence of bytecodes that access a constant.

### `hasfree`

Sequence of bytecodes that access a free (closure) variable.
'free' in this context refers to names in the current scope that are
referenced by inner scopes or names in outer scopes that are referenced
from this scope.  It does *not* include references to global or builtin scopes.

### `hasname`

Sequence of bytecodes that access an attribute by name.

### `hasjump`

Sequence of bytecodes that have a jump target. All jumps
are relative.

> *Added in version 3.13.*

### `haslocal`

Sequence of bytecodes that access a local variable.

### `hascompare`

Sequence of bytecodes of Boolean operations.

### `hasexc`

Sequence of bytecodes that set an exception handler.

> *Added in version 3.12.*

### `hasjrel`

Sequence of bytecodes that have a relative jump target.

> *Deprecated since version 3.13.*
> All jumps are now relative. Use `hasjump`.

### `hasjabs`

Sequence of bytecodes that have an absolute jump target.

> *Deprecated since version 3.13.*
> All jumps are now relative. This list is empty.
