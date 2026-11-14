# PolicySpi class (java.security)

```java
public abstract class PolicySpi
```

This class defines the <i>Service Provider Interface</i> (<b>SPI</b>)
for the {@code Policy} class. Installing a system-wide {@code Policy}
object is no longer supported.

@since 1.6
@deprecated This class was only useful in conjunction with
      {@linkplain SecurityManager the Security Manager}, which is no
      longer supported. There is no replacement for
      the Security Manager or this class.

## PolicySpi.PolicySpi()

```java
public PolicySpi()
```

Constructor.

## PolicySpi.engineImplies(ProtectionDomain, Permission)

```java
protected abstract boolean engineImplies (ProtectionDomain domain, Permission permission)
```

Check whether the policy has granted a Permission to a ProtectionDomain.

@param domain the ProtectionDomain to check

@param permission check whether this permission is granted to the
         specified domain

@return boolean {@code true} if the permission is granted to the domain

## PolicySpi.engineRefresh()

```java
protected void engineRefresh()
```

Refreshes/reloads the policy configuration.

<p> The default implementation of this method does nothing.

## PolicySpi.engineGetPermissions(CodeSource)

```java
protected PermissionCollection engineGetPermissions (CodeSource codesource)
```

Return a PermissionCollection object containing the set of
permissions granted to the specified CodeSource.

<p> The default implementation of this method returns
Policy.UNSUPPORTED_EMPTY_COLLECTION object.

@param codesource the CodeSource to which the returned
         PermissionCollection has been granted

@return a set of permissions granted to the specified CodeSource

## PolicySpi.engineGetPermissions(ProtectionDomain)

```java
protected PermissionCollection engineGetPermissions (ProtectionDomain domain)
```

Return a PermissionCollection object containing the set of
permissions granted to the specified ProtectionDomain.

<p> The default implementation of this method returns
Policy.UNSUPPORTED_EMPTY_COLLECTION object.

@param domain the ProtectionDomain to which the returned
         PermissionCollection has been granted

@return a set of permissions granted to the specified ProtectionDomain