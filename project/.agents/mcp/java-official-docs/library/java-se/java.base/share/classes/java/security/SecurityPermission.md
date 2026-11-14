---
title: "SecurityPermission class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/SecurityPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecurityPermission class (java.security)

```java
public final class SecurityPermission extends BasicPermission
```

This class is for security permissions. A `SecurityPermission`
contains a name (also referred to as a "target name") but no actions list;
you either have the named permission or you don't.

The target name is the name of a security configuration parameter.

**Deprecated:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**See also:** java.security.BasicPermission

**See also:** java.security.Permission

**See also:** java.security.Permissions

**See also:** java.security.PermissionCollection

**See also:** java.lang.SecurityManager

**Since:** 1.2

## SecurityPermission.SecurityPermission(String)

```java
public SecurityPermission(String name)
```

Creates a new `SecurityPermission` with the specified name.
The name is the symbolic name of the `SecurityPermission`.
An asterisk may appear at the end of the name, following a ".",
or by itself, to signify a wildcard match.

Parameters:

- `name`: the name of the `SecurityPermission`

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.

## SecurityPermission.SecurityPermission(String, String)

```java
public SecurityPermission(String name, String actions)
```

Creates a new `SecurityPermission` object with the specified name.
The name is the symbolic name of the `SecurityPermission`, and the
actions `String` is currently unused and should be `null`.

Parameters:

- `name`: the name of the `SecurityPermission`
- `actions`: should be `null`.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.
