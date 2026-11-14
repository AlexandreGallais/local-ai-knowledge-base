---
title: "DSASignatureDeformatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSASignatureDeformatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSASignatureDeformatter class

Namespace: `System.Security.Cryptography`

```csharp
public class DSASignatureDeformatter : System.Security.Cryptography.AsymmetricSignatureDeformatter
```

Verifies a Digital Signature Algorithm (`DSA`) PKCS#1 v1.5 signature.

#### Remarks

> **Important:**
> The creators of the DSA algorithm have withdrawn their support for it. Consider using the `RSA` class or the `ECDsa` class instead of the `DSA` class. Use `DSA` only for compatibility with legacy applications and data.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DSASignatureDeformatter/Overview/sample.cs._

## DSASignatureDeformatter.DSASignatureDeformatter() constructor

```csharp
public DSASignatureDeformatter ();
```

Initializes a new instance of the `DSASignatureDeformatter` class.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DSASignatureDeformatter/Overview/sample.cs._

## DSASignatureDeformatter.DSASignatureDeformatter(AsymmetricAlgorithm) constructor

```csharp
public DSASignatureDeformatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `DSASignatureDeformatter` class with the specified key.

Parameters:

- `key`: The instance of Digital Signature Algorithm (`DSA`) that holds the key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## DSASignatureDeformatter.SetHashAlgorithm(String) method

```csharp
public override void SetHashAlgorithm (string strName);
```

Specifies the hash algorithm for the Digital Signature Algorithm (`DSA`) signature deformatter.

Parameters:

- `strName`: The name of the hash algorithm to use for the signature deformatter.

Exceptions:

- `CryptographicUnexpectedOperationException`: The `strName` parameter does not map to the `SHA1` hash algorithm.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DSASignatureDeformatter/Overview/sample.cs._

## DSASignatureDeformatter.SetKey(AsymmetricAlgorithm) method

```csharp
public override void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Specifies the key to be used for the Digital Signature Algorithm (`DSA`) signature deformatter.

Parameters:

- `key`: The instance of `DSA` that holds the key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## DSASignatureDeformatter.VerifySignature(Byte[], Byte[]) method

```csharp
public override bool VerifySignature (byte[] rgbHash, byte[] rgbSignature);
```

Verifies the Digital Signature Algorithm (`DSA`) signature on the data.

Parameters:

- `rgbHash`: The data signed with `rgbSignature`.
- `rgbSignature`: The signature to be verified for `rgbHash`.

Returns: `true` if the signature is valid for the data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `rgbHash` is `null`.

-or-

`rgbSignature` is `null`.
- `CryptographicUnexpectedOperationException`: The DSA key is missing.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DSASignatureDeformatter/Overview/sample.cs._
