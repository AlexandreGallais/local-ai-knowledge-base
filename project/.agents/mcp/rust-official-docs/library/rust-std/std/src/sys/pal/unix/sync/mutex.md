# std::sys::pal::unix::sync::mutex

## Mutex::init

```rust
pub unsafe fn init(self: Pin<&mut Self>)
```

# Safety
May only be called once per instance of `Self`.

## Mutex::lock

```rust
pub unsafe fn lock(self: Pin<&Self>)
```

# Safety
* If `init` was not called on this instance, reentrant locking causes
  undefined behaviour.
* Destroying a locked mutex causes undefined behaviour.

## Mutex::try_lock

```rust
pub unsafe fn try_lock(self: Pin<&Self>) -> bool
```

# Safety
* If `init` was not called on this instance, reentrant locking causes
  undefined behaviour.
* Destroying a locked mutex causes undefined behaviour.

## Mutex::unlock

```rust
pub unsafe fn unlock(self: Pin<&Self>)
```

# Safety
The mutex must be locked by the current thread.