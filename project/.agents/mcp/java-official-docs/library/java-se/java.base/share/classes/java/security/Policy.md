# Policy class (java.security)

```java
public abstract class Policy
```

A {@code Policy} object was responsible for determining whether code
executing in the Java runtime environment had permission to perform a
security-sensitive operation. This feature no longer exists.

@author Roland Schemers
@author Gary Ellison
@since 1.2
@deprecated This class was only useful in conjunction with
      {@linkplain SecurityManager the Security Manager}, which is no longer
      supported. Installing a system-wide {@code Policy} object is no longer
      supported. The {@linkplain #setPolicy setPolicy} method has been
      changed to always throw {@code UnsupportedOperationException}. The
      {@linkplain #getPolicy getPolicy} method has been changed to always
      return a {@code Policy} object that grants no permissions. There is no
      replacement for the Security Manager or this class.

## Policy.Policy()

```java
public Policy()
```

Constructor for subclasses to call.

## Policy.UNSUPPORTED_EMPTY_COLLECTION

```java
public static final PermissionCollection UNSUPPORTED_EMPTY_COLLECTION
```

A read-only empty PermissionCollection instance.
@since 1.6

## Policy.getPolicy()

```java
public static Policy getPolicy()
```

Returns a {@code Policy} object that grants no permissions.
Specifically:

<ul>
    <li> The {@code getParameters} method returns {@code null}. </li>
    <li> The {@code getPermissions(CodeSource)} and
    {@code getPermissions(ProtectionDomain)} methods return a read-only
    empty {@code PermissionCollection}. </li>
    <li> The {@code implies} method always returns {@code false}. </li>
</ul>

@return a {@code Policy} object that grants no permissions

@apiNote This method originally returned the installed {@code Policy}
   object, or if no {@code Policy} object had been installed, a default
   {@code Policy} implementation. Installing a system-wide {@code Policy}
   object is no longer supported. This method always returns a
   default {@code Policy} object that grants no permissions. A
   {@code Policy} object was only useful in conjunction with
   {@linkplain SecurityManager the Security Manager}, which is no
   longer supported. There is no replacement for this method.

@see #setPolicy(java.security.Policy)

## Policy.setPolicy(Policy)

```java
public static void setPolicy(Policy p)
```

Throws {@code UnsupportedOperationException}. Setting a system-wide
{@code Policy} object is not supported.

@param p ignored
@throws UnsupportedOperationException always
@apiNote This method originally installed the system-wide
   {@code Policy} object. Installing a system-wide {@code Policy} object
   is no longer supported. A {@code Policy} object was only useful in
   conjunction with {@linkplain SecurityManager the Security Manager},
   which is no longer supported. There is no replacement for this method.

@see #getPolicy()

## Policy.getInstance(String, Policy.Parameters)

```java
public static Policy getInstance(String type, Policy.Parameters params) throws NoSuchAlgorithmException
```

Returns a Policy object of the specified type.

<p> This method traverses the list of registered security providers,
starting with the most preferred provider.
A new {@code Policy} object encapsulating the
{@code PolicySpi} implementation from the first
provider that supports the specified type is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@implNote
The JDK Reference Implementation additionally uses the
{@code jdk.security.provider.preferred}
{@link Security#getProperty(String) Security} property to determine
the preferred provider order for the specified algorithm. This
may be different than the order of providers returned by
{@link Security#getProviders() Security.getProviders()}.

@param type the specified Policy type

@param params parameters for the {@code Policy}, which may be
{@code null}.

@return the new {@code Policy} object

@throws IllegalArgumentException if the specified parameters
        are not understood by the {@code PolicySpi} implementation
        from the selected {@code Provider}

@throws NoSuchAlgorithmException if no {@code Provider} supports
        a {@code PolicySpi} implementation for the specified type

@throws NullPointerException if {@code type} is {@code null}

@see Provider
@since 1.6

## Policy.getInstance(String, Policy.Parameters, String)

```java
public static Policy getInstance(String type, Policy.Parameters params, String provider) throws NoSuchProviderException, NoSuchAlgorithmException
```

Returns a {@code Policy} object of the specified type.

<p> A new {@code Policy} object encapsulating the
{@code PolicySpi} implementation from the specified provider
is returned.   The specified provider must be registered
in the provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param type the specified Policy type

@param params parameters for the {@code Policy}, which may be
{@code null}.

@param provider the provider.

@return the new {@code Policy} object

@throws IllegalArgumentException if the specified provider
        is {@code null} or empty, or if the specified parameters are
        not understood by the {@code PolicySpi} implementation from
        the specified provider

@throws NoSuchAlgorithmException if the specified provider does not
        support a {@code PolicySpi} implementation for the specified
        type

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code type} is {@code null}

@see Provider
@since 1.6

## Policy.getInstance(String, Policy.Parameters, Provider)

```java
public static Policy getInstance(String type, Policy.Parameters params, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code Policy} object of the specified type.

<p> A new {@code Policy} object encapsulating the
{@code PolicySpi} implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

@param type the specified Policy type

@param params parameters for the {@code Policy}, which may be
{@code null}.

@param provider the {@code Provider}.

@return the new {@code Policy} object

@throws IllegalArgumentException if the specified {@code Provider}
        is {@code null}, or if the specified parameters are not
        understood by the {@code PolicySpi} implementation from the
        specified {@code Provider}

@throws NoSuchAlgorithmException if the specified {@code Provider}
        does not support a {@code PolicySpi} implementation for
        the specified type

@throws NullPointerException if {@code type} is {@code null}

@see Provider
@since 1.6

## Policy.getProvider()

```java
public Provider getProvider()
```

Return the {@code Provider} of this policy.

<p> This {@code Policy} instance will only have a provider if it
was obtained via a call to {@code Policy.getInstance}.
Otherwise this method returns {@code null}.

@return the {@code Provider} of this policy, or {@code null}.

@since 1.6

## Policy.getType()

```java
public String getType()
```

Return the type of this {@code Policy}.

<p> This {@code Policy} instance will only have a type if it
was obtained via a call to {@code Policy.getInstance}.
Otherwise this method returns {@code null}.

@return the type of this {@code Policy}, or {@code null}.

@since 1.6

## Policy.getParameters()

```java
public Policy.Parameters getParameters()
```

Return {@code Policy} parameters.

<p> This {@code Policy} instance will only have parameters if it
was obtained via a call to {@code Policy.getInstance}.
Otherwise this method returns {@code null}.

@return {@code Policy} parameters, or {@code null}.

@since 1.6

## Policy.getPermissions(CodeSource)

```java
public PermissionCollection getPermissions(CodeSource codesource)
```

Return a PermissionCollection object containing the set of
permissions granted to the specified CodeSource.

<p> The default implementation of this method ignores the
CodeSource and returns Policy.UNSUPPORTED_EMPTY_COLLECTION.

@param codesource ignored

@return a set of permissions granted to the specified CodeSource.
         If this operation is supported, the returned
         set of permissions must be a new mutable instance
         and it must support heterogeneous Permission types.
         If this operation is not supported,
         Policy.UNSUPPORTED_EMPTY_COLLECTION is returned.

## Policy.getPermissions(ProtectionDomain)

```java
public PermissionCollection getPermissions(ProtectionDomain domain)
```

Return a PermissionCollection object containing the set of
permissions granted to the specified ProtectionDomain.

<p> The default implementation of this method ignores the
ProtectionDomain and returns Policy.UNSUPPORTED_EMPTY_COLLECTION.

@param domain ignored

@return a set of permissions granted to the specified ProtectionDomain.
         If this operation is supported, the returned
         set of permissions must be a new mutable instance
         and it must support heterogeneous Permission types.
         If this operation is not supported,
         Policy.UNSUPPORTED_EMPTY_COLLECTION is returned.

@since 1.4

## Policy.implies(ProtectionDomain, Permission)

```java
public boolean implies(ProtectionDomain domain, Permission permission)
```

Evaluates the permissions granted to the ProtectionDomain and tests
whether the permission is granted.

<p> The default implementation of this method ignores the
ProtectionDomain and Permission parameters and always returns false.

@param domain ignored
@param permission ignored

@return {@code false} always

@see java.security.ProtectionDomain
@since 1.4

## Policy.refresh()

```java
public void refresh()
```

Refreshes/reloads the policy configuration.

<p> The default implementation of this method does nothing.

## Policy.UnsupportedEmptyCollection()

```java
public UnsupportedEmptyCollection()
```

Create a read-only empty PermissionCollection object.

## Policy.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission object to the current collection of permission
objects.

@param permission the Permission object to add.

@throws    SecurityException   if this PermissionCollection object
                               has been marked readonly

## Policy.implies(Permission)

```java
public boolean implies(Permission permission)
```

Checks to see if the specified permission is implied by the
collection of Permission objects held in this PermissionCollection.

@param permission the Permission object to compare.

@return {@code true} if "permission" is implied by the permissions in
the collection, {@code false} if not.

## Policy.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the Permission objects in the
collection.

@return an enumeration of all the Permissions.

## Policy.isReadOnly()

```java
public boolean isReadOnly()
```

If this object is readonly, no new objects can be added to it using {@code add}.

@return {@code true} if this object is marked as readonly, {@code false} otherwise.