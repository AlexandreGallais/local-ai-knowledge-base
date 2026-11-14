---
title: "std::os::linux::process"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/linux/process.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::linux::process

Linux-specific extensions to primitives in the `std::process` module.

## struct PidFd

```rust
pub struct PidFd
```

#![feature(linux_pidfd)]
use std::os::linux::process::{CommandExt, ChildExt};
use std::process::Command;

let mut child = Command::new("echo")
    .create_pidfd(true)
    .spawn()
    .expect("Failed to spawn child");

let pidfd = child
    .into_pidfd()
    .expect("Failed to retrieve pidfd");

// The file descriptor will be closed when `pidfd` is dropped.
```rust
Refer to the man page of `pidfd_open(2)` for further details.

`Command`: process::Command
`create_pidfd`: CommandExt::create_pidfd
`Child`: process::Child
`pidfd`: fn@ChildExt::pidfd
`into_pidfd`: ChildExt::into_pidfd
`pidfd_open(2)`: https://man7.org/linux/man-pages/man2/pidfd_open.2.html

## PidFd::kill

```rust
pub fn kill(&self) -> Result<()>
```

Forces the child process to exit.

Unlike `Child::kill` it is possible to attempt to kill
reaped children since PidFd does not suffer from pid recycling
races. But doing so will return an Error.

## PidFd::wait

```rust
pub fn wait(&self) -> Result<ExitStatus>
```

Waits for the child to exit completely, returning the status that it exited with.

Unlike `Child::wait` it does not ensure that the stdin handle is closed.

Additionally on kernels prior to 6.15 only the first attempt to
reap a child will return an ExitStatus, further attempts
will return an Error.

## PidFd::try_wait

```rust
pub fn try_wait(&self) -> Result<Option<ExitStatus>>
```

Attempts to collect the exit status of the child if it has already exited.

On kernels prior to 6.15, and unlike `Child::try_wait`, only the first attempt
to reap a child will return an ExitStatus, further attempts will return an Error.
