---
title: "PSSParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/PSSParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PSSParameterSpec class (java.security.spec)

```java
public class PSSParameterSpec implements AlgorithmParameterSpec
```

This class specifies a parameter spec for the RSASSA-PSS signature scheme,
as defined in the
PKCS#1 v2.2 standard.

Its ASN.1 definition in the PKCS #1 standard is described below:

```java
RSASSA-PSS-params ::= SEQUENCE {
  hashAlgorithm      [0] HashAlgorithm      DEFAULT sha1,
  maskGenAlgorithm   [1] MaskGenAlgorithm   DEFAULT mgf1SHA1,
  saltLength         [2] INTEGER            DEFAULT 20,
  trailerField       [3] TrailerField       DEFAULT trailerFieldBC(1)
```

where

```java
HashAlgorithm ::= AlgorithmIdentifier {
  {OAEP-PSSDigestAlgorithms}
}
MaskGenAlgorithm ::= AlgorithmIdentifier { {PKCS1MGFAlgorithms} }
TrailerField ::= INTEGER { trailerFieldBC(1) }

OAEP-PSSDigestAlgorithms    ALGORITHM-IDENTIFIER ::= {
  { OID id-sha1       PARAMETERS NULL }|
  { OID id-sha224     PARAMETERS NULL }|
  { OID id-sha256     PARAMETERS NULL }|
  { OID id-sha384     PARAMETERS NULL }|
  { OID id-sha512     PARAMETERS NULL }|
  { OID id-sha512-224 PARAMETERS NULL }|
  { OID id-sha512-256 PARAMETERS NULL },
  ...  -- Allows for future expansion --
}
PKCS1MGFAlgorithms    ALGORITHM-IDENTIFIER ::= {
  { OID id-mgf1 PARAMETERS HashAlgorithm },
  ...  -- Allows for future expansion --
```

**See also:** MGF1ParameterSpec

**See also:** AlgorithmParameterSpec

**See also:** java.security.Signature

**Since:** 1.4

## PSSParameterSpec.TRAILER_FIELD_BC

```java
public static final int TRAILER_FIELD_BC
```

The `TrailerFieldBC` constant as defined in the PKCS #1 standard.

**Since:** 11

## PSSParameterSpec.DEFAULT

```java
public static final PSSParameterSpec DEFAULT
```

The PSS parameter set with all default values.

**Deprecated:** This field uses the default values defined in the PKCS #1
        standard. Some of these defaults are no longer recommended due
        to advances in cryptanalysis -- see the
        PKCS#1 v2.2
        standard for more details. Thus, it is recommended to create
        a new `PSSParameterSpec` with the desired parameter values
        using the
        String, AlgorithmParameterSpec, int, int) constructor.

**Since:** 1.5

## PSSParameterSpec.PSSParameterSpec(String, String, AlgorithmParameterSpec, int, int)

```java
public PSSParameterSpec(String mdName, String mgfName, AlgorithmParameterSpec mgfSpec, int saltLen, int trailerField)
```

Creates a new `PSSParameterSpec` as defined in
the PKCS #1 standard using the specified message digest,
mask generation function, parameters for mask generation
function, salt length, and trailer field values.

Parameters:

- `mdName`: the algorithm name of the hash function. See the PSSParameterSpec section of the  Java Security Standard Algorithm Names Specification for information about standard names for the hash function.
- `mgfName`: the algorithm name of the mask generation function. See the PSSParameterSpec section of the  Java Security Standard Algorithm Names Specification for information about standard names for the mask generation function.
- `mgfSpec`: the parameters for the mask generation function. If null is specified, null will be returned by getMGFParameters().
- `saltLen`: the length of salt in bytes
- `trailerField`: the value of the trailer field

**Since:** 1.5

Throws:

- `NullPointerException`: if `mdName`, or `mgfName` is null
- `IllegalArgumentException`: if `saltLen` or `trailerField` is less than 0

## PSSParameterSpec.PSSParameterSpec(int)

```java
public PSSParameterSpec(int saltLen)
```

Creates a new `PSSParameterSpec`
using the specified salt length and other default values as
defined in the PKCS #1 standard.

Parameters:

- `saltLen`: the length of salt in bytes

**Deprecated:** This constructor uses the default values defined in
        the PKCS #1 standard except for the salt length. Some of these
        defaults are no longer recommended due to advances in
        cryptanalysis -- see the
        PKCS#1 v2.2
        standard for more details. Thus, it is recommended to explicitly
        specify all desired parameter values with the
        String, AlgorithmParameterSpec, int, int) constructor.

Throws:

- `IllegalArgumentException`: if `saltLen` is less than 0

## PSSParameterSpec.getDigestAlgorithm()

```java
public String getDigestAlgorithm()
```

Returns the message digest algorithm name.

**Returns:** the message digest algorithm name

**Since:** 1.5

## PSSParameterSpec.getMGFAlgorithm()

```java
public String getMGFAlgorithm()
```

Returns the mask generation function algorithm name.

**Returns:** the mask generation function algorithm name

**Since:** 1.5

## PSSParameterSpec.getMGFParameters()

```java
public AlgorithmParameterSpec getMGFParameters()
```

Returns the parameters for the mask generation function.

**Returns:** the parameters for the mask generation function

**Since:** 1.5

## PSSParameterSpec.getSaltLength()

```java
public int getSaltLength()
```

Returns the salt length in bytes.

**Returns:** the salt length

## PSSParameterSpec.getTrailerField()

```java
public int getTrailerField()
```

Returns the value for the trailer field.

**Returns:** the value for the trailer field

**Since:** 1.5
