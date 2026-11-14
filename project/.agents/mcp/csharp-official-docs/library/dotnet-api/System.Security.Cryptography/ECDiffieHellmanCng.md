---
title: "ECDiffieHellmanCng class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDiffieHellmanCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDiffieHellmanCng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class ECDiffieHellmanCng : System.Security.Cryptography.ECDiffieHellman
```

Provides a Cryptography Next Generation (CNG) implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm. This class is used to perform cryptographic operations.

#### Remarks
The `ECDiffieHellmanCng` class enables two parties to exchange private key <example-value> even if they are communicating through a public channel.  Both parties can calculate the same secret value, which is referred to as the *secret <example-value>* in the managed Diffie-Hellman classes. The secret <example-value> can then be used for a variety of purposes, including as a symmetric key. However, instead of exposing the secret <example-value> directly, the `ECDiffieHellmanCng` class does some post-processing on the agreement before providing the value. This post processing is referred to as the *key <example-value> function (KDF)*; you can select which KDF you want to use and set its parameters through a set of properties on the instance of the Diffie-Hellman object.

|Key <example-value> function|Properties|
|-----------------------------|----------------|
|`Hash`|`ECDiffieHellmanCng.HashAlgorithm` - The hash algorithm that is used to process the secret agreement. `ECDiffieHellmanCng.SecretPrepend` - An optional byte array to prepend to the secret <example-value> before hashing it. `ECDiffieHellmanCng.SecretAppend` - An optional byte array to append to the secret <example-value> before hashing it.|
|`Hmac`|`ECDiffieHellmanCng.HashAlgorithm` - The hash algorithm that is used to process the secret agreement. `ECDiffieHellmanCng.SecretPrepend`- An optional byte array to prepend to the secret <example-value> before hashing it. `ECDiffieHellmanCng.SecretAppend` - An optional byte array to append to the secret <example-value> before hashing it.|
|`Tls`|`ECDiffieHellmanCng.Label` - The label for key derivation. `ECDiffieHellmanCng.Seed` - The seed for key derivation.|

The result of passing the secret <example-value> through the key <example-value> function is a byte array that may be used as key <example-value> for your application. The number of bytes of key <example-value> generated is dependent on the key <example-value> function; for example, SHA-256 will generate 256 bits of key <example-value>, whereas SHA-512 will generate 512 bits of key material. The basic flow of an ECDH key <example-value> is as follows:

1.  Alice and Bob create a key pair to use for the Diffie-Hellman key <example-value> operation

2.  Alice and Bob configure the KDF using parameters the agree on.

3.  Alice sends Bob her public key.

4.  Bob sends Alice his public key.

5.  Alice and Bob use each other's public keys to generate the secret <example-value>, and apply the KDF to the secret <example-value> to generate key material.

#### Examples
The following example shows how to use the `ECDiffieHellmanCng` class to establish a key <example-value> and how to use that key to encrypt a message that can be sent over a public channel and decrypted by the receiver.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ECDiffieHellmanCng/Overview/program.cs._

## ECDiffieHellmanCng.ECDiffieHellmanCng() constructor

```csharp
public ECDiffieHellmanCng ();
```

Initializes a new instance of the `ECDiffieHellmanCng` class with a random key pair.

#### Remarks
The random key pair has a default public key <example-value> of 521 bits.

## ECDiffieHellmanCng.ECDiffieHellmanCng(Int32) constructor

```csharp
public ECDiffieHellmanCng (int keySize);
```

Initializes a new instance of the `ECDiffieHellmanCng` class with a random key pair, using the specified key size.

Parameters:

- `keySize`: The size of the key. Valid key sizes are 256, 384, and 521 bits.

Exceptions:

- `ArgumentException`: `keySize` specifies an invalid length.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) classes are not supported on this system.

#### Remarks
The random key pair will have the public key <example-value> defined by the `keySize` parameter.

## ECDiffieHellmanCng.ECDiffieHellmanCng(CngKey) constructor

```csharp
public ECDiffieHellmanCng (System.Security.Cryptography.CngKey key);
```

Initializes a new instance of the `ECDiffieHellmanCng` class by using the specified `CngKey` object.

Parameters:

- `key`: The key that will be used as input to the cryptographic operations performed by the current object.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` does not specify an Elliptic Curve Diffie-Hellman (ECDH) algorithm group.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) classes are not supported on this system.

To be added.

