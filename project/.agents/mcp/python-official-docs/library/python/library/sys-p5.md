---
title: "sys --- System-specific parameters and functions (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sys.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sys --- System-specific parameters and functions (part 5 of 6)

### `setprofile(profilefunc)`

Set the system's profile function, which allows you to implement a Python source
code profiler in Python.  See chapter profile for more information on the
Python profiler.  The system's profile function is called similarly to the
system's trace function (see `settrace()`), but it is called with different events,
for example it isn't called for each executed line of code (only on call and return,
but the return event is reported even when an exception has been set). The function is
thread-specific, but there is no way for the profiler to know about context switches between
threads, so it does not make sense to use this in the presence of multiple threads. Also,
its return value is not used, so it can simply return `None`.  Error in the profile
function will cause itself unset.

> **Note:** The same tracing mechanism is used for `setprofile()` as `settrace()`.
> To trace calls with `setprofile()` inside a tracing function
> (e.g. in a debugger breakpoint), see `call_tracing()`.

Profile functions should have three arguments: *frame*, *event*, and
*arg*. *frame* is the current stack frame.  *event* is a string: `'call'`,
`'return'`, `'c_call'`, `'c_return'`, or `'c_exception'`. *arg* depends
on the event type.

The events have the following meaning:

`'call'`
A function is called (or some other code block entered).  The
profile function is called; *arg* is `None`.

`'return'`
A function (or other code block) is about to return.  The profile
function is called; *arg* is the value that will be returned, or `None`
if the event is caused by an exception being raised.

`'c_call'`
A C function is about to be called.  This may be an extension function or
a built-in.  *arg* is the C function object.

`'c_return'`
A C function has returned. *arg* is the C function object.

`'c_exception'`
A C function has raised an exception.  *arg* is the C function object.

### `setrecursionlimit(limit)`

Set the maximum depth of the Python interpreter stack to *limit*.  This limit
prevents infinite recursion from causing an overflow of the C stack and crashing
Python.

The highest possible limit is platform-dependent.  A user may need to set the
limit higher when they have a program that requires deep recursion and a platform
that supports a higher limit.  This should be done with care, because a too-high
limit can lead to a crash.

If the new limit is too low at the current recursion depth, a
`RecursionError` exception is raised.

> *Changed in version 3.5.1.*
> A `RecursionError` exception is now raised if the new limit is too
> low at the current recursion depth.

### `setswitchinterval(interval)`

Set the interpreter's thread switch interval (in seconds).  This floating-point
value determines the ideal duration of the "timeslices" allocated to
concurrently running Python threads.  Please note that the actual value
can be higher, especially if long-running internal functions or methods
are used.  Also, which thread becomes scheduled at the end of the interval
is the operating system's decision.  The interpreter doesn't have its
own scheduler.

> *Added in version 3.2.*

### `settrace(tracefunc)`

Set the system's trace function, which allows you to implement a Python
source code debugger in Python.  The function is thread-specific; for a
debugger to support multiple threads, it must register a trace function using
`settrace()` for each thread being debugged or use `threading.settrace()`.

Trace functions should have three arguments: *frame*, *event*, and
*arg*. *frame* is the current stack frame. *event* is a string: `'call'`,
`'line'`, `'return'`, `'exception'` or `'opcode'`.  *arg* depends on
the event type.

The trace function is invoked (with *event* set to `'call'`) whenever a new
local scope is entered; it should return a reference to a local trace
function to be used for the new scope, or `None` if the scope shouldn't be
traced.

The local trace function should return a reference to itself, or to another
function which would then be used as the local trace function for the scope.

If there is any error occurred in the trace function, it will be unset, just
like `settrace(None)` is called.

> **Note:** Tracing is disabled while calling the trace function (e.g. a function set by
> `settrace()`). For recursive tracing see `call_tracing()`.

The events have the following meaning:

`'call'`
A function is called (or some other code block entered).  The
global trace function is called; *arg* is `None`; the return value
specifies the local trace function.

`'line'`
The interpreter is about to execute a new line of code or re-execute the
condition of a loop.  The local trace function is called; *arg* is
`None`; the return value specifies the new local trace function.  See
InternalDocs/code_objects.md for a detailed explanation of how this
works.
Per-line events may be disabled for a frame by setting
`f_trace_lines` to `False` on that
frame.

