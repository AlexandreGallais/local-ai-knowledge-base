---
title: "dis --- Disassembler for Python bytecode (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/dis.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `dis` --- Disassembler for Python bytecode

Module `dis`.

**Source code:** Lib/dis.py

The `dis` module supports the analysis of CPython bytecode by
disassembling it. The CPython bytecode which this module takes as an input is
defined in the file `Include/opcode.h` and used by the compiler and the
interpreter.

> **CPython implementation detail:** Bytecode is an implementation detail of the CPython interpreter.  No
> guarantees are made that bytecode will not be added, removed, or changed
> between versions of Python.  Use of this module should not be considered to
> work across Python VMs or Python releases.
>
>
> > *Changed in version 3.6.*
> > Use 2 bytes for each instruction. Previously the number of bytes varied
> > by instruction.
>
>
>
> > *Changed in version 3.10.*
> > The argument of jump, exception handling and loop instructions is now
> > the instruction offset rather than the byte offset.
>
>
>
> > *Changed in version 3.11.*
> > Some instructions are accompanied by one or more inline cache entries,
> > which take the form of `CACHE` instructions. These instructions
> > are hidden by default, but can be shown by passing `show_caches=True` to
> > any `dis` utility. Furthermore, the interpreter now adapts the
> > bytecode to specialize it for different runtime conditions. The
> > adaptive bytecode can be shown by passing `adaptive=True`.
>
>
>
> > *Changed in version 3.12.*
> > The argument of a jump is the offset of the target instruction relative
> > to the instruction that appears immediately after the jump instruction's
> > `CACHE` entries.
> > As a consequence, the presence of the `CACHE` instructions is
> > transparent for forward jumps but needs to be taken into account when
> > reasoning about backward jumps.
>
>
>
> > *Changed in version 3.13.*
> > The output shows logical labels rather than instruction offsets
> > for jump targets and exception handlers. The `-O` command line
> > option and the `show_offsets` argument were added.
>
>
>
> > *Changed in version 3.14.*
> > The `-P` command-line option
> > and the `show_positions` argument were added.
> > The `-S` command-line option is added.
>

Example: Given the function `myfunc()`:

```
def myfunc(alist):
    return len(alist)
```

the following command can be used to display the disassembly of
`myfunc()`:

```python

>>> dis.dis(myfunc)
  2           RESUME                   0
<BLANKLINE>
  3           LOAD_GLOBAL              1 (len + NULL)
              LOAD_FAST_BORROW         0 (alist)
              CALL                     1
              RETURN_VALUE
```

(The "2" is a line number).

## Command-line interface

The `dis` module can be invoked as a script from the command line:

```sh
python -m dis [-h] [-C] [-O] [-P] [-S] [infile]
```

The following options are accepted:

dis

### option `-h, --help`

Display usage and exit.

### option `-C, --show-caches`

Show inline caches.

> *Added in version 3.13.*

### option `-O, --show-offsets`

Show offsets of instructions.

> *Added in version 3.13.*

### option `-P, --show-positions`

Show positions of instructions in the source code.

> *Added in version 3.14.*

### option `-S, --specialized`

Show specialized bytecode.

> *Added in version 3.14.*

If `infile` is specified, its disassembled code will be written to stdout.
Otherwise, disassembly is performed on compiled source code received from stdin.

## Bytecode analysis

> *Added in version 3.4.*

The bytecode analysis API allows pieces of Python code to be wrapped in a
`Bytecode` object that provides easy access to details of the compiled
code.

### class `Bytecode(x, *, first_line=None, current_offset=None,\`

```python
show_caches=False, adaptive=False, show_offsets=False,\
show_positions=False)
```

Analyse the bytecode corresponding to a function, generator, asynchronous
generator, coroutine, method, string of source code, or a code object (as
returned by `compile()`).

This is a convenience wrapper around many of the functions listed below, most
notably `get_instructions()`, as iterating over a `Bytecode`
instance yields the bytecode operations as `Instruction` instances.

If *first_line* is not `None`, it indicates the line number that should be
reported for the first source line in the disassembled code.  Otherwise, the
source line information (if any) is taken directly from the disassembled code
object.

