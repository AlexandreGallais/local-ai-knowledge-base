---
title: "std::thread::builder"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/thread/builder.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::thread::builder

## struct Builder

```rust
pub struct Builder
```

Thread factory, which can be used in order to configure the properties of
a new thread.

Methods can be chained on it in order to configure it.

The two configurations available are:

- `name`: specifies an associated name for the thread
- `stack_size`: specifies the desired stack size for the thread

The `spawn` method will take ownership of the builder and create an
`io::Result` to the thread handle with the given configuration.

The `thread::spawn` free function uses a `Builder` with default
configuration and `unwrap`s its return value.

You may want to use `spawn` instead of `thread::spawn`, when you want
to recover from a failure to launch a thread, indeed the free function will
panic where the `Builder` method will return a `io::Result`.

# Examples

```rust
use std::thread;

let builder = thread::Builder::new();

let handler = builder.spawn(|| {
    // thread code
}).unwrap();

handler.join().unwrap();
```

## Builder::new

```rust
pub fn new() -> Builder
```

Generates the base configuration for spawning a thread, from which
configuration methods can be chained.

# Examples

```rust
use std::thread;

let builder = thread::Builder::new()
                              .name("foo".into())
                              .stack_size(32 * 1024);

let handler = builder.spawn(|| {
    // thread code
}).unwrap();

handler.join().unwrap();
```

## Builder::name

```rust
pub fn name(mut self, name: String) -> Builder
```

Names the thread-to-be. Currently the name is used for identification
only in panic messages.

The name must not contain null bytes (`\0`).

For more information about named threads, see
this module-level documentation.

# Examples

```rust
use std::thread;

let builder = thread::Builder::new()
    .name("foo".into());

let handler = builder.spawn(|| {
    assert_eq!(thread::current().name(), Some("foo"))
}).unwrap();

handler.join().unwrap();
```

## Builder::stack_size

```rust
pub fn stack_size(mut self, size: usize) -> Builder
```

Sets the size of the stack (in bytes) for the new thread.

The actual stack size may be greater than this value if
the platform specifies a minimal stack size.

For more information about the stack size for threads, see
this module-level documentation.

# Examples

```rust
use std::thread;

let builder = thread::Builder::new().stack_size(32 * 1024);
```

## Builder::spawn

```rust
pub fn spawn<F, T>(self, f: F) -> io::Result<JoinHandle<T>> where F: FnOnce() -> T, F: Send + 'static, T: Send + 'static,
```

Spawns a new thread by taking ownership of the `Builder`, and returns an
`io::Result` to its `JoinHandle`.

The spawned thread may outlive the caller (unless the caller thread
is the main thread; the whole process is terminated when the main
thread finishes). The join handle can be used to block on
termination of the spawned thread, including recovering its panics.

For a more complete documentation see `thread::spawn`.

# Errors

Unlike the `spawn` free function, this method yields an
`io::Result` to capture any failure to create the thread at
the OS level.

# Panics

Panics if a thread name was set and it contained null bytes.

# Examples

```rust
use std::thread;

let builder = thread::Builder::new();

let handler = builder.spawn(|| {
    // thread code
}).unwrap();

handler.join().unwrap();
```

## Builder::spawn_unchecked

```rust
pub unsafe fn spawn_unchecked<F, T>(self, f: F) -> io::Result<JoinHandle<T>> where F: FnOnce() -> T, F: Send, T: Send,
```

Spawns a new thread without any lifetime restrictions by taking ownership
of the `Builder`, and returns an `io::Result` to its `JoinHandle`.

The spawned thread may outlive the caller (unless the caller thread
is the main thread; the whole process is terminated when the main
thread finishes). The join handle can be used to block on
termination of the spawned thread, including recovering its panics.

This method is identical to `thread::Builder::spawn``Builder::spawn`,
except for the relaxed lifetime bounds, which render it unsafe.
For a more complete documentation see `thread::spawn`.

# Errors

Unlike the `spawn` free function, this method yields an
`io::Result` to capture any failure to create the thread at
the OS level.

# Panics

Panics if a thread name was set and it contained null bytes.

# Safety

The caller has to ensure that the spawned thread does not outlive any
references in the supplied thread closure and its return type.
This can be guaranteed in two ways:

- ensure that `join``JoinHandle::join` is called before any referenced
data is dropped
- use only types with `'static` lifetime bounds, i.e., those with no or only
`'static` references (both `thread::Builder::spawn``Builder::spawn`
and `thread::spawn` enforce this property statically)

# Examples

```rust
use std::thread;

let builder = thread::Builder::new();

let x = 1;
let thread_x = &x;

let handler = unsafe {
    builder.spawn_unchecked(move || {
        println!("x = {}", *thread_x);
    }).unwrap()
};

// caller has to ensure `join()` is called, otherwise
// it is possible to access freed memory if `x` gets
// dropped before the thread closure is executed!
handler.join().unwrap();
```
