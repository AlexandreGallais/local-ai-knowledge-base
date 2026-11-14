---
title: "InaccessibleObjectException class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/InaccessibleObjectException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InaccessibleObjectException class (java.lang.reflect)

```java
public class InaccessibleObjectException extends RuntimeException
```

Thrown when Java language access checks cannot be suppressed.

**See also:** AccessibleObject#setAccessible(boolean)

**Since:** 9

## InaccessibleObjectException.InaccessibleObjectException()

```java
public InaccessibleObjectException()
```

Constructs an `InaccessibleObjectException` with no detail message.

## InaccessibleObjectException.InaccessibleObjectException(String)

```java
public InaccessibleObjectException(String msg)
```

Constructs an `InaccessibleObjectException` with the given detail
message.

Parameters:

- `msg`: The detail message
