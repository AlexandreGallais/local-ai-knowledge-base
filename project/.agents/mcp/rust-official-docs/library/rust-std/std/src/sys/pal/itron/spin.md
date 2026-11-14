# std::sys::pal::itron::spin

## struct SpinMutex

```rust
pub struct SpinMutex<T = ()>
```

A mutex implemented by `dis_dsp` (for intra-core synchronization) and a
spinlock (for inter-core synchronization).

## SpinMutex::with_locked

```rust
pub fn with_locked<R>(&self, f: impl FnOnce(&mut T) -> R) -> R
```

Acquire a lock.

## struct SpinIdOnceCell

```rust
pub struct SpinIdOnceCell<T = ()>
```

`OnceCell<(abi::ID, T)>` implemented by `dis_dsp` (for intra-core
synchronization) and a spinlock (for inter-core synchronization).

It's assumed that `0` is not a valid ID, and all kernel
object IDs fall into range `1..=usize::MAX`.

## SpinIdOnceCell::set_unchecked

```rust
pub unsafe fn set_unchecked(&self, (id, extra): (abi::ID, T))
```

Assign the content without checking if it's already initialized or
being initialized.

## SpinIdOnceCell::get_or_try_init

```rust
pub fn get_or_try_init<F, E>(&self, f: F) -> Result<(abi::ID, &T), E> where F: FnOnce() -> Result<(abi::ID, T), E>,
```

Gets the contents of the cell, initializing it with `f` if
the cell was empty. If the cell was empty and `f` failed, an
error is returned.

Warning: `f` must not perform a blocking operation, which
includes panicking.