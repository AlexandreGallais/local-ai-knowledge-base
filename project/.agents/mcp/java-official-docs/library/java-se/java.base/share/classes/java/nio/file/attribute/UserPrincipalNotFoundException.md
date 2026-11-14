---
title: "UserPrincipalNotFoundException class (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/UserPrincipalNotFoundException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UserPrincipalNotFoundException class (java.nio.file.attribute)

```java
public class UserPrincipalNotFoundException extends IOException
```

Checked exception thrown when a lookup of `UserPrincipal` fails because
the principal does not exist.

**Since:** 1.7

## UserPrincipalNotFoundException.UserPrincipalNotFoundException(String)

```java
public UserPrincipalNotFoundException(String name)
```

Constructs an instance of this class.

Parameters:

- `name`: the principal name; may be `null`

## UserPrincipalNotFoundException.getName()

```java
public String getName()
```

Returns the user principal name if this exception was created with the
user principal name that was not found, otherwise `null`.

**Returns:** the user principal name or `null`
