---
title: "ECDiffieHellman class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDiffieHellman.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDiffieHellman class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class ECDiffieHellman : System.Security.Cryptography.ECAlgorithm
```

Provides an abstract base class that Elliptic Curve Diffie-Hellman (ECDH) algorithm implementations can derive from. This class provides the basic set of operations that all ECDH implementations must support.

#### Remarks
This class serves as the abstract base class for ECDH implementations.

## ECDiffieHellman.ECDiffieHellman() constructor

```csharp
protected ECDiffieHellman ();
```

Initializes a new instance of the `ECDiffieHellman` class.

#### Remarks
This constructor is called by classes that derive from the `ECDiffieHellman` class. The `ECDiffieHellmanCng` class is the only implementation that is currently included in .NET. For information about how to create a new implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm, see the `ECDiffieHellman.Create` method.

## ECDiffieHellman.KeyExchangeAlgorithm property

```csharp
public override string KeyExchangeAlgorithm { get; }
```

Gets the name of the key <example-value> algorithm.

Returns: The name of the key <example-value> algorithm.

#### Remarks
The default (non-overridden) implementation of this property returns the string "ECDiffieHellman".

This property is inherited from the `AsymmetricAlgorithm` base class.

## ECDiffieHellman.PublicKey <example-value>

```csharp
public abstract System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value> { get; }
```

Gets the public key that is being used by the current Elliptic Curve Diffie-Hellman (ECDH) instance.

Returns: The public part of the ECDH key pair that is being used by this `ECDiffieHellman` instance.

To be added.

## ECDiffieHellman.SignatureAlgorithm property

```csharp
public override string? SignatureAlgorithm { get; }
```

Gets the name of the signature algorithm.

Returns: Always `null`.

#### Remarks
This property is inherited from the `AsymmetricAlgorithm` base class.

The Elliptic Curve Diffie-Hellman (ECDH) algorithm is used for key <example-value>, not digital signature generation. Therefore, this property returns `null`.

## ECDiffieHellman.Create() method

```csharp
public static System.Security.Cryptography.ECDiffieHellman Create ();
```

Creates a new instance of the default implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm.

Returns: A new instance of the default implementation of this class.

To be added.

## ECDiffieHellman.Create(ECCurve) method

```csharp
public static System.Security.Cryptography.ECDiffieHellman Create (System.Security.Cryptography.ECCurve curve);
```

Creates a new instance of the default implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm with a new public/private key-pair generated over the specified curve.

Parameters:

- `curve`: The curve to use to generate a new public/private key-pair.

Returns: A new instance of the default implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm.

Exceptions:

- `CryptographicException`: `curve` does not validate.

#### Remarks
curve must validate (that is, it must return true when passed to the `ECCurve.Validate` method.

Characteristic-2 curves are not supported on Windows.

## ECDiffieHellman.Create(ECParameters) method

```csharp
public static System.Security.Cryptography.ECDiffieHellman Create (System.Security.Cryptography.ECParameters parameters);
```

Creates a new instance of the default implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm with the key <example-value> by the specified  `ECParameters` object.

Parameters:

- `parameters`: The parameters  for the elliptic curve cryptography (ECC) algorithm.

Returns: A new instance of the default implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm.

Exceptions:

- `CryptographicException`: `parameters` does not validate.

#### Remarks
`parameters` must validate (that is, it must return `true`) when passed to the `ECParameters.Validate` method. Parameters over implicit curves are not supported.

Characteristic-2 curves are not supported on Windows.

## ECDiffieHellman.Create(String) method

```csharp
public static System.Security.Cryptography.ECDiffieHellman? Create (string algorithm);
```

Creates a new instance of the specified implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm.

Parameters:

- `algorithm`: The name of an implementation of the ECDH algorithm.

Returns: A new instance of the specified implementation of this class. If the specified algorithm name does not map to an ECDH implementation, this method returns `null`.

Exceptions:

- `ArgumentNullException`: The `algorithm` parameter is `null`.

To be added.

## ECDiffieHellman.DeriveKeyFromHash(ECDiffieHellmanPublicKey, HashAlgorithmName) method

```csharp
public byte[] DeriveKeyFromHash (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Performs key <example-value> using a specified hash algorithm.

Parameters:

- `otherPartyPublicKey`: The other party's public key.
- `hashAlgorithm`: The hash algorithm to use to derive the key material.

Returns: The hash of the shared secret.

Exceptions:

- `ArgumentException`: The curve used by `otherPartyPublicKey` has a different size than the curve from this key.

-or-

The `hashAlgorithm` parameter does not specify a hash.
- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `CryptographicException`: The curve used by `otherPartyPublicKey` is different than the curve from this key.

-or-

This instance represents only a public key.

#### Remarks
This overload calls the `ECDiffieHellman.DeriveKeyFromHash` method passing `null` as the prepend and append values.

## ECDiffieHellman.DeriveKeyFromHash(ECDiffieHellmanPublicKey, HashAlgorithmName, Byte[], Byte[]) method

```csharp
public virtual byte[] DeriveKeyFromHash (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[]? secretPrepend, byte[]? secretAppend);
```

When implemented in a derived class, performs key <example-value> using a specified hash algorithm with optional prepended or appended data.

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

#### Remarks

This method internally performs the Elliptic Curve Diffie-Hellman key <example-value> to produce the shared secret (`z`).
The return value from this method is the result of `HASH(secretPrepend || z || secretAppend)` using the specified hash algorithm, where `||` signifies concatenation.

If the value of `secretPrepend` or `secretAppend` is `null`, they are treated as empty arrays.

## ECDiffieHellman.DeriveKeyFromHmac(ECDiffieHellmanPublicKey, HashAlgorithmName, Byte[]) method

```csharp
public byte[] DeriveKeyFromHmac (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[]? hmacKey);
```

Performs key <example-value> using a specified HMAC (Hash-based Message Authentication Code) algorithm.

Parameters:

- `otherPartyPublicKey`: The other party's public key.
- `hashAlgorithm`: The hash algorithm to use to derive the key material.
- `hmacKey`: The key for the HMAC.

Returns: The HMAC of the shared secret.

Exceptions:

- `ArgumentException`: The curve used by `otherPartyPublicKey` has a different size than the curve from this key.

-or-

The `hashAlgorithm` parameter does not specify a hash.
- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `CryptographicException`: The curve used by `otherPartyPublicKey` is different than the curve from this key.

-or-

This instance represents only a public key.

#### Remarks
This overload calls the `ECDiffieHellman.DeriveKeyFromHmac` method passing `null` as the prepend and append values.

## ECDiffieHellman.DeriveKeyFromHmac(ECDiffieHellmanPublicKey, HashAlgorithmName, Byte[], Byte[], Byte[]) method

```csharp
public virtual byte[] DeriveKeyFromHmac (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[]? hmacKey, byte[]? secretPrepend, byte[]? secretAppend);
```

When implemented in a derived class, performs key <example-value> using a specified HMAC (Hash-based Message Authentication Code) algorithm with optional prepended or appended data.

Parameters:

- `otherPartyPublicKey`: The other party's public key.
- `hashAlgorithm`: The hash algorithm to use to derive the key material.
- `hmacKey`: The key for the HMAC.
- `secretPrepend`: A value to prepend to the derived secret <example-value> hashing.
- `secretAppend`: A value to append to the derived secret <example-value> hashing.

Returns: The HMAC of the shared secret after prepending or appending data as requested.

Exceptions:

- `NotImplementedException`: A derived class must override this method.
- `ArgumentException`: The curve used by `otherPartyPublicKey` has a different size than the curve from this key.

-or-

The `hashAlgorithm` parameter does not specify a hash.
- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `CryptographicException`: The curve used by `otherPartyPublicKey` is different than the curve from this key.

-or-

This instance represents only a public key.

#### Remarks

This method internally performs the Elliptic Curve Diffie-Hellman key <example-value> to produce the shared secret (`z`).

When `hmacKey` is `null`, the return value from this method is the result of `HMAC-HASH(z, secretPrepend || z || secretAppend)` using the specified HMAC algorithm, where `||` signifies concatenation. Otherwise, the return value from this method is the result of `HMAC-HASH(hmacKey, secretPrepend || z || secretAppend)`.

If the value of `secretPrepend` or `secretAppend` is `null`, they are treated as empty arrays.

## ECDiffieHellman.DeriveKeyMaterial(ECDiffieHellmanPublicKey) method

```csharp
public virtual byte[] DeriveKeyMaterial (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>);
```

When implemented in a derived class, performs a key <example-value> on the shared secret.

Parameters:

- `otherPartyPublicKey`: The other party's public key.

Returns: The result of the key <example-value> function, using the shared secret as an input.

Exceptions:

- `ArgumentException`: The curve used by `otherPartyPublicKey` has a different size than the curve from this key.
- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `CryptographicException`: The curve used by `otherPartyPublicKey` is different than the curve from this key.

-or-

This instance represents only a public key.

#### Remarks

The default behavior of this method is equivalent to calling `ECDiffieHellman.DeriveKeyFromHash` specifying SHA-256 as the hash algorithm with no prepend or append values.
Some implementations allow the behavior of this method to be changed,
and callers are advised to call whichever method explicitly says it performs the key <example-value> they need.

## ECDiffieHellman.DeriveKeyTls(ECDiffieHellmanPublicKey, Byte[], Byte[]) method

```csharp
public virtual byte[] DeriveKeyTls (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>, byte[] prfLabel, byte[] prfSeed);
```

When implemented in a derived class, performs key <example-value> using the TLS (Transport Layer Security) 1.1 PRF (Pseudo-Random Function).

Parameters:

- `otherPartyPublicKey`: The other party's public key.
- `prfLabel`: The ASCII-encoded PRF label.
- `prfSeed`: The 64-byte PRF seed.

Returns: The first 48 bytes from the TLS 1.1 PRF, using the shared secret as the key.

Exceptions:

- `NotImplementedException`: A derived class must override this method.
- `ArgumentException`: The curve used by `otherPartyPublicKey` has a different size than the curve from this key.
- `ArgumentNullException`: `otherPartyPublicKey`, `prfLabel` or `prfSeed` is `null`.
- `CryptographicException`: `prfSeed` is not exactly 64 bytes in length.

-or-

The curve used by `otherPartyPublicKey` is different than the curve from this key.

-or-

This instance represents only a public key.

#### Remarks

This method internally performs the Elliptic Curve Diffie-Hellman key <example-value> to produce the shared secret (`z`).

The return value of this method is a 48 byte output of the TLS 1.1 PRF (Pseudo-Random Function),
`PRF(z, prfLabel, prfSeed)`.

For more information, see IETF RFC 4346, section 5.

## ECDiffieHellman.DeriveRawSecretAgreement(ECDiffieHellmanPublicKey) method

```csharp
public virtual byte[] DeriveRawSecretAgreement (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>);
```

Derive raw key material.

Parameters:

- `otherPartyPublicKey`: The public key of the party with which to derive a mutual secret.

Returns: The raw key agreement.

Exceptions:

- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `ArgumentException`: `otherPartyPublicKey` is over a different curve than this key.
- `NotImplementedException`: A derived implementation has not provided an implementation of the method.
- `PlatformNotSupportedException`: The current platform does not support raw key agreement.
- `ObjectDisposedException`: The object has already been disposed.

Care must be taking when using the raw derived secret <example-value> value. The raw value is expected to be used as input in to a Key <example-value> Function, and not used directly as key material.

## ECDiffieHellman.FromXmlString(String) method

```csharp
public override void FromXmlString (string xmlString);
```

This method throws in all cases.

Parameters:

- `xmlString`: The XML string to use to reconstruct the `AsymmetricAlgorithm` object.

Exceptions:

- `NotImplementedException`: In all cases.

To be added.
