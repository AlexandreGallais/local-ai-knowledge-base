# std::thread::current

## fn current

```rust
pub fn current() -> Thread
```

Gets a handle to the thread that invokes it.

# Examples

Getting a handle to the current thread with `thread::current()`:

```
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