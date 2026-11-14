# std::io::error

## Error::last_os_error

```rust
pub fn last_os_error() -> Error
```

Returns an error representing the last OS error which occurred.

This function reads the value of `errno` for the target platform (e.g.
`GetLastError` on Windows) and will return a corresponding instance of
[`Error`] for the error code.

This should be called immediately after a call to a platform function,
otherwise the state of the error value is indeterminate. In particular,
other standard library functions may call platform functions that may
(or may not) reset the error value even if they succeed.

# Examples

```
use std::io::Error;

let os_error = Error::last_os_error();
println!("last OS error: {os_error:?}");
```

## Error::from_raw_os_error

```rust
pub fn from_raw_os_error(code: RawOsError) -> Error
```

Creates a new instance of an [`Error`] from a particular OS error code.

# Examples

On Linux:

```
# if cfg!(target_os = "linux") {
use std::io;

let error = io::Error::from_raw_os_error(22);
assert_eq!(error.kind(), io::ErrorKind::InvalidInput);
# }
```

On Windows:

```
# if cfg!(windows) {
use std::io;

let error = io::Error::from_raw_os_error(10022);
assert_eq!(error.kind(), io::ErrorKind::InvalidInput);
# }
```