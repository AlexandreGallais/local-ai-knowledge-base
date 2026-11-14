---
title: "sys --- System-specific parameters and functions (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sys.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `sys` --- System-specific parameters and functions

Module `sys`.

This module provides access to some variables used or maintained by the
interpreter and to functions that interact strongly with the interpreter. It is
always available. Unless explicitly noted otherwise, all variables are read-only.

### `abi_info`

> *Added in version 3.15.*

An object containing information about the ABI of the currently running
Python interpreter.
It should include information that affect the CPython ABI in ways that
require a specific build of the interpreter chosen from variants that can
co-exist on a single machine.
For example, it does not encode the base OS (Linux or Windows), but does
include pointer size since some systems support both 32- and 64-bit builds.
The available entries are the same on all platforms;
e.g. *pointer_size* is available even on 64-bit-only architectures.

The following attributes are available:

### `abi_info.pointer_bits`

The width of pointers in bits, as an integer,
equivalent to `8 * sizeof(void *)`.
Usually, this is  `32` or `64`.

### `abi_info.free_threaded`

A Boolean indicating whether the interpreter was built with
free threading support.
This reflects either the presence of the `--disable-gil`
`configure` option (on Unix)
or setting the `DisableGil` property (on Windows).

### `abi_info.debug`

A Boolean indicating whether the interpreter was built in
debug mode.
This reflects either the presence of the `--with-pydebug`
`configure` option (on Unix)
or the `Debug` configuration (on Windows).

### `abi_info.byteorder`

A string indicating the native byte order,
either `'big'` or `'little'`.
This is the same as the `byteorder` attribute.

### `abiflags`

On POSIX systems where Python was built with the standard `configure`
script, this contains the ABI flags as specified by PEP 3149.

> *Added in version 3.2.*

> *Changed in version 3.8.*
> Default flags became an empty string (`m` flag for pymalloc has been
> removed).

> **Availability:** Unix.

### `addaudithook(hook)`

Append the callable *hook* to the list of active auditing hooks for the
current (sub)interpreter.

When an auditing event is raised through the `sys.audit()` function, each
hook will be called in the order it was added with the event name and the
tuple of arguments. Native hooks added by `PySys_AddAuditHook` are
called first, followed by hooks added in the current (sub)interpreter.  Hooks
can then log the event, raise an exception to abort the operation,
or terminate the process entirely.

Note that audit hooks are primarily for collecting information about internal
or otherwise unobservable actions, whether by Python or libraries written in
Python. They are not suitable for implementing a "sandbox". In particular,
malicious code can trivially disable or bypass hooks added using this
function. At a minimum, any security-sensitive hooks must be added using the
C API `PySys_AddAuditHook` before initialising the runtime, and any
modules allowing arbitrary memory modification (such as `ctypes`) should
be completely removed or closely monitored.

See the audit events table for all events raised by
CPython, and PEP 578 for the original design discussion.

> *Added in version 3.8.*

> *Changed in version 3.8.1.*
> Exceptions derived from `Exception` but not `RuntimeError`
> are no longer suppressed.

> **CPython implementation detail:** When tracing is enabled (see `settrace()`), Python hooks are only
> traced if the callable has a `__cantrace__` member that is set to a
> true value. Otherwise, trace functions will skip the hook.

### `argv`

The list of command line arguments passed to a Python script. `argv[0]` is the
script name (it is operating system dependent whether this is a full pathname or
not).  If the command was executed using the `-c` command line option to
the interpreter, `argv[0]` is set to the string `'-c'`.  If no script name
was passed to the Python interpreter, `argv[0]` is the empty string.

To loop over the standard input, or the list of files given on the
command line, see the `fileinput` module.

See also `sys.orig_argv`.

> **Note:** On Unix, command line arguments are passed by bytes from OS.  Python decodes
> them with filesystem encoding and "surrogateescape" error handler.
> When you need original bytes, you can get it by
> `[os.fsencode(arg) for arg in sys.argv]`.

### `audit(event, *args)`

Raise an auditing event and trigger any active auditing hooks.
*event* is a string identifying the event, and *args* may contain
optional arguments with more information about the event.  The
number and types of arguments for a given event are considered a
public and stable API and should not be modified between releases.

For example, one auditing event is named `os.chdir`. This event has
one argument called *path* that will contain the requested new
working directory.

