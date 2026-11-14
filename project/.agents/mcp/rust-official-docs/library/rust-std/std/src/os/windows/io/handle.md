---
title: "std::os::windows::io::handle"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/windows/io/handle.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::windows::io::handle

Owned and borrowed OS handles.

## struct BorrowedHandle

```rust
pub struct BorrowedHandle<'handle>
```

A borrowed handle.

This has a lifetime parameter to tie it to the lifetime of something that
owns the handle.

This uses `repr(transparent)` and has the representation of a host handle,
so it can be used in FFI in places where a handle is passed as an argument,
it is not captured or consumed.

Note that it *may* have the value `-1`, which in `BorrowedHandle` always
represents a valid handle value, such as [the current process handle], and
not `INVALID_HANDLE_VALUE`, despite the two having the same value. See
[here] for the full story.

And, it *may* have the value `NULL` (0), which can occur when consoles are
detached from processes, or when `windows_subsystem` is used.

This type's `.to_owned()` implementation returns another `BorrowedHandle`
rather than an `OwnedHandle`. It just makes a trivial copy of the raw
handle, which is then borrowed under the same lifetime.

## struct OwnedHandle

```rust
pub struct OwnedHandle
```

An owned handle.

This closes the handle on drop.

Note that it *may* have the value `-1`, which in `OwnedHandle` always
represents a valid handle value, such as [the current process handle], and
not `INVALID_HANDLE_VALUE`, despite the two having the same value. See
[here] for the full story.

And, it *may* have the value `NULL` (0), which can occur when consoles are
detached from processes, or when `windows_subsystem` is used.

`OwnedHandle` uses `CloseHandle` to close its handle on drop. As such,
it must not be used with handles to open registry keys which need to be
closed with `RegCloseKey` instead.

## struct HandleOrNull

```rust
pub struct HandleOrNull(RawHandle)
```

FFI type for handles in return values or out parameters, where `NULL` is used
as a sentry value to indicate errors, such as in the return value of `CreateThread`. This uses
`repr(transparent)` and has the representation of a host handle, so that it can be used in such
FFI declarations.

The only thing you can usefully do with a `HandleOrNull` is to convert it into an
`OwnedHandle` using its `TryFrom` implementation; this conversion takes care of the check for
`NULL`. This ensures that such FFI calls cannot start using the handle without
checking for `NULL` first.

This type may hold any handle value that `OwnedHandle` may hold. As with `OwnedHandle`, when
it holds `-1`, that value is interpreted as a valid handle value, such as
[the current process handle], and not `INVALID_HANDLE_VALUE`.

If this holds a non-null handle, it will close the handle on drop.

## struct HandleOrInvalid

```rust
pub struct HandleOrInvalid(RawHandle)
```

FFI type for handles in return values or out parameters, where `INVALID_HANDLE_VALUE` is used
as a sentry value to indicate errors, such as in the return value of `CreateFileW`. This uses
`repr(transparent)` and has the representation of a host handle, so that it can be used in such
FFI declarations.

The only thing you can usefully do with a `HandleOrInvalid` is to convert it into an
`OwnedHandle` using its `TryFrom` implementation; this conversion takes care of the check for
`INVALID_HANDLE_VALUE`. This ensures that such FFI calls cannot start using the handle without
checking for `INVALID_HANDLE_VALUE` first.

This type may hold any handle value that `OwnedHandle` may hold, except that when it holds
`-1`, that value is interpreted to mean `INVALID_HANDLE_VALUE`.

If holds a handle other than `INVALID_HANDLE_VALUE`, it will close the handle on drop.

## BorrowedHandle::borrow_raw

```rust
pub const unsafe fn borrow_raw(handle: RawHandle) -> Self
```

Returns a `BorrowedHandle` holding the given raw handle.

# Safety

The resource pointed to by `handle` must be a valid open handle, it
must remain open for the duration of the returned `BorrowedHandle`.

Note that it *may* have the value `INVALID_HANDLE_VALUE` (-1), which is
sometimes a valid handle value. See [here] for the full story.

And, it *may* have the value `NULL` (0), which can occur when consoles are
detached from processes, or when `windows_subsystem` is used.

## OwnedHandle::try_clone

```rust
pub fn try_clone(&self) -> io::Result<Self>
```

Creates a new `OwnedHandle` instance that shares the same underlying
object as the existing `OwnedHandle` instance.

## BorrowedHandle::try_clone_to_owned

```rust
pub fn try_clone_to_owned(&self) -> io::Result<OwnedHandle>
```

Creates a new `OwnedHandle` instance that shares the same underlying
object as the existing `BorrowedHandle` instance.

## HandleOrNull::from_raw_handle

```rust
pub unsafe fn from_raw_handle(handle: RawHandle) -> Self
```

Constructs a new instance of `Self` from the given `RawHandle` returned
from a Windows API that uses null to indicate failure, such as
`CreateThread`.

Use `HandleOrInvalid` instead of `HandleOrNull` for APIs that
use `INVALID_HANDLE_VALUE` to indicate failure.

# Safety

The passed `handle` value must either satisfy the safety requirements
of `FromRawHandle::from_raw_handle`, or be null. Note that not all
Windows APIs use null for errors; see [here] for the full story.

## HandleOrInvalid::from_raw_handle

```rust
pub unsafe fn from_raw_handle(handle: RawHandle) -> Self
```

Constructs a new instance of `Self` from the given `RawHandle` returned
from a Windows API that uses `INVALID_HANDLE_VALUE` to indicate
failure, such as `CreateFileW`.

Use `HandleOrNull` instead of `HandleOrInvalid` for APIs that
use null to indicate failure.

# Safety

The passed `handle` value must either satisfy the safety requirements
of `FromRawHandle::from_raw_handle`, or be
`INVALID_HANDLE_VALUE` (-1). Note that not all Windows APIs use
`INVALID_HANDLE_VALUE` for errors; see [here] for the full story.

## trait AsHandle

```rust
pub trait AsHandle
```

A trait to borrow the handle from an underlying object.

## AsHandle::as_handle

```rust
fn as_handle(&self) -> BorrowedHandle<'_>
```

use std::fs::File;
# use std::io;
use std::os::windows::io::{AsHandle, BorrowedHandle};

let mut f = File::open("foo.txt")?;
let borrowed_handle: BorrowedHandle<'_> = f.as_handle();
# Ok::<(), io::Error>(())
```rust
