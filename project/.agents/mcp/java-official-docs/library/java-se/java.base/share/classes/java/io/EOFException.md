---
title: "EOFException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/EOFException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EOFException class (java.io)

```java
public class EOFException extends IOException
```

Signals that an end of file or end of stream has been reached
unexpectedly during input.

This exception is mainly used by data input streams to signal end of
stream. Note that many other input operations return a special value on
end of stream rather than throwing an exception.

**See also:** java.io.DataInputStream

**See also:** java.io.IOException

**Since:** 1.0

## EOFException.EOFException()

```java
public EOFException()
```

Constructs an `EOFException` with `null`
as its error detail message.

## EOFException.EOFException(String)

```java
public EOFException(String s)
```

Constructs an `EOFException` with the specified detail
message. The string `s` may later be retrieved by the
`java.lang.Throwable.getMessage` method of class
`java.lang.Throwable`.

Parameters:

- `s`: the detail message.