`sys.audit()` will call the existing auditing hooks, passing
the event name and arguments, and will re-raise the first exception
from any hook. In general, if an exception is raised, it should not
be handled and the process should be terminated as quickly as
possible. This allows hook implementations to decide how to respond
to particular events: they can merely log the event or abort the
operation by raising an exception.

Hooks are added using the `sys.addaudithook()` or
`PySys_AddAuditHook` functions.

The native equivalent of this function is `PySys_Audit`. Using the
native function is preferred when possible.

See the audit events table for all events raised by
CPython.

> *Added in version 3.8.*

### `base_exec_prefix`

Equivalent to `exec_prefix`, but referring to the base Python installation.

When running under sys-path-init-virtual-environments,
`exec_prefix` gets overwritten to the virtual environment prefix.
`base_exec_prefix`, conversely, does not change, and always points to
the base Python installation.
Refer to sys-path-init-virtual-environments for more information.

> *Added in version 3.3.*

### `base_prefix`

Equivalent to `prefix`, but referring to the base Python installation.

When running under virtual environment,
`prefix` gets overwritten to the virtual environment prefix.
`base_prefix`, conversely, does not change, and always points to
the base Python installation.
Refer to sys-path-init-virtual-environments for more information.

> *Added in version 3.3.*

### `byteorder`

An indicator of the native byte order.  This will have the value `'big'` on
big-endian (most-significant byte first) platforms, and `'little'` on
little-endian (least-significant byte first) platforms.

### `builtin_module_names`

A tuple of strings containing the names of all modules that are compiled into this
Python interpreter.  (This information is not available in any other way ---
`modules.keys()` only lists the imported modules.)

See also the `sys.stdlib_module_names` list.

### `call_tracing(func, args)`

Call `func(*args)`, while tracing is enabled.  The tracing state is saved,
and restored afterwards.  This is intended to be called from a debugger from
a checkpoint, to recursively debug or profile some other code.

Tracing is suspended while calling a tracing function set by
`settrace()` or `setprofile()` to avoid infinite recursion.
`call_tracing()` enables explicit recursion of the tracing function.

### `copyright`

A string containing the copyright pertaining to the Python interpreter.

### `_clear_type_cache()`

Clear the internal type cache. The type cache is used to speed up attribute
and method lookups. Use the function *only* to drop unnecessary references
during reference leak debugging.

This function should be used for internal and specialized purposes only.

> *Deprecated since version 3.13.*
> Use the more general `_clear_internal_caches()` function instead.

### `_clear_internal_caches()`

Clear all internal performance-related caches. Use this function *only* to
release unnecessary references and memory blocks when hunting for leaks.

> *Added in version 3.13.*

### `_current_frames()`

Return a dictionary mapping each thread's identifier to the topmost stack frame
currently active in that thread at the time the function is called. Note that
functions in the `traceback` module can build the call stack given such a
frame.

This is most useful for debugging deadlock:  this function does not require the
deadlocked threads' cooperation, and such threads' call stacks are frozen for as
long as they remain deadlocked.  The frame returned for a non-deadlocked thread
may bear no relationship to that thread's current activity by the time calling
code examines the frame.

This function should be used for internal and specialized purposes only.

### `_current_exceptions()`

Return a dictionary mapping each thread's identifier to the topmost exception
currently active in that thread at the time the function is called.
If a thread is not currently handling an exception, it is not included in
the result dictionary.

This is most useful for statistical profiling.

This function should be used for internal and specialized purposes only.

> *Changed in version 3.12.*
> Each value in the dictionary is now a single exception instance, rather
> than a 3-tuple as returned from `sys.exc_info()`.

### `breakpointhook()`

This hook function is called by built-in `breakpoint()`.  By default,
it drops you into the `pdb` debugger, but it can be set to any other
function so that you can choose which debugger gets used.

The signature of this function is dependent on what it calls.  For example,
the default binding (e.g. `pdb.set_trace()`) expects no arguments, but
you might bind it to a function that expects additional arguments
(positional and/or keyword).  The built-in `breakpoint()` function passes
its `*args` and `**kws` straight through.  Whatever
`breakpointhooks()` returns is returned from `breakpoint()`.

