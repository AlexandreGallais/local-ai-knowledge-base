---
title: "NotActiveException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/NotActiveException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NotActiveException class (java.io)

```java
public class NotActiveException extends ObjectStreamException
```

Thrown when serialization or deserialization is not active.

**Since:** 1.1

## NotActiveException.NotActiveException(String)

```java
public NotActiveException(String reason)
```

Constructor to create a new NotActiveException with the reason given.

Parameters:

- `reason`: a String describing the reason for the exception.

## NotActiveException.NotActiveException()

```java
public NotActiveException()
```

Constructor to create a new NotActiveException without a reason.
