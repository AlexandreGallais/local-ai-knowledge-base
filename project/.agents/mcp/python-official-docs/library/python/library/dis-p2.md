---
title: "dis --- Disassembler for Python bytecode (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/dis.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# dis --- Disassembler for Python bytecode (part 2 of 4)

## Python Bytecode Instructions

The `get_instructions()` function and `Bytecode` class provide
details of bytecode instructions as `Instruction` instances:

### class `Instruction`

Details for a bytecode operation

### `opcode`

numeric code for operation, corresponding to the opcode values listed
below and the bytecode values in the opcode_collections.

### `opname`

human readable name for operation

### `baseopcode`

numeric code for the base operation if operation is specialized;
otherwise equal to `opcode`

### `baseopname`

human readable name for the base operation if operation is specialized;
otherwise equal to `opname`

### `arg`

numeric argument to operation (if any), otherwise `None`

### `oparg`

alias for `arg`

### `argval`

resolved arg value (if any), otherwise `None`

### `argrepr`

human readable description of operation argument (if any),
otherwise an empty string.

### `offset`

start index of operation within bytecode sequence

### `start_offset`

start index of operation within bytecode sequence, including prefixed
`EXTENDED_ARG` operations if present; otherwise equal to `offset`

### `cache_offset`

start index of the cache entries following the operation

### `end_offset`

end index of the cache entries following the operation

### `starts_line`

`True` if this opcode starts a source line, otherwise `False`

### `line_number`

source line number associated with this opcode (if any), otherwise `None`

### `is_jump_target`

`True` if other code jumps to here, otherwise `False`

### `jump_target`

bytecode index of the jump target if this is a jump operation,
otherwise `None`

### `positions`

`dis.Positions` object holding the
start and end locations that are covered by this instruction.

### `cache_info`

Information about the cache entries of this instruction, as
triplets of the form `(name, size, data)`, where the `name`
and `size` describe the cache format and data is the contents
of the cache. `cache_info` is `None` if the instruction does not have
caches.

> *Added in version 3.4.*

> *Changed in version 3.11.*
> Field `positions` is added.

> *Changed in version 3.13.*
> Changed field `starts_line`.
>
> Added fields `start_offset`, `cache_offset`, `end_offset`,
> `baseopname`, `baseopcode`, `jump_target`, `oparg`,
> `line_number` and `cache_info`.

### class `Positions`

In case the information is not available, some fields might be `None`.

### `end_col_offset`

> *Added in version 3.11.*

The Python compiler currently generates the following bytecode instructions.

**General instructions**

In the following, We will refer to the interpreter stack as `STACK` and describe
operations on it as if it was a Python list. The top of the stack corresponds to
`STACK[-1]` in this language.

### opcode `NOP`

Do nothing code.  Used as a placeholder by the bytecode optimizer, and to
generate line tracing events.

### opcode `NOT_TAKEN`

Do nothing code.
Used by the interpreter to record BRANCH_LEFT
and BRANCH_RIGHT events for `sys.monitoring`.

> *Added in version 3.14.*

### opcode `POP_ITER`

Removes the iterator from the top of the stack.

> *Added in version 3.14.*

### opcode `POP_TOP`

Removes the top-of-stack item:

```
STACK.pop()
```

### opcode `END_FOR`

Removes the top-of-stack item.
Equivalent to `POP_TOP`.
Used to clean up at the end of loops, hence the name.

> *Added in version 3.12.*

### opcode `END_SEND`

Implements `del STACK[-2]`.
Used to clean up when a generator exits.

> *Added in version 3.12.*

### opcode `COPY (i)`

Push the i-th item to the top of the stack without removing it from its original
location:

```
assert i > 0
STACK.append(STACK[-i])
```

> *Added in version 3.11.*

### opcode `SWAP (i)`

Swap the top of the stack with the i-th element:

```
STACK[-i], STACK[-1] = STACK[-1], STACK[-i]
```

