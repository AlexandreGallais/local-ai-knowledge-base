---
title: "std::process (part 2 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/process.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::process (part 2 of 4)

## Command::env

```rust
pub fn env<K, V>(&mut self, key: K, val: V) -> &mut Command where K: AsRef<OsStr>, V: AsRef<OsStr>,
```

Inserts or updates an explicit environment variable mapping.

This method allows you to add an environment variable mapping to the spawned process or
overwrite a previously set value. You can use `Command::envs` to set multiple environment
variables simultaneously.

Child processes will inherit environment variables from their parent process by default.
Environment variables explicitly set using `Command::env` take precedence over inherited
variables. You can disable environment variable inheritance entirely using
`Command::env_clear` or for a single key using `Command::env_remove`.

Note that environment variable names are case-insensitive (but
case-preserving) on Windows and case-sensitive on all other platforms.

# Examples

```rust
use std::process::Command;

Command::new("ls")
    .env("PATH", "/bin")
    .spawn()
    .expect("ls command should start");
```

## Command::envs

```rust
pub fn envs<I, K, V>(&mut self, vars: I) -> &mut Command where I: IntoIterator<Item = (K, V)>, K: AsRef<OsStr>, V: AsRef<OsStr>,
```

Inserts or updates multiple explicit environment variable mappings.

This method allows you to add multiple environment variable mappings to the spawned process
or overwrite previously set values. You can use `Command::env` to set a single environment
variable.

Child processes will inherit environment variables from their parent process by default.
Environment variables explicitly set using `Command::envs` take precedence over inherited
variables. You can disable environment variable inheritance entirely using
`Command::env_clear` or for a single key using `Command::env_remove`.

Note that environment variable names are case-insensitive (but case-preserving) on Windows
and case-sensitive on all other platforms.

# Examples

```rust
use std::process::{Command, Stdio};
use std::env;
use std::collections::HashMap;

let filtered_env : HashMap<String, String> =
    env::vars().filter(|&(ref k, _)|
        k == "TERM" || k == "TZ" || k == "LANG" || k == "PATH"
    ).collect();

Command::new("printenv")
    .stdin(Stdio::null())
    .stdout(Stdio::inherit())
    .env_clear()
    .envs(&filtered_env)
    .spawn()
    .expect("printenv command should start");
```

## Command::env_remove

```rust
pub fn env_remove<K: AsRef<OsStr>>(&mut self, key: K) -> &mut Command
```

Removes an explicitly set environment variable and prevents inheriting it from a parent
process.

This method will remove the explicit value of an environment variable set via
`Command::env` or `Command::envs`. In addition, it will prevent the spawned child
process from inheriting that environment variable from its parent process.

After calling `Command::env_remove`, the value associated with its key from
`Command::get_envs` will be `None`.

To clear all explicitly set environment variables and disable all environment variable
inheritance, you can use `Command::env_clear`.

# Examples

Prevent any inherited `GIT_DIR` variable from changing the target of the `git` command,
while allowing all other variables, like `GIT_AUTHOR_NAME`.

```rust
use std::process::Command;

Command::new("git")
    .arg("commit")
    .env_remove("GIT_DIR")
    .spawn()?;
```

## Command::env_clear

```rust
pub fn env_clear(&mut self) -> &mut Command
```

Clears all explicitly set environment variables and prevents inheriting any parent process
environment variables.

This method will remove all explicitly added environment variables set via `Command::env`
or `Command::envs`. In addition, it will prevent the spawned child process from inheriting
any environment variable from its parent process.

After calling `Command::env_clear`, the iterator from `Command::get_envs` will be
empty.

You can use `Command::env_remove` to clear a single mapping.

# Examples

The behavior of `sort` is affected by `LANG` and `LC_*` environment variables.
Clearing the environment makes `sort`'s behavior independent of the parent processes' language.

```rust
use std::process::Command;

Command::new("sort")
    .arg("file.txt")
    .env_clear()
    .spawn()?;
```

## Command::current_dir

```rust
pub fn current_dir<P: AsRef<Path>>(&mut self, dir: P) -> &mut Command
```

Sets the working directory for the child process.

# Platform-specific behavior

If the program path is relative (e.g., `"./script.sh"`), it's ambiguous
whether it should be interpreted relative to the parent's working
directory or relative to `current_dir`. The behavior in this case is
platform specific and unstable, and it's recommended to use
`canonicalize` to get an absolute program path instead.

# Examples

```rust
use std::process::Command;

Command::new("ls")
    .current_dir("/bin")
    .spawn()
    .expect("ls command should start");
```

