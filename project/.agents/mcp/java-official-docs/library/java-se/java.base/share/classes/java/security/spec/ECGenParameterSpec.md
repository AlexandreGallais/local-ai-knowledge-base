---
title: "ECGenParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/ECGenParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECGenParameterSpec class (java.security.spec)

```java
public class ECGenParameterSpec extends NamedParameterSpec
```

This immutable class specifies the set of parameters used for
generating elliptic curve (EC) domain parameters.

**See also:** AlgorithmParameterSpec

**Since:** 1.5

## ECGenParameterSpec.ECGenParameterSpec(String)

```java
public ECGenParameterSpec(String stdName)
```

Creates a parameter specification for EC parameter
generation using a standard (or predefined) name
`stdName` in order to generate the corresponding
(precomputed) elliptic curve domain parameters. For the
list of supported names, please consult the documentation
of the provider whose implementation will be used.

Parameters:

- `stdName`: the standard name of the to-be-generated EC domain parameters. See the ECGenParameterSpec section in the  Java Security Standard Algorithm Names Specification for information about standard names.

Throws:

- `NullPointerException`: if `stdName` is null.
