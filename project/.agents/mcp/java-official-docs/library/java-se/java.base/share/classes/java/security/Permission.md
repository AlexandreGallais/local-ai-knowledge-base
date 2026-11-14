---
title: "Permission class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Permission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Permission class (java.security)

```java
public abstract class Permission implements Guard, java.io.Serializable
```

Abstract class for representing access to a system resource.
All permissions have a name (whose interpretation depends on the subclass),
as well as abstract functions for defining the semantics of the
particular Permission subclass.

Most `Permission` objects also include an "actions" list that
tells the actions that are permitted for the object.  For example,
for a `java.io.FilePermission` object, the permission name is
the pathname of a file (or directory), and the actions list
(such as "read, write") specifies which actions are granted for the
specified file (or for files in the specified directory).
The actions list is optional for `Permission` objects, such as
`java.lang.RuntimePermission`,
that don't need such a list; you either have the named permission (such
as "system.exit") or you don't.

An important method that must be implemented by each subclass is
the `implies` method to compare Permissions. Basically,
"permission p1 implies permission p2" means that
if one is granted permission p1, one is naturally granted permission p2.
Thus, this is not an equality test, but rather more of a
subset test.

 `Permission` objects are similar to `String` objects
in that they are immutable once they have been created. Subclasses should not
provide methods that can change the state of a permission
once it has been created.

**See also:** Permissions

**See also:** PermissionCollection

**Since:** 1.2

## Permission.Permission(String)

```java
public Permission(String name)
```

Constructs a permission with the specified name.

Parameters:

- `name`: name of the `Permission` object being created.

## Permission.checkGuard(Object)

```java
public void checkGuard(Object object) throws SecurityException
```

Implements the guard interface for a permission.
Returns silently if access is granted. Otherwise, throws
a `SecurityException`.

Parameters:

- `object`: the object being guarded (currently ignored).

**API note:** This method originally threw a `SecurityException` if a
      security manager was enabled and the requested access, specified
      by this permission, was not permitted.
      The Security Manager is no longer
      supported; thus, this method always throws a
      `SecurityException`.

**See also:** Guard

**See also:** GuardedObject

Throws:

- `SecurityException`: always

## Permission.implies(Permission)

```java
public abstract boolean implies(Permission permission)
```

Checks if the specified permission's actions are "implied by"
this object's actions.

This must be implemented by subclasses of `Permission`, as they
are the only ones that can impose semantics on a `Permission`
object.

Parameters:

- `permission`: the permission to check against.

**Returns:** `true` if the specified permission is implied by this
object, `false` if not.

## Permission.equals(Object)

```java
public abstract boolean equals(Object obj)
```

Checks two `Permission` objects for equality.

Do not use the `equals` method for making access control
decisions; use the `implies` method.

Parameters:

- `obj`: the object we are testing for equality with this object.

**Returns:** `true` if both `Permission` objects are equivalent.

## Permission.hashCode()

```java
public abstract int hashCode()
```

Returns the hash code value for this `Permission` object.

The required `hashCode` behavior for `Permission` Objects is
the following:

- Whenever it is invoked on the same `Permission` object more
    than once during an execution of a Java application, the
    `hashCode` method
    must consistently return the same integer. This integer need not
    remain consistent from one execution of an application to another
    execution of the same application.

- If two `Permission` objects are equal according to the
    `equals`
    method, then calling the `hashCode` method on each of the
    two `Permission` objects must produce the same integer result.

**Returns:** a hash code value for this object.

## Permission.getName()

```java
public final String getName()
```

Returns the name of this `Permission`.
For example, in the case of a `java.io.FilePermission`,
the name will be a pathname.

**Returns:** the name of this `Permission`.

## Permission.getActions()

```java
public abstract String getActions()
```

Returns the actions as a `String`. This is abstract
so subclasses can defer creating a `String` representation until
one is needed. Subclasses should always return actions in what they
consider to be their
canonical form. For example, two FilePermission objects created via
the following:

```java
  perm1 = new FilePermission(p1,"read,write");
  perm2 = new FilePermission(p2,"write,read");
```

both return
"read,write" when the `getActions` method is invoked.

**Returns:** the actions of this `Permission`.

## Permission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns an empty `PermissionCollection` for a given
`Permission` object, or `null` if
one is not defined. Subclasses of class `Permission` should
override this if they need to store their permissions in a particular
`PermissionCollection` object in order to provide the correct
semantics when the `PermissionCollection.implies` method is called.
If `null` is returned,
then the caller of this method is free to store permissions of this
type in any `PermissionCollection` they choose (one that uses
a Hashtable, one that uses a Vector, etc.).

**Returns:** a new `PermissionCollection` object for this type of
`Permission`, or `null` if one is not defined.

## Permission.toString()

```java
public String toString()
```

Returns a string describing this `Permission`.  The convention
is to specify the class name, the permission name, and the actions in
the following format: '("ClassName" "name" "actions")', or
'("ClassName" "name")' if actions list is `null` or empty.

**Returns:** information about this `Permission`.
