---
title: "NamedParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/NamedParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NamedParameterSpec class (java.security.spec)

```java
public class NamedParameterSpec implements AlgorithmParameterSpec
```

This class is used to specify any algorithm parameters that are determined
by a standard name. This class also holds constants for standard parameter
set names. The names of these constants exactly match the corresponding
parameter set name. For example, `NamedParameterSpec.X25519`
represents the parameter set identified by the string "X25519". These
strings are defined in the
         Java Security Standard Algorithm Names Specification.

**Since:** 11

## NamedParameterSpec.X25519

```java
public static final NamedParameterSpec X25519
```

The X25519 parameters

## NamedParameterSpec.X448

```java
public static final NamedParameterSpec X448
```

The X448 parameters

## NamedParameterSpec.ED25519

```java
public static final NamedParameterSpec ED25519
```

The Ed25519 parameters

**Since:** 15

## NamedParameterSpec.ED448

```java
public static final NamedParameterSpec ED448
```

The Ed448 parameters

**Since:** 15

## NamedParameterSpec.ML_DSA_44

```java
public static final NamedParameterSpec ML_DSA_44
```

The ML-DSA-44 parameters

**Since:** 24

## NamedParameterSpec.ML_DSA_65

```java
public static final NamedParameterSpec ML_DSA_65
```

The ML-DSA-65 parameters

**Since:** 24

## NamedParameterSpec.ML_DSA_87

```java
public static final NamedParameterSpec ML_DSA_87
```

The ML-DSA-87 parameters

**Since:** 24

## NamedParameterSpec.ML_KEM_512

```java
public static final NamedParameterSpec ML_KEM_512
```

The ML-KEM-512 parameters

**Since:** 24

## NamedParameterSpec.ML_KEM_768

```java
public static final NamedParameterSpec ML_KEM_768
```

The ML-KEM-768 parameters

**Since:** 24

## NamedParameterSpec.ML_KEM_1024

```java
public static final NamedParameterSpec ML_KEM_1024
```

The ML-KEM-1024 parameters

**Since:** 24

## NamedParameterSpec.NamedParameterSpec(String)

```java
public NamedParameterSpec(String stdName)
```

Creates a parameter specification using a standard (or predefined)
name `stdName`. For the
list of supported names, please consult the documentation
of the provider whose implementation will be used.

Parameters:

- `stdName`: the standard name of the algorithm parameters. See the NamedParameterSpec section in the  Java Security Standard Algorithm Names Specification for information about standard names.

Throws:

- `NullPointerException`: if `stdName` is null.

## NamedParameterSpec.getName()

```java
public String getName()
```

Returns the standard name that determines the algorithm parameters.

**Returns:** the standard name.
