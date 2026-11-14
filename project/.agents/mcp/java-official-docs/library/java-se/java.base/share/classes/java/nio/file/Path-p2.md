---
title: "Path interface (java.nio.file) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Path.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Path interface (java.nio.file) (part 2 of 3)

## Path.resolve(Path)

```java
Path resolve(Path other)
```

Resolve the given path against this path.

 If the `other` parameter is an absolute
path then this method trivially returns `other`. If `other`
is an *empty path* then this method trivially returns this path.
Otherwise this method considers this path to be a directory and resolves
the given path against this path. In the simplest case, the given path
does not have a root component, in which case this method
*joins* the given path to this path and returns a resulting path
that ends with the given path. Where the given path has
a root component then resolution is highly implementation dependent and
therefore unspecified.

Parameters:

- `other`: the path to resolve against this path

**Returns:** the resulting path

**See also:** #relativize

## Path.resolve(String)

```java
default Path resolve(String other)
```

Converts a given path string to a `Path` and resolves it against
this `Path` in exactly the manner specified by the resolve method. For example, suppose that the name
separator is "`/`" and a path represents "`foo/bar`", then
invoking this method with the path string "`gus`" will result in
the `Path` "`foo/bar/gus`".

Parameters:

- `other`: the path string to resolve against this path

**Implementation requirements:** The default implementation is equivalent for this path to:

**Returns:** the resulting path

**See also:** FileSystem#getPath

Throws:

- `InvalidPathException`: if the path string cannot be converted to a Path.

## Path.resolve(Path, Path...)

```java
default Path resolve(Path first, Path... more)
```

Resolves a path against this path, and then iteratively resolves any
additional paths.

 This method resolves `first` against this `Path` as if
by calling `resolve(Path)`. If `more` has one or more
elements then it resolves the first element against the result, then
iteratively resolves all subsequent elements. This method returns the
result from the final resolve.

Parameters:

- `first`: the first path to resolve against this path
- `more`: additional paths to iteratively resolve

**Implementation requirements:** The default implementation is equivalent to the result obtained with:

**Returns:** the resulting path

**See also:** #resolve(Path)

**Since:** 22

## Path.resolve(String, String...)

```java
default Path resolve(String first, String... more)
```

Converts a path string to a path, resolves that path against this path,
and then iteratively performs the same procedure for any additional
path strings.

 This method converts `first` to a `Path` and resolves
that `Path` against this `Path` as if by calling
`resolve(String)`. If `more` has one or more elements
then it converts the first element to a path, resolves that path against
the result, then iteratively converts and resolves all subsequent
elements. This method returns the result from the final resolve.

Parameters:

- `first`: the first path string to convert to a path and resolve against this path
- `more`: additional path strings to be iteratively converted to paths and resolved

**Implementation requirements:** The default implementation is equivalent to the result obtained with:

**Returns:** the resulting path

**See also:** #resolve(Path,Path...)

**See also:** #resolve(String)

**Since:** 22

Throws:

- `InvalidPathException`: if a path string cannot be converted to a Path.

## Path.resolveSibling(Path)

```java
default Path resolveSibling(Path other)
```

Resolves the given path against this path's parent
path. This is useful where a file name needs to be *replaced* with
another file name. For example, suppose that the name separator is
"`/`" and a path represents "`dir1/dir2/foo`", then invoking
this method with the `Path` "`bar`" will result in the `Path` "`dir1/dir2/bar`". If this path does not have a parent path,
or `other` is absolute, then this method
returns `other`. If `other` is an empty path then this method
returns this path's parent, or where this path doesn't have a parent, the
empty path.

Parameters:

- `other`: the path to resolve against this path's parent

**Implementation requirements:** The default implementation is equivalent for this path to:

unless `other == null`, in which case a
`NullPointerException` is thrown.

**Returns:** the resulting path

**See also:** #resolve(Path)

## Path.resolveSibling(String)

```java
default Path resolveSibling(String other)
```

