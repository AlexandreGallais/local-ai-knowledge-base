# AllPermission class (java.security)

```java
public final class AllPermission extends Permission
```

The {@code AllPermission} is a permission that implies all other permissions.

@apiNote
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@see java.security.Permission
@see java.security.Permissions
@see java.security.PermissionCollection

@author Roland Schemers
@since 1.2

@serial exclude

## AllPermission.AllPermission()

```java
public AllPermission()
```

Creates a new {@code AllPermission} object.

## AllPermission.AllPermission(String, String)

```java
public AllPermission(String name, String actions)
```

Creates a new {@code AllPermission} object. This
constructor exists for use by the {@code Policy} object
to instantiate new {@code Permission} objects.

@param name ignored
@param actions ignored.

## AllPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if the specified permission is "implied" by
this object. This method always returns {@code true}.

@param p the permission to check against.

@return return

## AllPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two {@code AllPermission} objects for equality.
Two {@code AllPermission} objects are always equal.

@param obj the object we are testing for equality with this object.
@return true if {@code obj} is an {@code AllPermission}, false otherwise.

## AllPermission.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this object}

## AllPermission.getActions()

```java
public String getActions()
```

Returns the canonical string representation of the actions.

@return the actions.

## AllPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new {@code PermissionCollection} for storing
{@code AllPermission} objects.

@return a new {@code PermissionCollection} suitable for
storing {@code AllPermission} objects.

## AllPermission.AllPermissionCollection()

```java
public AllPermissionCollection()
```

Create an empty {@code AllPermissionCollection} object.

## AllPermission.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the {@code AllPermissionCollection} object.
The key for the hash is {@code permission.path}.

@param permission the {@code Permission} object to add.

@throws    IllegalArgumentException   if the permission is not an
                                      {@code AllPermission}

@throws    SecurityException   if this {@code AllPermissionCollection}
                               object has been marked readonly

## AllPermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

@param permission the {@code Permission} object to compare

@return always returns {@code true}.

## AllPermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the {@code AllPermission} objects in the
container.

@return an enumeration of all the {@code AllPermission} objects.