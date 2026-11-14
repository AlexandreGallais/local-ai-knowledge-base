---
title: "core::panic::location"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/panic/location.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::panic::location

## struct Location

```rust
pub struct Location<'a>
```

A struct containing information about the location of a panic.

This structure is created by `PanicHookInfo::location()` and `PanicInfo::location()`.

# Examples

```rust
use std::panic;

panic::set_hook(Box::new(|panic_info| {
    if let Some(location) = panic_info.location() {
        println!("panic occurred in file '{}' at line {}", location.file(), location.line());
    } else {
        println!("panic occurred but can't get location information...");
    }
}));

panic!("Normal panic");
```

# Comparisons

Comparisons for equality and ordering are made in file, line, then column priority.
Files are compared as strings, not `Path`, which could be unexpected.
See `Location::file`'s documentation for more discussion.

## Location::caller

```rust
pub const fn caller() -> &'static Location<'static>
```

Returns the source location of the caller of this function. If that function's caller is
annotated then its call location will be returned, and so on up the stack to the first call
within a non-tracked function body.

# Examples

```
use std::panic::Location;

/// ```
///      |1        |11       |21       |31       |41
///    +-|---------|---------|---------|---------|--------
/// 15 | #[track_caller]
/// 16 | fn new_location() -> &'static Location<'static> {
/// 17 |     Location::caller()
///    |     ------------------| the value of this expression depends on the caller,
///    |                       | since the function is marked #[track_caller]
/// 18 | }
/// ```
#[track_caller]
fn new_location() -> &'static Location<'static> {
    Location::caller()
}

/// ```
///      |1  |5    |11       |21       |31       |41       |51
///    +-|---|-----|---------|---------|---------|---------|---
/// 29 | fn constant_location() -> &'static Location<'static> {
/// 30 |     new_location()
///    |     ^ any invocation of constant_location() points here,
///    |       no matter the location it is called from
/// 31 | }
/// ```
fn constant_location() -> &'static Location<'static> {
    new_location()
}

fn main() {
    //      |1  |5    |11       |21       |31       |41       |51
    //    +-|---|-----|---------|---------|---------|---------|---
    // 29 | fn constant_location() -> &'static Location<'static> {
    // 30 |     new_location()
    //    |     ^ `let constant` points here
    // 31 | }
    let constant = constant_location();
    assert_eq!(constant.file(), file!());
    assert_eq!((constant.line(), constant.column()), (30, 5));

    let constant_2 = constant_location();
    assert_eq!(
        (constant.file(), constant.line(), constant.column()),
        (constant_2.file(), constant_2.line(), constant_2.column())
    );

    //      |1        |11  |16  |21       |31
    //    +-|---------|----|----|---------|------
    // 55 |     let here = new_location();
    //    |                ^ `let here` points here, as `new_location()` is the callsite
    // 56 |     assert_eq!(here.file(), file!());
    let here = new_location();
    assert_eq!(here.file(), file!());
    assert_eq!((here.line(), here.column()), (55, 16));

    //      |1        |11       |21       ||32      |41       |51
    //    +-|---------|---------|---------||--------|---------|------
    // 64 |     let yet_another_location = new_location();
    //    |                                ^ `let yet_another_location` points here
    // 65 |     assert_eq!(here.file(), yet_another_location.file());
    let yet_another_location = new_location();
    assert_eq!(here.file(), yet_another_location.file());
    assert_ne!(
        (here.line(), here.column()),
        (yet_another_location.line(), yet_another_location.column())
    );
}
```rust

## Location::file

```rust
pub const fn file(&self) -> &'a str
```

Returns the name of the source file from which the panic originated.

# `&str`, not `&Path`

The returned name refers to a source path on the compiling system, but it isn't valid to
represent this directly as a `&Path`. The compiled code may run on a different system with
a different `Path` implementation than the system providing the contents and this library
does not currently have a different "host path" type.

The most surprising behavior occurs when "the same" file is reachable via multiple paths in
the module system (usually using the `#[path = "..."]` attribute or similar), which can
cause what appears to be identical code to return differing values from this function.

# Cross-compilation

This value is not suitable for passing to `Path::new` or similar constructors when the host
platform and target platform differ.

# Examples

```rust
use std::panic;

panic::set_hook(Box::new(|panic_info| {
    if let Some(location) = panic_info.location() {
        println!("panic occurred in file '{}'", location.file());
    } else {
        println!("panic occurred but can't get location information...");
    }
}));

panic!("Normal panic");
```

## Location::file_as_c_str

```rust
pub const fn file_as_c_str(&self) -> &'a CStr
```

Returns the name of the source file as a nul-terminated `CStr`.

This is useful for interop with APIs that expect C/C++ `__FILE__` or
`std::source_location::file_name`, both of which return a nul-terminated `const char*`.

## Location::line

```rust
pub const fn line(&self) -> u32
```

Returns the line number from which the panic originated.

# Examples

```rust
use std::panic;

panic::set_hook(Box::new(|panic_info| {
    if let Some(location) = panic_info.location() {
        println!("panic occurred at line {}", location.line());
    } else {
        println!("panic occurred but can't get location information...");
    }
}));

panic!("Normal panic");
```

## Location::column

```rust
pub const fn column(&self) -> u32
```

Returns the column from which the panic originated.

# Examples

```rust
use std::panic;

panic::set_hook(Box::new(|panic_info| {
    if let Some(location) = panic_info.location() {
        println!("panic occurred at column {}", location.column());
    } else {
        println!("panic occurred but can't get location information...");
    }
}));

panic!("Normal panic");
```
