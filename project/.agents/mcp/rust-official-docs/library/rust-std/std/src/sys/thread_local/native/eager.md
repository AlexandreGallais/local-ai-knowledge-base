# std::sys::thread_local::native::eager

## Storage::get

```rust
pub unsafe fn get(&self) -> *const T
```

Gets a pointer to the TLS value. If the TLS variable has been destroyed,
a null pointer is returned.

The resulting pointer may not be used after thread destruction has
occurred.

# Safety
The `self` reference must remain valid until the TLS destructor is run.