---
title: "core::convert::num"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/convert/num.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::convert::num

## macro impl_from_bool!

```rust
macro_rules! impl_from_bool
```

Implement `From<bool>` for integers

## macro impl_from!

```rust
macro_rules! impl_from
```

Implement `From<$small>` for `$large`

## macro impl_try_from_integer_for_bool!

```rust
macro_rules! impl_try_from_integer_for_bool
```

Implement `TryFrom<integer>` for `bool`
