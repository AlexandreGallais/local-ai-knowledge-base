---
title: "std::sys::exit"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/exit.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::exit

## fn unique_thread_exit

```rust
pub fn unique_thread_exit()
```

Mitigation for <https://github.com/rust-lang/rust/issues/126600>

On glibc, `libc::exit` has been observed to not always be thread-safe.
It is currently unclear whether that is a glibc bug or allowed by the standard.
To mitigate this problem, we ensure that only one
Rust thread calls `libc::exit` (or returns from `main`) by calling this function before
calling `libc::exit` (or returning from `main`).

Technically, this is not enough to ensure soundness, since other code directly calling
`libc::exit` will still race with this.

*This function does not itself call `libc::exit`.* This is so it can also be used
to guard returning from `main`.

This function will return only the first time it is called in a process.

* If it is called again on the same thread as the first call, it will abort.
* If it is called again on a different thread, it will wait in a loop
  (waiting for the process to exit).

## fn unique_thread_exit

```rust
pub fn unique_thread_exit()
```

Mitigation for <https://github.com/rust-lang/rust/issues/126600>

Mitigation is ***NOT*** implemented on this platform, either because this platform
is not affected, or because mitigation is not yet implemented for this platform.
