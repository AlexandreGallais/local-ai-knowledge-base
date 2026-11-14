---
title: "AsymmetricSignatureDeformatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsymmetricSignatureDeformatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsymmetricSignatureDeformatter class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class AsymmetricSignatureDeformatter
```

Represents the abstract base class from which all implementations of asymmetric signature deformatters derive.

#### Remarks
Asymmetric signature deformatters verify the digital signatures that are created using implementations of `AsymmetricSignatureFormatter`.

## AsymmetricSignatureDeformatter.AsymmetricSignatureDeformatter() constructor

```csharp
protected AsymmetricSignatureDeformatter ();
```

Initializes a new instance of `AsymmetricSignatureDeformatter`.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

Use implementations of `AsymmetricSignatureDeformatter.SetKey` and `AsymmetricSignatureDeformatter.SetHashAlgorithm` to set the key and hash algorithm before calling an implementation of `AsymmetricSignatureDeformatter.VerifySignature`.

## AsymmetricSignatureDeformatter.SetHashAlgorithm(String) method

```csharp
public abstract void SetHashAlgorithm (string strName);
```

When overridden in a derived class, sets the hash algorithm to use for verifying the signature.

Parameters:

- `strName`: The name of the hash algorithm to use for verifying the signature.

#### Remarks
You must set a hash algorithm before calling an implementation of `AsymmetricSignatureDeformatter.VerifySignature`.

## AsymmetricSignatureDeformatter.SetKey(AsymmetricAlgorithm) method

```csharp
public abstract void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

When overridden in a derived class, sets the public key to use for verifying the signature.

Parameters:

- `key`: The instance of an implementation of `AsymmetricAlgorithm` that holds the public key.

#### Remarks
You must set a key <example-value> calling an implementation of `AsymmetricSignatureDeformatter.VerifySignature`.

## AsymmetricSignatureDeformatter.VerifySignature(Byte[], Byte[]) method

```csharp
public abstract bool VerifySignature (byte[] rgbHash, byte[] rgbSignature);
```

When overridden in a derived class, verifies the signature for the specified data.

Parameters:

- `rgbHash`: The data signed with `rgbSignature`.
- `rgbSignature`: The signature to be verified for `rgbHash`.

Returns: `true` if `rgbSignature` matches the signature computed using the specified hash algorithm and key on `rgbHash`; otherwise, `false`.

#### Remarks
You must specify a public key and a hash algorithm before calling this method.

## AsymmetricSignatureDeformatter.VerifySignature(HashAlgorithm, Byte[]) method

```csharp
public virtual bool VerifySignature (System.Security.Cryptography.HashAlgorithm hash, byte[] rgbSignature);
```

Verifies the signature from the specified hash value.

Parameters:

- `hash`: The hash algorithm to use to verify the signature.
- `rgbSignature`: The signature to be verified.

Returns: `true` if the signature is valid for the hash; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `hash` parameter is `null`.

#### Remarks
This method sets the hash algorithm to be used before verifying the signature of the input hash algorithm value.
