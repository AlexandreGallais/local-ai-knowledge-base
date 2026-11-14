# std::sys::backtrace

Common code for printing backtraces.

## fn __rust_begin_short_backtrace

```rust
pub fn __rust_begin_short_backtrace<F, T>(f: F) -> T where F: FnOnce() -> T,
```

Fixed frame used to clean the backtrace with `RUST_BACKTRACE=1`. Note that
this is only inline(never) when backtraces in std are enabled, otherwise
it's fine to optimize away.

## fn __rust_end_short_backtrace

```rust
pub fn __rust_end_short_backtrace<F, T>(f: F) -> T where F: FnOnce() -> T,
```

Fixed frame used to clean the backtrace with `RUST_BACKTRACE=1`. Note that
this is only inline(never) when backtraces in std are enabled, otherwise
it's fine to optimize away.

## fn output_filename

```rust
pub fn output_filename( fmt: &mut fmt::Formatter<'_>, bows: BytesOrWideString<'_>, print_fmt: PrintFmt, cwd: Option<&PathBuf>, ) -> fmt::Result
```

Prints the filename of the backtrace frame.

See also `output`.