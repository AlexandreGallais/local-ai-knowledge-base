---
title: "PrivilegedExceptionAction interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PrivilegedExceptionAction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrivilegedExceptionAction interface (java.security)

```java
public interface PrivilegedExceptionAction<T>
```

A computation to be performed that throws one or more checked exceptions.
The computation is performed by invoking
`AccessController.doPrivileged` on the
`PrivilegedExceptionAction` object.  This interface is
used only for computations that throw checked exceptions;
computations that do not throw
checked exceptions should use `PrivilegedAction` instead.

Parameters:

- `<T>`: the type of the result of running the computation

**Since:** 1.2

**See also:** AccessController

**See also:** AccessController#doPrivileged(PrivilegedExceptionAction)

**See also:** AccessController#doPrivileged(PrivilegedExceptionAction,
                                             AccessControlContext)

**See also:** PrivilegedAction

## PrivilegedExceptionAction.run()

```java
T run() throws Exception
```

Performs the computation.  This method will be called by
`AccessController.doPrivileged`.

**Returns:** a class-dependent value that may represent the results of the
        computation.  Each class that implements
        `PrivilegedExceptionAction` should document what
        (if anything) this value represents.

**See also:** AccessController#doPrivileged(PrivilegedExceptionAction)

**See also:** AccessController#doPrivileged(PrivilegedExceptionAction,AccessControlContext)

Throws:

- `Exception`: an exceptional condition has occurred. Each class that implements `PrivilegedExceptionAction` should document the exceptions that its run method can throw.
