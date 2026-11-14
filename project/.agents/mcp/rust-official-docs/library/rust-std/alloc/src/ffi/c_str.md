# alloc::ffi::c_str

[`CString`] and its related types.

## struct CString

```rust
pub struct CString
```

A type representing an owned, C-compatible, nul-terminated string with no nul bytes in the
middle.

This type serves the purpose of being able to safely generate a
C-compatible string from a Rust byte slice or vector. An instance of this
type is a static guarantee that the underlying bytes contain no interior 0
bytes ("nul characters") and that the final byte is 0 ("nul terminator").

`CString` is to <code>&[CStr]</code> as [`String`] is to <code>&[str]</code>: the former
in each pair are owned strings; the latter are borrowed
references.

# Creating a `CString`

A `CString` is created from either a byte slice or a byte vector,
or anything that implements <code>[Into]<[Vec]<[u8]>></code> (for
example, you can build a `CString` straight out of a [`String`] or
a <code>&[str]</code>, since both implement that trait).
You can create a `CString` from a literal with `CString::from(c"Text")`.

The [`CString::new`] method will actually check that the provided <code>&[[u8]]</code>
does not have 0 bytes in the middle, and return an error if it
finds one.

# Extracting a raw pointer to the whole C string

`CString` implements an [`as_ptr`][`CStr::as_ptr`] method through the [`Deref`]
trait. This method will give you a `*const c_char` which you can
feed directly to extern functions that expect a nul-terminated
string, like C's `strdup()`. Notice that [`as_ptr`][`CStr::as_ptr`] returns a
read-only pointer; if the C code writes to it, that causes
undefined behavior.

# Extracting a slice of the whole C string

Alternatively, you can obtain a <code>&[[u8]]</code> slice from a
`CString` with the [`CString::as_bytes`] method. Slices produced in this
way do *not* contain the trailing nul terminator. This is useful
when you will be calling an extern function that takes a `*const
u8` argument which is not necessarily nul-terminated, plus another
argument with the length of the string — like C's `strndup()`.
You can of course get the slice's length with its
[`len`][slice::len] method.

If you need a <code>&[[u8]]</code> slice *with* the nul terminator, you
can use [`CString::as_bytes_with_nul`] instead.

Once you have the kind of slice you need (with or without a nul
terminator), you can call the slice's own
[`as_ptr`][slice::as_ptr] method to get a read-only raw pointer to pass to
extern functions. See the documentation for that function for a
discussion on ensuring the lifetime of the raw pointer.

[str]: prim@str "str"
[`Deref`]: ops::Deref

# Examples

```ignore (extern-declaration)
# fn main() {
use std::ffi::CString;
use std::os::raw::c_char;

extern "C" {
    fn my_printer(s: *const c_char);
}

// We are certain that our string doesn't have 0 bytes in the middle,
// so we can .expect()
let c_to_print = CString::new("Hello, world!").expect("we provided a string without NUL bytes, so CString::new should not fail");
unsafe {
    my_printer(c_to_print.as_ptr());
}
# }
```

# Safety

`CString` is intended for working with traditional C-style strings
(a sequence of non-nul bytes terminated by a single nul byte); the
primary use case for these kinds of strings is interoperating with C-like
code. Often you will need to transfer ownership to/from that external
code. It is strongly recommended that you thoroughly read through the
documentation of `CString` before use, as improper ownership management
of `CString` instances can lead to invalid memory accesses, memory leaks,
and other memory errors.

## struct NulError

```rust
pub struct NulError(usize, Vec<u8>)
```

An error indicating that an interior nul byte was found.

While Rust strings may contain nul bytes in the middle, C strings
can't, as that byte would effectively truncate the string.

This error is created by the [`new`][`CString::new`] method on
[`CString`]. See its documentation for more.

# Examples

```
use std::ffi::{CString, NulError};

let _: NulError = CString::new(b"f\0oo".to_vec()).unwrap_err();
```

## struct FromVecWithNulError

```rust
pub struct FromVecWithNulError
```

An error indicating that a nul byte was not in the expected position.

The vector used to create a [`CString`] must have one and only one nul byte,
positioned at the end.

This error is created by the [`CString::from_vec_with_nul`] method.
See its documentation for more.

# Examples

