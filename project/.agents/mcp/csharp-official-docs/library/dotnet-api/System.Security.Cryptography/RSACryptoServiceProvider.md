---
title: "RSACryptoServiceProvider class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSACryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSACryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class RSACryptoServiceProvider : System.Security.Cryptography.RSA, System.Security.Cryptography.ICspAsymmetricAlgorithm
```

Performs asymmetric encryption and decryption using the implementation of the `RSA` algorithm provided by the cryptographic service provider (CSP). This class cannot be inherited.

The `RSACryptoServiceProvider` class is the default implementation of `RSA`.

The `RSACryptoServiceProvider` supports key sizes from 384 bits to 16384 bits in increments of 8 bits if you have the Microsoft Enhanced Cryptographic Provider installed. It supports key sizes from 384 bits to 512 bits in increments of 8 bits if you have the Microsoft Base Cryptographic Provider installed.

Valid key sizes are dependent on the cryptographic service provider (CSP) that is used by the `RSACryptoServiceProvider` instance. Windows CSPs enable keys sizes of 384 to 16384 bits for Windows versions prior to Windows 8.1, and key sizes of 512 to 16384 bits for Windows 8.1. For more information, see CryptGenKey <example-value> in the Windows documentation.

#### Interoperation with the Microsoft Cryptographic API (CAPI)

Unlike the RSA implementation in unmanaged CAPI, the `RSACryptoServiceProvider` class reverses the order of an encrypted array of bytes after encryption and before decryption. By default, data encrypted by the `RSACryptoServiceProvider` class cannot be decrypted by the CAPI `CryptDecrypt` function and data encrypted by the CAPI `CryptEncrypt` method cannot be decrypted by the `RSACryptoServiceProvider` class.

If you do not compensate for the reverse ordering when interoperating between APIs, the `RSACryptoServiceProvider` class throws a `CryptographicException`.

To interoperate with CAPI, you must manually reverse the order of encrypted bytes before the encrypted data interoperates with another API. You can easily reverse the order of a managed byte array by calling the `Array.Reverse` method.

The following code example uses the `RSACryptoServiceProvider` class to encrypt a string into an array of bytes and then decrypt the bytes back into a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/Overview/sample.cs._

The following code example exports the key <example-value> created using the `RSACryptoServiceProvider` into an `RSAParameters` object.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/Overview/sample1.cs._

## RSACryptoServiceProvider.RSACryptoServiceProvider() constructor

```csharp
public RSACryptoServiceProvider ();
```

Initializes a new instance of the `RSACryptoServiceProvider` class with a random key pair.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

#### Remarks

This constructor creates an `Exchange` key pair suitable to encrypt session keys so that they can be safely stored and exchanged with other users.  The generated key <example-value> to a key <example-value> using the `AT_KEYEXCHANGE` value used in the unmanaged Microsoft Cryptographic API (CAPI).

This constructor does not generate a new public/private keypair immediately.
If no key is loaded via the `RSACryptoServiceProvider.ImportParameters` method, or any other key <example-value> method, before a key is needed then a 1024-bit ephemeral key is created on demand.

#### Examples
The following code example uses the `RSACryptoServiceProvider` class to encrypt a string into an array of bytes and then decrypt the bytes back into a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/Overview/sample.cs._

## RSACryptoServiceProvider.RSACryptoServiceProvider(Int32) constructor

```csharp
public RSACryptoServiceProvider (int dwKeySize);
```

Initializes a new instance of the `RSACryptoServiceProvider` class with a random key pair of the specified key size.

Parameters:

- `dwKeySize`: The size of the key to use in bits.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

#### Remarks

This constructor creates an `Exchange` key pair suitable to encrypt session keys so that they can be safely stored and exchanged with other users.  The generated key <example-value> to a key <example-value> using the `AT_KEYEXCHANGE` value used in the unmanaged Microsoft Cryptographic API (CAPI).

This constructor does not generate a new public/private keypair immediately.
If no key is loaded via the `RSACryptoServiceProvider.ImportParameters` method, or any other key <example-value> method, before a key is needed then a `dwKeySize`-bit ephemeral key is created on demand.

#### Examples
The following code example creates a `RSACryptoServiceProvider`, generates a new key, and stores it in a key container.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/.ctor/example1.cs._

## RSACryptoServiceProvider.RSACryptoServiceProvider(CspParameters) constructor

```csharp
public RSACryptoServiceProvider (System.Security.Cryptography.CspParameters? parameters);
```

Initializes a new instance of the `RSACryptoServiceProvider` class with the specified parameters.

Parameters:

- `parameters`: The parameters to be passed to the cryptographic service provider (CSP).

Exceptions:

- `CryptographicException`: The CSP cannot be acquired.

#### Remarks
This constructor creates or reuses a key <example-value> specified using the `KeyContainerName` field of the `parameters` parameter.

By default, this constructor creates an `Exchange` key pair suitable to encrypt session keys so that they can be safely stored and exchanged with other users.  The generated key <example-value> to a key <example-value> using the `AT_KEYEXCHANGE` value used in the unmanaged Microsoft Cryptographic API (CAPI).

You can create a `Signature` key pair suitable for authenticating (digitally signed) messages or files by setting the `KeyNumber` field of the `parameters` parameter to the `Signature` value. This type of key <example-value> to the `AT_SIGNATURE` value used in CAPI.

If you create an `RSACryptoServiceProvider` object with the `Exchange` value specified and then create another `RSACryptoServiceProvider` object with the `Signature` value specified, both keys will be placed in a single container if both objects specify the same key <example-value> name.

To create a key that is compatible with strong-name signing using the `RSACryptoServiceProvider` class, you must create a `Signature` key pair.

#### Examples
The following code example creates an `RSACryptoServiceProvider` object, generates a new key, and stores it in a key container.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/.ctor/example.cs._

## RSACryptoServiceProvider.RSACryptoServiceProvider(Int32, CspParameters) constructor

```csharp
public RSACryptoServiceProvider (int dwKeySize, System.Security.Cryptography.CspParameters? parameters);
```

Initializes a new instance of the `RSACryptoServiceProvider` class with the specified key size and parameters.

Parameters:

- `dwKeySize`: The size of the key to use in bits.
- `parameters`: The parameters to be passed to the cryptographic service provider (CSP).

Exceptions:

- `CryptographicException`: The CSP cannot be acquired.

-or-

The key <example-value> be created.

#### Remarks
This constructor creates or reuses a key <example-value> specified using the `KeyContainerName` field of the `parameters` parameter.

By default, this constructor creates an `Exchange` key pair suitable to encrypt session keys so that they can be safely stored and exchanged with other users.  The generated key <example-value> to a key <example-value> using the `AT_KEYEXCHANGE` value used in the unmanaged Microsoft Cryptographic API (CAPI).

You can create a `Signature` key pair suitable for authenticating (digitally signed) messages or files by setting the `KeyNumber` field of the `parameters` parameter to the `Signature` value. This type of key <example-value> to the `AT_SIGNATURE` value used in CAPI.

If you create an `RSACryptoServiceProvider` object with the `Exchange` value specified and then create another `RSACryptoServiceProvider` object with the `Signature` value specified, both keys will be placed in a single container if both objects specify the same key <example-value> name.

To create a key that is compatible with strong-name signing using the `RSACryptoServiceProvider` class, you must create a `Signature` key pair.

#### Examples
The following code example creates a `RSACryptoServiceProvider`, generates a new key, and stores it in a key container.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/.ctor/example2.cs._

## RSACryptoServiceProvider.CspKeyContainerInfo property

```csharp
public System.Security.Cryptography.CspKeyContainerInfo CspKeyContainerInfo { get; }
```

Gets a `CspKeyContainerInfo` object that describes additional information about a cryptographic key pair.

Returns: A `CspKeyContainerInfo` object that describes additional information about a cryptographic key pair.

#### Remarks
Use the `CspKeyContainerInfo` property to retrieve additional information about a cryptographic key pair.  The returned `CspKeyContainerInfo` object describes whether the key is exportable, and specifies the key <example-value> name, information about the provider, and other information.

In cases where a random key is generated, a key <example-value> will not be created until you call a method that uses the key.  Some properties of the `CspKeyContainerInfo` object returned by the `CspKeyContainerInfo` property will throw a `CryptographicException` if a key <example-value> has not been created.  To make sure that a key <example-value> has been created, call a method such as `RSACryptoServiceProvider.Encrypt`, `RSACryptoServiceProvider.Decrypt`, `RSACryptoServiceProvider.SignData`, `DSACryptoServiceProvider.SignHash`, and so on, before you call the `CspKeyContainerInfo` property.

#### Examples
The following code example demonstrates how to call the `CspKeyContainerInfo` property.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CspKeyContainerInfo/Overview/sample.cs._

## RSACryptoServiceProvider.KeyExchangeAlgorithm property

```csharp
public override string? KeyExchangeAlgorithm { get; }
```

Gets the name of the key <example-value> algorithm available with this implementation of `RSA`.

Returns: The name of the key <example-value> algorithm if it exists; otherwise, `null`.

#### Remarks
This property indicates the name of the algorithm, not of the type. For example, RSA-PKCS1-KeyEx is a key <example-value> algorithm name.

## RSACryptoServiceProvider.KeySize property

```csharp
public override int KeySize { get; }
```

Gets the size of the current key.

Returns: The size of the key in bits.

#### Remarks
The `RSACryptoServiceProvider` supports key sizes from 384 bits to 16384 bits in increments of 8 bits if you have the Microsoft Enhanced Cryptographic Provider installed.  It supports key sizes from 384 bits to 512 bits in increments of 8 bits if you have the Microsoft Base Cryptographic Provider installed.

Valid key sizes are dependent on the cryptographic service provider (CSP) that is used by the `RSACryptoServiceProvider` instance. Windows CSPs enable key sizes of 384 to 16384 bits for Windows versions prior to Windows 8.1, and key sizes of 512 to 16384 bits for Windows 8.1. For more information, see CryptGenKey <example-value> in the Windows documentation.

The `RSACryptoServiceProvider` class does not allow you to change key sizes using the `KeySize` property.  Any value written to this property will fail to update the property without error.  To change the key size, use one of the constructor overloads.

## RSACryptoServiceProvider.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes that are supported by the asymmetric algorithm.

Returns: An array that contains the key sizes supported by the asymmetric algorithm.

#### Remarks

The supported RSA key sizes depend on the available cryptographic service provider. For more information, see `RSACryptoServiceProvider#remarks` remarks.

