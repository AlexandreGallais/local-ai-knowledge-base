# std::sys::sync::thread_parking::pthread

Thread parking without `futex` using the `pthread` synchronization primitives.

## Parker::new_in_place

```rust
pub unsafe fn new_in_place(parker: *mut Parker)
```

Constructs the UNIX parker in-place.

# Safety
The constructed parker must never be moved.