---
title: "std::sys::time::unix"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/time/unix.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::time::unix

## Instant::into_mach_absolute_time_ceil

```rust
pub fn into_mach_absolute_time_ceil(self) -> Option<u128>
```

Returns `self` converted into units of `mach_absolute_time`, or `None`
if `self` is before the system boot time. If the conversion cannot be
performed precisely, this ceils the result up to the nearest
representable value.
