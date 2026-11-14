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