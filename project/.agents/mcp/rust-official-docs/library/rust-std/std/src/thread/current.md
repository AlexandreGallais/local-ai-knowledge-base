---
title: "std::thread::current"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/thread/current.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::thread::current

## fn current

```rust
pub fn current() -> Thread
```

Gets a handle to the thread that invokes it.

# Examples

Getting a handle to the current thread with `thread::current()`:

```rust
use std::thread;

let handler = thread::Builder::new()
    .name("named thread".into())
    .spawn(|| {
        let handle = thread::current();
        assert_eq!(handle.name(), Some("named thread"));
    })
    .unwrap();

handler.join().unwrap();
```
