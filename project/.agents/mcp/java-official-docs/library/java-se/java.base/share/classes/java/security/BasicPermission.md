---
title: "BasicPermission class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/BasicPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BasicPermission class (java.security)

```java
public abstract class BasicPermission extends Permission implements java.io.Serializable
```

The `BasicPermission` class extends the `Permission` class, and
can be used as the base class for permissions that want to
follow the same naming convention as `BasicPermission`.

The name for a `BasicPermission` is the name of the given permission
(for example, "exit",
"setFactory", "print.queueJob", etc.). The naming
convention follows the  hierarchical property naming convention.
An asterisk may appear by itself, or if immediately preceded by a "."
may appear at the end of the name, to signify a wildcard match.
For example, "*" and "java.*" signify a wildcard match, while "*java", "a*b",
and "java*" do not.

The action string (inherited from `Permission`) is unused.
Thus, `BasicPermission` is commonly used as the base class for
"named" permissions
(ones that contain a name but no actions list; you either have the
named permission or you don't.)
Subclasses may implement actions on top of `BasicPermission`,
if desired.

**See also:** java.security.Permission

**See also:** java.security.Permissions

**See also:** java.security.PermissionCollection

**See also:** java.lang.SecurityManager

**Since:** 1.2

## BasicPermission.BasicPermission(String)

```java
public BasicPermission(String name)
```

Creates a new `BasicPermission` with the specified name.
Name is the symbolic name of the permission, such as
"setFactory",
"print.queueJob", or "topLevelWindow", etc.

Parameters:

- `name`: the name of the `BasicPermission`.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.

## BasicPermission.BasicPermission(String, String)

```java
public BasicPermission(String name, String actions)
```

Creates a new `BasicPermission` object with the specified name.
The name is the symbolic name of the `BasicPermission`, and the
actions `String` is currently unused.

Parameters:

- `name`: the name of the `BasicPermission`.
- `actions`: ignored.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.

## BasicPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if the specified permission is "implied" by
this object.

More specifically, this method returns `true` if:

-  `p`'s class is the same as this object's class, and

-  `p`'s name equals or (in the case of wildcards)
     is implied by this object's
     name. For example, "a.b.*" implies "a.b.c".

Parameters:

- `p`: the permission to check against.

**Returns:** `true` if the passed permission is equal to or
implied by this permission, `false` otherwise.

## BasicPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two `BasicPermission` objects for equality.
Checks that `obj`'s class is the same as this object's class
and has the same name as this object.

Parameters:

- `obj`: the object we are testing for equality with this object.

**Returns:** `true` if `obj`'s class is the same as this
object's class and has the same name as this `BasicPermission`
object, `false` otherwise.

## BasicPermission.hashCode()

```java
public int hashCode()
```

The hash code used is the hash code of the name, that is,
`getName().hashCode()`, where `getName` is
from the `Permission` superclass.

## BasicPermission.getActions()

```java
public String getActions()
```

Returns the canonical string representation of the actions,
which currently is the empty string "", since there are no actions for
a `BasicPermission`.

**Returns:** the empty string "".

## BasicPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new `PermissionCollection` object for storing
`BasicPermission` objects.

`BasicPermission` objects must be stored in a manner
that allows them to be inserted in any order, but that also enables the
`PermissionCollection.implies` method
to be implemented in an efficient (and consistent) manner.

**Returns:** a new `PermissionCollection` object suitable for
storing `BasicPermission` objects.

## BasicPermission.BasicPermissionCollection(Class<?>)

```java
public BasicPermissionCollection(Class<?> clazz)
```

Create an empty BasicPermissionCollection object.

## BasicPermission.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the `BasicPermission` object.
The key for the hash is permission.path.

Parameters:

- `permission`: the `Permission` object to add.

Throws:

- `IllegalArgumentException`: if the permission is not a `BasicPermission`, or if the permission is not of the same class as the other permissions in this collection.
- `SecurityException`: if this `BasicPermissionCollection` object has been marked readonly

## BasicPermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

Parameters:

- `permission`: the Permission object to compare

**Returns:** `true` if "permission" is a proper subset of a
permission in the set, `false` if not.

## BasicPermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the BasicPermission objects in the
container.

**Returns:** an enumeration of all the BasicPermission objects.
