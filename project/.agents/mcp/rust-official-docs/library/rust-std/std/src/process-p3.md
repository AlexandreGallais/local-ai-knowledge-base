---
title: "std::process (part 3 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/process.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::process (part 3 of 4)

## Stdio::inherit

```rust
pub fn inherit() -> Stdio
```

The child inherits from the corresponding parent descriptor.

# Examples

With stdout:

```rust
use std::process::{Command, Stdio};

let output = Command::new("echo")
    .arg("Hello, world!")
    .stdout(Stdio::inherit())
    .output()
    .expect("process should execute successfully");

assert_eq!(String::from_utf8_lossy(&output.stdout), "");
// "Hello, world!" echoed to console
```

With stdin:

```rust
use std::process::{Command, Stdio};
use std::io::{self, Write};

let output = Command::new("rev")
    .stdin(Stdio::inherit())
    .stdout(Stdio::piped())
    .output()?;

print!("You piped in the reverse of: ");
io::stdout().write_all(&output.stdout)?;
```

## Stdio::null

```rust
pub fn null() -> Stdio
```

This stream will be ignored. This is the equivalent of attaching the
stream to `/dev/null`.

# Examples

With stdout:

```rust
use std::process::{Command, Stdio};

let output = Command::new("echo")
    .arg("Hello, world!")
    .stdout(Stdio::null())
    .output()
    .expect("process should execute successfully");

assert_eq!(String::from_utf8_lossy(&output.stdout), "");
// Nothing echoed to console
```

With stdin:

```rust
use std::process::{Command, Stdio};

let output = Command::new("rev")
    .stdin(Stdio::null())
    .stdout(Stdio::piped())
    .output()
    .expect("process should execute successfully");

assert_eq!(String::from_utf8_lossy(&output.stdout), "");
// Ignores any piped-in input
```

## ExitStatus::success

```rust
pub fn success(&self) -> bool
```

Was termination successful? Signal termination is not considered a
success, and success is defined as a zero exit status.

# Examples

```rust
use std::process::Command;

let status = Command::new("mkdir")
    .arg("projects")
    .status()
    .expect("mkdir command should execute successfully");

if status.success() {
    println!("'projects/' directory created");
} else {
    println!("failed to create 'projects/' directory: {status}");
}
```

## ExitStatus::code

```rust
pub fn code(&self) -> Option<i32>
```

Returns the exit code of the process, if any.

In Unix terms the return value is the **exit status**: the value passed to `exit`, if the
process finished by calling `exit`.  Note that on Unix the exit status is truncated to 8
bits, and that values that didn't come from a program's call to `exit` may be invented by the
runtime system (often, for example, 255, 254, 127 or 126).

On Unix, this will return `None` if the process was terminated by a signal.
`ExitStatusExt` is an
extension trait for extracting any such signal, and other details, from the `ExitStatus`.

# Examples

```rust
use std::process::Command;

let status = Command::new("mkdir")
    .arg("projects")
    .status()
    .expect("mkdir command should execute successfully");

match status.code() {
    Some(code) => println!("Exited with status code: {code}"),
    None => println!("Process terminated by signal")
}
```

## ExitStatusError::code

```rust
pub fn code(&self) -> Option<i32>
```

Reports the exit code, if applicable, from an `ExitStatusError`.

In Unix terms the return value is the **exit status**: the value passed to `exit`, if the
process finished by calling `exit`.  Note that on Unix the exit status is truncated to 8
bits, and that values that didn't come from a program's call to `exit` may be invented by the
runtime system (often, for example, 255, 254, 127 or 126).

On Unix, this will return `None` if the process was terminated by a signal.  If you want to
handle such situations specially, consider using methods from
`ExitStatusExt`.

If the process finished by calling `exit` with a nonzero value, this will return
that exit status.

If the error was something else, it will return `None`.

If the process exited successfully (ie, by calling `exit(0)`), there is no
`ExitStatusError`.  So the return value from `ExitStatusError::code()` is always nonzero.

# Examples

```rust
#![feature(exit_status_error)]
use std::process::Command;

let bad = Command::new("false").status().unwrap().exit_ok().unwrap_err();
assert_eq!(bad.code(), Some(1));
```

## ExitStatusError::code_nonzero

```rust
pub fn code_nonzero(&self) -> Option<NonZero<i32>>
```

Reports the exit code, if applicable, from an `ExitStatusError`, as a `NonZero`.

This is exactly like `code()`, except that it returns a <code>[NonZero]<[i32]></code>.