## Command::stdin

```rust
pub fn stdin<T: Into<Stdio>>(&mut self, cfg: T) -> &mut Command
```

Configuration for the child process's standard input (stdin) handle.

Defaults to `inherit` when used with `spawn` or `status`, and
defaults to `piped` when used with `output`.

# Examples

```rust
use std::process::{Command, Stdio};

Command::new("ls")
    .stdin(Stdio::null())
    .spawn()
    .expect("ls command should start");
```

## Command::stdout

```rust
pub fn stdout<T: Into<Stdio>>(&mut self, cfg: T) -> &mut Command
```

Configuration for the child process's standard output (stdout) handle.

Defaults to `inherit` when used with `spawn` or `status`, and
defaults to `piped` when used with `output`.

# Examples

```rust
use std::process::{Command, Stdio};

Command::new("ls")
    .stdout(Stdio::null())
    .spawn()
    .expect("ls command should start");
```

## Command::stderr

```rust
pub fn stderr<T: Into<Stdio>>(&mut self, cfg: T) -> &mut Command
```

Configuration for the child process's standard error (stderr) handle.

Defaults to `inherit` when used with `spawn` or `status`, and
defaults to `piped` when used with `output`.

# Examples

```rust
use std::process::{Command, Stdio};

Command::new("ls")
    .stderr(Stdio::null())
    .spawn()
    .expect("ls command should start");
```

## Command::spawn

```rust
pub fn spawn(&mut self) -> io::Result<Child>
```

Executes the command as a child process, returning a handle to it.

By default, stdin, stdout and stderr are inherited from the parent.

# Errors

This method returns an `io::Error` if the child process could not be
spawned. Common reasons include:

* the program could not be found (for example, it does not exist, or,
  when given a bare name, it is not present in the `PATH`);
* the current process does not have permission to execute the program
  (for example, the file is not marked executable, or execution is
  denied by a security policy such as `seccomp`);
* the operating system could not create the new process because of
  resource exhaustion (for example, a limit on the number of processes
  was reached).

An error is only returned for failures that occur while the child is
being spawned. Once the child has started successfully, anything that
happens to it afterwards — including being terminated by a signal — is
reported through its `ExitStatus` rather than as an error from the
spawning method.

# Examples

```rust
use std::process::Command;

Command::new("ls")
    .spawn()
    .expect("ls command should start");
```

## Command::output

```rust
pub fn output(&mut self) -> io::Result<Output>
```

Executes the command as a child process, waiting for it to finish and
collecting all of its output.

By default, stdout and stderr are captured (and used to provide the
resulting output). Stdin is not inherited from the parent and any
attempt by the child process to read from the stdin stream will result
in the stream immediately closing.

# Errors

Like `spawn`, this method returns an `io::Error` if the child
process could not be spawned; see `spawn` for the common reasons. It
may also return an error if reading the child's output or waiting on the
child fails.

Note that this method does **not** return an error if the child runs and
then exits unsuccessfully, or is terminated by a signal. In those cases
it still returns `Ok`, and the outcome is reflected in the
`ExitStatus` stored in the returned `Output`.

# Examples

```rust
use std::process::Command;
use std::io::{self, Write};
let output = Command::new("/bin/cat")
    .arg("file.txt")
    .output()?;

println!("status: {}", output.status);
io::stdout().write_all(&output.stdout)?;
io::stderr().write_all(&output.stderr)?;

assert!(output.status.success());
```

## Command::status

```rust
pub fn status(&mut self) -> io::Result<ExitStatus>
```

Executes a command as a child process, waiting for it to finish and
collecting its status.

By default, stdin, stdout and stderr are inherited from the parent.

# Errors

Like `spawn`, this method returns an `io::Error` if the child
process could not be spawned; see `spawn` for the common reasons. It
may also return an error if waiting on the child fails.

Note that this method does **not** return an error if the child runs and
then exits unsuccessfully, or is terminated by a signal. In those cases
it still returns `Ok`, and the outcome is reflected in the returned
`ExitStatus`.

# Examples

```rust
use std::process::Command;

let status = Command::new("/bin/cat")
    .arg("file.txt")
    .status()
    .expect("process should execute successfully");

println!("process finished with: {status}");

assert!(status.success());
```

## Command::get_program

```rust
pub fn get_program(&self) -> &OsStr
```

Returns the path to the program that was given to `Command::new`.

# Examples

```rust
use std::process::Command;

let cmd = Command::new("echo");
assert_eq!(cmd.get_program(), "echo");
```

