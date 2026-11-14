# std::sys::thread::solid

Thread implementation backed by μITRON tasks. Assumes `acre_tsk` and
`exd_tsk` are available.

## Thread::new

```rust
pub unsafe fn new(stack: usize, init: Box<ThreadInit>) -> io::Result<Thread>
```

# Safety

See `thread::Builder::spawn_unchecked` for safety requirements.