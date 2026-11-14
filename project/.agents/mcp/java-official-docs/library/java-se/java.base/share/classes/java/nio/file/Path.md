---
title: "Path interface (java.nio.file) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Path.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Path interface (java.nio.file)

```java
public interface Path extends Comparable<Path>, Iterable<Path>, Watchable
```

An object that may be used to locate a file in a file system. It will
typically represent a system dependent file path.

 A `Path` represents a path that is hierarchical and composed of a
sequence of directory and file name elements separated by a special separator
or delimiter. A *root component*, that identifies a file system
hierarchy, may also be present. The name element that is *farthest*
from the root of the directory hierarchy is the name of a file or directory.
The other name elements are directory names. A `Path` can represent a
root, a root and a sequence of names, or simply one or more name elements.
A `Path` is considered to be an *empty path* if it consists
solely of one name element that is empty. Accessing a file using an
*empty path* is equivalent to accessing the default directory of the
file system. `Path` defines the getFileName,
getParent, getRoot, and subpath methods to access the path components or a subsequence of its name
elements.

 In addition to accessing the components of a path, a `Path` also
defines the resolve and resolveSibling methods to combine paths. The relativize
method that can be used to construct a relative path between two paths.
Paths can be compared, and tested against each other using
the startsWith and endsWith methods.

 This interface extends `Watchable` interface so that a directory
located by a path can be registered with a `WatchService` and entries in the directory watched.

 **WARNING:** This interface is only intended to be implemented by
those developing custom file system implementations. Methods may be added to
this interface in future releases.

#### Accessing Files

 Paths may be used with the `Files` class to operate on files,
directories, and other types of files. For example, suppose we want a `java.io.BufferedReader` to read text from a file "`access.log`". The
file is located in a directory "`logs`" relative to the current working
directory and is UTF-8 encoded.

#### Interoperability

 Paths associated with the default provider are generally interoperable
with the java.io.File class. Paths created by other
providers are unlikely to be interoperable with the abstract path names
represented by `java.io.File`. The toPath
method may be used to obtain a `Path` from the abstract path name
represented by a `java.io.File` object. The resulting `Path` can
be used to operate on the same file as the `java.io.File` object. In
addition, the toFile method is useful to construct a `File` from the `String` representation of a `Path`.

#### Concurrency

 Implementations of this interface are immutable and safe for use by
multiple concurrent threads.

**Since:** 1.7

## Path.of(String, String...)

```java
public static Path of(String first, String... more)
```

Returns a `Path` by converting a path string, or a sequence of
strings that when joined form a path string. If `more` does not
specify any elements then the value of the `first` parameter is
the path string to convert. If `more` specifies one or more
elements then each non-empty string, including `first`, is
considered to be a sequence of name elements and is joined to form a
path string. The details as to how the Strings are joined is provider
specific but typically they will be joined using the
name-separator as the separator.
For example, if the name separator is "`/`" and
`getPath("/foo","bar","gus")` is invoked, then the path string
`"/foo/bar/gus"` is converted to a `Path`. A `Path`
representing an empty path is returned if `first` is the empty
string and `more` does not contain any non-empty strings.

 The `Path` is obtained by invoking the getPath method of the default `FileSystem`.

 Note that while this method is very convenient, using it will imply
an assumed reference to the default `FileSystem` and limit the
utility of the calling code. Hence it should not be used in library code
intended for flexible reuse. A more flexible alternative is to use an
existing `Path` instance as an anchor, such as:

Parameters:

- `first`: the path string or initial part of the path string
- `more`: additional strings to be joined to form the path string

**Returns:** the resulting `Path`

**See also:** FileSystem#getPath

**Since:** 11

Throws:

- `InvalidPathException`: if the path string cannot be converted to a `Path`

## Path.of(URI)

```java
public static Path of(URI uri)
```

Returns a `Path` by converting a URI.

 This method iterates over the installed providers to locate the provider that is identified by the
