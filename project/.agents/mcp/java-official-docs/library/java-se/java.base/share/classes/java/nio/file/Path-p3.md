---
title: "Path interface (java.nio.file) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Path.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Path interface (java.nio.file) (part 3 of 3)

## Path.register(WatchService, WatchEvent.Kind<?>...)

```java
default WatchKey register(WatchService watcher, WatchEvent.Kind<?>... events) throws IOException
```

Registers the file located by this path with a watch service.

 An invocation of this method behaves in exactly the same way as the
invocation

 **Usage Example:**
Suppose we wish to register a directory for entry create, delete, and modify
events:

Parameters:

- `watcher`: The watch service to which this object is to be registered
- `events`: The events for which this object should be registered

**Implementation requirements:** The default implementation is equivalent for this path to:

**Returns:** A key <example-value> the registration of this object with the
         given watch service

Throws:

- `UnsupportedOperationException`: If unsupported events are specified
- `IllegalArgumentException`: If an invalid combination of events is specified
- `ClosedWatchServiceException`: If the watch service is closed
- `NotDirectoryException`: If the file is registered to watch the entries in a directory and the file is not a directory *(optional specific exception)*
- `IOException`: If an I/O error occurs

## Path.iterator()

```java
default Iterator<Path> iterator()
```

Returns an iterator over the name elements of this path.

 The first element returned by the iterator represents the name
element that is closest to the root in the directory hierarchy, the
second element is the next closest, and so on. The last element returned
is the name of the file or directory denoted by this path. The root component, if present, is not returned by the iterator.

**Implementation requirements:** The default implementation returns an `Iterator` which, for
this path, traverses the `Path`s returned by
`getName(index)`, where `index` ranges from zero to
`getNameCount() - 1`, inclusive.

**Returns:** an iterator over the name elements of this path

## Path.compareTo(Path)

```java
int compareTo(Path other)
```

Compares two abstract paths lexicographically. The ordering defined by
this method is provider specific, and in the case of the default
provider, platform specific. This method does not access the file system
and neither file is required to exist.

 This method may not be used to compare paths that are associated
with different file system providers.

Parameters:

- `other`: the path compared to this path.

**Returns:** zero if the argument is equal to this path, a
         value less than zero if this path is lexicographically less than
         the argument, or a value greater than zero if this path is
         lexicographically greater than the argument

Throws:

- `ClassCastException`: if the paths are associated with different providers

## Path.equals(Object)

```java
boolean equals(Object other)
```

Tests this path for equality with the given object.

 If the given object is not a Path, or is a Path associated with a
different `FileSystem`, then this method returns `false`.

 Whether or not two path are equal depends on the file system
implementation. In some cases the paths are compared without regard
to case, and others are case sensitive. This method does not access the
file system and the file is not required to exist. Where required, the
isSameFile method may be used to check if two
paths locate the same file.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `other`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a `Path`
         that is identical to this `Path`

## Path.hashCode()

```java
int hashCode()
```

Computes a hash code for this path.

 The hash code is based upon the components of the path, and
satisfies the general contract of the Object.hashCode method.

**Returns:** the hash-code value for this path

## Path.toString()

```java
String toString()
```

If this path was created by converting a path string using the
getPath method then the path string returned
by this method may differ from the original String used to create the path.

 The returned path string uses the default name separator to separate names in the path.
