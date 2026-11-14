---
title: "AccessControlException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AccessControlException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AccessControlException class (java.security)

```java
public class AccessControlException extends SecurityException
```

This exception was originally thrown by the `AccessController` to
indicate that a requested access was denied.

**Since:** 1.2

**Deprecated:** This exception was only useful in conjunction with
      the Security Manager, which is no
      longer supported. There is no replacement for the Security Manager
      or this class.

## AccessControlException.AccessControlException(String)

```java
public AccessControlException(String s)
```

Constructs an `AccessControlException` with the
specified, detailed message.

Parameters:

- `s`: the detail message.

## AccessControlException.AccessControlException(String, Permission)

```java
public AccessControlException(String s, Permission p)
```

Constructs an `AccessControlException` with the
specified, detailed message, and the requested permission that caused
the exception.

Parameters:

- `s`: the detail message.
- `p`: the permission that caused the exception.

## AccessControlException.getPermission()

```java
public Permission getPermission()
```

Gets the `Permission` object associated with this exception, or
`null` if there was no corresponding `Permission` object.

**Returns:** the Permission object.