> *Added in version 3.11.*

### opcode `CACHE`

Rather than being an actual instruction, this opcode is used to mark extra
space for the interpreter to cache useful data directly in the bytecode
itself. It is automatically hidden by all `dis` utilities, but can be
viewed with `show_caches=True`.

Logically, this space is part of the preceding instruction. Many opcodes
expect to be followed by an exact number of caches, and will instruct the
interpreter to skip over them at runtime.

Populated caches can look like arbitrary instructions, so great care should
be taken when reading or modifying raw, adaptive bytecode containing
quickened data.

> *Added in version 3.11.*

**Unary operations**

Unary operations take the top of the stack, apply the operation, and push the
result back on the stack.

### opcode `UNARY_NEGATIVE`

Implements `STACK[-1] = -STACK[-1]`.

### opcode `UNARY_NOT`

Implements `STACK[-1] = not STACK[-1]`.

> *Changed in version 3.13.*
> This instruction now requires an exact `bool` operand.

### opcode `UNARY_INVERT`

Implements `STACK[-1] = ~STACK[-1]`.

### opcode `GET_ITER`

Implements `STACK[-1] = iter(STACK[-1])`.

### opcode `GET_YIELD_FROM_ITER`

If `STACK[-1]` is a generator iterator or coroutine object
it is left as is.  Otherwise, implements `STACK[-1] = iter(STACK[-1])`.

> *Added in version 3.5.*

### opcode `TO_BOOL`

Implements `STACK[-1] = bool(STACK[-1])`.

> *Added in version 3.13.*

**Binary and in-place operations**

Binary operations remove the top two items from the stack (`STACK[-1]` and
`STACK[-2]`). They perform the operation, then put the result back on the stack.

In-place operations are like binary operations, but the operation is done in-place
when `STACK[-2]` supports it, and the resulting `STACK[-1]` may be (but does
not have to be) the original `STACK[-2]`.

### opcode `BINARY_OP (op)`

Implements the binary and in-place operators (depending on the value of
*op*):

```
rhs = STACK.pop()
lhs = STACK.pop()
STACK.append(lhs op rhs)
```

> *Added in version 3.11.*

> *Changed in version 3.14.*
> With oparg :`NB_SUBSCR`, implements binary subscript (replaces opcode `BINARY_SUBSCR`)

### opcode `STORE_SUBSCR`

Implements:

```
key = STACK.pop()
container = STACK.pop()
value = STACK.pop()
container[key] = value
```

### opcode `DELETE_SUBSCR`

Implements:

```
key = STACK.pop()
container = STACK.pop()
del container[key]
```

### opcode `BINARY_SLICE`

Implements:

```
end = STACK.pop()
start = STACK.pop()
container = STACK.pop()
STACK.append(container[start:end])
```

> *Added in version 3.12.*

### opcode `STORE_SLICE`

Implements:

```
end = STACK.pop()
start = STACK.pop()
container = STACK.pop()
value = STACK.pop()
container[start:end] = value
```

> *Added in version 3.12.*

**Coroutine opcodes**

### opcode `GET_AWAITABLE (where)`

Implements `STACK[-1] = get_awaitable(STACK[-1])`, where `get_awaitable(o)`
returns `o` if `o` is a coroutine object or a generator object with
the `CO_ITERABLE_COROUTINE` flag, or resolves
`o.__await__`.

If the `where` operand is nonzero, it indicates where the instruction
occurs:

- `1`: After a call to `__aenter__`
- `2`: After a call to `__aexit__`

> *Added in version 3.5.*

> *Changed in version 3.11.*
> Previously, this instruction did not have an oparg.

### opcode `GET_AITER`

Implements `STACK[-1] = STACK[-1].__aiter__()`.

> *Added in version 3.5.*

> *Changed in version 3.7.*
> Returning awaitable objects from `__aiter__` is no longer
> supported.

### opcode `GET_ANEXT`

