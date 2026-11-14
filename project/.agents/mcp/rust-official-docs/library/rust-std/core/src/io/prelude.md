---
title: "core::io::prelude"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/io/prelude.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::io::prelude

The I/O Prelude.

The purpose of this module is to alleviate imports of many common I/O traits
by adding a glob import to the top of I/O heavy modules:

```rust
use core::io::prelude::*;
```
