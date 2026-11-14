---
title: "PrivilegedAction interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PrivilegedAction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrivilegedAction interface (java.security)

```java
public interface PrivilegedAction<T>
```

A computation to be performed by invoking
`AccessController.doPrivileged` on the
`PrivilegedAction` object.  This interface is used only for
computations that do not throw checked exceptions; computations that
throw checked exceptions must use `PrivilegedExceptionAction`
instead.

Parameters:

- `<T>`: the type of the result of running the computation

**Since:** 1.2

**See also:** AccessController

**See also:** AccessController#doPrivileged(PrivilegedAction)

**See also:** PrivilegedExceptionAction

## PrivilegedAction.run()

```java
T run()
```

Performs the computation.  This method will be called by
`AccessController.doPrivileged`.

**Returns:** a class-dependent value that may represent the results of the
        computation. Each class that implements
        `PrivilegedAction`
        should document what (if anything) this value represents.

**See also:** AccessController#doPrivileged(PrivilegedAction)

**See also:** AccessController#doPrivileged(PrivilegedAction,
                                    AccessControlContext)
