---
title: "RuntimePermission class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/RuntimePermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RuntimePermission class (java.lang)

```java
public final class RuntimePermission extends BasicPermission
```

This class is for runtime permissions. A `RuntimePermission`
contains a name (also referred to as a "target name") but no actions
list; you either have the named permission or you don't.

The target name is the name of the runtime permission. The naming convention
follows the hierarchical property naming convention, typically the reverse
domain name notation, to avoid name clashes.
An asterisk may appear at the end of the name, following a ".",
or by itself, to signify a wildcard match. For example: "loadLibrary.*"
and "*" signify a wildcard match, while "*loadLibrary" and "a*b" do not.

**Deprecated:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**See also:** java.security.BasicPermission

**See also:** java.security.Permission

**See also:** java.security.Permissions

**See also:** java.security.PermissionCollection

**See also:** java.lang.SecurityManager

**Since:** 1.2

## RuntimePermission.RuntimePermission(String)

```java
public RuntimePermission(String name)
```

Creates a new RuntimePermission with the specified name.
The name is the symbolic name of the RuntimePermission, such as
"exit", "setFactory", etc. An asterisk
may appear at the end of the name, following a ".", or by itself, to
signify a wildcard match.

Parameters:

- `name`: the name of the RuntimePermission.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.

## RuntimePermission.RuntimePermission(String, String)

```java
public RuntimePermission(String name, String actions)
```

Creates a new RuntimePermission object with the specified name.
The name is the symbolic name of the RuntimePermission, and the
actions String is currently unused and should be null.

Parameters:

- `name`: the name of the RuntimePermission.
- `actions`: should be null.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.