URI scheme of the given URI. URI schemes are
compared without regard to case. If the provider is found then its getPath method is invoked to convert the
URI.

 In the case of the default provider, identified by the URI scheme
"file", the given URI has a non-empty path component, and undefined query
and fragment components. Whether the authority component may be present
is platform specific. The returned `Path` is associated with the
default file system.

 The default provider provides a similar *round-trip* guarantee
to the `java.io.File` class. For a given `Path` *p* it
is guaranteed that
`Path.of(`*p*`.`toUri`()).equals(`
*p*`.`toAbsolutePath`())`

so long as the original `Path`, the `URI`, and the new `Path` are all created in (possibly different invocations of) the same
Java virtual machine. Whether other providers make any guarantees is
provider specific and therefore unspecified.

Parameters:

- `uri`: the URI to convert

**Returns:** the resulting `Path`

**Since:** 11

Throws:

- `IllegalArgumentException`: if preconditions on the `uri` parameter do not hold. The format of the URI is provider specific.
- `FileSystemNotFoundException`: The file system, identified by the URI, does not exist and cannot be created automatically, or the provider identified by the URI's scheme component is not installed

## Path.getFileSystem()

```java
FileSystem getFileSystem()
```

Returns the file system that created this object.

**Returns:** the file system that created this object

## Path.isAbsolute()

```java
boolean isAbsolute()
```

Tells whether or not this path is absolute.

 An absolute path is complete in that it doesn't need to be combined
with other path information in order to locate a file.

**Returns:** `true` if, and only if, this path is absolute

## Path.getRoot()

```java
Path getRoot()
```

Returns the root component of this path as a `Path` object,
or `null` if this path does not have a root component.

**Returns:** a path representing the root component of this path,
         or `null`

## Path.getFileName()

```java
Path getFileName()
```

Returns the name of the file or directory denoted by this path as a
`Path` object. The file name is the *farthest* element from
the root in the directory hierarchy.

**Returns:** a path representing the name of the file or directory, or
         `null` if this path has zero elements

## Path.getParent()

```java
Path getParent()
```

Returns the *parent path*, or `null` if this path does not
have a parent.

 The parent of this path object consists of this path's root
component, if any, and each element in the path except for the
*farthest* from the root in the directory hierarchy. This method
does not access the file system; the path or its parent may not exist.
Furthermore, this method does not eliminate special names such as "."
and ".." that may be used in some implementations. On UNIX for example,
the parent of "`/a/b/c`" is "`/a/b`", and the parent of
`"x/y/.`" is "`x/y`". This method may be used with the normalize method, to eliminate redundant names, for cases where
*shell-like* navigation is required.

 If this path has more than one element, and no root component, then
this method is equivalent to evaluating the expression:

**Returns:** a path representing the path's parent

## Path.getNameCount()

```java
int getNameCount()
```

Returns the number of name elements in the path.

**Returns:** the number of elements in the path, or `0` if this path
         only represents a root component

## Path.getName(int)

```java
Path getName(int index)
```

Returns a name element of this path as a `Path` object.

 The `index` parameter is the index of the name element to return.
The element that is *closest* to the root in the directory hierarchy
has index `0`. The element that is *farthest* from the root
has index count`-1`.

Parameters:

- `index`: the index of the element

**Returns:** the name element

Throws:

- `IllegalArgumentException`: if `index` is negative, `index` is greater than or equal to the number of elements, or this path has zero name elements

## Path.subpath(int, int)

```java
Path subpath(int beginIndex, int endIndex)
```

Returns a relative `Path` that is a subsequence of the name
elements of this path.

 The `beginIndex` and `endIndex` parameters specify the
subsequence of name elements. The name that is *closest* to the root
in the directory hierarchy has index `0`. The name that is
*farthest* from the root has index count`-1`. The returned `Path` object has the name elements
that begin at `beginIndex` and extend to the element at index `endIndex-1`.

Parameters:

- `beginIndex`: the index of the first element, inclusive
- `endIndex`: the index of the last element, exclusive

