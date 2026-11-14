# std::process

A module for working with processes.

This module is mostly concerned with spawning and interacting with child
processes, but it also provides [`abort`] and [`exit`] for terminating the
current process.

# Spawning a process

The [`Command`] struct is used to configure and spawn processes:

```no_run
use std::process::Command;

let output = Command::new("echo")
    .arg("Hello world")
    .output()
    .expect("echo command should execute successfully");

assert_eq!(b"Hello world\n", output.stdout.as_slice());
```

Several methods on [`Command`], such as [`spawn`] or [`output`], can be used
to spawn a process. In particular, [`output`] spawns the child process and
waits until the process terminates, while [`spawn`] will return a [`Child`]
that represents the spawned child process.

# Handling I/O

The [`stdout`], [`stdin`], and [`stderr`] of a child process can be
configured by passing an [`Stdio`] to the corresponding method on
[`Command`]. Once spawned, they can be accessed from the [`Child`]. For
example, piping output from one command into another command can be done
like so:

```no_run
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

Note that [`ChildStderr`] and [`ChildStdout`] implement [`Read`] and
[`ChildStdin`] implements [`Write`]:

```no_run
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

# Windows argument splitting

On Unix systems arguments are passed to a new process as an array of strings,
but on Windows arguments are passed as a single commandline string and it is
up to the child process to parse it into an array. Therefore the parent and
child processes must agree on how the commandline string is encoded.

Most programs use the standard C run-time `argv`, which in practice results
in consistent argument handling. However, some programs have their own way of
parsing the commandline string. In these cases using [`arg`] or [`args`] may
result in the child process seeing a different array of arguments than the
parent process intended.

Two ways of mitigating this are:

* Validate untrusted input so that only a safe subset is allowed.
* Use [`raw_arg`] to build a custom commandline. This bypasses the escaping
  rules used by [`arg`] so should be used with due caution.

`cmd.exe` and `.bat` files use non-standard argument parsing and are especially
vulnerable to malicious input as they may be used to run arbitrary shell
commands. Untrusted arguments should be restricted as much as possible.
For examples on handling this see [`raw_arg`].

### Batch file special handling

On Windows, `Command` uses the Windows API function [`CreateProcessW`] to
spawn new processes. An undocumented feature of this function is that
when given a `.bat` file as the application to run, it will automatically
convert that into running `cmd.exe /c` with the batch file as the next argument.

For historical reasons Rust currently preserves this behavior when using
[`Command::new`], and escapes the arguments according to `cmd.exe` rules.
Due to the complexity of `cmd.exe` argument handling, it might not be
possible to safely escape some special characters, and using them will result
in an error being returned at process spawn. The set of unescapeable
special characters might change between releases.

Also note that running batch scripts in this way may be removed in the
future and so should not be relied upon.

[`spawn`]: Command::spawn
[`output`]: Command::output

[`stdout`]: Command::stdout
[`stdin`]: Command::stdin
[`stderr`]: Command::stderr

[`Write`]: io::Write
[`Read`]: io::Read

[`arg`]: Command::arg
[`args`]: Command::args
[`raw_arg`]: crate::os::windows::process::CommandExt::raw_arg

[`CreateProcessW`]: https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessw

## struct Child

```rust
pub struct Child
```

Representation of a running or exited child process.

This structure is used to represent and manage child processes. A child
process is created via the [`Command`] struct, which configures the
spawning process and can itself be constructed using a builder-style
interface.

There is no implementation of [`Drop`] for child processes,
so if you do not ensure the `Child` has exited then it will continue to
run, even after the `Child` handle to the child process has gone out of
scope.

Calling [`wait`] (or other functions that wrap around it) will make
the parent process wait until the child has actually exited before
continuing.

# Warning

On some systems, calling [`wait`] or similar is necessary for the OS to
release resources. A process that terminated but has not been waited on is
still around as a "zombie". Leaving too many zombies around may exhaust
global resources (for example process IDs).

The standard library does *not* automatically wait on child processes (not
even if the `Child` is dropped), it is up to the application developer to do
so. As a consequence, dropping `Child` handles without waiting on them first
is not recommended in long-running applications.

# Examples

```should_panic
use std::process::Command;

let mut child = Command::new("/bin/cat")
    .arg("file.txt")
    .spawn()
    .expect("child should spawn");

let ecode = child.wait().expect("child should be running");

assert!(ecode.success());
```

