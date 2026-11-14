---
title: "C API Extension Support for Free Threading (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/free-threading-extensions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# C API Extension Support for Free Threading

Starting with the 3.13 release, CPython has support for running with
the global interpreter lock (GIL) disabled in a configuration
called free threading.  This document describes how to adapt C API
extensions to support free threading.

## Identifying the Free-Threaded Build in C

The CPython C API exposes the `Py_GIL_DISABLED` macro: in the free-threaded
build it's defined to `1`, and in the regular build it's not defined.
You can use it to enable code that only runs under the free-threaded build:

```
#ifdef Py_GIL_DISABLED
/* code that only runs in the free-threaded build */
#endif
```

> **Note:** On Windows, this macro is not defined automatically, but must be specified
> to the compiler when building. The `sysconfig.get_config_var()` function
> can be used to determine whether the current running interpreter had the
> macro defined.

## Module Initialization

Extension modules need to explicitly indicate that they support running with
the GIL disabled; otherwise importing the extension will raise a warning and
enable the GIL at runtime.

There are two ways to indicate that an extension module supports running with
the GIL disabled depending on whether the extension uses multi-phase or
single-phase initialization.

### Multi-Phase Initialization

Extensions that use multi-phase initialization
(functions like `PyModuleDef_Init`,
`PyModExport_*` export hook,
`PyModule_FromSlotsAndSpec`) should add a
`Py_mod_gil` slot in the module definition.
If your extension supports older versions of CPython,
you should guard the slot with a `PY_VERSION_HEX` check.

```
static struct PyModuleDef_Slot module_slots[] = {
    ...
#if PY_VERSION_HEX >= 0x030D0000
    {Py_mod_gil, Py_MOD_GIL_NOT_USED},
#endif
    {0, NULL}
};
```

### Single-Phase Initialization

Extensions that use legacy single-phase initialization
(that is, `PyModule_Create`) should call `PyUnstable_Module_SetGIL` to
indicate that they support running with the GIL disabled.  The function is
only defined in the free-threaded build, so you should guard the call with
`#ifdef Py_GIL_DISABLED` to avoid compilation errors in the regular build.

```
static struct PyModuleDef moduledef = {
    PyModuleDef_HEAD_INIT,
    ...
};

PyMODINIT_FUNC
PyInit_mymodule(void)
{
    PyObject *m = PyModule_Create(&moduledef);
    if (m == NULL) {
        return NULL;
    }
#ifdef Py_GIL_DISABLED
    PyUnstable_Module_SetGIL(m, Py_MOD_GIL_NOT_USED);
#endif
    return m;
}
```

## General API Guidelines

Most of the C API is thread-safe, but there are some exceptions.

- **Struct Fields**: Accessing fields in Python C API objects or structs
directly is not thread-safe if the field may be concurrently modified.
- **Macros**: Accessor macros like `PyList_GET_ITEM`,
`PyList_SET_ITEM`, and macros like
`PySequence_Fast_GET_SIZE` that use the object returned by
`PySequence_Fast` do not perform any error checking or locking.
These macros are not thread-safe if the container object may be modified
concurrently.
- **Borrowed References**: C API functions that return
borrowed references may not be thread-safe if
the containing object is modified concurrently.  See the section on
borrowed references for more information.

### Container Thread Safety

Containers like `PyListObject`,
`PyDictObject`, and `PySetObject` perform internal locking
in the free-threaded build.  For example, the `PyList_Append` will
lock the list before appending an item.

#### `PyDict_Next`

A notable exception is `PyDict_Next`, which does not lock the
dictionary.  You should use `Py_BEGIN_CRITICAL_SECTION` to protect
the dictionary while iterating over it if the dictionary may be concurrently
modified:

```
Py_BEGIN_CRITICAL_SECTION(dict);
PyObject *key, *value;
Py_ssize_t pos = 0;
while (PyDict_Next(dict, &pos, &key, &value)) {
    ...
}
Py_END_CRITICAL_SECTION();
```

## Borrowed References

Some C API functions return borrowed references.
These APIs are not thread-safe if the containing object is modified
concurrently.  For example, it's not safe to use `PyList_GetItem`
if the list may be modified concurrently.

The following table lists some borrowed reference APIs and their replacements
that return strong references.

