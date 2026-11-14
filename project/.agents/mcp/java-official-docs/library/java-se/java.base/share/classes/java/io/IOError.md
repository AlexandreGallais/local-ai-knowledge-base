---
title: "IOError class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/IOError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IOError class (java.io)

```java
public class IOError extends Error
```

Thrown when a serious I/O error has occurred.

**Since:** 1.6

## IOError.IOError(Throwable)

```java
public IOError(Throwable cause)
```

Constructs a new instance of IOError with the specified cause. The
IOError is created with the detail message of
`(cause==null ? null : cause.toString())` (which typically
contains the class and detail message of cause).

Parameters:

- `cause`: The cause of this error, or `null` if the cause is not known