**Returns:** a new `Path` object that is a subsequence of the name
         elements in this `Path`

Throws:

- `IllegalArgumentException`: if `beginIndex` is negative, or greater than or equal to the number of elements. If `endIndex` is less than or equal to `beginIndex`, or larger than the number of elements.

## Path.startsWith(Path)

```java
boolean startsWith(Path other)
```

Tests if this path starts with the given path.

 This path *starts* with the given path if this path's root
component *starts* with the root component of the given path,
and this path starts with the same name elements as the given path.
If the given path has more name elements than this path then `false`
is returned.

 Whether or not the root component of this path starts with the root
component of the given path is file system specific. If this path does
not have a root component and the given path has a root component then
this path does not start with the given path.

 If the given path is associated with a different `FileSystem`
to this path then `false` is returned.

Parameters:

- `other`: the given path

**Returns:** `true` if this path starts with the given path; otherwise
         `false`

## Path.startsWith(String)

```java
default boolean startsWith(String other)
```

Tests if this path starts with a `Path`, constructed by converting
the given path string, in exactly the manner specified by the startsWith(Path) method. On UNIX for example, the path
"`foo/bar`" starts with "`foo`" and "`foo/bar`". It
does not start with "`f`" or "`fo`".

Parameters:

- `other`: the given path string

**Implementation requirements:** The default implementation is equivalent for this path to:

**Returns:** `true` if this path starts with the given path; otherwise
         `false`

Throws:

- `InvalidPathException`: If the path string cannot be converted to a Path.

## Path.endsWith(Path)

```java
boolean endsWith(Path other)
```

Tests if this path ends with the given path.

 If the given path has *N* elements, and no root component,
and this path has *N* or more elements, then this path ends with
the given path if the last *N* elements of each path, starting at
the element farthest from the root, are equal.

 If the given path has a root component then this path ends with the
given path if the root component of this path *ends with* the root
component of the given path, and the corresponding elements of both paths
are equal. Whether or not the root component of this path ends with the
root component of the given path is file system specific. If this path
does not have a root component and the given path has a root component
then this path does not end with the given path.

 If the given path is associated with a different `FileSystem`
to this path then `false` is returned.

Parameters:

- `other`: the given path

**Returns:** `true` if this path ends with the given path; otherwise
         `false`

## Path.endsWith(String)

```java
default boolean endsWith(String other)
```

Tests if this path ends with a `Path`, constructed by converting
the given path string, in exactly the manner specified by the endsWith(Path) method. On UNIX for example, the path
"`foo/bar`" ends with "`foo/bar`" and "`bar`". It does
not end with "`r`" or "`/bar`". Note that trailing separators
are not taken into account, and so invoking this method on the `Path` "`foo/bar`" with the `String` "`bar/`" returns
`true`.

Parameters:

- `other`: the given path string

**Implementation requirements:** The default implementation is equivalent for this path to:

**Returns:** `true` if this path ends with the given path; otherwise
         `false`

Throws:

- `InvalidPathException`: If the path string cannot be converted to a Path.

## Path.normalize()

```java
Path normalize()
```

Returns a path that is this path with redundant name elements eliminated.

 The precise definition of this method is implementation dependent but
in general it derives from this path, a path that does not contain
*redundant* name elements. In many file systems, the "`.`"
and "`..`" are special names used to indicate the current directory
and parent directory. In such file systems all occurrences of "`.`"
are considered redundant. If a "`..`" is preceded by a
non-"`..`" name then both names are considered redundant (the
process to identify such names is repeated until it is no longer
applicable).

 This method does not access the file system; the path may not locate
a file that exists. Eliminating "`..`" and a preceding name from a
path may result in the path that locates a different file than the original
path. This can arise when the preceding name is a symbolic link.

**Returns:** the resulting path or this path if it does not contain
         redundant name elements; an empty path is returned if this path
         does not have a root component and all name elements are redundant

**See also:** #getParent

**See also:** #toRealPath