[`wait`]: Child::wait

## struct ChildStdin

```rust
pub struct ChildStdin
```

A handle to a child process's standard input (stdin).

This struct is used in the [`stdin`] field on [`Child`].

When an instance of `ChildStdin` is [dropped], the `ChildStdin`'s underlying
file handle will be closed. If the child process was blocked on input prior
to being dropped, it will become unblocked after dropping.

[`stdin`]: Child::stdin
[dropped]: Drop

## struct ChildStdout

```rust
pub struct ChildStdout
```

A handle to a child process's standard output (stdout).

This struct is used in the [`stdout`] field on [`Child`].

When an instance of `ChildStdout` is [dropped], the `ChildStdout`'s
underlying file handle will be closed.

[`stdout`]: Child::stdout
[dropped]: Drop

## struct ChildStderr

```rust
pub struct ChildStderr
```

A handle to a child process's stderr.

This struct is used in the [`stderr`] field on [`Child`].

When an instance of `ChildStderr` is [dropped], the `ChildStderr`'s
underlying file handle will be closed.

[`stderr`]: Child::stderr
[dropped]: Drop

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

```
# if cfg!(not(all(target_vendor = "apple", not(target_os = "macos")))) {
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
# }
```

`Command` can be reused to spawn multiple processes. The builder methods
change the command without needing to immediately spawn the process.

```no_run
use std::process::Command;

let mut echo_hello = Command::new("sh");
echo_hello.arg("-c").arg("echo hello");
let hello_1 = echo_hello.output().expect("process should execute successfully");
let hello_2 = echo_hello.output().expect("process should execute successfully");
```

Similarly, you can call builder methods after spawning a process and then
spawn a new process with the modified settings.

```no_run
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
* Inherit stdin/stdout/stderr for [`spawn`] or [`status`], but create pipes for [`output`]

[`spawn`]: Self::spawn
[`status`]: Self::status
[`output`]: Self::output

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
- If `PATH` is explicitly set via [`env`], that new value is searched.
- If [`env_clear`] or [`env_remove`] removes `PATH` without a
  replacement, `execvp` falls back to an OS-defined default (typically
  `/bin:/usr/bin`), **not** the parent's `PATH`. This may fail to find
  programs that rely on the parent's `PATH`.

To avoid surprises, use an absolute path or explicitly set `PATH` on
the `Command` when modifying the child's environment.

On Windows, Rust resolves the executable path before spawning, rather
than passing the name to `CreateProcessW` for resolution. When
`program` is not an absolute path, the following locations are searched
in order:

1. The child's `PATH`, if explicitly set via [`env`].
2. The directory of the current executable.
3. The system directory (`GetSystemDirectoryW`).
4. The Windows directory (`GetWindowsDirectoryW`).
5. The parent process's `PATH`.

Note: when `PATH` is cleared via [`env_clear`] or [`env_remove`] on
Windows, step 1 is skipped but the parent process's `PATH` is still
searched at step 5, unlike on Unix.

For executable files, the `.exe` extension may be omitted. Files with
other extensions must include the extension, otherwise they will not be
found. Note that this behavior has some known limitations
(see issue #37519).

[`env`]: Self::env
[`env_remove`]: Self::env_remove
[`env_clear`]: Self::env_clear

# Examples

```no_run
use std::process::Command;

Command::new("sh")
    .spawn()
    .expect("sh command should start");
```

# Caveats

[`Command::new`] is only intended to accept the path of the program. If you pass a program
path along with arguments like `Command::new("ls -l").spawn()`, it will try to search for
`ls -l` literally. The arguments need to be passed separately, such as via [`arg`] or
[`args`].

```no_run
use std::process::Command;

Command::new("ls")
    .arg("-l") // arg passed separately
    .spawn()
    .expect("ls command should start");
