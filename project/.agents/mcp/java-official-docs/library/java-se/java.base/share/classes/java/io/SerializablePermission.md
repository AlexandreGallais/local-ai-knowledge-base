---
title: "SerializablePermission class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/SerializablePermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SerializablePermission class (java.io)

```java
/* code was borrowed originally from java.lang.RuntimePermission. */ public final class SerializablePermission extends BasicPermission
```

This class is for Serializable permissions. A SerializablePermission
contains a name (also referred to as a "target name") but
no actions list; you either have the named permission
or you don't.

**Deprecated:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**See also:** java.security.BasicPermission

**See also:** java.security.Permission

**See also:** java.security.Permissions

**See also:** java.security.PermissionCollection

**Since:** 1.2

## SerializablePermission.SerializablePermission(String)

```java
public SerializablePermission(String name)
```

Creates a new SerializablePermission with the specified name.
The name is the symbolic name of the SerializablePermission, such as
"enableSubstitution", etc.

Parameters:

- `name`: the name of the SerializablePermission.

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.

## SerializablePermission.SerializablePermission(String, String)

```java
public SerializablePermission(String name, String actions)
```

Creates a new SerializablePermission object with the specified name.
The name is the symbolic name of the SerializablePermission, and the
actions String is currently unused and should be null.

Parameters:

- `name`: the name of the SerializablePermission.
- `actions`: currently unused and must be set to null

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.
