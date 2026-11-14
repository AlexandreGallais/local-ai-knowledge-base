# std::sys::path::cygwin

## fn is_verbatim_sep

```rust
pub const fn is_verbatim_sep(b: u8) -> bool
```

Cygwin always prefers `/` over `\`, and it always converts all `/` to `\`
internally when calling Win32 APIs. Therefore, the server component of path
`\\?\UNC\localhost/share` is `localhost/share` on Win32, but `localhost`
on Cygwin.