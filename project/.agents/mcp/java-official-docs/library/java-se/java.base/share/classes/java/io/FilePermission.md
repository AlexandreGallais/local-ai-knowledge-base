# FilePermission class (java.io)

```java
public final class FilePermission extends Permission implements Serializable
```

This class represents access to a file or directory.  A FilePermission consists
of a pathname and a set of actions valid for that pathname.
<P>
Pathname is the pathname of the file or directory granted the specified
actions. A pathname that ends in "/*" (where "/" is
the file separator character, {@code File.separatorChar}) indicates
all the files and directories contained in that directory. A pathname
that ends with "/-" indicates (recursively) all files
and subdirectories contained in that directory. Such a pathname is called
a wildcard pathname. Otherwise, it's a simple pathname.
<P>
A pathname consisting of the special token {@literal "<<ALL FILES>>"}
matches <b>any</b> file.
<P>
Note: A pathname consisting of a single "*" indicates all the files
in the current directory, while a pathname consisting of a single "-"
indicates all the files in the current directory and
(recursively) all files and subdirectories contained in the current
directory.
<P>
The actions are passed to the constructor in a string containing
a list of one or more comma-separated keywords. The possible keywords are
"read", "write", "execute", "delete", and "readlink".
<P>
The actions string is converted to lowercase before processing.

@deprecated
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@see java.security.Permission
@see java.security.Permissions
@see java.security.PermissionCollection


@author Marianne Mueller
@author Roland Schemers
@since 1.2

@serial exclude

## FilePermission.FilePermission(String, String)

```java
public FilePermission(String path, String actions)
```

Creates a new FilePermission object with the specified actions.
<i>path</i> is the pathname of a file or directory, and <i>actions</i>
contains a comma-separated list of the desired actions granted on the
file or directory. Possible actions are
"read", "write", "execute", "delete", and "readlink".

<p>A pathname that ends in "/*" (where "/" is
the file separator character, {@code File.separatorChar})
indicates all the files and directories contained in that directory.
A pathname that ends with "/-" indicates (recursively) all files and
subdirectories contained in that directory. The special pathname
{@literal "<<ALL FILES>>"} matches any file.

<p>A pathname consisting of a single "*" indicates all the files
in the current directory, while a pathname consisting of a single "-"
indicates all the files in the current directory and
(recursively) all files and subdirectories contained in the current
directory.

<p>A pathname containing an empty string represents an empty path.