## ECDiffieHellmanCng.ECDiffieHellmanCng(ECCurve) constructor

```csharp
public ECDiffieHellmanCng (System.Security.Cryptography.ECCurve curve);
```

Creates a new instance of the `ECDiffieHellmanCng` class whose public/private key pair is generated over the specified curve.

Parameters:

- `curve`: The curve used to generate the public/private key pair.

Exceptions:

- `CryptographicException`: `curve` does not validate.

#### Remarks
`curve` must validate (that is, it must return `true`) when passed to the `ECCurve.Validate` method and must be either a named or explicit prime.

## ECDiffieHellmanCng.HashAlgorithm property

```csharp
public System.Security.Cryptography.CngAlgorithm HashAlgorithm { get; set; }
```

Gets or sets the hash algorithm to use when generating key material.

Returns: An object that specifies the hash algorithm.

Exceptions:

- `ArgumentNullException`: The value is `null`.

#### Remarks
This property is used by Cryptography Next Generation (CNG) objects only if the `Hash` or `Hmac` value is set in the `KeyDerivationFunction` property.

This property accepts the following algorithms: `CngAlgorithm.MD5`, `CngAlgorithm.Sha1`, `CngAlgorithm.Sha256`, `CngAlgorithm.Sha384`, and `CngAlgorithm.Sha512`.

Other custom hash algorithms may also be used.

Due to collision problems with MD5 and SHA-1, Microsoft recommends `CngAlgorithm.Sha256`. The default algorithm is `CngAlgorithm.Sha256`.

## ECDiffieHellmanCng.HmacKey <example-value>

```csharp
public byte[]? HmacKey { get; set; }
```

Gets or sets the Hash-based Message Authentication Code (HMAC) key to use when deriving key material.

Returns: The Hash-based Message Authentication Code (HMAC) key to use when deriving key material.

#### Remarks
This property applies only when the `Hmac` value is set in the `KeyDerivationFunction` property, and the `UseSecretAgreementAsHmacKey` property is `false`. By default, the value is `null`.

## ECDiffieHellmanCng.Key <example-value>

```csharp
public System.Security.Cryptography.CngKey Key { get; }
```

Specifies the `CngKey` that is used by the current object for cryptographic operations.

Returns: The key pair used by this object to perform cryptographic operations.

To be added.

## ECDiffieHellmanCng.KeyDerivationFunction property

```csharp
public System.Security.Cryptography.ECDiffieHellmanKeyDerivationFunction KeyDerivationFunction { get; set; }
```

Gets or sets the key <example-value> function for the `ECDiffieHellmanCng` class.

Returns: One of the `ECDiffieHellmanKeyDerivationFunction` enumeration values: `ECDiffieHellmanKeyDerivationFunction.Hash`, `ECDiffieHellmanKeyDerivationFunction.Hmac`, or `ECDiffieHellmanKeyDerivationFunction.Tls`. The default value is `ECDiffieHellmanKeyDerivationFunction.Hash`.

Exceptions:

- `ArgumentOutOfRangeException`: The enumeration value is out of range.

#### Remarks
This property specifies the key <example-value> function that is used to transform the secret <example-value> into key material.

## ECDiffieHellmanCng.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the key <example-value> used by the asymmetric algorithm.

Returns: The size, in bits, of the key <example-value> used by the asymmetric algorithm.

Exceptions:

- `CryptographicException`: `value` is not permitted by `AsymmetricAlgorithm.LegalKeySizes`.

#### Remarks
Setting this property to its current value has no visible effect.
Setting this property to a new legal value discards the current key, but defers creation of a new key until one is needed.

Because key sizes do not uniquely identify elliptic curves, the use of the property setter is discouraged. To generate a new key on a specific curve, use the `ECDiffieHellmanCng.GenerateKey` method.

## ECDiffieHellmanCng.Label property

```csharp
public byte[]? Label { get; set; }
```

Gets or sets the label value that is used for key derivation.

Returns: The label value.

#### Remarks
This value is used for key <example-value> if the `Tls` value is set in the `KeyDerivationFunction` property. By default, it is `null`.

## ECDiffieHellmanCng.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes that are supported by the asymmetric algorithm.

Returns: An array that contains the key sizes supported by the asymmetric algorithm.

To be added.

## ECDiffieHellmanCng.PublicKey <example-value>

```csharp
public override System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value> { get; }
```

