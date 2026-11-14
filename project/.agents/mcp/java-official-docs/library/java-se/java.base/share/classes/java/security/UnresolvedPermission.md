# UnresolvedPermission class (java.security)

```java
public final class UnresolvedPermission extends Permission implements java.io.Serializable
```

The {@code UnresolvedPermission} class used to hold Permissions that were
"unresolved" when the {@code Policy} was initialized. Installing a
system-wide {@code Policy} object is no longer supported.

@see java.security.Permission
@see java.security.Permissions
@see java.security.PermissionCollection
@see java.security.Policy

@author Roland Schemers
@since 1.2

@deprecated This permission cannot be used for controlling access to
      resources as the Security Manager is no longer supported.

## UnresolvedPermission.UnresolvedPermission(String, String, String, java.security.cert.Certificate[])

```java
public UnresolvedPermission(String type, String name, String actions, java.security.cert.Certificate[] certs)
```

Creates a new {@code UnresolvedPermission} containing the permission
information needed later to actually create a Permission of the
specified class, when the permission is resolved.

@param type the class name of the Permission class that will be
created when this unresolved permission is resolved.
@param name the name of the permission.
@param actions the actions of the permission.
@param certs the certificates the permission's class was signed with.
This is a list of certificate chains, where each chain is composed of a
signer certificate and optionally its supporting certificate chain.
Each chain is ordered bottom-to-top (i.e., with the signer certificate
first and the (root) certificate authority last). The signer
certificates are copied from the array. Subsequent changes to
the array will not affect this UnresolvedPermission.

## UnresolvedPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

This method always returns {@code false} for unresolved permissions.
That is, an {@code UnresolvedPermission} is never considered to
imply another permission.

@param p the permission to check against.

@return {@code false}.

## UnresolvedPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two {@code UnresolvedPermission} objects for equality.
Checks that {@code obj} is an {@code UnresolvedPermission}, and has
the same type (class) name, permission name, actions, and
certificates as this object.

<p> To determine certificate equality, this method only compares
actual signer certificates.  Supporting certificate chains
are not taken into consideration by this method.

@param obj the object we are testing for equality with this object.

@return true if {@code obj} is an {@code UnresolvedPermission},
and has the same type (class) name, permission name, actions, and
certificates as this object.

## UnresolvedPermission.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this object}

## UnresolvedPermission.getActions()

```java
public String getActions()
```

Returns the canonical string representation of the actions,
which currently is the empty string "", since there are no actions for
an {@code UnresolvedPermission}. That is, the actions for the
permission that will be created when this {@code UnresolvedPermission}
is resolved may be non-null, but an {@code UnresolvedPermission}
itself is never considered to have any actions.

@return the empty string "".

## UnresolvedPermission.getUnresolvedType()

```java
public String getUnresolvedType()
```

Get the type (class name) of the underlying permission that
has not been resolved.

@return the type (class name) of the underlying permission that
 has not been resolved

@since 1.5

## UnresolvedPermission.getUnresolvedName()

```java
public String getUnresolvedName()
```

Get the target name of the underlying permission that
has not been resolved.

@return the target name of the underlying permission that
         has not been resolved, or {@code null},
         if there is no target name

@since 1.5

## UnresolvedPermission.getUnresolvedActions()

```java
public String getUnresolvedActions()
```

Get the actions for the underlying permission that
has not been resolved.

@return the actions for the underlying permission that
         has not been resolved, or {@code null}
         if there are no actions

@since 1.5

## UnresolvedPermission.getUnresolvedCerts()

```java
public java.security.cert.Certificate[] getUnresolvedCerts()
```

Get the signer certificates (without any supporting chain)
for the underlying permission that has not been resolved.

@return the signer certificates for the underlying permission that
has not been resolved, or {@code null}, if there are no signer
certificates.
Returns a new array each time this method is called.

@since 1.5

## UnresolvedPermission.toString()

```java
public String toString()
```

Returns a string describing this {@code UnresolvedPermission}.
The convention is to specify the class name, the permission name,
and the actions, in the following format:
'(unresolved "ClassName" "name" "actions")'.

@return information about this {@code UnresolvedPermission}.

## UnresolvedPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new PermissionCollection object for storing
{@code UnresolvedPermission} objects.

@return a new PermissionCollection object suitable for
storing {@code UnresolvedPermissions}.