---
title: "Guard interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Guard.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Guard interface (java.security)

```java
public interface Guard
```

This interface represents a guard, which is an object that is used
to protect access to another object.

This interface contains a single method, `checkGuard`,
with a single `object` argument. `checkGuard` is
invoked (by the GuardedObject `getObject` method)
to determine whether to allow access to the object.

**See also:** GuardedObject

**Since:** 1.2

## Guard.checkGuard(Object)

```java
void checkGuard(Object object) throws SecurityException
```

Determines whether to allow access to the guarded object
`object`. Returns silently if access is allowed.
Otherwise, throws a `SecurityException`.

Parameters:

- `object`: the object being protected by the guard.

Throws:

- `SecurityException`: if access is denied.
