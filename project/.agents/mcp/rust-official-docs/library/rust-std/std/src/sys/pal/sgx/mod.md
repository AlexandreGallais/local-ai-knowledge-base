# std::sys::pal::sgx

System bindings for the Fortanix SGX platform

This module contains the facade (aka platform-specific) implementations of
OS level functionality for Fortanix SGX.

## fn unsupported

```rust
pub fn unsupported<T>() -> io::Result<T>
```

This function is used to implement functionality that simply doesn't exist.
Programs relying on this functionality will need to deal with the error.

## fn sgx_ineffective

```rust
pub fn sgx_ineffective<T>(v: T) -> io::Result<T>
```

This function is used to implement various functions that doesn't exist,
but the lack of which might not be reason for error. If no error is
returned, the program might very well be able to function normally. This is
what happens when `SGX_INEFFECTIVE_ERROR` is set to `true`. If it is
`false`, the behavior is the same as `unsupported`.