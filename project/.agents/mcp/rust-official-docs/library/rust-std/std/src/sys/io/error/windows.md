# std::sys::io::error::windows

## fn format_error

```rust
pub fn format_error(mut errnum: i32, f: &mut fmt::Formatter<'_>) -> fmt::Result
```

Gets a detailed string description for the given error number.