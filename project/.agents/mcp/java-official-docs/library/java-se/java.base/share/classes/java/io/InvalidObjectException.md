---
title: "InvalidObjectException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/InvalidObjectException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidObjectException class (java.io)

```java
public class InvalidObjectException extends ObjectStreamException
```

Indicates that one or more deserialized objects failed validation
tests.  The argument should provide the reason for the failure.

**See also:** ObjectInputValidation

**Since:** 1.1

## InvalidObjectException.InvalidObjectException(String)

```java
public InvalidObjectException(String reason)
```

Constructs an `InvalidObjectException`.

Parameters:

- `reason`: Detailed message explaining the reason for the failure.

**See also:** ObjectInputValidation

## InvalidObjectException.InvalidObjectException(String, Throwable)

```java
public InvalidObjectException(String reason, Throwable cause)
```

Constructs an `InvalidObjectException` with the given
reason and cause.

Parameters:

- `reason`: Detailed message explaining the reason for the failure.
- `cause`: the cause

**See also:** ObjectInputValidation

**Since:** 19