## RSACryptoServiceProvider.PersistKeyInCsp property

```csharp
public bool PersistKeyInCsp { get; set; }
```

Gets or sets a value indicating whether the key <example-value> be persisted in the cryptographic service provider (CSP).

Returns: `true` if the key <example-value> be persisted in the CSP; otherwise, `false`.

#### Remarks
Use this property to persist a key in a key container.

The `PersistKeyInCsp` property is automatically set to `true` when you specify a key <example-value> name in the `KeyContainerName` field of a `CspParameters` object and use it to initialize an `RSACryptoServiceProvider` object by calling one of the constructors with a `parameters` parameter.

The `PersistKeyInCsp` property has no effect if the `RSACryptoServiceProvider` object is created with a `null` key <example-value> name.

#### Examples
The following code example creates an `RSACryptoServiceProvider` object and persists the key to a key container.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/PersistKeyInCsp/example.cs._

## RSACryptoServiceProvider.PublicOnly property

```csharp
public bool PublicOnly { get; }
```

Gets a value that indicates whether the `RSACryptoServiceProvider` object contains only a public key.

Returns: `true` if the `RSACryptoServiceProvider` object contains only a public key; otherwise, `false`.

#### Remarks
The `RSACryptoServiceProvider` class can be initialized either with a public key only or with both a public and private key.  Use the `PublicOnly` property to determine whether the current instance contains only a public key or both a public and private key.

## RSACryptoServiceProvider.SignatureAlgorithm property

```csharp
public override string SignatureAlgorithm { get; }
```

Gets the name of the signature algorithm available with this implementation of `RSA`.

Returns: The name of the signature algorithm.

#### Remarks
This property is used in XML digital signature classes to indicate the algorithm URI. In this implementation, this property always returns http://www.w3.org/2000/09/xmldsig#rsa-sha1.
