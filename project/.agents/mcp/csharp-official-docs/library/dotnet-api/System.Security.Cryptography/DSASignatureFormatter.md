---
title: "DSASignatureFormatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSASignatureFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSASignatureFormatter class

Namespace: `System.Security.Cryptography`

```csharp
public class DSASignatureFormatter : System.Security.Cryptography.AsymmetricSignatureFormatter
```

Creates a Digital Signature Algorithm (`DSA`) signature.

#### Remarks

> **Important:**
> The creators of the DSA algorithm have withdrawn their support for it. Consider using the `RSA` class or the `ECDsa` class instead of the `DSA` class. Use `DSA` only for compatibility with legacy applications and data.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DSASignatureFormatter/Overview/sample.cs._

## DSASignatureFormatter.DSASignatureFormatter() constructor

```csharp
public DSASignatureFormatter ();
```

Initializes a new instance of the `DSASignatureFormatter` class.

To be added.

## DSASignatureFormatter.DSASignatureFormatter(AsymmetricAlgorithm) constructor

```csharp
public DSASignatureFormatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `DSASignatureFormatter` class with the specified key.

Parameters:

- `key`: The instance of the Digital Signature Algorithm (`DSA`) that holds the key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DSASignatureFormatter/Overview/sample.cs._

## DSASignatureFormatter.CreateSignature(Byte[]) method

```csharp
public override byte[] CreateSignature (byte[] rgbHash);
```

Creates the Digital Signature Algorithm (`DSA`) PKCS #1 signature for the specified data.

Parameters:

- `rgbHash`: The data to be signed.

Returns: The digital signature for the specified data.

Exceptions:

- `ArgumentNullException`: `rgbHash` is `null`.
- `CryptographicUnexpectedOperationException`: The OID is `null`.

-or-

The DSA key is `null`.

#### Remarks
The resulting signature data can be verified by using `DSASignatureDeformatter.VerifySignature`.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DSASignatureFormatter/Overview/sample.cs._

## DSASignatureFormatter.SetHashAlgorithm(String) method

```csharp
public override void SetHashAlgorithm (string strName);
```

Specifies the hash algorithm for the Digital Signature Algorithm (`DSA`) signature formatter.

Parameters:

- `strName`: The name of the hash algorithm to use for the signature formatter.

Exceptions:

- `CryptographicUnexpectedOperationException`: The `strName` parameter does not map to the `SHA1` hash algorithm.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DSASignatureFormatter/Overview/sample.cs._

## DSASignatureFormatter.SetKey(AsymmetricAlgorithm) method

```csharp
public override void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Specifies the key to be used for the Digital Signature Algorithm (`DSA`) signature formatter.

Parameters:

- `key`: The instance of `DSA` that holds the key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.
