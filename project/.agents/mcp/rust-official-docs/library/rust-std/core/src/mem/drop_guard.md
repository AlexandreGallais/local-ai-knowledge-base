---
title: "core::mem::drop_guard"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/mem/drop_guard.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::mem::drop_guard

## struct DropGuard

```rust
pub struct DropGuard<T, F> where F: FnOnce(T),
```

Wrap a value and run a closure when dropped.

This is useful for quickly creating destructors inline.

# Examples

```rust

use std::mem::DropGuard;

{
    // Create a new guard around a string that will
    // print its value when dropped.
    let s = String::from("Chashu likes tuna");
    let mut s = DropGuard::new(s, |s| println!("{s}"));

    // Modify the string contained in the guard.
    s.push_str("!!!");

    // The guard will be dropped here, printing:
    // "Chashu likes tuna!!!"
}
```

## DropGuard::new

```rust
pub const fn new(inner: T, f: F) -> Self
```

Create a new instance of `DropGuard`.

# Example

```rust

use std::mem::DropGuard;

let value = String::from("Chashu likes tuna");
let guard = DropGuard::new(value, |s| println!("{s}"));
```

## DropGuard::dismiss

```rust
pub const fn dismiss(guard: Self) -> T where F: [const] Destruct,
```

Consumes the `DropGuard`, returning the wrapped value.

This will not execute the closure. It is typically preferred to call
this function instead of `mem::forget` because it will return the stored
value and drop variables captured by the closure instead of leaking their
owned resources.

# Example

```rust

use std::mem::DropGuard;

let value = String::from("Nori likes chicken");
let guard = DropGuard::new(value, |s| println!("{s}"));
assert_eq!(DropGuard::dismiss(guard), "Nori likes chicken");
```
