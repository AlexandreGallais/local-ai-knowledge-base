---
title: "alloc::ffi::c_str (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/ffi/c_str.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::ffi::c_str (part 2 of 2)

## CString::from_vec_with_nul

```rust
pub fn from_vec_with_nul(v: Vec<u8>) -> Result<Self, FromVecWithNulError>
```

Attempts to convert a <code>[Vec]<[u8]></code> to a `CString`.

Runtime checks are present to ensure there is only one nul byte in the
`Vec`, its last element.

# Errors

If a nul byte is present and not the last element or no nul bytes
is present, an error will be returned.

# Examples

A successful conversion will produce the same result as `CString::new`
when called without the ending nul byte.

```rust
use std::ffi::CString;
assert_eq!(
    CString::from_vec_with_nul(b"abc\0".to_vec())
        .expect("we provided bytes that has one NUL byte exactly at the end, so CString::from_vec_with_nul should not fail"),
    c"abc".to_owned()
);
```

An incorrectly formatted `Vec` will produce an error.

```rust
use std::ffi::{CString, FromVecWithNulError};
// Interior nul byte
let _: FromVecWithNulError = CString::from_vec_with_nul(b"a\0bc".to_vec()).unwrap_err();
// No nul byte
let _: FromVecWithNulError = CString::from_vec_with_nul(b"abc".to_vec()).unwrap_err();
```

## NulError::nul_position

```rust
pub fn nul_position(&self) -> usize
```

Returns the position of the nul byte in the slice that caused
`CString::new` to fail.

# Examples

```rust
use std::ffi::CString;

let nul_error = CString::new("foo\0bar").unwrap_err();
assert_eq!(nul_error.nul_position(), 3);

let nul_error = CString::new("foo bar\0").unwrap_err();
assert_eq!(nul_error.nul_position(), 7);
```

## NulError::into_vec

```rust
pub fn into_vec(self) -> Vec<u8>
```

Consumes this error, returning the underlying vector of bytes which
generated the error in the first place.

# Examples

```rust
use std::ffi::CString;

let nul_error = CString::new("foo\0bar").unwrap_err();
assert_eq!(nul_error.into_vec(), b"foo\0bar");
```

## IntoStringError::into_cstring

```rust
pub fn into_cstring(self) -> CString
```

Consumes this error, returning original `CString` which generated the
error.

## IntoStringError::utf8_error

```rust
pub fn utf8_error(&self) -> Utf8Error
```

Access the underlying UTF-8 error that was the cause of this error.

## CStr::to_string_lossy

```rust
pub fn to_string_lossy(&self) -> Cow<'_, str>
```

Converts a `CStr` into a <code>[Cow]<[str]></code>.

If the contents of the `CStr` are valid UTF-8 data, this
function will return a `[Cow]::[Borrowed]\(&[str])`
with the corresponding `&[str]` slice. Otherwise, it will
replace any invalid UTF-8 sequences with
`U+FFFD REPLACEMENT CHARACTER`[U+FFFD] and return a
`[Cow]::[Owned]\([String])` with the result.

# Examples

Calling `to_string_lossy` on a `CStr` containing valid UTF-8. The leading
`c` on the string literal denotes a `CStr`.

```rust
use std::borrow::Cow;

assert_eq!(c"Hello World".to_string_lossy(), Cow::Borrowed("Hello World"));
```

Calling `to_string_lossy` on a `CStr` containing invalid UTF-8:

```rust
use std::borrow::Cow;

assert_eq!(
    c"Hello \xF0\x90\x80World".to_string_lossy(),
    Cow::Owned(String::from("Hello �World")) as Cow<'_, str>
);
```

## CStr::into_c_string

```rust
pub fn into_c_string(self: Box<Self>) -> CString
```

Converts a <code>[Box]<[CStr]></code> into a `CString` without copying or allocating.

# Examples

```rust
use std::ffi::{CStr, CString};

let boxed: Box<CStr> = Box::from(c"foo");
let c_string: CString = c"foo".to_owned();

assert_eq!(boxed.into_c_string(), c_string);
```
