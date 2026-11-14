---
title: "Policy class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Policy.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Policy class (java.security)

```java
public abstract class Policy
```

A `Policy` object was responsible for determining whether code
executing in the Java runtime environment had permission to perform a
security-sensitive operation. This feature no longer exists.

**Since:** 1.2

**Deprecated:** This class was only useful in conjunction with
      the Security Manager, which is no longer
      supported. Installing a system-wide `Policy` object is no longer
      supported. The setPolicy method has been
      changed to always throw `UnsupportedOperationException`. The
      getPolicy method has been changed to always
      return a `Policy` object that grants no permissions. There is no
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

**Since:** 1.6

## Policy.getPolicy()

```java
public static Policy getPolicy()
```

Returns a `Policy` object that grants no permissions.
Specifically:

-  The `getParameters` method returns `null`.

-  The `getPermissions(CodeSource)` and
    `getPermissions(ProtectionDomain)` methods return a read-only
    empty `PermissionCollection`.

-  The `implies` method always returns `false`.

**Returns:** a `Policy` object that grants no permissions

**API note:** This method originally returned the installed `Policy`
   object, or if no `Policy` object had been installed, a default
   `Policy` implementation. Installing a system-wide `Policy`
   object is no longer supported. This method always returns a
   default `Policy` object that grants no permissions. A
   `Policy` object was only useful in conjunction with
   the Security Manager, which is no
   longer supported. There is no replacement for this method.

**See also:** #setPolicy(java.security.Policy)

## Policy.setPolicy(Policy)

```java
public static void setPolicy(Policy p)
```

Throws `UnsupportedOperationException`. Setting a system-wide
`Policy` object is not supported.

Parameters:

- `p`: ignored

**API note:** This method originally installed the system-wide
   `Policy` object. Installing a system-wide `Policy` object
   is no longer supported. A `Policy` object was only useful in
   conjunction with the Security Manager,
   which is no longer supported. There is no replacement for this method.

**See also:** #getPolicy()

Throws:

- `UnsupportedOperationException`: always

## Policy.getInstance(String, Policy.Parameters)

```java
public static Policy getInstance(String type, Policy.Parameters params) throws NoSuchAlgorithmException
```

Returns a Policy object of the specified type.

 This method traverses the list of registered security providers,
starting with the most preferred provider.
A new `Policy` object encapsulating the
`PolicySpi` implementation from the first
provider that supports the specified type is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `type`: the specified Policy type
- `params`: parameters for the `Policy`, which may be `null`.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different than the order of providers returned by
Security.getProviders().

**Returns:** the new `Policy` object

**See also:** Provider

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if the specified parameters are not understood by the `PolicySpi` implementation from the selected `Provider`
- `NoSuchAlgorithmException`: if no `Provider` supports a `PolicySpi` implementation for the specified type
- `NullPointerException`: if `type` is `null`

## Policy.getInstance(String, Policy.Parameters, String)

```java
public static Policy getInstance(String type, Policy.Parameters params, String provider) throws NoSuchProviderException, NoSuchAlgorithmException
```

Returns a `Policy` object of the specified type.

 A new `Policy` object encapsulating the
`PolicySpi` implementation from the specified provider
is returned.   The specified provider must be registered
in the provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `type`: the specified Policy type
- `params`: parameters for the `Policy`, which may be `null`.
- `provider`: the provider.

**Returns:** the new `Policy` object

**See also:** Provider

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if the specified provider is `null` or empty, or if the specified parameters are not understood by the `PolicySpi` implementation from the specified provider
- `NoSuchAlgorithmException`: if the specified provider does not support a `PolicySpi` implementation for the specified type
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `type` is `null`

## Policy.getInstance(String, Policy.Parameters, Provider)

```java
public static Policy getInstance(String type, Policy.Parameters params, Provider provider) throws NoSuchAlgorithmException
```

Returns a `Policy` object of the specified type.

 A new `Policy` object encapsulating the
`PolicySpi` implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

Parameters:

- `type`: the specified Policy type
- `params`: parameters for the `Policy`, which may be `null`.
- `provider`: the `Provider`.

**Returns:** the new `Policy` object

**See also:** Provider

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if the specified `Provider` is `null`, or if the specified parameters are not understood by the `PolicySpi` implementation from the specified `Provider`
- `NoSuchAlgorithmException`: if the specified `Provider` does not support a `PolicySpi` implementation for the specified type
- `NullPointerException`: if `type` is `null`

## Policy.getProvider()

```java
public Provider getProvider()
```

Return the `Provider` of this policy.

 This `Policy` instance will only have a provider if it
was obtained via a call to `Policy.getInstance`.
Otherwise this method returns `null`.

**Returns:** the `Provider` of this policy, or `null`.

**Since:** 1.6

## Policy.getType()

```java
public String getType()
```

Return the type of this `Policy`.

 This `Policy` instance will only have a type if it
was obtained via a call to `Policy.getInstance`.
Otherwise this method returns `null`.

**Returns:** the type of this `Policy`, or `null`.

**Since:** 1.6

## Policy.getParameters()

```java
public Policy.Parameters getParameters()
```

Return `Policy` parameters.

 This `Policy` instance will only have parameters if it
was obtained via a call to `Policy.getInstance`.
Otherwise this method returns `null`.

**Returns:** `Policy` parameters, or `null`.

**Since:** 1.6

## Policy.getPermissions(CodeSource)

```java
public PermissionCollection getPermissions(CodeSource codesource)
```

Return a PermissionCollection object containing the set of
permissions granted to the specified CodeSource.

 The default implementation of this method ignores the
CodeSource and returns Policy.UNSUPPORTED_EMPTY_COLLECTION.

Parameters:

- `codesource`: ignored

**Returns:** a set of permissions granted to the specified CodeSource.
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

 The default implementation of this method ignores the
ProtectionDomain and returns Policy.UNSUPPORTED_EMPTY_COLLECTION.

Parameters:

- `domain`: ignored

**Returns:** a set of permissions granted to the specified ProtectionDomain.
         If this operation is supported, the returned
         set of permissions must be a new mutable instance
         and it must support heterogeneous Permission types.
         If this operation is not supported,
         Policy.UNSUPPORTED_EMPTY_COLLECTION is returned.

**Since:** 1.4

## Policy.implies(ProtectionDomain, Permission)

```java
public boolean implies(ProtectionDomain domain, Permission permission)
```

Evaluates the permissions granted to the ProtectionDomain and tests
whether the permission is granted.

 The default implementation of this method ignores the
ProtectionDomain and Permission parameters and always returns false.

Parameters:

- `domain`: ignored
- `permission`: ignored

**Returns:** `false` always

**See also:** java.security.ProtectionDomain

**Since:** 1.4

## Policy.refresh()

```java
public void refresh()
```

Refreshes/reloads the policy configuration.

 The default implementation of this method does nothing.

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

Parameters:

- `permission`: the Permission object to add.

Throws:

- `SecurityException`: if this PermissionCollection object has been marked readonly

## Policy.implies(Permission)

```java
public boolean implies(Permission permission)
```

Checks to see if the specified permission is implied by the
collection of Permission objects held in this PermissionCollection.

Parameters:

- `permission`: the Permission object to compare.

**Returns:** `true` if "permission" is implied by the permissions in
the collection, `false` if not.

## Policy.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the Permission objects in the
collection.

**Returns:** an enumeration of all the Permissions.

## Policy.isReadOnly()

```java
public boolean isReadOnly()
```

If this object is readonly, no new objects can be added to it using `add`.

**Returns:** `true` if this object is marked as readonly, `false` otherwise.
