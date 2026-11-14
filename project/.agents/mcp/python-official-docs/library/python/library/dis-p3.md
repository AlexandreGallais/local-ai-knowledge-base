---
title: "dis --- Disassembler for Python bytecode (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/dis.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# dis --- Disassembler for Python bytecode (part 3 of 4)

### opcode `STORE_GLOBAL (namei)`

Works as `STORE_NAME`, but stores the name as a global.

### opcode `DELETE_GLOBAL (namei)`

Works as `DELETE_NAME`, but deletes a global name.

### opcode `LOAD_CONST (consti)`

Pushes `co_consts[consti]` onto the stack.

### opcode `LOAD_SMALL_INT (i)`

Pushes the integer `i` onto the stack.
`i` must be in `range(256)`

> *Added in version 3.14.*

### opcode `LOAD_NAME (namei)`

Pushes the value associated with `co_names[namei]` onto the stack.
The name is looked up within the locals, then the globals, then the builtins.

### opcode `LOAD_LOCALS`

Pushes a reference to the locals dictionary onto the stack.  This is used
to prepare namespace dictionaries for `LOAD_FROM_DICT_OR_DEREF`
and `LOAD_FROM_DICT_OR_GLOBALS`.

> *Added in version 3.12.*

### opcode `LOAD_FROM_DICT_OR_GLOBALS (i)`

Pops a mapping off the stack and looks up the value for `co_names[namei]`.
If the name is not found there, looks it up in the globals and then the builtins,
similar to `LOAD_GLOBAL`.
This is used for loading global variables in
annotation scopes within class bodies.

> *Added in version 3.12.*

### opcode `BUILD_TEMPLATE`

Constructs a new `Template` instance from a tuple
of strings and a tuple of interpolations and pushes the resulting object
onto the stack:

```
interpolations = STACK.pop()
strings = STACK.pop()
STACK.append(_build_template(strings, interpolations))
```

> *Added in version 3.14.*

### opcode `BUILD_INTERPOLATION (format)`

Constructs a new `Interpolation` instance from a
value and its source expression and pushes the resulting object onto the
stack.

If no conversion or format specification is present, `format` is set to
`2`.

If the low bit of `format` is set, it indicates that the interpolation
contains a format specification.

If `format >> 2` is non-zero, it indicates that the interpolation
contains a conversion. The value of `format >> 2` is the conversion type
(`0` for no conversion, `1` for `!s`, `2` for `!r`, and
`3` for `!a`):

```
conversion = format >> 2
if format & 1:
    format_spec = STACK.pop()
else:
    format_spec = None
expression = STACK.pop()
value = STACK.pop()
STACK.append(_build_interpolation(value, expression, conversion, format_spec))
```

> *Added in version 3.14.*

### opcode `BUILD_TUPLE (count)`

Creates a tuple consuming *count* items from the stack, and pushes the
resulting tuple onto the stack:

```
if count == 0:
    value = ()
else:
    value = tuple(STACK[-count:])
    STACK = STACK[:-count]

STACK.append(value)
```

### opcode `BUILD_LIST (count)`

Works as `BUILD_TUPLE`, but creates a list.

### opcode `BUILD_SET (count)`

Works as `BUILD_TUPLE`, but creates a set.

### opcode `BUILD_MAP (count)`

Pushes a new dictionary object onto the stack.  Pops `2 * count` items
so that the dictionary holds *count* entries:
`{..., STACK[-4]: STACK[-3], STACK[-2]: STACK[-1]}`.

> *Changed in version 3.5.*
> The dictionary is created from stack items instead of creating an
> empty dictionary pre-sized to hold *count* items.

### opcode `BUILD_STRING (count)`

Concatenates *count* strings from the stack and pushes the resulting string
onto the stack.

> *Added in version 3.6.*

### opcode `LIST_EXTEND (i)`

Implements:

```
seq = STACK.pop()
list.extend(STACK[-i], seq)
```

Used to build lists.

> *Added in version 3.9.*

### opcode `SET_UPDATE (i)`

Implements:

```
seq = STACK.pop()
set.update(STACK[-i], seq)
```

