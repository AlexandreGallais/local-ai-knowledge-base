# NamedParameterSpec class (java.security.spec)

```java
public class NamedParameterSpec implements AlgorithmParameterSpec
```

This class is used to specify any algorithm parameters that are determined
by a standard name. This class also holds constants for standard parameter
set names. The names of these constants exactly match the corresponding
parameter set name. For example, {@code NamedParameterSpec.X25519}
represents the parameter set identified by the string "X25519". These
strings are defined in the <a href=
"{@docRoot}/../specs/security/standard-names.html#namedparameterspec">
         Java Security Standard Algorithm Names Specification</a>.

@spec security/standard-names.html Java Security Standard Algorithm Names
@since 11

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

@since 15

## NamedParameterSpec.ED448

```java
public static final NamedParameterSpec ED448
```

The Ed448 parameters

@since 15

## NamedParameterSpec.ML_DSA_44

```java
public static final NamedParameterSpec ML_DSA_44
```

The ML-DSA-44 parameters

@since 24

## NamedParameterSpec.ML_DSA_65

```java
public static final NamedParameterSpec ML_DSA_65
```

The ML-DSA-65 parameters

@since 24

## NamedParameterSpec.ML_DSA_87

```java
public static final NamedParameterSpec ML_DSA_87
```

The ML-DSA-87 parameters

@since 24

## NamedParameterSpec.ML_KEM_512

```java
public static final NamedParameterSpec ML_KEM_512
```

The ML-KEM-512 parameters

@since 24

## NamedParameterSpec.ML_KEM_768

```java
public static final NamedParameterSpec ML_KEM_768
```

The ML-KEM-768 parameters

@since 24

## NamedParameterSpec.ML_KEM_1024

```java
public static final NamedParameterSpec ML_KEM_1024
```

The ML-KEM-1024 parameters

@since 24

## NamedParameterSpec.NamedParameterSpec(String)

```java
public NamedParameterSpec(String stdName)
```

Creates a parameter specification using a standard (or predefined)
name {@code stdName}. For the
list of supported names, please consult the documentation
of the provider whose implementation will be used.

@param stdName the standard name of the algorithm parameters. See the
       NamedParameterSpec section in the
       <a href=
       "{@docRoot}/../specs/security/standard-names.html#namedparameterspec">
       Java Security Standard Algorithm Names Specification</a> for
       information about standard names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@throws NullPointerException if {@code stdName} is null.

## NamedParameterSpec.getName()

```java
public String getName()
```

Returns the standard name that determines the algorithm parameters.
@return the standard name.