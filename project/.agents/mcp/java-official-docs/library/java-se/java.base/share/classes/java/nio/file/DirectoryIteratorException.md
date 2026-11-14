---
title: "DirectoryIteratorException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/DirectoryIteratorException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DirectoryIteratorException class (java.nio.file)

```java
public final class DirectoryIteratorException extends ConcurrentModificationException
```

Runtime exception thrown if an I/O error is encountered when iterating over
the entries in a directory. The I/O error is retrieved as an `IOException` using the getCause() method.

**Since:** 1.7

**See also:** DirectoryStream

## DirectoryIteratorException.DirectoryIteratorException(IOException)

```java
public DirectoryIteratorException(IOException cause)
```

Constructs an instance of this class.

Parameters:

- `cause`: the `IOException` that caused the directory iteration to fail

Throws:

- `NullPointerException`: if the cause is `null`

## DirectoryIteratorException.getCause()

```java
public IOException getCause()
```

Returns the cause of this exception.

**Returns:** the cause
