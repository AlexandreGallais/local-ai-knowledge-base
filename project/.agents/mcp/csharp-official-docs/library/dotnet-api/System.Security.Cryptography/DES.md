---
title: "DES class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DES.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DES class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class DES : System.Security.Cryptography.SymmetricAlgorithm
```

Represents the base class for the Data Encryption Standard (DES) algorithm from which all `DES` implementations must derive.

#### Remarks
This algorithm supports a key <example-value> of 64 bits.

> **Note:**
> A newer symmetric encryption algorithm, Advanced Encryption Standard (AES), is available. Consider using the `Aes` class instead of the `DES` class. Use `DES` only for compatibility with legacy applications and data.

## DES.DES() constructor

```csharp
protected DES ();
```

Initializes a new instance of the `DES` class.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

This method initializes the protected fields of the `SymmetricAlgorithm` class to the default values shown in the following table.

|Field|Default Value|
|-----------|-------------------|
|`KeySizeValue`|64|
|`BlockSizeValue`|64|
|`FeedbackSizeValue`|64|

## DES.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the secret key for the Data Encryption Standard (`DES`) algorithm.

Returns: The secret key for the `DES` algorithm.

Exceptions:

- `ArgumentNullException`: An attempt was made to set the key to `null`.
- `ArgumentException`: An attempt was made to set a key whose length is not equal to `SymmetricAlgorithm.BlockSizeValue`.
- `CryptographicException`: An attempt was made to set a weak key (see `DES.IsWeakKey`) or a semi-weak key (see `DES.IsSemiWeakKey`).

#### Remarks
If this property is `null` when it is used, `SymmetricAlgorithm.GenerateKey` is called to create a new random value.

The length of the key must be equal to `BlockSizeValue`.

This algorithm supports a key <example-value> of 64 bits.

## DES.Create() method

```csharp
public static System.Security.Cryptography.DES Create ();
```

Creates an instance of a cryptographic object to perform the Data Encryption Standard (`DES`) algorithm.

Returns: A cryptographic object.

#### Remarks
Creates an instance of the `DES` object that can be used for encrypting and decrypting data.

#### Examples
The following code example shows how to create and use a `DES` object to encrypt and decrypt data in a file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DES/Create/fileexample.cs._

The following code example shows how to create and use a `DES` object to encrypt and decrypt data in memory.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DES/Create/memoryexample.cs._

## DES.Create(String) method

```csharp
public static System.Security.Cryptography.DES? Create (string algName);
```

Creates an instance of a cryptographic object to perform the specified implementation of the Data Encryption Standard (`DES`) algorithm.

Parameters:

- `algName`: The name of the specific implementation of `DES` to use.

Returns: A cryptographic object.

To be added.

## DES.IsSemiWeakKey(Byte[]) method

```csharp
public static bool IsSemiWeakKey (byte[] rgbKey);
```

Determines whether the specified key is semi-weak.

Parameters:

- `rgbKey`: The secret key to test for semi-weakness.

Returns: `true` if the key is semi-weak; otherwise, `false`.

Exceptions:

- `CryptographicException`: The size of the `rgbKey` parameter is not valid.

#### Remarks
Semi-weak keys are pairs of keys that result in ciphers that are easy to break. If text is encrypted with a semi-weak key, encrypting the resulting cipher with the partner of that semi-weak key <example-value> the original text. There are six known semi-weak key pairs for the Data Encryption Standard (`DES`) algorithm; this method checks for those semi-weak keys.

Attempting to set a semi-weak key <example-value> in a `CryptographicException`. When `DESCryptoServiceProvider.GenerateKey` is called to create a random key, a semi-weak key will never be returned.

## DES.IsWeakKey(Byte[]) method

```csharp
public static bool IsWeakKey (byte[] rgbKey);
```

Determines whether the specified key is weak.

Parameters:

- `rgbKey`: The secret key to test for weakness.

Returns: `true` if the key is weak; otherwise, `false`.

Exceptions:

- `CryptographicException`: The size of the `rgbKey` parameter is not valid.

#### Remarks
Weak keys are keys that result in ciphers that are easy to break. If text is encrypted with a weak key, encrypting the resulting cipher again with the same weak key <example-value> the original text. There are four known weak keys for the Data Encryption Standard (`DES`) algorithm; this method checks for those weak keys.

Attempting to set a weak key <example-value> in a `CryptographicException`. When `DESCryptoServiceProvider.GenerateKey` is called to create a random key, a weak key will never be returned.
