---
title: "GuardedObject class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/GuardedObject.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GuardedObject class (java.security)

```java
public class GuardedObject implements java.io.Serializable
```

A GuardedObject is an object that is used to protect access to
another object.

A GuardedObject encapsulates a target object and a Guard object,
such that access to the target object is possible
only if the Guard object allows it.
Once an object is encapsulated by a GuardedObject,
access to that object is controlled by the `getObject`
method, which invokes the
`checkGuard` method on the Guard object that is
guarding access. If access is not allowed,
an exception is thrown.

**See also:** Guard

**See also:** Permission

**Since:** 1.2

## GuardedObject.GuardedObject(Object, Guard)

```java
public GuardedObject(Object object, Guard guard)
```

Constructs a GuardedObject using the specified object and guard.
If the Guard object is `null`, then no restrictions will
be placed on who can access the object.

Parameters:

- `object`: the object to be guarded.
- `guard`: the Guard object that guards access to the object.

## GuardedObject.getObject()

```java
public Object getObject() throws SecurityException
```

Retrieves the guarded object, or throws an exception if access
to the guarded object is denied by the guard.

**Returns:** the guarded object.

Throws:

- `SecurityException`: if access to the guarded object is denied.
