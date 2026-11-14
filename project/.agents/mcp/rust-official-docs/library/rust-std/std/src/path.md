---
title: "std::path (part 1 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/path.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::path

Cross-platform path manipulation.

This module provides two types, `PathBuf` and `Path` (akin to `String`
and `str`), for working with paths abstractly. These types are thin wrappers
around `OsString` and `OsStr` respectively, meaning that they work directly
on strings according to the local platform's path syntax.

Paths can be parsed into `Component`s by iterating over the structure
returned by the `components` method on `Path`. `Component`s roughly
correspond to the substrings between path separators (`/` or `\`). You can
reconstruct an equivalent path from components with the `push` method on
`PathBuf`; note that the paths may differ syntactically by the
normalization described in the documentation for the `components` method.

#### Case sensitivity

Unless otherwise indicated path methods that do not access the filesystem,
such as `Path::starts_with` and `Path::ends_with`, are case sensitive no
matter the platform or filesystem. An exception to this is made for Windows
drive letters.

#### Path normalization

Several methods in this module perform basic path normalization by disregarding
repeated separators, non-leading `.` components, and trailing separators. These include:
- Methods for iteration, such as `Path::components` and `Path::iter`
- Methods for inspection, such as `Path::has_root`
- Comparisons using `PartialEq`, `PartialOrd`, and `Ord`

`Path::join` and `PathBuf::push` also disregard trailing slashes.

These methods **do not** resolve `..` components or symlinks. For full normalization
including `..` resolution, use `Path::canonicalize` (which does access the filesystem).

#### Simple usage

Path manipulation includes both parsing components from slices and building
new owned paths.

To parse a path, you can create a `Path` slice from a `str`
slice and start asking questions:

```rust
use std::path::Path;
use std::ffi::OsStr;

let path = Path::new("/tmp/foo/bar.txt");

let parent = path.parent();
assert_eq!(parent, Some(Path::new("/tmp/foo")));

let file_stem = path.file_stem();
assert_eq!(file_stem, Some(OsStr::new("bar")));

let extension = path.extension();
assert_eq!(extension, Some(OsStr::new("txt")));
```

To build or modify paths, use `PathBuf`:

```rust
use std::path::PathBuf;

// This way works...
let mut path = PathBuf::from("c:\\");

path.push("windows");
path.push("system32");

path.set_extension("dll");

// ... but push is best used if you don't know everything up
// front. If you do, this way is better:
let path: PathBuf = ["c:\\", "windows", "system32.dll"].iter().collect();
```

## enum Prefix

```rust
pub enum Prefix<'a>
```

Windows path prefixes, e.g., `C:` or `\\server\share`.

Windows uses a variety of path prefix styles, including references to drive
volumes (like `C:`), network shared folders (like `\\server\share`), and
others. In addition, some path prefixes are "verbatim" (i.e., prefixed with
`\\?\`), in which case `/` is *not* treated as a separator and essentially
no normalization is performed.

# Examples

```rust
use std::path::{Component, Path, Prefix};
use std::path::Prefix::*;
use std::ffi::OsStr;

fn get_path_prefix(s: &str) -> Prefix<'_> {
    let path = Path::new(s);
    match path.components().next().unwrap() {
        Component::Prefix(prefix_component) => prefix_component.kind(),
        _ => panic!(),
    }
}

assert_eq!(Verbatim(OsStr::new("pictures")),
           get_path_prefix(r"\\?\pictures\kittens"));
assert_eq!(VerbatimUNC(OsStr::new("server"), OsStr::new("share")),
           get_path_prefix(r"\\?\UNC\server\share"));