```text
+-----------------------------------+-----------------------------------+
| Borrowed reference API            | Strong reference API              |
+===================================+===================================+
| :c:func:`PyList_GetItem`          | :c:func:`PyList_GetItemRef`       |
+-----------------------------------+-----------------------------------+
| :c:func:`PyList_GET_ITEM`         | :c:func:`PyList_GetItemRef`       |
+-----------------------------------+-----------------------------------+
| :c:func:`PyDict_GetItem`          | :c:func:`PyDict_GetItemRef`       |
+-----------------------------------+-----------------------------------+
| :c:func:`PyDict_GetItemWithError` | :c:func:`PyDict_GetItemRef`       |
+-----------------------------------+-----------------------------------+
| :c:func:`PyDict_GetItemString`    | :c:func:`PyDict_GetItemStringRef` |
+-----------------------------------+-----------------------------------+
| :c:func:`PyDict_SetDefault`       | :c:func:`PyDict_SetDefaultRef`    |
+-----------------------------------+-----------------------------------+
| :c:func:`PyDict_Next`             | none (see :ref:`PyDict_Next`)     |
+-----------------------------------+-----------------------------------+
| :c:func:`!PyWeakref_GetObject`    | :c:func:`PyWeakref_GetRef`        |
+-----------------------------------+-----------------------------------+
| :c:func:`!PyWeakref_GET_OBJECT`   | :c:func:`PyWeakref_GetRef`        |
+-----------------------------------+-----------------------------------+
| :c:func:`PyImport_AddModule`      | :c:func:`PyImport_AddModuleRef`   |
+-----------------------------------+-----------------------------------+
| :c:func:`PyCell_GET`              | :c:func:`PyCell_Get`              |
+-----------------------------------+-----------------------------------+
```

Not all APIs that return borrowed references are problematic.  For
example, `PyTuple_GetItem` is safe because tuples are immutable.
Similarly, not all uses of the above APIs are problematic.  For example,
`PyDict_GetItem` is often used for parsing keyword argument
dictionaries in function calls; those keyword argument dictionaries are
effectively private (not accessible by other threads), so using borrowed
references in that context is safe.

Some of these functions were added in Python 3.13.  You can use the
pythoncapi-compat package
to provide implementations of these functions for older Python versions.

## Memory Allocation APIs

Python's memory management C API provides functions in three different
allocation domains: "raw", "mem", and "object".
For thread-safety, the free-threaded build requires that only Python objects
are allocated using the object domain, and that all Python objects are
allocated using that domain.  This differs from the prior Python versions,
where this was only a best practice and not a hard requirement.

> **Note:** Search for uses of `PyObject_Malloc` in your
> extension and check that the allocated memory is used for Python objects.
> Use `PyMem_Malloc` to allocate buffers instead of
> `PyObject_Malloc`.

## Thread State and GIL APIs

Python provides a set of functions and macros to manage thread state and the
GIL, such as:

- `PyThreadState_Ensure`, `PyThreadState_EnsureFromView`,
and `PyThreadState_Release`
- `PyGILState_Ensure` and `PyGILState_Release`
- `PyEval_SaveThread` and `PyEval_RestoreThread`
- `Py_BEGIN_ALLOW_THREADS` and `Py_END_ALLOW_THREADS`

These functions should still be used in the free-threaded build to manage
thread state even when the GIL is disabled.  For example, if you
create a thread outside of Python, you must call `PyThreadState_Ensure`
before calling into the Python API to ensure that the thread has a valid
Python thread state.

You should continue to call `PyEval_SaveThread` or
`Py_BEGIN_ALLOW_THREADS` around blocking operations, such as I/O or
lock acquisitions, to allow other threads to run the
cyclic garbage collector.

## Protecting Internal Extension State

Your extension may have internal state that was previously protected by the
GIL.  You may need to add locking to protect this state.  The approach will
depend on your extension, but some common patterns include:

- **Caches**: global caches are a common source of shared state.  Consider
using a lock to protect the cache or disabling it in the free-threaded build
if the cache is not critical for performance.
- **Global State**: global state may need to be protected by a lock or moved
to thread local storage. C11 and C++11 provide the `thread_local` or
`_Thread_local` for
thread-local storage.
