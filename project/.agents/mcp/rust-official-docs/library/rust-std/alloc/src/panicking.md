---
title: "alloc::panicking"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/panicking.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::panicking

## trait PanicPayload

```rust
pub trait PanicPayload: Display
```

An internal trait used by std to pass data from std to `panic_unwind` and
other panic runtimes. Not intended to be stabilized any time soon, do not
use.

## PanicPayload::take_box

```rust
fn take_box(&mut self) -> Box<dyn Any + Send>
```

Take full ownership of the contents.

After this method got called, only some dummy default value is left in `self`.
Calling this method twice, or calling `get` after calling this method, is an error.

The argument is borrowed because the panic runtime (`__rust_start_panic`) only
gets a borrowed `dyn PanicPayload`.

## PanicPayload::get

```rust
fn get(&mut self) -> &(dyn Any + Send)
```

Just borrow the contents.

## PanicPayload::as_str

```rust
fn as_str(&mut self) -> Option<&str>
```

Tries to borrow the contents as `&str`, if possible without doing any allocations.
