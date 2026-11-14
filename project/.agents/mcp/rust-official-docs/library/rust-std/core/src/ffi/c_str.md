# core::ffi::c_str

[`CStr`] and its related types.

## enum FromBytesWithNulError

```rust
pub enum FromBytesWithNulError
```

An error indicating that a nul byte was not in the expected position.

The slice used to create a [`CStr`] must have one and only one nul byte,
positioned at the end.

This error is created by the [`CStr::from_bytes_with_nul`] method.
See its documentation for more.

# Examples

```
use std::ffi::{CStr, FromBytesWithNulError};

let _: FromBytesWithNulError = CStr::from_bytes_with_nul(b"f\0oo").unwrap_err();
```

## ::FromBytesUntilNulError

```rust
pub struct FromBytesUntilNulError(())
```

An error indicating that no nul byte was present.

A slice used to create a [`CStr`] must contain a nul byte somewhere
within the slice.

This error is created by the [`CStr::from_bytes_until_nul`] method.

## CStr::from_ptr

```rust
pub const unsafe fn from_ptr<'a>(ptr: *const c_char) -> &'a CStr
```

Wraps a raw C string with a safe C string wrapper.

This function will wrap the provided `ptr` with a `CStr` wrapper, which
allows inspection and interoperation of non-owned C strings. The total
size of the terminated buffer must be smaller than [`isize::MAX`] **bytes**
in memory (a restriction from [`slice::from_raw_parts`]).

# Safety

* The memory pointed to by `ptr` must contain a valid nul terminator at the
  end of the string.

* `ptr` must be [valid] for reads of bytes up to and including the nul terminator.
  This means in particular:

    * The entire memory range of this `CStr` must be contained within a single allocation!
    * `ptr` must be non-null even for a zero-length cstr.

* The memory referenced by the returned `CStr` must not be mutated for
  the duration of lifetime `'a`.

* The nul terminator must be within `isize::MAX` from `ptr`

> **Note**: This operation is intended to be a 0-cost cast but it is
> currently implemented with an up-front calculation of the length of
> the string. This is not guaranteed to always be the case.

# Caveat

The lifetime for the returned slice is inferred from its usage. To prevent accidental misuse,
it's suggested to tie the lifetime to whichever source lifetime is safe in the context,
such as by providing a helper function taking the lifetime of a host value for the slice,
or by explicit annotation.

# Examples

```
use std::ffi::{c_char, CStr};

fn my_string() -> *const c_char {
    c"hello".as_ptr()
}

unsafe {
    let slice = CStr::from_ptr(my_string());
    assert_eq!(slice.to_str().unwrap(), "hello");
}
```

```
use std::ffi::{c_char, CStr};

const HELLO_PTR: *const c_char = {
    const BYTES: &[u8] = b"Hello, world!\0";
    BYTES.as_ptr().cast()
};
const HELLO: &CStr = unsafe { CStr::from_ptr(HELLO_PTR) };

assert_eq!(c"Hello, world!", HELLO);
```

[valid]: core::ptr#safety

## CStr::from_bytes_until_nul

```rust
pub const fn from_bytes_until_nul(bytes: &[u8]) -> Result<&CStr, FromBytesUntilNulError>
```

Creates a C string wrapper from a byte slice with any number of nuls.

This method will create a `CStr` from any byte slice that contains at
least one nul byte. Unlike with [`CStr::from_bytes_with_nul`], the caller
does not need to know where the nul byte is located.

If the first byte is a nul character, this method will return an
empty `CStr`. If multiple nul characters are present, the `CStr` will
end at the first one.

If the slice only has a single nul byte at the end, this method is
equivalent to [`CStr::from_bytes_with_nul`].

# Examples
```
use std::ffi::CStr;

let mut buffer = [0u8; 16];
unsafe {
    // Here we might call an unsafe C function that writes a string
    // into the buffer.
    let buf_ptr = buffer.as_mut_ptr();
    buf_ptr.write_bytes(b'A', 8);
}
// Attempt to extract a C nul-terminated string from the buffer.
let c_str = CStr::from_bytes_until_nul(&buffer[..]).unwrap();
assert_eq!(c_str.to_str().unwrap(), "AAAAAAAA");
```

## CStr::from_bytes_with_nul

```rust
pub const fn from_bytes_with_nul(bytes: &[u8]) -> Result<&Self, FromBytesWithNulError>
```

Creates a C string wrapper from a byte slice with exactly one nul
terminator.

This function will cast the provided `bytes` to a `CStr`
wrapper after ensuring that the byte slice is nul-terminated
and does not contain any interior nul bytes.

If the nul byte may not be at the end,
[`CStr::from_bytes_until_nul`] can be used instead.

# Examples

```
use std::ffi::CStr;

let cstr = CStr::from_bytes_with_nul(b"hello\0");
assert_eq!(cstr, Ok(c"hello"));
```

Creating a `CStr` without a trailing nul terminator is an error:

```
use std::ffi::{CStr, FromBytesWithNulError};

let cstr = CStr::from_bytes_with_nul(b"hello");
assert_eq!(cstr, Err(FromBytesWithNulError::NotNulTerminated));
```

Creating a `CStr` with an interior nul byte is an error:

