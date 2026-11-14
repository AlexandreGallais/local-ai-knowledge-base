# std::sys::pal::unix::stack_overflow

## fn init

```rust
pub unsafe fn init()
```

# Safety
Must be called only once, on the main thread, during program startup.

## fn drop_handler

```rust
pub unsafe fn drop_handler(data: *mut libc::c_void)
```

# Safety
Must only be called with a pointer returned by `make_handler`, and only
once per `Handler`.