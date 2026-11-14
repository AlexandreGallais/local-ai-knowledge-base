---
title: "std::path (part 3 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/path.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::path (part 3 of 4)

## Path::is_empty

```rust
pub fn is_empty(&self) -> bool
```

Checks whether the `Path` is empty.

Passing an empty path to most OS filesystem APIs will always result in an error.

Pushing an empty path to an existing path will append a directory separator unless it already ends with a separator or the existing path is itself empty.

# Examples

```rust
use std::path::Path;

let path = Path::new("");
assert!(path.is_empty());

let path = Path::new("foo");
assert!(!path.is_empty());

let path = Path::new(".");
assert!(!path.is_empty());
```

## Path::file_stem

```rust
pub fn file_stem(&self) -> Option<&OsStr>
```

Extracts the stem (non-extension) portion of `self.file_name`.

The stem is:

* `None`, if there is no file name;
* The entire file name if there is no embedded `.`;
* The entire file name if the file name begins with `.` and has no other `.`s within;
* Otherwise, the portion of the file name before the final `.`

# Examples

```rust
use std::path::Path;

assert_eq!("foo", Path::new("foo.rs").file_stem().unwrap());
assert_eq!("foo.tar", Path::new("foo.tar.gz").file_stem().unwrap());
```

# See Also
This method is similar to `Path::file_prefix`, which extracts the portion of the file name
before the *first* `.`

## Path::file_prefix

```rust
pub fn file_prefix(&self) -> Option<&OsStr>
```

Extracts the prefix of `self.file_name`.

The prefix is:

* `None`, if there is no file name;
* The entire file name if there is no embedded `.`;
* The portion of the file name before the first non-beginning `.`;
* The entire file name if the file name begins with `.` and has no other `.`s within;
* The portion of the file name before the second `.` if the file name begins with `.`

# Examples

```rust
use std::path::Path;

assert_eq!("foo", Path::new("foo.rs").file_prefix().unwrap());
assert_eq!("foo", Path::new("foo.tar.gz").file_prefix().unwrap());
assert_eq!(".config", Path::new(".config").file_prefix().unwrap());
assert_eq!(".config", Path::new(".config.toml").file_prefix().unwrap());
```

# See Also
This method is similar to `Path::file_stem`, which extracts the portion of the file name
before the *last* `.`

## Path::extension

```rust
pub fn extension(&self) -> Option<&OsStr>
```

Extracts the extension (without the leading dot) of `self.file_name`, if possible.

The extension is:

* `None`, if there is no file name;
* `None`, if there is no embedded `.`;
* `None`, if the file name begins with `.` and has no other `.`s within;
* Otherwise, the portion of the file name after the final `.`

# Examples

```rust
use std::path::Path;

assert_eq!("rs", Path::new("foo.rs").extension().unwrap());
assert_eq!("gz", Path::new("foo.tar.gz").extension().unwrap());
```

## Path::join

```rust
pub fn join<P: AsRef<Path>>(&self, path: P) -> PathBuf
```

Creates an owned `PathBuf` with `path` adjoined to `self`.

If `path` is absolute, it replaces the current path.

On Windows:

* if `path` has a root but no prefix (e.g., `\windows`), it
  replaces and returns everything except for the prefix (if any) of `self`.
* if `path` has a prefix but no root, `self` is ignored and `path` is returned.
* if `self` has a verbatim prefix (e.g. `\\?\C:\windows`)
  and `path` is not empty, the new path is normalized: all references
  to `.` and `..` are removed.

See `PathBuf::push` for more details on what it means to adjoin a path.

# Examples

```rust
use std::path::{Path, PathBuf};

assert_eq!(Path::new("<example-value>").join("<example-value>"), PathBuf::from("<example-value>"));
assert_eq!(Path::new("/etc").join("/bin/sh"), PathBuf::from("/bin/sh"));
```

## Path::with_file_name

```rust
pub fn with_file_name<S: AsRef<OsStr>>(&self, file_name: S) -> PathBuf
```

Creates an owned `PathBuf` like `self` but with the given file name.

See `PathBuf::set_file_name` for more details.

# Examples

```rust
use std::path::{Path, PathBuf};

let path = Path::new("/tmp/foo.png");
assert_eq!(path.with_file_name("bar"), PathBuf::from("/tmp/bar"));
assert_eq!(path.with_file_name("bar.txt"), PathBuf::from("/tmp/bar.txt"));

let path = Path::new("/tmp");
assert_eq!(path.with_file_name("var"), PathBuf::from("/var"));
```

## Path::with_extension

```rust
pub fn with_extension<S: AsRef<OsStr>>(&self, extension: S) -> PathBuf
```

Creates an owned `PathBuf` like `self` but with the given extension.

See `PathBuf::set_extension` for more details.

# Examples

```rust
use std::path::Path;

let path = Path::new("foo.rs");
assert_eq!(path.with_extension("txt"), Path::new("foo.txt"));
assert_eq!(path.with_extension(""), Path::new("foo"));
```

