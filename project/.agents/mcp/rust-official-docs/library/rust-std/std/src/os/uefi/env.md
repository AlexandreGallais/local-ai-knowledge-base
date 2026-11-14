---
title: "std::os::uefi::env"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/uefi/env.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::uefi::env

UEFI-specific extensions to the primitives in `std::env` module

## fn system_table

```rust
pub fn system_table() -> NonNull<c_void>
```

Gets the SystemTable Pointer.

If you want to use `BootServices` then please use `boot_services` as it performs some
additional checks.

Note: This function panics if the System Table or Image Handle is not initialized.

## fn image_handle

```rust
pub fn image_handle() -> NonNull<c_void>
```

Gets the ImageHandle Pointer.

Note: This function panics if the System Table or Image Handle is not initialized.

## fn boot_services

```rust
pub fn boot_services() -> Option<NonNull<c_void>>
```

Gets the BootServices Pointer.

This function also checks if `ExitBootServices` has already been called.
