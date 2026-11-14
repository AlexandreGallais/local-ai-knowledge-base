# std::sys::args::unix

Global initialization and retrieval of command line arguments.

On some platforms these are stored during runtime startup,
and on some they are retrieved from the system on demand.

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