Plain `code`, returning a plain integer, is provided because it is often more convenient.
The returned value from `code()` is indeed also nonzero; use `code_nonzero()` when you want
a type-level guarantee of nonzeroness.

# Examples

```rust
#![feature(exit_status_error)]

use std::num::NonZero;
use std::process::Command;

let bad = Command::new("false").status().unwrap().exit_ok().unwrap_err();
assert_eq!(bad.code_nonzero().unwrap(), NonZero::new(1).unwrap());
```

## ExitStatusError::into_status

```rust
pub fn into_status(&self) -> ExitStatus
```

Converts an `ExitStatusError` (back) to an `ExitStatus`.

## ::ExitCode

```rust
pub struct ExitCode(imp::ExitCode)
```

This type represents the status code the current process can return
to its parent under normal termination.

`ExitCode` is intended to be consumed only by the standard library (via
`Termination::report()`). For forwards compatibility with potentially
unusual targets, this type currently does not provide `Eq`, `Hash`, or
access to the raw value. This type does provide `PartialEq` for
comparison, but note that there may potentially be multiple failure
codes, some of which will _not_ compare equal to `ExitCode::FAILURE`.
The standard library provides the canonical `SUCCESS` and `FAILURE`
exit codes as well as `From<u8> for ExitCode` for constructing other
arbitrary exit codes.

# Portability

Numeric values used in this type don't have portable meanings, and
different platforms may mask different amounts of them.

For the platform's canonical successful and unsuccessful codes, see
the `SUCCESS` and `FAILURE` associated items.

# Differences from `ExitStatus`

`ExitCode` is intended for terminating the currently running process, via
the `Termination` trait, in contrast to `ExitStatus`, which represents the
termination of a child process. These APIs are separate due to platform
compatibility differences and their expected usage; it is not generally
possible to exactly reproduce an `ExitStatus` from a child for the current
process after the fact.

# Examples

`ExitCode` can be returned from the `main` function of a crate, as it implements
`Termination`:

```rust
use std::process::ExitCode;

fn main() -> ExitCode {
    if !check_foo() {
        return ExitCode::from(42);
    }

    ExitCode::SUCCESS
}
```

## ExitCode::SUCCESS

```rust
pub const SUCCESS: ExitCode = ExitCode(imp::ExitCode::SUCCESS)
```

The canonical `ExitCode` for successful termination on this platform.

Note that a `()`-returning `main` implicitly results in a successful
termination, so there's no need to return this from `main` unless
you're also returning other possible codes.

## ExitCode::FAILURE

```rust
pub const FAILURE: ExitCode = ExitCode(imp::ExitCode::FAILURE)
```

The canonical `ExitCode` for unsuccessful termination on this platform.

If you're only returning this and `SUCCESS` from `main`, consider
instead returning `Err(_)` and `Ok(())` respectively, which will
return the same codes (but will also `eprintln!` the error).

## Child::kill

```rust
pub fn kill(&mut self) -> io::Result<()>
```

Forces the child process to exit. If the child has already exited, `Ok(())`
is returned.

The mapping to `ErrorKind`s is not part of the compatibility contract of the function.

This is equivalent to sending a SIGKILL on Unix platforms.

# Examples

```rust
use std::process::Command;

let mut command = Command::new("yes");
if let Ok(mut child) = command.spawn() {
    child.kill().expect("process should be killed");
} else {
    println!("yes command didn't start");
}
```

## Child::id

```rust
pub fn id(&self) -> u32
```

Returns the OS-assigned process identifier associated with this child.

# Examples

```rust
use std::process::Command;

let mut command = Command::new("ls");
if let Ok(child) = command.spawn() {
    println!("Child's ID is {}", child.id());
} else {
    println!("ls command didn't start");
}
```

## Child::wait

```rust
pub fn wait(&mut self) -> io::Result<ExitStatus>
```

Waits for the child to exit completely, returning the status that it
exited with. This function will continue to have the same return value
after it has been called at least once.

The stdin handle to the child process, if any, will be closed
before waiting. This helps avoid deadlock: it ensures that the
child does not block waiting for input from the parent, while
the parent waits for the child to exit.

# Examples

```rust
use std::process::Command;

let mut command = Command::new("ls");
if let Ok(mut child) = command.spawn() {
    child.wait().expect("child should be running");
    println!("Child has finished its execution!");
} else {
    println!("ls command didn't start");
}
```

## Child::try_wait

```rust
pub fn try_wait(&mut self) -> io::Result<Option<ExitStatus>>
```

Attempts to collect the exit status of the child if it has already
exited.