## Command::get_args

```rust
pub fn get_args(&self) -> CommandArgs<'_>
```

Returns an iterator of the arguments that will be passed to the program.

This does not include the path to the program as the first argument;
it only includes the arguments specified with `Command::arg` and
`Command::args`.

# Examples

```rust
use std::ffi::OsStr;
use std::process::Command;

let mut cmd = Command::new("echo");
cmd.arg("first").arg("second");
let args: Vec<&OsStr> = cmd.get_args().collect();
assert_eq!(args, &["first", "second"]);
```

## Command::get_envs

```rust
pub fn get_envs(&self) -> CommandEnvs<'_>
```

Returns an iterator of the environment variables explicitly set for the child process.

Environment variables explicitly set using `Command::env`, `Command::envs`, and
`Command::env_remove` can be retrieved with this method.

Note that this output does not include environment variables inherited from the parent
process. To see the full list of environment variables, including those inherited from the
parent process, use `Command::get_resolved_envs`.

Each element is a tuple key/value pair `(&OsStr, Option<&OsStr>)`. A `None` value
indicates its key was explicitly removed via `Command::env_remove`. The associated key for
the `None` value will no longer inherit from its parent process.

An empty iterator can indicate that no explicit mappings were added or that
`Command::env_clear` was called. After calling `Command::env_clear`, the child process
will not inherit any environment variables from its parent process.

# Examples

```rust
use std::ffi::OsStr;
use std::process::Command;

let mut cmd = Command::new("ls");
cmd.env("TERM", "dumb").env_remove("TZ");
let envs: Vec<(&OsStr, Option<&OsStr>)> = cmd.get_envs().collect();
assert_eq!(envs, &[
    (OsStr::new("TERM"), Some(OsStr::new("dumb"))),
    (OsStr::new("TZ"), None)
]);
```

## Command::get_current_dir

```rust
pub fn get_current_dir(&self) -> Option<&Path>
```

Returns the working directory for the child process.

This returns `None` if the working directory will not be changed.

# Examples

```rust
use std::path::Path;
use std::process::Command;

let mut cmd = Command::new("ls");
assert_eq!(cmd.get_current_dir(), None);
cmd.current_dir("/bin");
assert_eq!(cmd.get_current_dir(), Some(Path::new("/bin")));
```

## struct CommandArgs

```rust
pub struct CommandArgs<'a>
```

An iterator over the command arguments.

This struct is created by `Command::get_args`. See its documentation for
more.

## struct CommandEnvs

```rust
pub struct CommandEnvs<'a>
```

An iterator over the command environment variables.

This struct is created by
`Command::get_envs`[crate::process::Command::get_envs]. See its
documentation for more.

## struct Output

```rust
pub struct Output
```

The output of a finished process.

This is returned in a Result by either the `output` method of a
`Command`, or the `wait_with_output` method of a `Child`
process.

## struct Stdio

```rust
pub struct Stdio(imp::Stdio)
```

Describes what to do with a standard I/O stream for a child process when
passed to the `stdin`, `stdout`, and `stderr` methods of `Command`.

## Stdio::piped

```rust
pub fn piped() -> Stdio
```

A new pipe should be arranged to connect the parent and child processes.

# Examples

With stdout:

```rust
use std::process::{Command, Stdio};

let output = Command::new("echo")
    .arg("Hello, world!")
    .stdout(Stdio::piped())
    .output()
    .expect("process should execute successfully");

assert_eq!(String::from_utf8_lossy(&output.stdout), "Hello, world!\n");
// Nothing echoed to console
```

With stdin:

```rust
use std::io::Write;
use std::process::{Command, Stdio};

let mut child = Command::new("rev")
    .stdin(Stdio::piped())
    .stdout(Stdio::piped())
    .spawn()
    .expect("rev command should start");

let mut stdin = child.stdin.take().expect("child stdin should be retrievable");
std::thread::spawn(move || {
    stdin.write_all("Hello, world!".as_bytes()).expect("writing to child stdin should succeed");
});

let output = child.wait_with_output().expect("child stdout should be able to be read");
assert_eq!(String::from_utf8_lossy(&output.stdout), "!dlrow ,olleH");
```

Writing more than a pipe buffer's worth of input to stdin without also reading
stdout and stderr at the same time may cause a deadlock.
This is an issue when running any program that doesn't guarantee that it reads
its entire stdin before writing more than a pipe buffer's worth of output.
The size of a pipe buffer varies on different targets.
