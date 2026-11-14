---
title: "RSAPKCS1SignatureFormatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAPKCS1SignatureFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAPKCS1SignatureFormatter class

Namespace: `System.Security.Cryptography`

```csharp
public class RSAPKCS1SignatureFormatter : System.Security.Cryptography.AsymmetricSignatureFormatter
```

Creates an `RSA` PKCS #1 version 1.5 signature.

#### Remarks
This class is used to create a digital signature using the `RSA` algorithm.

Use `RSAPKCS1SignatureDeformatter` to verify digital signatures with the `RSA` algorithm.

#### Examples
The following example demonstrates how to create a PKCS #1 version 1.5 signature.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAPKCS1SignatureFormatter/Overview/program.cs._

## RSAPKCS1SignatureFormatter.RSAPKCS1SignatureFormatter() constructor

```csharp
public RSAPKCS1SignatureFormatter ();
```

Initializes a new instance of the `RSAPKCS1SignatureFormatter` class.

#### Remarks
Use `RSAPKCS1SignatureFormatter.SetKey` and `RSAPKCS1SignatureFormatter.SetHashAlgorithm` to set the key and hash algorithm before calling `RSAPKCS1SignatureFormatter.CreateSignature`.

## RSAPKCS1SignatureFormatter.RSAPKCS1SignatureFormatter(AsymmetricAlgorithm) constructor

```csharp
public RSAPKCS1SignatureFormatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `RSAPKCS1SignatureFormatter` class with the specified key.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the private key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
Use `RSAPKCS1SignatureFormatter.SetHashAlgorithm` to set the hash algorithm before calling `RSAPKCS1SignatureFormatter.CreateSignature`.

## RSAPKCS1SignatureFormatter.CreateSignature(Byte[]) method

```csharp
public override byte[] CreateSignature (byte[] rgbHash);
```

Creates the `RSA` PKCS #1 signature for the specified data.

Parameters:

- `rgbHash`: The data to be signed.

Returns: The digital signature for `rgbHash`.

Exceptions:

- `CryptographicUnexpectedOperationException`: The key is `null`.

-or-

The hash algorithm is `null`.
- `ArgumentNullException`: The `rgbHash` parameter is `null`.

#### Remarks
You must specify a key and a hash algorithm before calling this method.

#### Examples
The following example demonstrates how to create a PKCS #1 version 1.5 signature.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAPKCS1SignatureFormatter/Overview/program.cs._

## RSAPKCS1SignatureFormatter.SetHashAlgorithm(String) method

```csharp
public override void SetHashAlgorithm (string strName);
```

Sets the hash algorithm to use for creating the signature.

Parameters:

- `strName`: The name of the hash algorithm to use for creating the signature.

#### Remarks
You must set a hash algorithm before calling `RSAPKCS1SignatureFormatter.CreateSignature`.

## RSAPKCS1SignatureFormatter.SetKey(AsymmetricAlgorithm) method

```csharp
public override void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Sets the private key to use for creating the signature.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the private key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
You must set a key <example-value> calling `RSAPKCS1SignatureFormatter.CreateSignature`.
