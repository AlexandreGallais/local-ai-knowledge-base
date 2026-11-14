---
title: "UserPrincipalLookupService class (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/UserPrincipalLookupService.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UserPrincipalLookupService class (java.nio.file.attribute)

```java
public abstract class UserPrincipalLookupService
```

An object to lookup user and group principals by name. A `UserPrincipal`
represents an identity that may be used to determine access rights to objects
in a file system. A `GroupPrincipal` represents a *group identity*.
A `UserPrincipalLookupService` defines methods to lookup identities by
name or group name (which are typically user or account names). Whether names
and group names are case sensitive or not depends on the implementation.
The exact definition of a group is implementation specific but typically a
group represents an identity created for administrative purposes so as to
determine the access rights for the members of the group. In particular it is
implementation specific if the *namespace* for names and groups is the
same or is distinct. To ensure consistent and correct behavior across
platforms it is recommended that this API be used as if the namespaces are
distinct. In other words, the lookupPrincipalByName should be used to lookup users, and lookupPrincipalByGroupName should be used to
lookup groups.

**Since:** 1.7

**See also:** java.nio.file.FileSystem#getUserPrincipalLookupService

## UserPrincipalLookupService.UserPrincipalLookupService()

```java
protected UserPrincipalLookupService()
```

Initializes a new instance of this class.

## UserPrincipalLookupService.lookupPrincipalByName(String)

```java
public abstract UserPrincipal lookupPrincipalByName(String name) throws IOException
```

Lookup a user principal by name.

Parameters:

- `name`: the string representation of the user principal to lookup

**Returns:** a user principal

Throws:

- `UserPrincipalNotFoundException`: the principal does not exist
- `IOException`: if an I/O error occurs

## UserPrincipalLookupService.lookupPrincipalByGroupName(String)

```java
public abstract GroupPrincipal lookupPrincipalByGroupName(String group) throws IOException
```

Lookup a group principal by group name.

 Where an implementation does not support any notion of group then
this method always throws `UserPrincipalNotFoundException`. Where
the namespace for user accounts and groups is the same, then this method
is identical to invoking lookupPrincipalByName.

Parameters:

- `group`: the string representation of the group to lookup

**Returns:** a group principal

Throws:

- `UserPrincipalNotFoundException`: the principal does not exist or is not a group
- `IOException`: if an I/O error occurs
