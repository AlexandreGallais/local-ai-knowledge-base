---
title: "Paths class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Paths.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Paths class (java.nio.file)

```java
public final class Paths
```

This class consists exclusively of static methods that return a `Path`
by converting a path string or `URI`.

**API note:** It is recommended to obtain a `Path` via the `Path.of` methods
instead of via the `get` methods defined in this class as this class
may be deprecated in a future release.

**Since:** 1.7

**See also:** Path

## Paths.get(String, String...)

```java
public static Path get(String first, String... more)
```

Converts a path string, or a sequence of strings that when joined form
a path string, to a `Path`.

Parameters:

- `first`: the path string or initial part of the path string
- `more`: additional strings to be joined to form the path string

**Implementation requirements:** This method simply invokes Path.of(String, String...) with the given parameters.

**Returns:** the resulting `Path`

**See also:** FileSystem#getPath

**See also:** Path#of(String,String...)

Throws:

- `InvalidPathException`: if the path string cannot be converted to a `Path`

## Paths.get(URI)

```java
public static Path get(URI uri)
```

Converts the given URI to a `Path` object.

Parameters:

- `uri`: the URI to convert

**Implementation requirements:** This method simply invokes Path.of(URI) with the
given parameter.

**Returns:** the resulting `Path`

**See also:** Path#of(URI)

Throws:

- `IllegalArgumentException`: if preconditions on the `uri` parameter do not hold. The format of the URI is provider specific.
- `FileSystemNotFoundException`: The file system, identified by the URI, does not exist and cannot be created automatically, or the provider identified by the URI's scheme component is not installed
