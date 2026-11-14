---
title: "ReflectPermission class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/ReflectPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ReflectPermission class (java.lang.reflect)

```java
public final class ReflectPermission extends java.security.BasicPermission
```

The Permission class for reflective operations.

**Deprecated:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**See also:** java.security.Permission

**See also:** java.security.BasicPermission

**See also:** AccessibleObject

**Since:** 1.2

## ReflectPermission.ReflectPermission(String)

```java
public ReflectPermission(String name)
```

Constructs a ReflectPermission with the specified name.

Parameters:

- `name`: the name of the ReflectPermission

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.

## ReflectPermission.ReflectPermission(String, String)

```java
public ReflectPermission(String name, String actions)
```

Constructs a ReflectPermission with the specified name and actions.
The actions should be null; they are ignored.

Parameters:

- `name`: the name of the ReflectPermission
- `actions`: should be null

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if `name` is empty.