Implement `STACK.append(get_awaitable(STACK[-1].__anext__()))` to the stack.
See `GET_AWAITABLE` for details about `get_awaitable`.

> *Added in version 3.5.*

### opcode `END_ASYNC_FOR`

Terminates an `async for` loop.  Handles an exception raised
when awaiting a next item. The stack contains the async iterable in
`STACK[-2]` and the raised exception in `STACK[-1]`. Both are popped.
If the exception is not `StopAsyncIteration`, it is re-raised.

> *Added in version 3.8.*

> *Changed in version 3.11.*
> Exception representation on the stack now consist of one, not three, items.

### opcode `CLEANUP_THROW`

Handles an exception raised during a `throw()` or
`close()` call through the current frame.  If `STACK[-1]` is an
instance of `StopIteration`, pop three values from the stack and push
its `value` member.  Otherwise, re-raise `STACK[-1]`.

> *Added in version 3.12.*

**Miscellaneous opcodes**

### opcode `SET_ADD (i)`

Implements:

```
item = STACK.pop()
set.add(STACK[-i], item)
```

Used to implement set comprehensions.

### opcode `LIST_APPEND (i)`

Implements:

```
item = STACK.pop()
list.append(STACK[-i], item)
```

Used to implement list comprehensions.

### opcode `MAP_ADD (i)`

Implements:

```
value = STACK.pop()
key = STACK.pop()
dict.__setitem__(STACK[-i], key, value)
```

Used to implement dict comprehensions.

> *Added in version 3.1.*

> *Changed in version 3.8.*
> Map value is `STACK[-1]` and map key is `STACK[-2]`. Before, those
> were reversed.

For all of the `SET_ADD`, `LIST_APPEND` and `MAP_ADD`
instructions, while the added value or key/value pair is popped off, the
container object remains on the stack so that it is available for further
iterations of the loop.

### opcode `RETURN_VALUE`

Returns with `STACK[-1]` to the caller of the function.

### opcode `YIELD_VALUE`

Yields `STACK.pop()` from a generator.

> *Changed in version 3.11.*
> oparg set to be the stack depth.

> *Changed in version 3.12.*
> oparg set to be the exception block depth, for efficient closing of generators.

> *Changed in version 3.13.*
> oparg is `1` if this instruction is part of a yield-from or await, and `0`
> otherwise.

### opcode `SETUP_ANNOTATIONS`

Checks whether `__annotations__` is defined in `locals()`, if not it is
set up to an empty `dict`. This opcode is only emitted if a class
or module body contains variable annotations
statically.

> *Added in version 3.6.*

### opcode `POP_EXCEPT`

Pops a value from the stack, which is used to restore the exception state.

> *Changed in version 3.11.*
> Exception representation on the stack now consist of one, not three, items.

### opcode `RERAISE`

Re-raises the exception currently on top of the stack. If oparg is non-zero,
pops an additional value from the stack which is used to set
`f_lasti` of the current frame.

> *Added in version 3.9.*

> *Changed in version 3.11.*
> Exception representation on the stack now consist of one, not three, items.

### opcode `PUSH_EXC_INFO`

Pops a value from the stack. Pushes the current exception to the top of the stack.
Pushes the value originally popped back to the stack.
Used in exception handlers.

> *Added in version 3.11.*

### opcode `CHECK_EXC_MATCH`

Performs exception matching for `except`. Tests whether the `STACK[-2]`
is an exception matching `STACK[-1]`. Pops `STACK[-1]` and pushes the boolean
result of the test.

> *Added in version 3.11.*

### opcode `CHECK_EG_MATCH`

Performs exception matching for `except*`. Applies `split(STACK[-1])` on
the exception group representing `STACK[-2]`.

In case of a match, pops two items from the stack and pushes the
non-matching subgroup (`None` in case of full match) followed by the
matching subgroup. When there is no match, pops one item (the match
type) and pushes `None`.

> *Added in version 3.11.*

