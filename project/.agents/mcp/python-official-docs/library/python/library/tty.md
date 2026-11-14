---
title: "tty --- Terminal control functions"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tty.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `tty` --- Terminal control functions

Module `tty`.

**Source code:** Lib/tty.py

The `tty` module defines functions for putting the tty into cbreak and raw
modes.

> **Availability:** Unix.

Because it requires the `termios` module, it will work only on Unix.

The `tty` module defines the following functions:

### `cfmakeraw(mode)`

Convert the tty attribute list *mode*, which is a list like the one returned
by `termios.tcgetattr()`, to that of a tty in raw mode.

> *Added in version 3.12.*

### `cfmakecbreak(mode)`

Convert the tty attribute list *mode*, which is a list like the one returned
by `termios.tcgetattr()`, to that of a tty in cbreak mode.

This clears the `ECHO` and `ICANON` local mode flags in *mode* as well
as setting the minimum input to 1 byte with no delay.

> *Added in version 3.12.*

> *Changed in version 3.12.2.*
> The `ICRNL` flag is no longer cleared. This matches Linux and macOS
> `stty cbreak` behavior and what `setcbreak()` historically did.

### `setraw(fd, when=termios.TCSAFLUSH)`

Change the mode of the file descriptor *fd* to raw. If *when* is omitted, it
defaults to `termios.TCSAFLUSH`, and is passed to
`termios.tcsetattr()`. The return value of `termios.tcgetattr()`
is saved before setting *fd* to raw mode; this value is returned.

> *Changed in version 3.12.*
> The return value is now the original tty attributes, instead of `None`.

### `setcbreak(fd, when=termios.TCSAFLUSH)`

Change the mode of file descriptor *fd* to cbreak. If *when* is omitted, it
defaults to `termios.TCSAFLUSH`, and is passed to
`termios.tcsetattr()`. The return value of `termios.tcgetattr()`
is saved before setting *fd* to cbreak mode; this value is returned.

This clears the `ECHO` and `ICANON` local mode flags as well as setting
the minimum input to 1 byte with no delay.

> *Changed in version 3.12.*
> The return value is now the original tty attributes, instead of `None`.

> *Changed in version 3.12.2.*
> The `ICRNL` flag is no longer cleared. This restores the behavior
> of Python 3.11 and earlier as well as matching what Linux, macOS, & BSDs
> describe in their `stty(1)` man pages regarding cbreak mode.

> **See also:** Module `termios`
> Low-level terminal control interface.
