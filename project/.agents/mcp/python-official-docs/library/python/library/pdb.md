---
title: "pdb --- The Python Debugger (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pdb.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `pdb` --- The Python Debugger

Module `pdb`.

**Source code:** Lib/pdb.py

The module `pdb` defines an interactive source code debugger for Python
programs.  It supports setting (conditional) breakpoints and single stepping at
the source line level, inspection of stack frames, source code listing, and
evaluation of arbitrary Python code in the context of any stack frame.  It also
supports post-mortem debugging and can be called under program control.

The debugger is extensible -- it is actually defined as the class `Pdb`.
This is currently undocumented but easily understood by reading the source.  The
extension interface uses the modules `bdb` and `cmd`.

> **See also:** Module `faulthandler`
> Used to dump Python tracebacks explicitly, on a fault, after a timeout,
> or on a user signal.
>
> Module `traceback`
> Standard interface to extract, format and print stack traces of Python programs.

The typical usage to break into the debugger is to insert:

```
import pdb; pdb.set_trace()
```

Or:

```
breakpoint()
```

at the location you want to break into the debugger, and then run the program.
You can then step through the code following this statement, and continue
running without the debugger using the continue command.

> *Changed in version 3.7.*
> The built-in `breakpoint()`, when called with defaults, can be used
> instead of `import pdb; pdb.set_trace()`.

```
def double(x):
   breakpoint()
   return x * 2
val = 3
print(f"{val} * 2 is {double(val)}")
```

The debugger's prompt is `(Pdb)`, which is the indicator that you are in debug mode:

```
> ...(2)double()
-> breakpoint()
(Pdb) p x
3
(Pdb) continue
3 * 2 is 6
```

> *Changed in version 3.3.*
> Tab-completion via the `readline` module is available for commands and
> command arguments, e.g. the current global and local names are offered as
> arguments of the `p` command.

## Command-line interface

pdb

You can also invoke `pdb` from the command line to debug other scripts.  For
example:

```
python -m pdb [-c command] (-m module | -p pid | pyfile) [args ...]
```

When invoked as a module, pdb will automatically enter post-mortem debugging if
the program being debugged exits abnormally.  After post-mortem debugging (or
after normal exit of the program), pdb will restart the program.  Automatic
restarting preserves pdb's state (such as breakpoints) and in most cases is more
useful than quitting the debugger upon program's exit.

### option `-c, --command <command>`

To execute commands as if given in a `.pdbrc` file; see
debugger-commands.

> *Changed in version 3.2.*
> Added the `-c` option.

### option `-m <module>`

To execute modules similar to the way `python -m` does. As with a script,
the debugger will pause execution just before the first line of the module.

> *Changed in version 3.7.*
> Added the `-m` option.

### option `-p, --pid <pid>`

Attach to the process with the specified PID.

> *Added in version 3.14.*

To attach to a running Python process for remote debugging, use the `-p` or
`--pid` option with the target process's PID:

```
python -m pdb -p 1234
```

> **Note:** Attaching to a process that is blocked in a system call or waiting for I/O
> will only work once the next bytecode instruction is executed or when the
> process receives a signal.

Typical usage to execute a statement under control of the debugger is:

```
>>> import pdb
>>> def f(x):
...     print(1 / x)
>>> pdb.run("f(2)")
> <string>(1)<module>()
(Pdb) continue
0.5
>>>
```

The typical usage to inspect a crashed program is:

```
>>> import pdb
>>> def f(x):
...     print(1 / x)
...
>>> f(0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 2, in f
ZeroDivisionError: division by zero
>>> pdb.pm()
> <stdin>(2)f()
(Pdb) p x
0
(Pdb)
```

> *Changed in version 3.13.*
> The implementation of PEP 667 means that name assignments made via `pdb`
> will immediately affect the active scope, even when running inside an
> optimized scope.

The module defines the following functions; each enters the debugger in a
slightly different way:

### `run(statement, globals=None, locals=None)`

Execute the *statement* (given as a string or a code object) under debugger
control.  The debugger prompt appears before any code is executed; you can
set breakpoints and type continue, or you can step through the
statement using step or next (all these commands are
explained below).  The optional *globals* and *locals* arguments specify the
environment in which the code is executed; by default the dictionary of the
module `__main__` is used.  (See the explanation of the built-in
`exec()` or `eval()` functions.)

### `runeval(expression, globals=None, locals=None)`

Evaluate the *expression* (given as a string or a code object) under debugger
control.  When `runeval()` returns, it returns the value of the
*expression*.  Otherwise this function is similar to `run()`.

