---
title: "DomainCombiner interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/DomainCombiner.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DomainCombiner interface (java.security)

```java
public interface DomainCombiner
```

`DomainCombiner` was used to dynamically update
`ProtectionDomain`s for access control operations and decisions. This
feature no longer exists.

**Since:** 1.3

**Deprecated:** This class was only useful in conjunction with the Security Manager, which is no longer supported.
      There is no replacement for the Security Manager or this class.

## DomainCombiner.combine(ProtectionDomain[], ProtectionDomain[])

```java
ProtectionDomain[] combine(ProtectionDomain[] currentDomains, ProtectionDomain[] assignedDomains)
```

Modify or update the provided ProtectionDomains.
ProtectionDomains may be added to or removed from the given
ProtectionDomains.  The ProtectionDomains may be re-ordered.
Individual ProtectionDomains may be modified (with a new
set of Permissions, for example).

Parameters:

- `currentDomains`: the ProtectionDomains associated with the current execution thread. The ProtectionDomains are listed in order of execution, with the most recently executing `ProtectionDomain` residing at the beginning of the array. This parameter may be `null` if the current execution thread has no associated ProtectionDomains.
- `assignedDomains`: an array of inherited ProtectionDomains. This parameter may be `null` if there are no inherited ProtectionDomains.

**Returns:** a new array consisting of the updated ProtectionDomains,
         or `null`.
