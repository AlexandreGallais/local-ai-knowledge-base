---
title: "NetPermission class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/NetPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NetPermission class (java.net)

```java
public final class NetPermission extends BasicPermission
```

This class is for various network permissions.
A NetPermission contains a name (also referred to as a "target name") but
no actions list; you either have the named permission
or you don't.

The target name is the name of the network permission. The naming convention
follows the hierarchical property naming convention, typically the reverse
domain name notation, to avoid name clashes.
An asterisk may appear at the end of the name, following a ".", or by itself,
to signify a wildcard match. For example: "foo.*" and "*" signify a wildcard
match, while "*foo" and "a*b" do not.

**Deprecated:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**See also:** java.security.BasicPermission

**See also:** java.security.Permission

**See also:** java.security.Permissions

**See also:** java.security.PermissionCollection

**See also:** java.lang.SecurityManager

**Since:** 1.2

## NetPermission.NetPermission(String)

```java
public NetPermission(String name)
```

Creates a new NetPermission with the specified name.
The name is the symbolic name of the NetPermission, such as
"setDefaultAuthenticator", etc. An asterisk
may appear at the end of the name, following a ".", or by itself, to
signify a wildcard match.

Parameters:

- `name`: the name of the NetPermission.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.

## NetPermission.NetPermission(String, String)

```java
public NetPermission(String name, String actions)
```

Creates a new NetPermission object with the specified name.
The name is the symbolic name of the NetPermission, and the
actions String is currently unused and should be null.

Parameters:

- `name`: the name of the NetPermission.
- `actions`: should be null.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.
