# std::env

Inspection and manipulation of the process's environment.

This module contains functions to inspect various aspects such as
environment variables, process arguments, the current directory, and various
other important directories.

There are several functions and structs in this module that have a
counterpart ending in `os`. Those ending in `os` will return an [`OsString`]
and those without will return a [`String`].

## fn current_dir

```rust
pub fn current_dir() -> io::Result<PathBuf>
```

Returns the current working directory as a [`PathBuf`].

# Platform-specific behavior

This function [currently] corresponds to the `getcwd` function on Unix
and the `GetCurrentDirectoryW` function on Windows.

[currently]: crate::io#platform-specific-behavior

# Errors

Returns an [`Err`] if the current working directory value is invalid.
Possible cases:

* Current directory does not exist.
* There are insufficient permissions to access the current directory.

# Examples

```
use std::env;

fn main() -> std::io::Result<()> {
    let path = env::current_dir()?;
    println!("The current directory is {}", path.display());
    Ok(())
}
```

## fn set_current_dir

```rust
pub fn set_current_dir<P: AsRef<Path>>(path: P) -> io::Result<()>
```

Changes the current working directory to the specified path.

# Platform-specific behavior

This function [currently] corresponds to the `chdir` function on Unix
and the `SetCurrentDirectoryW` function on Windows.

Returns an [`Err`] if the operation fails.

[currently]: crate::io#platform-specific-behavior

# Examples

```
use std::env;
use std::path::Path;

let root = Path::new("/");
assert!(env::set_current_dir(&root).is_ok());
println!("Successfully changed working directory to {}!", root.display());
```

## struct Vars

```rust
pub struct Vars
```

An iterator over a snapshot of the environment variables of this process.

This structure is created by [`env::vars()`]. See its documentation for more.

[`env::vars()`]: vars

## struct VarsOs

```rust
pub struct VarsOs
```

An iterator over a snapshot of the environment variables of this process.

This structure is created by [`env::vars_os()`]. See its documentation for more.

[`env::vars_os()`]: vars_os

## ::vars

```rust
pub fn vars() -> Vars
```

Returns an iterator of (variable, value) pairs of strings, for all the
environment variables of the current process.

The returned iterator contains a snapshot of the process's environment
variables at the time of this invocation. Modifications to environment
variables afterwards will not be reflected in the returned iterator.

# Panics

While iterating, the returned iterator will panic if any key or value in the
environment is not valid unicode. If this is not desired, consider using
[`env::vars_os()`].

# Examples

```
// Print all environment variables.
for (key, value) in std::env::vars() {
    println!("{key}: {value}");
}
```

[`env::vars_os()`]: vars_os

## fn vars_os

```rust
pub fn vars_os() -> VarsOs
```

Returns an iterator of (variable, value) pairs of OS strings, for all the
environment variables of the current process.

The returned iterator contains a snapshot of the process's environment
variables at the time of this invocation. Modifications to environment
variables afterwards will not be reflected in the returned iterator.

Note that the returned iterator will not check if the environment variables
are valid Unicode. If you want to panic on invalid UTF-8,
use the [`vars`] function instead.

# Examples

```
// Print all environment variables.
for (key, value) in std::env::vars_os() {
    println!("{key:?}: {value:?}");
}
```

## fn var

```rust
pub fn var<K: AsRef<OsStr>>(key: K) -> Result<String, VarError>
```

Fetches the environment variable `key` from the current process.

# Errors

Returns [`VarError::NotPresent`] if:
- The variable is not set.
- The variable's name contains an equal sign or NUL (`'='` or `'\0'`).

Returns [`VarError::NotUnicode`] if the variable's value is not valid
Unicode. If this is not desired, consider using [`var_os`].

Use [`env!`] or [`option_env!`] instead if you want to check environment
variables at compile time.

# Examples

