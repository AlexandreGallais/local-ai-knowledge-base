---
title: "shutil --- High-level file operations (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/shutil.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `shutil` --- High-level file operations

Module `shutil`.

**Source code:** Lib/shutil.py

The `shutil` module offers a number of high-level operations on files and
collections of files.  In particular, functions are provided  which support file
copying and removal. For operations on individual files, see also the
`os` module.

> **Warning:** Even the higher-level file copying functions (`shutil.copy()`,
> `shutil.copy2()`) cannot copy all file metadata.
>
> On POSIX platforms, this means that file owner and group are lost as well
> as ACLs.  On Mac OS, the resource fork and other metadata are not used.
> This means that resources will be lost and file type and creator codes will
> not be correct. On Windows, file owners, ACLs and alternate data streams
> are not copied.
