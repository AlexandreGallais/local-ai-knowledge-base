---
title: "core::fmt::num"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/fmt/num.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::fmt::num

Integer and floating-point number formatting

## macro radix_integer!

```rust
macro_rules! radix_integer
```

Formatting of integers with a non-decimal radix.

## macro radix_integers!

```rust
macro_rules! radix_integers
```

Formatting of integers with a non-decimal radix.

## Signed::format_into

```rust
pub fn format_into(self, buf: &mut NumBuffer<Self>) -> &str
```

```rust

## Unsigned::format_into

```rust
pub fn format_into(self, buf: &mut NumBuffer<Self>) -> &str
```

```rust

## u128::format_into

```rust
pub fn format_into(self, buf: &mut NumBuffer<Self>) -> &str
```

Formats this integer as an unsigned decimal number, using the memory pointed to by
`buf` as storage for the returned string slice.

This method can be used to convert integers to strings without involving the
dynamic dispatch that using `Display`[fmt::Display] would.
This may be more efficient in situations where `fmt` is not otherwise used.

# Examples

```rust
use core::fmt::NumBuffer;

let n = 0u128;
let mut buf = NumBuffer::new();
assert_eq!(n.format_into(&mut buf), "0");

let n1 = 32u128;
let mut buf1 = NumBuffer::new();
assert_eq!(n1.format_into(&mut buf1), "32");

let n2 = u128::MAX;
let mut buf2 = NumBuffer::new();
assert_eq!(n2.format_into(&mut buf2), u128::MAX.to_string());
```

## i128::format_into

```rust
pub fn format_into(self, buf: &mut NumBuffer<Self>) -> &str
```

Formats this integer as a signed decimal number, using the memory pointed to by
`buf` as storage for the returned string slice.

This method can be used to convert integers to strings without involving the
dynamic dispatch that using `Display`[fmt::Display] would.
This may be more efficient in situations where `fmt` is not otherwise used.

# Examples

```rust
use core::fmt::NumBuffer;

let n = 0i128;
let mut buf = NumBuffer::new();
assert_eq!(n.format_into(&mut buf), "0");

let n1 = i128::MIN;
assert_eq!(n1.format_into(&mut buf), i128::MIN.to_string());

let n2 = i128::MAX;
assert_eq!(n2.format_into(&mut buf), i128::MAX.to_string());
```
