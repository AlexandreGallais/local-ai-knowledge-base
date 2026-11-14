---
title: "Migrating to Stable ABI for free threading (abi3t) (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/abi3t-migration.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Migrating to Stable ABI for free threading (`abi3t`)

Starting with the 3.15 release, CPython supports a variant of the Stable ABI
that supports free-threaded Python:
the Stable ABI for Free-Threaded Builds, or `abi3t` for short.
This document describes how to adapt C API extensions to support free threading.

## Why do this

The typical reason to use the Stable ABI is to reduce the number of artifacts
that you need to build and distribute for each version of your library.

Without the Stable ABI, you must build a separate shared library, and typically
a *wheel* distribution, for each feature version of CPython you wish
to support.
For example, each tag in the following table represents a separate
library/wheel:

```text
+-----------------+-----------------------+------------------------+
| CPython version | Non-free-threaded     | Free-threaded          |
+=================+=======================+========================+
| 3.12            | ``cpython-312``       | ---                    |
+-----------------+-----------------------+------------------------+
| 3.13            | ``cpython-313``       | ``cpython-313t``       |
+-----------------+-----------------------+------------------------+
| 3.14            | ``cpython-314``       | ``cpython-314t``       |
+-----------------+-----------------------+------------------------+
| 3.15            | ``cpython-315``       | ``cpython-315t``       |
+-----------------+-----------------------+------------------------+
| 3.16            | ``cpython-316``       | ``cpython-316t``       |
+-----------------+-----------------------+------------------------+
| Later versions  | :samp:`cpython-3{XX}` | :samp:`cpython-3{XX}t` |
+-----------------+-----------------------+------------------------+
```

That's a lot of builds, especially when multiplied by the number
of supported platforms.

With the Stable ABI (`abi3`, introduced in CPython 3.2), a single extension
(per platform) can cover all *non-free-threaded* builds of CPython:

```text
+-----------------+-------------------+------------------------+
| CPython version | Non-free-threaded | Free-threaded          |
+=================+===================+========================+
| 3.12            | ``abi3``          | ---                    |
+-----------------+                   +------------------------+
| 3.13            |                   | ``cpython-313t``       |
+-----------------+                   +------------------------+
| 3.14            |                   | ``cpython-314t``       |
+-----------------+                   +------------------------+
| 3.15            |                   | ``cpython-315t``       |
+-----------------+                   +------------------------+
| 3.16            |                   | ``cpython-316t``       |
+-----------------+                   +------------------------+
| Later versions  |                   | :samp:`cpython-3{XX}t` |
+-----------------+-------------------+------------------------+
```

The Stable ABI for free-threaded builds (`abi3t`), introduced in
CPython 3.15, does the same for free-threaded builds.
And it's compatible with non-free-threaded ones as well:

```text
+-----------------+-------------------+------------------+
| CPython version | Non-free-threaded | Free-threaded    |
+=================+===================+==================+
| 3.12            | ``abi3`` *        | ---              |
+-----------------+                   +------------------+
| 3.13            |                   | ``cpython-313t`` |
+-----------------+                   +------------------+
| 3.14            |                   | ``cpython-314t`` |
+-----------------+-------------------+------------------+
| 3.15            | ``abi3t``                            |
+-----------------+                                      +
| 3.16            |                                      |
+-----------------+                                      +
| Later versions  |                                      |
+-----------------+-------------------+------------------+
```

* (As above, the `abi3` extension is compatible with all non-free-threaded
builds; even the 3.15+ ones that this table "attributes" to `abi3t`.)

### Why *not* do this

There are two main downsides to the Stable ABI.

First, your extension may become slower, since the Stable ABI prioritizes
compatibility over performance.
The difference is usually not noticeable, and often can be mitigated by
using the same source to build both a Stable ABI build and a few
version-specific ones for "tier 1" CPython versions.

Second, not all of the C API is available.
Extensions need to be ported to build for the Stable ABI, which may be difficult
or, in rare cases, impossible.

Specifically, `abi3t` requires APIs added in CPython 3.15.
If you want to build your extension for older versions of CPython from the
same source, you have two main options:

- Use preprocessor conditionals.

When following this guide, use `#ifdef Py_TARGET_ABI3T` blocks whenever
you are told to do a change that breaks the build on CPython versions you
care about. Keep the pre-existing code in `#else` blocks.

For hand-written C extensions, this approach is reasonable down to
CPython 3.12, due to additions introduced in PEP 697.
Keeping compatibility with 3.11 and below may be worth it for code
generators (for example, Cython).

- Do not port to `abi3t`, and continue building separate extensions for
each version of CPython, until you can drop support for the older versions.

This is a valid approach. Not all extensions need to switch to `abi3t`
right now.

## Prerequisites

This guide assumes that you have an extension written directly in C (or C++),
which you want to port to `abi3t`.

If your extension uses a code generator (like Cython) or language binding
(like PyO3), it's best to wait until that tool has support for `abi3t`.
If you maintain such a tool, you might be able to adapt the instructions
here for your tool.

### Non-free-threaded Stable ABI

Your extension should support the non-free-threaded Stable ABI (`abi3`).
If not, either port it first, or follow this guide but be prepared to fix
issues it does not mention.

### Free-threading support

While it's technically not a hard prerequisite, you will most likely want to
prepare your extension for free threading before you port it to `abi3t`.
See freethreading-extensions-howto for instructions.

> **See also:** `Porting Extension Modules to Support Free-Threading
> <https://py-free-threading.github.io/porting/>`__:
> A community-maintained porting guide for extension authors.

### Isolating extension modules

Your module should use multi-phase initialization,
and it should either be isolated or limit itself to be loaded at most once
per process.
If it is not your case, follow isolating-extensions-howto first.
(See the opt-out section for a shortcut.)

### Avoiding variable-sized types

If your extension defines variable-sized types (using `Py_tp_itemsize`
or `PyTypeObject.tp_itemsize`), it cannot be ported to
`abi3t` 3.15.

## Setting up the build

If you use a build tool, search its documentation for "`abi3t`", and follow
any instructions to select the ABI.
For reference, here are direct links for several popular build tools:

- `meson-python
<https://mesonbuild.com/meson-python/how-to-guides/limited-api.html#the-abi3t-stable-abi>`__
- `scikit-build-core
<https://scikit-build-core.readthedocs.io/en/stable/configuration/#customizing-the-output-wheel>`__
- Maturin

You may want to verify that the tool set the right flag by temporarily adding the
following just after `#include <Python.h>`:

```
#if Py_TARGET_ABI3T+0 <= 0x30f0000
#error "abi3t define is not set!"
#endif
```

This should result in a different error than "`abi3t` define is not set".

> **See also:** `Building and distributing abi3t extensions
> <https://py-free-threading.github.io/abi3t/>`__:
> Build configuration and wheel testing examples in the community-maintained
> Python Free-Threading Guide.

> **Note:** If your build tool doesn't support `abi3t` yet, set the following macro
> before including `Python.h`:
>
>
> ```
> #define Py_TARGET_ABI3T 0x30f0000
> ```
>
>
> or specify it as a compiler flag, for example:
>
>
> ```
> -DPy_TARGET_ABI3T=0x30f0000
> ```
>
>
> Once your extension builds with this setting, it will be compatible with
> CPython 3.15 and above.
>
> If you set this macro manually, you will later need to name and tag the
> resulting extension manually as well.
> This is covered in abi3t-migration-tagging below.

This guide will ask you to make a series of changes.
After each one, verify that your extension still builds in the original
(non-`abi3t`) configuration, and ideally run tests on all Python
versions you support.
This will ensure that nothing breaks as you are porting.
