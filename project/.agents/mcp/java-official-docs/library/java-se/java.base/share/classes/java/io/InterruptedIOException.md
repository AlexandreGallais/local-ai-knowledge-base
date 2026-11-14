---
title: "InterruptedIOException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/InterruptedIOException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InterruptedIOException class (java.io)

```java
public class InterruptedIOException extends IOException
```

Signals that an I/O operation has been interrupted. An
`InterruptedIOException` is thrown to indicate that an
input or output transfer has been terminated because the thread
performing it was interrupted. The field `bytesTransferred`
indicates how many bytes were successfully transferred before
the interruption occurred.

**See also:** java.io.InputStream

**See also:** java.io.OutputStream

**See also:** java.lang.Thread#interrupt()

**Since:** 1.0

## InterruptedIOException.InterruptedIOException()

```java
public InterruptedIOException()
```

Constructs an `InterruptedIOException` with
`null` as its error detail message.

## InterruptedIOException.InterruptedIOException(String)

```java
public InterruptedIOException(String s)
```

Constructs an `InterruptedIOException` with the
specified detail message. The string `s` can be
retrieved later by the
`java.lang.Throwable.getMessage`
method of class `java.lang.Throwable`.

Parameters:

- `s`: the detail message.

## InterruptedIOException.bytesTransferred

```java
public int bytesTransferred
```

Reports how many bytes had been transferred as part of the I/O
operation before it was interrupted.