```
use std::env;

let key = "HOME";
match env::var(key) {
    Ok(val) => println!("{key}: {val:?}"),
    Err(e) => println!("couldn't interpret {key}: {e}"),
}
```

## fn var_os

```rust
pub fn var_os<K: AsRef<OsStr>>(key: K) -> Option<OsString>
```

Fetches the environment variable `key` from the current process, returning
[`None`] if the variable isn't set or if there is another error.

It may return `None` if the environment variable's name contains
the equal sign character (`=`) or the NUL character.

Note that this function will not check if the environment variable
is valid Unicode. If you want to have an error on invalid UTF-8,
use the [`var`] function instead.

# Examples

```
use std::env;

let key = "HOME";
match env::var_os(key) {
    Some(val) => println!("{key}: {val:?}"),
    None => println!("{key} is not defined in the environment.")
}
```

If expecting a delimited variable (such as `PATH`), [`split_paths`]
can be used to separate items.

## enum VarError

```rust
pub enum VarError
```

The error type for operations interacting with environment variables.
Possibly returned from [`env::var()`].

[`env::var()`]: var

## ::set_var

```rust
pub unsafe fn set_var<K: AsRef<OsStr>, V: AsRef<OsStr>>(key: K, value: V)
```

Sets the environment variable `key` to the value `value` for the currently running
process.

# Safety

This function is sound to call in a single-threaded program.

This function is also always sound to call on Windows, in single-threaded
and multi-threaded programs.

In multi-threaded programs on other operating systems, the only sound option is
to not use `set_var` or `remove_var` at all.

The exact requirement is: you
must ensure that there are no other threads concurrently writing or
*reading*(!) the environment through functions or global variables other
than the ones in this module. The problem is that these operating systems
do not provide a thread-safe way to read the environment, and most C
libraries, including libc itself, do not advertise which functions read
from the environment. Even functions from the Rust standard library may
read the environment without going through this module, e.g. for DNS
lookups from [`std::net::ToSocketAddrs`]. No stable guarantee is made about
which functions may read from the environment in future versions of a
library. All this makes it not practically possible for you to guarantee
that no other thread will read the environment, so the only sound option is
to not use `set_var` or `remove_var` in multi-threaded programs at all.

