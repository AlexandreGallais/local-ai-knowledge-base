---
title: "FindException class (java.lang.module)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/FindException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FindException class (java.lang.module)

```java
public class FindException extends RuntimeException
```

Thrown by a ModuleFinder when an error occurs finding
a module. Also thrown by Configuration.resolve when resolution fails for observability-related
reasons.

**Since:** 9

## FindException.FindException()

```java
public FindException()
```

Constructs a `FindException` with no detail message.

## FindException.FindException(String)

```java
public FindException(String msg)
```

Constructs a `FindException` with the given detail
message.

Parameters:

- `msg`: The detail message; can be `null`

## FindException.FindException(Throwable)

```java
public FindException(Throwable cause)
```

Constructs a `FindException` with the given cause.

Parameters:

- `cause`: The cause; can be `null`

## FindException.FindException(String, Throwable)

```java
public FindException(String msg, Throwable cause)
```

Constructs a `FindException` with the given detail message
and cause.

Parameters:

- `msg`: The detail message; can be `null`
- `cause`: The cause; can be `null`
