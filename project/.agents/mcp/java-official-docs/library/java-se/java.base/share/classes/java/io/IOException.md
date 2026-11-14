---
title: "IOException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/IOException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IOException class (java.io)

```java
public class IOException extends Exception
```

Signals that an I/O exception of some sort has occurred. This
class is the general class of exceptions produced by failed or
interrupted I/O operations.

**See also:** java.io.InputStream

**See also:** java.io.OutputStream

**Since:** 1.0

## IOException.IOException()

```java
public IOException()
```

Constructs an `IOException` with `null`
as its error detail message.

## IOException.IOException(String)

```java
public IOException(String message)
```

Constructs an `IOException` with the specified detail message.

Parameters:

- `message`: The detail message (which is saved for later retrieval by the `getMessage()` method)

## IOException.IOException(String, Throwable)

```java
public IOException(String message, Throwable cause)
```

Constructs an `IOException` with the specified detail message
and cause.

 Note that the detail message associated with `cause` is
*not* automatically incorporated into this exception's detail
message.

Parameters:

- `message`: The detail message (which is saved for later retrieval by the `getMessage()` method)
- `cause`: The cause (which is saved for later retrieval by the `getCause()` method). (A null value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.6

## IOException.IOException(Throwable)

```java
public IOException(Throwable cause)
```

Constructs an `IOException` with the specified cause and a
detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of `cause`).
This constructor is useful for IO exceptions that are little more
than wrappers for other throwables.

Parameters:

- `cause`: The cause (which is saved for later retrieval by the `getCause()` method). (A null value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.6
