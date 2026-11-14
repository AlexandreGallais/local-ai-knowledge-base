---
title: "Permissions class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Permissions.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Permissions class (java.security)

```java
public final class Permissions extends PermissionCollection implements Serializable
```

This class represents a heterogeneous collection of permissions.
That is, it contains different types of `Permission` objects,
organized into `PermissionCollection` objects. For example, if any
`java.io.FilePermission` objects are added to an instance of
this class, they are all stored in a single `PermissionCollection`.
It is the `PermissionCollection` returned by a call to
the `newPermissionCollection` method in the `FilePermission`
class. Similarly, any `java.lang.RuntimePermission` objects are
stored in the `PermissionCollection` returned by a call to the
`newPermissionCollection` method in the `RuntimePermission`
class. Thus, this class represents a collection of
`PermissionCollection` objects.

When the `add` method is called to add a `Permission`, the
`Permission` is stored in the appropriate `PermissionCollection`.
If no such collection exists yet, the `Permission` object's class is
determined and the `newPermissionCollection` method is called on that
class to create the `PermissionCollection` and add it to the
`Permissions` object. If `newPermissionCollection` returns
`null`, then a default `PermissionCollection` that uses a
hashtable will be created and used. Each hashtable entry stores a
`Permission` object as both the key and the value.

 Enumerations returned via the `elements` method are
not *fail-fast*.  Modifications to a collection should not be
performed while enumerating over that collection.

**See also:** Permission

**See also:** PermissionCollection

**See also:** AllPermission

**Since:** 1.2

## Permissions.Permissions()

```java
public Permissions()
```

Creates a new `Permissions` object containing no
`PermissionCollection` objects.

## Permissions.add(Permission)

```java
public void add(Permission permission)
```

Adds a `Permission` object to the `PermissionCollection`
for the class the permission belongs to. For example,
if *permission* is a `FilePermission`, it is added to
the `FilePermissionCollection` stored in this
`Permissions` object.

This method creates a new `PermissionCollection` object
(and adds the permission to it) if an appropriate collection does
not yet exist.

Parameters:

- `permission`: the `Permission` object to add.

**See also:** PermissionCollection#isReadOnly()

Throws:

- `SecurityException`: if this `Permissions` object is marked as readonly.

## Permissions.implies(Permission)

```java
public boolean implies(Permission permission)
```

Checks to see if this object's `PermissionCollection` for
permissions of the specified permission's class implies the permissions
expressed in the *permission* object. Returns `true` if the
combination of permissions in the appropriate
`PermissionCollection` (e.g., a `FilePermissionCollection`
for a `FilePermission`) together imply the specified permission.

For example, suppose there is a `FilePermissionCollection`
in this `Permissions` object, and it contains one
`FilePermission` that specifies "read" access for all files
in all subdirectories of the "/tmp" directory, and another
`FilePermission` that specifies "write" access for all files
in the "/tmp/scratch/foo" directory. Then if the `implies` method
is called with a permission specifying both "read" and "write" access
to files in the "/tmp/scratch/foo" directory, `true` is
returned.

Additionally, if this `PermissionCollection` contains the
`AllPermission`, this method will always return `true`.

Parameters:

- `permission`: the `Permission` object to check.

**Returns:** `true` if "permission" is implied by the permissions in the
`PermissionCollection` it belongs to, `false` if not.

## Permissions.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the `Permission` objects in all the
`PermissionCollection` objects in this `Permissions` object.

**Returns:** an enumeration of all the `Permission` objects.

## Permissions.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the `PermissionsHash`.

Parameters:

- `permission`: the `Permission` object to add.

## Permissions.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

Parameters:

- `permission`: the `Permission` object to compare

**Returns:** `true` if "permission" is a proper subset of a permission
in the set, `false` if not.

## Permissions.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the `Permission` objects in the
container.

**Returns:** an enumeration of all the `Permission` objects.