```

[`arg`]: Self::arg
[`args`]: Self::args

## Command::arg

```rust
pub fn arg<S: AsRef<OsStr>>(&mut self, arg: S) -> &mut Command
```

Adds an argument to pass to the program.

Only one argument can be passed per use. So instead of:

```no_run
# std::process::Command::new("sh")
.arg("-C /path/to/repo")
# ;
```

usage would be:

```no_run
# std::process::Command::new("sh")
.arg("-C")
.arg("/path/to/repo")
# ;
```

To pass multiple arguments see [`args`].

[`args`]: Command::args

Note that the argument is not passed through a shell, but given
literally to the program. This means that shell syntax like quotes,
escaped characters, word splitting, glob patterns, variable substitution,
etc. have no effect.

<div class="warning">

On Windows, use caution with untrusted inputs. Most applications use the
standard convention for decoding arguments passed to them. These are safe to
use with `arg`. However, some applications such as `cmd.exe` and `.bat` files
use a non-standard way of decoding arguments. They are therefore vulnerable
to malicious input.

In the case of `cmd.exe` this is especially important because a malicious
argument can potentially run arbitrary shell commands.

See [Windows argument splitting][windows-args] for more details
or [`raw_arg`] for manually implementing non-standard argument encoding.

[`raw_arg`]: crate::os::windows::process::CommandExt::raw_arg
[windows-args]: crate::process#windows-argument-splitting

</div>

# Examples

```no_run
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

To pass a single argument see [`arg`].

[`arg`]: Command::arg

Note that the arguments are not passed through a shell, but given
literally to the program. This means that shell syntax like quotes,
escaped characters, word splitting, glob patterns, variable substitution, etc.
have no effect.

<div class="warning">

On Windows, use caution with untrusted inputs. Most applications use the
standard convention for decoding arguments passed to them. These are safe to
use with `arg`. However, some applications such as `cmd.exe` and `.bat` files
use a non-standard way of decoding arguments. They are therefore vulnerable
to malicious input.

In the case of `cmd.exe` this is especially important because a malicious
argument can potentially run arbitrary shell commands.

See [Windows argument splitting][windows-args] for more details
or [`raw_arg`] for manually implementing non-standard argument encoding.

[`raw_arg`]: crate::os::windows::process::CommandExt::raw_arg
[windows-args]: crate::process#windows-argument-splitting

</div>

# Examples

```no_run
use std::process::Command;

Command::new("ls")
    .args(["-l", "-a"])
    .spawn()
    .expect("ls command should start");
```

## Command::env

```rust
pub fn env<K, V>(&mut self, key: K, val: V) -> &mut Command where K: AsRef<OsStr>, V: AsRef<OsStr>,
```

Inserts or updates an explicit environment variable mapping.

This method allows you to add an environment variable mapping to the spawned process or
overwrite a previously set value. You can use [`Command::envs`] to set multiple environment
variables simultaneously.

Child processes will inherit environment variables from their parent process by default.
Environment variables explicitly set using [`Command::env`] take precedence over inherited
variables. You can disable environment variable inheritance entirely using
[`Command::env_clear`] or for a single key using [`Command::env_remove`].

Note that environment variable names are case-insensitive (but
case-preserving) on Windows and case-sensitive on all other platforms.

# Examples

```no_run
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
or overwrite previously set values. You can use [`Command::env`] to set a single environment
variable.

Child processes will inherit environment variables from their parent process by default.
Environment variables explicitly set using [`Command::envs`] take precedence over inherited
variables. You can disable environment variable inheritance entirely using
[`Command::env_clear`] or for a single key using [`Command::env_remove`].

Note that environment variable names are case-insensitive (but case-preserving) on Windows
and case-sensitive on all other platforms.

# Examples

```no_run
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
[`Command::env`] or [`Command::envs`]. In addition, it will prevent the spawned child
process from inheriting that environment variable from its parent process.

After calling [`Command::env_remove`], the value associated with its key from
[`Command::get_envs`] will be [`None`].

To clear all explicitly set environment variables and disable all environment variable
inheritance, you can use [`Command::env_clear`].

# Examples

Prevent any inherited `GIT_DIR` variable from changing the target of the `git` command,
while allowing all other variables, like `GIT_AUTHOR_NAME`.

```no_run
use std::process::Command;

Command::new("git")
    .arg("commit")
    .env_remove("GIT_DIR")
    .spawn()?;
# std::io::Result::Ok(())
```

## Command::env_clear

```rust
pub fn env_clear(&mut self) -> &mut Command
```

Clears all explicitly set environment variables and prevents inheriting any parent process
environment variables.

This method will remove all explicitly added environment variables set via [`Command::env`]
or [`Command::envs`]. In addition, it will prevent the spawned child process from inheriting
any environment variable from its parent process.

