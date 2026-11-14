---
title: "UnknownServiceException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/UnknownServiceException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnknownServiceException class (java.net)

```java
public class UnknownServiceException extends IOException
```

Thrown to indicate that an unknown service exception has
occurred. Either the MIME type returned by a URL connection does
not make sense, or the application is attempting to write to a
read-only URL connection.

**Since:** 1.0

## UnknownServiceException.UnknownServiceException()

```java
public UnknownServiceException()
```

Constructs a new `UnknownServiceException` with no
detail message.

## UnknownServiceException.UnknownServiceException(String)

```java
public UnknownServiceException(String msg)
```

Constructs a new `UnknownServiceException` with the
specified detail message.

Parameters:

- `msg`: the detail message.
