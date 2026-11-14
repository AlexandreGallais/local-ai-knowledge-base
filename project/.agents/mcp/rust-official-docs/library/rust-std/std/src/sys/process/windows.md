# std::sys::process::windows

## struct Process

```rust
pub struct Process
```

A value representing a child process.

The lifetime of this value is linked to the lifetime of the actual
process - the Process destructor calls self.finish() which waits
for the process to terminate.