---
title: "core::field"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/field.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::field

Field Reflection

## Field::Base

```rust
type Base
```

The type of the base where this field exists in.

## Field::Type

```rust
type Type
```

The type of the field.

## Field::OFFSET

```rust
const OFFSET: usize = crate::intrinsics::field_offset::<Self>()
```

The offset of the field in bytes.