```
use std::ffi::{CString, FromVecWithNulError};

let _: FromVecWithNulError = CString::from_vec_with_nul(b"f\0oo".to_vec()).unwrap_err();
```

## FromVecWithNulError::as_bytes

```rust
pub fn as_bytes(&self) -> &[u8]
```

Returns a slice of [`u8`]s bytes that were attempted to convert to a [`CString`].

# Examples

Basic usage:

```
use std::ffi::CString;

// Some invalid bytes in a vector
let bytes = b"f\0oo".to_vec();

let value = CString::from_vec_with_nul(bytes.clone());

assert_eq!(&bytes[..], value.unwrap_err().as_bytes());
```

## FromVecWithNulError::into_bytes

```rust
pub fn into_bytes(self) -> Vec<u8>
```

Returns the bytes that were attempted to convert to a [`CString`].

This method is carefully constructed to avoid allocation. It will
consume the error, moving out the bytes, so that a copy of the bytes
does not need to be made.

# Examples

Basic usage:

```
use std::ffi::CString;

// Some invalid bytes in a vector
let bytes = b"f\0oo".to_vec();

let value = CString::from_vec_with_nul(bytes.clone());

assert_eq!(bytes, value.unwrap_err().into_bytes());
```

## struct IntoStringError

```rust
pub struct IntoStringError
```

An error indicating invalid UTF-8 when converting a [`CString`] into a [`String`].

`CString` is just a wrapper over a buffer of bytes with a nul terminator;
[`CString::into_string`] performs UTF-8 validation on those bytes and may
return this error.

This `struct` is created by [`CString::into_string()`]. See
its documentation for more.

## CString::new

```rust
pub fn new<T: Into<Vec<u8>>>(t: T) -> Result<CString, NulError>
```

Creates a new C-compatible string from a container of bytes.

This function will consume the provided data and use the
underlying bytes to construct a new string, ensuring that
there is a trailing 0 byte. This trailing 0 byte will be
appended by this function; the provided data should *not*
contain any 0 bytes in it.

# Examples

```ignore (extern-declaration)
use std::ffi::CString;
use std::os::raw::c_char;

extern "C" { fn puts(s: *const c_char); }

let to_print = CString::new("Hello!").expect("we provided a string without NUL bytes, so CString::new should not fail");
unsafe {
    puts(to_print.as_ptr());
}
```

# Errors

This function will return an error if the supplied bytes contain an
internal 0 byte. The [`NulError`] returned will contain the bytes as well as
the position of the nul byte.

## CString::from_vec_unchecked

```rust
pub unsafe fn from_vec_unchecked(v: Vec<u8>) -> Self
```

Creates a C-compatible string by consuming a byte vector,
without checking for interior 0 bytes.

Trailing 0 byte will be appended by this function.

This method is equivalent to [`CString::new`] except that no runtime
assertion is made that `v` contains no 0 bytes, and it requires an
actual byte vector, not anything that can be converted to one with Into.

# Safety

The caller must ensure `v` contains no nul bytes in its contents.

# Examples

```
use std::ffi::CString;

let raw = b"foo".to_vec();
unsafe {
    let c_string = CString::from_vec_unchecked(raw);
}
```

## CString::from_raw

```rust
pub unsafe fn from_raw(ptr: *mut c_char) -> CString
```

Retakes ownership of a `CString` that was transferred to C via
[`CString::into_raw`].

Additionally, the length of the string will be recalculated from the pointer.

# Safety

This should only ever be called with a pointer that was earlier
obtained by calling [`CString::into_raw`], and the memory it points to must not be accessed
through any other pointer during the lifetime of reconstructed `CString`.
Other usage (e.g., trying to take ownership of a string that was allocated by foreign code)
is likely to lead to undefined behavior or allocator corruption.

This function does not validate ownership of the raw pointer's memory.
A double-free may occur if the function is called twice on the same raw pointer.
Additionally, the caller must ensure the pointer is not dangling.

It should be noted that the length isn't just "recomputed," but that
the recomputed length must match the original length from the
[`CString::into_raw`] call. This means the [`CString::into_raw`]/`from_raw`
methods should not be used when passing the string to C functions that can
modify the string's length.

