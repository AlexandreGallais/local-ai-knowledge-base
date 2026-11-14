---
title: "LinkPermission class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/LinkPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LinkPermission class (java.nio.file)

```java
public final class LinkPermission extends BasicPermission
```

The `Permission` class for link creation operations.

**Deprecated:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**Since:** 1.7

## LinkPermission.LinkPermission(String)

```java
public LinkPermission(String name)
```

Constructs a `LinkPermission` with the specified name.

Parameters:

- `name`: the name of the permission. It must be "hard" or "symbolic".

Throws:

- `IllegalArgumentException`: if name is empty or invalid

## LinkPermission.LinkPermission(String, String)

```java
public LinkPermission(String name, String actions)
```

Constructs a `LinkPermission` with the specified name.

Parameters:

- `name`: the name of the permission; must be "hard" or "symbolic".
- `actions`: the actions for the permission; must be the empty string or `null`

Throws:

- `IllegalArgumentException`: if name is empty or invalid, or actions is a non-empty string