`'return'`
A function (or other code block) is about to return.  The local trace
function is called; *arg* is the value that will be returned, or `None`
if the event is caused by an exception being raised.  The trace function's
return value is ignored.

`'exception'`
An exception has occurred.  The local trace function is called; *arg* is a
tuple `(exception, value, traceback)`; the return value specifies the
new local trace function.

`'opcode'`
The interpreter is about to execute a new opcode (see `dis` for
opcode details).  The local trace function is called; *arg* is
`None`; the return value specifies the new local trace function.
Per-opcode events are not emitted by default: they must be explicitly
requested by setting `f_trace_opcodes` to `True` on the
frame.

Note that as an exception is propagated down the chain of callers, an
`'exception'` event is generated at each level.

For more fine-grained usage, it's possible to set a trace function by
assigning `frame.f_trace = tracefunc` explicitly, rather than relying on
it being set indirectly via the return value from an already installed
trace function. This is also required for activating the trace function on
the current frame, which `settrace()` doesn't do. Note that in order
for this to work, a global tracing function must have been installed
with `settrace()` in order to enable the runtime tracing machinery,
but it doesn't need to be the same tracing function (e.g. it could be a
low overhead tracing function that simply returns `None` to disable
itself immediately on each frame).

For more information on code and frame objects, refer to types.

> **CPython implementation detail:** The `settrace()` function is intended only for implementing debuggers,
> profilers, coverage tools and the like.  Its behavior is part of the
> implementation platform, rather than part of the language definition, and
> thus may not be available in all Python implementations.

> *Changed in version 3.7.*
> `'opcode'` event type added; `f_trace_lines` and
> `f_trace_opcodes` attributes added to frames

### `set_asyncgen_hooks([firstiter] [, finalizer])`

Accepts two optional keyword arguments which are callables that accept an
asynchronous generator iterator as an argument. The *firstiter*
callable will be called when an asynchronous generator is iterated for the
first time. The *finalizer* will be called when an asynchronous generator
is about to be garbage collected.

Two auditing events are raised because the underlying API consists of two
calls, each of which must raise its own event.

> *Added in version 3.6.*
> See PEP 525 for more details, and for a reference example of a
> *finalizer* method see the implementation of
> `asyncio.Loop.shutdown_asyncgens` in
> Lib/asyncio/base_events.py

> **Note:** This function has been added on a provisional basis (see PEP 411
> for details.)

### `set_coroutine_origin_tracking_depth(depth)`

Allows enabling or disabling coroutine origin tracking. When
enabled, the `cr_origin` attribute on coroutine objects will
contain a tuple of (filename, line number, function name) tuples
describing the traceback where the coroutine object was created,
with the most recent call first. When disabled, `cr_origin` will
be `None`.

To enable, pass a *depth* value greater than zero; this sets the
number of frames whose information will be captured. To disable,
set *depth* to zero.

This setting is thread-specific.

> *Added in version 3.7.*

> **Note:** This function has been added on a provisional basis (see PEP 411
> for details.)  Use it only for debugging purposes.

### `activate_stack_trampoline(backend, /)`

Activate the stack profiler trampoline *backend*.
The only supported backend is `"perf"`.

Stack trampolines cannot be activated if the JIT is active.

> **Availability:** Linux.

> *Added in version 3.12.*

> **See also:** - perf_profiling
> - https://perf.wiki.kernel.org

### `deactivate_stack_trampoline()`

Deactivate the current stack profiler trampoline backend.

If no stack profiler is activated, this function has no effect.

> **Availability:** Linux.

> *Added in version 3.12.*

### `is_stack_trampoline_active()`

Return `True` if a stack profiler trampoline is active.

> **Availability:** Linux.

> *Added in version 3.12.*

### `remote_exec(pid, script)`

Executes *script*, a file containing Python code in the remote
process with the given *pid*.

This function returns immediately, and the code will be executed by the
target process's main thread at the next available opportunity, similarly
to how signals are handled. There is no interface to determine when the
code has been executed. The caller is responsible for making sure that
the file still exists whenever the remote process tries to read it and that
it hasn't been overwritten.

The remote process must be running a CPython interpreter of the same major
and minor version as the local process. If either the local or remote
interpreter is pre-release (alpha, beta, or release candidate) then the
local and remote interpreters must be the same exact version.

See remote-debugging for more information about the remote debugging
mechanism.

> **Availability:** Unix, Windows.

