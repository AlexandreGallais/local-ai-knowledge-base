# std::path

Cross-platform path manipulation.

This module provides two types, [`PathBuf`] and [`Path`] (akin to [`String`]
and [`str`]), for working with paths abstractly. These types are thin wrappers
around [`OsString`] and [`OsStr`] respectively, meaning that they work directly
on strings according to the local platform's path syntax.

Paths can be parsed into [`Component`]s by iterating over the structure
returned by the [`components`] method on [`Path`]. [`Component`]s roughly
correspond to the substrings between path separators (`/` or `\`). You can
reconstruct an equivalent path from components with the [`push`] method on
[`PathBuf`]; note that the paths may differ syntactically by the
normalization described in the documentation for the [`components`] method.

## Case sensitivity

Unless otherwise indicated path methods that do not access the filesystem,
such as [`Path::starts_with`] and [`Path::ends_with`], are case sensitive no
matter the platform or filesystem. An exception to this is made for Windows
drive letters.

## Path normalization

Several methods in this module perform basic path normalization by disregarding
repeated separators, non-leading `.` components, and trailing separators. These include:
- Methods for iteration, such as [`Path::components`] and [`Path::iter`]
- Methods for inspection, such as [`Path::has_root`]
- Comparisons using [`PartialEq`], [`PartialOrd`], and [`Ord`]

[`Path::join`] and [`PathBuf::push`] also disregard trailing slashes.

These methods **do not** resolve `..` components or symlinks. For full normalization
including `..` resolution, use [`Path::canonicalize`] (which does access the filesystem).

## Simple usage

Path manipulation includes both parsing components from slices and building
new owned paths.

To parse a path, you can create a [`Path`] slice from a [`str`]
slice and start asking questions:

```
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

To build or modify paths, use [`PathBuf`]:

```
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

[`components`]: Path::components
[`push`]: PathBuf::push

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

```
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

# if cfg!(windows) {
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
# }
```

## Prefix::is_verbatim

```rust
pub fn is_verbatim(&self) -> bool
```

Determines if the prefix is verbatim, i.e., begins with `\\?\`.

# Examples

```
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

```
use std::path;

assert!(path::is_separator('/')); // '/' works for both Unix and Windows
assert!(!path::is_separator('❤'));
```

## const MAIN_SEPARATOR

```rust
pub const MAIN_SEPARATOR: char = SEPARATORS[0]
```

The primary separator of path components for the current platform, represented as a [`char`];
for example, this is `'/'` on Unix and `'\\'` on Windows.

## const MAIN_SEPARATOR_STR

```rust
pub const MAIN_SEPARATOR_STR: &str = SEPARATORS_STR[0]
```

The primary separator of path components for the current platform, represented as a [`&str`];
for example, this is `"/"` on Unix and `"\\"` on Windows.

## struct PrefixComponent

```rust
pub struct PrefixComponent<'a>
```

A structure wrapping a Windows path prefix as well as its unparsed string
representation.

In addition to the parsed [`Prefix`] information returned by [`kind`],
`PrefixComponent` also holds the raw and unparsed [`OsStr`] slice,
returned by [`as_os_str`].

Instances of this `struct` can be obtained by matching against the
[`Prefix` variant] on [`Component`].

Does not occur on Unix.

# Examples

```
# if cfg!(windows) {
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
# }
```

[`as_os_str`]: PrefixComponent::as_os_str
[`kind`]: PrefixComponent::kind
[`Prefix` variant]: Component::Prefix

## PrefixComponent::kind

```rust
pub fn kind(&self) -> Prefix<'a>
```

Returns the parsed prefix data.

See [`Prefix`]'s documentation for more information on the different
kinds of prefixes.

## PrefixComponent::as_os_str

```rust
pub fn as_os_str(&self) -> &'a OsStr
```

Returns the raw [`OsStr`] slice for this prefix.

## enum Component

```rust
pub enum Component<'a>
```

A single component of a path.

A `Component` roughly corresponds to a substring between path separators
(`/` or `\`).

This `enum` is created by iterating over [`Components`], which in turn is
created by the [`components`](Path::components) method on [`Path`].

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

Extracts the underlying [`OsStr`] slice.

# Examples

```
use std::path::Path;

let path = Path::new("./tmp/foo/bar.txt");
let components: Vec<_> = path.components().map(|comp| comp.as_os_str()).collect();
assert_eq!(&components, &[".", "tmp", "foo", "bar.txt"]);
```

## struct Components

```rust
pub struct Components<'a>
```

An iterator over the [`Component`]s of a [`Path`].

This `struct` is created by the [`components`] method on [`Path`].
See its documentation for more.

# Examples

```
use std::path::Path;

let path = Path::new("/tmp/foo/bar.txt");

for component in path.components() {
    println!("{component:?}");
}
```

[`components`]: Path::components

## struct Iter

```rust
pub struct Iter<'a>
```

An iterator over the [`Component`]s of a [`Path`], as [`OsStr`] slices.

This `struct` is created by the [`iter`] method on [`Path`].
See its documentation for more.

[`iter`]: Path::iter

## Components::as_path

```rust
pub fn as_path(&self) -> &'a Path
```

Extracts a slice corresponding to the portion of the path remaining for iteration.

# Examples

```
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

```
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

An iterator over [`Path`] and its ancestors.

This `struct` is created by the [`ancestors`] method on [`Path`].
See its documentation for more.

# Examples

```
use std::path::Path;

let path = Path::new("/foo/bar");

for ancestor in path.ancestors() {
    println!("{}", ancestor.display());
}
```

[`ancestors`]: Path::ancestors

## ::PathBuf

```rust
pub struct PathBuf
```

An owned, mutable path (akin to [`String`]).

This type provides methods like [`push`] and [`set_extension`] that mutate
the path in place. It also implements [`Deref`] to [`Path`], meaning that
all methods on [`Path`] slices are available on `PathBuf` values as well.

[`push`]: PathBuf::push
[`set_extension`]: PathBuf::set_extension

More details about the overall approach can be found in
the [module documentation](self).

# Examples

You can use [`push`] to build up a `PathBuf` from
components:

```
use std::path::PathBuf;

let mut path = PathBuf::new();

path.push(r"C:\");
path.push("windows");
path.push("system32");

path.set_extension("dll");
```

However, [`push`] is best used for dynamic situations. This is a better way
to do this when you know all of the components ahead of time:

```
use std::path::PathBuf;

let path: PathBuf = [r"C:\", "windows", "system32.dll"].iter().collect();
```

We can still do better than this! Since these are all strings, we can use
`From::from`:

```
use std::path::PathBuf;

let path = PathBuf::from(r"C:\windows\system32.dll");
```

Which method works best depends on what kind of situation you're in.

Note that `PathBuf` does not always sanitize arguments, for example
[`push`] allows paths built from strings which include separators:

```
use std::path::PathBuf;

let mut path = PathBuf::new();

path.push(r"C:\");
path.push("windows");
path.push(r"..\otherdir");
path.push("system32");
```

The behavior of `PathBuf` may be changed to a panic on such inputs
in the future. [`Extend::extend`] should be used to add multi-part paths.

## PathBuf::new

```rust
pub const fn new() -> PathBuf
```

Allocates an empty `PathBuf`.

# Examples

```
use std::path::PathBuf;

let path = PathBuf::new();
```

## PathBuf::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> PathBuf
```

Creates a new `PathBuf` with a given capacity used to create the
internal [`OsString`]. See [`with_capacity`] defined on [`OsString`].

# Examples

```
use std::path::PathBuf;

let mut path = PathBuf::with_capacity(10);
let capacity = path.capacity();

// This push is done without reallocating
path.push(r"C:\");

assert_eq!(capacity, path.capacity());
```

[`with_capacity`]: OsString::with_capacity

## PathBuf::as_path

```rust
pub fn as_path(&self) -> &Path
```

Coerces to a [`Path`] slice.

# Examples

```
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
capacity, call [`into_boxed_path`], and then [`Box::leak`] instead.
However, keep in mind that trimming the capacity may result in a reallocation and copy.

[`into_boxed_path`]: Self::into_boxed_path

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

Consider using [`Path::join`] if you need a new `PathBuf` instead of
using this function on a cloned `PathBuf`.

# Examples

Pushing a relative path extends the existing path:

```
use std::path::PathBuf;

let mut path = PathBuf::from("/tmp");
path.push("file.bk");
assert_eq!(path, PathBuf::from("/tmp/file.bk"));
```

Pushing an absolute path replaces the existing path:

```
use std::path::PathBuf;

let mut path = PathBuf::from("/tmp");
path.push("/etc");
assert_eq!(path, PathBuf::from("/etc"));
```

## PathBuf::pop

```rust
pub fn pop(&mut self) -> bool
```

Truncates `self` to [`self.parent`].

Returns `false` and does nothing if [`self.parent`] is [`None`].
Otherwise, returns `true`.

[`self.parent`]: Path::parent

# Examples

```
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

Updates [`self.file_name`] to `file_name`.

If [`self.file_name`] was [`None`], this is equivalent to pushing
`file_name`.

Otherwise it is equivalent to calling [`pop`] and then pushing
`file_name`. The new path will be a sibling of the original path.
(That is, it will have the same parent.)

The argument is not sanitized, so can include separators. This
behavior may be changed to a panic in the future.

[`self.file_name`]: Path::file_name
[`pop`]: PathBuf::pop

# Examples

```
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

## PathBuf::set_extension

```rust
pub fn set_extension<S: AsRef<OsStr>>(&mut self, extension: S) -> bool
```

Updates [`self.extension`] to `Some(extension)` or to `None` if
`extension` is empty.

Returns `false` and does nothing if [`self.file_name`] is [`None`],
returns `true` and updates the extension otherwise.

If [`self.extension`] is [`None`], the extension is added; otherwise
it is replaced.

If `extension` is the empty string, [`self.extension`] will be [`None`]
afterwards, not `Some("")`.

# Panics

Panics if the passed extension contains a path separator (see
[`is_separator`]).

# Caveats

The new `extension` may contain dots and will be used in its entirety,
but only the part after the final dot will be reflected in
[`self.extension`].

If the file stem contains internal dots and `extension` is empty, part
of the old file stem will be considered the new [`self.extension`].

See the examples below.

[`self.file_name`]: Path::file_name
[`self.extension`]: Path::extension

# Examples

```
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

Append [`self.extension`] with `extension`.

Returns `false` and does nothing if [`self.file_name`] is [`None`],
returns `true` and updates the extension otherwise.

# Panics

Panics if the passed extension contains a path separator (see
[`is_separator`]).

# Caveats

The appended `extension` may contain dots and will be used in its entirety,
but only the part after the final dot will be reflected in
[`self.extension`].

See the examples below.

[`self.file_name`]: Path::file_name
[`self.extension`]: Path::extension

# Examples

```
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

Yields a mutable reference to the underlying [`OsString`] instance.

# Examples

```
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

Consumes the `PathBuf`, yielding its internal [`OsString`] storage.

# Examples

```
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

```
use std::path::PathBuf;

let path_buf = PathBuf::from("foo");
let string = path_buf.into_string();
assert_eq!(string, Ok(String::from("foo")));
```

## PathBuf::into_boxed_path

```rust
pub fn into_boxed_path(self) -> Box<Path>
```

Converts this `PathBuf` into a [boxed](Box) [`Path`].

## PathBuf::capacity

```rust
pub fn capacity(&self) -> usize
```

Invokes [`capacity`] on the underlying instance of [`OsString`].

[`capacity`]: OsString::capacity

## PathBuf::clear

```rust
pub fn clear(&mut self)
```

Invokes [`clear`] on the underlying instance of [`OsString`].

[`clear`]: OsString::clear

## PathBuf::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Invokes [`reserve`] on the underlying instance of [`OsString`].

[`reserve`]: OsString::reserve

## PathBuf::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Invokes [`try_reserve`] on the underlying instance of [`OsString`].

[`try_reserve`]: OsString::try_reserve

## PathBuf::reserve_exact

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

Invokes [`reserve_exact`] on the underlying instance of [`OsString`].

[`reserve_exact`]: OsString::reserve_exact

## PathBuf::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Invokes [`try_reserve_exact`] on the underlying instance of [`OsString`].

[`try_reserve_exact`]: OsString::try_reserve_exact

## PathBuf::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Invokes [`shrink_to_fit`] on the underlying instance of [`OsString`].

[`shrink_to_fit`]: OsString::shrink_to_fit

## PathBuf::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Invokes [`shrink_to`] on the underlying instance of [`OsString`].

[`shrink_to`]: OsString::shrink_to

## struct StripPrefixError

```rust
pub struct StripPrefixError(())
```

An error returned from [`Path::strip_prefix`] if the prefix was not found.

This `struct` is created by the [`strip_prefix`] method on [`Path`].
See its documentation for more.

[`strip_prefix`]: Path::strip_prefix

## Path::new

```rust
pub const fn new<S: [const] AsRef<OsStr> + ?Sized>(s: &S) -> &Path
```

Directly wraps a string slice as a `Path` slice.

This is a cost-free conversion.

# Examples

```
use std::path::Path;

Path::new("foo.txt");
```

You can create `Path`s from `String`s, or even other `Path`s:

```
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

Yields the underlying [`OsStr`] slice.

# Examples

```
use std::path::Path;

let os_str = Path::new("foo.txt").as_os_str();
assert_eq!(os_str, std::ffi::OsStr::new("foo.txt"));
```

## Path::as_mut_os_str

```rust
pub fn as_mut_os_str(&mut self) -> &mut OsStr
```

Yields a mutable reference to the underlying [`OsStr`] slice.

# Examples

```
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

Yields a [`&str`] slice if the `Path` is valid unicode.

This conversion may entail doing a check for UTF-8 validity.
Note that validation is performed because non-UTF-8 strings are
perfectly valid for some OS.

[`&str`]: str

# Examples

```
use std::path::Path;

let path = Path::new("foo.txt");
assert_eq!(path.to_str(), Some("foo.txt"));
```

## Path::to_string_lossy

```rust
pub fn to_string_lossy(&self) -> Cow<'_, str>
```

Converts a `Path` to a [`Cow<str>`].

Any non-UTF-8 sequences are replaced with
[`U+FFFD REPLACEMENT CHARACTER`][U+FFFD].

[U+FFFD]: char::REPLACEMENT_CHARACTER

# Examples

Calling `to_string_lossy` on a `Path` with valid unicode:

```
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

Converts a `Path` to an owned [`PathBuf`].

# Examples

```
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
`is_absolute` and [`has_root`] are equivalent.

* On Windows, a path is absolute if it has a prefix and starts with the
root: `c:\windows` is absolute, while `c:temp` and `\temp` are not.

# Examples

```
use std::path::Path;

assert!(!Path::new("foo.txt").is_absolute());
```

[`has_root`]: Path::has_root

## Path::is_relative

```rust
pub fn is_relative(&self) -> bool
```

Returns `true` if the `Path` is relative, i.e., not absolute.

See [`is_absolute`]'s documentation for more details.

# Examples

```
use std::path::Path;

assert!(Path::new("foo.txt").is_relative());
```

[`is_absolute`]: Path::is_absolute

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

```
use std::path::Path;

assert!(Path::new("/etc/passwd").has_root());
```

## Path::parent

```rust
pub fn parent(&self) -> Option<&Path>
```

Returns the `Path` without its final component, if there is one.

This means it returns `Some("")` for relative paths with one component.

Returns [`None`] if the path terminates in a root or prefix, or if it's
the empty string.

# Examples

```
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

The iterator will yield the `Path` that is returned if the [`parent`] method is used zero
or more times. If the [`parent`] method returns [`None`], the iterator will do likewise.
The iterator will always yield at least one value, namely `Some(&self)`. Next it will yield
`&self.parent()`, `&self.parent().and_then(Path::parent)` and so on.

# Examples

```
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

[`parent`]: Path::parent

## Path::file_name

```rust
pub fn file_name(&self) -> Option<&OsStr>
```

Returns the final component of the `Path`, if there is one.

If the path is a normal file, this is the file name. If it's the path of a directory, this
is the directory name.

Returns [`None`] if the path terminates in `..`.

# Examples

```
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

If `base` is not a prefix of `self` (i.e., [`starts_with`]
returns `false`), returns [`Err`].

[`starts_with`]: Path::starts_with

# Examples

```
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

If `base` is not a prefix of `self` (i.e., [`starts_with`] returns `false`), returns the original path (`self`)

[`starts_with`]: Path::starts_with

# Examples

```
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

```
use std::path::Path;

let path = Path::new("/etc/passwd");

assert!(path.starts_with("/etc"));
assert!(path.starts_with("/etc/"));
assert!(path.starts_with("/etc/passwd"));
assert!(path.starts_with("/etc/passwd/")); // extra slash is okay
assert!(path.starts_with("/etc/passwd///")); // multiple extra slashes are okay

assert!(!path.starts_with("/e"));
assert!(!path.starts_with("/etc/passwd.txt"));

assert!(!Path::new("/etc/foo.rs").starts_with("/etc/foo"));
```

## Path::ends_with

```rust
pub fn ends_with<P: AsRef<Path>>(&self, child: P) -> bool
```

Determines whether `child` is a suffix of `self`.

Only considers whole path components to match.

# Examples

```
use std::path::Path;

let path = Path::new("/etc/resolv.conf");

assert!(path.ends_with("resolv.conf"));
assert!(path.ends_with("etc/resolv.conf"));
assert!(path.ends_with("/etc/resolv.conf"));

assert!(!path.ends_with("/resolv.conf"));
assert!(!path.ends_with("conf")); // use .extension() instead
```

## Path::is_empty

```rust
pub fn is_empty(&self) -> bool
```

Checks whether the `Path` is empty.

Passing an empty path to most OS filesystem APIs will always result in an error.

[Pushing][PathBuf::push] an empty path to an existing path will append a directory separator unless it already ends with a separator or the existing path is itself empty.

# Examples

```
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

Extracts the stem (non-extension) portion of [`self.file_name`].

[`self.file_name`]: Path::file_name

The stem is:

* [`None`], if there is no file name;
* The entire file name if there is no embedded `.`;
* The entire file name if the file name begins with `.` and has no other `.`s within;
* Otherwise, the portion of the file name before the final `.`

# Examples

```
use std::path::Path;

assert_eq!("foo", Path::new("foo.rs").file_stem().unwrap());
assert_eq!("foo.tar", Path::new("foo.tar.gz").file_stem().unwrap());
```

# See Also
This method is similar to [`Path::file_prefix`], which extracts the portion of the file name
before the *first* `.`

[`Path::file_prefix`]: Path::file_prefix

## Path::file_prefix

```rust
pub fn file_prefix(&self) -> Option<&OsStr>
```

Extracts the prefix of [`self.file_name`].

The prefix is:

* [`None`], if there is no file name;
* The entire file name if there is no embedded `.`;
* The portion of the file name before the first non-beginning `.`;
* The entire file name if the file name begins with `.` and has no other `.`s within;
* The portion of the file name before the second `.` if the file name begins with `.`

[`self.file_name`]: Path::file_name

# Examples

```
use std::path::Path;

assert_eq!("foo", Path::new("foo.rs").file_prefix().unwrap());
assert_eq!("foo", Path::new("foo.tar.gz").file_prefix().unwrap());
assert_eq!(".config", Path::new(".config").file_prefix().unwrap());
assert_eq!(".config", Path::new(".config.toml").file_prefix().unwrap());
```

# See Also
This method is similar to [`Path::file_stem`], which extracts the portion of the file name
before the *last* `.`

[`Path::file_stem`]: Path::file_stem

## Path::extension

```rust
pub fn extension(&self) -> Option<&OsStr>
```

Extracts the extension (without the leading dot) of [`self.file_name`], if possible.

The extension is:

* [`None`], if there is no file name;
* [`None`], if there is no embedded `.`;
* [`None`], if the file name begins with `.` and has no other `.`s within;
* Otherwise, the portion of the file name after the final `.`

[`self.file_name`]: Path::file_name

# Examples

```
use std::path::Path;

assert_eq!("rs", Path::new("foo.rs").extension().unwrap());
assert_eq!("gz", Path::new("foo.tar.gz").extension().unwrap());
```

## Path::join

```rust
pub fn join<P: AsRef<Path>>(&self, path: P) -> PathBuf
```

Creates an owned [`PathBuf`] with `path` adjoined to `self`.

If `path` is absolute, it replaces the current path.

On Windows:

* if `path` has a root but no prefix (e.g., `\windows`), it
  replaces and returns everything except for the prefix (if any) of `self`.
* if `path` has a prefix but no root, `self` is ignored and `path` is returned.
* if `self` has a verbatim prefix (e.g. `\\?\C:\windows`)
  and `path` is not empty, the new path is normalized: all references
  to `.` and `..` are removed.

See [`PathBuf::push`] for more details on what it means to adjoin a path.

# Examples

```
use std::path::{Path, PathBuf};

assert_eq!(Path::new("/etc").join("passwd"), PathBuf::from("/etc/passwd"));
assert_eq!(Path::new("/etc").join("/bin/sh"), PathBuf::from("/bin/sh"));
```

## Path::with_file_name

```rust
pub fn with_file_name<S: AsRef<OsStr>>(&self, file_name: S) -> PathBuf
```

Creates an owned [`PathBuf`] like `self` but with the given file name.

See [`PathBuf::set_file_name`] for more details.

# Examples

```
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

Creates an owned [`PathBuf`] like `self` but with the given extension.

See [`PathBuf::set_extension`] for more details.

# Examples

```
use std::path::Path;

let path = Path::new("foo.rs");
assert_eq!(path.with_extension("txt"), Path::new("foo.txt"));
assert_eq!(path.with_extension(""), Path::new("foo"));
```

Handling multiple extensions:

```
use std::path::Path;

let path = Path::new("foo.tar.gz");
assert_eq!(path.with_extension("xz"), Path::new("foo.tar.xz"));
assert_eq!(path.with_extension("").with_extension("txt"), Path::new("foo.txt"));
```

Adding an extension where one did not exist:

```
use std::path::Path;

let path = Path::new("foo");
assert_eq!(path.with_extension("rs"), Path::new("foo.rs"));
```

## Path::with_added_extension

```rust
pub fn with_added_extension<S: AsRef<OsStr>>(&self, extension: S) -> PathBuf
```

Creates an owned [`PathBuf`] like `self` but with the extension added.

See [`PathBuf::add_extension`] for more details. The return value of
[`PathBuf::add_extension`] is ignored, which means no extension
will be added to paths with no [`Path::file_name`].

# Examples

```
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

Produces an iterator over the [`Component`]s of the path.

When parsing the path, there is a small amount of normalization:

* Repeated separators are ignored, so `a/b` and `a//b` both have
  `a` and `b` as components.

* Occurrences of `.` are normalized away, except if they are at the
  beginning of the path. For example, `a/./b`, `a/b/`, `a/b/.` and
  `a/b` all have `a` and `b` as components, but `./a/b` starts with
  an additional [`CurDir`] component.

* Trailing separators are normalized away, so `/a/b` and `/a/b/` are equivalent.

Note that no other normalization takes place; in particular, `a/c`
and `a/b/../c` are distinct, to account for the possibility that `b`
is a symbolic link (so its parent isn't `a`).

# Examples

```
use std::path::{Path, Component};
use std::ffi::OsStr;

let mut components = Path::new("/tmp/foo.txt").components();

assert_eq!(components.next(), Some(Component::RootDir));
assert_eq!(components.next(), Some(Component::Normal(OsStr::new("tmp"))));
assert_eq!(components.next(), Some(Component::Normal(OsStr::new("foo.txt"))));
assert_eq!(components.next(), None)
```

[`CurDir`]: Component::CurDir

## Path::iter

```rust
pub fn iter(&self) -> Iter<'_>
```

Produces an iterator over the path's components viewed as [`OsStr`]
slices.

For more information about the particulars of how the path is separated
into components, see [`components`].

[`components`]: Path::components

# Examples

```
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

Returns an object that implements [`Display`] for safely printing paths
that may contain non-Unicode data. This may perform lossy conversion,
depending on the platform.  If you would like an implementation which
escapes the path please use [`Debug`] instead.

[`Display`]: fmt::Display
[`Debug`]: fmt::Debug

# Examples

```
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

This is an alias to [`fs::metadata`].

# Examples

```no_run
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

This is an alias to [`fs::symlink_metadata`].

# Examples

```no_run
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

This is an alias to [`fs::canonicalize`].

# Errors

This method will return an error in the following situations, but is not
limited to just these cases:

* `path` does not exist.
* A non-final component in path is not a directory.

# Examples

```no_run
use std::path::{Path, PathBuf};

let path = Path::new("/foo/test/../test/bar.rs");
assert_eq!(path.canonicalize().unwrap(), PathBuf::from("/foo/test/bar.rs"));
```

## Path::read_link

```rust
pub fn read_link(&self) -> io::Result<PathBuf>
```

Reads a symbolic link, returning the file that the link points to.

This is an alias to [`fs::read_link`].

# Examples

```no_run
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

This is an alias to [`fs::read_dir`].

# Examples

```no_run
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

Warning: this method may be error-prone, consider using [`try_exists()`] instead!
It also has a risk of introducing time-of-check to time-of-use ([TOCTOU]) bugs.

This function will traverse symbolic links to query information about the
destination file.

If you cannot access the metadata of the file, e.g. because of a
permission error or broken symbolic links, this will return `false`.

# Examples

```no_run
use std::path::Path;
assert!(!Path::new("does_not_exist.txt").exists());
```

# See Also

This is a convenience function that coerces errors to false. If you want to
check errors, call [`Path::try_exists`].

[`try_exists()`]: Self::try_exists
[TOCTOU]: fs#time-of-check-to-time-of-use-toctou

## Path::try_exists

```rust
pub fn try_exists(&self) -> io::Result<bool>
```

Returns `Ok(true)` if the path points at an existing entity.

This function will traverse symbolic links to query information about the
destination file. In case of broken symbolic links this will return `Ok(false)`.

[`Path::exists()`] only checks whether or not a path was both found and readable. By
contrast, `try_exists` will return `Ok(true)` or `Ok(false)`, respectively, if the path
was _verified_ to exist or not exist. If its existence can neither be confirmed nor
denied, it will propagate an `Err(_)` instead. This can be the case if e.g. listing
permission is denied on one of the parent directories.

Note that while this avoids some pitfalls of the `exists()` method, it still can not
prevent time-of-check to time-of-use ([TOCTOU]) bugs. You should only use it in scenarios
where those bugs are not an issue.

This is an alias for [`std::fs::exists`](crate::fs::exists).

# Examples

```no_run
use std::path::Path;
assert!(!Path::new("does_not_exist.txt").try_exists().expect("the path's existence should be verifiable"));
assert!(Path::new("/root/secret_file.txt").try_exists().is_err());
```

[TOCTOU]: fs#time-of-check-to-time-of-use-toctou
[`exists()`]: Self::exists

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

```no_run
use std::path::Path;
assert_eq!(Path::new("./is_a_directory/").is_file(), false);
assert_eq!(Path::new("a_file.txt").is_file(), true);
```

# See Also

This is a convenience function that coerces errors to false. If you want to
check errors, call [`fs::metadata`] and handle its [`Result`]. Then call
[`fs::Metadata::is_file`] if it was [`Ok`].

When the goal is simply to read from (or write to) the source, the most
reliable way to test the source can be read (or written to) is to open
it. Only using `is_file` can break workflows like `diff <( prog_a )` on
a Unix-like system for example. See [`fs::File::open`] or
[`fs::OpenOptions::open`] for more information.

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

```no_run
use std::path::Path;
assert_eq!(Path::new("./is_a_directory/").is_dir(), true);
assert_eq!(Path::new("a_file.txt").is_dir(), false);
```

# See Also

This is a convenience function that coerces errors to false. If you want to
check errors, call [`fs::metadata`] and handle its [`Result`]. Then call
[`fs::Metadata::is_dir`] if it was [`Ok`].

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

```rust,no_run
# #[cfg(unix)] {
use std::path::Path;
use std::os::unix::fs::symlink;

let link_path = Path::new("link");
symlink("/origin_does_not_exist/", link_path).unwrap();
assert_eq!(link_path.is_symlink(), true);
assert_eq!(link_path.exists(), false);
# }
```

# See Also

This is a convenience function that coerces errors to false. If you want to
check errors, call [`fs::symlink_metadata`] and handle its [`Result`]. Then call
[`fs::Metadata::is_symlink`] if it was [`Ok`].

## Path::into_path_buf

```rust
pub fn into_path_buf(self: Box<Self>) -> PathBuf
```

Converts a [`Box<Path>`](Box) into a [`PathBuf`] without copying or
allocating.

## struct Display

```rust
pub struct Display<'a>
```

Helper struct for safely printing paths with [`format!`] and `{}`.

A [`Path`] might contain non-Unicode data. This `struct` implements the
[`Display`] trait in a way that mitigates that. It is created by the
[`display`](Path::display) method on [`Path`]. This may perform lossy
conversion, depending on the platform. If you would like an implementation
which escapes the path please use [`Debug`] instead.

# Examples

```
use std::path::Path;

let path = Path::new("/tmp/foo.rs");

println!("{}", path.display());
```

[`Display`]: fmt::Display
[`format!`]: crate::format

## ::absolute

```rust
pub fn absolute<P: AsRef<Path>>(path: P) -> io::Result<PathBuf>
```

Makes the path absolute without accessing the filesystem.

If the path is relative, the current directory is used as the base directory.
All intermediate components will be resolved according to platform-specific
rules, but unlike [`canonicalize`][crate::fs::canonicalize], this does not
resolve symlinks and may succeed even if the path does not exist.

If the `path` is empty or getting the
[current directory][crate::env::current_dir] fails, then an error will be
returned.

# Platform-specific behavior

On POSIX platforms, the path is resolved using [POSIX semantics][posix-semantics],
except that it stops short of resolving symlinks. This means it will keep `..`
components and trailing separators.

On Windows, for verbatim paths, this will simply return the path as given. For other
paths, this is currently equivalent to calling
[`GetFullPathNameW`][windows-path].

On Cygwin, this is currently equivalent to calling [`cygwin_conv_path`][cygwin-path]
with mode `CCP_WIN_A_TO_POSIX`, and then being processed like other POSIX platforms.
If a Windows path is given, it will be converted to an absolute POSIX path without
keeping `..`.

Note that these [may change in the future][changes].

# Errors

This function may return an error in the following situations:

* If `path` is syntactically invalid; in particular, if it is empty.
* If getting the [current directory][crate::env::current_dir] fails.

# Examples

## POSIX paths

```
# #[cfg(unix)]
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
# #[cfg(not(unix))]
# fn main() {}
```

## Windows paths

```
# #[cfg(windows)]
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
# #[cfg(not(windows))]
# fn main() {}
```

Note that this [may change in the future][changes].

[changes]: io#platform-specific-behavior
[posix-semantics]: https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap04.html#tag_04_16
[windows-path]: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getfullpathnamew
[cygwin-path]: https://cygwin.com/cygwin-api/func-cygwin-conv-path.html