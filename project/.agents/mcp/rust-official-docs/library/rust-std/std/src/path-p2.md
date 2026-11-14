---
title: "std::path (part 2 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/path.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::path (part 2 of 4)

## PathBuf::set_extension

```rust
pub fn set_extension<S: AsRef<OsStr>>(&mut self, extension: S) -> bool
```

Updates `self.extension` to `Some(extension)` or to `None` if
`extension` is empty.

Returns `false` and does nothing if `self.file_name` is `None`,
returns `true` and updates the extension otherwise.

If `self.extension` is `None`, the extension is added; otherwise
it is replaced.

If `extension` is the empty string, `self.extension` will be `None`
afterwards, not `Some("")`.

# Panics

Panics if the passed extension contains a path separator (see
`is_separator`).

# Caveats

The new `extension` may contain dots and will be used in its entirety,
but only the part after the final dot will be reflected in
`self.extension`.

If the file stem contains internal dots and `extension` is empty, part
of the old file stem will be considered the new `self.extension`.

See the examples below.

# Examples

```rust
use std::path::{Path, PathBuf};

let mut p = PathBuf::from("/feel/the");

p.set_extension("force");
assert_eq!(Path::new("/feel/the.force"), p.as_path());

p.set_extension("dark.side");
assert_eq!(Path::new("/feel/the.dark.side"), p.as_path());

p.set_extension("cookie");
assert_eq!(Path::new("/feel/the.dark.cookie"), p.as_path());

p.set_extension("");
assert_eq!(Path::new("/feel/the.dark"), p.as_path());

p.set_extension("");
assert_eq!(Path::new("/feel/the"), p.as_path());

p.set_extension("");
assert_eq!(Path::new("/feel/the"), p.as_path());
```

## PathBuf::add_extension

```rust
pub fn add_extension<S: AsRef<OsStr>>(&mut self, extension: S) -> bool
```

Append `self.extension` with `extension`.

Returns `false` and does nothing if `self.file_name` is `None`,
returns `true` and updates the extension otherwise.

# Panics

Panics if the passed extension contains a path separator (see
`is_separator`).

# Caveats

The appended `extension` may contain dots and will be used in its entirety,
but only the part after the final dot will be reflected in
`self.extension`.

See the examples below.

# Examples

```rust
use std::path::{Path, PathBuf};

let mut p = PathBuf::from("/feel/the");

p.add_extension("formatted");
assert_eq!(Path::new("/feel/the.formatted"), p.as_path());

p.add_extension("dark.side");
assert_eq!(Path::new("/feel/the.formatted.dark.side"), p.as_path());

p.set_extension("cookie");
assert_eq!(Path::new("/feel/the.formatted.dark.cookie"), p.as_path());

p.set_extension("");
assert_eq!(Path::new("/feel/the.formatted.dark"), p.as_path());

p.add_extension("");
assert_eq!(Path::new("/feel/the.formatted.dark"), p.as_path());
```

## PathBuf::as_mut_os_string

```rust
pub fn as_mut_os_string(&mut self) -> &mut OsString
```

Yields a mutable reference to the underlying `OsString` instance.

# Examples

```rust
use std::path::{Path, PathBuf};

let mut path = PathBuf::from("/foo");

path.push("bar");
assert_eq!(path, Path::new("/foo/bar"));

// OsString's `push` does not add a separator.
path.as_mut_os_string().push("baz");
assert_eq!(path, Path::new("/foo/barbaz"));
```

## PathBuf::into_os_string

```rust
pub fn into_os_string(self) -> OsString
```

Consumes the `PathBuf`, yielding its internal `OsString` storage.

# Examples

```rust
use std::path::PathBuf;

let p = PathBuf::from("/the/head");
let os_str = p.into_os_string();
```

## PathBuf::into_string

```rust
pub fn into_string(self) -> Result<String, PathBuf>
```

Converts the `PathBuf` into a `String` if it contains valid Unicode data.

On failure, ownership of the original `PathBuf` is returned.

# Examples

