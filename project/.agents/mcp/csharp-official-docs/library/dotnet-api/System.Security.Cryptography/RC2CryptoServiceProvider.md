---
title: "RC2CryptoServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RC2CryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RC2CryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class RC2CryptoServiceProvider : System.Security.Cryptography.RC2
```

Defines a wrapper object to access the cryptographic service provider (CSP) implementation of the `RC2` algorithm. This class cannot be inherited.

To be added.

## RC2CryptoServiceProvider.RC2CryptoServiceProvider() constructor

```csharp
public RC2CryptoServiceProvider ();
```

Initializes a new instance of the `RC2CryptoServiceProvider` class.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.
- `InvalidOperationException`: A non-compliant FIPS algorithm was found.

#### Examples
The following code example encrypts and then decrypts a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RC2CryptoServiceProvider/Overview/class1.cs._

## RC2CryptoServiceProvider.EffectiveKeySize property

```csharp
public override int EffectiveKeySize { get; set; }
```

Gets or sets the effective size, in bits, of the secret key used by the `RC2` algorithm.

Returns: The effective key size, in bits, used by the `RC2` algorithm.

Exceptions:

- `CryptographicUnexpectedOperationException`: The `RC2CryptoServiceProvider.EffectiveKeySize` property was set to a value other than the `SymmetricAlgorithm.KeySizeValue` property.

To be added.

## RC2CryptoServiceProvider.UseSalt property

```csharp
public bool UseSalt { get; set; }
```

Gets or sets a value that determines whether to create a key with an 11-byte-long, zero-value salt.

Returns: `true` if the key <example-value> be created with an 11-byte-long, zero-value salt; otherwise, `false`. The default is `false`.

#### Remarks
The `UseSalt` property allows you to interoperate with an existing application that uses an 11-byte-long, zero-value salt.  For most scenarios, you should not use a salt with an `RC2CryptoServiceProvider` key.

#### Examples
The following code example sets the `UseSalt` property to `true`, and then encrypts and decrypts a value.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RC2CryptoServiceProvider/UseSalt/example.cs._

## RC2CryptoServiceProvider.CreateDecryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric `RC2` decryptor object with the specified key (`SymmetricAlgorithm.Key`) and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric `RC2` decryptor object.

Exceptions:

- `CryptographicException`: An `CipherMode.OFB` cipher mode was used.

-or-

A `CipherMode.CFB` cipher mode with a feedback size other than 8 bits was used.

-or-

An invalid key size was used.

-or-

The algorithm key size was not available.

#### Remarks
This method is used to decrypt an encrypted message created using the `RC2CryptoServiceProvider.CreateEncryptor` overload with the same parameters.

#### Examples
The following code example encrypts and then decrypts a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RC2CryptoServiceProvider/Overview/class1.cs._

## RC2CryptoServiceProvider.CreateEncryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric `RC2` encryptor object with the specified key (`SymmetricAlgorithm.Key`) and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric `RC2` encryptor object.

Exceptions:

- `CryptographicException`: An `CipherMode.OFB` cipher mode was used.

-or-

A `CipherMode.CFB` cipher mode with a feedback size other than 8 bits was used.

-or-

An invalid key size was used.

-or-

The algorithm key size was not available.

#### Remarks
Use the `RC2CryptoServiceProvider.CreateDecryptor` overload with the same parameters to decrypt the result of this method.

#### Examples
The following code example encrypts and then decrypts a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RC2CryptoServiceProvider/Overview/class1.cs._

## RC2CryptoServiceProvider.GenerateIV() method

```csharp
public override void GenerateIV ();
```

Generates a random initialization vector (`SymmetricAlgorithm.IV`) to use for the algorithm.

#### Remarks
Use this method to generate a random `SymmetricAlgorithm.IV` when none is specified.

#### Examples
The following code example encrypts and then decrypts a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RC2CryptoServiceProvider/Overview/class1.cs._

## RC2CryptoServiceProvider.GenerateKey() method

```csharp
public override void GenerateKey ();
```

Generates a random key (`SymmetricAlgorithm.Key`) to be used for the algorithm.

#### Remarks
Use this method to generate a random key when none is specified.

The `RC2CryptoServiceProvider` implementation supports key <example-value> from 40 bits to 128 bits in increments of 8 bits.

#### Examples
The following code example encrypts and then decrypts a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RC2CryptoServiceProvider/Overview/class1.cs._
