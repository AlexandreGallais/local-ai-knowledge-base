---
title: "AllPermission class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AllPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AllPermission class (java.security)

```java
public final class AllPermission extends Permission
```

The `AllPermission` is a permission that implies all other permissions.

**API note:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**See also:** java.security.Permission

**See also:** java.security.Permissions

**See also:** java.security.PermissionCollection

**Since:** 1.2

## AllPermission.AllPermission()

```java
public AllPermission()
```

Creates a new `AllPermission` object.

## AllPermission.AllPermission(String, String)

```java
public AllPermission(String name, String actions)
```

Creates a new `AllPermission` object. This
constructor exists for use by the `Policy` object
to instantiate new `Permission` objects.

Parameters:

- `name`: ignored
- `actions`: ignored.

## AllPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if the specified permission is "implied" by
this object. This method always returns `true`.

Parameters:

- `p`: the permission to check against.

**Returns:** return

## AllPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two `AllPermission` objects for equality.
Two `AllPermission` objects are always equal.

Parameters:

- `obj`: the object we are testing for equality with this object.

**Returns:** true if `obj` is an `AllPermission`, false otherwise.

## AllPermission.hashCode()

```java
public int hashCode()
```

## AllPermission.getActions()

```java
public String getActions()
```

Returns the canonical string representation of the actions.

**Returns:** the actions.

## AllPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new `PermissionCollection` for storing
`AllPermission` objects.

**Returns:** a new `PermissionCollection` suitable for
storing `AllPermission` objects.

## AllPermission.AllPermissionCollection()

```java
public AllPermissionCollection()
```

Create an empty `AllPermissionCollection` object.

## AllPermission.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the `AllPermissionCollection` object.
The key for the hash is `permission.path`.

Parameters:

- `permission`: the `Permission` object to add.

Throws:

- `IllegalArgumentException`: if the permission is not an `AllPermission`
- `SecurityException`: if this `AllPermissionCollection` object has been marked readonly

## AllPermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

Parameters:

- `permission`: the `Permission` object to compare

**Returns:** always returns `true`.

## AllPermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the `AllPermission` objects in the
container.

**Returns:** an enumeration of all the `AllPermission` objects.