If *current_offset* is not `None`, it refers to an instruction offset in the
disassembled code. Setting this means `.dis()` will display a "current
instruction" marker against the specified opcode.

If *show_caches* is `True`, `.dis()` will display inline cache
entries used by the interpreter to specialize the bytecode.

If *adaptive* is `True`, `.dis()` will display specialized bytecode
that may be different from the original bytecode.

If *show_offsets* is `True`, `.dis()` will include instruction
offsets in the output.

If *show_positions* is `True`, `.dis()` will include instruction
source code positions in the output.

### classmethod `from_traceback(tb, *, show_caches=False)`

Construct a `Bytecode` instance from the given traceback, setting
*current_offset* to the instruction responsible for the exception.

### `codeobj`

The compiled code object.

### `first_line`

The first source line of the code object (if available)

### `dis()`

Return a formatted view of the bytecode operations (the same as printed by
`dis.dis()`, but returned as a multi-line string).

### `info()`

Return a formatted multi-line string with detailed information about the
code object, like `code_info()`.

> *Changed in version 3.7.*
> This can now handle coroutine and asynchronous generator objects.

> *Changed in version 3.11.*
> Added the *show_caches* and *adaptive* parameters.

> *Changed in version 3.13.*
> Added the *show_offsets* parameter

> *Changed in version 3.14.*
> Added the *show_positions* parameter.

Example:

```python

>>> bytecode = dis.Bytecode(myfunc)
>>> for instr in bytecode:
...     print(instr.opname)
...
RESUME
LOAD_GLOBAL
LOAD_FAST_BORROW
CALL
RETURN_VALUE
```

## Analysis functions

The `dis` module also defines the following analysis functions that convert
the input directly to the desired output. They can be useful if only a single
operation is being performed, so the intermediate analysis object isn't useful:

### `code_info(x)`

Return a formatted multi-line string with detailed code object information
for the supplied function, generator, asynchronous generator, coroutine,
method, source code string or code object.

Note that the exact contents of code info strings are highly implementation
dependent and they may change arbitrarily across Python VMs or Python
releases.

> *Added in version 3.2.*

> *Changed in version 3.7.*
> This can now handle coroutine and asynchronous generator objects.

### `show_code(x, *, file=None)`

Print detailed code object information for the supplied function, method,
source code string or code object to *file* (or `sys.stdout` if *file*
is not specified).

This is a convenient shorthand for `print(code_info(x), file=file)`,
intended for interactive exploration at the interpreter prompt.

> *Added in version 3.2.*

> *Changed in version 3.4.*
> Added *file* parameter.

### `dis(x=None, *, file=None, depth=None, show_caches=False,\`

```python
adaptive=False, show_offsets=False, show_positions=False)
```

Disassemble the *x* object.  *x* can denote either a module, a class, a
method, a function, a generator, an asynchronous generator, a coroutine,
a code object, a string of source code or a byte sequence of raw bytecode.
For a module, it disassembles all functions. For a class, it disassembles
all methods (including class and static methods). For a code object or
sequence of raw bytecode, it prints one line per bytecode instruction.
It also recursively disassembles nested code objects. These can include
generator expressions, nested functions, the bodies of nested classes,
and the code objects used for annotation scopes.
Strings are first compiled to code objects with the `compile()`
built-in function before being disassembled.  If no object is provided, this
function disassembles the last traceback.

The disassembly is written as text to the supplied *file* argument if
provided and to `sys.stdout` otherwise.

The maximal depth of recursion is limited by *depth* unless it is `None`.
`depth=0` means no recursion.

If *show_caches* is `True`, this function will display inline cache
entries used by the interpreter to specialize the bytecode.

If *adaptive* is `True`, this function will display specialized bytecode
that may be different from the original bytecode.

> *Changed in version 3.4.*
> Added *file* parameter.

> *Changed in version 3.7.*
> Implemented recursive disassembling and added *depth* parameter.

> *Changed in version 3.7.*
> This can now handle coroutine and asynchronous generator objects.

> *Changed in version 3.11.*
> Added the *show_caches* and *adaptive* parameters.

> *Changed in version 3.13.*
> Added the *show_offsets* parameter.

> *Changed in version 3.14.*
> Added the *show_positions* parameter.

