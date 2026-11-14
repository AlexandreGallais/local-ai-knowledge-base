# BasicPermission class (java.security)

```java
public abstract class BasicPermission extends Permission implements java.io.Serializable
```

The {@code BasicPermission} class extends the {@code Permission} class, and
can be used as the base class for permissions that want to
follow the same naming convention as {@code BasicPermission}.
<P>
The name for a {@code BasicPermission} is the name of the given permission
(for example, "exit",
"setFactory", "print.queueJob", etc.). The naming
convention follows the  hierarchical property naming convention.
An asterisk may appear by itself, or if immediately preceded by a "."
may appear at the end of the name, to signify a wildcard match.
For example, "*" and "java.*" signify a wildcard match, while "*java", "a*b",
and "java*" do not.
<P>
The action string (inherited from {@code Permission}) is unused.
Thus, {@code BasicPermission} is commonly used as the base class for
"named" permissions
(ones that contain a name but no actions list; you either have the
named permission or you don't.)
Subclasses may implement actions on top of {@code BasicPermission},
if desired.

@see java.security.Permission
@see java.security.Permissions
@see java.security.PermissionCollection
@see java.lang.SecurityManager

@author Marianne Mueller
@author Roland Schemers
@since 1.2

## BasicPermission.BasicPermission(String)

```java
public BasicPermission(String name)
```

Creates a new {@code BasicPermission} with the specified name.
Name is the symbolic name of the permission, such as
"setFactory",
"print.queueJob", or "topLevelWindow", etc.

@param name the name of the {@code BasicPermission}.

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.

## BasicPermission.BasicPermission(String, String)

```java
public BasicPermission(String name, String actions)
```

Creates a new {@code BasicPermission} object with the specified name.
The name is the symbolic name of the {@code BasicPermission}, and the
actions {@code String} is currently unused.

@param name the name of the {@code BasicPermission}.
@param actions ignored.

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.

## BasicPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if the specified permission is "implied" by
this object.
<P>
More specifically, this method returns {@code true} if:
<ul>
<li> {@code p}'s class is the same as this object's class, and
<li> {@code p}'s name equals or (in the case of wildcards)
     is implied by this object's
     name. For example, "a.b.*" implies "a.b.c".
</ul>

@param p the permission to check against.

@return {@code true} if the passed permission is equal to or
implied by this permission, {@code false} otherwise.

## BasicPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two {@code BasicPermission} objects for equality.
Checks that {@code obj}'s class is the same as this object's class
and has the same name as this object.

@param obj the object we are testing for equality with this object.
@return {@code true} if {@code obj}'s class is the same as this
object's class and has the same name as this {@code BasicPermission}
object, {@code false} otherwise.

## BasicPermission.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this object}
The hash code used is the hash code of the name, that is,
{@code getName().hashCode()}, where {@code getName} is
from the {@code Permission} superclass.

## BasicPermission.getActions()

```java
public String getActions()
```

Returns the canonical string representation of the actions,
which currently is the empty string "", since there are no actions for
a {@code BasicPermission}.

@return the empty string "".

## BasicPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new {@code PermissionCollection} object for storing
{@code BasicPermission} objects.

<p>{@code BasicPermission} objects must be stored in a manner
that allows them to be inserted in any order, but that also enables the
{@link PermissionCollection#implies} method
to be implemented in an efficient (and consistent) manner.

@return a new {@code PermissionCollection} object suitable for
storing {@code BasicPermission} objects.

## BasicPermission.BasicPermissionCollection(Class<?>)

```java
public BasicPermissionCollection(Class<?> clazz)
```

Create an empty BasicPermissionCollection object.

## BasicPermission.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the {@code BasicPermission} object.
The key for the hash is permission.path.

@param permission the {@code Permission} object to add.

@throws    IllegalArgumentException   if the permission is not a
                                      {@code BasicPermission}, or if
                                      the permission is not of the
                                      same class as the other
                                      permissions in this collection.

@throws    SecurityException   if this {@code BasicPermissionCollection}
                               object has been marked readonly

## BasicPermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

@param permission the Permission object to compare

@return {@code true} if "permission" is a proper subset of a
permission in the set, {@code false} if not.

## BasicPermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the BasicPermission objects in the
container.

@return an enumeration of all the BasicPermission objects.