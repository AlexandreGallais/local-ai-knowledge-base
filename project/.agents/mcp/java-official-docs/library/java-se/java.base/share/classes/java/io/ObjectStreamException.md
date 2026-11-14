---
title: "ObjectStreamException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectStreamException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectStreamException class (java.io)

```java
public abstract class ObjectStreamException extends IOException
```

Superclass of all exceptions specific to Object Stream classes.

**Since:** 1.1

## ObjectStreamException.ObjectStreamException(String)

```java
protected ObjectStreamException(String message)
```

Create an ObjectStreamException with the specified argument.

Parameters:

- `message`: the detailed message for the exception

## ObjectStreamException.ObjectStreamException(String, Throwable)

```java
protected ObjectStreamException(String message, Throwable cause)
```

Create an ObjectStreamException with the specified message and
cause.

Parameters:

- `message`: the detailed message for the exception
- `cause`: the cause

**Since:** 19

## ObjectStreamException.ObjectStreamException()

```java
protected ObjectStreamException()
```

Create an ObjectStreamException.

## ObjectStreamException.ObjectStreamException(Throwable)

```java
protected ObjectStreamException(Throwable cause)
```

Create an ObjectStreamException with the specified cause.

Parameters:

- `cause`: the cause

**Since:** 19
