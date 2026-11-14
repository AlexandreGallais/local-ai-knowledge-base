---
title: "core::num::imp::fmt"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/fmt.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::fmt

Shared utilities used by both float and integer formatting.

## enum Part

```rust
pub enum Part<'a>
```

Formatted parts.

## Part::len

```rust
pub fn len(&self) -> usize
```

Returns the exact byte length of given part.

## Part::write

```rust
pub fn write(&self, out: &mut [u8]) -> Option<usize>
```

Writes a part into the supplied buffer.
Returns the number of written bytes, or `None` if the buffer is not enough.
(It may still leave partially written bytes in the buffer; do not rely on that.)

## struct Formatted

```rust
pub struct Formatted<'a>
```

Formatted result containing one or more parts.
This can be written to the byte buffer or converted to the allocated string.

## Formatted::len

```rust
pub fn len(&self) -> usize
```

Returns the byte length of combined formatted result.

Saturates at `usize::MAX` if the actual length is larger.

This matters on 16-bit targets, where exponential formatting can exceed
`usize::MAX` by emitting `u16::MAX` trailing zeroes plus `"1."` / `"e0"`.

## Formatted::write

```rust
pub fn write(&self, out: &mut [u8]) -> Option<usize>
```

Writes all formatted parts into the supplied buffer.
Returns the number of written bytes, or `None` if the buffer is not enough.
(It may still leave partially written bytes in the buffer; do not rely on that.)
