---
title: "std::os::hermit::ffi"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/hermit/ffi.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::hermit::ffi

Hermit-specific extension to the primitives in the `std::ffi` module

#### Examples

use std::ffi::OsString;
use std::os::hermit::ffi::OsStringExt;

let bytes = b"foo".to_vec();

// OsStringExt::from_vec
let os_string = OsString::from_vec(bytes);
assert_eq!(os_string.to_str(), Some("foo"));

// OsStringExt::into_vec
let bytes = os_string.into_vec();
assert_eq!(bytes, b"foo");
```rust

use std::ffi::OsStr;
use std::os::hermit::ffi::OsStrExt;

let bytes = b"foo";

// OsStrExt::from_bytes
let os_str = OsStr::from_bytes(bytes);
assert_eq!(os_str.to_str(), Some("foo"));

// OsStrExt::as_bytes
let bytes = os_str.as_bytes();
assert_eq!(bytes, b"foo");
```