Handling multiple extensions:

```rust
use std::path::Path;

let path = Path::new("foo.tar.gz");
assert_eq!(path.with_extension("xz"), Path::new("foo.tar.xz"));
assert_eq!(path.with_extension("").with_extension("txt"), Path::new("foo.txt"));
```

Adding an extension where one did not exist:

```rust
use std::path::Path;

let path = Path::new("foo");
assert_eq!(path.with_extension("rs"), Path::new("foo.rs"));
```

## Path::with_added_extension

```rust
pub fn with_added_extension<S: AsRef<OsStr>>(&self, extension: S) -> PathBuf
```

Creates an owned `PathBuf` like `self` but with the extension added.

See `PathBuf::add_extension` for more details. The return value of
`PathBuf::add_extension` is ignored, which means no extension
will be added to paths with no `Path::file_name`.

# Examples

```rust
use std::path::{Path, PathBuf};

let path = Path::new("foo.rs");
assert_eq!(path.with_added_extension("txt"), PathBuf::from("foo.rs.txt"));

let path = Path::new("foo.tar.gz");
assert_eq!(path.with_added_extension(""), PathBuf::from("foo.tar.gz"));
assert_eq!(path.with_added_extension("xz"), PathBuf::from("foo.tar.gz.xz"));
assert_eq!(path.with_added_extension("").with_added_extension("txt"), PathBuf::from("foo.tar.gz.txt"));

let path = Path::new("/");
assert_eq!(path.with_added_extension("gz"), PathBuf::from("/"));
let path = Path::new("/dir/");
assert_eq!(path.with_added_extension("gz"), PathBuf::from("/dir.gz"));
let path = Path::new("/dir/..");
assert_eq!(path.with_added_extension("gz"), PathBuf::from("/dir/.."));
```

## Path::components

```rust
pub fn components(&self) -> Components<'_>
```

Produces an iterator over the `Component`s of the path.

When parsing the path, there is a small amount of normalization:

* Repeated separators are ignored, so `a/b` and `a//b` both have
  `a` and `b` as components.

* Occurrences of `.` are normalized away, except if they are at the
  beginning of the path. For example, `a/./b`, `a/b/`, `a/b/.` and
  `a/b` all have `a` and `b` as components, but `./a/b` starts with
  an additional `CurDir` component.

* Trailing separators are normalized away, so `/a/b` and `/a/b/` are equivalent.

