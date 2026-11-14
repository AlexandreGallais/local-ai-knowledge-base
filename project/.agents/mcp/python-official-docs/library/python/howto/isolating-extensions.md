---
title: "Isolating Extension Modules (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/isolating-extensions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Isolating Extension Modules

Abstract

Traditionally, state belonging to Python extension modules was kept in C
`static` variables, which have process-wide scope. This document
describes problems of such per-process state and shows a safer way:
per-module state.

The document also describes how to switch to per-module state where
possible. This transition involves allocating space for that state, potentially
switching from static types to heap types, and—perhaps most
importantly—accessing per-module state from code.

## Who should read this

This guide is written for maintainers of C-API extensions
who would like to make that extension safer to use in applications where
Python itself is used as a library.

## Background

An *interpreter* is the context in which Python code runs. It contains
configuration (e.g. the import path) and runtime state (e.g. the set of
imported modules).

Python supports running multiple interpreters in one process. There are
two cases to think about—users may run interpreters:

- in sequence, with several `Py_InitializeEx`/`Py_FinalizeEx`
cycles, and
- in parallel, managing "sub-interpreters" using
`Py_NewInterpreter`/`Py_EndInterpreter`.

Both cases (and combinations of them) would be most useful when
embedding Python within a library. Libraries generally shouldn't make
assumptions about the application that uses them, which include
assuming a process-wide "main Python interpreter".

Historically, Python extension modules don't handle this use case well.
Many extension modules (and even some stdlib modules) use *per-process*
global state, because C `static` variables are extremely easy to use.
Thus, data that should be specific to an interpreter ends up being shared
between interpreters. Unless the extension developer is careful, it is very
easy to introduce edge cases that lead to crashes when a module is loaded in
more than one interpreter in the same process.

Unfortunately, *per-interpreter* state is not easy to achieve. Extension
authors tend to not keep multiple interpreters in mind when developing,
and it is currently cumbersome to test the behavior.

### Enter Per-Module State

Instead of focusing on per-interpreter state, Python's C API is evolving
to better support the more granular *per-module* state.
This means that C-level data should be attached to a *module object*.
Each interpreter creates its own module object, keeping the data separate.
For testing the isolation, multiple module objects corresponding to a single
extension can even be loaded in a single interpreter.

Per-module state provides an easy way to think about lifetime and
resource ownership: the extension module will initialize when a
module object is created, and clean up when it's freed. In this regard,
a module is just like any other `PyObject *`; there are no "on
interpreter shutdown" hooks to think—or forget—about.

Note that there are use cases for different kinds of "globals":
per-process, per-interpreter, per-thread or per-task state.
With per-module state as the default, these are still possible,
but you should treat them as exceptional cases:
if you need them, you should give them additional care and testing.
(Note that this guide does not cover them.)

### Isolated Module Objects

The key point to keep in mind when developing an extension module is
that several module objects can be created from a single shared library.
For example:

```pycon
>>> import sys
>>> import binascii
>>> old_binascii = binascii
>>> del sys.modules['binascii']
>>> import binascii  # create a new module object
>>> old_binascii == binascii
False
```

As a rule of thumb, the two modules should be completely independent.
All objects and state specific to the module should be encapsulated
within the module object, not shared with other module objects, and
cleaned up when the module object is deallocated.
Since this just is a rule of thumb, exceptions are possible
(see Managing Global State), but they will need more
thought and attention to edge cases.

While some modules could do with less stringent restrictions, isolated
modules make it easier to set clear expectations and guidelines that
work across a variety of use cases.

### Surprising Edge Cases

Note that isolated modules do create some surprising edge cases. Most
notably, each module object will typically not share its classes and
exceptions with other similar modules. Continuing from the
example above,
note that `old_binascii.Error` and `binascii.Error` are
separate objects. In the following code, the exception is *not* caught:

```pycon
>>> old_binascii.Error == binascii.Error
False
>>> try:
...     old_binascii.unhexlify(b'qwertyuiop')
... except binascii.Error:
...     print('boo')
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
binascii.Error: Non-hexadecimal digit found
```

