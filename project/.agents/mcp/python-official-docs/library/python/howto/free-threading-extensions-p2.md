---
title: "C API Extension Support for Free Threading (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/free-threading-extensions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# C API Extension Support for Free Threading (part 2 of 2)

## Critical Sections

In the free-threaded build, CPython provides a mechanism called "critical
sections" to protect data that would otherwise be protected by the GIL.
While extension authors may not interact with the internal critical section
implementation directly, understanding their behavior is crucial when using
certain C API functions or managing shared state in the free-threaded build.

### What Are Critical Sections?

Conceptually, critical sections act as a deadlock avoidance layer built on
top of simple mutexes. Each thread maintains a stack of active critical
sections. When a thread needs to acquire a lock associated with a critical
section (e.g., implicitly when calling a thread-safe C API function like
`PyDict_SetItem`, or explicitly using macros), it attempts to acquire
the underlying mutex.

### Using Critical Sections

The primary APIs for using critical sections are:

- `Py_BEGIN_CRITICAL_SECTION` and `Py_END_CRITICAL_SECTION` -
For locking a single object

- `Py_BEGIN_CRITICAL_SECTION2` and `Py_END_CRITICAL_SECTION2`
- For locking two objects simultaneously

These macros must be used in matching pairs and must appear in the same C
scope, since they establish a new local scope.  These macros are no-ops in
non-free-threaded builds, so they can be safely added to code that needs to
support both build types.

A common use of a critical section would be to lock an object while accessing
an internal attribute of it.  For example, if an extension type has an internal
count field, you could use a critical section while reading or writing that
field:

```
// read the count, returns new reference to internal count value
PyObject *result;
Py_BEGIN_CRITICAL_SECTION(obj);
result = Py_NewRef(obj->count);
Py_END_CRITICAL_SECTION();
return result;

// write the count, consumes reference from new_count
Py_BEGIN_CRITICAL_SECTION(obj);
obj->count = new_count;
Py_END_CRITICAL_SECTION();
```

### How Critical Sections Work

Unlike traditional locks, critical sections do not guarantee exclusive access
throughout their entire duration. If a thread would block while holding a
critical section (e.g., by acquiring another lock or performing I/O), the
critical section is temporarily suspended—all locks are released—and then
resumed when the blocking operation completes.

This behavior is similar to what happens with the GIL when a thread makes a
blocking call. The key <example-value> are:

- Critical sections operate on a per-object basis rather than globally

- Critical sections follow a stack discipline within each thread (the "begin" and
"end" macros enforce this since they must be paired and within the same scope)

- Critical sections automatically release and reacquire locks around potential
blocking operations

### Deadlock Avoidance

Critical sections help avoid deadlocks in two ways:

1. If a thread tries to acquire a lock that's already held by another thread,
it first suspends all of its active critical sections, temporarily releasing
their locks

1. When the blocking operation completes, only the top-most critical section is
reacquired first

This means you cannot rely on nested critical sections to lock multiple objects
at once, as the inner critical section may suspend the outer ones. Instead, use
`Py_BEGIN_CRITICAL_SECTION2` to lock two objects simultaneously.

Note that the locks described above are only `PyMutex` based locks.
The critical section implementation does not know about or affect other locking
mechanisms that might be in use, like POSIX mutexes.  Also note that while
blocking on any `PyMutex` causes the critical sections to be
suspended, only the mutexes that are part of the critical sections are
released.  If `PyMutex` is used without a critical section, it will
not be released and therefore does not get the same deadlock avoidance.

### Important Considerations

- Critical sections may temporarily release their locks, allowing other threads
to modify the protected data. Be careful about making assumptions about the
state of the data after operations that might block.

- Because locks can be temporarily released (suspended), entering a critical
section does not guarantee exclusive access to the protected resource
throughout the section's duration. If code within a critical section calls
another function that blocks (e.g., acquires another lock, performs blocking
I/O), all locks held by the thread via critical sections will be released.
This is similar to how the GIL can be released during blocking calls.

- Only the lock(s) associated with the most recently entered (top-most)
critical section are guaranteed to be held at any given time. Locks for
outer, nested critical sections might have been suspended.

- You can lock at most two objects simultaneously with these APIs. If you need
to lock more objects, you'll need to restructure your code.

- While critical sections will not deadlock if you attempt to lock the same
object twice, they are less efficient than purpose-built reentrant locks for
this use case.

- When using `Py_BEGIN_CRITICAL_SECTION2`, the order of the objects
doesn't affect correctness (the implementation handles deadlock avoidance),
but it's good practice to always lock objects in a consistent order.

- Remember that the critical section macros are primarily for protecting access
to *Python objects* that might be involved in internal CPython operations
susceptible to the deadlock scenarios described above. For protecting purely
internal extension state, standard mutexes or other synchronization
primitives might be more appropriate.

### Per-Object Locks (`ob_mutex`)

In the free-threaded build, each Python object contains a `ob_mutex`
field of type `PyMutex`.  This mutex is **reserved for use by the
critical section API** (`Py_BEGIN_CRITICAL_SECTION` /
`Py_END_CRITICAL_SECTION`).

> **Warning:** Do **not** lock `ob_mutex` directly with `PyMutex_Lock(&obj->ob_mutex)`.
> Mixing direct `PyMutex_Lock` calls with the critical section API on the
> same mutex can cause deadlocks.

Even if your own code never uses critical sections on a particular object type,
**CPython internals may use the critical section API on any Python object**.

If your extension type needs its own lock, add a separate `PyMutex`
field (or another synchronization primitive) to your object struct.
`PyMutex` is very lightweight, so there is negligible cost to having
an additional one.

## Building Extensions for the Free-Threaded Build

C API extensions need to be built specifically for the free-threaded build.
The wheels, shared libraries, and binaries are indicated by a `t` suffix.

- pypa/manylinux supports the
free-threaded build, with the `t` suffix, such as `python3.14t`.
- pypa/cibuildwheel supports
building wheels for the free-threaded build of Python 3.14 and newer.

### Limited C API and Stable ABI

The free-threaded build does not currently support the
Limited C API or the stable ABI.  If you use
setuptools to build
your extension and currently set `py_limited_api=True` you can use
`py_limited_api=not sysconfig.get_config_var("Py_GIL_DISABLED")` to opt out
of the limited API when building with the free-threaded build.

> **Note:** You will need to build separate wheels specifically for the free-threaded
> build.  If you currently use the stable ABI, you can continue to build a
> single wheel for multiple non-free-threaded Python versions.

### Windows

Due to a limitation of the official Windows installer, you will need to
manually define `Py_GIL_DISABLED=1` when building extensions from source.

> **See also:** `Porting Extension Modules to Support Free-Threading
> <https://py-free-threading.github.io/porting/>`_:
> A community-maintained porting guide for extension authors.