After calling [`Command::env_clear`], the iterator from [`Command::get_envs`] will be
empty.

You can use [`Command::env_remove`] to clear a single mapping.

# Examples

The behavior of `sort` is affected by `LANG` and `LC_*` environment variables.
Clearing the environment makes `sort`'s behavior independent of the parent processes' language.

```no_run
use std::process::Command;

Command::new("sort")
    .arg("file.txt")
    .env_clear()
    .spawn()?;
# std::io::Result::Ok(())
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
[`canonicalize`] to get an absolute program path instead.

# Examples

```no_run
use std::process::Command;

Command::new("ls")
    .current_dir("/bin")
    .spawn()
    .expect("ls command should start");
```

[`canonicalize`]: crate::fs::canonicalize

## Command::stdin

```rust
pub fn stdin<T: Into<Stdio>>(&mut self, cfg: T) -> &mut Command
```

Configuration for the child process's standard input (stdin) handle.

Defaults to [`inherit`] when used with [`spawn`] or [`status`], and
defaults to [`piped`] when used with [`output`].

[`inherit`]: Stdio::inherit
[`piped`]: Stdio::piped
[`spawn`]: Self::spawn
[`status`]: Self::status
[`output`]: Self::output

# Examples

```no_run
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

Defaults to [`inherit`] when used with [`spawn`] or [`status`], and
defaults to [`piped`] when used with [`output`].

[`inherit`]: Stdio::inherit
[`piped`]: Stdio::piped
[`spawn`]: Self::spawn
[`status`]: Self::status
[`output`]: Self::output

# Examples

```no_run
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

Defaults to [`inherit`] when used with [`spawn`] or [`status`], and
defaults to [`piped`] when used with [`output`].

[`inherit`]: Stdio::inherit
[`piped`]: Stdio::piped
[`spawn`]: Self::spawn
[`status`]: Self::status
[`output`]: Self::output

# Examples

```no_run
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

This method returns an [`io::Error`] if the child process could not be
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
reported through its [`ExitStatus`] rather than as an error from the
spawning method.

# Examples

```no_run
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

Like [`spawn`], this method returns an [`io::Error`] if the child
process could not be spawned; see [`spawn`] for the common reasons. It
may also return an error if reading the child's output or waiting on the
child fails.

Note that this method does **not** return an error if the child runs and
then exits unsuccessfully, or is terminated by a signal. In those cases
it still returns [`Ok`], and the outcome is reflected in the
[`ExitStatus`] stored in the returned [`Output`].

[`spawn`]: Command::spawn

# Examples

```should_panic
use std::process::Command;
use std::io::{self, Write};
let output = Command::new("/bin/cat")
    .arg("file.txt")
    .output()?;

println!("status: {}", output.status);
io::stdout().write_all(&output.stdout)?;
io::stderr().write_all(&output.stderr)?;

assert!(output.status.success());
# io::Result::Ok(())
```

## Command::status

```rust
pub fn status(&mut self) -> io::Result<ExitStatus>
```

Executes a command as a child process, waiting for it to finish and
collecting its status.

By default, stdin, stdout and stderr are inherited from the parent.

# Errors

Like [`spawn`], this method returns an [`io::Error`] if the child
process could not be spawned; see [`spawn`] for the common reasons. It
may also return an error if waiting on the child fails.

Note that this method does **not** return an error if the child runs and
then exits unsuccessfully, or is terminated by a signal. In those cases
it still returns [`Ok`], and the outcome is reflected in the returned
[`ExitStatus`].

[`spawn`]: Command::spawn

# Examples

```should_panic
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

Returns the path to the program that was given to [`Command::new`].

# Examples

```
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
it only includes the arguments specified with [`Command::arg`] and
[`Command::args`].

# Examples

```
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

Environment variables explicitly set using [`Command::env`], [`Command::envs`], and
[`Command::env_remove`] can be retrieved with this method.

Note that this output does not include environment variables inherited from the parent
process. To see the full list of environment variables, including those inherited from the
parent process, use [`Command::get_resolved_envs`].

Each element is a tuple key/value pair `(&OsStr, Option<&OsStr>)`. A [`None`] value
indicates its key was explicitly removed via [`Command::env_remove`]. The associated key for
the [`None`] value will no longer inherit from its parent process.