assert_eq!(VerbatimDisk(b'C'), get_path_prefix(r"\\?\c:\"));
assert_eq!(DeviceNS(OsStr::new("BrainInterface")),
           get_path_prefix(r"\\.\BrainInterface"));
assert_eq!(UNC(OsStr::new("server"), OsStr::new("share")),
           get_path_prefix(r"\\server\share"));
assert_eq!(Disk(b'C'), get_path_prefix(r"C:\Users\Rust\Pictures\Ferris"));
```

## Prefix::is_verbatim

```rust
pub fn is_verbatim(&self) -> bool
```

Determines if the prefix is verbatim, i.e., begins with `\\?\`.

# Examples

```rust
use std::path::Prefix::*;
use std::ffi::OsStr;

assert!(Verbatim(OsStr::new("pictures")).is_verbatim());
assert!(VerbatimUNC(OsStr::new("server"), OsStr::new("share")).is_verbatim());
assert!(VerbatimDisk(b'C').is_verbatim());
assert!(!DeviceNS(OsStr::new("BrainInterface")).is_verbatim());
assert!(!UNC(OsStr::new("server"), OsStr::new("share")).is_verbatim());
assert!(!Disk(b'C').is_verbatim());
```

## fn is_separator

```rust
pub const fn is_separator(c: char) -> bool
```

Determines whether the character is one of the permitted path
separators for the current platform.

# Examples

```rust
use std::path;

assert!(path::is_separator('/')); // '/' works for both Unix and Windows
assert!(!path::is_separator('❤'));
```

## const MAIN_SEPARATOR

```rust
pub const MAIN_SEPARATOR: char = SEPARATORS[0]
```

The primary separator of path components for the current platform, represented as a `char`;
for example, this is `'/'` on Unix and `'\\'` on Windows.

## const MAIN_SEPARATOR_STR

```rust
pub const MAIN_SEPARATOR_STR: &str = SEPARATORS_STR[0]
```

The primary separator of path components for the current platform, represented as a `&str`;
for example, this is `"/"` on Unix and `"\\"` on Windows.

## struct PrefixComponent

```rust
pub struct PrefixComponent<'a>
```

A structure wrapping a Windows path prefix as well as its unparsed string
representation.

In addition to the parsed `Prefix` information returned by `kind`,
`PrefixComponent` also holds the raw and unparsed `OsStr` slice,
returned by `as_os_str`.

Instances of this `struct` can be obtained by matching against the
[`Prefix` variant] on `Component`.

Does not occur on Unix.

# Examples

```rust
use std::path::{Component, Path, Prefix};
use std::ffi::OsStr;

let path = Path::new(r"c:\you\later\");
match path.components().next().unwrap() {
    Component::Prefix(prefix_component) => {
        assert_eq!(Prefix::Disk(b'C'), prefix_component.kind());
        assert_eq!(OsStr::new("c:"), prefix_component.as_os_str());
    }
    _ => unreachable!(),
}
```

## PrefixComponent::kind

```rust
pub fn kind(&self) -> Prefix<'a>
```

Returns the parsed prefix data.

See `Prefix`'s documentation for more information on the different
kinds of prefixes.

## PrefixComponent::as_os_str

```rust
pub fn as_os_str(&self) -> &'a OsStr
```

Returns the raw `OsStr` slice for this prefix.

## enum Component

```rust
pub enum Component<'a>
```

A single component of a path.

A `Component` roughly corresponds to a substring between path separators
(`/` or `\`).

This `enum` is created by iterating over `Components`, which in turn is
created by the `components` method on `Path`.

# Examples

```rust
use std::path::{Component, Path};

let path = Path::new("/tmp/foo/bar.txt");
let components = path.components().collect::<Vec<_>>();
assert_eq!(&components, &[
    Component::RootDir,
    Component::Normal("tmp".as_ref()),
    Component::Normal("foo".as_ref()),
    Component::Normal("bar.txt".as_ref()),
]);
```

## Component::as_os_str

```rust
pub fn as_os_str(self) -> &'a OsStr
```

Extracts the underlying `OsStr` slice.

# Examples

```rust
use std::path::Path;

let path = Path::new("./tmp/foo/bar.txt");
let components: Vec<_> = path.components().map(|comp| comp.as_os_str()).collect();
assert_eq!(&components, &[".", "tmp", "foo", "bar.txt"]);
```

## struct Components

```rust
pub struct Components<'a>
```

An iterator over the `Component`s of a `Path`.

This `struct` is created by the `components` method on `Path`.
See its documentation for more.

# Examples

```rust
use std::path::Path;

let path = Path::new("/tmp/foo/bar.txt");

for component in path.components() {
    println!("{component:?}");
}
```

## struct Iter

```rust
pub struct Iter<'a>
```

An iterator over the `Component`s of a `Path`, as `OsStr` slices.

This `struct` is created by the `iter` method on `Path`.
See its documentation for more.

## Components::as_path

```rust
pub fn as_path(&self) -> &'a Path
```

Extracts a slice corresponding to the portion of the path remaining for iteration.

# Examples

```rust
use std::path::Path;

let mut components = Path::new("/tmp/foo/bar.txt").components();
components.next();
components.next();

assert_eq!(Path::new("foo/bar.txt"), components.as_path());
```

## Iter::as_path

```rust
pub fn as_path(&self) -> &'a Path
```

Extracts a slice corresponding to the portion of the path remaining for iteration.

# Examples

```rust
use std::path::Path;

let mut iter = Path::new("/tmp/foo/bar.txt").iter();
iter.next();
iter.next();

assert_eq!(Path::new("foo/bar.txt"), iter.as_path());
```

## struct Ancestors

```rust
pub struct Ancestors<'a>
```

An iterator over `Path` and its ancestors.

This `struct` is created by the `ancestors` method on `Path`.
See its documentation for more.

# Examples

```rust
use std::path::Path;

let path = Path::new("/foo/bar");

for ancestor in path.ancestors() {
    println!("{}", ancestor.display());
}
```

## ::PathBuf

```rust
pub struct PathBuf
```

An owned, mutable path (akin to `String`).

This type provides methods like `push` and `set_extension` that mutate
the path in place. It also implements `Deref` to `Path`, meaning that
all methods on `Path` slices are available on `PathBuf` values as well.

More details about the overall approach can be found in
the module documentation.

# Examples

You can use `push` to build up a `PathBuf` from
components:

```rust
use std::path::PathBuf;

let mut path = PathBuf::new();

path.push(r"C:\");
path.push("windows");
path.push("system32");

path.set_extension("dll");
```

However, `push` is best used for dynamic situations. This is a better way
to do this when you know all of the components ahead of time:

```rust
use std::path::PathBuf;

let path: PathBuf = [r"C:\", "windows", "system32.dll"].iter().collect();
```

We can still do better than this! Since these are all strings, we can use
`From::from`:

```rust
use std::path::PathBuf;

let path = PathBuf::from(r"C:\windows\system32.dll");
```

Which method works best depends on what kind of situation you're in.

Note that `PathBuf` does not always sanitize arguments, for example
`push` allows paths built from strings which include separators:

```rust
use std::path::PathBuf;

let mut path = PathBuf::new();

path.push(r"C:\");
path.push("windows");
path.push(r"..\otherdir");
path.push("system32");
```

The behavior of `PathBuf` may be changed to a panic on such inputs
in the future. `Extend::extend` should be used to add multi-part paths.

## PathBuf::new

```rust
pub const fn new() -> PathBuf
```

Allocates an empty `PathBuf`.

# Examples

```rust
use std::path::PathBuf;

let path = PathBuf::new();
```

## PathBuf::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> PathBuf
```

Creates a new `PathBuf` with a given capacity used to create the
internal `OsString`. See `with_capacity` defined on `OsString`.

# Examples

```rust
use std::path::PathBuf;

let mut path = PathBuf::with_capacity(10);
let capacity = path.capacity();

// This push is done without reallocating
path.push(r"C:\");

assert_eq!(capacity, path.capacity());
```

## PathBuf::as_path

```rust
pub fn as_path(&self) -> &Path
```

Coerces to a `Path` slice.

# Examples

```rust
use std::path::{Path, PathBuf};

let p = PathBuf::from("/test");
assert_eq!(Path::new("/test"), p.as_path());
```

## PathBuf::leak

```rust
pub fn leak<'a>(self) -> &'a mut Path
```

Consumes and leaks the `PathBuf`, returning a mutable reference to the contents,
`&'a mut Path`.

The caller has free choice over the returned lifetime, including 'static.
Indeed, this function is ideally used for data that lives for the remainder of
the program's life, as dropping the returned reference will cause a memory leak.

It does not reallocate or shrink the `PathBuf`, so the leaked allocation may include
unused capacity that is not part of the returned slice. If you want to discard excess
capacity, call `into_boxed_path`, and then `Box::leak` instead.
However, keep in mind that trimming the capacity may result in a reallocation and copy.

## PathBuf::push

```rust
pub fn push<P: AsRef<Path>>(&mut self, path: P)
```

Extends `self` with `path`.

If `path` is absolute, it replaces the current path.

On Windows:

* if `path` has a root but no prefix (e.g., `\windows`), it
  replaces everything except for the prefix (if any) of `self`.
* if `path` has a prefix but no root, it replaces `self`.
* if `self` has a verbatim prefix (e.g. `\\?\C:\windows`)
  and `path` is not empty, the new path is normalized: all references
  to `.` and `..` are removed.

Consider using `Path::join` if you need a new `PathBuf` instead of
using this function on a cloned `PathBuf`.

# Examples

Pushing a relative path extends the existing path:

```rust
use std::path::PathBuf;

let mut path = PathBuf::from("/tmp");
path.push("file.bk");
assert_eq!(path, PathBuf::from("/tmp/file.bk"));
```

Pushing an absolute path replaces the existing path:

```rust
use std::path::PathBuf;

let mut path = PathBuf::from("/tmp");
path.push("/etc");
assert_eq!(path, PathBuf::from("/etc"));
```

## PathBuf::pop

```rust
pub fn pop(&mut self) -> bool
```

Truncates `self` to `self.parent`.

Returns `false` and does nothing if `self.parent` is `None`.
Otherwise, returns `true`.

# Examples

```rust
use std::path::{Path, PathBuf};

let mut p = PathBuf::from("/spirited/away.rs");

p.pop();
assert_eq!(Path::new("/spirited"), p);
p.pop();
assert_eq!(Path::new("/"), p);
```

## PathBuf::set_file_name

```rust
pub fn set_file_name<S: AsRef<OsStr>>(&mut self, file_name: S)
```

Updates `self.file_name` to `file_name`.

If `self.file_name` was `None`, this is equivalent to pushing
`file_name`.

Otherwise it is equivalent to calling `pop` and then pushing
`file_name`. The new path will be a sibling of the original path.
(That is, it will have the same parent.)

The argument is not sanitized, so can include separators. This
behavior may be changed to a panic in the future.

# Examples

```rust
use std::path::PathBuf;

let mut buf = PathBuf::from("/");
assert!(buf.file_name() == None);

buf.set_file_name("foo.txt");
assert!(buf == PathBuf::from("/foo.txt"));
assert!(buf.file_name().is_some());

buf.set_file_name("bar.txt");
assert!(buf == PathBuf::from("/bar.txt"));

buf.set_file_name("baz");
assert!(buf == PathBuf::from("/baz"));

buf.set_file_name("../b/c.txt");
assert!(buf == PathBuf::from("/../b/c.txt"));

buf.set_file_name("baz");
assert!(buf == PathBuf::from("/../b/baz"));
```
