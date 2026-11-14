# std::sys::pal::windows::time

## WaitableTimer::high_resolution

```rust
pub fn high_resolution() -> Result<Self, ()>
```

Creates a high-resolution timer. Will fail before Windows 10, version 1803.