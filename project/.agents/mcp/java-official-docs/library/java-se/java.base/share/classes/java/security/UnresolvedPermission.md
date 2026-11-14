---
title: "UnresolvedPermission class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/UnresolvedPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnresolvedPermission class (java.security)

```java
public final class UnresolvedPermission extends Permission implements java.io.Serializable
```

The `UnresolvedPermission` class used to hold Permissions that were
"unresolved" when the `Policy` was initialized. Installing a
system-wide `Policy` object is no longer supported.

**See also:** java.security.Permission

**See also:** java.security.Permissions

**See also:** java.security.PermissionCollection

**See also:** java.security.Policy

**Since:** 1.2

**Deprecated:** This permission cannot be used for controlling access to
      resources as the Security Manager is no longer supported.

## UnresolvedPermission.UnresolvedPermission(String, String, String, java.security.cert.Certificate[])

```java
public UnresolvedPermission(String type, String name, String actions, java.security.cert.Certificate[] certs)
```

Creates a new `UnresolvedPermission` containing the permission
information needed later to actually create a Permission of the
specified class, when the permission is resolved.

Parameters:

- `type`: the class name of the Permission class that will be created when this unresolved permission is resolved.
- `name`: the name of the permission.
- `actions`: the actions of the permission.
- `certs`: the certificates the permission's class was signed with. This is a list of certificate chains, where each chain is composed of a signer certificate and optionally its supporting certificate chain. Each chain is ordered bottom-to-top (i.e., with the signer certificate first and the (root) certificate authority last). The signer certificates are copied from the array. Subsequent changes to the array will not affect this UnresolvedPermission.

## UnresolvedPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

This method always returns `false` for unresolved permissions.
That is, an `UnresolvedPermission` is never considered to
imply another permission.

Parameters:

- `p`: the permission to check against.

**Returns:** `false`.

## UnresolvedPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two `UnresolvedPermission` objects for equality.
Checks that `obj` is an `UnresolvedPermission`, and has
the same type (class) name, permission name, actions, and
certificates as this object.

 To determine certificate equality, this method only compares
actual signer certificates.  Supporting certificate chains
are not taken into consideration by this method.

Parameters:

- `obj`: the object we are testing for equality with this object.

**Returns:** true if `obj` is an `UnresolvedPermission`,
and has the same type (class) name, permission name, actions, and
certificates as this object.

## UnresolvedPermission.hashCode()

```java
public int hashCode()
```

## UnresolvedPermission.getActions()

```java
public String getActions()
```

Returns the canonical string representation of the actions,
which currently is the empty string "", since there are no actions for
an `UnresolvedPermission`. That is, the actions for the
permission that will be created when this `UnresolvedPermission`
is resolved may be non-null, but an `UnresolvedPermission`
itself is never considered to have any actions.

**Returns:** the empty string "".

## UnresolvedPermission.getUnresolvedType()

```java
public String getUnresolvedType()
```

Get the type (class name) of the underlying permission that
has not been resolved.

**Returns:** the type (class name) of the underlying permission that
 has not been resolved

**Since:** 1.5

## UnresolvedPermission.getUnresolvedName()

```java
public String getUnresolvedName()
```

Get the target name of the underlying permission that
has not been resolved.

**Returns:** the target name of the underlying permission that
         has not been resolved, or `null`,
         if there is no target name

**Since:** 1.5

## UnresolvedPermission.getUnresolvedActions()

```java
public String getUnresolvedActions()
```

Get the actions for the underlying permission that
has not been resolved.

**Returns:** the actions for the underlying permission that
         has not been resolved, or `null`
         if there are no actions

**Since:** 1.5

## UnresolvedPermission.getUnresolvedCerts()

```java
public java.security.cert.Certificate[] getUnresolvedCerts()
```

Get the signer certificates (without any supporting chain)
for the underlying permission that has not been resolved.

**Returns:** the signer certificates for the underlying permission that
has not been resolved, or `null`, if there are no signer
certificates.
Returns a new array each time this method is called.

**Since:** 1.5

## UnresolvedPermission.toString()

```java
public String toString()
```

Returns a string describing this `UnresolvedPermission`.
The convention is to specify the class name, the permission name,
and the actions, in the following format:
'(unresolved "ClassName" "name" "actions")'.

**Returns:** information about this `UnresolvedPermission`.

## UnresolvedPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new PermissionCollection object for storing
`UnresolvedPermission` objects.

**Returns:** a new PermissionCollection object suitable for
storing `UnresolvedPermissions`.