```rust
use std::path::PathBuf;

let path_buf = PathBuf::from("foo");
let string = path_buf.into_string();
assert_eq!(string, Ok(String::from("foo")));
```

## PathBuf::into_boxed_path

```rust
pub fn into_boxed_path(self) -> Box<Path>
```

Converts this `PathBuf` into a boxed `Path`.

## PathBuf::capacity

```rust
pub fn capacity(&self) -> usize
```

Invokes `capacity` on the underlying instance of `OsString`.

## PathBuf::clear

```rust
pub fn clear(&mut self)
```

Invokes `clear` on the underlying instance of `OsString`.

## PathBuf::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Invokes `reserve` on the underlying instance of `OsString`.

## PathBuf::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Invokes `try_reserve` on the underlying instance of `OsString`.

## PathBuf::reserve_exact

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

Invokes `reserve_exact` on the underlying instance of `OsString`.

## PathBuf::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Invokes `try_reserve_exact` on the underlying instance of `OsString`.

## PathBuf::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Invokes `shrink_to_fit` on the underlying instance of `OsString`.

## PathBuf::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Invokes `shrink_to` on the underlying instance of `OsString`.

## struct StripPrefixError

```rust
pub struct StripPrefixError(())
```

An error returned from `Path::strip_prefix` if the prefix was not found.

This `struct` is created by the `strip_prefix` method on `Path`.
See its documentation for more.

## Path::new

```rust
pub const fn new<S: [const] AsRef<OsStr> + ?Sized>(s: &S) -> &Path
```

Directly wraps a string slice as a `Path` slice.

This is a cost-free conversion.

# Examples

```rust
use std::path::Path;

Path::new("foo.txt");
```

You can create `Path`s from `String`s, or even other `Path`s:

```rust
use std::path::Path;

let string = String::from("foo.txt");
let from_string = Path::new(&string);
let from_path = Path::new(&from_string);
assert_eq!(from_string, from_path);
```

## Path::as_os_str

```rust
pub fn as_os_str(&self) -> &OsStr
```

Yields the underlying `OsStr` slice.

# Examples

```rust
use std::path::Path;

let os_str = Path::new("foo.txt").as_os_str();
assert_eq!(os_str, std::ffi::OsStr::new("foo.txt"));
```

## Path::as_mut_os_str

```rust
pub fn as_mut_os_str(&mut self) -> &mut OsStr
```

Yields a mutable reference to the underlying `OsStr` slice.

# Examples

```rust
use std::path::{Path, PathBuf};

let mut path = PathBuf::from("Foo.TXT");

assert_ne!(path, Path::new("foo.txt"));

path.as_mut_os_str().make_ascii_lowercase();
assert_eq!(path, Path::new("foo.txt"));
```

## Path::to_str

```rust
pub fn to_str(&self) -> Option<&str>
```

Yields a `&str` slice if the `Path` is valid unicode.

This conversion may entail doing a check for UTF-8 validity.
Note that validation is performed because non-UTF-8 strings are
perfectly valid for some OS.

# Examples

```rust
use std::path::Path;

let path = Path::new("foo.txt");
assert_eq!(path.to_str(), Some("foo.txt"));
```

## Path::to_string_lossy

```rust
pub fn to_string_lossy(&self) -> Cow<'_, str>
```

Converts a `Path` to a `Cow<str>`.

Any non-UTF-8 sequences are replaced with
`U+FFFD REPLACEMENT CHARACTER`[U+FFFD].

# Examples

Calling `to_string_lossy` on a `Path` with valid unicode:

```rust
use std::path::Path;

let path = Path::new("foo.txt");
assert_eq!(path.to_string_lossy(), "foo.txt");
```

Had `path` contained invalid unicode, the `to_string_lossy` call might
have returned `"fo�.txt"`.

## Path::to_path_buf

```rust
pub fn to_path_buf(&self) -> PathBuf
```

Converts a `Path` to an owned `PathBuf`.

# Examples

```rust
use std::path::{Path, PathBuf};

let path_buf = Path::new("foo.txt").to_path_buf();
assert_eq!(path_buf, PathBuf::from("foo.txt"));
```

