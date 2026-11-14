# std::sys::pal::unix::weak::dlsym

## DlsymWeak::new

```rust
pub const unsafe fn new(name: &'static CStr) -> Self
```

# Safety

If the signature of `F` does not match the signature of the symbol (if
it exists), calling the function pointer returned by `get()` is
undefined behaviour.