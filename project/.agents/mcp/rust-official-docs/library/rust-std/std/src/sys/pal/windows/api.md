# std::sys::pal::windows::api

# Safe(r) wrappers around Windows API functions.

This module contains fairly thin wrappers around Windows API functions,
aimed at centralising safety instead of having unsafe blocks spread
throughout higher level code. This makes it much easier to audit FFI safety.

Not all functions can be made completely safe without more context but in
such cases we should still endeavour to reduce the caller's burden of safety
as much as possible.

## Guidelines for wrappers

Items here should be named similarly to their raw Windows API name, except
that they follow Rust's case conventions. E.g. function names are
lower_snake_case. The idea here is that it should be easy for a Windows
C/C++ programmer to identify the underlying function that's being wrapped
while not looking too out of place in Rust code.

Every use of an `unsafe` block must have a related SAFETY comment, even if
it's trivially safe (for example, see `get_last_error`). Public unsafe
functions must document what the caller has to do to call them safely.

Avoid unchecked `as` casts. For integers, either assert that the integer
is in range or use `try_into` instead. For pointers, prefer to use
`ptr.cast::<Type>()` when possible.

This module must only depend on core and not on std types as the eventual
hope is to have std depend on sys and not the other way around.
However, some amount of glue code may currently be necessary so such code
should go in sys/pal/windows/mod.rs rather than here. See `IoResult` as an example.

## fn utf16_len

```rust
pub const fn utf16_len(s: &str) -> usize
```

Gets the UTF-16 length of a UTF-8 string, for use in the wide_str macro.

## fn to_utf16

```rust
pub const fn to_utf16<const UTF16_LEN: usize>(s: &str) -> [u16; UTF16_LEN]
```

Const convert UTF-8 to UTF-16, for use in the wide_str macro.

Note that this is designed for use in const contexts so is not optimized.

## trait SetFileInformation

```rust
pub unsafe trait SetFileInformation
```

The `SetFileInformationByHandle` function takes a generic parameter by
making the user specify the type (class), a pointer to the data and its
size. This trait allows attaching that information to a Rust type so that
[`set_file_information_by_handle`] can be called safely.

This trait is designed so that it can support variable sized types.
However, currently Rust's std only uses fixed sized structures.

# Safety

* `as_ptr` must return a pointer to memory that is readable up to `size` bytes.
* `CLASS` must accurately reflect the type pointed to by `as_ptr`. E.g.
the `FILE_BASIC_INFO` structure has the class `FileBasicInfo`.

## SetFileInformation::CLASS

```rust
const CLASS: i32
```

The type of information to set.

## SetFileInformation::as_ptr

```rust
fn as_ptr(&self) -> *const c_void
```

A pointer to the file information to set.

## SetFileInformation::size

```rust
fn size(&self) -> u32
```

The size of the type pointed to by `as_ptr`.

## fn get_last_error

```rust
pub fn get_last_error() -> WinError
```

Gets the error from the last function.
This must be called immediately after the function that sets the error to
avoid the risk of another function overwriting it.

## struct WinError

```rust
pub struct WinError
```

An error code as returned by [`get_last_error`].

This is usually a 16-bit Win32 error code but may be a 32-bit HRESULT or NTSTATUS.
Check the documentation of the Windows API function being called for expected errors.

## WinError::SUCCESS

```rust
pub const SUCCESS: Self = Self::new(c::ERROR_SUCCESS)
```

Success is not an error.
Some Windows APIs do use this to distinguish between a zero return and an error return
but we should never return this to users as an error.

## struct UnicodeStrRef

```rust
pub struct UnicodeStrRef<'a>
```

A wrapper around a UNICODE_STRING that is equivalent to `&[u16]`.

It is preferable to use the `unicode_str!` macro as that contains mitigations for  #143078.

If the MaximumLength field of the underlying UNICODE_STRING is greater than
the Length field then you can test if the string is null terminated by inspecting
the u16 directly after the string. You cannot otherwise depend on nul termination.

## UnicodeStrRef::as_ptr

```rust
pub const fn as_ptr(&self) -> *const c::UNICODE_STRING
```

Returns a pointer to the underlying UNICODE_STRING

## fn get_logical_drives

```rust
pub fn get_logical_drives() -> impl Iterator<Item = u8>
```

Returns a list of enabled drive letters.

This is a wrapper around [`GetLogicalDrives`].
Each letter is returned as an ascii byte.

[`GetLogicalDrives`]: (https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getlogicaldrives)