# std::sys::sync::thread_parking::windows7

## Parker::new_in_place

```rust
pub unsafe fn new_in_place(parker: *mut Parker)
```

Constructs the Windows parker. The UNIX parker implementation
requires this to happen in-place.