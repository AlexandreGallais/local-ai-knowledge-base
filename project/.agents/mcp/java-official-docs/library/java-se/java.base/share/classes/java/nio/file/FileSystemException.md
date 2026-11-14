---
title: "FileSystemException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/FileSystemException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileSystemException class (java.nio.file)

```java
public class FileSystemException extends IOException
```

Thrown when a file system operation fails on one or two files. This class is
the general class for file system exceptions.

**Since:** 1.7

## FileSystemException.FileSystemException(String)

```java
public FileSystemException(String file)
```

Constructs an instance of this class. This constructor should be used
when an operation involving one file fails and there isn't any additional
information to explain the reason.

Parameters:

- `file`: a string identifying the file or `null` if not known.

## FileSystemException.FileSystemException(String, String, String)

```java
public FileSystemException(String file, String other, String reason)
```

Constructs an instance of this class. This constructor should be used
when an operation involving two files fails, or there is additional
information to explain the reason.

Parameters:

- `file`: a string identifying the file or `null` if not known.
- `other`: a string identifying the other file or `null` if there isn't another file or if not known
- `reason`: a reason message with additional information or `null`

## FileSystemException.getFile()

```java
public String getFile()
```

Returns the file used to create this exception.

**Returns:** the file (can be `null`)

## FileSystemException.getOtherFile()

```java
public String getOtherFile()
```

Returns the other file used to create this exception.

**Returns:** the other file (can be `null`)

## FileSystemException.getReason()

```java
public String getReason()
```

Returns the string explaining why the file system operation failed.

**Returns:** the string explaining why the file system operation failed

## FileSystemException.getMessage()

```java
public String getMessage()
```

Returns the detail message string.
