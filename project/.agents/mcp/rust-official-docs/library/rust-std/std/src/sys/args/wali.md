# std::sys::args::wali

## fn init

```rust
pub unsafe fn init(argc: isize, argv: *const *const u8)
```

One-time global initialization.

## fn args

```rust
pub fn args() -> Args
```

Returns the command line arguments