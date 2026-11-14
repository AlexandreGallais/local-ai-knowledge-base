---
title: "ResolutionException class (java.lang.module)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/ResolutionException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResolutionException class (java.lang.module)

```java
public class ResolutionException extends RuntimeException
```

Thrown when resolving a set of modules, or resolving a set of modules with
service binding, fails.

**See also:** Configuration

**Since:** 9

## ResolutionException.ResolutionException()

```java
public ResolutionException()
```

Constructs a `ResolutionException` with no detail message.

## ResolutionException.ResolutionException(String)

```java
public ResolutionException(String msg)
```

Constructs a `ResolutionException` with the given detail
message.

Parameters:

- `msg`: The detail message; can be `null`

## ResolutionException.ResolutionException(Throwable)

```java
public ResolutionException(Throwable cause)
```

Constructs an instance of this exception with the given cause.

Parameters:

- `cause`: The cause; can be `null`

## ResolutionException.ResolutionException(String, Throwable)

```java
public ResolutionException(String msg, Throwable cause)
```

Constructs a `ResolutionException` with the given detail message
and cause.

Parameters:

- `msg`: The detail message; can be `null`
- `cause`: The cause; can be `null`
