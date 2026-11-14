---
title: "AsymmetricSignatureFormatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsymmetricSignatureFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsymmetricSignatureFormatter class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class AsymmetricSignatureFormatter
```

Represents the base class from which all implementations of asymmetric signature formatters derive.

#### Remarks
Asymmetric signature formatters create digital signatures that are verified using implementations of `AsymmetricSignatureDeformatter`.

## AsymmetricSignatureFormatter.AsymmetricSignatureFormatter() constructor

```csharp
protected AsymmetricSignatureFormatter ();
```

Initializes a new instance of `AsymmetricSignatureFormatter`.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

Use implementations of `AsymmetricSignatureFormatter.SetKey` and `AsymmetricSignatureFormatter.SetHashAlgorithm` to set the key and hash algorithm before calling an implementation of `AsymmetricSignatureFormatter.CreateSignature`.

## AsymmetricSignatureFormatter.CreateSignature(Byte[]) method

```csharp
public abstract byte[] CreateSignature (byte[] rgbHash);
```

When overridden in a derived class, creates the signature for the specified data.

Parameters:

- `rgbHash`: The data to be signed.

Returns: The digital signature for the `rgbHash` parameter.

#### Remarks
You must specify a key and a hash algorithm before calling this method.

## AsymmetricSignatureFormatter.CreateSignature(HashAlgorithm) method

```csharp
public virtual byte[] CreateSignature (System.Security.Cryptography.HashAlgorithm hash);
```

Creates the signature from the specified hash value.

Parameters:

- `hash`: The hash algorithm to use to create the signature.

Returns: The signature for the specified hash value.

Exceptions:

- `ArgumentNullException`: The `hash` parameter is `null`.

#### Remarks
This method sets the hash algorithm to be used, then returns the signature of the input hash algorithm value.

## AsymmetricSignatureFormatter.SetHashAlgorithm(String) method

```csharp
public abstract void SetHashAlgorithm (string strName);
```

When overridden in a derived class, sets the hash algorithm to use for creating the signature.

Parameters:

- `strName`: The name of the hash algorithm to use for creating the signature.

#### Remarks
You must set a hash algorithm before calling an implementation of `AsymmetricSignatureFormatter.CreateSignature`.

## AsymmetricSignatureFormatter.SetKey(AsymmetricAlgorithm) method

```csharp
public abstract void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

When overridden in a derived class, sets the asymmetric algorithm to use to create the signature.

Parameters:

- `key`: The instance of the implementation of `AsymmetricAlgorithm` to use to create the signature.

#### Remarks
You must set a key <example-value> calling an implementation of `AsymmetricSignatureFormatter.CreateSignature`.