Used to build sets.

> *Added in version 3.9.*

### opcode `DICT_UPDATE (i)`

Implements:

```
map = STACK.pop()
dict.update(STACK[-i], map)
```

Used to build dicts.

> *Added in version 3.9.*

### opcode `DICT_MERGE (i)`

Like `DICT_UPDATE` but raises an exception for duplicate keys.

> *Added in version 3.9.*

### opcode `LOAD_ATTR (namei)`

If the low bit of `namei` is not set, this replaces `STACK[-1]` with
`getattr(STACK[-1], co_names[namei>>1])`.

If the low bit of `namei` is set, this will attempt to load a method named
`co_names[namei>>1]` from the `STACK[-1]` object. `STACK[-1]` is popped.
This bytecode distinguishes two cases: if `STACK[-1]` has a method with the
correct name, the bytecode pushes the unbound method and `STACK[-1]`.
`STACK[-1]` will be used as the first argument (`self`) by `CALL`
or `CALL_KW` when calling the unbound method.
Otherwise, `NULL` and the object returned by
the attribute lookup are pushed.

> *Changed in version 3.12.*
> If the low bit of `namei` is set, then a `NULL` or `self` is
> pushed to the stack before the attribute or unbound method respectively.

### opcode `LOAD_SUPER_ATTR (namei)`

This opcode implements `super()`, both in its zero-argument and
two-argument forms (e.g. `super().method()`, `super().attr` and
`super(cls, self).method()`, `super(cls, self).attr`).

It pops three values from the stack (from top of stack down):

- `self`: the first argument to the current method
- `cls`: the class within which the current method was defined
- the global `super`

With respect to its argument, it works similarly to `LOAD_ATTR`,
except that `namei` is shifted left by 2 bits instead of 1.

The low bit of `namei` signals to attempt a method load, as with
`LOAD_ATTR`, which results in pushing `NULL` and the loaded method.
When it is unset a single value is pushed to the stack.

The second-low bit of `namei`, if set, means that this was a two-argument
call to `super()` (unset means zero-argument).

> *Added in version 3.12.*

### opcode `COMPARE_OP (opname)`

Performs a Boolean operation.  The operation name can be found in
`cmp_op[opname >> 5]`. If the fifth-lowest bit of `opname` is set
(`opname & 16`), the result should be coerced to `bool`.

> *Changed in version 3.13.*
> The fifth-lowest bit of the oparg now indicates a forced conversion to
> `bool`.

### opcode `IS_OP (invert)`

Performs `is` comparison, or `is not` if `invert` is 1.

> *Added in version 3.9.*

### opcode `CONTAINS_OP (invert)`

Performs `in` comparison, or `not in` if `invert` is 1.

> *Added in version 3.9.*

### opcode `IMPORT_NAME (namei)`

Imports the module `co_names[namei]`.  `STACK[-1]` and `STACK[-2]` are
popped and provide the *fromlist* and *level* arguments of `__import__()`.
The module object is pushed onto the stack.  The current namespace is not affected: for a proper import statement, a subsequent `STORE_FAST` instruction
modifies the namespace.

### opcode `IMPORT_FROM (namei)`

Loads the attribute `co_names[namei]` from the module found in `STACK[-1]`.
The resulting object is pushed onto the stack, to be subsequently stored by a
`STORE_FAST` instruction.

### opcode `JUMP_FORWARD (delta)`

Increments bytecode counter by *delta*.

### opcode `JUMP_BACKWARD (delta)`

Decrements bytecode counter by *delta*. Checks for interrupts.

> *Added in version 3.11.*

### opcode `JUMP_BACKWARD_NO_INTERRUPT (delta)`

Decrements bytecode counter by *delta*. Does not check for interrupts.

> *Added in version 3.11.*

### opcode `POP_JUMP_IF_TRUE (delta)`

If `STACK[-1]` is true, increments the bytecode counter by *delta*.
`STACK[-1]` is popped.

> *Changed in version 3.11.*
> The oparg is now a relative delta rather than an absolute target.
> This opcode is a pseudo-instruction, replaced in final bytecode by
> the directed versions (forward/backward).

