---
title: "X509SignatureGenerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509SignatureGenerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509SignatureGenerator class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public abstract class X509SignatureGenerator
```

Base class for building encoded signatures as needed for X.509 certificates.

To be added.

## X509SignatureGenerator.X509SignatureGenerator() constructor

```csharp
protected X509SignatureGenerator ();
```

Initializes a new instance of the `X509SignatureGenerator` class.

To be added.

## X509SignatureGenerator.PublicKey <example-value>

```csharp
public System.Security.Cryptography.X509Certificates.PublicKey <example-value> { get; }
```

Gets the public key <example-value> with the private key with which signatures are being generated.

Returns: The public key <example-value> with the private key with which signatures are being generated.

#### Remarks
If the public key is null, it creates a public key by calling the `BuildPublicKey` method.

## X509SignatureGenerator.BuildPublicKey() method

```csharp
protected abstract System.Security.Cryptography.X509Certificates.PublicKey <example-value> ();
```

When overridden in a derived class, produces the certificate's public key that has the correctly encoded `Oid`, public key <example-value> and public key values.

Returns: The certificate's public key.

To be added.

## X509SignatureGenerator.CreateForCompositeMLDsa(CompositeMLDsa) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509SignatureGenerator CreateForCompositeMLDsa (System.Security.Cryptography.CompositeMLDsa key);
```

Creates a signature generator for Composite ML-DSA signatures using the specified key.

Parameters:

- `key`: The private key.

Returns: An `X509SignatureGenerator` object for Composite ML-DSA signatures.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## X509SignatureGenerator.CreateForECDsa(ECDsa) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509SignatureGenerator CreateForECDsa (System.Security.Cryptography.ECDsa key);
```

Creates an `X509SignatureGenerator` object for ECDSA signatures using the specified private key.

Parameters:

- `key`: The private key.

Returns: An `X509SignatureGenerator` object for ECDSA signatures.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## X509SignatureGenerator.CreateForMLDsa(MLDsa) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509SignatureGenerator CreateForMLDsa (System.Security.Cryptography.MLDsa key);
```

Creates a signature generator for ML-DSA signatures using the specified key.

Parameters:

- `key`: The private key.

Returns: An `X509SignatureGenerator` object for ML-DSA signatures.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## X509SignatureGenerator.CreateForRSA(RSA, RSASignaturePadding) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509SignatureGenerator CreateForRSA (System.Security.Cryptography.RSA key, System.Security.Cryptography.RSASignaturePadding signaturePadding);
```

Creates an `X509SignatureGenerator` object for RSA signatures using the specified private key and padding mode.

Parameters:

- `key`: The private key.
- `signaturePadding`: The padding mode.

Returns: An `X509SignatureGenerator` object for RSA signatures.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

-or-

`signaturePadding` is `null`.
- `ArgumentException`: The specified padding mode is not valid for this algorithm.

To be added.

## X509SignatureGenerator.CreateForSlhDsa(SlhDsa) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509SignatureGenerator CreateForSlhDsa (System.Security.Cryptography.SlhDsa key);
```

Creates a signature generator for SLH-DSA signatures using the specified key.

Parameters:

- `key`: The private key.

Returns: An `X509SignatureGenerator` object for SLH-DSA signatures.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## X509SignatureGenerator.GetSignatureAlgorithmIdentifier(HashAlgorithmName) method

```csharp
public abstract byte[] GetSignatureAlgorithmIdentifier (System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, encodes the X.509 algorithm identifier for this signature.

Parameters:

- `hashAlgorithm`: The hash algorithm to use for encoding.

Returns: The encoded value for the X.509 algorithm identifier.

To be added.

## X509SignatureGenerator.SignData(Byte[], HashAlgorithmName) method

```csharp
public abstract byte[] SignData (byte[] data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, produces a signature for the specified data using the specified hash algorithm and encodes the results appropriately for X.509 signature values.

Parameters:

- `data`: The input data for which to produce the signature.
- `hashAlgorithm`: The hash algorithm to use to produce the signature.

Returns: The X.509 signature for the specified data.

To be added.
