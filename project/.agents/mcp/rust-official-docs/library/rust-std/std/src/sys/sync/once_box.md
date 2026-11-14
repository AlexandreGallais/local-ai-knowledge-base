# std::sys::sync::once_box

A racily-initialized alternative to `OnceLock<Box<T>>`.

This is used to implement synchronization primitives that need allocation,
like the pthread versions.

## OnceBox::get_unchecked

```rust
pub unsafe fn get_unchecked(&self) -> Pin<&T>
```

Gets access to the value, assuming it is already initialized and this
initialization has been observed by the current thread.

Since all modifications to the pointer have already been observed, the
pointer load in this function can be performed with relaxed ordering,
potentially allowing the optimizer to turn code like this:
```rust, ignore
once_box.get_or_init(|| Box::pin(42));
unsafe { once_box.get_unchecked() }
```
into
```rust, ignore
once_box.get_or_init(|| Box::pin(42))
```

# Safety
This causes undefined behavior if the assumption above is violated.