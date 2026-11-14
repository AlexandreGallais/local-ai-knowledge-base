---
title: "std::sys::pal::unix::weak"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/unix/weak/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::unix::weak

Support for "weak linkage" to symbols on Unix

Some I/O operations we do in std require newer versions of OSes but we need
to maintain binary compatibility with older releases for now. In order to
use the new functionality when available we use this module for detection.

One option to use here is weak linkage, but that is unfortunately only
really workable with ELF. Otherwise, use dlsym to get the symbol value at
runtime. This is also done for compatibility with older versions of glibc,
and to avoid creating dependencies on GLIBC_PRIVATE symbols. It assumes that
we've been dynamically linked to the library the symbol comes from, but that
is currently always the case for things like libpthread/libc.

A long time ago this used weak linkage for the __pthread_get_minstack
symbol, but that caused Debian to detect an unnecessarily strict versioned
dependency on libc6 (#23628) because it is GLIBC_PRIVATE. We now use `dlsym`
for a runtime lookup of that symbol to avoid the ELF versioned dependency.
