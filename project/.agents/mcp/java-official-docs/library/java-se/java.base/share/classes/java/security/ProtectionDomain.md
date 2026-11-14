---
title: "ProtectionDomain class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/ProtectionDomain.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ProtectionDomain class (java.security)

```java
public class ProtectionDomain
```

The `ProtectionDomain` class encapsulates the characteristics of a
domain, which encloses a set of classes whose instances are granted a set
of permissions.

A static set of permissions can be bound to a `ProtectionDomain`
when it is constructed; such permissions are granted to the domain
regardless of the policy in force. However, to support dynamic security
policies, a `ProtectionDomain` can also be constructed such that it
is dynamically mapped to a set of permissions by the current policy.

**API note:** Installing a system-wide `Policy` object is
no longer supported. The current policy
is always a `Policy` object that grants no permissions.

**Since:** 1.2

## ProtectionDomain.ProtectionDomain(CodeSource, PermissionCollection)

```java
public ProtectionDomain(CodeSource codesource, PermissionCollection permissions)
```

Creates a new `ProtectionDomain` with the given `CodeSource`
and permissions. If permissions is not `null`, then
`setReadOnly()` will be called on the passed in
permissions.

The permissions granted to this domain are static, i.e.
invoking the `staticPermissionsOnly()` method returns
`true`.
They contain only the ones passed to this constructor and
the current policy will not be consulted.

Parameters:

- `codesource`: the codesource associated with this domain
- `permissions`: the permissions granted to this domain

**API note:** Installing a system-wide `Policy` object is
no longer supported. The current policy
is always a `Policy` object that grants no permissions.

## ProtectionDomain.ProtectionDomain(CodeSource, PermissionCollection, ClassLoader, Principal[])

```java
public ProtectionDomain(CodeSource codesource, PermissionCollection permissions, ClassLoader classloader, Principal[] principals)
```

Creates a new `ProtectionDomain` qualified by the given
`CodeSource`, permissions, `ClassLoader` and array
of principals. If permissions is not `null`, then
`setReadOnly()` will be called on the passed in permissions.

The permissions granted to this domain are dynamic, i.e.
invoking the `staticPermissionsOnly()` method returns
`false`.
They include both the static permissions passed to this constructor,
and any permissions granted to this domain by the current policy.

Parameters:

- `codesource`: the `CodeSource` associated with this domain
- `permissions`: the permissions granted to this domain
- `classloader`: the `ClassLoader` associated with this domain
- `principals`: the array of `Principal` objects associated with this domain. The contents of the array are copied to protect against subsequent modification.

**API note:** Installing a system-wide `Policy` object is
no longer supported. The current policy
is always a `Policy` object that grants no permissions.

**See also:** Policy#getPermissions(ProtectionDomain)

**Since:** 1.4

## ProtectionDomain.getCodeSource()

```java
public final CodeSource getCodeSource()
```

Returns the `CodeSource` of this domain.

**Returns:** the `CodeSource` of this domain which may be `null`.

**Since:** 1.2

## ProtectionDomain.getClassLoader()

```java
public final ClassLoader getClassLoader()
```

Returns the `ClassLoader` of this domain.

**Returns:** the `ClassLoader` of this domain which may be `null`.

**Since:** 1.4

## ProtectionDomain.getPrincipals()

```java
public final Principal[] getPrincipals()
```

Returns an array of principals for this domain.

**Returns:** a non-null array of principals for this domain.
Returns a new array each time this method is called.

**Since:** 1.4

## ProtectionDomain.getPermissions()

```java
public final PermissionCollection getPermissions()
```

Returns the static permissions granted to this domain.

**Returns:** the static set of permissions for this domain which may be
`null`.

**See also:** Policy#refresh

**See also:** Policy#getPermissions(ProtectionDomain)

## ProtectionDomain.staticPermissionsOnly()

```java
public final boolean staticPermissionsOnly()
```

Returns `true` if this domain contains only static permissions
and does not check the current `Policy`.

**API note:** Installing a system-wide `Policy` object is
no longer supported. The current policy
is always a `Policy` object that grants no permissions.

**Returns:** `true` if this domain contains only static permissions.

**Since:** 9

## ProtectionDomain.implies(Permission)

```java
public boolean implies(Permission perm)
```

Check and see if this `ProtectionDomain` implies the permissions
expressed in the `Permission` object.

The set of permissions evaluated is a function of whether the
`ProtectionDomain` was constructed with a static set of permissions
or it was bound to a dynamically mapped set of permissions.

If the `staticPermissionsOnly()` method returns
`true`, then the permission will only be checked against the
`PermissionCollection` supplied at construction.

Otherwise, the permission will be checked against the combination
of the `PermissionCollection` supplied at construction and
the current policy.

Parameters:

- `perm`: the {code Permission} object to check.

**API note:** Installing a system-wide `Policy` object is
no longer supported. The current policy
is always a `Policy` object that grants no permissions.

**Returns:** `true` if `perm` is implied by this
`ProtectionDomain`.

## ProtectionDomain.toString()

```java
public String toString()
```

Convert a `ProtectionDomain` to a `String`.
