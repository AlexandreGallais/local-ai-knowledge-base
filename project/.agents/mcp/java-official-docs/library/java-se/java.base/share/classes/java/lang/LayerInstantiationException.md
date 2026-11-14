---
title: "LayerInstantiationException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/LayerInstantiationException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LayerInstantiationException class (java.lang)

```java
public class LayerInstantiationException extends RuntimeException
```

Thrown when creating a module layer fails.

**See also:** ModuleLayer

**Since:** 9

## LayerInstantiationException.LayerInstantiationException()

```java
public LayerInstantiationException()
```

Constructs a `LayerInstantiationException` with no detail message.

## LayerInstantiationException.LayerInstantiationException(String)

```java
public LayerInstantiationException(String msg)
```

Constructs a `LayerInstantiationException` with the given detail
message.

Parameters:

- `msg`: The detail message; can be `null`

## LayerInstantiationException.LayerInstantiationException(Throwable)

```java
public LayerInstantiationException(Throwable cause)
```

Constructs a `LayerInstantiationException` with the given cause.

Parameters:

- `cause`: The cause; can be `null`

## LayerInstantiationException.LayerInstantiationException(String, Throwable)

```java
public LayerInstantiationException(String msg, Throwable cause)
```

Constructs a `LayerInstantiationException` with the given detail
message and cause.

Parameters:

- `msg`: The detail message; can be `null`
- `cause`: The cause; can be `null`
