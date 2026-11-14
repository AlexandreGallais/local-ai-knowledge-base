---
title: "alloc::io::util"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/util.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::util

## struct Bytes

```rust
pub struct Bytes<R>
```

An iterator over `u8` values of a reader.

This struct is generally created by calling `bytes` on a reader.
Please see the documentation of `bytes` for more details.

## struct Split

```rust
pub struct Split<B>
```

An iterator over the contents of an instance of `BufRead` split on a
particular byte.

This struct is generally created by calling `split` on a `BufRead`.
Please see the documentation of `split` for more details.

## struct Lines

```rust
pub struct Lines<B>
```

An iterator over the lines of an instance of `BufRead`.

This struct is generally created by calling `lines` on a `BufRead`.
Please see the documentation of `lines` for more details.