Converts a given path string to a `Path` and resolves it against
this path's parent path in exactly the manner
specified by the resolveSibling method.

Parameters:

- `other`: the path string to resolve against this path's parent

**Implementation requirements:** The default implementation is equivalent for this path to:

**Returns:** the resulting path

**See also:** FileSystem#getPath

Throws:

- `InvalidPathException`: if the path string cannot be converted to a Path.

## Path.relativize(Path)

```java
Path relativize(Path other)
```

Constructs a relative path between this path and a given path.

 Relativization is the inverse of resolution.
This method attempts to construct a relative path
that when resolved against this path, yields a
path that locates the same file as the given path. For example, on UNIX,
if this path is `"/a/b"` and the given path is `"/a/b/c/d"`
then the resulting relative path would be `"c/d"`. Where this
path and the given path do not have a root component,
then a relative path can be constructed. A relative path cannot be
constructed if only one of the paths have a root component. Where both
paths have a root component then it is implementation dependent if a
relative path can be constructed. If this path and the given path are
equal then an *empty path* is returned.

 For any two normalized paths *p* and
*q*, where *q* does not have a root component,

  *p*`.relativize(`*p*
  `.resolve(`*q*`)).equals(`*q*`)`

 When symbolic links are supported, then whether the resulting path,
when resolved against this path, yields a path that can be used to locate
the same file as `other` is implementation
dependent. For example, if this path is  `"/a/b"` and the given
path is `"/a/x"` then the resulting relative path may be `"../x"`. If `"b"` is a symbolic link then is implementation
dependent if `"a/b/../x"` would locate the same file as `"/a/x"`.

Parameters:

- `other`: the path to relativize against this path

**Returns:** the resulting relative path, or an empty path if both paths are
         equal

Throws:

- `IllegalArgumentException`: if `other` is not a `Path` that can be relativized against this path

## Path.toUri()

```java
URI toUri()
```

Returns a URI to represent this path.

 This method constructs an absolute `URI` with a scheme equal to the URI scheme that identifies the
provider. The exact form of the scheme specific part is highly provider
dependent.

 In the case of the default provider, the URI is hierarchical with
a path component that is absolute. The query and
fragment components are undefined. Whether the authority component is
defined or not is implementation dependent. There is no guarantee that
the `URI` may be used to construct a java.io.File.
In particular, if this path represents a Universal Naming Convention (UNC)
path, then the UNC server name may be encoded in the authority component
of the resulting URI. In the case of the default provider, and the file
exists, and it can be determined that the file is a directory, then the
resulting `URI` will end with a slash.

 The default provider provides a similar *round-trip* guarantee
to the `java.io.File` class. For a given `Path` *p* it
is guaranteed that

Path.of`(`*p*`.toUri()).equals(`*p*
`.`toAbsolutePath`())`

so long as the original `Path`, the `URI`, and the new `Path` are all created in (possibly different invocations of) the same
Java virtual machine. Whether other providers make any guarantees is
provider specific and therefore unspecified.

 When a file system is constructed to access the contents of a file
as a file system then it is highly implementation specific if the returned
URI represents the given path in the file system or it represents a
*compound* URI that encodes the URI of the enclosing file system.
A format for compound URIs is not defined in this release; such a scheme
may be added in a future release.

**Returns:** the URI representing this path

Throws:

- `java.io.IOError`: if an I/O error occurs obtaining the absolute path, or where a file system is constructed to access the contents of a file as a file system, and the URI of the enclosing file system cannot be obtained

## Path.toAbsolutePath()

```java
Path toAbsolutePath()
```

Returns a `Path` object representing the absolute path of this
path. Where this `Path` is associated with the default provider,
then the returned absolute path will have a non-`null`
root component.

 If this path is already absolute then this
method simply returns this path. Otherwise, this method resolves the path
in an implementation dependent manner, typically by resolving the path
against a file system default directory. Depending on the implementation,
this method may throw an I/O error if the file system is not accessible.

