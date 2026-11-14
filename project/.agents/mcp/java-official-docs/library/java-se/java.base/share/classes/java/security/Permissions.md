# Permissions class (java.security)

```java
public final class Permissions extends PermissionCollection implements Serializable
```

This class represents a heterogeneous collection of permissions.
That is, it contains different types of {@code Permission} objects,
organized into {@code PermissionCollection} objects. For example, if any
{@code java.io.FilePermission} objects are added to an instance of
this class, they are all stored in a single {@code PermissionCollection}.
It is the {@code PermissionCollection} returned by a call to
the {@code newPermissionCollection} method in the {@code FilePermission}
class. Similarly, any {@code java.lang.RuntimePermission} objects are
stored in the {@code PermissionCollection} returned by a call to the
{@code newPermissionCollection} method in the {@code RuntimePermission}
class. Thus, this class represents a collection of
{@code PermissionCollection} objects.

<p>When the {@code add} method is called to add a {@code Permission}, the
{@code Permission} is stored in the appropriate {@code PermissionCollection}.
If no such collection exists yet, the {@code Permission} object's class is
determined and the {@code newPermissionCollection} method is called on that
class to create the {@code PermissionCollection} and add it to the
{@code Permissions} object. If {@code newPermissionCollection} returns
{@code null}, then a default {@code PermissionCollection} that uses a
hashtable will be created and used. Each hashtable entry stores a
{@code Permission} object as both the key and the value.

<p> Enumerations returned via the {@code elements} method are
not <em>fail-fast</em>.  Modifications to a collection should not be
performed while enumerating over that collection.

@see Permission
@see PermissionCollection
@see AllPermission


@author Marianne Mueller
@author Roland Schemers
@since 1.2

@serial exclude

## Permissions.Permissions()

```java
public Permissions()
```

Creates a new {@code Permissions} object containing no
{@code PermissionCollection} objects.

## Permissions.add(Permission)

```java
public void add(Permission permission)
```

Adds a {@code Permission} object to the {@code PermissionCollection}
for the class the permission belongs to. For example,
if <i>permission</i> is a {@code FilePermission}, it is added to
the {@code FilePermissionCollection} stored in this
{@code Permissions} object.

This method creates a new {@code PermissionCollection} object
(and adds the permission to it) if an appropriate collection does
not yet exist.

@param permission the {@code Permission} object to add.

@throws    SecurityException if this {@code Permissions} object is
marked as readonly.

@see PermissionCollection#isReadOnly()

## Permissions.implies(Permission)

```java
public boolean implies(Permission permission)
```

Checks to see if this object's {@code PermissionCollection} for
permissions of the specified permission's class implies the permissions
expressed in the <i>permission</i> object. Returns {@code true} if the
combination of permissions in the appropriate
{@code PermissionCollection} (e.g., a {@code FilePermissionCollection}
for a {@code FilePermission}) together imply the specified permission.

<p>For example, suppose there is a {@code FilePermissionCollection}
in this {@code Permissions} object, and it contains one
{@code FilePermission} that specifies "read" access for all files
in all subdirectories of the "/tmp" directory, and another
{@code FilePermission} that specifies "write" access for all files
in the "/tmp/scratch/foo" directory. Then if the {@code implies} method
is called with a permission specifying both "read" and "write" access
to files in the "/tmp/scratch/foo" directory, {@code true} is
returned.

<p>Additionally, if this {@code PermissionCollection} contains the
{@code AllPermission}, this method will always return {@code true}.

@param permission the {@code Permission} object to check.

@return {@code true} if "permission" is implied by the permissions in the
{@code PermissionCollection} it belongs to, {@code false} if not.

## Permissions.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the {@code Permission} objects in all the
{@code PermissionCollection} objects in this {@code Permissions} object.

@return an enumeration of all the {@code Permission} objects.

## Permissions.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the {@code PermissionsHash}.

@param permission the {@code Permission} object to add.

## Permissions.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

@param permission the {@code Permission} object to compare

@return {@code true} if "permission" is a proper subset of a permission
in the set, {@code false} if not.

## Permissions.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the {@code Permission} objects in the
container.

@return an enumeration of all the {@code Permission} objects.