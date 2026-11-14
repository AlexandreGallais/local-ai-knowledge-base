---
title: "DateTimeException class (java.time)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/DateTimeException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeException class (java.time)

```java
public class DateTimeException extends RuntimeException
```

Exception used to indicate a problem while calculating a date-time.

This exception is used to indicate problems with creating, querying
and manipulating date-time objects.

**Implementation requirements:** This class is intended for use in a single thread.

**Since:** 1.8

## DateTimeException.DateTimeException(String)

```java
public DateTimeException(String message)
```

Constructs a new date-time exception with the specified message.

Parameters:

- `message`: the message to use for this exception, may be null

## DateTimeException.DateTimeException(String, Throwable)

```java
public DateTimeException(String message, Throwable cause)
```

Constructs a new date-time exception with the specified message and cause.

Parameters:

- `message`: the message to use for this exception, may be null
- `cause`: the cause of the exception, may be null