> *Changed in version 3.12.*
> This is no longer a pseudo-instruction.

> *Changed in version 3.13.*
> This instruction now requires an exact `bool` operand.

### opcode `POP_JUMP_IF_FALSE (delta)`

If `STACK[-1]` is false, increments the bytecode counter by *delta*.
`STACK[-1]` is popped.

> *Changed in version 3.11.*
> The oparg is now a relative delta rather than an absolute target.
> This opcode is a pseudo-instruction, replaced in final bytecode by
> the directed versions (forward/backward).

> *Changed in version 3.12.*
> This is no longer a pseudo-instruction.

> *Changed in version 3.13.*
> This instruction now requires an exact `bool` operand.

### opcode `POP_JUMP_IF_NOT_NONE (delta)`

If `STACK[-1]` is not `None`, increments the bytecode counter by *delta*.
`STACK[-1]` is popped.

> *Added in version 3.11.*

> *Changed in version 3.12.*
> This is no longer a pseudo-instruction.

### opcode `POP_JUMP_IF_NONE (delta)`

If `STACK[-1]` is `None`, increments the bytecode counter by *delta*.
`STACK[-1]` is popped.

> *Added in version 3.11.*

> *Changed in version 3.12.*
> This is no longer a pseudo-instruction.

### opcode `FOR_ITER (delta)`

`STACK[-1]` is an iterator.  Call its `__next__()` method.
If this yields a new value, push it on the stack (leaving the iterator below
it).  If the iterator indicates it is exhausted then the byte code counter is
incremented by *delta*.

> *Changed in version 3.12.*
> Up until 3.11 the iterator was popped when it was exhausted.

### opcode `LOAD_GLOBAL (namei)`

Loads the global named `co_names[namei>>1]` onto the stack.
If the low bit of `namei` is set, a `NULL` is pushed onto the stack
after the global variable.

> *Changed in version 3.11.*
> The low bit of `namei` indicates whether a `NULL` is pushed.

> *Changed in version 3.13.*
> The `NULL` is pushed after the global variable, rather than before it.

### opcode `LOAD_FAST (var_num)`

Pushes a reference to the local `co_varnames[var_num]` onto the stack.

> *Changed in version 3.12.*
> This opcode is now only used in situations where the local variable is
> guaranteed to be initialized. It cannot raise `UnboundLocalError`.

### opcode `LOAD_FAST_BORROW (var_num)`

Pushes a borrowed reference to the local `co_varnames[var_num]` onto the
stack.

> *Added in version 3.14.*

### opcode `LOAD_FAST_LOAD_FAST (var_nums)`

Pushes references to `co_varnames[var_nums >> 4]` and
`co_varnames[var_nums & 15]` onto the stack.

> *Added in version 3.13.*

### opcode `LOAD_FAST_BORROW_LOAD_FAST_BORROW (var_nums)`

Pushes borrowed references to `co_varnames[var_nums >> 4]` and
`co_varnames[var_nums & 15]` onto the stack.

> *Added in version 3.14.*

### opcode `LOAD_FAST_CHECK (var_num)`

Pushes a reference to the local `co_varnames[var_num]` onto the stack,
raising an `UnboundLocalError` if the local variable has not been
initialized.

> *Added in version 3.12.*

### opcode `LOAD_FAST_AND_CLEAR (var_num)`

Pushes a reference to the local `co_varnames[var_num]` onto the stack (or
pushes `NULL` onto the stack if the local variable has not been
initialized) and sets `co_varnames[var_num]` to `NULL`.

> *Added in version 3.12.*

### opcode `STORE_FAST (var_num)`

Stores `STACK.pop()` into the local `co_varnames[var_num]`.

### opcode `STORE_FAST_STORE_FAST (var_nums)`

Stores `STACK[-1]` into `co_varnames[var_nums >> 4]`
and `STACK[-2]` into `co_varnames[var_nums & 15]`.

> *Added in version 3.13.*

### opcode `STORE_FAST_LOAD_FAST (var_nums)`

