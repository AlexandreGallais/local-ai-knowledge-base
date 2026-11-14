---
title: "SecureRandomParameters interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/SecureRandomParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecureRandomParameters interface (java.security)

```java
public interface SecureRandomParameters
```

A marker interface for parameters used in various `SecureRandom`
methods.

Some `SecureRandom` implementations might require additional
operational parameters. Objects of classes which implement this interface
can be passed to those implementations that support them.

**See also:** DrbgParameters

**Since:** 9
