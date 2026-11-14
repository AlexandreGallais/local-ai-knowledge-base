# ProtectionDomain class (java.security)

```java
public class ProtectionDomain
```

The {@code ProtectionDomain} class encapsulates the characteristics of a
domain, which encloses a set of classes whose instances are granted a set
of permissions.
<p>
A static set of permissions can be bound to a {@code ProtectionDomain}
when it is constructed; such permissions are granted to the domain
regardless of the policy in force. However, to support dynamic security
policies, a {@code ProtectionDomain} can also be constructed such that it
is dynamically mapped to a set of permissions by the current policy.

@apiNote Installing a system-wide {@link Policy} object is
no longer supported. The {@linkplain Policy#getPolicy current policy}
is always a {@code Policy} object that grants no permissions.

@author Li Gong
@author Roland Schemers
@author Gary Ellison
@since 1.2

## ProtectionDomain.ProtectionDomain(CodeSource, PermissionCollection)

```java
public ProtectionDomain(CodeSource codesource, PermissionCollection permissions)
```

Creates a new {@code ProtectionDomain} with the given {@code CodeSource}
and permissions. If permissions is not {@code null}, then
{@code setReadOnly()} will be called on the passed in
permissions.
<p>
The permissions granted to this domain are static, i.e.
invoking the {@link #staticPermissionsOnly()} method returns
{@code true}.
They contain only the ones passed to this constructor and
the current policy will not be consulted.

@apiNote Installing a system-wide {@link Policy} object is
no longer supported. The {@linkplain Policy#getPolicy current policy}
is always a {@code Policy} object that grants no permissions.

@param codesource the codesource associated with this domain
@param permissions the permissions granted to this domain

## ProtectionDomain.ProtectionDomain(CodeSource, PermissionCollection, ClassLoader, Principal[])

```java
public ProtectionDomain(CodeSource codesource, PermissionCollection permissions, ClassLoader classloader, Principal[] principals)
```

Creates a new {@code ProtectionDomain} qualified by the given
{@code CodeSource}, permissions, {@code ClassLoader} and array
of principals. If permissions is not {@code null}, then
{@code setReadOnly()} will be called on the passed in permissions.
<p>
The permissions granted to this domain are dynamic, i.e.
invoking the {@link #staticPermissionsOnly()} method returns
{@code false}.
They include both the static permissions passed to this constructor,
and any permissions granted to this domain by the current policy.

@apiNote Installing a system-wide {@link Policy} object is
no longer supported. The {@linkplain Policy#getPolicy current policy}
is always a {@code Policy} object that grants no permissions.

@param codesource the {@code CodeSource} associated with this domain
@param permissions the permissions granted to this domain
@param classloader the {@code ClassLoader} associated with this domain
@param principals the array of {@code Principal} objects associated
with this domain. The contents of the array are copied to protect against
subsequent modification.
@see Policy#getPermissions(ProtectionDomain)
@since 1.4

## ProtectionDomain.getCodeSource()

```java
public final CodeSource getCodeSource()
```

Returns the {@code CodeSource} of this domain.
@return the {@code CodeSource} of this domain which may be {@code null}.
@since 1.2

## ProtectionDomain.getClassLoader()

```java
public final ClassLoader getClassLoader()
```

Returns the {@code ClassLoader} of this domain.
@return the {@code ClassLoader} of this domain which may be {@code null}.

@since 1.4

## ProtectionDomain.getPrincipals()

```java
public final Principal[] getPrincipals()
```

Returns an array of principals for this domain.
@return a non-null array of principals for this domain.
Returns a new array each time this method is called.

@since 1.4

## ProtectionDomain.getPermissions()

```java
public final PermissionCollection getPermissions()
```

Returns the static permissions granted to this domain.

@return the static set of permissions for this domain which may be
{@code null}.
@see Policy#refresh
@see Policy#getPermissions(ProtectionDomain)

## ProtectionDomain.staticPermissionsOnly()

```java
public final boolean staticPermissionsOnly()
```

Returns {@code true} if this domain contains only static permissions
and does not check the current {@code Policy}.

@apiNote Installing a system-wide {@link Policy} object is
no longer supported. The {@linkplain Policy#getPolicy current policy}
is always a {@code Policy} object that grants no permissions.

@return {@code true} if this domain contains only static permissions.

@since 9

## ProtectionDomain.implies(Permission)

```java
public boolean implies(Permission perm)
```

Check and see if this {@code ProtectionDomain} implies the permissions
expressed in the {@code Permission} object.
<p>
The set of permissions evaluated is a function of whether the
{@code ProtectionDomain} was constructed with a static set of permissions
or it was bound to a dynamically mapped set of permissions.
<p>
If the {@link #staticPermissionsOnly()} method returns
{@code true}, then the permission will only be checked against the
{@code PermissionCollection} supplied at construction.
<p>
Otherwise, the permission will be checked against the combination
of the {@code PermissionCollection} supplied at construction and
the current policy.

@apiNote Installing a system-wide {@link Policy} object is
no longer supported. The {@linkplain Policy#getPolicy current policy}
is always a {@code Policy} object that grants no permissions.

@param perm the {code Permission} object to check.

@return {@code true} if {@code perm} is implied by this
{@code ProtectionDomain}.

## ProtectionDomain.toString()

```java
public String toString()
```

Convert a {@code ProtectionDomain} to a {@code String}.