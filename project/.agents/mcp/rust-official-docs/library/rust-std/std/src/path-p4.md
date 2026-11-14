---
title: "std::path (part 4 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/path.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::path (part 4 of 4)

## Path::is_symlink

```rust
pub fn is_symlink(&self) -> bool
```

Returns `true` if the path exists on disk and is pointing at a symbolic link.

This function will not traverse symbolic links.
In case of a broken symbolic link this will also return true.

If you cannot access the directory containing the file, e.g., because of a
permission error, this will return false.

# Examples

```rust
use std::path::Path;
use std::os::unix::fs::symlink;

let link_path = Path::new("link");
symlink("/origin_does_not_exist/", link_path).unwrap();
assert_eq!(link_path.is_symlink(), true);
assert_eq!(link_path.exists(), false);
```

# See Also

This is a convenience function that coerces errors to false. If you want to
check errors, call `fs::symlink_metadata` and handle its `Result`. Then call
`fs::Metadata::is_symlink` if it was `Ok`.

## Path::into_path_buf

```rust
pub fn into_path_buf(self: Box<Self>) -> PathBuf
```

Converts a `Box` into a `PathBuf` without copying or
allocating.

## struct Display

```rust
pub struct Display<'a>
```

Helper struct for safely printing paths with `format!` and `{}`.

A `Path` might contain non-Unicode data. This `struct` implements the
`Display` trait in a way that mitigates that. It is created by the
`display` method on `Path`. This may perform lossy
conversion, depending on the platform. If you would like an implementation
which escapes the path please use `Debug` instead.

# Examples

```rust
use std::path::Path;

let path = Path::new("/tmp/foo.rs");

println!("{}", path.display());
```

## ::absolute

```rust
pub fn absolute<P: AsRef<Path>>(path: P) -> io::Result<PathBuf>
```

Makes the path absolute without accessing the filesystem.

If the path is relative, the current directory is used as the base directory.
All intermediate components will be resolved according to platform-specific
rules, but unlike `canonicalize`[crate::fs::canonicalize], this does not
resolve symlinks and may succeed even if the path does not exist.

If the `path` is empty or getting the
current directory fails, then an error will be
returned.

# Platform-specific behavior

On POSIX platforms, the path is resolved using POSIX semantics,
except that it stops short of resolving symlinks. This means it will keep `..`
components and trailing separators.

On Windows, for verbatim paths, this will simply return the path as given. For other
paths, this is currently equivalent to calling
`GetFullPathNameW`[windows-path].

On Cygwin, this is currently equivalent to calling `cygwin_conv_path`[cygwin-path]
with mode `CCP_WIN_A_TO_POSIX`, and then being processed like other POSIX platforms.
If a Windows path is given, it will be converted to an absolute POSIX path without
keeping `..`.

Note that these may change in the future.

# Errors

This function may return an error in the following situations:

* If `path` is syntactically invalid; in particular, if it is empty.
* If getting the current directory fails.

# Examples

## POSIX paths

```rust
fn main() -> std::io::Result<()> {
    use std::path::{self, Path};

    // Relative to absolute
    let absolute = path::absolute("foo/./bar")?;
    assert!(absolute.ends_with("foo/bar"));

    // Absolute to absolute
    let absolute = path::absolute("/foo//test/.././bar.rs")?;
    assert_eq!(absolute, Path::new("/foo/test/../bar.rs"));
    Ok(())
}
```

## Windows paths

```rust
fn main() -> std::io::Result<()> {
    use std::path::{self, Path};

    // Relative to absolute
    let absolute = path::absolute("foo/./bar")?;
    assert!(absolute.ends_with(r"foo\bar"));

    // Absolute to absolute
    let absolute = path::absolute(r"C:\foo//test\..\./bar.rs")?;

    assert_eq!(absolute, Path::new(r"C:\foo\bar.rs"));
    Ok(())
}
```

Note that this may change in the future.
