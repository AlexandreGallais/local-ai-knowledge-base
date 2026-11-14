---
title: "PolicySpi class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PolicySpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PolicySpi class (java.security)

```java
public abstract class PolicySpi
```

This class defines the *Service Provider Interface* (**SPI**)
for the `Policy` class. Installing a system-wide `Policy`
object is no longer supported.

**Since:** 1.6

**Deprecated:** This class was only useful in conjunction with
      the Security Manager, which is no
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

Parameters:

- `domain`: the ProtectionDomain to check
- `permission`: check whether this permission is granted to the specified domain

**Returns:** boolean `true` if the permission is granted to the domain

## PolicySpi.engineRefresh()

```java
protected void engineRefresh()
```

Refreshes/reloads the policy configuration.

 The default implementation of this method does nothing.

## PolicySpi.engineGetPermissions(CodeSource)

```java
protected PermissionCollection engineGetPermissions (CodeSource codesource)
```

Return a PermissionCollection object containing the set of
permissions granted to the specified CodeSource.

 The default implementation of this method returns
Policy.UNSUPPORTED_EMPTY_COLLECTION object.

Parameters:

- `codesource`: the CodeSource to which the returned PermissionCollection has been granted

**Returns:** a set of permissions granted to the specified CodeSource

## PolicySpi.engineGetPermissions(ProtectionDomain)

```java
protected PermissionCollection engineGetPermissions (ProtectionDomain domain)
```

Return a PermissionCollection object containing the set of
permissions granted to the specified ProtectionDomain.

 The default implementation of this method returns
Policy.UNSUPPORTED_EMPTY_COLLECTION object.

Parameters:

- `domain`: the ProtectionDomain to which the returned PermissionCollection has been granted

**Returns:** a set of permissions granted to the specified ProtectionDomain