The default implementation first consults the environment variable
`PYTHONBREAKPOINT`.  If that is set to `"0"` then this function
returns immediately; i.e. it is a no-op.  If the environment variable is
not set, or is set to the empty string, `pdb.set_trace()` is called.
Otherwise this variable should name a function to run, using Python's
dotted-import nomenclature, e.g. `package.subpackage.module.function`.
In this case, `package.subpackage.module` would be imported and the
resulting module must have a callable named `function()`.  This is run,
passing in `*args` and `**kws`, and whatever `function()` returns,
`sys.breakpointhook()` returns to the built-in `breakpoint()`
function.

Note that if anything goes wrong while importing the callable named by
`PYTHONBREAKPOINT`, a `RuntimeWarning` is reported and the
breakpoint is ignored.

Also note that if `sys.breakpointhook()` is overridden programmatically,
`PYTHONBREAKPOINT` is *not* consulted.

> *Added in version 3.7.*

### `_debugmallocstats()`

Print low-level information to stderr about the state of CPython's memory
allocator.

If Python is built in debug mode (:option:`configure
--with-pydebug option <--with-pydebug>`), it also performs some expensive
internal consistency checks.

> *Added in version 3.3.*

> **CPython implementation detail:** This function is specific to CPython.  The exact output format is not
> defined here, and may change.

### `dllhandle`

Integer specifying the handle of the Python DLL.

> **Availability:** Windows.

### `displayhook(value)`

If *value* is not `None`, this function prints `repr(value)` to
`sys.stdout`, and saves *value* in `builtins._`. If `repr(value)` is
not encodable to `sys.stdout.encoding` with `sys.stdout.errors` error
handler (which is probably `'strict'`), encode it to
`sys.stdout.encoding` with `'backslashreplace'` error handler.

`sys.displayhook` is called on the result of evaluating an expression
entered in an interactive Python session.  The display of these values can be
customized by assigning another one-argument function to `sys.displayhook`.

Pseudo-code:

```
def displayhook(value):
    if value is None:
        return
    # Set '_' to None to avoid recursion
    builtins._ = None
    text = repr(value)
    try:
        sys.stdout.write(text)
    except UnicodeEncodeError:
        bytes = text.encode(sys.stdout.encoding, 'backslashreplace')
        if hasattr(sys.stdout, 'buffer'):
            sys.stdout.buffer.write(bytes)
        else:
            text = bytes.decode(sys.stdout.encoding, 'strict')
            sys.stdout.write(text)
    sys.stdout.write("\n")
    builtins._ = value
```

> *Changed in version 3.2.*
> Use `'backslashreplace'` error handler on `UnicodeEncodeError`.

### `dont_write_bytecode`

If this is true, Python won't try to write `.pyc` files on the
import of source modules.  This value is initially set to `True` or
`False` depending on the `-B` command line option and the
`PYTHONDONTWRITEBYTECODE` environment variable, but you can set it
yourself to control bytecode file generation.

### `_emscripten_info`

A named tuple holding information about the environment on the
*wasm32-emscripten* platform. The named tuple is provisional and may change
in the future.

### `_emscripten_info.emscripten_version`

Emscripten version as tuple of ints (major, minor, micro), e.g. `(3, 1, 8)`.

### `_emscripten_info.runtime`

Runtime string, e.g. browser user agent, `'Node.js v14.18.2'`, or `'UNKNOWN'`.

### `_emscripten_info.pthreads`

`True` if Python is compiled with Emscripten pthreads support.

### `_emscripten_info.shared_memory`

`True` if Python is compiled with shared memory support.

> **Availability:** Emscripten.

> *Added in version 3.11.*

### `pycache_prefix`

If this is set (not `None`), Python will write bytecode-cache `.pyc`
files to (and read them from) a parallel directory tree rooted at this
directory, rather than from `__pycache__` directories in the source code
tree. Any `__pycache__` directories in the source code tree will be ignored
and new `.pyc` files written within the pycache prefix. Thus if you use
`compileall` as a pre-build step, you must ensure you run it with the
same pycache prefix (if any) that you will use at runtime.

A relative path is interpreted relative to the current working directory.

This value is initially set based on the value of the `-X`
`pycache_prefix=PATH` command-line option or the
`PYTHONPYCACHEPREFIX` environment variable (command-line takes
precedence). If neither are set, it is `None`.

> *Added in version 3.8.*