@implNote In this implementation, the
{@systemProperty jdk.io.permissionsUseCanonicalPath} system property
dictates how the {@code path} argument is processed and stored.
<P>
If the value of the system property is set to {@code true}, {@code path}
is canonicalized and stored as a String object named {@code cpath}.
This means a relative path is converted to an absolute path, a Windows
DOS-style 8.3 path is expanded to a long path, and a symbolic link is
resolved to its target, etc.
<P>
If the value of the system property is set to {@code false}, {@code path}
is converted to a {@link java.nio.file.Path} object named {@code npath}
after {@link Path#normalize() normalization}. No canonicalization is
performed which means the underlying file system is not accessed.
If an {@link InvalidPathException} is thrown during the conversion,
this {@code FilePermission} will be labeled as invalid.
<P>
In either case, the "*" or "-" character at the end of a wildcard
{@code path} is removed before canonicalization or normalization.
It is stored in a separate wildcard flag field.
<P>
The default value of the {@code jdk.io.permissionsUseCanonicalPath}
system property is {@code false} in this implementation.
<p>
The value can also be set with a security property using the same name,
but setting a system property will override the security property value.

@param path the pathname of the file/directory.
@param actions the action string.

@throws IllegalArgumentException if actions is {@code null}, empty,
        malformed or contains an action other than the specified
        possible actions

## FilePermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if this FilePermission object "implies" the specified permission.
<P>
More specifically, this method returns true if:
<ul>
<li> <i>p</i> is an instanceof FilePermission,
<li> <i>p</i>'s actions are a proper subset of this
object's actions, and
<li> <i>p</i>'s pathname is implied by this object's
     pathname. For example, "/tmp/*" implies "/tmp/foo", since
     "/tmp/*" encompasses all files in the "/tmp" directory,
     including the one named "foo".
</ul>
<P>
Precisely, a simple pathname implies another simple pathname
if and only if they are equal. A simple pathname never implies
a wildcard pathname. A wildcard pathname implies another wildcard
pathname if and only if all simple pathnames implied by the latter
are implied by the former. A wildcard pathname implies a simple
pathname if and only if
<ul>
    <li>if the wildcard flag is "*", the simple pathname's path
    must be right inside the wildcard pathname's path.
    <li>if the wildcard flag is "-", the simple pathname's path
    must be recursively inside the wildcard pathname's path.
</ul>
<P>
{@literal "<<ALL FILES>>"} implies every other pathname. No pathname,
except for {@literal "<<ALL FILES>>"} itself, implies
{@literal "<<ALL FILES>>"}.

@implNote
If {@code jdk.io.permissionsUseCanonicalPath} is {@code true}, a
simple {@code cpath} is inside a wildcard {@code cpath} if and only if
after removing the base name (the last name in the pathname's name
sequence) from the former the remaining part is equal to the latter,
a simple {@code cpath} is recursively inside a wildcard {@code cpath}
if and only if the former starts with the latter.
<p>
If {@code jdk.io.permissionsUseCanonicalPath} is {@code false}, a
simple {@code npath} is inside a wildcard {@code npath} if and only if
{@code  simple_npath.relativize(wildcard_npath)} is exactly "..",
a simple {@code npath} is recursively inside a wildcard {@code npath}
if and only if {@code simple_npath.relativize(wildcard_npath)} is a
series of one or more "..". This means "/-" implies "/foo" but not "foo".
<p>
An invalid {@code FilePermission} does not imply any object except for
itself. An invalid {@code FilePermission} is not implied by any object
except for itself or a {@code FilePermission} on
{@literal "<<ALL FILES>>"} whose actions is a superset of this
invalid {@code FilePermission}. Even if two {@code FilePermission}
are created with the same invalid path, one does not imply the other.

@param p the permission to check against.

@return {@code true} if the specified permission is not
                 {@code null} and is implied by this object,
                 {@code false} otherwise.

## FilePermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two FilePermission objects for equality. Checks that <i>obj</i> is
a FilePermission, and has the same pathname and actions as this object.

@implNote More specifically, two pathnames are the same if and only if
they have the same wildcard flag and their {@code cpath}
(if {@code jdk.io.permissionsUseCanonicalPath} is {@code true}) or
{@code npath} (if {@code jdk.io.permissionsUseCanonicalPath}
is {@code false}) are equal. Or they are both {@literal "<<ALL FILES>>"}.
<p>
When {@code jdk.io.permissionsUseCanonicalPath} is {@code false}, an
invalid {@code FilePermission} does not equal to any object except
for itself, even if they are created using the same invalid path.

@param obj the object we are testing for equality with this object.
@return {@code true} if obj is a FilePermission, and has the same
         pathname and actions as this FilePermission object,
         {@code false} otherwise.

## FilePermission.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this object.

@return a hash code value for this object.

## FilePermission.getActions()

```java
public String getActions()
```

Returns the "canonical string representation" of the actions.
That is, this method always returns present actions in the following order:
read, write, execute, delete, readlink. For example, if this FilePermission
object allows both write and read actions, a call to {@code getActions}
will return the string "read,write".

@return the canonical string representation of the actions.

## FilePermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new PermissionCollection object for storing FilePermission
objects.
<p>
FilePermission objects must be stored in a manner that allows them
to be inserted into the collection in any order, but that also enables the
PermissionCollection {@code implies}
method to be implemented in an efficient (and consistent) manner.

<p>For example, if you have two FilePermissions:
<OL>
<LI>  {@code "/tmp/-", "read"}
<LI>  {@code "/tmp/scratch/foo", "write"}
</OL>

<p>and you are calling the {@code implies} method with the FilePermission:

<pre>
    "/tmp/scratch/foo", "read,write",
</pre>

then the {@code implies} function must
take into account both the "/tmp/-" and "/tmp/scratch/foo"
permissions, so the effective permission is "read,write",
and {@code implies} returns true. The "implies" semantics for
FilePermissions are handled properly by the PermissionCollection object
returned by this {@code newPermissionCollection} method.

@return a new PermissionCollection object suitable for storing
FilePermissions.

## FilePermission.FilePermissionCollection()

```java
public FilePermissionCollection()
```

Create an empty FilePermissionCollection object.

## FilePermission.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the FilePermissionCollection. The key for the hash is
permission.path.

@param permission the Permission object to add.

@throws    IllegalArgumentException   if the permission is not a
                                      FilePermission

@throws    SecurityException   if this FilePermissionCollection object
                               has been marked readonly

## FilePermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this set of permissions implies the permissions
expressed in "permission".

@param permission the Permission object to compare

@return true if "permission" is a proper subset of a permission in
the set, false if not.

## FilePermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the FilePermission objects in the
container.

@return an enumeration of all the FilePermission objects.