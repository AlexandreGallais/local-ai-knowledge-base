---
title: "std::env (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/env.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::env

Inspection and manipulation of the process's environment.

This module contains functions to inspect various aspects such as
environment variables, process arguments, the current directory, and various
other important directories.

There are several functions and structs in this module that have a
counterpart ending in `os`. Those ending in `os` will return an `OsString`
and those without will return a `String`.

## fn current_dir

```rust
pub fn current_dir() -> io::Result<PathBuf>
```

Returns the current working directory as a `PathBuf`.

# Platform-specific behavior

This function [currently] corresponds to the `getcwd` function on Unix
and the `GetCurrentDirectoryW` function on Windows.

# Errors

Returns an `Err` if the current working directory value is invalid.
Possible cases:

* Current directory does not exist.
* There are insufficient permissions to access the current directory.

# Examples

```rust
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

Returns an `Err` if the operation fails.

# Examples

```rust
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

This structure is created by `env::vars()`. See its documentation for more.

## struct VarsOs

```rust
pub struct VarsOs
```

An iterator over a snapshot of the environment variables of this process.

This structure is created by `env::vars_os()`. See its documentation for more.

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
`env::vars_os()`.

# Examples

```rust
// Print all environment variables.
for (key, value) in std::env::vars() {
    println!("{key}: {value}");
}
```

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
use the `vars` function instead.

# Examples

```rust
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

Returns `VarError::NotPresent` if:
- The variable is not set.
- The variable's name contains an equal sign or NUL (`'='` or `'\0'`).

Returns `VarError::NotUnicode` if the variable's value is not valid
Unicode. If this is not desired, consider using `var_os`.

Use `env!` or `option_env!` instead if you want to check environment
variables at compile time.

# Examples

```rust
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
`None` if the variable isn't set or if there is another error.

It may return `None` if the environment variable's name contains
the equal sign character (`=`) or the NUL character.

Note that this function will not check if the environment variable
is valid Unicode. If you want to have an error on invalid UTF-8,
use the `var` function instead.

# Examples

```rust
use std::env;

let key = "HOME";
match env::var_os(key) {
    Some(val) => println!("{key}: {val:?}"),
    None => println!("{key} is not defined in the environment.")
}
```

If expecting a delimited variable (such as `PATH`), `split_paths`
can be used to separate items.

## enum VarError

```rust
pub enum VarError
```

The error type for operations interacting with environment variables.
Possibly returned from `env::var()`.

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
lookups from `std::net::ToSocketAddrs`. No stable guarantee is made about
which functions may read from the environment in future versions of a
library. All this makes it not practically possible for you to guarantee
that no other thread will read the environment, so the only sound option is
to not use `set_var` or `remove_var` in multi-threaded programs at all.

Discussion of this unsafety on Unix may be found in:

 - Austin Group Bugzilla (for POSIX)
 - GNU C library Bugzilla

To pass an environment variable to a child process, you can instead use `Command::env`.

# Panics

This function may panic if `key` is empty, contains an ASCII equals sign `'='`
or the NUL character `'\0'`, or when `value` contains the NUL character.

# Examples

```rust
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
lookups from `std::net::ToSocketAddrs`. No stable guarantee is made about
which functions may read from the environment in future versions of a
library. All this makes it not practically possible for you to guarantee
that no other thread will read the environment, so the only sound option is
to not use `set_var` or `remove_var` in multi-threaded programs at all.

Discussion of this unsafety on Unix may be found in:

 - Austin Group Bugzilla
 - GNU C library Bugzilla

To prevent a child process from inheriting an environment variable, you can
instead use `Command::env_remove` or `Command::env_clear`.

# Panics

This function may panic if `key` is empty, contains an ASCII equals sign
`'='` or the NUL character `'\0'`, or when the value contains the NUL
character.

# Examples

```rust
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

The iterator element type is `PathBuf`.

This structure is created by `env::split_paths()`. See its
documentation for more.

## fn split_paths

```rust
pub fn split_paths<T: AsRef<OsStr> + ?Sized>(unparsed: &T) -> SplitPaths<'_>
```

Parses input according to platform conventions for the `PATH`
environment variable.

Returns an iterator over the paths contained in `unparsed`. The iterator
element type is `PathBuf`.

On most Unix platforms, the separator is `:` and on Windows it is `;`. This
also performs unquoting on Windows.

`join_paths` can be used to recombine elements.

# Panics

This will panic on systems where there is no delimited `PATH` variable,
such as UEFI.

# Examples

```rust
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
`env::join_paths()`.

## fn join_paths

```rust
pub fn join_paths<I, T>(paths: I) -> Result<OsString, JoinPathsError> where I: IntoIterator<Item = T>, T: AsRef<OsStr>,
```

Joins a collection of `Path`s appropriately for the `PATH`
environment variable.

# Errors

Returns an `Err` (containing an error message) if one of the input
`Path`s contains an invalid character for constructing the `PATH`
variable (a double quote on Windows or a colon on Unix or semicolon on
UEFI), or if the system does not have a `PATH`-like variable (e.g. WASI).

# Examples

Joining paths on a Unix-like platform:

```rust
use std::env;
use std::ffi::OsString;
use std::path::Path;

fn main() -> Result<(), env::JoinPathsError> {
    let paths = [Path::new("/bin"), Path::new("/usr/bin")];
    let path_os_string = env::join_paths(paths.iter())?;
    assert_eq!(path_os_string, OsString::from("/bin:/usr/bin"));
    Ok(())
}
```

Joining a path containing a colon on a Unix-like platform results in an
error:

```rust
use std::env;
use std::path::Path;

let paths = [Path::new("/bin"), Path::new("/usr/bi:n")];
assert!(env::join_paths(paths.iter()).is_err());
```

Using `env::join_paths()` with `env::split_paths()` to append an item to
the `PATH` environment variable:

```rust
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

## fn home_dir

```rust
pub fn home_dir() -> Option<PathBuf>
```

Returns the path of the current user's home directory if known.

This may return `None` if getting the directory fails or if the platform does not have user home directories.

For storing user data and configuration it is often preferable to use more specific directories.
For example, [XDG Base Directories] on Unix or the `LOCALAPPDATA` and `APPDATA` environment variables on Windows.

# Unix

- Returns the value of the 'HOME' environment variable if it is set
  (and not an empty string).
- Otherwise, it tries to determine the home directory by invoking the `getpwuid_r` function
  using the UID of the current user. An empty home directory field returned from the
  `getpwuid_r` function is considered to be a valid value.
- Returns `None` if the current user has no entry in the /etc/passwd file.

# Windows

- Returns the value of the 'USERPROFILE' environment variable if it is set, and is not an empty string.
- Otherwise, `GetUserProfileDirectory`[msdn] is used to return the path. This may change in the future.

In UWP (Universal Windows Platform) targets this function is unimplemented and always returns `None`.

Before Rust 1.85.0, this function used to return the value of the 'HOME' environment variable
on Windows, which in Cygwin or Mingw environments could return non-standard paths like `/home/you`
instead of `C:\Users\you`.

# Examples

```rust
use std::env;

match env::home_dir() {
    Some(path) => println!("Your home directory, probably: {}", path.display()),
    None => println!("Impossible to get your home dir!"),
}
```
