# std::sys::pal::solid::error

## fn error_name

```rust
pub fn error_name(er: abi::ER) -> Option<&'static str>
```

Describe the specified SOLID error code. Returns `None` if it's an
undefined error code.

The SOLID error codes are a superset of μITRON error codes.