---
title: "UndeclaredThrowableException class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/UndeclaredThrowableException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UndeclaredThrowableException class (java.lang.reflect)

```java
public class UndeclaredThrowableException extends RuntimeException
```

Thrown by a method invocation on a proxy instance if its invocation
handler's invoke method throws a
checked exception (a `Throwable` that is not assignable
to `RuntimeException` or `Error`) that
is not assignable to any of the exception types declared in the
`throws` clause of the method that was invoked on the
proxy instance and dispatched to the invocation handler.

An `UndeclaredThrowableException` instance contains
the undeclared checked exception that was thrown by the invocation
handler, and it can be retrieved with the
`getUndeclaredThrowable()` method.
`UndeclaredThrowableException` extends
`RuntimeException`, so it is an unchecked exception
that wraps a checked exception.

**See also:** InvocationHandler

**Since:** 1.3

## UndeclaredThrowableException.UndeclaredThrowableException(Throwable)

```java
public UndeclaredThrowableException(Throwable undeclaredThrowable)
```

Constructs an `UndeclaredThrowableException` with the
specified `Throwable`.

Parameters:

- `undeclaredThrowable`: the undeclared checked exception that was thrown

## UndeclaredThrowableException.UndeclaredThrowableException(Throwable, String)

```java
public UndeclaredThrowableException(Throwable undeclaredThrowable, String s)
```

Constructs an `UndeclaredThrowableException` with the
specified `Throwable` and a detail message.

Parameters:

- `undeclaredThrowable`: the undeclared checked exception that was thrown
- `s`: the detail message

## UndeclaredThrowableException.getUndeclaredThrowable()

```java
public Throwable getUndeclaredThrowable()
```

Returns the `Throwable` instance wrapped in this
`UndeclaredThrowableException`, which may be `null`.

**API note:** This method predates the general-purpose exception chaining facility.
The `Throwable.getCause()` method is now the preferred means of
obtaining this information.

**Returns:** the undeclared checked exception that was thrown