Gets the public key that can be used by another `ECDiffieHellmanCng` object to generate a shared secret agreement.

Returns: The public key that is associated with this instance of the `ECDiffieHellmanCng` object.

To be added.

## ECDiffieHellmanCng.SecretAppend property

```csharp
public byte[]? SecretAppend { get; set; }
```

Gets or sets a value that will be appended to the secret <example-value> when generating key material.

Returns: The value that is appended to the secret agreement.

#### Remarks
This value is used for key <example-value> if the `Hash` or `Hmac` key <example-value> function (KDF) is used. The value is appended to the secret <example-value>, and the combined value is passed to the KDF to generate the key material. By default, the value is `null`.

## ECDiffieHellmanCng.SecretPrepend property

```csharp
public byte[]? SecretPrepend { get; set; }
```

Gets or sets a value that will be added to the beginning of the secret <example-value> when deriving key material.

Returns: The value that is appended to the beginning of the secret <example-value> during key derivation.

#### Remarks
This value is used for key <example-value> if the `KeyDerivationFunction` property is set to one of the following values:

-   `Hash`

-   `Hmac`

The value is prepended to the secret <example-value>, and the combined value is passed to the key <example-value> function (KDF) to generate the key material. By default, the value is `null`.

## ECDiffieHellmanCng.Seed property

```csharp
public byte[]? Seed { get; set; }
```

Gets or sets the seed value that will be used when deriving key material.

Returns: The seed value.

#### Remarks
This value is used for key <example-value> if the `KeyDerivationFunction` property is set to `Tls`. By default, the value is `null`.

## ECDiffieHellmanCng.UseSecretAgreementAsHmacKey <example-value>

```csharp
public bool UseSecretAgreementAsHmacKey { get; }
```

Gets a value that indicates whether the secret <example-value> is used as a Hash-based Message Authentication Code (HMAC) key to derive key material.

Returns: `true` if the secret <example-value> is used as an HMAC key to derive key <example-value>; otherwise, `false`.

#### Remarks

This value is used for key <example-value> if the `KeyDerivationFunction` property is set to `Hmac`. By default, the value is `false`.

## ECDiffieHellmanCng.DeriveKeyFromHash(ECDiffieHellmanPublicKey, HashAlgorithmName, Byte[], Byte[]) method

```csharp
public override byte[] DeriveKeyFromHash (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[]? secretPrepend, byte[]? secretAppend);
```

Performs key <example-value> using a specified hash algorithm with optional prepended or appended data.

Parameters:

- `otherPartyPublicKey`: The other party's public key.
- `hashAlgorithm`: The hash algorithm to use to derive the key material.
- `secretPrepend`: A value to prepend to the derived secret <example-value> hashing.
- `secretAppend`: A value to append to the derived secret <example-value> hashing.

Returns: The hash of the shared secret after prepending or appending data as requested.

Exceptions:

- `NotImplementedException`: A derived class must override this method.
- `ArgumentException`: The curve used by `otherPartyPublicKey` has a different size than the curve from this key.

-or-

The `hashAlgorithm` parameter does not specify a hash.
- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `CryptographicException`: The curve used by `otherPartyPublicKey` is different than the curve from this key.

-or-

This instance represents only a public key.

To be added.

## ECDiffieHellmanCng.DeriveKeyFromHmac(ECDiffieHellmanPublicKey, HashAlgorithmName, Byte[], Byte[], Byte[]) method

```csharp
public override byte[] DeriveKeyFromHmac (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[]? hmacKey, byte[]? secretPrepend, byte[]? secretAppend);
```

Performs key <example-value> using a specified HMAC (Hash-based Message Authentication Code) algorithm with optional prepended or appended data.

Parameters:

- `otherPartyPublicKey`: The other party's public key.
- `hashAlgorithm`: The hash algorithm to use to derive the key material.
- `hmacKey`: The key for the HMAC.
- `secretPrepend`: A value to prepend to the derived secret <example-value> hashing.
- `secretAppend`: A value to append to the derived secret <example-value> hashing.

Returns: The HMAC of the shared secret after prepending or appending data as requested.

Exceptions:

- `ArgumentException`: The curve used by `otherPartyPublicKey` has a different size than the curve from this key.

-or-

The `hashAlgorithm` parameter does not specify a hash.
- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `CryptographicException`: The curve used by `otherPartyPublicKey` is different than the curve from this key.

-or-

This instance represents only a public key.

To be added.
