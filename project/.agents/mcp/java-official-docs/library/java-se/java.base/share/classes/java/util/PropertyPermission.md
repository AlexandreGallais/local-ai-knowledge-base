---
title: "PropertyPermission class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/PropertyPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PropertyPermission class (java.util)

```java
public final class PropertyPermission extends BasicPermission
```

This class is for property permissions.

The name is the name of the property ("java.home",
"os.name", etc). The naming
convention follows the  hierarchical property naming convention.
Also, an asterisk
may appear at the end of the name, following a ".", or by itself, to
signify a wildcard match. For example: "java.*" and "*" signify a wildcard
match, while "*java" and "a*b" do not.

The actions are passed to the constructor in a string containing
a list of one or more comma-separated keywords. The possible keywords are
"read" and "write".

The actions string is converted to lowercase before processing.

**Deprecated:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**See also:** java.security.BasicPermission

**See also:** java.security.Permission

**See also:** java.security.Permissions

**See also:** java.security.PermissionCollection

**See also:** java.lang.SecurityManager

**Since:** 1.2

## PropertyPermission.PropertyPermission(String, String)

```java
public PropertyPermission(String name, String actions)
```

Creates a new PropertyPermission object with the specified name.
The name is the name of the system property, and
*actions* contains a comma-separated list of the
desired actions granted on the property. Possible actions are
"read" and "write".

Parameters:

- `name`: the name of the PropertyPermission.
- `actions`: the actions string.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty or if `actions` is invalid.

## PropertyPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if this PropertyPermission object "implies" the specified
permission.

More specifically, this method returns true if:

-  *p* is an instanceof PropertyPermission,

-  *p*'s actions are a subset of this
object's actions, and

-  *p*'s name is implied by this object's
     name. For example, "java.*" implies "java.home".

Parameters:

- `p`: the permission to check against.

**Returns:** true if the specified permission is implied by this object,
false if not.

## PropertyPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two PropertyPermission objects for equality. Checks that *obj* is
a PropertyPermission, and has the same name and actions as this object.

Parameters:

- `obj`: the object we are testing for equality with this object.

**Returns:** true if obj is a PropertyPermission, and has the same name and
actions as this PropertyPermission object.

## PropertyPermission.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this object.
The hash code used is the hash code of this permissions name, that is,
`getName().hashCode()`, where `getName` is
from the Permission superclass.

**Returns:** a hash code value for this object.

## PropertyPermission.getActions()

```java
public String getActions()
```

Returns the "canonical string representation" of the actions.
That is, this method always returns present actions in the following order:
read, write. For example, if this PropertyPermission object
allows both write and read actions, a call to `getActions`
will return the string "read,write".

**Returns:** the canonical string representation of the actions.

## PropertyPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new PermissionCollection object for storing
PropertyPermission objects.

**Returns:** a new PermissionCollection object suitable for storing
PropertyPermissions.

## PropertyPermission.PropertyPermissionCollection()

```java
public PropertyPermissionCollection()
```

Create an empty PropertyPermissionCollection object.

## PropertyPermission.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the PropertyPermissions. The key for the hash is
the name.

Parameters:

- `permission`: the Permission object to add.

Throws:

- `IllegalArgumentException`: if the permission is not a PropertyPermission
- `SecurityException`: if this PropertyPermissionCollection object has been marked readonly

## PropertyPermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

Parameters:

- `permission`: the Permission object to compare

**Returns:** true if "permission" is a proper subset of a permission in
the set, false if not.

## PropertyPermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the PropertyPermission objects in the
container.

**Returns:** an enumeration of all the PropertyPermission objects.
