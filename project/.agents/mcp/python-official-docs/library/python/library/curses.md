---
title: "curses --- Terminal handling for character-cell displays (part 1 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `curses` --- Terminal handling for character-cell displays

Module `curses`.

**Source code:** Lib/curses

The `curses` module provides an interface to the curses library, the
de-facto standard for portable advanced terminal handling.

While curses is most widely used in the Unix environment, versions are available
for Windows, DOS, and possibly other systems as well.  This extension module is
designed to match the API of ncurses, an open-source curses library hosted on
Linux and the BSD variants of Unix.

> **Availability:** Unix.

> **Note:** Whenever the documentation mentions a *character* it can be specified
> as an integer, a one-character Unicode string or a one-byte byte string.
> An integer is the code of a single encoded byte, optionally combined with
> attributes and a color pair, as returned by `window.inch()`.
>
> Whenever the documentation mentions a *character string* it can be specified
> as a Unicode string or a byte string.

> **Note:** Whether curses may be used from several threads
> depends on the underlying library and how it was built.
> In many implementations, including the default build of ncurses,
> the screen state is shared and not thread-safe;
> since the blocking and refresh methods
> (such as `getch()` and `refresh()`)
> release the GIL,
> unsynchronized use from several threads can then crash the interpreter.
> Serialize the calls.

> **See also:** Module `curses.ascii`
> Utilities for working with ASCII characters, regardless of your locale settings.
>
> Module `curses.panel`
> A panel stack extension that adds depth to  curses windows.
>
> Module `curses.textpad`
> Editable text widget for curses supporting  `Emacs`-like bindings.
>
> curses-howto
> Tutorial material on using curses with Python, by Andrew Kuchling and Eric
> Raymond.
