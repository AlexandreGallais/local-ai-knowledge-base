---
title: "RSACryptoServiceProvider class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSACryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSACryptoServiceProvider class (part 3 of 3)

## RSACryptoServiceProvider.SignHash(Byte[], String) method

```csharp
public byte[] SignHash (byte[] rgbHash, string? str);
```

Computes the signature for the specified hash value.

Parameters:

- `rgbHash`: The hash value of the data to be signed.
- `str`: The hash algorithm identifier (OID) used to create the hash value of the data.

Returns: The `RSA` signature for the specified hash value.

Exceptions:

- `ArgumentNullException`: The `rgbHash` parameter is `null`.
- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

-or-

There is no private key.

#### Remarks
This method creates a digital signature that is verified using the `RSACryptoServiceProvider.VerifyHash` method.

The valid hash algorithms are `SHA1` and `MD5`. The algorithm identifier can be derived from the hash name by using the `CryptoConfig.MapNameToOID` method.

Due to collision problems with SHA-1 and MD5, Microsoft recommends a security model based on SHA-256 or better.

#### Examples
The following code example encrypts some data, creates a hash of the encrypted data, and then signs hash with a digital signature.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/SignHash/class1.cs._

## RSACryptoServiceProvider.SignHash(Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public override byte[] SignHash (byte[] hash, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Computes the signature for the specified hash value using the specified padding.

Parameters:

- `hash`: The hash value of the data to be signed.
- `hashAlgorithm`: The hash algorithm name used to create the hash value of the data.
- `padding`: The padding.

Returns: The `RSA` signature for the specified hash value.

Exceptions:

- `ArgumentException`: `hashAlgorithm` is `null` or `String.Empty`.
- `ArgumentNullException`: `hash` is `null`.

-or-

`padding` is `null`.
- `CryptographicException`: `padding` does not equal `RSASignaturePadding.Pkcs1`.

To be added.

## RSACryptoServiceProvider.VerifyData(Byte[], Object, Byte[]) method

```csharp
public bool VerifyData (byte[] buffer, object halg, byte[] signature);
```

Verifies that a digital signature is valid by determining the hash value in the signature using the provided public key and comparing it to the hash value of the provided data.

Parameters:

- `buffer`: The data that was signed.
- `halg`: The name of the hash algorithm used to create the hash value of the data.
- `signature`: The signature data to be verified.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `halg` parameter is `null`.
- `ArgumentException`: The `halg` parameter is not a valid type.

#### Remarks
This method verifies the `RSA` digital signature produced by the `RSACryptoServiceProvider.SignData` method. The signature is verified by obtaining the hash value from the signature using the public key it was signed with, and comparing that value to the hash value of the provided data.

The `halg` parameter can accept a `String`, a `HashAlgorithm`, or a `Type`.

#### Examples
The following example shows how to use the `RSACryptoServiceProvider.VerifyData` method to verify a signature. This code example is part of a larger example provided for the `RSACryptoServiceProvider.SignHash` method.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/SignHash/class1.cs._

## RSACryptoServiceProvider.VerifyHash(Byte[], String, Byte[]) method

```csharp
public bool VerifyHash (byte[] rgbHash, string str, byte[] rgbSignature);
```

Verifies that a digital signature is valid by determining the hash value in the signature using the provided public key and comparing it to the provided hash value.

Parameters:

- `rgbHash`: The hash value of the signed data.
- `str`: The hash algorithm identifier (OID) used to create the hash value of the data.
- `rgbSignature`: The signature data to be verified.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `rgbHash` parameter is `null`.

-or-

The `rgbSignature` parameter is `null`.
- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

-or-

The signature cannot be verified.

#### Remarks
This method verifies the `RSA` digital signature produced by the `RSACryptoServiceProvider.SignHash` method. The signature is verified by obtaining the hash value from the signature using the public key it was signed with, and comparing that value to the hash value of the provided data.

The valid hash algorithms are `SHA1` and `MD5`. The algorithm identifier can be derived from the hash name by using the `CryptoConfig.MapNameToOID` method.

Due to collision problems with SHA-1 and MD5, Microsoft recommends a security model based on SHA-256 or better.

#### Examples
The following example shows how to use the `RSACryptoServiceProvider.VerifyHash` method to verify a signature. This code example is part of a larger example provided for the `RSACryptoServiceProvider.SignHash` method.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/SignHash/class1.cs._

## RSACryptoServiceProvider.VerifyHash(Byte[], Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public override bool VerifyHash (byte[] hash, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by determining the hash value in the signature using the specified hashing algorithm and padding, and comparing it to the provided hash value.

Parameters:

- `hash`: The hash value of the signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm name used to create the hash value.
- `padding`: The padding.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentException`: `hashAlgorithm` is `null` or `String.Empty`.
- `ArgumentNullException`: `hash` is `null`.

-or-

`padding` is `null`.
- `CryptographicException`: `padding` does not equal `RSASignaturePadding.Pkcs1`.

To be added.
