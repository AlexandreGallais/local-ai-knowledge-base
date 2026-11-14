---
title: "RSAPKCS1SignatureDeformatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAPKCS1SignatureDeformatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAPKCS1SignatureDeformatter class

Namespace: `System.Security.Cryptography`

```csharp
public class RSAPKCS1SignatureDeformatter : System.Security.Cryptography.AsymmetricSignatureDeformatter
```

Verifies an `RSA` PKCS #1 version 1.5 signature.

#### Remarks
This class is used to verify a digital signature made with the `RSA` algorithm.

Use `RSAPKCS1SignatureFormatter` to create digital signatures with the `RSA` algorithm.

#### Examples
The following example demonstrates how to use the `RSAPKCS1SignatureDeformatter.VerifySignature` method to verify a signature.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAPKCS1SignatureDeformatter/Overview/program.cs._

## RSAPKCS1SignatureDeformatter.RSAPKCS1SignatureDeformatter() constructor

```csharp
public RSAPKCS1SignatureDeformatter ();
```

Initializes a new instance of the `RSAPKCS1SignatureDeformatter` class.

#### Remarks
Use `RSAPKCS1SignatureDeformatter.SetKey` and `RSAPKCS1SignatureDeformatter.SetHashAlgorithm` to set the key and hash algorithm before calling `RSAPKCS1SignatureDeformatter.VerifySignature`.

## RSAPKCS1SignatureDeformatter.RSAPKCS1SignatureDeformatter(AsymmetricAlgorithm) constructor

```csharp
public RSAPKCS1SignatureDeformatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `RSAPKCS1SignatureDeformatter` class with the specified key.

Parameters:

- `key`: The instance of `RSA` that holds the public key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
Use `RSAPKCS1SignatureDeformatter.SetHashAlgorithm` to set the hash algorithm before calling `RSAPKCS1SignatureDeformatter.VerifySignature`.

## RSAPKCS1SignatureDeformatter.SetHashAlgorithm(String) method

```csharp
public override void SetHashAlgorithm (string strName);
```

Sets the hash algorithm to use for verifying the signature.

Parameters:

- `strName`: The name of the hash algorithm to use for verifying the signature.

#### Remarks
You must set a hash algorithm before calling `RSAPKCS1SignatureDeformatter.VerifySignature`.

## RSAPKCS1SignatureDeformatter.SetKey(AsymmetricAlgorithm) method

```csharp
public override void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Sets the public key to use for verifying the signature.

Parameters:

- `key`: The instance of `RSA` that holds the public key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
You must set a key <example-value> calling `RSAPKCS1SignatureDeformatter.VerifySignature`.

## RSAPKCS1SignatureDeformatter.VerifySignature(Byte[], Byte[]) method

```csharp
public override bool VerifySignature (byte[] rgbHash, byte[] rgbSignature);
```

Verifies the `RSA` PKCS#1 signature for the specified data.

Parameters:

- `rgbHash`: The data signed with `rgbSignature`.
- `rgbSignature`: The signature to be verified for `rgbHash`.

Returns: `true` if `rgbSignature` matches the signature computed using the specified hash algorithm and key on `rgbHash`; otherwise, `false`.

Exceptions:

- `CryptographicUnexpectedOperationException`: The key is `null`.

-or-

The hash algorithm is `null`.
- `ArgumentNullException`: The `rgbHash` parameter is `null`.

-or-

The `rgbSignature` parameter is `null`.

#### Remarks
You must specify a key and a hash algorithm before calling this method.

#### Examples
The following example demonstrates how to use the `RSAPKCS1SignatureDeformatter.VerifySignature` method to verify a signature.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAPKCS1SignatureDeformatter/Overview/program.cs._