> **Note:** If you need to borrow a string that was allocated by
> foreign code, use [`CStr`]. If you need to take ownership of
> a string that was allocated by foreign code, you will need to
> make your own provisions for freeing it appropriately, likely
> with the foreign code's API to do that.

# Examples

Creates a `CString`, pass ownership to an `extern` function (via raw pointer), then retake
ownership with `from_raw`:

```ignore (extern-declaration)
use std::ffi::CString;
use std::os::raw::c_char;

extern "C" {
    fn some_extern_function(s: *mut c_char);
}

let c_string = CString::from(c"Hello!");
let raw = c_string.into_raw();
unsafe {
    some_extern_function(raw);
    let c_string = CString::from_raw(raw);
}
```

## CString::into_raw

```rust
pub fn into_raw(self) -> *mut c_char
```

Consumes the `CString` and transfers ownership of the string to a C caller.

The pointer which this function returns must be returned to Rust and reconstituted using
[`CString::from_raw`] to be properly deallocated. Specifically, one
should *not* use the standard C `free()` function to deallocate
this string.

Failure to call [`CString::from_raw`] will lead to a memory leak.

The C side must **not** modify the length of the string (by writing a
nul byte somewhere inside the string or removing the final one) before
it makes it back into Rust using [`CString::from_raw`]. See the safety section
in [`CString::from_raw`].

# Examples

```
use std::ffi::CString;

let c_string = CString::from(c"foo");

let ptr = c_string.into_raw();

unsafe {
    assert_eq!(b'f', *ptr as u8);
    assert_eq!(b'o', *ptr.add(1) as u8);
    assert_eq!(b'o', *ptr.add(2) as u8);
    assert_eq!(b'\0', *ptr.add(3) as u8);

    // retake pointer to free memory
    let _ = CString::from_raw(ptr);
}
```

## CString::into_string

```rust
pub fn into_string(self) -> Result<String, IntoStringError>
```

Converts the `CString` into a [`String`] if it contains valid UTF-8 data.

On failure, ownership of the original `CString` is returned.

# Examples

```
use std::ffi::CString;

let valid_utf8 = vec![b'f', b'o', b'o'];
let cstring = CString::new(valid_utf8).expect("we provided bytes that do not have a NUL byte, so CString::new should not fail");
assert_eq!(cstring.into_string().expect("we provided bytes that are valid UTF-8, so `into_string` should not fail"), "foo");

let invalid_utf8 = vec![b'f', 0xff, b'o', b'o'];
let cstring = CString::new(invalid_utf8).expect("we provided bytes that do not have a NUL byte, so CString::new should not fail");
let err = cstring.into_string().expect_err("we provided bytes that are invalid UTF-8, so `into_string` should fail");
assert_eq!(err.utf8_error().valid_up_to(), 1);
```

## CString::into_bytes

```rust
pub fn into_bytes(self) -> Vec<u8>
```

Consumes the `CString` and returns the underlying byte buffer.

The returned buffer does **not** contain the trailing nul
terminator, and it is guaranteed to not have any interior nul
bytes.

# Examples

```
use std::ffi::CString;

let c_string = CString::from(c"foo");
let bytes = c_string.into_bytes();
assert_eq!(bytes, vec![b'f', b'o', b'o']);
```

## CString::into_bytes_with_nul

```rust
pub fn into_bytes_with_nul(self) -> Vec<u8>
```

Equivalent to [`CString::into_bytes()`] except that the
returned vector includes the trailing nul terminator.

# Examples

```
use std::ffi::CString;

let c_string = CString::from(c"foo");
let bytes = c_string.into_bytes_with_nul();
assert_eq!(bytes, vec![b'f', b'o', b'o', b'\0']);
```

## CString::as_bytes

```rust
pub fn as_bytes(&self) -> &[u8]
```

Returns the contents of this `CString` as a slice of bytes.

The returned slice does **not** contain the trailing nul
terminator, and it is guaranteed to not have any interior nul
bytes. If you need the nul terminator, use
[`CString::as_bytes_with_nul`] instead.

# Examples

```
use std::ffi::CString;

let c_string = CString::from(c"foo");
let bytes = c_string.as_bytes();
assert_eq!(bytes, &[b'f', b'o', b'o']);
```

## CString::as_bytes_with_nul

```rust
pub fn as_bytes_with_nul(&self) -> &[u8]
```

