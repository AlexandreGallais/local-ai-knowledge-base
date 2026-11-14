---
title: "InvocationTargetException class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/InvocationTargetException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvocationTargetException class (java.lang.reflect)

```java
public class InvocationTargetException extends ReflectiveOperationException
```

InvocationTargetException is a checked exception that wraps
an exception thrown by an invoked method or constructor.

**See also:** Method

**See also:** Constructor

**Since:** 1.1

## InvocationTargetException.InvocationTargetException()

```java
protected InvocationTargetException()
```

Constructs an `InvocationTargetException` with
`null` as the target exception.

## InvocationTargetException.InvocationTargetException(Throwable)

```java
public InvocationTargetException(Throwable target)
```

Constructs a InvocationTargetException with a target exception.

Parameters:

- `target`: the target exception

## InvocationTargetException.InvocationTargetException(Throwable, String)

```java
public InvocationTargetException(Throwable target, String s)
```

Constructs a InvocationTargetException with a target exception
and a detail message.

Parameters:

- `target`: the target exception
- `s`: the detail message

## InvocationTargetException.getTargetException()

```java
public Throwable getTargetException()
```

Get the thrown target exception.

**API note:** This method predates the general-purpose exception chaining facility.
The `Throwable.getCause()` method is now the preferred means of
obtaining this information.

**Returns:** the thrown target exception (cause of this exception).

## InvocationTargetException.getCause()

```java
public Throwable getCause()
```

Returns the cause of this exception (the thrown target exception,
which may be `null`).

**Returns:** the cause of this exception.

**Since:** 1.4
