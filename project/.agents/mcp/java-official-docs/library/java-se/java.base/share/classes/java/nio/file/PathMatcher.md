---
title: "PathMatcher interface (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/PathMatcher.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PathMatcher interface (java.nio.file)

```java
public interface PathMatcher
```

An interface that is implemented by objects that perform match operations on
paths.

**Since:** 1.7

**See also:** FileSystem#getPathMatcher

**See also:** Files#newDirectoryStream(Path,String)

## PathMatcher.matches(Path)

```java
boolean matches(Path path)
```

Tells if given path matches this matcher's pattern.

Parameters:

- `path`: the path to match

**Returns:** `true` if, and only if, the path matches this
         matcher's pattern
