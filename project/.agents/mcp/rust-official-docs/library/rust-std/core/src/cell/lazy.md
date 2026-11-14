# core::cell::lazy

## struct LazyCell

```rust
pub struct LazyCell<T, F = fn() -> T>
```

A value which is initialized on the first access.

For a thread-safe version of this struct, see [`std::sync::LazyLock`].

[`std::sync::LazyLock`]: ../../std/sync/struct.LazyLock.html

# Poisoning

If the initialization closure passed to [`LazyCell::new`] panics, the cell will be poisoned.
Once the cell is poisoned, any threads that attempt to access this cell (via a dereference
or via an explicit call to [`force()`]) will panic.

This concept is similar to that of poisoning in the [`std::sync::poison`] module. A key
difference, however, is that poisoning in `LazyCell` is _unrecoverable_. All future accesses of
the cell from other threads will panic, whereas a type in [`std::sync::poison`] like
[`std::sync::poison::Mutex`] allows recovery via [`PoisonError::into_inner()`].

[`force()`]: LazyCell::force
[`std::sync::poison`]: ../../std/sync/poison/index.html
[`std::sync::poison::Mutex`]: ../../std/sync/poison/struct.Mutex.html
[`PoisonError::into_inner()`]: ../../std/sync/poison/struct.PoisonError.html#method.into_inner

# Examples

```
use std::cell::LazyCell;

let lazy: LazyCell<i32> = LazyCell::new(|| {
    println!("initializing");
    92
});
println!("ready");
println!("{}", *lazy);
println!("{}", *lazy);

// Prints:
//   ready
//   initializing
//   92
//   92
```

## T::new

```rust
pub const fn new(f: F) -> LazyCell<T, F>
```

Creates a new lazy value with the given initializing function.

# Examples

```
use std::cell::LazyCell;

let hello = "Hello, World!".to_string();

let lazy = LazyCell::new(|| hello.to_uppercase());

assert_eq!(&*lazy, "HELLO, WORLD!");
```

## T::force

```rust
pub fn force(this: &LazyCell<T, F>) -> &T
```

Forces the evaluation of this lazy value and returns a reference to
the result.

This is equivalent to the `Deref` impl, but is explicit.

# Panics

If the initialization closure panics (the one that is passed to the [`new()`] method), the
panic is propagated to the caller, and the cell becomes poisoned. This will cause all future
accesses of the cell (via [`force()`] or a dereference) to panic.

[`new()`]: LazyCell::new
[`force()`]: LazyCell::force

# Examples

```
use std::cell::LazyCell;

let lazy = LazyCell::new(|| 92);

assert_eq!(LazyCell::force(&lazy), &92);
assert_eq!(&*lazy, &92);
```

## T::force_mut

```rust
pub fn force_mut(this: &mut LazyCell<T, F>) -> &mut T
```

Forces the evaluation of this lazy value and returns a mutable reference to
the result.

# Panics

If the initialization closure panics (the one that is passed to the [`new()`] method), the
panic is propagated to the caller, and the cell becomes poisoned. This will cause all future
accesses of the cell (via [`force()`] or a dereference) to panic.

[`new()`]: LazyCell::new
[`force()`]: LazyCell::force

# Examples

```
use std::cell::LazyCell;

let mut lazy = LazyCell::new(|| 92);

let p = LazyCell::force_mut(&mut lazy);
assert_eq!(*p, 92);
*p = 44;
assert_eq!(*lazy, 44);
```

## LazyCell::get_mut

```rust
pub fn get_mut(this: &mut LazyCell<T, F>) -> Option<&mut T>
```

Returns a mutable reference to the value if initialized. Otherwise (if uninitialized or
poisoned), returns `None`.

# Examples

```
use std::cell::LazyCell;

let mut lazy = LazyCell::new(|| 92);

assert_eq!(LazyCell::get_mut(&mut lazy), None);
let _ = LazyCell::force(&lazy);
*LazyCell::get_mut(&mut lazy).unwrap() = 44;
assert_eq!(*lazy, 44);
```

## LazyCell::get

```rust
pub fn get(this: &LazyCell<T, F>) -> Option<&T>
```

Returns a reference to the value if initialized. Otherwise (if uninitialized or poisoned),
returns `None`.

# Examples

```
use std::cell::LazyCell;

let lazy = LazyCell::new(|| 92);

assert_eq!(LazyCell::get(&lazy), None);
let _ = LazyCell::force(&lazy);
assert_eq!(LazyCell::get(&lazy), Some(&92));
```