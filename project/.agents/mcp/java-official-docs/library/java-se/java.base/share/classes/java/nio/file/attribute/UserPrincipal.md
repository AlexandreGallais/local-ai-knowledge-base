---
title: "UserPrincipal interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/UserPrincipal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UserPrincipal interface (java.nio.file.attribute)

```java
public interface UserPrincipal extends Principal
```

A `Principal` representing an identity used to determine access rights
to objects in a file system.

 On many platforms and file systems an entity requires appropriate access
rights or permissions in order to access objects in a file system. The
access rights are generally performed by checking the identity of the entity.
For example, on implementations that use Access Control Lists (ACLs) to
enforce privilege separation then a file in the file system may have an
associated ACL that determines the access rights of identities specified in
the ACL.

 A `UserPrincipal` object is an abstract representation of an
identity. It has a name that is typically the username or
account name that it represents. User principal objects may be obtained using
a `UserPrincipalLookupService`, or returned by `FileAttributeView` implementations that provide access to identity related
attributes. For example, the `AclFileAttributeView` and `PosixFileAttributeView` provide access to a file's owner.

**Since:** 1.7
