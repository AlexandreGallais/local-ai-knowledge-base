---
title: "core::default"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/default.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::default

The `Default` trait for types with a default value.

## trait Default

```rust
pub const trait Default: Sized
```

A trait for giving a type a useful default value.

Sometimes, you want to fall back to some kind of default value, and
don't particularly care what it is. This comes up often with `struct`s
that define a set of options:

```rust
struct SomeOptions {
    foo: i32,
    bar: f32,
}
```

How can we define some default values? You can use `Default`:

```rust
#[derive(Default)]
struct SomeOptions {
    foo: i32,
    bar: f32,
}

fn main() {
    let options: SomeOptions = Default::default();
}
```

Now, you get all of the default values. Rust implements `Default` for various primitive types.

If you want to override a particular option, but still retain the other defaults:

```rust
fn main() {
    let options = SomeOptions { foo: 42, ..Default::default() };
}
```

## Derivable

This trait can be used with `#[derive]` if all of the type's fields implement
`Default`. When `derive`d, it will use the default value for each field's type.

### `enum`s

When using `#[derive(Default)]` on an `enum`, you need to choose which unit variant will be
default. You do this by placing the `#[default]` attribute on the variant.

```rust
#[derive(Default)]
enum Kind {
    #[default]
    A,
    B,
    C,
}
```

You cannot use the `#[default]` attribute on non-unit or non-exhaustive variants.

The `#[default]` attribute was stabilized in Rust 1.62.0.

## How can I implement `Default`?

Provide an implementation for the `default()` method that returns the value of
your type that should be the default:

```rust
enum Kind {
    A,
    B,
    C,
}

impl Default for Kind {
    fn default() -> Self { Kind::A }
}
```

# Examples

```rust
#[derive(Default)]
struct SomeOptions {
    foo: i32,
    bar: f32,
}
```
