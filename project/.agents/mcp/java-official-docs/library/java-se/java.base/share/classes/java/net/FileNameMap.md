---
title: "FileNameMap interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/FileNameMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileNameMap interface (java.net)

```java
public interface FileNameMap
```

A simple interface which provides a mechanism to map
between a file name and a MIME type string.

**Since:** 1.1

## FileNameMap.getContentTypeFor(String)

```java
public String getContentTypeFor(String fileName)
```

Gets the MIME type for the specified file name.

Parameters:

- `fileName`: the specified file name

**Returns:** a `String` indicating the MIME
type for the specified file name.