### `runcall(function, *args, **kwds)`

Call the *function* (a function or method object, not a string) with the
given arguments.  When `runcall()` returns, it returns whatever the
function call returned.  The debugger prompt appears as soon as the function
is entered.

### `set_trace(*, header=None, commands=None)`

Enter the debugger at the calling stack frame.  This is useful to hard-code
a breakpoint at a given point in a program, even if the code is not
otherwise being debugged (e.g. when an assertion fails).  If given,
*header* is printed to the console just before debugging begins.
The *commands* argument, if given, is a list of commands to execute
when the debugger starts.

> *Changed in version 3.7.*
> The keyword-only argument *header*.

> *Changed in version 3.13.*
> `set_trace()` will enter the debugger immediately, rather than
> on the next line of code to be executed.

> *Added in version 3.14.*
> The *commands* argument.

set_trace_async(*, header=None, commands=None)

async version of `set_trace()`. This function should be used inside an
async function with `await`.

```python
async def f():
    await pdb.set_trace_async()
```

`await` statements are supported if the debugger is invoked by this function.

> *Added in version 3.14.*

### `post_mortem(t=None)`

Enter post-mortem debugging of the given exception or
traceback object. If no value is given, it uses
the exception that is currently being handled, or raises `ValueError` if
there isn’t one.

> *Changed in version 3.13.*
> Support for exception objects was added.

### `pm()`

Enter post-mortem debugging of the exception found in
`sys.last_exc`.

### `set_default_backend(backend)`

There are two supported backends for pdb: `'settrace'` and `'monitoring'`.
See `bdb.Bdb` for details. The user can set the default backend to
use if none is specified when instantiating `Pdb`. If no backend is
specified, the default is `'settrace'`.

> **Note:** `breakpoint()` and `set_trace()` will not be affected by this
> function. They always use `'monitoring'` backend.

> *Added in version 3.14.*

### `get_default_backend()`

Returns the default backend for pdb.

> *Added in version 3.14.*

The `run*` functions and `set_trace()` are aliases for instantiating the
`Pdb` class and calling the method of the same name.  If you want to
access further features, you have to do this yourself:

### class `Pdb(completekey='tab', stdin=None, stdout=None, skip=None, \`

```python
nosigint=False, readrc=True, mode=None, backend=None, colorize=False)
```

`Pdb` is the debugger class.

The *completekey*, *stdin* and *stdout* arguments are passed to the
underlying `cmd.Cmd` class; see the description there.

The *skip* argument, if given, must be an iterable of glob-style module name
patterns.  The debugger will not step into frames that originate in a module
that matches one of these patterns.

By default, Pdb sets a handler for the SIGINT signal (which is sent when the
user presses `Ctrl-C` on the console) when you give a continue command.
This allows you to break into the debugger again by pressing `Ctrl-C`.  If you
want Pdb not to touch the SIGINT handler, set *nosigint* to true.

The *readrc* argument defaults to true and controls whether Pdb will load
.pdbrc files from the filesystem.

The *mode* argument specifies how the debugger was invoked.
It impacts the workings of some debugger commands.
Valid values are `'inline'` (used by the breakpoint() builtin),
`'cli'` (used by the command line invocation)
or `None` (for backwards compatible behaviour, as before the *mode*
argument was added).

The *backend* argument specifies the backend to use for the debugger. If `None`
is passed, the default backend will be used. See `set_default_backend()`.
Otherwise the supported backends are `'settrace'` and `'monitoring'`.

The *colorize* argument, if set to `True`, will enable colorized output in the
debugger, if color is supported. This will highlight source code displayed in pdb.

Example call to enable tracing with *skip*:

```
import pdb; pdb.Pdb(skip=['django.*']).set_trace()
```

> *Changed in version 3.1.*
> Added the *skip* parameter.

> *Changed in version 3.2.*
> Added the *nosigint* parameter.
> Previously, a SIGINT handler was never set by Pdb.

> *Changed in version 3.6.*
> The *readrc* argument.

> *Added in version 3.14.*
> Added the *mode* argument.

> *Added in version 3.14.*
> Added the *backend* argument.

> *Added in version 3.14.*
> Added the *colorize* argument.

> *Changed in version 3.14.*
> Inline breakpoints like `breakpoint()` or `pdb.set_trace()` will
> always stop the program at calling frame, ignoring the *skip* pattern (if any).

### `run(statement, globals=None, locals=None)`

```python
runeval(expression, globals=None, locals=None)
runcall(function, *args, **kwds)
set_trace()
```

See the documentation for the functions explained above.
