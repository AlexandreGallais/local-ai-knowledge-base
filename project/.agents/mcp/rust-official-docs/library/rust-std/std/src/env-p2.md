---
title: "std::env (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/env.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::env (part 2 of 2)

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
  by `confstr(_CS_DARWIN_USER_TEMP_DIR, ...)`, as recommended by Apple's
  security guidelines.
- On all other unix-based OSes, it returns `/tmp`.

On Windows, the behavior is equivalent to that of `GetTempPath2`[GetTempPath2] /
`GetTempPath`[GetTempPath], which this function uses internally.
Specifically, for non-SYSTEM processes, the function checks for the
following environment variables in order and returns the first path found:

1. The path specified by the `TMP` environment variable.
2. The path specified by the `TEMP` environment variable.
3. The path specified by the `USERPROFILE` environment variable.
4. The Windows directory.

When called from a process running as SYSTEM,
`GetTempPath2`[GetTempPath2] returns `C:\Windows\SystemTemp`
regardless of environment variables.

Note that, this may change in the future.

```rust
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

```rust
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

An iterator over the arguments of a process, yielding a `String` value for
each argument.

This struct is created by `env::args()`. See its documentation
for more.

The first element is traditionally the path of the executable, but it can be
set to arbitrary text, and might not even exist. This means this property
should not be relied upon for security purposes.

## struct ArgsOs

```rust
pub struct ArgsOs
```

An iterator over the arguments of a process, yielding an `OsString` value
for each argument.

This struct is created by `env::args_os()`. See its documentation
for more.

The first element is traditionally the path of the executable, but it can be
set to arbitrary text, and might not even exist. This means this property
should not be relied upon for security purposes.

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
use the `args_os` function instead.

# Examples

```rust
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
use the `args` function instead.

# Examples

```rust
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

**Full list of possible values**

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

## const FAMILY

```rust
pub const FAMILY: &str = os::FAMILY
```

A string describing the family of the operating system.
An example value may be: `"unix"`, or `"windows"`.

This value may be an empty string if the family is unknown.

**Full list of possible values**

* `"unix"`
* `"windows"`
* `"itron"`
* `"wasm"`
* `""`

## const OS

```rust
pub const OS: &str = os::OS
```

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

The possible values are identical to those of `DLL_EXTENSION`, but with the leading period included.

## const DLL_EXTENSION

```rust
pub const DLL_EXTENSION: &str = os::DLL_EXTENSION
```

Specifies the file extension, if any, used for shared libraries on this platform that goes after the dot.
An example value may be: `"so"`, `"elf"`, or `"dll"`.

**Full list of possible values**

* `"so"`
* `"dylib"`
* `"dll"`
* `"sgxs"`
* `"a"`
* `"elf"`
* `"wasm"`
* `""` (an empty string)

## const EXE_SUFFIX

```rust
pub const EXE_SUFFIX: &str = os::EXE_SUFFIX
```

Specifies the filename suffix, if any, used for executable binaries on this platform.
An example value may be: `".exe"`, or `".efi"`.

The possible values are identical to those of `EXE_EXTENSION`, but with the leading period included.

## const EXE_EXTENSION

```rust
pub const EXE_EXTENSION: &str = os::EXE_EXTENSION
```

Specifies the file extension, if any, used for executable binaries on this platform.
An example value may be: `"exe"`, or an empty string (`""`).

**Full list of possible values**

* `"bin"`
* `"exe"`
* `"efi"`
* `"js"`
* `"sgxs"`
* `"elf"`
* `"wasm"`
* `""` (an empty string)