## Path::is_absolute

```rust
pub fn is_absolute(&self) -> bool
```

Returns `true` if the `Path` is absolute, i.e., if it is independent of
the current directory.

* On Unix, a path is absolute if it starts with the root, so
`is_absolute` and `has_root` are equivalent.

* On Windows, a path is absolute if it has a prefix and starts with the
root: `c:\windows` is absolute, while `c:temp` and `\temp` are not.

# Examples

```rust
use std::path::Path;

assert!(!Path::new("foo.txt").is_absolute());
```

## Path::is_relative

```rust
pub fn is_relative(&self) -> bool
```

Returns `true` if the `Path` is relative, i.e., not absolute.

See `is_absolute`'s documentation for more details.

# Examples

```rust
use std::path::Path;

assert!(Path::new("foo.txt").is_relative());
```

## Path::has_root

```rust
pub fn has_root(&self) -> bool
```

Returns `true` if the `Path` has a root.

* On Unix, a path has a root if it begins with `/`.

* On Windows, a path has a root if it:
    * has no prefix and begins with a separator, e.g., `\windows`
    * has a prefix followed by a separator, e.g., `c:\windows` but not `c:windows`
    * has any non-disk prefix, e.g., `\\server\share`

# Examples

```rust
use std::path::Path;

assert!(Path::new("<example-value>").has_root());
```

## Path::parent

```rust
pub fn parent(&self) -> Option<&Path>
```

Returns the `Path` without its final component, if there is one.

This means it returns `Some("")` for relative paths with one component.

Returns `None` if the path terminates in a root or prefix, or if it's
the empty string.

# Examples

```rust
use std::path::Path;

let path = Path::new("/foo/bar");
let parent = path.parent().unwrap();
assert_eq!(parent, Path::new("/foo"));

let grand_parent = parent.parent().unwrap();
assert_eq!(grand_parent, Path::new("/"));
assert_eq!(grand_parent.parent(), None);

let relative_path = Path::new("foo/bar");
let parent = relative_path.parent();
assert_eq!(parent, Some(Path::new("foo")));
let grand_parent = parent.and_then(Path::parent);
assert_eq!(grand_parent, Some(Path::new("")));
let great_grand_parent = grand_parent.and_then(Path::parent);
assert_eq!(great_grand_parent, None);
```

## Path::ancestors

```rust
pub fn ancestors(&self) -> Ancestors<'_>
```

Produces an iterator over `Path` and its ancestors.

The iterator will yield the `Path` that is returned if the `parent` method is used zero
or more times. If the `parent` method returns `None`, the iterator will do likewise.
The iterator will always yield at least one value, namely `Some(&self)`. Next it will yield
`&self.parent()`, `&self.parent().and_then(Path::parent)` and so on.

# Examples

```rust
use std::path::Path;

let mut ancestors = Path::new("/foo/bar").ancestors();
assert_eq!(ancestors.next(), Some(Path::new("/foo/bar")));
assert_eq!(ancestors.next(), Some(Path::new("/foo")));
assert_eq!(ancestors.next(), Some(Path::new("/")));
assert_eq!(ancestors.next(), None);

let mut ancestors = Path::new("../foo/bar").ancestors();
assert_eq!(ancestors.next(), Some(Path::new("../foo/bar")));
assert_eq!(ancestors.next(), Some(Path::new("../foo")));
assert_eq!(ancestors.next(), Some(Path::new("..")));
assert_eq!(ancestors.next(), Some(Path::new("")));
assert_eq!(ancestors.next(), None);
```

## Path::file_name

```rust
pub fn file_name(&self) -> Option<&OsStr>
```

Returns the final component of the `Path`, if there is one.

If the path is a normal file, this is the file name. If it's the path of a directory, this
is the directory name.

Returns `None` if the path terminates in `..`.

# Examples

