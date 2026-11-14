# std::sync::once_lock

## struct OnceLock

```rust
pub struct OnceLock<T>
```

A synchronization primitive which can nominally be written to only once.

This type is a thread-safe [`OnceCell`], and can be used in statics.
In many simple cases, you can use [`LazyLock<T, F>`] instead to get the benefits of this type
with less effort: `LazyLock<T, F>` "looks like" `&T` because it initializes with `F` on deref!
Where OnceLock shines is when LazyLock is too simple to support a given case, as LazyLock
doesn't allow additional inputs to its function after you call [`LazyLock::new(|| ...)`].

A `OnceLock` can be thought of as a safe abstraction over uninitialized data that becomes
initialized once written.

Unlike [`Mutex`](crate::sync::Mutex), `OnceLock` is never poisoned on panic.

[`OnceCell`]: crate::cell::OnceCell
[`LazyLock<T, F>`]: crate::sync::LazyLock
[`LazyLock::new(|| ...)`]: crate::sync::LazyLock::new

# Examples

Writing to a `OnceLock` from a separate thread:

```
use std::sync::OnceLock;

static CELL: OnceLock<usize> = OnceLock::new();

// `OnceLock` has not been written to yet.
assert!(CELL.get().is_none());

// Spawn a thread and write to `OnceLock`.
std::thread::spawn(|| {
    let value = CELL.get_or_init(|| 12345);
    assert_eq!(value, &12345);
})
.join()
.unwrap();

// `OnceLock` now contains the value.
assert_eq!(
    CELL.get(),
    Some(&12345),
);
```

You can use `OnceLock` to implement a type that requires "append-only" logic:

```
use std::sync::{OnceLock, atomic::{AtomicU32, Ordering}};
use std::thread;

struct OnceList<T> {
    data: OnceLock<T>,
    next: OnceLock<Box<OnceList<T>>>,
}
impl<T> OnceList<T> {
    const fn new() -> OnceList<T> {
        OnceList { data: OnceLock::new(), next: OnceLock::new() }
    }
    fn push(&self, value: T) {
        // FIXME: this impl is concise, but is also slow for long lists or many threads.
        // as an exercise, consider how you might improve on it while preserving the behavior
        if let Err(value) = self.data.set(value) {
            let next = self.next.get_or_init(|| Box::new(OnceList::new()));
            next.push(value)
        };
    }
    fn contains(&self, example: &T) -> bool
    where
        T: PartialEq,
    {
        self.data.get().map(|item| item == example).filter(|v| *v).unwrap_or_else(|| {
            self.next.get().map(|next| next.contains(example)).unwrap_or(false)
        })
    }
}

// Let's exercise this new Sync append-only list by doing a little counting
static LIST: OnceList<u32> = OnceList::new();
static COUNTER: AtomicU32 = AtomicU32::new(0);

# const LEN: u32 = if cfg!(miri) { 50 } else { 1000 };
# /*
const LEN: u32 = 1000;
# */
thread::scope(|s| {
    for _ in 0..thread::available_parallelism().unwrap().get() {
        s.spawn(|| {
            while let i @ 0..LEN = COUNTER.fetch_add(1, Ordering::Relaxed) {
                LIST.push(i);
            }
        });
    }
});

for i in 0..LEN {
    assert!(LIST.contains(&i));
}

```

## OnceLock::new

```rust
pub const fn new() -> OnceLock<T>
```

Creates a new uninitialized cell.

## OnceLock::get

```rust
pub fn get(&self) -> Option<&T>
```

Gets the reference to the underlying value.

Returns `None` if the cell is uninitialized, or being initialized.
This method never blocks.

## OnceLock::get_mut

```rust
pub fn get_mut(&mut self) -> Option<&mut T>
```

Gets the mutable reference to the underlying value.

Returns `None` if the cell is uninitialized.

This method never blocks. Since it borrows the `OnceLock` mutably,
it is statically guaranteed that no active borrows to the `OnceLock`
exist, including from other threads.

## OnceLock::wait

```rust
pub fn wait(&self) -> &T
```

Blocks the current thread until the cell is initialized.

# Example

Waiting for a computation on another thread to finish:
```rust
use std::thread;
use std::sync::OnceLock;

let value = OnceLock::new();

thread::scope(|s| {
    s.spawn(|| value.set(1 + 1));

    let result = value.wait();
    assert_eq!(result, &2);
})
```

## OnceLock::set

```rust
pub fn set(&self, value: T) -> Result<(), T>
```

Initializes the contents of the cell to `value`.

May block if another thread is currently attempting to initialize the cell. The cell is
guaranteed to contain a value when `set` returns, though not necessarily the one provided.

Returns `Ok(())` if the cell was uninitialized and
`Err(value)` if the cell was already initialized.

# Examples

```
use std::sync::OnceLock;

static CELL: OnceLock<i32> = OnceLock::new();

fn main() {
    assert!(CELL.get().is_none());

    std::thread::spawn(|| {
        assert_eq!(CELL.set(92), Ok(()));
    }).join().unwrap();

    assert_eq!(CELL.set(62), Err(62));
    assert_eq!(CELL.get(), Some(&92));
}
```

## OnceLock::get_or_init

```rust
pub fn get_or_init<F>(&self, f: F) -> &T where F: FnOnce() -> T,
```

Gets the contents of the cell, initializing it to `f()` if the cell
was uninitialized.

Many threads may call `get_or_init` concurrently with different
initializing functions, but it is guaranteed that only one function
will be executed if the function doesn't panic.

# Panics

If `f()` panics, the panic is propagated to the caller, and the cell
remains uninitialized.

It is an error to reentrantly initialize the cell from `f`. The
exact outcome is unspecified. Current implementation deadlocks, but
this may be changed to a panic in the future.

# Examples

```
use std::sync::OnceLock;

let cell = OnceLock::new();
let value = cell.get_or_init(|| 92);
assert_eq!(value, &92);
let value = cell.get_or_init(|| unreachable!());
assert_eq!(value, &92);
```

## OnceLock::into_inner

```rust
pub fn into_inner(mut self) -> Option<T>
```

Consumes the `OnceLock`, returning the wrapped value. Returns
`None` if the cell was uninitialized.

# Examples

```
use std::sync::OnceLock;

let cell: OnceLock<String> = OnceLock::new();
assert_eq!(cell.into_inner(), None);

let cell = OnceLock::new();
cell.set("hello".to_string()).unwrap();
assert_eq!(cell.into_inner(), Some("hello".to_string()));
```

## OnceLock::take

```rust
pub fn take(&mut self) -> Option<T>
```

Takes the value out of this `OnceLock`, moving it back to an uninitialized state.

Has no effect and returns `None` if the `OnceLock` was uninitialized.

Since this method borrows the `OnceLock` mutably, it is statically guaranteed that
no active borrows to the `OnceLock` exist, including from other threads.

# Examples

```
use std::sync::OnceLock;

let mut cell: OnceLock<String> = OnceLock::new();
assert_eq!(cell.take(), None);

let mut cell = OnceLock::new();
cell.set("hello".to_string()).unwrap();
assert_eq!(cell.take(), Some("hello".to_string()));
assert_eq!(cell.get(), None);
```