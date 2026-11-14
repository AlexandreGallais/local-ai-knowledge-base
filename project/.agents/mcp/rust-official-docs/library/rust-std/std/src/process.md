---
title: "std::process (part 1 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/process.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::process

A module for working with processes.

This module is mostly concerned with spawning and interacting with child
processes, but it also provides `abort` and `exit` for terminating the
current process.

#### Spawning a process

The `Command` struct is used to configure and spawn processes:

```rust
use std::process::Command;

let output = Command::new("echo")
    .arg("Hello world")
    .output()
    .expect("echo command should execute successfully");

assert_eq!(b"Hello world\n", output.stdout.as_slice());
```

Several methods on `Command`, such as `spawn` or `output`, can be used
to spawn a process. In particular, `output` spawns the child process and
waits until the process terminates, while `spawn` will return a `Child`
that represents the spawned child process.

#### Handling I/O

The `stdout`, `stdin`, and `stderr` of a child process can be
configured by passing an `Stdio` to the corresponding method on
`Command`. Once spawned, they can be accessed from the `Child`. For
example, piping output from one command into another command can be done
like so:

```rust
use std::process::{Command, Stdio};

// stdout must be configured with `Stdio::piped` in order to use
// `echo_child.stdout`
let echo_child = Command::new("echo")
    .arg("Oh no, a tpyo!")
    .stdout(Stdio::piped())
    .spawn()
    .expect("echo command should start");

// Note that `echo_child` is moved here, but we won't be needing
// `echo_child` anymore
let echo_out = echo_child.stdout.expect("child stdout should open");

let mut sed_child = Command::new("sed")
    .arg("s/tpyo/typo/")
    .stdin(Stdio::from(echo_out))
    .stdout(Stdio::piped())
    .spawn()
    .expect("sed command should start");

let output = sed_child.wait_with_output().expect("wait_with_output on sed should succeed");
assert_eq!(b"Oh no, a typo!\n", output.stdout.as_slice());
```

Note that `ChildStderr` and `ChildStdout` implement `Read` and
`ChildStdin` implements `Write`:

```rust
use std::process::{Command, Stdio};
use std::io::Write;

let mut child = Command::new("/bin/cat")
    .stdin(Stdio::piped())
    .stdout(Stdio::piped())
    .spawn()
    .expect("child should start");

// If the child process fills its stdout buffer, it may end up
// waiting until the parent reads the stdout, and not be able to
// read stdin in the meantime, causing a deadlock.
// Writing from another thread ensures that stdout is being read
// at the same time, avoiding the problem.
let mut stdin = child.stdin.take().expect("stdin should be able to be retrieved");
std::thread::spawn(move || {
    stdin.write_all(b"test").expect("writing to stdin should succeed");
});

let output = child
    .wait_with_output()
    .expect("wait_with_output on child should succeed");

assert_eq!(b"test", output.stdout.as_slice());
```

#### Windows argument splitting

On Unix systems arguments are passed to a new process as an array of strings,
but on Windows arguments are passed as a single commandline string and it is
up to the child process to parse it into an array. Therefore the parent and
child processes must agree on how the commandline string is encoded.

Most programs use the standard C run-time `argv`, which in practice results
in consistent argument handling. However, some programs have their own way of
parsing the commandline string. In these cases using `arg` or `args` may
result in the child process seeing a different array of arguments than the
parent process intended.

Two ways of mitigating this are:

* Validate untrusted input so that only a safe subset is allowed.
* Use `raw_arg` to build a custom commandline. This bypasses the escaping
  rules used by `arg` so should be used with due caution.

`cmd.exe` and `.bat` files use non-standard argument parsing and are especially
vulnerable to malicious input as they may be used to run arbitrary shell
commands. Untrusted arguments should be restricted as much as possible.
For examples on handling this see `raw_arg`.

#### Batch file special handling

On Windows, `Command` uses the Windows API function `CreateProcessW` to
spawn new processes. An undocumented feature of this function is that
when given a `.bat` file as the application to run, it will automatically
convert that into running `cmd.exe /c` with the batch file as the next argument.

For historical reasons Rust currently preserves this behavior when using
`Command::new`, and escapes the arguments according to `cmd.exe` rules.
Due to the complexity of `cmd.exe` argument handling, it might not be
possible to safely escape some special characters, and using them will result
in an error being returned at process spawn. The set of unescapeable
special characters might change between releases.

