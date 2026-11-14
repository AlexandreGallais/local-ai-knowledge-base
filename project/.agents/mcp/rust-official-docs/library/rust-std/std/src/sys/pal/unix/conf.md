# std::sys::pal::unix::conf

## fn confstr

```rust
pub fn confstr( key: crate::ffi::c_int, size_hint: Option<usize>, ) -> crate::io::Result<crate::ffi::OsString>
```

Returns the value for [`confstr(key, ...)`][posix_confstr]. Currently only
used on Darwin, but should work on any unix (in case we need to get
`_CS_PATH` or `_CS_V[67]_ENV` in the future).

[posix_confstr]:
    https://pubs.opengroup.org/onlinepubs/9799919799/functions/confstr.html