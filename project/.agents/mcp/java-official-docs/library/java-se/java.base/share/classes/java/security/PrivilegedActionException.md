---
title: "PrivilegedActionException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PrivilegedActionException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrivilegedActionException class (java.security)

```java
public class PrivilegedActionException extends Exception
```

This exception is thrown by
`doPrivileged(PrivilegedExceptionAction)` and
`doPrivileged(PrivilegedExceptionAction, AccessControlContext context)` to indicate
that the action being performed threw a checked exception.  The exception
thrown by the action can be obtained by calling the
`getException` method.  In effect, an
`PrivilegedActionException` is a "wrapper"
for an exception thrown by a privileged action.

**Since:** 1.2

**See also:** PrivilegedExceptionAction

**See also:** AccessController#doPrivileged(PrivilegedExceptionAction)

**See also:** AccessController#doPrivileged(PrivilegedExceptionAction,AccessControlContext)

## PrivilegedActionException.PrivilegedActionException(Exception)

```java
public PrivilegedActionException(Exception exception)
```

Constructs a new `PrivilegedActionException` "wrapping"
the specific Exception.

Parameters:

- `exception`: The exception thrown

## PrivilegedActionException.getException()

```java
public Exception getException()
```

Returns the exception thrown by the computation that
resulted in this `PrivilegedActionException`.

**API note:** This method predates the general-purpose exception chaining facility.
The `Throwable.getCause()` method is now the preferred means of
obtaining this information.

**Returns:** the exception thrown by the computation that
        resulted in this `PrivilegedActionException`.

**See also:** PrivilegedExceptionAction

**See also:** AccessController#doPrivileged(PrivilegedExceptionAction)

**See also:** AccessController#doPrivileged(PrivilegedExceptionAction,
                                           AccessControlContext)
