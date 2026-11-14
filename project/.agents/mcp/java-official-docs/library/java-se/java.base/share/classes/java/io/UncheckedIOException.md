---
title: "UncheckedIOException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/UncheckedIOException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UncheckedIOException class (java.io)

```java
public class UncheckedIOException extends RuntimeException
```

Wraps an `IOException` with an unchecked exception.

**Since:** 1.8

## UncheckedIOException.UncheckedIOException(String, IOException)

```java
public UncheckedIOException(String message, IOException cause)
```

Constructs an instance of this class.

Parameters:

- `message`: the detail message, can be null
- `cause`: the `IOException`

Throws:

- `NullPointerException`: if the cause is `null`

## UncheckedIOException.UncheckedIOException(IOException)

```java
public UncheckedIOException(IOException cause)
```

Constructs an instance of this class.

Parameters:

- `cause`: the `IOException`

Throws:

- `NullPointerException`: if the cause is `null`

## UncheckedIOException.getCause()

```java
public IOException getCause()
```

Returns the cause of this exception.

**Returns:** the `IOException` which is the cause of this exception.