Also note that running batch scripts in this way may be removed in the
future and so should not be relied upon.

## struct Child

```rust
pub struct Child
```

Representation of a running or exited child process.

This structure is used to represent and manage child processes. A child
process is created via the `Command` struct, which configures the
spawning process and can itself be constructed using a builder-style
interface.

There is no implementation of `Drop` for child processes,
so if you do not ensure the `Child` has exited then it will continue to
run, even after the `Child` handle to the child process has gone out of
scope.

Calling `wait` (or other functions that wrap around it) will make
the parent process wait until the child has actually exited before
continuing.

# Warning

On some systems, calling `wait` or similar is necessary for the OS to
release resources. A process that terminated but has not been waited on is
still around as a "zombie". Leaving too many zombies around may exhaust
global resources (for example process IDs).

The standard library does *not* automatically wait on child processes (not
even if the `Child` is dropped), it is up to the application developer to do
so. As a consequence, dropping `Child` handles without waiting on them first
is not recommended in long-running applications.

# Examples

```rust
use std::process::Command;

let mut child = Command::new("/bin/cat")
    .arg("file.txt")
    .spawn()
    .expect("child should spawn");

let ecode = child.wait().expect("child should be running");

assert!(ecode.success());
```

## struct ChildStdin

```rust
pub struct ChildStdin
```

A handle to a child process's standard input (stdin).

This struct is used in the `stdin` field on `Child`.

When an instance of `ChildStdin` is [dropped], the `ChildStdin`'s underlying
file handle will be closed. If the child process was blocked on input prior
to being dropped, it will become unblocked after dropping.

## struct ChildStdout

```rust
pub struct ChildStdout
```

A handle to a child process's standard output (stdout).

This struct is used in the `stdout` field on `Child`.

When an instance of `ChildStdout` is [dropped], the `ChildStdout`'s
underlying file handle will be closed.

## struct ChildStderr

```rust
pub struct ChildStderr
```

A handle to a child process's stderr.

This struct is used in the `stderr` field on `Child`.

When an instance of `ChildStderr` is [dropped], the `ChildStderr`'s
underlying file handle will be closed.

## struct Command

```rust
pub struct Command
```

A process builder, providing fine-grained control
over how a new process should be spawned.

A default configuration can be
generated using `Command::new(program)`, where `program` gives a path to the
program to be executed. Additional builder methods allow the configuration
to be changed (for example, by adding arguments) prior to spawning:

```rust
use std::process::Command;

let output = if cfg!(target_os = "windows") {
    Command::new("cmd")
        .args(["/C", "echo hello"])
        .output()
        .expect("process should execute successfully")
} else {
    Command::new("sh")
        .arg("-c")
        .arg("echo hello")
        .output()
        .expect("process should execute successfully")
};

let hello = output.stdout;
```

`Command` can be reused to spawn multiple processes. The builder methods
change the command without needing to immediately spawn the process.

```rust
use std::process::Command;

let mut echo_hello = Command::new("sh");
echo_hello.arg("-c").arg("echo hello");
let hello_1 = echo_hello.output().expect("process should execute successfully");
let hello_2 = echo_hello.output().expect("process should execute successfully");
```

Similarly, you can call builder methods after spawning a process and then
spawn a new process with the modified settings.

```rust
use std::process::Command;

let mut list_dir = Command::new("ls");

// Execute `ls` in the current directory of the program.
list_dir.status().expect("process should execute successfully");

println!();

// Change `ls` to execute in the root directory.
list_dir.current_dir("/");

// And then execute `ls` again but in the root directory.
list_dir.status().expect("process should execute successfully");
```

## Command::new

```rust
pub fn new<S: AsRef<OsStr>>(program: S) -> Command
```

Constructs a new `Command` for launching the program at
path `program`, with the following default configuration:

* No arguments to the program
* Inherit the current process's environment
* Inherit the current process's working directory
* Inherit stdin/stdout/stderr for `spawn` or `status`, but create pipes for `output`

Builder methods are provided to change these defaults and
otherwise configure the process.

If `program` is not an absolute path, the `PATH` environment variable
will be searched in an OS-defined way.

