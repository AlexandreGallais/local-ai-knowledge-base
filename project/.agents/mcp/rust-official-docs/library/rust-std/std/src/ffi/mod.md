---
title: "std::ffi"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/ffi/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::ffi

Utilities related to FFI bindings.

This module provides utilities to handle data across non-Rust
interfaces, like other programming languages and the underlying
operating system. It is mainly of use for FFI (Foreign Function
Interface) bindings and code that needs to exchange C-like strings
with other languages.

#### Overview

Rust represents owned strings with the `String` type, and
borrowed slices of strings with the `str` primitive. Both are
always in UTF-8 encoding, and may contain nul bytes in the middle,
i.e., if you look at the bytes that make up the string, there may
be a `\0` among them. Both `String` and `str` store their length
explicitly; there are no nul terminators at the end of strings
like in C.

C strings are different from Rust strings:

* **Encodings** - Rust strings are UTF-8, but C strings may use
other encodings. If you are using a string from C, you should
check its encoding explicitly, rather than just assuming that it
is UTF-8 like you can do in Rust.

* **Character size** - C strings may use `char` or `wchar_t`-sized
characters; please **note** that C's `char` is different from Rust's.
The C standard leaves the actual sizes of those types open to
interpretation, but defines different APIs for strings made up of
each character type. Rust strings are always UTF-8, so different
Unicode characters will be encoded in a variable number of bytes
each. The Rust type `char` represents a '[Unicode scalar
value]', which is similar to, but not the same as, a '[Unicode
code point]'.

* **Nul terminators and implicit string lengths** - Often, C
strings are nul-terminated, i.e., they have a `\0` character at the
end. The length of a string buffer is not stored, but has to be
calculated; to compute the length of a string, C code must
manually call a function like `strlen()` for `char`-based strings,
or `wcslen()` for `wchar_t`-based ones. Those functions return
the number of characters in the string excluding the nul
terminator, so the buffer length is really `len+1` characters.
Rust strings don't have a nul terminator; their length is always
stored and does not need to be calculated. While in Rust
accessing a string's length is an *O*(1) operation (because the
length is stored); in C it is an *O*(*n*) operation because the
length needs to be computed by scanning the string for the nul
terminator.

* **Internal nul characters** - When C strings have a nul
terminator character, this usually means that they cannot have nul
characters in the middle — a nul character would essentially
truncate the string. Rust strings *can* have nul characters in
the middle, because nul does not have to mark the end of the
string in Rust.

#### Representations of non-Rust strings

`CString` and `CStr` are useful when you need to transfer
UTF-8 strings to and from languages with a C ABI, like Python.

* **From Rust to C:** `CString` represents an owned, C-friendly
string: it is nul-terminated, and has no internal nul characters.
Rust code can create a `CString` out of a normal string (provided
that the string doesn't have nul characters in the middle), and
then use a variety of methods to obtain a raw `\*mut [u8]` that can
then be passed as an argument to functions which use the C
conventions for strings.

* **From C to Rust:** `CStr` represents a borrowed C string; it
is what you would use to wrap a raw `\*const [u8]` that you got from
a C function. A `CStr` is guaranteed to be a nul-terminated array
of bytes. Once you have a `CStr`, you can convert it to a Rust
`&[str]` if it's valid UTF-8, or lossily convert it by adding
replacement characters.

`OsString` and `OsStr` are useful when you need to transfer
strings to and from the operating system itself, or when capturing
the output of external commands. Conversions between `OsString`,
`OsStr` and Rust strings work similarly to those for `CString`
and `CStr`.

* `OsString` losslessly represents an owned platform string. However, this
representation is not necessarily in a form native to the platform.
In the Rust standard library, various APIs that transfer strings to/from the operating
system use `OsString` instead of plain strings. For example,
`env::var_os()` is used to query environment variables; it
returns an <code>[Option]<[OsString]></code>. If the environment variable
exists you will get a `[Some]\(os_string)`, which you can
*then* try to convert to a Rust string. This yields a `Result`, so that
your code can detect errors in case the environment variable did
not in fact contain valid Unicode data.

* `OsStr` losslessly represents a borrowed reference to a platform string.
However, this representation is not necessarily in a form native to the platform.
It can be converted into a UTF-8 Rust string slice in a similar way to
`OsString`.

#### Conversions

#### On Unix

On Unix, `OsStr` implements the
`std::os::unix::ffi::OsStrExt` trait, which
augments it with two methods, `from_bytes` and `as_bytes`.
These do inexpensive conversions from and to byte slices.

Additionally, on Unix `OsString` implements the
`std::os::unix::ffi::OsStringExt` trait,
which provides `from_vec` and `into_vec` methods that consume
their arguments, and take or produce vectors of `u8`.

#### On Windows

An `OsStr` can be losslessly converted to a native Windows string. And
a native Windows string can be losslessly converted to an `OsString`.

On Windows, `OsStr` implements the
`std::os::windows::ffi::OsStrExt` trait,
which provides an `encode_wide` method. This provides an
iterator that can be `collect`ed into a vector of `u16`. After a nul
characters is appended, this is the same as a native Windows string.

Additionally, on Windows `OsString` implements the
`std::os::windows:ffi::OsStringExt`
trait, which provides a `from_wide` method to convert a native Windows
string (without the terminating nul character) to an `OsString`.

#### Other platforms

Many other platforms provide their own extension traits in a
`std::os::*::ffi` module.

#### On all platforms

On all platforms, `OsStr` consists of a sequence of bytes that is encoded as a superset of
UTF-8; see `OsString` for more details on its encoding on different platforms.

For limited, inexpensive conversions from and to bytes, see `OsStr::as_encoded_bytes` and
`OsStr::from_encoded_bytes_unchecked`.

For basic <example-value> processing, see `OsStr::slice_encoded_bytes`.
