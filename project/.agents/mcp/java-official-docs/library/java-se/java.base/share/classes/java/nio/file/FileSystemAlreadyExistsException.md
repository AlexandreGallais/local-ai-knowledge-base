---
title: "FileSystemAlreadyExistsException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/FileSystemAlreadyExistsException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileSystemAlreadyExistsException class (java.nio.file)

```java
public class FileSystemAlreadyExistsException extends RuntimeException
```

Runtime exception thrown when an attempt is made to create a file system that
already exists.

**Since:** 1.7

## FileSystemAlreadyExistsException.FileSystemAlreadyExistsException()

```java
public FileSystemAlreadyExistsException()
```

Constructs an instance of this class.

## FileSystemAlreadyExistsException.FileSystemAlreadyExistsException(String)

```java
public FileSystemAlreadyExistsException(String msg)
```

Constructs an instance of this class.

Parameters:

- `msg`: the detail message
