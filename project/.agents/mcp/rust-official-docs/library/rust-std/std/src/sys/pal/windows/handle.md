# std::sys::pal::windows::handle

## struct Handle

```rust
pub struct Handle(OwnedHandle)
```

An owned container for `HANDLE` object, closing them on Drop.

All methods are inherited through a `Deref` impl to `RawHandle`