This is expected. Notice that pure-Python modules behave the same way:
it is a part of how Python works.

The goal is to make extension modules safe at the C level, not to make
hacks behave intuitively. Mutating `sys.modules` "manually" counts
as a hack.

## Making Modules Safe with Multiple Interpreters

### Managing Global State

Sometimes, the state associated with a Python module is not specific to that module, but
to the entire process (or something else "more global" than a module).
For example:

- The `readline` module manages *the* terminal.
- A module running on a circuit board wants to control *the* on-board
LED.

In these cases, the Python module should provide *access* to the global
state, rather than *own* it. If possible, write the module so that
multiple copies of it can access the state independently (along with
other libraries, whether for Python or other languages). If that is not
possible, consider explicit locking.

If it is necessary to use process-global state, the simplest way to
avoid issues with multiple interpreters is to explicitly prevent a
module from being loaded more than once per process—see
isolating-extensions-optout.

### Managing Per-Module State

To use per-module state, use
multi-phase extension module initialization.
This signals that your module supports multiple interpreters correctly.

Set `PyModuleDef.m_size` to a positive number to request that many
bytes of storage local to the module. Usually, this will be set to the
size of some module-specific `struct`, which can store all of the
module's C-level state. In particular, it is where you should put
pointers to classes (including exceptions, but excluding static types)
and settings (e.g. `csv`'s `field_size_limit`)
which the C code needs to function.

> **Note:** Another option is to store state in the module's `__dict__`,
> but you must avoid crashing when users modify `__dict__` from
> Python code. This usually means error- and type-checking at the C level,
> which is easy to get wrong and hard to test sufficiently.
>
> However, if module state is not needed in C code, storing it in
> `__dict__` only is a good idea.

If the module state includes `PyObject` pointers, the module object
must hold references to those objects and implement the module-level hooks
`m_traverse`, `m_clear` and `m_free`. These work like
`tp_traverse`, `tp_clear` and `tp_free` of a class. Adding them will
require some work and make the code longer; this is the price for
modules which can be unloaded cleanly.

An example of a module with per-module state is currently available as
xxlimited;
example module initialization shown at the bottom of the file.

### Opt-Out: Limiting to One Module Object per Process

A non-negative `PyModuleDef.m_size` signals that a module supports
multiple interpreters correctly. If this is not yet the case for your
module, you can explicitly make your module loadable only once per
process. For example:

```
// A process-wide flag
static int loaded = 0;

// Mutex to provide thread safety (only needed for free-threaded Python)
static PyMutex modinit_mutex = {0};

static int
exec_module(PyObject* module)
{
    PyMutex_Lock(&modinit_mutex);
    if (loaded) {
        PyMutex_Unlock(&modinit_mutex);
        PyErr_SetString(PyExc_ImportError,
                        "cannot load module more than once per process");
        return -1;
    }
    loaded = 1;
    PyMutex_Unlock(&modinit_mutex);
    // ... rest of initialization
}
```

If your module's `PyModuleDef.m_clear` function is able to prepare
for future re-initialization, it should clear the `loaded` flag.
In this case, your module won't support multiple instances existing
*concurrently*, but it will, for example, support being loaded after
Python runtime shutdown (`Py_FinalizeEx`) and re-initialization
(`Py_Initialize`).

### Module State Access from Functions

Accessing the state from module-level functions is straightforward.
Functions get the module object as their first argument; for extracting
the state, you can use `PyModule_GetState`:

```
static PyObject *
func(PyObject *module, PyObject *args)
{
    my_struct *state = (my_struct*)PyModule_GetState(module);
    if (state == NULL) {
        return NULL;
    }
    // ... rest of logic
}
```

> **Note:** `PyModule_GetState` may return `NULL` without setting an
> exception if there is no module state, i.e. `PyModuleDef.m_size` was
> zero. In your own module, you're in control of `m_size`, so this is
> easy to prevent.
