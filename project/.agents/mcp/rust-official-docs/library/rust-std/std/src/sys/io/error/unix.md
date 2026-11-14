# std::sys::io::error::unix

## fn errno

```rust
pub fn errno() -> i32
```

Returns the platform-specific value of errno

## fn format_error

```rust
pub fn format_error(errno: i32, f: &mut fmt::Formatter<'_>) -> fmt::Result
```

Gets a detailed string description for the given error number.