---
title: "UnsupportedTemporalTypeException class (java.time.temporal)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/temporal/UnsupportedTemporalTypeException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnsupportedTemporalTypeException class (java.time.temporal)

```java
public class UnsupportedTemporalTypeException extends DateTimeException
```

UnsupportedTemporalTypeException indicates that a ChronoField or ChronoUnit is
not supported for a Temporal class.

**Implementation requirements:** This class is intended for use in a single thread.

**Since:** 1.8

## UnsupportedTemporalTypeException.UnsupportedTemporalTypeException(String)

```java
public UnsupportedTemporalTypeException(String message)
```

Constructs a new UnsupportedTemporalTypeException with the specified message.

Parameters:

- `message`: the message to use for this exception, may be null

## UnsupportedTemporalTypeException.UnsupportedTemporalTypeException(String, Throwable)

```java
public UnsupportedTemporalTypeException(String message, Throwable cause)
```

Constructs a new UnsupportedTemporalTypeException with the specified message and cause.

Parameters:

- `message`: the message to use for this exception, may be null
- `cause`: the cause of the exception, may be null