**Returns:** a `Path` object representing the absolute path

Throws:

- `java.io.IOError`: if an I/O error occurs

## Path.toRealPath(LinkOption...)

```java
Path toRealPath(LinkOption... options) throws IOException
```

Returns the *real* path of an existing file.

 The precise definition of this method is implementation dependent but
in general it derives from this path, an absolute
path that locates the same file as this path, but
with name elements that represent the actual name of the directories
and the file. For example, where filename comparisons on a file system
are case insensitive then the name elements represent the names in their
actual case. Additionally, the resulting path has redundant name
elements removed.

 If this path is relative then its absolute path is first obtained,
as if by invoking the toAbsolutePath method.

 The `options` array may be used to indicate how symbolic links
are handled. By default, symbolic links are resolved to their final
target. If the option NOFOLLOW_LINKS is
present then this method does not resolve symbolic links.

Some implementations allow special names such as "`..`" to refer to
the parent directory. When deriving the *real path*, and a
"`..`" (or equivalent) is preceded by a non-"`..`" name then
an implementation will typically cause both names to be removed. When
not resolving symbolic links and the preceding name is a symbolic link
then the names are only removed if it is guaranteed that the resulting
path will locate the same file as this path.

Parameters:

- `options`: options indicating how symbolic links are handled

**Returns:** an absolute path represent the *real* path of the file
         located by this object

Throws:

- `IOException`: if the file does not exist or an I/O error occurs

## Path.toFile()

```java
default File toFile()
```

Returns a `File` object representing this path. Where this `Path` is associated with the default provider, then this method is
equivalent to returning a `File` object constructed with the
`String` representation of this path.

 If this path was created by invoking the `File` toPath method then there is no guarantee that the `File` object returned by this method is equal to the
original `File`.

**Implementation requirements:** The default implementation is equivalent for this path to:

if the `FileSystem` which created this `Path` is the default
file system; otherwise an `UnsupportedOperationException` is
thrown.

**Returns:** a `File` object representing this path

Throws:

- `UnsupportedOperationException`: if this `Path` is not associated with the default provider

## Path.register(WatchService, WatchEvent.Kind<?>[], WatchEvent.Modifier...)

```java
WatchKey register(WatchService watcher, WatchEvent.Kind<?>[] events, WatchEvent.Modifier... modifiers) throws IOException
```

Registers the file located by this path with a watch service.

 In this release, this path locates a directory that exists. The
directory is registered with the watch service so that entries in the
directory can be watched. The `events` parameter is the events to
register and may contain the following events:

- ENTRY_CREATE -
      entry created or moved into the directory

- ENTRY_DELETE -
       entry deleted or moved out of the directory

- ENTRY_MODIFY -
       entry in directory was modified

 The context for these events is the
relative path between the directory located by this path, and the path
that locates the directory entry that is created, deleted, or modified.

 The set of events may include additional implementation specific
event that are not defined by the enum `StandardWatchEventKinds`

 The `modifiers` parameter specifies *modifiers* that
qualify how the directory is registered. This release does not define any
*standard* modifiers. It may contain implementation specific
modifiers.

 Where a file is registered with a watch service by means of a symbolic
link then it is implementation specific if the watch continues to depend
on the existence of the symbolic link after it is registered.

Parameters:

- `watcher`: the watch service to which this object is to be registered
- `events`: the events for which this object should be registered
- `modifiers`: the modifiers, if any, that modify how the object is registered

**Returns:** a key <example-value> the registration of this object with the
         given watch service

Throws:

- `UnsupportedOperationException`: if unsupported events or modifiers are specified
- `IllegalArgumentException`: if an invalid combination of events or modifiers is specified
- `ClosedWatchServiceException`: if the watch service is closed
- `NotDirectoryException`: if the file is registered to watch the entries in a directory and the file is not a directory *(optional specific exception)*
- `IOException`: if an I/O error occurs