Discussion of this unsafety on Unix may be found in:

 - [Austin Group Bugzilla (for POSIX)](https://austingroupbugs.net/view.php?id=188)
 - [GNU C library Bugzilla](https://sourceware.org/bugzilla/show_bug.cgi?id=15607#c2)

To pass an environment variable to a child process, you can instead use [`Command::env`].

[`std::net::ToSocketAddrs`]: crate::net::ToSocketAddrs
[`Command::env`]: crate::process::Command::env

# Panics

This function may panic if `key` is empty, contains an ASCII equals sign `'='`
or the NUL character `'\0'`, or when `value` contains the NUL character.

# Examples

```
use std::env;

let key = "KEY";
unsafe {
    env::set_var(key, "VALUE");
}
assert_eq!(env::var(key), Ok("VALUE".to_string()));
```

## fn remove_var

```rust
pub unsafe fn remove_var<K: AsRef<OsStr>>(key: K)
```

Removes an environment variable from the environment of the currently running process.

# Safety

This function is sound to call in a single-threaded program.

This function is also always sound to call on Windows, in single-threaded
and multi-threaded programs.

In multi-threaded programs on other operating systems, the only sound option is
to not use `set_var` or `remove_var` at all.

The exact requirement is: you
must ensure that there are no other threads concurrently writing or
*reading*(!) the environment through functions or global variables other
than the ones in this module. The problem is that these operating systems
do not provide a thread-safe way to read the environment, and most C
libraries, including libc itself, do not advertise which functions read
from the environment. Even functions from the Rust standard library may
read the environment without going through this module, e.g. for DNS
lookups from [`std::net::ToSocketAddrs`]. No stable guarantee is made about
which functions may read from the environment in future versions of a
library. All this makes it not practically possible for you to guarantee
that no other thread will read the environment, so the only sound option is
to not use `set_var` or `remove_var` in multi-threaded programs at all.

Discussion of this unsafety on Unix may be found in:

 - [Austin Group Bugzilla](https://austingroupbugs.net/view.php?id=188)
 - [GNU C library Bugzilla](https://sourceware.org/bugzilla/show_bug.cgi?id=15607#c2)

To prevent a child process from inheriting an environment variable, you can
instead use [`Command::env_remove`] or [`Command::env_clear`].

[`std::net::ToSocketAddrs`]: crate::net::ToSocketAddrs
[`Command::env_remove`]: crate::process::Command::env_remove
[`Command::env_clear`]: crate::process::Command::env_clear

# Panics

This function may panic if `key` is empty, contains an ASCII equals sign
`'='` or the NUL character `'\0'`, or when the value contains the NUL
character.

# Examples

```no_run
use std::env;

let key = "KEY";
unsafe {
    env::set_var(key, "VALUE");
}
assert_eq!(env::var(key), Ok("VALUE".to_string()));

unsafe {
    env::remove_var(key);
}
assert!(env::var(key).is_err());
```

## struct SplitPaths

```rust
pub struct SplitPaths<'a>
```

An iterator that splits an environment variable into paths according to
platform-specific conventions.

The iterator element type is [`PathBuf`].

This structure is created by [`env::split_paths()`]. See its
documentation for more.

[`env::split_paths()`]: split_paths

## fn split_paths

```rust
pub fn split_paths<T: AsRef<OsStr> + ?Sized>(unparsed: &T) -> SplitPaths<'_>
```

Parses input according to platform conventions for the `PATH`
environment variable.

Returns an iterator over the paths contained in `unparsed`. The iterator
element type is [`PathBuf`].

On most Unix platforms, the separator is `:` and on Windows it is `;`. This
also performs unquoting on Windows.

[`join_paths`] can be used to recombine elements.

# Panics

This will panic on systems where there is no delimited `PATH` variable,
such as UEFI.

# Examples

```
use std::env;

let key = "PATH";
match env::var_os(key) {
    Some(paths) => {
        for path in env::split_paths(&paths) {
            println!("'{}'", path.display());
        }
    }
    None => println!("{key} is not defined in the environment.")
}
```

## struct JoinPathsError

```rust
pub struct JoinPathsError
```

The error type for operations on the `PATH` variable. Possibly returned from
[`env::join_paths()`].

[`env::join_paths()`]: join_paths

## fn join_paths

```rust
pub fn join_paths<I, T>(paths: I) -> Result<OsString, JoinPathsError> where I: IntoIterator<Item = T>, T: AsRef<OsStr>,
```

Joins a collection of [`Path`]s appropriately for the `PATH`
environment variable.

# Errors

Returns an [`Err`] (containing an error message) if one of the input
[`Path`]s contains an invalid character for constructing the `PATH`
variable (a double quote on Windows or a colon on Unix or semicolon on
UEFI), or if the system does not have a `PATH`-like variable (e.g. WASI).

# Examples

Joining paths on a Unix-like platform:

```
use std::env;
use std::ffi::OsString;
use std::path::Path;

fn main() -> Result<(), env::JoinPathsError> {
# if cfg!(unix) {
    let paths = [Path::new("/bin"), Path::new("/usr/bin")];
    let path_os_string = env::join_paths(paths.iter())?;
    assert_eq!(path_os_string, OsString::from("/bin:/usr/bin"));
# }
    Ok(())
}
```

Joining a path containing a colon on a Unix-like platform results in an
error:

```
# if cfg!(unix) {
use std::env;
use std::path::Path;

let paths = [Path::new("/bin"), Path::new("/usr/bi:n")];
assert!(env::join_paths(paths.iter()).is_err());
# }
```

Using `env::join_paths()` with [`env::split_paths()`] to append an item to
the `PATH` environment variable:

```
use std::env;
use std::path::PathBuf;

fn main() -> Result<(), env::JoinPathsError> {
    if let Some(path) = env::var_os("PATH") {
        let mut paths = env::split_paths(&path).collect::<Vec<_>>();
        paths.push(PathBuf::from("/home/xyz/bin"));
        let new_path = env::join_paths(paths)?;
        unsafe { env::set_var("PATH", &new_path); }
    }

    Ok(())
}
```

[`env::split_paths()`]: split_paths

## fn home_dir

```rust
pub fn home_dir() -> Option<PathBuf>
```

Returns the path of the current user's home directory if known.

This may return `None` if getting the directory fails or if the platform does not have user home directories.

For storing user data and configuration it is often preferable to use more specific directories.
For example, [XDG Base Directories] on Unix or the `LOCALAPPDATA` and `APPDATA` environment variables on Windows.

[XDG Base Directories]: https://specifications.freedesktop.org/basedir-spec/latest/

# Unix

- Returns the value of the 'HOME' environment variable if it is set
  (and not an empty string).
- Otherwise, it tries to determine the home directory by invoking the `getpwuid_r` function
  using the UID of the current user. An empty home directory field returned from the
  `getpwuid_r` function is considered to be a valid value.
- Returns `None` if the current user has no entry in the /etc/passwd file.

# Windows

- Returns the value of the 'USERPROFILE' environment variable if it is set, and is not an empty string.
- Otherwise, [`GetUserProfileDirectory`][msdn] is used to return the path. This may change in the future.

[msdn]: https://docs.microsoft.com/en-us/windows/win32/api/userenv/nf-userenv-getuserprofiledirectorya

In UWP (Universal Windows Platform) targets this function is unimplemented and always returns `None`.

Before Rust 1.85.0, this function used to return the value of the 'HOME' environment variable
on Windows, which in Cygwin or Mingw environments could return non-standard paths like `/home/you`
instead of `C:\Users\you`.

# Examples

```
use std::env;

match env::home_dir() {
    Some(path) => println!("Your home directory, probably: {}", path.display()),
    None => println!("Impossible to get your home dir!"),
}
```

## fn temp_dir

```rust
pub fn temp_dir() -> PathBuf
```

Returns the path of a temporary directory.

The temporary directory may be shared among users, or between processes
with different privileges; thus, the creation of any files or directories
in the temporary directory must use a secure method to create a uniquely
named file. Creating a file or directory with a fixed or predictable name
may result in "insecure temporary file" security vulnerabilities. Consider
using a crate that securely creates temporary files or directories.

Note that the returned value may be a symbolic link, not a directory.

# Platform-specific behavior

On Unix, returns the value of the `TMPDIR` environment variable if it is
set, otherwise the value is OS-specific:
- On Android, there is no global temporary folder (it is usually allocated
  per-app), it will return the application's cache dir if the program runs
  in application's namespace and system version is Android 13 (or above), or
  `/data/local/tmp` otherwise.
- On Darwin-based OSes (macOS, iOS, etc) it returns the directory provided
  by `confstr(_CS_DARWIN_USER_TEMP_DIR, ...)`, as recommended by [Apple's
  security guidelines][appledoc].
- On all other unix-based OSes, it returns `/tmp`.

On Windows, the behavior is equivalent to that of [`GetTempPath2`][GetTempPath2] /
[`GetTempPath`][GetTempPath], which this function uses internally.
Specifically, for non-SYSTEM processes, the function checks for the
following environment variables in order and returns the first path found:

1. The path specified by the `TMP` environment variable.
2. The path specified by the `TEMP` environment variable.
3. The path specified by the `USERPROFILE` environment variable.
4. The Windows directory.

When called from a process running as SYSTEM,
[`GetTempPath2`][GetTempPath2] returns `C:\Windows\SystemTemp`
regardless of environment variables.

Note that, this [may change in the future][changes].

[changes]: io#platform-specific-behavior
[GetTempPath2]: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-gettemppath2a
[GetTempPath]: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-gettemppatha
[appledoc]: https://developer.apple.com/library/archive/documentation/Security/Conceptual/SecureCodingGuide/Articles/RaceConditions.html#//apple_ref/doc/uid/TP40002585-SW10

```
use std::env;

fn main() {
    let dir = env::temp_dir();
    println!("Temporary directory: {}", dir.display());
}
```

## fn current_exe

```rust
pub fn current_exe() -> io::Result<PathBuf>
```

Returns the full filesystem path of the current running executable.

# Platform-specific behavior

If the executable was invoked through a symbolic link, some platforms will
return the path of the symbolic link and other platforms will return the
path of the symbolic link’s target.

If the executable is renamed while it is running, platforms may return the
path at the time it was loaded instead of the new path.

# Errors

Acquiring the path of the current executable is a platform-specific operation
that can fail for a good number of reasons. Some errors can include, but not
be limited to, filesystem operations failing or general syscall failures.

# Security

The output of this function must be treated with care to avoid security
vulnerabilities, particularly in processes that run with privileges higher
than the user, such as setuid or setgid programs.

For example, on some Unix platforms, the result is calculated by
searching `$PATH` for an executable matching `argv[0]`, but both the
environment and arguments can be be set arbitrarily by the user who
invokes the program.

On Linux, if `fs.secure_hardlinks` is not set, an attacker who can
create hardlinks to the executable may be able to cause this function
to return an attacker-controlled path, which they later replace with
a different program.

This list of illustrative example attacks is not exhaustive.

# Examples

```
use std::env;

match env::current_exe() {
    Ok(exe_path) => println!("Path of this executable is: {}",
                             exe_path.display()),
    Err(e) => println!("failed to get current exe path: {e}"),
};
```

## struct Args

```rust
pub struct Args
```

An iterator over the arguments of a process, yielding a [`String`] value for
each argument.

This struct is created by [`env::args()`]. See its documentation
for more.

The first element is traditionally the path of the executable, but it can be
set to arbitrary text, and might not even exist. This means this property
should not be relied upon for security purposes.

[`env::args()`]: args

## struct ArgsOs

```rust
pub struct ArgsOs
```

An iterator over the arguments of a process, yielding an [`OsString`] value
for each argument.

This struct is created by [`env::args_os()`]. See its documentation
for more.

The first element is traditionally the path of the executable, but it can be
set to arbitrary text, and might not even exist. This means this property
should not be relied upon for security purposes.

[`env::args_os()`]: args_os

## fn args

```rust
pub fn args() -> Args
```

Returns the arguments that this program was started with (normally passed
via the command line).

The first element is traditionally the path of the executable, but it can be
set to arbitrary text, and might not even exist. This means this property should
not be relied upon for security purposes.

On Unix systems the shell usually expands unquoted arguments with glob patterns
(such as `*` and `?`). On Windows this is not done, and such arguments are
passed as-is.

On glibc Linux systems, arguments are retrieved by placing a function in `.init_array`.
glibc passes `argc`, `argv`, and `envp` to functions in `.init_array`, as a non-standard
extension. This allows `std::env::args` to work even in a `cdylib` or `staticlib`, as it
does on macOS and Windows.

# Panics

The returned iterator will panic during iteration if any argument to the
process is not valid Unicode. If this is not desired,
use the [`args_os`] function instead.

# Examples

```
use std::env;

// Prints each argument on a separate line
for argument in env::args() {
    println!("{argument}");
}
```

## fn args_os

```rust
pub fn args_os() -> ArgsOs
```

Returns the arguments that this program was started with (normally passed
via the command line).

The first element is traditionally the path of the executable, but it can be
set to arbitrary text, and might not even exist. This means this property should
not be relied upon for security purposes.

On Unix systems the shell usually expands unquoted arguments with glob patterns
(such as `*` and `?`). On Windows this is not done, and such arguments are
passed as-is.

On glibc Linux systems, arguments are retrieved by placing a function in `.init_array`.
glibc passes `argc`, `argv`, and `envp` to functions in `.init_array`, as a non-standard
extension. This allows `std::env::args_os` to work even in a `cdylib` or `staticlib`, as it
does on macOS and Windows.

Note that the returned iterator will not check if the arguments to the
process are valid Unicode. If you want to panic on invalid UTF-8,
use the [`args`] function instead.

# Examples

```
use std::env;

// Prints each argument on a separate line
for argument in env::args_os() {
    println!("{argument:?}");
}
```

## const ARCH

```rust
pub const ARCH: &str = env!("STD_ENV_ARCH")
```

A string describing the architecture of the CPU that is currently in use.
An example value may be: `"x86"`, `"arm"` or `"riscv64"`.

<details><summary>Full list of possible values</summary>

* `"x86"`
* `"x86_64"`
* `"arm"`
* `"aarch64"`
* `"m68k"`
* `"mips"`
* `"mips32r6"`
* `"mips64"`
* `"mips64r6"`
* `"csky"`
* `"powerpc"`
* `"powerpc64"`
* `"riscv32"`
* `"riscv64"`
* `"s390x"`
* `"sparc"`
* `"sparc64"`
* `"hexagon"`
* `"loongarch32"`
* `"loongarch64"`

</details>

## const FAMILY

```rust
pub const FAMILY: &str = os::FAMILY
```

A string describing the family of the operating system.
An example value may be: `"unix"`, or `"windows"`.

This value may be an empty string if the family is unknown.

<details><summary>Full list of possible values</summary>

* `"unix"`
* `"windows"`
* `"itron"`
* `"wasm"`
* `""`

</details>

## const OS

```rust
pub const OS: &str = os::OS
```

</details>

## const DLL_PREFIX

```rust
pub const DLL_PREFIX: &str = os::DLL_PREFIX
```

Specifies the filename prefix, if any, used for shared libraries on this platform.
This is either `"lib"` or an empty string. (`""`).

## const DLL_SUFFIX

```rust
pub const DLL_SUFFIX: &str = os::DLL_SUFFIX
```

Specifies the filename suffix, if any, used for shared libraries on this platform.
An example value may be: `".so"`, `".elf"`, or `".dll"`.

The possible values are identical to those of [`DLL_EXTENSION`], but with the leading period included.

## const DLL_EXTENSION

```rust
pub const DLL_EXTENSION: &str = os::DLL_EXTENSION
```

Specifies the file extension, if any, used for shared libraries on this platform that goes after the dot.
An example value may be: `"so"`, `"elf"`, or `"dll"`.

<details><summary>Full list of possible values</summary>

* `"so"`
* `"dylib"`
* `"dll"`
* `"sgxs"`
* `"a"`
* `"elf"`
* `"wasm"`
* `""` (an empty string)

</details>

## const EXE_SUFFIX

```rust
pub const EXE_SUFFIX: &str = os::EXE_SUFFIX
```

Specifies the filename suffix, if any, used for executable binaries on this platform.
An example value may be: `".exe"`, or `".efi"`.

The possible values are identical to those of [`EXE_EXTENSION`], but with the leading period included.

## const EXE_EXTENSION

```rust
pub const EXE_EXTENSION: &str = os::EXE_EXTENSION
```

Specifies the file extension, if any, used for executable binaries on this platform.
An example value may be: `"exe"`, or an empty string (`""`).

<details><summary>Full list of possible values</summary>

* `"bin"`
* `"exe"`
* `"efi"`
* `"js"`
* `"sgxs"`
* `"elf"`
* `"wasm"`
* `""` (an empty string)

</details>