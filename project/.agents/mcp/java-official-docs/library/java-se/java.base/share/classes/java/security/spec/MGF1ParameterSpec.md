---
title: "MGF1ParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/MGF1ParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MGF1ParameterSpec class (java.security.spec)

```java
public class MGF1ParameterSpec implements AlgorithmParameterSpec
```

This class specifies the set of parameters used with mask generation
function MGF1 in OAEP Padding and RSASSA-PSS signature scheme, as
defined in the
PKCS#1 v2.2 standard.

Its ASN.1 definition in PKCS#1 standard is described below:

```java
PKCS1MGFAlgorithms    ALGORITHM-IDENTIFIER ::= {
  { OID id-mgf1 PARAMETERS HashAlgorithm },
  ...  -- Allows for future expansion --
```

where

```java
HashAlgorithm ::= AlgorithmIdentifier {
  {OAEP-PSSDigestAlgorithms}
}

OAEP-PSSDigestAlgorithms    ALGORITHM-IDENTIFIER ::= {
  { OID id-sha1       PARAMETERS NULL }|
  { OID id-sha224     PARAMETERS NULL }|
  { OID id-sha256     PARAMETERS NULL }|
  { OID id-sha384     PARAMETERS NULL }|
  { OID id-sha512     PARAMETERS NULL }|
  { OID id-sha512-224 PARAMETERS NULL }|
  { OID id-sha512-256 PARAMETERS NULL },
  ...  -- Allows for future expansion --
```

**See also:** PSSParameterSpec

**See also:** javax.crypto.spec.OAEPParameterSpec

**Since:** 1.5

## MGF1ParameterSpec.SHA1

```java
public static final MGF1ParameterSpec SHA1
```

The `MGF1ParameterSpec` uses a "SHA-1" message digest.

## MGF1ParameterSpec.SHA224

```java
public static final MGF1ParameterSpec SHA224
```

The `MGF1ParameterSpec` uses a "SHA-224" message digest.

## MGF1ParameterSpec.SHA256

```java
public static final MGF1ParameterSpec SHA256
```

The `MGF1ParameterSpec` uses a "SHA-256" message digest.

## MGF1ParameterSpec.SHA384

```java
public static final MGF1ParameterSpec SHA384
```

The `MGF1ParameterSpec` uses a "SHA-384" message digest.

## MGF1ParameterSpec.SHA512

```java
public static final MGF1ParameterSpec SHA512
```

The `MGF1ParameterSpec` uses a "SHA-512" message digest.

## MGF1ParameterSpec.SHA512_224

```java
public static final MGF1ParameterSpec SHA512_224
```

The `MGF1ParameterSpec` uses a "SHA-512/224" message digest.

**Since:** 11

## MGF1ParameterSpec.SHA512_256

```java
public static final MGF1ParameterSpec SHA512_256
```

The `MGF1ParameterSpec` uses a "SHA-512/256" message digest.

**Since:** 11

## MGF1ParameterSpec.SHA3_224

```java
public static final MGF1ParameterSpec SHA3_224
```

The `MGF1ParameterSpec` uses a "SHA3-224" message digest.

**Since:** 16

## MGF1ParameterSpec.SHA3_256

```java
public static final MGF1ParameterSpec SHA3_256
```

The `MGF1ParameterSpec` uses a "SHA3-256" message digest.

**Since:** 16

## MGF1ParameterSpec.SHA3_384

```java
public static final MGF1ParameterSpec SHA3_384
```

The `MGF1ParameterSpec` uses a "SHA3-384" message digest.

**Since:** 16

## MGF1ParameterSpec.SHA3_512

```java
public static final MGF1ParameterSpec SHA3_512
```

The `MGF1ParameterSpec` uses a "SHA3-512" message digest.

**Since:** 16

## MGF1ParameterSpec.MGF1ParameterSpec(String)

```java
public MGF1ParameterSpec(String mdName)
```

Constructs a parameter set for mask generation function MGF1
as defined in the PKCS #1 standard.

Parameters:

- `mdName`: the algorithm name for the message digest used in this mask generation function MGF1.

Throws:

- `NullPointerException`: if `mdName` is null.

## MGF1ParameterSpec.getDigestAlgorithm()

```java
public String getDigestAlgorithm()
```

Returns the algorithm name of the message digest used by the mask
generation function.

**Returns:** the algorithm name of the message digest.
