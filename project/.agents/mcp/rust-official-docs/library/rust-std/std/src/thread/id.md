# std::thread::id

## struct ThreadId

```rust
pub struct ThreadId(NonZero<u64>)
```

A unique identifier for a running thread.

A `ThreadId` is an opaque object that uniquely identifies each thread
created during the lifetime of a process. `ThreadId`s are guaranteed not to
be reused, even when a thread terminates. `ThreadId`s are under the control
of Rust's standard library and there may not be any relationship between
`ThreadId` and the underlying platform's notion of a thread identifier --
the two concepts cannot, therefore, be used interchangeably. A `ThreadId`
can be retrieved from the [`id`] method on a [`Thread`].

# Examples

```
use std::thread;

let other_thread = thread::spawn(|| {
    thread::current().id()
});

let other_thread_id = other_thread.join().unwrap();
assert!(thread::current().id() != other_thread_id);
```

[`Thread`]: super::Thread
[`id`]: super::Thread::id