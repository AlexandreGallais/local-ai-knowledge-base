---
title: "core::fmt::num_buffer"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/fmt/num_buffer.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::fmt::num_buffer

## struct NumBuffer

```rust
pub struct NumBuffer<T: NumBufferTrait>
```

Memory for formatting numbers using `T::format_into()`[u8::format_into].

This type consists of enough memory to hold the longest decimal string representation
a number of type `T` could have.
It is used only by calling `format_into()`; there is no other way to access its contents.
Its purpose is to allow formatting numbers without involving the dynamic dispatch of the
`fmt` system, which may be more efficient when `fmt` is not otherwise used.

# Examples

```rust
use core::fmt::NumBuffer;

let mut buf = NumBuffer::new();
let n1 = 1972u32;
assert_eq!(n1.format_into(&mut buf), "1972");

// Formatting a negative integer includes the sign.
let mut buf = NumBuffer::new();
let n2 = -1972i32;
assert_eq!(n2.format_into(&mut buf), "-1972");
```

## NumBuffer::new

```rust
pub const fn new() -> Self
```

Initializes internal buffer.
