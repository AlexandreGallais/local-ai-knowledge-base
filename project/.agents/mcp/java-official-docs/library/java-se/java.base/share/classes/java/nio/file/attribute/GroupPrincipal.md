---
title: "GroupPrincipal interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/GroupPrincipal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GroupPrincipal interface (java.nio.file.attribute)

```java
public interface GroupPrincipal extends UserPrincipal
```

A `UserPrincipal` representing a *group identity*, used to
determine access rights to objects in a file system. The exact definition of
a group is implementation specific, but typically, it represents an identity
created for administrative purposes so as to determine the access rights for
the members of the group. Whether an entity can be a member of multiple
groups, and whether groups can be nested, are implementation specified and
therefore not specified.

**Since:** 1.7

**See also:** UserPrincipalLookupService#lookupPrincipalByGroupName