Equivalent to [`CString::as_bytes()`] except that the
returned slice includes the trailing nul terminator.

# Examples

```
use std::ffi::CString;

let c_string = CString::from(c"foo");
let bytes = c_string.as_bytes_with_nul();
assert_eq!(bytes, &[b'f', b'o', b'o', b'\0']);
```

## CString::as_c_str

```rust
pub fn as_c_str(&self) -> &CStr
```

Extracts a [`CStr`] slice containing the entire string.

# Examples

```
use std::ffi::{CString, CStr};

let c_string = CString::from(c"foo");
let cstr = c_string.as_c_str();
assert_eq!(cstr,
           CStr::from_bytes_with_nul(b"foo\0").expect("we provided bytes that has one NUL byte exactly at the end, so CStr::from_bytes_with_nul should not fail"));
```

## CString::into_boxed_c_str

```rust
pub fn into_boxed_c_str(self) -> Box<CStr>
```

Converts this `CString` into a boxed [`CStr`].

# Examples

```
let c_string = c"foo".to_owned();
let boxed = c_string.into_boxed_c_str();
assert_eq!(boxed.to_bytes_with_nul(), b"foo\0");
```

## CString::from_vec_with_nul_unchecked

```rust
pub unsafe fn from_vec_with_nul_unchecked(v: Vec<u8>) -> Self
```

Converts a <code>[Vec]<[u8]></code> to a [`CString`] without checking the
invariants on the given [`Vec`].

# Safety

The given [`Vec`] **must** have one nul byte as its last element.
This means it cannot be empty nor have any other nul byte anywhere else.

# Example

```
use std::ffi::CString;
assert_eq!(
    unsafe { CString::from_vec_with_nul_unchecked(b"abc\0".to_vec()) },
    unsafe { CString::from_vec_unchecked(b"abc".to_vec()) }
);
```

## CString::from_vec_with_nul

```rust
pub fn from_vec_with_nul(v: Vec<u8>) -> Result<Self, FromVecWithNulError>
```

Attempts to convert a <code>[Vec]<[u8]></code> to a [`CString`].

Runtime checks are present to ensure there is only one nul byte in the
[`Vec`], its last element.

# Errors

If a nul byte is present and not the last element or no nul bytes
is present, an error will be returned.

# Examples

A successful conversion will produce the same result as [`CString::new`]
when called without the ending nul byte.

```
use std::ffi::CString;
assert_eq!(
    CString::from_vec_with_nul(b"abc\0".to_vec())
        .expect("we provided bytes that has one NUL byte exactly at the end, so CString::from_vec_with_nul should not fail"),
    c"abc".to_owned()
);
```

An incorrectly formatted [`Vec`] will produce an error.

```
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
[`CString::new`] to fail.

# Examples

```
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

```
use std::ffi::CString;

let nul_error = CString::new("foo\0bar").unwrap_err();
assert_eq!(nul_error.into_vec(), b"foo\0bar");
```

## IntoStringError::into_cstring

```rust
pub fn into_cstring(self) -> CString
```

Consumes this error, returning original [`CString`] which generated the
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
function will return a <code>[Cow]::[Borrowed]\(&[str])</code>
with the corresponding <code>&[str]</code> slice. Otherwise, it will
replace any invalid UTF-8 sequences with
[`U+FFFD REPLACEMENT CHARACTER`][U+FFFD] and return a
<code>[Cow]::[Owned]\([String])</code> with the result.

[str]: prim@str "str"
[Borrowed]: Cow::Borrowed
[Owned]: Cow::Owned
[U+FFFD]: char::REPLACEMENT_CHARACTER

# Examples

Calling `to_string_lossy` on a `CStr` containing valid UTF-8. The leading
`c` on the string literal denotes a `CStr`.

```
use std::borrow::Cow;

assert_eq!(c"Hello World".to_string_lossy(), Cow::Borrowed("Hello World"));
```

Calling `to_string_lossy` on a `CStr` containing invalid UTF-8:

```
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

Converts a <code>[Box]<[CStr]></code> into a [`CString`] without copying or allocating.

# Examples

```
use std::ffi::{CStr, CString};

let boxed: Box<CStr> = Box::from(c"foo");
let c_string: CString = c"foo".to_owned();

assert_eq!(boxed.into_c_string(), c_string);
```