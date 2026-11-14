---
title: "std::sys::pal::windows::compat"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/windows/compat.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::windows::compat

A "compatibility layer" for supporting older versions of Windows

The standard library uses some Windows API functions that are not present
on older versions of Windows.  (Note that the oldest version of Windows
that Rust supports is Windows 7 (client) and Windows Server 2008 (server).)
This module implements a form of delayed DLL import binding, using
`GetModuleHandle` and `GetProcAddress` to look up DLL entry points at
runtime.

This is implemented simply by storing a function pointer in an atomic.
Loading and calling this function will have little or no overhead
compared with calling any other dynamically imported function.

The stored function pointer starts out as an importer function which will
swap itself with the real function when it's called for the first time. If
the real function can't be imported then a fallback function is used in its
place. While this is low cost for the happy path (where the function is
already loaded) it does mean there's some overhead the first time the
function is called. In the worst case, multiple threads may all end up
importing the same function unnecessarily.

## macro ansi_str!

```rust
macro_rules! ansi_str
```

Helper macro for creating CStrs from literals and symbol names.

## Module::new

```rust
pub unsafe fn new(name: &CStr) -> Option<Self>
```

Try to get a handle to a loaded module.

# SAFETY

This should only be use for modules that exist for the lifetime of std
(e.g. kernel32 and ntdll).

## macro compat_fn_with_fallback!

```rust
macro_rules! compat_fn_with_fallback
```

Load a function or use a fallback implementation if that fails.

## macro compat_fn_optional!

```rust
macro_rules! compat_fn_optional
```

Optionally loaded functions.

Relies on the functions being pre-loaded elsewhere.