An empty iterator can indicate that no explicit mappings were added or that
[`Command::env_clear`] was called. After calling [`Command::env_clear`], the child process
will not inherit any environment variables from its parent process.

# Examples

```
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

This returns [`None`] if the working directory will not be changed.

# Examples

```
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

This struct is created by [`Command::get_args`]. See its documentation for
more.

## struct CommandEnvs

```rust
pub struct CommandEnvs<'a>
```

An iterator over the command environment variables.

This struct is created by
[`Command::get_envs`][crate::process::Command::get_envs]. See its
documentation for more.

## struct Output

```rust
pub struct Output
```

The output of a finished process.

This is returned in a Result by either the [`output`] method of a
[`Command`], or the [`wait_with_output`] method of a [`Child`]
process.

[`output`]: Command::output
[`wait_with_output`]: Child::wait_with_output

## struct Stdio

```rust
pub struct Stdio(imp::Stdio)
```

Describes what to do with a standard I/O stream for a child process when
passed to the [`stdin`], [`stdout`], and [`stderr`] methods of [`Command`].

[`stdin`]: Command::stdin
[`stdout`]: Command::stdout
[`stderr`]: Command::stderr

## Stdio::piped

```rust
pub fn piped() -> Stdio
```

A new pipe should be arranged to connect the parent and child processes.

# Examples

With stdout:

```no_run
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

```no_run
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

## Stdio::inherit

```rust
pub fn inherit() -> Stdio
```

The child inherits from the corresponding parent descriptor.

# Examples

With stdout:

```no_run
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

```no_run
use std::process::{Command, Stdio};
use std::io::{self, Write};

let output = Command::new("rev")
    .stdin(Stdio::inherit())
    .stdout(Stdio::piped())
    .output()?;

print!("You piped in the reverse of: ");
io::stdout().write_all(&output.stdout)?;
# io::Result::Ok(())
```

## Stdio::null

```rust
pub fn null() -> Stdio
```

This stream will be ignored. This is the equivalent of attaching the
stream to `/dev/null`.

# Examples

With stdout:

```no_run
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

```no_run
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

```rust,no_run
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
[`ExitStatusExt`](crate::os::unix::process::ExitStatusExt) is an
extension trait for extracting any such signal, and other details, from the `ExitStatus`.

# Examples

```no_run
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
[`ExitStatusExt`](crate::os::unix::process::ExitStatusExt).

If the process finished by calling `exit` with a nonzero value, this will return
that exit status.

If the error was something else, it will return `None`.

If the process exited successfully (ie, by calling `exit(0)`), there is no
`ExitStatusError`.  So the return value from `ExitStatusError::code()` is always nonzero.

# Examples

```
#![feature(exit_status_error)]
# #[cfg(all(unix, not(target_os = "android"), not(all(target_vendor = "apple", not(target_os = "macos")))))] {
use std::process::Command;

let bad = Command::new("false").status().unwrap().exit_ok().unwrap_err();
assert_eq!(bad.code(), Some(1));
# } // #[cfg(unix)]
```

## ExitStatusError::code_nonzero

```rust
pub fn code_nonzero(&self) -> Option<NonZero<i32>>
```

Reports the exit code, if applicable, from an `ExitStatusError`, as a [`NonZero`].

This is exactly like [`code()`](Self::code), except that it returns a <code>[NonZero]<[i32]></code>.

Plain `code`, returning a plain integer, is provided because it is often more convenient.
The returned value from `code()` is indeed also nonzero; use `code_nonzero()` when you want
a type-level guarantee of nonzeroness.

# Examples

```
#![feature(exit_status_error)]

# if cfg!(all(unix, not(target_os = "android"), not(all(target_vendor = "apple", not(target_os = "macos"))))) {
use std::num::NonZero;
use std::process::Command;

let bad = Command::new("false").status().unwrap().exit_ok().unwrap_err();
assert_eq!(bad.code_nonzero().unwrap(), NonZero::new(1).unwrap());
# } // cfg!(unix)
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
[`Termination::report()`]). For forwards compatibility with potentially
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
the [`SUCCESS`] and [`FAILURE`] associated items.

[`SUCCESS`]: ExitCode::SUCCESS
[`FAILURE`]: ExitCode::FAILURE

# Differences from `ExitStatus`