This function will not block the calling thread and will only
check to see if the child process has exited or not. If the child has
exited then on Unix the process ID is reaped. This function is
guaranteed to repeatedly return a successful exit status so long as the
child has already exited.

If the child has exited, then `Ok(Some(status))` is returned. If the
exit status is not available at this time then `Ok(None)` is returned.
If an error occurs, then that error is returned.

Note that unlike `wait`, this function will not attempt to drop stdin.

# Examples

```rust
use std::process::Command;

let mut child = Command::new("ls").spawn()?;

match child.try_wait() {
    Ok(Some(status)) => println!("exited with: {status}"),
    Ok(None) => {
        println!("status not ready yet, let's really wait");
        let res = child.wait();
        println!("result: {res:?}");
    }
    Err(e) => println!("error attempting to wait: {e}"),
}
```

## Child::wait_with_output

```rust
pub fn wait_with_output(mut self) -> io::Result<Output>
```

Simultaneously waits for the child to exit and collect all remaining
output on the stdout/stderr handles, returning an `Output`
instance.

The stdin handle to the child process, if any, will be closed
before waiting. This helps avoid deadlock: it ensures that the
child does not block waiting for input from the parent, while
the parent waits for the child to exit.

By default, stdin, stdout and stderr are inherited from the parent.
In order to capture the output into this `Result<Output>` it is
necessary to create new pipes between parent and child. Use
`stdout(Stdio::piped())` or `stderr(Stdio::piped())`, respectively.

# Examples

```rust
use std::process::{Command, Stdio};

let child = Command::new("/bin/cat")
    .arg("file.txt")
    .stdout(Stdio::piped())
    .spawn()
    .expect("child should spawn");

let output = child
    .wait_with_output()
    .expect("wait_with_output on child should succeed");

assert!(output.status.success());
```

## fn exit

```rust
pub fn exit(code: i32) -> !
```

Terminates the current process with the specified exit code.

This function will never return and will immediately terminate the current
process. The exit code is passed through to the underlying OS and will be
available for consumption by another process.

Note that because this function never returns, and that it terminates the
process, no destructors on the current stack or any other thread's stack
will be run. If a clean shutdown is needed it is recommended to only call
this function at a known point where there are no more destructors left
to run; or, preferably, simply return a type implementing `Termination`
(such as `ExitCode` or `Result`) from the `main` function and avoid this
function altogether:

```rust
fn main() -> Result<(), MyError> {
    // ...
    Ok(())
}
```

In its current implementation, this function will execute exit handlers registered with `atexit`
as well as other platform-specific exit handlers (e.g. `fini` sections of ELF shared objects).
This means that Rust requires that all exit handlers are safe to execute at any time. In
particular, if an exit handler cleans up some state that might be concurrently accessed by other
threads, it is required that the exit handler performs suitable synchronization with those
threads. (The alternative to this requirement would be to not run exit handlers at all, which is
considered undesirable. Note that returning from `main` also calls `exit`, so making `exit` an
unsafe operation is not an option.)

## Platform-specific behavior

**Unix**: On Unix-like platforms, it is unlikely that all 32 bits of `exit`
will be visible to a parent process inspecting the exit code. On most
Unix-like platforms, only the eight least-significant bits are considered.

For example, the exit code for this example will be `0` on Linux, but `256`
on Windows:

```rust
use std::process;

process::exit(0x0100);
```

### Safe interop with C code

On Unix, this function is currently implemented using the `exit` C function `exit`[C-exit]. As
of C23, the C standard does not permit multiple threads to call `exit` concurrently. Rust
mitigates this with a lock, but if C code calls `exit`, that can still cause undefined behavior.
Note that returning from `main` is equivalent to calling `exit`.

Therefore, it is undefined behavior to have two concurrent threads perform the following
without synchronization:
- One thread calls Rust's `exit` function or returns from Rust's `main` function
- Another thread calls the C function `exit` or `quick_exit`, or returns from C's `main` function

Note that if a binary contains multiple copies of the Rust runtime (e.g., when combining
multiple `cdylib` or `staticlib`), they each have their own separate lock, so from the
perspective of code running in one of the Rust runtimes, the "outside" Rust code is basically C
code, and concurrent `exit` again causes undefined behavior.

Individual C implementations might provide more guarantees than the standard and permit concurrent
calls to `exit`; consult the documentation of your C implementation for details.

For some of the on-going discussion to make `exit` thread-safe in C, see:
- Rust issue #126600
- Austin Group Bugzilla (for POSIX)
- GNU C library Bugzilla