### `distb(tb=None, *, file=None, show_caches=False, adaptive=False,\`

```python
show_offset=False, show_positions=False)
```

Disassemble the top-of-stack function of a traceback, using the last
traceback if none was passed.  The instruction causing the exception is
indicated.

The disassembly is written as text to the supplied *file* argument if
provided and to `sys.stdout` otherwise.

> *Changed in version 3.4.*
> Added *file* parameter.

> *Changed in version 3.11.*
> Added the *show_caches* and *adaptive* parameters.

> *Changed in version 3.13.*
> Added the *show_offsets* parameter.

> *Changed in version 3.14.*
> Added the *show_positions* parameter.

### `disassemble(code, lasti=-1, *, file=None, show_caches=False,\`

```python
adaptive=False, show_offsets=False, show_positions=False)
disco(code, lasti=-1, *, file=None, show_caches=False, adaptive=False,\
show_offsets=False, show_positions=False)
```

Disassemble a code object, indicating the last instruction if *lasti* was
provided.  The output is divided in the following columns:

1. the source code location of the instruction. Complete location information
is shown if *show_positions* is true. Otherwise (the default) only the
line number is displayed.
1. the current instruction, indicated as `-->`,
1. a labelled instruction, indicated with `>>`,
1. the address of the instruction,
1. the operation code name,
1. operation parameters, and
1. interpretation of the parameters in parentheses.

The parameter interpretation recognizes local and global variable names,
constant values, branch targets, and compare operators.

The disassembly is written as text to the supplied *file* argument if
provided and to `sys.stdout` otherwise.

> *Changed in version 3.4.*
> Added *file* parameter.

> *Changed in version 3.11.*
> Added the *show_caches* and *adaptive* parameters.

> *Changed in version 3.13.*
> Added the *show_offsets* parameter.

> *Changed in version 3.14.*
> Added the *show_positions* parameter.

### `get_instructions(x, *, first_line=None, show_caches=False, adaptive=False)`

Return an iterator over the instructions in the supplied function, method,
source code string or code object.

The iterator generates a series of `Instruction` named tuples giving
the details of each operation in the supplied code.

If *first_line* is not `None`, it indicates the line number that should be
reported for the first source line in the disassembled code.  Otherwise, the
source line information (if any) is taken directly from the disassembled code
object.

The *adaptive* parameter works as it does in `dis()`.

> *Added in version 3.4.*

> *Changed in version 3.11.*
> Added the *show_caches* and *adaptive* parameters.

> *Changed in version 3.13.*
> The *show_caches* parameter is deprecated and has no effect. The iterator
> generates the `Instruction` instances with the *cache_info*
> field populated (regardless of the value of *show_caches*) and it no longer
> generates separate items for the cache entries.

### `findlinestarts(code)`

This generator function uses the `co_lines()` method
of the code object *code* to find the offsets which
are starts of
lines in the source code.  They are generated as `(offset, lineno)` pairs.

> *Changed in version 3.6.*
> Line numbers can be decreasing. Before, they were always increasing.

> *Changed in version 3.10.*
> The PEP 626 `co_lines()` method is used instead of the
> `co_firstlineno` and `codeobject.co_lnotab`
> attributes of the code object.

> *Changed in version 3.13.*
> Line numbers can be `None` for bytecode that does not map to source lines.

### `findlabels(code)`

Detect all offsets in the raw compiled bytecode string *code* which are jump targets, and
return a list of these offsets.

### `stack_effect(opcode, oparg=None, *, jump=None)`

Compute the stack effect of *opcode* with argument *oparg*.

If the code has a jump target and *jump* is `True`, `stack_effect()`
will return the stack effect of jumping.  If *jump* is `False`,
it will return the stack effect of not jumping. And if *jump* is
`None` (default), it will return the maximal stack effect of both cases.

> *Added in version 3.4.*

> *Changed in version 3.8.*
> Added *jump* parameter.

> *Changed in version 3.13.*
> If `oparg` is omitted (or `None`), the stack effect is now returned
> for `oparg=0`. Previously this was an error for opcodes that use their
> arg. It is also no longer an error to pass an integer `oparg` when
> the `opcode` does not use it; the `oparg` in this case is ignored.