`ExitCode` is intended for terminating the currently running process, via
the `Termination` trait, in contrast to [`ExitStatus`], which represents the
termination of a child process. These APIs are separate due to platform
compatibility differences and their expected usage; it is not generally
possible to exactly reproduce an `ExitStatus` from a child for the current
process after the fact.

# Examples

`ExitCode` can be returned from the `main` function of a crate, as it implements
[`Termination`]:

```
use std::process::ExitCode;
# fn check_foo() -> bool { true }

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

The mapping to [`ErrorKind`]s is not part of the compatibility contract of the function.

This is equivalent to sending a SIGKILL on Unix platforms.

# Examples

```no_run
use std::process::Command;

let mut command = Command::new("yes");
if let Ok(mut child) = command.spawn() {
    child.kill().expect("process should be killed");
} else {
    println!("yes command didn't start");
}
```

[`ErrorKind`]: io::ErrorKind
[`InvalidInput`]: io::ErrorKind::InvalidInput

## Child::id

```rust
pub fn id(&self) -> u32
```

Returns the OS-assigned process identifier associated with this child.

# Examples

```no_run
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

```no_run
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

```no_run
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
# std::io::Result::Ok(())
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

```should_panic
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
to run; or, preferably, simply return a type implementing [`Termination`]
(such as [`ExitCode`] or `Result`) from the `main` function and avoid this
function altogether:

```
# use std::io::Error as MyError;
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

```no_run
use std::process;

process::exit(0x0100);
```

### Safe interop with C code

On Unix, this function is currently implemented using the `exit` C function [`exit`][C-exit]. As
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
- [Rust issue #126600](https://github.com/rust-lang/rust/issues/126600)
- [Austin Group Bugzilla (for POSIX)](https://austingroupbugs.net/view.php?id=1845)
- [GNU C library Bugzilla](https://sourceware.org/bugzilla/show_bug.cgi?id=31997)

[C-exit]: https://en.cppreference.com/w/c/program/exit

## fn abort

```rust
pub fn abort() -> !
```

Terminates the process in an abnormal fashion.

The function will never return and will immediately terminate the current
process in a platform specific "abnormal" manner. As a consequence,
no destructors on the current stack or any other thread's stack
will be run, Rust IO buffers (eg, from `BufWriter`) will not be flushed,
and C stdio buffers will (on most platforms) not be flushed.

This is in contrast to the default behavior of [`panic!`] which unwinds
the current thread's stack and calls all destructors.
When `panic="abort"` is set, either as an argument to `rustc` or in a
crate's Cargo.toml, [`panic!`] and `abort` are similar. However,
[`panic!`] will still call the [panic hook] while `abort` will not.

If a clean shutdown is needed it is recommended to only call
this function at a known point where there are no more destructors left
to run.

The process's termination will be similar to that from the C `abort()`
function.  On Unix, the process will terminate with signal `SIGABRT`, which
typically means that the shell prints "Aborted".

# Examples

```no_run
use std::process;

fn main() {
    println!("aborting");

    process::abort();

    // execution never gets here
}
```

The `abort` function terminates the process, so the destructor will not
get run on the example below:

```no_run
use std::process;

struct HasDrop;

impl Drop for HasDrop {
    fn drop(&mut self) {
        println!("This will never be printed!");
    }
}

fn main() {
    let _x = HasDrop;
    process::abort();
    // the destructor implemented for HasDrop will never get run
}
```

[panic hook]: crate::panic::set_hook

## fn id

```rust
pub fn id() -> u32
```

Returns the OS-assigned process identifier associated with this process.

# Examples

```no_run
use std::process;

println!("My pid is {}", process::id());
```

## trait Termination

```rust
pub trait Termination
```

A trait for implementing arbitrary return types in the `main` function.

The C-main function only supports returning integers.
So, every type implementing the `Termination` trait has to be converted
to an integer.

The default implementations are returning `libc::EXIT_SUCCESS` to indicate
a successful execution. In case of a failure, `libc::EXIT_FAILURE` is returned.

Because different runtimes have different specifications on the return value
of the `main` function, this trait is likely to be available only on
standard library's runtime for convenience. Other runtimes are not required
to provide similar functionality.

## Termination::report

```rust
fn report(self) -> ExitCode
```

Is called to get the representation of the value as status code.
This status code is returned to the operating system.