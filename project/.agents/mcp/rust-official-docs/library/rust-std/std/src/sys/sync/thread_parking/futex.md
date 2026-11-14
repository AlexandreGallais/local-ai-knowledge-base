# std::sys::sync::thread_parking::futex

## Parker::new_in_place

```rust
pub unsafe fn new_in_place(parker: *mut Parker)
```

Constructs the futex parker. The UNIX parker implementation
requires this to happen in-place.