---
title: "core::io::io_slice::repr_uefi"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/io/io_slice/repr_uefi.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::io::io_slice::repr_uefi

A buffer type used with `Write::write_vectored` for UEFI Networking APIs. Vectored writing to
File is not supported as of UEFI Spec 2.11.
