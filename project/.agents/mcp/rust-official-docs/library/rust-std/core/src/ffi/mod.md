# core::ffi

Platform-specific types, as defined by C.

Code that interacts via FFI will almost certainly be using the
base types provided by C, which aren't nearly as nicely defined
as Rust's primitive types. This module provides types which will
match those defined by C, so that code that interacts with C will
refer to the correct types.