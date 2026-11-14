---
title: "winreg --- Windows registry access (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/winreg.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `winreg` --- Windows registry access

Module `winreg`.

**Source code:** PC/winreg.c

These functions expose the Windows registry API to Python.  Instead of using an
integer as the registry handle, a handle object is used
to ensure that the handles are closed correctly, even if the programmer neglects
to explicitly close them.

> **Availability:** Windows.

> *Changed in version 3.3.*
> Several functions in this module used to raise a
> `WindowsError`, which is now an alias of `OSError`.
