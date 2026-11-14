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