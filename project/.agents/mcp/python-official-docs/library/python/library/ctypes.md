---
title: "ctypes --- A foreign function library for Python (part 1 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `ctypes` --- A foreign function library for Python

Module `ctypes`.

**Source code:** Lib/ctypes

`ctypes` is a foreign function library for Python.  It provides C compatible
data types, and allows calling functions in DLLs or shared libraries.  It can be
used to wrap these libraries in pure Python.

> **Warning:** `ctypes` provides low-level access to native libraries and the
> process's memory, bypassing Python's safety mechanisms and allowing
> execution of arbitrary native code.
> Incorrect use can corrupt data and objects, reveal sensitive information,
> cause crashes, or otherwise compromise the running process.
