---
title: "core::io::error::os_functions_atomic"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/io/error/os_functions_atomic.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::io::error::os_functions_atomic

OS-dependent functions

`Error` needs OS functionalities to work interpret raw OS errors, but
we can't link to anythink here in `alloc`. Therefore, we restrict
creation of `Error` from raw OS errors in `std`, and require providing
a vtable of operations when creating one.
