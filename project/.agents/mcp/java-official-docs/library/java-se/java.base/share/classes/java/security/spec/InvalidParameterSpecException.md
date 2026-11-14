---
title: "InvalidParameterSpecException class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/InvalidParameterSpecException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidParameterSpecException class (java.security.spec)

```java
public class InvalidParameterSpecException extends GeneralSecurityException
```

This is the exception for invalid parameter specifications.

**See also:** java.security.AlgorithmParameters

**See also:** AlgorithmParameterSpec

**See also:** DSAParameterSpec

**Since:** 1.2

## InvalidParameterSpecException.InvalidParameterSpecException()

```java
public InvalidParameterSpecException()
```

Constructs an InvalidParameterSpecException with no detail message. A
detail message is a String that describes this particular
exception.

## InvalidParameterSpecException.InvalidParameterSpecException(String)

```java
public InvalidParameterSpecException(String msg)
```

Constructs an InvalidParameterSpecException with the specified detail
message. A detail message is a String that describes this
particular exception.

Parameters:

- `msg`: the detail message.