> *Added in version 3.14.*
> See PEP 768 for more details.

### `_enablelegacywindowsfsencoding()`

Changes the filesystem encoding and error handler to 'mbcs' and
'replace' respectively, for consistency with versions of Python prior to
3.6.

This is equivalent to defining the `PYTHONLEGACYWINDOWSFSENCODING`
environment variable before launching Python.

See also `sys.getfilesystemencoding()` and
`sys.getfilesystemencodeerrors()`.

> **Availability:** Windows.

> **Note:** Changing the filesystem encoding after Python startup is risky because
> the old fsencoding or paths encoded by the old fsencoding may be cached
> somewhere. Use `PYTHONLEGACYWINDOWSFSENCODING` instead.

> *Added in version 3.6.*
> See PEP 529 for more details.

> *Deprecated since version 3.13, removed in version 3.16.*
> Use `PYTHONLEGACYWINDOWSFSENCODING` instead.

### `stdin`

```python
stdout
stderr
```

File objects used by the interpreter for standard
input, output and errors:

- `stdin` is used for all interactive input (including calls to
`input()`);
- `stdout` is used for the output of `print()` and expression
statements and for the prompts of `input()`;
- The interpreter's own prompts and its error messages go to `stderr`.

These streams are regular text files like those
returned by the `open()` function.  Their parameters are chosen as
follows:

- The encoding and error handling are initialized from
`PyConfig.stdio_encoding` and `PyConfig.stdio_errors`.

On Windows, UTF-8 is used for the console device.  Non-character
devices such as disk files and pipes use the system locale
encoding (i.e. the ANSI codepage).  Non-console character
devices such as NUL (i.e. where `isatty()` returns `True`) use the
value of the console input and output codepages at startup,
respectively for stdin and stdout/stderr. This defaults to the
system locale encoding if the process is not initially attached
to a console.

The special behaviour of the console can be overridden
by setting the environment variable PYTHONLEGACYWINDOWSSTDIO
before starting Python. In that case, the console codepages are
used as for any other character device.

Under all platforms, you can override the character encoding by
setting the `PYTHONIOENCODING` environment variable before
starting Python or by using the new `-X` `utf8` command
line option and `PYTHONUTF8` environment variable.  However,
for the Windows console, this only applies when
`PYTHONLEGACYWINDOWSSTDIO` is also set.

- When interactive, the `stdout` stream is line-buffered. Otherwise,
it is block-buffered like regular text files.  The `stderr` stream
is line-buffered in both cases.  You can make both streams unbuffered
by passing the `-u` command-line option or setting the
`PYTHONUNBUFFERED` environment variable.

> *Changed in version 3.9.*
> Non-interactive `stderr` is now line-buffered instead of fully
> buffered.

> **Note:** To write or read binary data from/to the standard streams, use the
> underlying binary `buffer` object.  For example, to
> write bytes to `stdout`, use `sys.stdout.buffer.write(b'abc')`.
>
> However, if you are writing a library (and do not control in which
> context its code will be executed), be aware that the standard streams
> may be replaced with file-like objects like `io.StringIO` which
> do not support the `buffer` attribute.

### `__stdin__`

```python
__stdout__
__stderr__
```

These objects contain the original values of `stdin`, `stderr` and
`stdout` at the start of the program.  They are used during finalization,
and could be useful to print to the actual standard stream no matter if the
`sys.std*` object has been redirected.

It can also be used to restore the actual files to known working file objects
in case they have been overwritten with a broken object.  However, the
preferred way to do this is to explicitly save the previous stream before
replacing it, and restore the saved object.

> **Note:** Under some conditions `stdin`, `stdout` and `stderr` as well as the
> original values `__stdin__`, `__stdout__` and `__stderr__` can be
> `None`. It is usually the case for Windows GUI apps that aren't connected
> to a console and Python apps started with `pythonw`.

### `stdlib_module_names`

A frozenset of strings containing the names of standard library modules.

It is the same on all platforms. Modules which are not available on
some platforms and modules disabled at Python build are also listed.
All module kinds are listed: pure Python, built-in, frozen and extension
modules. Test modules are excluded.

For packages, only the main package is listed: sub-packages and sub-modules
are not listed. For example, the `email` package is listed, but the
`email.mime` sub-package and the `email.message` sub-module are not
listed.

See also the `sys.builtin_module_names` list.

> *Added in version 3.10.*
