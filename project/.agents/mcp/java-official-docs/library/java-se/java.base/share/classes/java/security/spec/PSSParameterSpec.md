# PSSParameterSpec class (java.security.spec)

```java
public class PSSParameterSpec implements AlgorithmParameterSpec
```

This class specifies a parameter spec for the RSASSA-PSS signature scheme,
as defined in the
<a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a> standard.

<p>Its ASN.1 definition in the PKCS #1 standard is described below:
<pre>
RSASSA-PSS-params ::= SEQUENCE {
  hashAlgorithm      [0] HashAlgorithm      DEFAULT sha1,
  maskGenAlgorithm   [1] MaskGenAlgorithm   DEFAULT mgf1SHA1,
  saltLength         [2] INTEGER            DEFAULT 20,
  trailerField       [3] TrailerField       DEFAULT trailerFieldBC(1)
}
</pre>
where
<pre>
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
}
</pre>

@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@see MGF1ParameterSpec
@see AlgorithmParameterSpec
@see java.security.Signature

@author Valerie Peng


@since 1.4

## PSSParameterSpec.TRAILER_FIELD_BC

```java
public static final int TRAILER_FIELD_BC
```

The {@code TrailerFieldBC} constant as defined in the PKCS #1 standard.

@since 11

## PSSParameterSpec.DEFAULT

```java
public static final PSSParameterSpec DEFAULT
```

The PSS parameter set with all default values.
@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@deprecated This field uses the default values defined in the PKCS #1
        standard. Some of these defaults are no longer recommended due
        to advances in cryptanalysis -- see the
        <a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a>
        standard for more details. Thus, it is recommended to create
        a new {@code PSSParameterSpec} with the desired parameter values
        using the
        {@link #PSSParameterSpec(String, String, AlgorithmParameterSpec, int, int)} constructor.

@since 1.5

## PSSParameterSpec.PSSParameterSpec(String, String, AlgorithmParameterSpec, int, int)

```java
public PSSParameterSpec(String mdName, String mgfName, AlgorithmParameterSpec mgfSpec, int saltLen, int trailerField)
```

Creates a new {@code PSSParameterSpec} as defined in
the PKCS #1 standard using the specified message digest,
mask generation function, parameters for mask generation
function, salt length, and trailer field values.

@param mdName       the algorithm name of the hash function. See the
        PSSParameterSpec section of the
        <a href=
       "{@docRoot}/../specs/security/standard-names.html#pssparameterspec">
        Java Security Standard Algorithm Names Specification</a>
        for information about standard names for the hash function.
@param mgfName      the algorithm name of the mask generation function.
        See the PSSParameterSpec section of the
        <a href=
       "{@docRoot}/../specs/security/standard-names.html#pssparameterspec">
        Java Security Standard Algorithm Names Specification</a>
        for information about standard names for the mask generation
        function.
@param mgfSpec      the parameters for the mask generation function.
        If null is specified, null will be returned by
        getMGFParameters().
@param saltLen      the length of salt in bytes
@param trailerField the value of the trailer field
@spec security/standard-names.html Java Security Standard Algorithm Names
@throws    NullPointerException if {@code mdName}, or {@code mgfName}
        is null
@throws    IllegalArgumentException if {@code saltLen} or
        {@code trailerField} is less than 0
@since 1.5

## PSSParameterSpec.PSSParameterSpec(int)

```java
public PSSParameterSpec(int saltLen)
```

Creates a new {@code PSSParameterSpec}
using the specified salt length and other default values as
defined in the PKCS #1 standard.

@param saltLen the length of salt in bytes
@throws    IllegalArgumentException if {@code saltLen} is
        less than 0
@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@deprecated This constructor uses the default values defined in
        the PKCS #1 standard except for the salt length. Some of these
        defaults are no longer recommended due to advances in
        cryptanalysis -- see the
        <a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a>
        standard for more details. Thus, it is recommended to explicitly
        specify all desired parameter values with the
        {@link #PSSParameterSpec(String, String, AlgorithmParameterSpec, int, int)} constructor.

## PSSParameterSpec.getDigestAlgorithm()

```java
public String getDigestAlgorithm()
```

Returns the message digest algorithm name.

@return the message digest algorithm name
@since 1.5

## PSSParameterSpec.getMGFAlgorithm()

```java
public String getMGFAlgorithm()
```

Returns the mask generation function algorithm name.

@return the mask generation function algorithm name

@since 1.5

## PSSParameterSpec.getMGFParameters()

```java
public AlgorithmParameterSpec getMGFParameters()
```

Returns the parameters for the mask generation function.

@return the parameters for the mask generation function
@since 1.5

## PSSParameterSpec.getSaltLength()

```java
public int getSaltLength()
```

Returns the salt length in bytes.

@return the salt length

## PSSParameterSpec.getTrailerField()

```java
public int getTrailerField()
```

Returns the value for the trailer field.

@return the value for the trailer field
@since 1.5