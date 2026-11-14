# std::os::xous::ffi::definitions

## enum Syscall

```rust
pub enum Syscall
```

Indicates a particular syscall number as used by the Xous kernel.

## enum SyscallResult

```rust
pub enum SyscallResult
```

Copies of these invocation types here for when we're running
in environments without libxous.

## enum Error

```rust
pub enum Error
```

A list of all known errors that may be returned by the Xous kernel.

## struct Connection

```rust
pub struct Connection(u32)
```

A representation of a connection to a Xous service.