# PermissionCollection class (java.security)

```java
public abstract class PermissionCollection implements java.io.Serializable
```

Abstract class representing a collection of Permission objects.

<p>With a {@code PermissionCollection}, you can:
<UL>
<LI> add a permission to the collection using the {@code add} method.
<LI> check to see if a particular permission is implied in the
     collection, using the {@code implies} method.
<LI> enumerate all the permissions, using the {@code elements} method.
</UL>

<p>When it is desirable to group together a number of {@code Permission}
objects of the same type, the {@code newPermissionCollection} method on that
particular type of {@code Permission} object should first be called. The
default behavior (from the {@code Permission} class) is to simply return
{@code null}. Subclasses of class {@code Permission} override the method if
they need to store their permissions in a particular
{@code PermissionCollection} object in order to provide the correct
semantics when the {@code PermissionCollection.implies} method is called.
If a non-null value is returned, that {@code PermissionCollection} must be
used. If {@code null} is returned, then the caller of
{@code newPermissionCollection} is free to store permissions of the
given type in any {@code PermissionCollection} they choose
(one that uses a {@code Hashtable}, one that uses a {@code Vector}, etc.).

<p>The collection returned by the {@code Permission.newPermissionCollection}
method is a homogeneous collection, which stores only {@code Permission}
objects for a given permission type.  A {@code PermissionCollection} may
also be heterogeneous.  For example, {@code Permissions} is a
{@code PermissionCollection} subclass that represents a collection of
{@code PermissionCollection} objects.
That is, its members are each a homogeneous {@code PermissionCollection}.
For example, a {@code Permission} object might have a
{@code FilePermissionCollection} for all the {@code FilePermission} objects,
a {@code SocketPermissionCollection} for all the {@code SocketPermission}
objects, and so on. Its {@code add} method adds a
permission to the appropriate collection.

<p>Whenever a permission is added to a heterogeneous
{@code PermissionCollection} such as {@code Permissions}, and the
{@code PermissionCollection} doesn't yet contain a
{@code PermissionCollection} of the specified permission's type, the
{@code PermissionCollection} should call
the {@code newPermissionCollection} method on the permission's class
to see if it requires a special {@code PermissionCollection}. If
{@code newPermissionCollection}
returns {@code null}, the {@code PermissionCollection}
is free to store the permission in any type of {@code PermissionCollection}
it desires (one using a {@code Hashtable}, one using a {@code Vector}, etc.).
For example, the {@code Permissions} object uses a default
{@code PermissionCollection} implementation that stores the permission
objects in a {@code Hashtable}.

<p> Subclass implementations of {@code PermissionCollection} should assume
that they may be called simultaneously from multiple threads,
and therefore should be synchronized properly.  Furthermore,
Enumerations returned via the {@code elements} method are
not <em>fail-fast</em>.  Modifications to a collection should not be
performed while enumerating over that collection.

@see Permission
@see Permissions


@author Roland Schemers
@since 1.2

## PermissionCollection.PermissionCollection()

```java
public PermissionCollection()
```

Constructor for subclasses to call.

## PermissionCollection.add(Permission)

```java
public abstract void add(Permission permission)
```

Adds a permission object to the current collection of permission objects.

@param permission the Permission object to add.

@throws    SecurityException    if this {@code PermissionCollection}
                                object has been marked readonly
@throws    IllegalArgumentException   if this
               {@code PermissionCollection}
               object is a homogeneous collection and the permission
               is not of the correct type.

## PermissionCollection.implies(Permission)

```java
public abstract boolean implies(Permission permission)
```

Checks to see if the specified permission is implied by
the collection of {@code Permission} objects held in this
{@code PermissionCollection}.

@param permission the {@code Permission} object to compare.

@return {@code true} if "permission" is implied by the  permissions in
the collection, {@code false} if not.

## PermissionCollection.elements()

```java
public abstract Enumeration<Permission> elements()
```

Returns an enumeration of all the Permission objects in the collection.

@return an enumeration of all the Permissions.
@see #elementsAsStream()

## PermissionCollection.elementsAsStream()

```java
public Stream<Permission> elementsAsStream()
```

Returns a stream of all the Permission objects in the collection.

<p> The collection should not be modified (see {@link #add}) during the
execution of the terminal stream operation. Otherwise, the result of the
terminal stream operation is undefined.

@implSpec
The default implementation creates a stream whose source is derived from
the enumeration returned from a call to {@link #elements()}.

@return a stream of all the Permissions.
@since 9

## PermissionCollection.setReadOnly()

```java
public void setReadOnly()
```

Marks this {@code PermissionCollection} object as "readonly". After
a {@code PermissionCollection} object
is marked as readonly, no new {@code Permission} objects
can be added to it using {@code add}.

## PermissionCollection.isReadOnly()

```java
public boolean isReadOnly()
```

Returns {@code true} if this {@code PermissionCollection} object is
marked as readonly. If it is readonly, no new {@code Permission}
objects can be added to it using {@code add}.

<p>By default, the object is <i>not</i> readonly. It can be set to
readonly by a call to {@code setReadOnly}.

@return {@code true} if this {@code PermissionCollection} object is
marked as readonly, {@code false} otherwise.

## PermissionCollection.toString()

```java
public String toString()
```

Returns a string describing this {@code PermissionCollection} object,
providing information about all the permissions it contains.
The format is:
<pre>
super.toString() (
  // enumerate all the Permission
  // objects and call toString() on them,
  // one per line..
)</pre>

{@code super.toString} is a call to the {@code toString}
method of this
object's superclass, which is {@code Object}. The result is
this collection's type name followed by this object's
hashcode, thus enabling clients to differentiate different
{@code PermissionCollection} objects, even if they contain the
same permissions.

@return information about this {@code PermissionCollection} object,
        as described above.