---
title: "ECDsa class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDsa class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class ECDsa : System.Security.Cryptography.ECAlgorithm
```

Provides an abstract base class that encapsulates the Elliptic Curve Digital Signature Algorithm (ECDSA).

#### Remarks
This class serves as the abstract base class for `ECDsaCng` derivations.

## ECDsa.ECDsa() constructor

```csharp
protected ECDsa ();
```

Initializes a new instance of the `ECDsa` class.

#### Remarks
This constructor is called by classes that derive from the `ECDsa` class. The `ECDsaCng` class is the only implementation currently supported by .NET. You may provide your own custom implementation.

## ECDsa.KeyExchangeAlgorithm property

```csharp
public override string? KeyExchangeAlgorithm { get; }
```

Gets the name of the key <example-value> algorithm.

Returns: Always `null`.

#### Remarks
This property is inherited from the `AsymmetricAlgorithm` base class.

The Elliptic Curve Digital Signature Algorithm (ECDSA) is used for digital signature generation; it is not used for key <example-value> Therefore, this property returns `null`.

## ECDsa.SignatureAlgorithm property

```csharp
public override string SignatureAlgorithm { get; }
```

Gets the name of the signature algorithm.

Returns: The string "ECDsa".

To be added.

## ECDsa.Create() method

```csharp
public static System.Security.Cryptography.ECDsa Create ();
```

Creates a new instance of the default implementation of the Elliptic Curve Digital Signature Algorithm (ECDSA).

Returns: A new instance of the default implementation (`ECDsaCng`) of this class.

To be added.

## ECDsa.Create(ECCurve) method

```csharp
public static System.Security.Cryptography.ECDsa Create (System.Security.Cryptography.ECCurve curve);
```

Creates a new instance of the default implementation of the Elliptic Curve Digital Signature Algorithm (ECDSA) with a newly generated key over the specified curve.

Parameters:

- `curve`: The curve to use for key generation.

Returns: A new instance of the default implementation (`ECDsaCng`) of this class.

To be added.

## ECDsa.Create(ECParameters) method

```csharp
public static System.Security.Cryptography.ECDsa Create (System.Security.Cryptography.ECParameters parameters);
```

Creates a new instance of the default implementation of the Elliptic Curve Digital Signature Algorithm (ECDSA) using the specified parameters as the key.

Parameters:

- `parameters`: The parameters representing the key to use.

Returns: A new instance of the default implementation (`ECDsaCng`) of this class.

To be added.

## ECDsa.Create(String) method

```csharp
public static System.Security.Cryptography.ECDsa? Create (string algorithm);
```

Creates a new instance of the specified implementation of the Elliptic Curve Digital Signature Algorithm (ECDSA).

Parameters:

- `algorithm`: The name of an ECDSA implementation. The following strings all refer to the same implementation, which is the only implementation currently supported in .NET:

- "ECDsa"
- "ECDsaCng"
- "System.Security.Cryptography.ECDsaCng"

You can also provide the name of a custom ECDSA implementation.

Returns: A new instance of the specified implementation of this class. If the specified algorithm name does not map to an ECDSA implementation, this method returns `null`.

Exceptions:

- `ArgumentNullException`: The `algorithm` parameter is `null`.

To be added.

## ECDsa.FromXmlString(String) method

```csharp
public override void FromXmlString (string xmlString);
```

This method throws in all cases.

Parameters:

- `xmlString`: The XML string to use to reconstruct the `AsymmetricAlgorithm` object.

Exceptions:

- `NotImplementedException`: In all cases.

To be added.

## ECDsa.GetMaxSignatureSize(DSASignatureFormat) method

```csharp
public int GetMaxSignatureSize (System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Gets the largest size, in bytes, for a signature produced by this key in the indicated format.

Parameters:

- `signatureFormat`: The encoding format for a signature.

Returns: The largest size, in bytes, for a signature produced by this key in the indicated format.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.

To be added.

## ECDsa.HashData(Stream, HashAlgorithmName) method

```csharp
protected virtual byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, computes the hash value of the specified binary stream by using the specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

Exceptions:

- `NotImplementedException`: A derived class must override this method.

To be added.

## ECDsa.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
protected virtual byte[] HashData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, computes the hash value of the specified portion of a byte array by using the specified hashing algorithm.

Parameters:

- `data`: The data to be hashed.
- `offset`: The index of the first byte in `data` to be hashed.
- `count`: The number of bytes to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

Exceptions:

- `NotImplementedException`: A derived class must override this method.

To be added.

## ECDsa.SignData(Byte[], HashAlgorithmName) method

```csharp
public virtual byte[] SignData (byte[] data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified byte array using the specified hash algorithm and signs the resulting hash value.

Parameters:

- `data`: The input data for which to compute the hash.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## ECDsa.SignData(Stream, HashAlgorithmName) method

```csharp
public virtual byte[] SignData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified stream using the specified hash algorithm and signs the resulting hash value.

Parameters:

- `data`: The input stream for which to compute the hash.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## ECDsa.SignData(Byte>, HashAlgorithmName) method

```csharp
public byte[] SignData (ReadOnlySpan<byte> data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified data and signs it.

Parameters:

- `data`: The data to hash and sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is an empty string.
- `ArgumentNullException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is `null`.

This method will use `DSASignatureFormat.IeeeP1363FixedFieldConcatenation` to encode the the signature. To use a different signature format, use `ECDsa.SignData`.

## ECDsa.SignData(Byte[], HashAlgorithmName, DSASignatureFormat) method

```csharp
public byte[] SignData (byte[] data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## ECDsa.SignData(Stream, HashAlgorithmName, DSASignatureFormat) method

```csharp
public byte[] SignData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## ECDsa.SignData(Byte>, HashAlgorithmName, DSASignatureFormat) method

```csharp
public byte[] SignData (ReadOnlySpan<byte> data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to hash and sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is an empty string.
- `ArgumentNullException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.

To be added.

## ECDsa.SignData(Byte>, Byte>, HashAlgorithmName) method

```csharp
public int SignData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified data and signs it in the indicated format into the provided buffer.

Parameters:

- `data`: The data to hash and sign.
- `destination`: The buffer to receive the signature.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is an empty string.

-or-

The buffer in `destination` is too small to hold the signature.
- `ArgumentNullException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is `null`.

This method will use `DSASignatureFormat.IeeeP1363FixedFieldConcatenation` to encode the the signature. To use a different signature format, use `ECDsa.SignData`.

## ECDsa.SignData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
public virtual byte[] SignData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of a portion of the specified byte array using the specified hash algorithm and signs the resulting hash value.

Parameters:

- `data`: The input data for which to compute the hash.
- `offset`: The offset into the array at which to begin using data.
- `count`: The number of bytes in the array to use as data.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.

-or-

`count` is less than zero.

-or-

`offset` + `count` - 1 results in an index that is beyond the upper bound of `data`.

To be added.

## ECDsa.SignData(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat) method

```csharp
public int SignData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it in the indicated format into the provided buffer.

Parameters:

- `data`: The data to hash and sign.
- `destination`: The buffer to receive the signature.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is an empty string.

-or-

The buffer in `destination` is too small to hold the signature.
- `ArgumentNullException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.

To be added.

## ECDsa.SignData(Byte[], Int32, Int32, HashAlgorithmName, DSASignatureFormat) method

```csharp
public byte[] SignData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `offset`: The offset into `data` at which to begin hashing.
- `count`: The number of bytes to read from `data`.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.

-or-

`offset` is less than zero.

-or-

`count` is less than zero.

-or-

`offset` + `count` - 1 results in an index that is beyond the upper bound of `data`.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.
