# std::sys::process::unix::unsupported::wait_status

Emulated wait status for non-Unix `#[cfg(unix)]` platforms

Separate module to facilitate testing against a real Unix implementation.

## struct ExitStatus

```rust
pub struct ExitStatus
```

Emulated wait status for use by `unsupported.rs`

Uses the "traditional unix" encoding.  For use on platfors which are `#[cfg(unix)]`
but do not actually support subprocesses at all.

These platforms aren't Unix, but are simply pretending to be for porting convenience.
So, we provide a faithful pretence here.