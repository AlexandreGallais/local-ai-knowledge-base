---
title: "core::cell::once"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/cell/once.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::cell::once

## struct OnceCell

```rust
pub struct OnceCell<T>
```

A cell which can nominally be written to only once.

This allows obtaining a shared `&T` reference to its inner value without copying or replacing
it (unlike `Cell`), and without runtime borrow checks (unlike `RefCell`). However,
only immutable references can be obtained unless one has a mutable reference to the cell
itself. In the same vein, the cell can only be re-initialized with such a mutable reference.

A `OnceCell` can be thought of as a safe abstraction over uninitialized data that becomes
initialized once written.

For a thread-safe version of this struct, see `std::sync::OnceLock`.

# Examples

```rust
use std::cell::OnceCell;

let cell = OnceCell::new();
assert!(cell.get().is_none());

let value: &String = cell.get_or_init(|| {
    "Hello, World!".to_string()
});
assert_eq!(value, "Hello, World!");
assert!(cell.get().is_some());
```

## OnceCell::new

```rust
pub const fn new() -> OnceCell<T>
```

Creates a new uninitialized cell.

## OnceCell::get

```rust
pub fn get(&self) -> Option<&T>
```

Gets the reference to the underlying value.

Returns `None` if the cell is uninitialized.

## OnceCell::get_mut

```rust
pub fn get_mut(&mut self) -> Option<&mut T>
```

Gets the mutable reference to the underlying value.

Returns `None` if the cell is uninitialized.

## OnceCell::set

```rust
pub fn set(&self, value: T) -> Result<(), T>
```

Initializes the contents of the cell to `value`.

# Errors

This method returns `Ok(())` if the cell was uninitialized
and `Err(value)` if it was already initialized.

# Examples

```rust
use std::cell::OnceCell;

let cell = OnceCell::new();
assert!(cell.get().is_none());

assert_eq!(cell.set(92), Ok(()));
assert_eq!(cell.set(62), Err(62));

assert!(cell.get().is_some());
```

## OnceCell::get_or_init

```rust
pub fn get_or_init<F>(&self, f: F) -> &T where F: FnOnce() -> T,
```

Gets the contents of the cell, initializing it to `f()`
if the cell was uninitialized.

# Panics

If `f()` panics, the panic is propagated to the caller, and the cell
remains uninitialized.

It is an error to reentrantly initialize the cell from `f`. Doing
so results in a panic.

# Examples

```rust
use std::cell::OnceCell;

let cell = OnceCell::new();
let value = cell.get_or_init(|| 92);
assert_eq!(value, &92);
let value = cell.get_or_init(|| unreachable!());
assert_eq!(value, &92);
```

## OnceCell::into_inner

```rust
pub const fn into_inner(self) -> Option<T>
```

Consumes the cell, returning the wrapped value.

Returns `None` if the cell was uninitialized.

# Examples

```rust
use std::cell::OnceCell;

let cell: OnceCell<String> = OnceCell::new();
assert_eq!(cell.into_inner(), None);

let cell = OnceCell::new();
let _ = cell.set("hello".to_owned());
assert_eq!(cell.into_inner(), Some("hello".to_owned()));
```

## OnceCell::take

```rust
pub fn take(&mut self) -> Option<T>
```

Takes the value out of this `OnceCell`, moving it back to an uninitialized state.

Has no effect and returns `None` if the `OnceCell` is uninitialized.

Safety is guaranteed by requiring a mutable reference.

# Examples

```rust
use std::cell::OnceCell;

let mut cell: OnceCell<String> = OnceCell::new();
assert_eq!(cell.take(), None);

let mut cell = OnceCell::new();
let _ = cell.set("hello".to_owned());
assert_eq!(cell.take(), Some("hello".to_owned()));
assert_eq!(cell.get(), None);
```
