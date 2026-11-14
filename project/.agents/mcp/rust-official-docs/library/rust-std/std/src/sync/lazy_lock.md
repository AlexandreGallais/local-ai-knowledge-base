---
title: "std::sync::lazy_lock"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/lazy_lock.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::lazy_lock

## struct LazyLock

```rust
pub struct LazyLock<T, F = fn() -> T>
```

A value which is initialized on the first access.

This type is a thread-safe `LazyCell`, and can be used in statics.
Since initialization may be called from multiple threads, any
dereferencing call will block the calling thread if another
initialization routine is currently running.

# Poisoning

If the initialization closure passed to `LazyLock::new` panics, the lock will be poisoned.
Once the lock is poisoned, any threads that attempt to access this lock (via a dereference
or via an explicit call to `force()`) will panic.

This concept is similar to that of poisoning in the `std::sync::poison` module. A key
difference, however, is that poisoning in `LazyLock` is _unrecoverable_. All future accesses of
the lock from other threads will panic, whereas a type in `std::sync::poison` like
`std::sync::poison::Mutex` allows recovery via `PoisonError::into_inner()`.

# Examples

Initialize static variables with `LazyLock`.
```rust
use std::sync::LazyLock;

// Note: static items do not call `Drop` on program termination, so this won't be deallocated.
// this is fine, as the OS can deallocate the terminated program faster than we can free memory
// but tools like valgrind might report "memory leaks" as it isn't obvious this is intentional.
static DEEP_THOUGHT: LazyLock<String> = LazyLock::new(|| {
    // M3 Ultra takes about 16 million years in --release config
    another_crate::great_question()
});

// The `String` is built, stored in the `LazyLock`, and returned as `&String`.
let _ = &*DEEP_THOUGHT;
```

Initialize fields with `LazyLock`.
```rust
use std::sync::LazyLock;

#[derive(Debug)]
struct UseCellLock {
    number: LazyLock<u32>,
}
fn main() {
    let lock: LazyLock<u32> = LazyLock::new(|| 0u32);

    let data = UseCellLock { number: lock };
    println!("{}", *data.number);
}
```

## T::new

```rust
pub const fn new(f: F) -> LazyLock<T, F>
```

Creates a new lazy value with the given initializing function.

# Examples

```rust
use std::sync::LazyLock;

let hello = "Hello, World!".to_string();

let lazy = LazyLock::new(|| hello.to_uppercase());

assert_eq!(&*lazy, "HELLO, WORLD!");
```

## T::force_mut

```rust
pub fn force_mut(this: &mut LazyLock<T, F>) -> &mut T
```

Forces the evaluation of this lazy value and returns a mutable reference to
the result.

# Panics

If the initialization closure panics (the one that is passed to the `new()` method), the
panic is propagated to the caller, and the lock becomes poisoned. This will cause all future
accesses of the lock (via `force()` or a dereference) to panic.

# Examples

```rust
use std::sync::LazyLock;

let mut lazy = LazyLock::new(|| 92);

let p = LazyLock::force_mut(&mut lazy);
assert_eq!(*p, 92);
*p = 44;
assert_eq!(*lazy, 44);
```

## T::force

```rust
pub fn force(this: &LazyLock<T, F>) -> &T
```

Forces the evaluation of this lazy value and returns a reference to
result. This is equivalent to the `Deref` impl, but is explicit.

This method will block the calling thread if another initialization
routine is currently running.

# Panics

If the initialization closure panics (the one that is passed to the `new()` method), the
panic is propagated to the caller, and the lock becomes poisoned. This will cause all future
accesses of the lock (via `force()` or a dereference) to panic.

# Examples

```rust
use std::sync::LazyLock;

let lazy = LazyLock::new(|| 92);

assert_eq!(LazyLock::force(&lazy), &92);
assert_eq!(&*lazy, &92);
```

## LazyLock::get_mut

```rust
pub fn get_mut(this: &mut LazyLock<T, F>) -> Option<&mut T>
```

Returns a mutable reference to the value if initialized. Otherwise (if uninitialized or
poisoned), returns `None`.

# Examples

```rust
use std::sync::LazyLock;

let mut lazy = LazyLock::new(|| 92);

assert_eq!(LazyLock::get_mut(&mut lazy), None);
let _ = LazyLock::force(&lazy);
*LazyLock::get_mut(&mut lazy).unwrap() = 44;
assert_eq!(*lazy, 44);
```

## LazyLock::get

```rust
pub fn get(this: &LazyLock<T, F>) -> Option<&T>
```

Returns a reference to the value if initialized. Otherwise (if uninitialized or poisoned),
returns `None`.

# Examples

```rust
use std::sync::LazyLock;

let lazy = LazyLock::new(|| 92);

assert_eq!(LazyLock::get(&lazy), None);
let _ = LazyLock::force(&lazy);
assert_eq!(LazyLock::get(&lazy), Some(&92));
```
