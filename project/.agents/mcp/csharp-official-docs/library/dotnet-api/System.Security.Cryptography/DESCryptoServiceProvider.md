---
title: "DESCryptoServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DESCryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DESCryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class DESCryptoServiceProvider : System.Security.Cryptography.DES
```

Defines a wrapper object to access the cryptographic service provider (CSP) version of the Data Encryption Standard (`DES`) algorithm. This class cannot be inherited.

To be added.

## DESCryptoServiceProvider.DESCryptoServiceProvider() constructor

```csharp
public DESCryptoServiceProvider ();
```

Initializes a new instance of the `DESCryptoServiceProvider` class.

Exceptions:

- `CryptographicException`: The Data Encryption Standard (`DES`) cryptographic service provider is not available.

#### Examples
The following code example uses `DESCryptoServiceProvider` (an implementation of `DES`) with the specified key (`SymmetricAlgorithm.Key`) and initialization vector (`SymmetricAlgorithm.IV`) to encrypt a file specified by `inName`. It then outputs the encrypted result to the file specified by `outName`.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DESCryptoServiceProvider/Overview/source.cs._

Decryption can be handled in the same way; use `DESCryptoServiceProvider.CreateDecryptor` instead of `DESCryptoServiceProvider.CreateEncryptor`. The same key (`SymmetricAlgorithm.Key`) and initialization vector (`SymmetricAlgorithm.IV`) used to encrypt the file must be used to decrypt it.

## DESCryptoServiceProvider.CreateDecryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor ();
```

Creates a symmetric decryptor object with the current `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric decryptor object.

#### Remarks
This method decrypts an encrypted message created using the `SymmetricAlgorithm.CreateEncryptor` overload with the same signature.

## DESCryptoServiceProvider.CreateDecryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric Data Encryption Standard (`DES`) decryptor object with the specified key (`SymmetricAlgorithm.Key`) and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric `DES` decryptor object.

Exceptions:

- `CryptographicException`: The value of the `SymmetricAlgorithm.Mode` property is `CipherMode.OFB`.

-or-

The value of the `SymmetricAlgorithm.Mode` property is `CipherMode.CFB` and the value of the `SymmetricAlgorithm.FeedbackSize` property is not 8.

-or-

An invalid key size was used.

-or-

The algorithm key size was not available.

#### Remarks
This method decrypts an encrypted message that was created using the `DESCryptoServiceProvider.CreateEncryptor` overload with the same parameters.

## DESCryptoServiceProvider.CreateEncryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor ();
```

Creates a symmetric encryptor object with the current `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric encryptor object.

#### Remarks
If the current `Key` property is `null`, the `SymmetricAlgorithm.GenerateKey` method is called to create a new random `SymmetricAlgorithm.Key`. If the current `IV` property is `null`, the `SymmetricAlgorithm.GenerateIV` method is called to create a new random `SymmetricAlgorithm.IV`.

Use the `SymmetricAlgorithm.CreateDecryptor` overload with the same signature to decrypt the result of this method.

## DESCryptoServiceProvider.CreateEncryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric Data Encryption Standard (`DES`) encryptor object with the specified key (`SymmetricAlgorithm.Key`) and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric `DES` encryptor object.

Exceptions:

- `CryptographicException`: The value of the `SymmetricAlgorithm.Mode` property is `CipherMode.OFB`.

-or-

The value of the `SymmetricAlgorithm.Mode` property is `CipherMode.CFB` and the value of the `SymmetricAlgorithm.FeedbackSize` property is not 8.

-or-

An invalid key size was used.

-or-

The algorithm key size was not available.

#### Remarks
Use the `DESCryptoServiceProvider.CreateDecryptor` overload with the same parameters to decrypt the result of this method.

#### Examples
The following code example shows how to create and use a `DESCryptoServiceProvider` object to encrypt and decrypt data in a file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DESCryptoServiceProvider/CreateEncryptor/fileexample.cs._

The following code example shows how to create and use a `DESCryptoServiceProvider` object to encrypt and decrypt data in memory.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DESCryptoServiceProvider/CreateEncryptor/memoryexample.cs._

## DESCryptoServiceProvider.GenerateIV() method

```csharp
public override void GenerateIV ();
```

Generates a random initialization vector (`SymmetricAlgorithm.IV`) to use for the algorithm.

#### Remarks
Use this method to generate a random `SymmetricAlgorithm.IV` when none is specified.

## DESCryptoServiceProvider.GenerateKey() method

```csharp
public override void GenerateKey ();
```

Generates a random key (`SymmetricAlgorithm.Key`) to be used for the algorithm.

#### Remarks
Use this method to generate a random key when none is specified. This method will never return a weak key (see `DES.IsWeakKey`) or a semi-weak key (see `DES.IsSemiWeakKey`).

This algorithm supports a key <example-value> of 64 bits.