# Platform-specific behavior

The details below describe the current behavior, but these details
may change in future versions of Rust.

On Unix, the `PATH` searched comes from the child's environment:

- If the environment is unmodified, the child inherits the parent's
  `PATH` and that is what is searched.
- If `PATH` is explicitly set via `env`, that new value is searched.
- If `env_clear` or `env_remove` removes `PATH` without a
  replacement, `execvp` falls back to an OS-defined default (typically
  `/bin:/usr/bin`), **not** the parent's `PATH`. This may fail to find
  programs that rely on the parent's `PATH`.

To avoid surprises, use an absolute path or explicitly set `PATH` on
the `Command` when modifying the child's environment.

On Windows, Rust resolves the executable path before spawning, rather
than passing the name to `CreateProcessW` for resolution. When
`program` is not an absolute path, the following locations are searched
in order:

1. The child's `PATH`, if explicitly set via `env`.
2. The directory of the current executable.
3. The system directory (`GetSystemDirectoryW`).
4. The Windows directory (`GetWindowsDirectoryW`).
5. The parent process's `PATH`.

Note: when `PATH` is cleared via `env_clear` or `env_remove` on
Windows, step 1 is skipped but the parent process's `PATH` is still
searched at step 5, unlike on Unix.

For executable files, the `.exe` extension may be omitted. Files with
other extensions must include the extension, otherwise they will not be
found. Note that this behavior has some known limitations
(see issue #37519).

# Examples

```rust
use std::process::Command;

Command::new("sh")
    .spawn()
    .expect("sh command should start");
```

# Caveats

`Command::new` is only intended to accept the path of the program. If you pass a program
path along with arguments like `Command::new("ls -l").spawn()`, it will try to search for
`ls -l` literally. The arguments need to be passed separately, such as via `arg` or
`args`.

```rust
use std::process::Command;

Command::new("ls")
    .arg("-l") // arg passed separately
    .spawn()
    .expect("ls command should start");
```

## Command::arg

```rust
pub fn arg<S: AsRef<OsStr>>(&mut self, arg: S) -> &mut Command
```

Adds an argument to pass to the program.

Only one argument can be passed per use. So instead of:

```rust
.arg("-C /path/to/repo")
```

usage would be:

```rust
.arg("-C")
.arg("/path/to/repo")
```

To pass <example-value> arguments see `args`.

Note that the argument is not passed through a shell, but given
literally to the program. This means that shell syntax like quotes,
escaped characters, word splitting, glob patterns, variable substitution,
etc. have no effect.

On Windows, use caution with untrusted inputs. Most applications use the
standard convention for decoding arguments passed to them. These are safe to
use with `arg`. However, some applications such as `cmd.exe` and `.bat` files
use a non-standard way of decoding arguments. They are therefore vulnerable
to malicious input.

In the case of `cmd.exe` this is especially important because a malicious
argument can potentially run arbitrary shell commands.

See Windows argument splitting for more details
or `raw_arg` for manually implementing non-standard argument encoding.

# Examples

```rust
use std::process::Command;

Command::new("ls")
    .arg("-l")
    .arg("-a")
    .spawn()
    .expect("ls command should start");
```

## Command::args

```rust
pub fn args<I, S>(&mut self, args: I) -> &mut Command where I: IntoIterator<Item = S>, S: AsRef<OsStr>,
```

Adds multiple arguments to pass to the program.

To pass a single argument see `arg`.

Note that the arguments are not passed through a shell, but given
literally to the program. This means that shell syntax like quotes,
escaped characters, word splitting, glob patterns, variable substitution, etc.
have no effect.

On Windows, use caution with untrusted inputs. Most applications use the
standard convention for decoding arguments passed to them. These are safe to
use with `arg`. However, some applications such as `cmd.exe` and `.bat` files
use a non-standard way of decoding arguments. They are therefore vulnerable
to malicious input.

In the case of `cmd.exe` this is especially important because a malicious
argument can potentially run arbitrary shell commands.

See Windows argument splitting for more details
or `raw_arg` for manually implementing non-standard argument encoding.

# Examples

```rust
use std::process::Command;

Command::new("ls")
    .args(["-l", "-a"])
    .spawn()
    .expect("ls command should start");
```