### opcode `WITH_EXCEPT_START`

Calls the function in position 4 on the stack with arguments (type, val, tb)
representing the exception at the top of the stack.
Used to implement the call `context_manager.__exit__(*exc_info())` when an exception
has occurred in a `with` statement.

> *Added in version 3.9.*

> *Changed in version 3.11.*
> The `__exit__` function is in position 4 of the stack rather than 7.
> Exception representation on the stack now consist of one, not three, items.

### opcode `LOAD_COMMON_CONSTANT`

Pushes a common constant onto the stack. The interpreter contains a hardcoded
list of constants supported by this instruction.  Used by the `assert`
statement to load `AssertionError`.

> *Added in version 3.14.*

### opcode `LOAD_BUILD_CLASS`

Pushes `builtins.__build_class__()` onto the stack.  It is later called
to construct a class.

### opcode `GET_LEN`

Perform `STACK.append(len(STACK[-1]))`. Used in `match` statements where
comparison with structure of pattern is needed.

> *Added in version 3.10.*

### opcode `MATCH_MAPPING`

If `STACK[-1]` is an instance of `collections.abc.Mapping` (or, more
technically: if it has the `Py_TPFLAGS_MAPPING` flag set in its
`tp_flags`), push `True` onto the stack.  Otherwise,
push `False`.

> *Added in version 3.10.*

### opcode `MATCH_SEQUENCE`

If `STACK[-1]` is an instance of `collections.abc.Sequence` and is *not* an instance
of `str`/`bytes`/`bytearray` (or, more technically: if it has
the `Py_TPFLAGS_SEQUENCE` flag set in its `tp_flags`),
push `True` onto the stack.  Otherwise, push `False`.

> *Added in version 3.10.*

### opcode `MATCH_KEYS`

`STACK[-1]` is a tuple of mapping keys, and `STACK[-2]` is the match subject.
If `STACK[-2]` contains all of the keys in `STACK[-1]`, push a `tuple`
containing the corresponding values. Otherwise, push `None`.

> *Added in version 3.10.*

> *Changed in version 3.11.*
> Previously, this instruction also pushed a boolean value indicating
> success (`True`) or failure (`False`).

### opcode `STORE_NAME (namei)`

Implements `name = STACK.pop()`. *namei* is the index of *name* in the attribute
`co_names` of the code object.
The compiler tries to use `STORE_FAST` or `STORE_GLOBAL` if possible.

### opcode `DELETE_NAME (namei)`

Implements `del name`, where *namei* is the index into `co_names`
attribute of the code object.

### opcode `UNPACK_SEQUENCE (count)`

Unpacks `STACK[-1]` into *count* individual values, which are put onto the stack
right-to-left. Require there to be exactly *count* values.:

```
assert(len(STACK[-1]) == count)
STACK.extend(STACK.pop()[:-count-1:-1])
```

### opcode `UNPACK_EX (counts)`

Implements assignment with a starred target: Unpacks an iterable in `STACK[-1]`
into individual values, where the total number of values can be smaller than the
number of items in the iterable: one of the new values will be a list of all
leftover items.

The number of values before and after the list value is limited to 255.

The number of values before the list value is encoded in the argument of the
opcode. The number of values after the list if any is encoded using an
`EXTENDED_ARG`. As a consequence, the argument can be seen as a two bytes values
where the low byte of *counts* is the number of values before the list value, the
high byte of *counts* the number of values after it.

The extracted values are put onto the stack right-to-left, i.e. `a, *b, c = d`
will be stored after execution as `STACK.extend((a, b, c))`.

### opcode `STORE_ATTR (namei)`

Implements:

```
obj = STACK.pop()
value = STACK.pop()
obj.name = value
```

where *namei* is the index of name in `co_names` of the
code object.

### opcode `DELETE_ATTR (namei)`

Implements:

```
obj = STACK.pop()
del obj.name
```

where *namei* is the index of name into `co_names` of the
code object.
