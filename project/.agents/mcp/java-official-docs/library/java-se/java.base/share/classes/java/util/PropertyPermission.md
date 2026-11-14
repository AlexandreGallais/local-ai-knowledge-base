# PropertyPermission class (java.util)

```java
public final class PropertyPermission extends BasicPermission
```

This class is for property permissions.

<P>
The name is the name of the property ("java.home",
"os.name", etc). The naming
convention follows the  hierarchical property naming convention.
Also, an asterisk
may appear at the end of the name, following a ".", or by itself, to
signify a wildcard match. For example: "java.*" and "*" signify a wildcard
match, while "*java" and "a*b" do not.
<P>
The actions are passed to the constructor in a string containing
a list of one or more comma-separated keywords. The possible keywords are
"read" and "write".
<P>
The actions string is converted to lowercase before processing.

@deprecated
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@see java.security.BasicPermission
@see java.security.Permission
@see java.security.Permissions
@see java.security.PermissionCollection
@see java.lang.SecurityManager

@author Roland Schemers
@since 1.2

@serial exclude

## PropertyPermission.PropertyPermission(String, String)

```java
public PropertyPermission(String name, String actions)
```

Creates a new PropertyPermission object with the specified name.
The name is the name of the system property, and
<i>actions</i> contains a comma-separated list of the
desired actions granted on the property. Possible actions are
"read" and "write".

@param name the name of the PropertyPermission.
@param actions the actions string.

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty or if
{@code actions} is invalid.

## PropertyPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if this PropertyPermission object "implies" the specified
permission.
<P>
More specifically, this method returns true if:
<ul>
<li> <i>p</i> is an instanceof PropertyPermission,
<li> <i>p</i>'s actions are a subset of this
object's actions, and
<li> <i>p</i>'s name is implied by this object's
     name. For example, "java.*" implies "java.home".
</ul>
@param p the permission to check against.

@return true if the specified permission is implied by this object,
false if not.

## PropertyPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two PropertyPermission objects for equality. Checks that <i>obj</i> is
a PropertyPermission, and has the same name and actions as this object.

@param obj the object we are testing for equality with this object.
@return true if obj is a PropertyPermission, and has the same name and
actions as this PropertyPermission object.

## PropertyPermission.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this object.
The hash code used is the hash code of this permissions name, that is,
{@code getName().hashCode()}, where {@code getName} is
from the Permission superclass.

@return a hash code value for this object.

## PropertyPermission.getActions()

```java
public String getActions()
```

Returns the "canonical string representation" of the actions.
That is, this method always returns present actions in the following order:
read, write. For example, if this PropertyPermission object
allows both write and read actions, a call to {@code getActions}
will return the string "read,write".

@return the canonical string representation of the actions.

## PropertyPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new PermissionCollection object for storing
PropertyPermission objects.

@return a new PermissionCollection object suitable for storing
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

@param permission the Permission object to add.

@throws    IllegalArgumentException   if the permission is not a
                                      PropertyPermission

@throws    SecurityException   if this PropertyPermissionCollection
                               object has been marked readonly

## PropertyPermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

@param permission the Permission object to compare

@return true if "permission" is a proper subset of a permission in
the set, false if not.

## PropertyPermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the PropertyPermission objects in the
container.

@return an enumeration of all the PropertyPermission objects.