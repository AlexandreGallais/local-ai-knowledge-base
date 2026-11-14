---
title: "std::os::fortanix_sgx::io"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/fortanix_sgx/io.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::fortanix_sgx::io

SGX-specific extensions to general I/O primitives

SGX file descriptors behave differently from Unix file descriptors. See the
description of `TryIntoRawFd` for more details.

## FromRawFd::Metadata

```rust
type Metadata: Default
```

An associated type that contains relevant metadata for `Self`.
