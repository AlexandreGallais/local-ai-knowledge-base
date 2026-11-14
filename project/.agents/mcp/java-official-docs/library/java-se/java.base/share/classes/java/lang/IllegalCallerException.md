---
title: "IllegalCallerException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IllegalCallerException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalCallerException class (java.lang)

```java
public class IllegalCallerException extends RuntimeException
```

Thrown to indicate that a method has been called by an inappropriate caller.

**Since:** 9

**See also:** StackWalker#getCallerClass

## IllegalCallerException.IllegalCallerException()

```java
public IllegalCallerException()
```

Constructs an IllegalCallerException with no detail message.

## IllegalCallerException.IllegalCallerException(String)

```java
public IllegalCallerException(String s)
```

Constructs an IllegalCallerException with the specified detail
message.

Parameters:

- `s`: the String that contains a detailed message (can be null)

## IllegalCallerException.IllegalCallerException(String, Throwable)

```java
public IllegalCallerException(String message, Throwable cause)
```

Constructs a new exception with the specified detail message and
cause.

Parameters:

- `message`: the detail message (can be null)
- `cause`: the cause (can be null)

## IllegalCallerException.IllegalCallerException(Throwable)

```java
public IllegalCallerException(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).

Parameters:

- `cause`: the cause (can be null)