Stores `STACK.pop()` into the local `co_varnames[var_nums >> 4]`
and pushes a reference to the local `co_varnames[var_nums & 15]`
onto the stack.

> *Added in version 3.13.*

### opcode `DELETE_FAST (var_num)`

Deletes local `co_varnames[var_num]`.

### opcode `MAKE_CELL (i)`

Creates a new cell in slot `i`.  If that slot is nonempty then
that value is stored into the new cell.

> *Added in version 3.11.*

### opcode `LOAD_DEREF (i)`

Loads the cell contained in slot `i` of the "fast locals" storage.
Pushes a reference to the object the cell contains on the stack.

> *Changed in version 3.11.*
> `i` is no longer offset by the length of `co_varnames`.

### opcode `LOAD_FROM_DICT_OR_DEREF (i)`

Pops a mapping off the stack and looks up the name associated with
slot `i` of the "fast locals" storage in this mapping.
If the name is not found there, loads it from the cell contained in
slot `i`, similar to `LOAD_DEREF`. This is used for loading
closure variables in class bodies (which previously used
`LOAD_CLASSDEREF`) and in
annotation scopes within class bodies.

> *Added in version 3.12.*

### opcode `STORE_DEREF (i)`

Stores `STACK.pop()` into the cell contained in slot `i` of the "fast locals"
storage.

> *Changed in version 3.11.*
> `i` is no longer offset by the length of `co_varnames`.

### opcode `DELETE_DEREF (i)`

Empties the cell contained in slot `i` of the "fast locals" storage.
Used by the `del` statement.

> *Added in version 3.2.*

> *Changed in version 3.11.*
> `i` is no longer offset by the length of `co_varnames`.

### opcode `COPY_FREE_VARS (n)`

Copies the `n` free (closure) variables from the closure
into the frame. Removes the need for special code on the caller's side when calling
closures.

> *Added in version 3.11.*

### opcode `RAISE_VARARGS (argc)`

Raises an exception using one of the 3 forms of the `raise` statement,
depending on the value of *argc*:

- 0: `raise` (re-raise previous exception)
- 1: `raise STACK[-1]` (raise exception instance or type at `STACK[-1]`)
- 2: `raise STACK[-2] from STACK[-1]` (raise exception instance or type at
`STACK[-2]` with `__cause__` set to `STACK[-1]`)

### opcode `CALL (argc)`

Calls a callable object with the number of arguments specified by `argc`.
On the stack are (in ascending order):

- The callable
- `self` or `NULL`
- The remaining positional arguments

`argc` is the total of the positional arguments, excluding `self`.

`CALL` pops all arguments and the callable object off the stack,
calls the callable object with those arguments, and pushes the return value
returned by the callable object.

> *Added in version 3.11.*

> *Changed in version 3.13.*
> The callable now always appears at the same position on the stack.

> *Changed in version 3.13.*
> Calls with keyword arguments are now handled by `CALL_KW`.

### opcode `CALL_KW (argc)`

Calls a callable object with the number of arguments specified by `argc`,
including one or more named arguments. On the stack are (in ascending order):

- The callable
- `self` or `NULL`
- The remaining positional arguments
- The named arguments
- A `tuple` of keyword argument names

`argc` is the total of the positional and named arguments, excluding `self`.
The length of the tuple of keyword argument names is the number of named arguments.

`CALL_KW` pops all arguments, the keyword names, and the callable object
off the stack, calls the callable object with those arguments, and pushes the
return value returned by the callable object.

> *Added in version 3.13.*

### opcode `CALL_FUNCTION_EX (flags)`

Calls a callable object with variable set of positional and keyword
arguments.  If the lowest bit of *flags* is set, the top of the stack
contains a mapping object containing additional keyword arguments.
Before the callable is called, the mapping object and iterable object
are each "unpacked" and their contents passed in as keyword and
positional arguments respectively.
`CALL_FUNCTION_EX` pops all arguments and the callable object off the stack,
calls the callable object with those arguments, and pushes the return value
returned by the callable object.

> *Added in version 3.6.*
