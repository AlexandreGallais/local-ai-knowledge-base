---
title: "ZoneRulesException class (java.time.zone)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/zone/ZoneRulesException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZoneRulesException class (java.time.zone)

```java
public class ZoneRulesException extends DateTimeException
```

Thrown to indicate a problem with time-zone configuration.

This exception is used to indicate a problems with the configured
time-zone rules.

**Implementation requirements:** This class is intended for use in a single thread.

**Since:** 1.8

## ZoneRulesException.ZoneRulesException(String)

```java
public ZoneRulesException(String message)
```

Constructs a new date-time exception with the specified message.

Parameters:

- `message`: the message to use for this exception, may be null

## ZoneRulesException.ZoneRulesException(String, Throwable)

```java
public ZoneRulesException(String message, Throwable cause)
```

Constructs a new date-time exception with the specified message and cause.

Parameters:

- `message`: the message to use for this exception, may be null
- `cause`: the cause of the exception, may be null
