# std::sys::pal::uefi

Platform-specific extensions to `std` for UEFI platforms.

Provides access to platform-level information on UEFI platforms, and
exposes UEFI-specific functions that would otherwise be inappropriate as
part of the core `std` library.

It exposes more ways to deal with platform-specific strings ([`OsStr`],
[`OsString`]), allows to set permissions more granularly, extract low-level
file descriptors from files and sockets, and has platform-specific helpers
for spawning processes.

[`OsStr`]: crate::ffi::OsStr
[`OsString`]: crate::ffi::OsString

## fn cleanup

```rust
pub unsafe fn cleanup()
```

# SAFETY
this is not guaranteed to run, for example when the program aborts.
- must be called only once during runtime cleanup.