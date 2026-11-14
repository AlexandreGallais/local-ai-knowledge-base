---
title: "os --- Miscellaneous operating system interfaces (part 6 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 6 of 16)

### `columns`

Width of the terminal window in characters.

### `lines`

Height of the terminal window in characters.

### Inheritance of File Descriptors

> *Added in version 3.4.*

A file descriptor has an "inheritable" flag which indicates if the file descriptor
can be inherited by child processes.  Since Python 3.4, file descriptors
created by Python are non-inheritable by default.

On UNIX, non-inheritable file descriptors are closed in child processes at the
execution of a new program, other file descriptors are inherited. Note that
non-inheritable file descriptors are still *inherited* by child processes on `os.fork()`.

On Windows, non-inheritable handles and file descriptors are closed in child
processes, except for standard streams (file descriptors 0, 1 and 2: stdin, stdout
and stderr), which are always inherited.  Using `spawn*()` functions,
all inheritable handles and all inheritable file descriptors are inherited.
Using the `subprocess` module, all file descriptors except standard
streams are closed, and inheritable handles are only inherited if the
*close_fds* parameter is `False`.

On WebAssembly platforms, the file descriptor cannot be modified.

### `get_inheritable(fd, /)`

Get the "inheritable" flag of the specified file descriptor (a boolean).

### `set_inheritable(fd, inheritable, /)`

Set the "inheritable" flag of the specified file descriptor.

### `get_handle_inheritable(handle, /)`

Get the "inheritable" flag of the specified handle (a boolean).

> **Availability:** Windows.

### `set_handle_inheritable(handle, inheritable, /)`

Set the "inheritable" flag of the specified handle.

> **Availability:** Windows.
