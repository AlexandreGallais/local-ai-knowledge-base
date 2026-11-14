# std::os::unix::thread

Unix-specific extensions to primitives in the [`std::thread`] module.

[`std::thread`]: crate::thread

## trait JoinHandleExt

```rust
pub trait JoinHandleExt
```

Unix-specific extensions to [`JoinHandle`].

## JoinHandleExt::as_pthread_t

```rust
fn as_pthread_t(&self) -> RawPthread
```

Extracts the raw pthread_t without taking ownership

## JoinHandleExt::into_pthread_t

```rust
fn into_pthread_t(self) -> RawPthread
```

Consumes the thread, returning the raw pthread_t

This function **transfers ownership** of the underlying pthread_t to
the caller. Callers are then the unique owners of the pthread_t and
must either detach or join the pthread_t once it's no longer needed.