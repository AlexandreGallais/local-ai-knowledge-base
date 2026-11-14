---
title: "TripleDES class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/TripleDES.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TripleDES class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class TripleDES : System.Security.Cryptography.SymmetricAlgorithm
```

Represents the base class for Triple Data Encryption Standard algorithms from which all `TripleDES` implementations must derive.

#### Remarks
`TripleDES` uses three successive iterations of the `DES` algorithm. It can use either two or three 56-bit keys.

> **Note:**
>  A newer symmetric encryption algorithm, Advanced Encryption Standard (AES), is available. Consider using the `Aes` class and its derived classes instead of the `TripleDES` class. Use `TripleDES` only for compatibility with legacy applications and data.

This algorithm supports key <example-value> from 128 bits to 192 bits in increments of 64 bits.

#### Examples
The following code example shows how to create and use a `TripleDES` object to encrypt and decrypt data in a file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/TripleDES/Create/fileexample.cs._

The following code example shows how to create and use a `TripleDES` object to encrypt and decrypt data in memory.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/TripleDES/Create/memoryexample.cs._

## TripleDES.TripleDES() constructor

```csharp
protected TripleDES ();
```

Initializes a new instance of the `TripleDES` class.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

This method initializes the protected fields of the `SymmetricAlgorithm` class to the default values listed in the following table.

|Field|Default Value|
|-----------|-------------------|
|`KeySizeValue`|192|
|`BlockSizeValue`|64|
|`FeedbackSizeValue`|64|

## TripleDES.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the secret key for the `TripleDES` algorithm.

Returns: The secret key for the `TripleDES` algorithm.

Exceptions:

- `ArgumentNullException`: An attempt was made to set the key to `null`.
- `CryptographicException`: An attempt was made to set a key whose length is invalid.

-or-

An attempt was made to set a weak key (see `TripleDES.IsWeakKey`).

#### Remarks
This algorithm supports key <example-value> from 128 bits to 192 bits in increments of 64 bits.

## TripleDES.Create() method

```csharp
public static System.Security.Cryptography.TripleDES Create ();
```

Creates an instance of a cryptographic object to perform the `TripleDES` algorithm.

Returns: An instance of a cryptographic object.

#### Remarks
Creates a new instance of the `TripleDES` class.

#### Examples
The following code example shows how to create and use a `TripleDES` object to encrypt and decrypt data in a file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/TripleDES/Create/fileexample.cs._

The following code example shows how to create and use a `TripleDES` object to encrypt and decrypt data in memory.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/TripleDES/Create/memoryexample.cs._

## TripleDES.Create(String) method

```csharp
public static System.Security.Cryptography.TripleDES? Create (string str);
```

Creates an instance of a cryptographic object to perform the specified implementation of the `TripleDES` algorithm.

Parameters:

- `str`: The name of the specific implementation of `TripleDES` to use.

Returns: An instance of a cryptographic object.

To be added.

## TripleDES.IsWeakKey(Byte[]) method

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
Weak keys are keys that result in ciphers that are easy to break. If text is encrypted with a weak key, encrypting the resulting cipher again with the same weak key <example-value> the original text. In 128-bit mode, if the first 64 bits are the same as the last 64 bits, the key is weak. In 192-bit mode, if the first 64 bits are the same as the second 64 bits or if the second 64 bits are the same as the last 64 bits, the key is weak.

Attempting to set a weak key <example-value> in a `CryptographicException`. When `TripleDESCryptoServiceProvider.GenerateKey` is called to create a random key, a weak key will never be returned.