Note that no other normalization takes place; in particular, `a/c`
and `a/b/../c` are distinct, to account for the possibility that `b`
is a symbolic link (so its parent isn't `a`).

# Examples

```rust
use std::path::{Path, Component};
use std::ffi::OsStr;

let mut components = Path::new("/tmp/foo.txt").components();

assert_eq!(components.next(), Some(Component::RootDir));
assert_eq!(components.next(), Some(Component::Normal(OsStr::new("tmp"))));
assert_eq!(components.next(), Some(Component::Normal(OsStr::new("foo.txt"))));
assert_eq!(components.next(), None)
```

## Path::iter

```rust
pub fn iter(&self) -> Iter<'_>
```

Produces an iterator over the path's components viewed as `OsStr`
slices.

For more information about the particulars of how the path is separated
into components, see `components`.

# Examples

```rust
use std::path::{self, Path};
use std::ffi::OsStr;

let mut it = Path::new("/tmp/foo.txt").iter();
assert_eq!(it.next(), Some(OsStr::new(&path::MAIN_SEPARATOR.to_string())));
assert_eq!(it.next(), Some(OsStr::new("tmp")));
assert_eq!(it.next(), Some(OsStr::new("foo.txt")));
assert_eq!(it.next(), None)
```

## Path::display

```rust
pub fn display(&self) -> Display<'_>
```

Returns an object that implements `Display` for safely printing paths
that may contain non-Unicode data. This may perform lossy conversion,
depending on the platform.  If you would like an implementation which
escapes the path please use `Debug` instead.

# Examples

```rust
use std::path::Path;

let path = Path::new("/tmp/foo.rs");

println!("{}", path.display());
```

## Path::metadata

```rust
pub fn metadata(&self) -> io::Result<fs::Metadata>
```

Queries the file system to get information about a file, directory, etc.

This function will traverse symbolic links to query information about the
destination file.

This is an alias to `fs::metadata`.

# Examples

```rust
use std::path::Path;

let path = Path::new("/Minas/tirith");
let metadata = path.metadata().expect("the path should point to an existing file or directory");
println!("{:?}", metadata.file_type());
```

## Path::symlink_metadata

```rust
pub fn symlink_metadata(&self) -> io::Result<fs::Metadata>
```

Queries the metadata about a file without following symlinks.

This is an alias to `fs::symlink_metadata`.

# Examples

```rust
use std::path::Path;

let path = Path::new("/Minas/tirith");
let metadata = path.symlink_metadata().expect("the path should exist");
println!("{:?}", metadata.file_type());
```

## Path::canonicalize

```rust
pub fn canonicalize(&self) -> io::Result<PathBuf>
```

Returns the canonical, absolute form of the path with all intermediate
components normalized and symbolic links resolved.

This is an alias to `fs::canonicalize`.

# Errors

This method will return an error in the following situations, but is not
limited to just these cases:

* `path` does not exist.
* A non-final component in path is not a directory.

# Examples

```rust
use std::path::{Path, PathBuf};

let path = Path::new("/foo/test/../test/bar.rs");
assert_eq!(path.canonicalize().unwrap(), PathBuf::from("/foo/test/bar.rs"));
```

## Path::read_link

```rust
pub fn read_link(&self) -> io::Result<PathBuf>
```

Reads a symbolic link, returning the file that the link points to.

This is an alias to `fs::read_link`.

# Examples

```rust
use std::path::Path;

let path = Path::new("/laputa/sky_castle.rs");
let path_link = path.read_link().expect("the path should be an existing symbolic link");
```

## Path::read_dir

```rust
pub fn read_dir(&self) -> io::Result<fs::ReadDir>
```

Returns an iterator over the entries within a directory.

The iterator will yield instances of <code>[io::Result]<[fs::DirEntry]></code>. New
errors may be encountered after an iterator is initially constructed.

This is an alias to `fs::read_dir`.

# Examples

```rust
use std::path::Path;

let path = Path::new("/laputa");
for entry in path.read_dir().expect("the path should point to an existing directory") {
    if let Ok(entry) = entry {
        println!("{:?}", entry.path());
    }
}
```

## Path::exists

```rust
pub fn exists(&self) -> bool
```

Returns `true` if the path points at an existing entity.

Warning: this method may be error-prone, consider using `try_exists()` instead!
It also has a risk of introducing time-of-check to time-of-use ([TOCTOU]) bugs.

This function will traverse symbolic links to query information about the
destination file.

If you cannot access the metadata of the file, e.g. because of a
permission error or broken symbolic links, this will return `false`.

# Examples

```rust
use std::path::Path;
assert!(!Path::new("does_not_exist.txt").exists());
```

# See Also

This is a convenience function that coerces errors to false. If you want to
check errors, call `Path::try_exists`.

## Path::try_exists

```rust
pub fn try_exists(&self) -> io::Result<bool>
```

Returns `Ok(true)` if the path points at an existing entity.

This function will traverse symbolic links to query information about the
destination file. In case of broken symbolic links this will return `Ok(false)`.

`Path::exists()` only checks whether or not a path was both found and readable. By
contrast, `try_exists` will return `Ok(true)` or `Ok(false)`, respectively, if the path
was _verified_ to exist or not exist. If its existence can neither be confirmed nor
denied, it will propagate an `Err(_)` instead. This can be the case if e.g. listing
permission is denied on one of the parent directories.

Note that while this avoids some pitfalls of the `exists()` method, it still can not
prevent time-of-check to time-of-use ([TOCTOU]) bugs. You should only use it in scenarios
where those bugs are not an issue.

This is an alias for `std::fs::exists`.

# Examples

```rust
use std::path::Path;
assert!(!Path::new("does_not_exist.txt").try_exists().expect("the path's existence should be verifiable"));
assert!(Path::new("<example-value>").try_exists().is_err());
```

## Path::is_file

```rust
pub fn is_file(&self) -> bool
```

Returns `true` if the path exists on disk and is pointing at a regular file.

This function will traverse symbolic links to query information about the
destination file.

If you cannot access the metadata of the file, e.g. because of a
permission error or broken symbolic links, this will return `false`.

# Examples

```rust
use std::path::Path;
assert_eq!(Path::new("./is_a_directory/").is_file(), false);
assert_eq!(Path::new("a_file.txt").is_file(), true);
```

# See Also

This is a convenience function that coerces errors to false. If you want to
check errors, call `fs::metadata` and handle its `Result`. Then call
`fs::Metadata::is_file` if it was `Ok`.

When the goal is simply to read from (or write to) the source, the most
reliable way to test the source can be read (or written to) is to open
it. Only using `is_file` can break workflows like `diff <( prog_a )` on
a Unix-like system for example. See `fs::File::open` or
`fs::OpenOptions::open` for more information.

## Path::is_dir

```rust
pub fn is_dir(&self) -> bool
```

Returns `true` if the path exists on disk and is pointing at a directory.

This function will traverse symbolic links to query information about the
destination file.

If you cannot access the metadata of the file, e.g. because of a
permission error or broken symbolic links, this will return `false`.

# Examples

```rust
use std::path::Path;
assert_eq!(Path::new("./is_a_directory/").is_dir(), true);
assert_eq!(Path::new("a_file.txt").is_dir(), false);
```

# See Also

This is a convenience function that coerces errors to false. If you want to
check errors, call `fs::metadata` and handle its `Result`. Then call
`fs::Metadata::is_dir` if it was `Ok`.