```rust
use std::path::Path;
use std::ffi::OsStr;

assert_eq!(Some(OsStr::new("bin")), Path::new("/usr/bin/").file_name());
assert_eq!(Some(OsStr::new("foo.txt")), Path::new("tmp/foo.txt").file_name());
assert_eq!(Some(OsStr::new("foo.txt")), Path::new("foo.txt/.").file_name());
assert_eq!(Some(OsStr::new("foo.txt")), Path::new("foo.txt/.//").file_name());
assert_eq!(None, Path::new("foo.txt/..").file_name());
assert_eq!(None, Path::new("/").file_name());
```

## Path::strip_prefix

```rust
pub fn strip_prefix<P>(&self, base: P) -> Result<&Path, StripPrefixError> where P: AsRef<Path>,
```

Returns a path that, when joined onto `base`, yields `self`.

# Errors

If `base` is not a prefix of `self` (i.e., `starts_with`
returns `false`), returns `Err`.

# Examples

```rust
use std::path::{Path, PathBuf};

let path = Path::new("/test/haha/foo.txt");

assert_eq!(path.strip_prefix("/"), Ok(Path::new("test/haha/foo.txt")));
assert_eq!(path.strip_prefix("/test"), Ok(Path::new("haha/foo.txt")));
assert_eq!(path.strip_prefix("/test/"), Ok(Path::new("haha/foo.txt")));
assert_eq!(path.strip_prefix("/test/haha/foo.txt"), Ok(Path::new("")));
assert_eq!(path.strip_prefix("/test/haha/foo.txt/"), Ok(Path::new("")));

assert!(path.strip_prefix("test").is_err());
assert!(path.strip_prefix("/te").is_err());
assert!(path.strip_prefix("/haha").is_err());

let prefix = PathBuf::from("/test/");
assert_eq!(path.strip_prefix(prefix), Ok(Path::new("haha/foo.txt")));
```

## Path::trim_prefix

```rust
pub fn trim_prefix<P>(&self, base: P) -> &Path where P: AsRef<Path>,
```

Returns a path with the optional prefix removed.

If `base` is not a prefix of `self` (i.e., `starts_with` returns `false`), returns the original path (`self`)

# Examples

```rust
use std::path::Path;

let path = Path::new("/test/haha/foo.txt");

// Prefix present - remove it
assert_eq!(path.trim_prefix("/"), Path::new("test/haha/foo.txt"));
assert_eq!(path.trim_prefix("/test"), Path::new("haha/foo.txt"));
assert_eq!(path.trim_prefix("/test/"), Path::new("haha/foo.txt"));
assert_eq!(path.trim_prefix("/test/haha/foo.txt"), Path::new(""));
assert_eq!(path.trim_prefix("/test/haha/foo.txt/"), Path::new(""));

// Prefix absent - return original
assert_eq!(path.trim_prefix("test"), path);
assert_eq!(path.trim_prefix("/te"), path);
assert_eq!(path.trim_prefix("/haha"), path);
```

## Path::starts_with

```rust
pub fn starts_with<P: AsRef<Path>>(&self, base: P) -> bool
```

Determines whether `base` is a prefix of `self`.

Only considers whole path components to match.

# Examples

```rust
use std::path::Path;

let path = Path::new("<example-value>");

assert!(path.starts_with("/etc"));
assert!(path.starts_with("/etc/"));
assert!(path.starts_with("<example-value>"));
assert!(path.starts_with("<example-value>")); // extra slash is okay
assert!(path.starts_with("<example-value>")); // multiple extra slashes are okay

assert!(!path.starts_with("/e"));
assert!(!path.starts_with("<example-value>"));

assert!(!Path::new("/etc/foo.rs").starts_with("/etc/foo"));
```

## Path::ends_with

```rust
pub fn ends_with<P: AsRef<Path>>(&self, child: P) -> bool
```

Determines whether `child` is a suffix of `self`.

Only considers whole path components to match.

# Examples

```rust
use std::path::Path;

let path = Path::new("/etc/resolv.conf");

assert!(path.ends_with("resolv.conf"));
assert!(path.ends_with("etc/resolv.conf"));
assert!(path.ends_with("/etc/resolv.conf"));

assert!(!path.ends_with("/resolv.conf"));
assert!(!path.ends_with("conf")); // use .extension() instead
```
