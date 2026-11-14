# MGF1ParameterSpec class (java.security.spec)

```java
public class MGF1ParameterSpec implements AlgorithmParameterSpec
```

This class specifies the set of parameters used with mask generation
function MGF1 in OAEP Padding and RSASSA-PSS signature scheme, as
defined in the
<a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a> standard.

<p>Its ASN.1 definition in PKCS#1 standard is described below:
<pre>
PKCS1MGFAlgorithms    ALGORITHM-IDENTIFIER ::= {
  { OID id-mgf1 PARAMETERS HashAlgorithm },
  ...  -- Allows for future expansion --
}
</pre>
where
<pre>
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
}
</pre>
@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@see PSSParameterSpec
@see javax.crypto.spec.OAEPParameterSpec

@author Valerie Peng

@since 1.5

## MGF1ParameterSpec.SHA1

```java
public static final MGF1ParameterSpec SHA1
```

The {@code MGF1ParameterSpec} uses a "SHA-1" message digest.

## MGF1ParameterSpec.SHA224

```java
public static final MGF1ParameterSpec SHA224
```

The {@code MGF1ParameterSpec} uses a "SHA-224" message digest.

## MGF1ParameterSpec.SHA256

```java
public static final MGF1ParameterSpec SHA256
```

The {@code MGF1ParameterSpec} uses a "SHA-256" message digest.

## MGF1ParameterSpec.SHA384

```java
public static final MGF1ParameterSpec SHA384
```

The {@code MGF1ParameterSpec} uses a "SHA-384" message digest.

## MGF1ParameterSpec.SHA512

```java
public static final MGF1ParameterSpec SHA512
```

The {@code MGF1ParameterSpec} uses a "SHA-512" message digest.

## MGF1ParameterSpec.SHA512_224

```java
public static final MGF1ParameterSpec SHA512_224
```

The {@code MGF1ParameterSpec} uses a "SHA-512/224" message digest.

@since 11

## MGF1ParameterSpec.SHA512_256

```java
public static final MGF1ParameterSpec SHA512_256
```

The {@code MGF1ParameterSpec} uses a "SHA-512/256" message digest.

@since 11

## MGF1ParameterSpec.SHA3_224

```java
public static final MGF1ParameterSpec SHA3_224
```

The {@code MGF1ParameterSpec} uses a "SHA3-224" message digest.

@since 16

## MGF1ParameterSpec.SHA3_256

```java
public static final MGF1ParameterSpec SHA3_256
```

The {@code MGF1ParameterSpec} uses a "SHA3-256" message digest.

@since 16

## MGF1ParameterSpec.SHA3_384

```java
public static final MGF1ParameterSpec SHA3_384
```

The {@code MGF1ParameterSpec} uses a "SHA3-384" message digest.

@since 16

## MGF1ParameterSpec.SHA3_512

```java
public static final MGF1ParameterSpec SHA3_512
```

The {@code MGF1ParameterSpec} uses a "SHA3-512" message digest.

@since 16

## MGF1ParameterSpec.MGF1ParameterSpec(String)

```java
public MGF1ParameterSpec(String mdName)
```

Constructs a parameter set for mask generation function MGF1
as defined in the PKCS #1 standard.

@param mdName the algorithm name for the message digest
used in this mask generation function MGF1.
@throws    NullPointerException if {@code mdName} is null.

## MGF1ParameterSpec.getDigestAlgorithm()

```java
public String getDigestAlgorithm()
```

Returns the algorithm name of the message digest used by the mask
generation function.

@return the algorithm name of the message digest.