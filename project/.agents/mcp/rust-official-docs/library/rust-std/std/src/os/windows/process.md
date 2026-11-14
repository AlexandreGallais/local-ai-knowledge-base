---
title: "std::os::windows::process"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/windows/process.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::windows::process

Windows-specific extensions to primitives in the `std::process` module.

## ProcThreadAttributeList::build

```rust
pub fn build() -> ProcThreadAttributeListBuilder<'a>
```

Creates a new builder for constructing a `ProcThreadAttributeList`.

## ProcThreadAttributeListBuilder::attribute

```rust
pub fn attribute<T>(self, attribute: usize, value: &'a T) -> Self
```

Sets an attribute on the attribute list.

The `attribute` parameter specifies the raw attribute to be set, while
the `value` parameter holds the value associated with that attribute.
Please refer to the Windows documentation for a list of valid attributes.

# Note

The maximum number of attributes is the value of `u32::MAX`. If this
limit is exceeded, the call to `Self::finish` will return an `Error`
indicating that the maximum number of attributes has been exceeded.

# Safety Note

Remember that improper use of attributes can lead to undefined behavior
or security vulnerabilities. Always consult the documentation and ensure
proper attribute values are used.

## ProcThreadAttributeListBuilder::raw_attribute

```rust
pub unsafe fn raw_attribute<T>( mut self, attribute: usize, value_ptr: *const T, value_size: usize, ) -> Self
```

#![feature(windows_process_extensions_raw_attribute)]
use std::ffi::c_void;
use std::os::windows::process::{CommandExt, ProcThreadAttributeList};
use std::os::windows::raw::HANDLE;
use std::process::Command;

#[repr(C)]
pub struct COORD {
    pub X: i16,
    pub Y: i16,
}

unsafe extern "system" {
    fn CreatePipe(
        hreadpipe: *mut HANDLE,
        hwritepipe: *mut HANDLE,
        lppipeattributes: *const c_void,
        nsize: u32,
    ) -> i32;
    fn CreatePseudoConsole(
        size: COORD,
        hinput: HANDLE,
        houtput: HANDLE,
        dwflags: u32,
        phpc: *mut isize,
    ) -> i32;
    fn CloseHandle(hobject: HANDLE) -> i32;
}

let [mut input_read_side, mut output_write_side, mut output_read_side, mut input_write_side] =
    [unsafe { std::mem::zeroed::<HANDLE>() }; 4];

unsafe {
    CreatePipe(&mut input_read_side, &mut input_write_side, std::ptr::null(), 0);
    CreatePipe(&mut output_read_side, &mut output_write_side, std::ptr::null(), 0);
}

let size = COORD { X: 60, Y: 40 };
let mut h_pc = unsafe { std::mem::zeroed() };
unsafe { CreatePseudoConsole(size, input_read_side, output_write_side, 0, &mut h_pc) };

unsafe { CloseHandle(input_read_side) };
unsafe { CloseHandle(output_write_side) };

const PROC_THREAD_ATTRIBUTE_PSEUDOCONSOLE: usize = 131094;

let attribute_list = unsafe {
    ProcThreadAttributeList::build()
        .raw_attribute(
            PROC_THREAD_ATTRIBUTE_PSEUDOCONSOLE,
            h_pc as *const c_void,
            size_of::<isize>(),
        )
        .finish()?
};

let mut child = Command::new("cmd").spawn_with_attributes(&attribute_list)?;
#
# child.kill()?;
# Ok::<(), std::io::Error>(())
```rust

## ProcThreadAttributeListBuilder::finish

```rust
pub fn finish(&self) -> io::Result<ProcThreadAttributeList<'a>>
```

Finalizes the construction of the `ProcThreadAttributeList`.

# Errors

Returns an error if the maximum number of attributes is exceeded
or if there is an I/O error during initialization.
