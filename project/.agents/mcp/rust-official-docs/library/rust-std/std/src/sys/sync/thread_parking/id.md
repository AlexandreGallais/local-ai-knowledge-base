---
title: "std::sys::sync::thread_parking::id"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/thread_parking/id.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::thread_parking::id

Thread parking using thread ids.

Some platforms (notably NetBSD) have thread parking primitives whose semantics
match those offered by `thread::park`, with the difference that the thread to
be unparked is referenced by a platform-specific thread id. Since the thread
parker is constructed before that id is known, an atomic state variable is used
to manage the park state and propagate the thread id. This also avoids platform
calls in the case where `unpark` is called before `park`.

## Parker::new_in_place

```rust
pub unsafe fn new_in_place(parker: *mut Parker)
```

Creates a new thread parker. UNIX requires this to happen in-place.
