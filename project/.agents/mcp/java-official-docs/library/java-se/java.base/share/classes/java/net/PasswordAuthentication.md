---
title: "PasswordAuthentication class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/PasswordAuthentication.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PasswordAuthentication class (java.net)

```java
public final class PasswordAuthentication
```

The class PasswordAuthentication is a data holder that is used by
Authenticator.  It is simply a repository for a user name and a password.

**See also:** java.net.Authenticator

**See also:** java.net.Authenticator#getPasswordAuthentication()

**Since:** 1.2

## PasswordAuthentication.PasswordAuthentication(String, char[])

```java
public PasswordAuthentication(String userName, char[] password)
```

Creates a new `PasswordAuthentication` object from the given
user name and password.

 Note that the given user password is cloned before it is stored in
the new `PasswordAuthentication` object.

Parameters:

- `userName`: the user name
- `password`: the user's password

## PasswordAuthentication.getUserName()

```java
public String getUserName()
```

Returns the user name.

**Returns:** the user name

## PasswordAuthentication.getPassword()

```java
public char[] getPassword()
```

Returns the user password.

 Note that this method returns a reference to the password. It is
the caller's responsibility to zero out the password <example-value> after
it is no longer needed.

**Returns:** the password
