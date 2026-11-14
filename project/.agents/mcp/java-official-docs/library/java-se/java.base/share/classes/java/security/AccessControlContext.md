---
title: "AccessControlContext class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AccessControlContext.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AccessControlContext class (java.security)

```java
public final class AccessControlContext
```

`AccessControlContext` was used with the Security Manager for access
control decisions based on context that it encapsulated. This feature no
longer exists.

**Since:** 1.2

**Deprecated:** This class was only useful in conjunction with the the Security Manager, which is no longer supported.
      There is no replacement for the Security Manager or this class.

## AccessControlContext.AccessControlContext(ProtectionDomain[])

```java
public AccessControlContext(ProtectionDomain[] context)
```

Create an `AccessControlContext` with the given array of
`ProtectionDomain` objects.
Context must not be `null`. Duplicate domains will be removed
from the context.

Parameters:

- `context`: the `ProtectionDomain` objects associated with this context. The non-duplicate domains are copied from the array. Subsequent changes to the array will not affect this `AccessControlContext`.

Throws:

- `NullPointerException`: if `context` is `null`

## AccessControlContext.AccessControlContext(AccessControlContext, DomainCombiner)

```java
public AccessControlContext(AccessControlContext acc, DomainCombiner combiner)
```

Create a new `AccessControlContext` with the given
`AccessControlContext` and `DomainCombiner`.
This constructor associates the provided
`DomainCombiner` with the provided
`AccessControlContext`.

Parameters:

- `acc`: the `AccessControlContext` associated with the provided `DomainCombiner`.
- `combiner`: the `DomainCombiner` to be associated with the provided `AccessControlContext`.

**Since:** 1.3

Throws:

- `NullPointerException`: if the provided `context` is `null`.

## AccessControlContext.getDomainCombiner()

```java
public DomainCombiner getDomainCombiner()
```

Get the `DomainCombiner` associated with this
`AccessControlContext`.

**Returns:** the `DomainCombiner` associated with this
         `AccessControlContext`, or `null`
         if there is none.

**Since:** 1.3

## AccessControlContext.checkPermission(Permission)

```java
public void checkPermission(Permission perm) throws AccessControlException
```

Throws `AccessControlException`.

Parameters:

- `perm`: ignored

Throws:

- `AccessControlException`: always

## AccessControlContext.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two `AccessControlContext` objects for equality.
Checks that `obj` is
an `AccessControlContext` and has the same set of
`ProtectionDomain` objects as this context.

Parameters:

- `obj`: the object we are testing for equality with this object.

**Returns:** `true` if `obj` is an `AccessControlContext`,
and has the same set of `ProtectionDomain` objects as this context,
`false` otherwise.

## AccessControlContext.hashCode()

```java
public int hashCode()
```

The hash code is computed by exclusive or-ing the hash code of all the
protection domains in the context together.
