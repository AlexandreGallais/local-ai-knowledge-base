---
title: "WriteAbortedException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/WriteAbortedException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WriteAbortedException class (java.io)

```java
public class WriteAbortedException extends ObjectStreamException
```

Signals that one of the ObjectStreamExceptions was thrown during a
write operation.  Thrown during a read operation when one of the
ObjectStreamExceptions was thrown during a write operation.  The
exception that terminated the write can be found in the detail
field. The stream is reset to its initial state and all references
to objects already deserialized are discarded.

**Since:** 1.1

## WriteAbortedException.detail

```java
public Exception detail
```

Exception that was caught while writing the ObjectStream.

**Deprecated:** This field predates the general-purpose exception
chaining facility.  The `Throwable.getCause()` method is
now the preferred means of obtaining this information.

## WriteAbortedException.WriteAbortedException(String, Exception)

```java
public WriteAbortedException(String s, Exception ex)
```

Constructs a WriteAbortedException with a string describing
the exception and the exception causing the abort.

Parameters:

- `s`: String describing the exception.
- `ex`: Exception causing the abort.

## WriteAbortedException.getMessage()

```java
public String getMessage()
```

Produce the message and include the message from the nested
exception, if there is one.

## WriteAbortedException.getCause()

```java
public Throwable getCause()
```

Returns the exception that terminated the operation (the *cause*).

**Returns:** the exception that terminated the operation (the *cause*),
         which may be null.

**Since:** 1.4