```
use std::ffi::{CStr, FromBytesWithNulError};

let cstr = CStr::from_bytes_with_nul(b"he\0llo\0");
assert_eq!(cstr, Err(FromBytesWithNulError::InteriorNul { position: 2 }));
```

## CStr::from_bytes_with_nul_unchecked

```rust
pub const unsafe fn from_bytes_with_nul_unchecked(bytes: &[u8]) -> &CStr
```

Unsafely creates a C string wrapper from a byte slice.

This function will cast the provided `bytes` to a `CStr` wrapper without
performing any sanity checks.

# Safety
The provided slice **must** be nul-terminated and not contain any interior
nul bytes.

# Examples

```
use std::ffi::CStr;

let bytes = b"Hello world!\0";

let cstr = unsafe { CStr::from_bytes_with_nul_unchecked(bytes) };
assert_eq!(cstr.to_bytes_with_nul(), bytes);
```

## CStr::as_ptr

```rust
pub const fn as_ptr(&self) -> *const c_char
```

Returns the inner pointer to this C string.

The returned pointer will be valid for as long as `self` is, and points
to a contiguous region of memory terminated with a 0 byte to represent
the end of the string.

The type of the returned pointer is
[`*const c_char`][crate::ffi::c_char], and whether it's
an alias for `*const i8` or `*const u8` is platform-specific.

**WARNING**

The returned pointer is read-only; writing to it (including passing it
to C code that writes to it) causes undefined behavior.

It is your responsibility to make sure that the underlying memory is not
freed too early. For example, the following code will cause undefined
behavior when `ptr` is used inside the `unsafe` block:

```no_run
# #![expect(dangling_pointers_from_temporaries)]
use std::ffi::{CStr, CString};

// 💀 The meaning of this entire program is undefined,
// 💀 and nothing about its behavior is guaranteed,
// 💀 not even that its behavior resembles the code as written,
// 💀 just because it contains a single instance of undefined behavior!

// 🚨 creates a dangling pointer to a temporary `CString`
// 🚨 that is deallocated at the end of the statement
let ptr = CString::new("Hi!".to_uppercase()).unwrap().as_ptr();

// without undefined behavior, you would expect that `ptr` equals:
dbg!(CStr::from_bytes_with_nul(b"HI!\0").unwrap());

// 🙏 Possibly the program behaved as expected so far,
// 🙏 and this just shows `ptr` is now garbage..., but
// 💀 this violates `CStr::from_ptr`'s safety contract
// 💀 leading to a dereference of a dangling pointer,
// 💀 which is immediate undefined behavior.
// 💀 *BOOM*, you're dead, your entire program has no meaning.
dbg!(unsafe { CStr::from_ptr(ptr) });
```

This happens because, the pointer returned by `as_ptr` does not carry any
lifetime information, and the `CString` is deallocated immediately after
the expression that it is part of has been evaluated.
To fix the problem, bind the `CString` to a local variable:

```
use std::ffi::{CStr, CString};

let c_str = CString::new("Hi!".to_uppercase()).unwrap();
let ptr = c_str.as_ptr();

assert_eq!(unsafe { CStr::from_ptr(ptr) }, c"HI!");
```

## CStr::count_bytes

```rust
pub const fn count_bytes(&self) -> usize
```

Returns the length of `self`. Like C's `strlen`, this does not include the nul terminator.

> **Note**: This method is currently implemented as a constant-time
> cast, but it is planned to alter its definition in the future to
> perform the length calculation whenever this method is called.

# Examples

```
assert_eq!(c"foo".count_bytes(), 3);
assert_eq!(c"".count_bytes(), 0);
```

## CStr::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if `self.to_bytes()` has a length of 0.

# Examples

```
assert!(!c"foo".is_empty());
assert!(c"".is_empty());
```

## CStr::to_bytes

```rust
pub const fn to_bytes(&self) -> &[u8]
```

Converts this C string to a byte slice.

The returned slice will **not** contain the trailing nul terminator that this C
string has.

> **Note**: This method is currently implemented as a constant-time
> cast, but it is planned to alter its definition in the future to
> perform the length calculation whenever this method is called.

# Examples

```
assert_eq!(c"foo".to_bytes(), b"foo");
```

## CStr::to_bytes_with_nul

```rust
pub const fn to_bytes_with_nul(&self) -> &[u8]
```

Converts this C string to a byte slice containing the trailing 0 byte.

This function is the equivalent of [`CStr::to_bytes`] except that it
will retain the trailing nul terminator instead of chopping it off.

> **Note**: This method is currently implemented as a 0-cost cast, but
> it is planned to alter its definition in the future to perform the
> length calculation whenever this method is called.

# Examples

```
assert_eq!(c"foo".to_bytes_with_nul(), b"foo\0");
```

## CStr::to_str

```rust
pub const fn to_str(&self) -> Result<&str, str::Utf8Error>
```

Yields a <code>&[str]</code> slice if the `CStr` contains valid UTF-8.

If the contents of the `CStr` are valid UTF-8 data, this
function will return the corresponding <code>&[str]</code> slice. Otherwise,
it will return an error with details of where UTF-8 validation failed.

[str]: prim@str "str"

# Examples

```
assert_eq!(c"foo".to_str(), Ok("foo"));
```