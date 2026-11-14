---
title: "NotLinkException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/NotLinkException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NotLinkException class (java.nio.file)

```java
public class NotLinkException extends FileSystemException
```

Checked exception thrown when a file system operation fails because a file
is not a symbolic link.

**Since:** 1.7

## NotLinkException.NotLinkException(String)

```java
public NotLinkException(String file)
```

Constructs an instance of this class.

Parameters:

- `file`: a string identifying the file or `null` if not known

## NotLinkException.NotLinkException(String, String, String)

```java
public NotLinkException(String file, String other, String reason)
```

Constructs an instance of this class.

Parameters:

- `file`: a string identifying the file or `null` if not known
- `other`: a string identifying the other file or `null` if not known
- `reason`: a reason message with additional information or `null`
