---
title: "std::sys::thread_local::destructors::linux_like"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/destructors/linux_like.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::destructors::linux_like

Destructor registration for Linux-like systems.

Since what appears to be version 2.18, glibc has shipped the
`__cxa_thread_atexit_impl` symbol which GCC and clang both use to invoke
destructors in C++ thread_local globals. This function does exactly what
we want: it schedules a callback which will be run at thread exit with the
provided argument.

Unfortunately, our minimum supported glibc version (at the time of writing)
is 2.17, so we can only link this symbol weakly and need to use the
`list` destructor implementation as fallback.
