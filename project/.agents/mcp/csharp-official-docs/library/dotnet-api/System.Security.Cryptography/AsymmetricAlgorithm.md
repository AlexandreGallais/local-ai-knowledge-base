---
title: "AsymmetricAlgorithm class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsymmetricAlgorithm class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class AsymmetricAlgorithm : IDisposable
```

Represents the abstract base class from which all implementations of asymmetric algorithms must inherit.

#### Remarks
Asymmetric cryptographic algorithms, also known as public-key <example-value>, require that both sender and receiver maintain a pair of related keys: a private key and a public key. Both keys are unique to the entity. The public key can be made available to anyone; this key is used for encoding data that is sent to a receiver. The private key must be kept private by the receiver; this key is used for decoding messages encoded using the receiver's public key. The `RSACryptoServiceProvider` class is an implementation of a public-key algorithm. For an in-depth discussion of public-key <example-value> and algorithms, see the "Public-Key <example-value>" section in Cryptographic Services. For information about how to use the Strong Name tool (Sn.exe) to create key pairs, see How to: Create a Public-Private Key Pair.

You can use public-key <example-value> to form digital signatures. Digital signatures are used to help to protect the integrity of data. For example, to use a public-key <example-value> to digitally sign a message, the sender first applies a hash function to the message to create a message digest. The sender then encrypts the message digest with the sender'<example-value>'s personal signature. Upon receiving the message and signature, the receiver decrypts the signature using the sender'<example-value>'s public key is common knowledge. This technique does not retain the secrecy of the message; for the message to be secret, it must also be encrypted.

.NET provides the following classes that implement digital signature algorithms: `DSACryptoServiceProvider`, `RSACryptoServiceProvider`, `ECDsa` (base class), and `ECDsaCng`.

The `Cryptography` namespace provides concrete classes for `RSA` and `DSA` only.

To learn how to use the RSA algorithm to encrypt and decrypt XML data, and create and verify XML digital signatures, see these articles:

-   How to: Encrypt XML Elements with Asymmetric Keys

-   How to: Decrypt XML Elements with Asymmetric Keys

-   How to: Sign XML Documents with Digital Signatures

-   How to: Verify the Digital Signatures of XML Documents

#### Examples
The following code example demonstrates how to implement a custom asymmetric algorithm inherited from the `AsymmetricAlgorithm` class.  An additional class is provided to demonstrate how to use the custom class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._

Here's an additional class that demonstrates how to use the custom class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._

## AsymmetricAlgorithm.AsymmetricAlgorithm() constructor

```csharp
protected AsymmetricAlgorithm ();
```

Initializes a new instance of the `AsymmetricAlgorithm` class.

Exceptions:

- `CryptographicException`: The implementation of the derived class is not valid.

#### Remarks
You cannot create an instance of an abstract class. Application code creates a new instance of a derived class. The `RSACryptoServiceProvider` and `DSACryptoServiceProvider` classes are the only currently supported implementations.

## AsymmetricAlgorithm.KeyExchangeAlgorithm property

```csharp
public virtual string? KeyExchangeAlgorithm { get; }
```

When overridden in a derived class, gets the name of the key <example-value> algorithm. Otherwise, throws an `NotImplementedException`.

Returns: The name of the key <example-value> algorithm.

#### Examples
The following code example demonstrates how to override the `KeyExchangeAlgorithm` property to return the name for the key <example-value> algorithm. This code example is part of a larger example provided for the `AsymmetricAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._

## AsymmetricAlgorithm.KeySize property

```csharp
public virtual int KeySize { get; set; }
```

Gets or sets the size, in bits, of the key <example-value> used by the asymmetric algorithm.

Returns: The size, in bits, of the key <example-value> used by the asymmetric algorithm.

Exceptions:

- `CryptographicException`: The key <example-value> size is invalid.

#### Remarks
The valid key sizes are specified by the particular implementation of the asymmetric algorithm and are listed in the `LegalKeySizes` property.

#### Examples
The following code example demonstrates how to override the `KeySize` property to verify that it falls within the range identified in the local `keySizes` member variable. This code example is part of a larger example provided for the `AsymmetricAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._

## AsymmetricAlgorithm.LegalKeySizes property

```csharp
public virtual System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes that are supported by the asymmetric algorithm.

Returns: An array that contains the key sizes supported by the asymmetric algorithm.

#### Remarks
The asymmetric algorithm supports only key sizes that match an entry in this array.

#### Examples
The following code example demonstrates how to call the `LegalKeySizes` property to retrieve the `KeySizes.MinSize`, `KeySizes.MaxSize`, and `KeySizes.SkipSize` properties. This code example is part of a larger example provided for the `AsymmetricAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._

## AsymmetricAlgorithm.SignatureAlgorithm property

```csharp
public virtual string? SignatureAlgorithm { get; }
```

When implemented in a derived class, gets the name of the signature algorithm. Otherwise, always throws a `NotImplementedException`.

Returns: The name of the signature algorithm.

#### Examples
The following code example demonstrates how to override the `SignatureAlgorithm` property to return the name of the signature algorithm. This code example is part of a larger example provided for the `AsymmetricAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._

## AsymmetricAlgorithm.Clear() method

```csharp
public void Clear ();
```

Releases all resources used by the `AsymmetricAlgorithm` class.

#### Remarks
This method is a simple call to the `IDisposable.Dispose` method.

Calling `Dispose` allows the resources used by the `AsymmetricAlgorithm` class to be reallocated for other purposes. For more information about `Dispose`, see Cleaning Up Unmanaged Resources.

#### Examples
The following code example demonstrates how to call the `AsymmetricAlgorithm.Clear` method to release the resources of the current `customCrypto` object. This code example is part of a larger example provided for the `AsymmetricAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._

## AsymmetricAlgorithm.Create() method

```csharp
public static System.Security.Cryptography.AsymmetricAlgorithm Create ();
```

Creates a default cryptographic object used to perform the asymmetric algorithm.

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## AsymmetricAlgorithm.Create(String) method

```csharp
public static System.Security.Cryptography.AsymmetricAlgorithm? Create (string algName);
```

Creates an instance of the specified implementation of an asymmetric algorithm.

Parameters:

- `algName`: The asymmetric algorithm implementation to use. The following table shows the valid values for the `algName` parameter and the algorithms they map to.

-  System.Security.Cryptography.AsymmetricAlgorithm

: `AsymmetricAlgorithm`
-  RSA

: `RSA`
-  System.Security.Cryptography.RSA

: `RSA`
-  DSA

: `DSA`
-  System.Security.Cryptography.DSA

: `DSA`
-  ECDsa

: `ECDsa`
-  ECDsaCng

: `ECDsaCng`
-  System.Security.Cryptography.ECDsaCng

: `ECDsaCng`
-  ECDH

: `ECDiffieHellman`
-  ECDiffieHellman

: `ECDiffieHellman`
-  ECDiffieHellmanCng

: `ECDiffieHellmanCng`
-  System.Security.Cryptography.ECDiffieHellmanCng

: `ECDiffieHellmanCng`

Returns: A new instance of the specified asymmetric algorithm implementation.

To be added.

## AsymmetricAlgorithm.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `AsymmetricAlgorithm` class.

#### Remarks
Call `Dispose` when you are finished using the `AsymmetricAlgorithm`. The `Dispose` method leaves the `AsymmetricAlgorithm` in an unusable state. After calling `Dispose`, you must release all references to the `AsymmetricAlgorithm` so the garbage collector can reclaim the memory that the `AsymmetricAlgorithm` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `AsymmetricAlgorithm`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `AsymmetricAlgorithm` object's `Finalize` method.

## AsymmetricAlgorithm.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `AsymmetricAlgorithm` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `AsymmetricAlgorithm` references. This method invokes the `Dispose()` method of each referenced object.

## AsymmetricAlgorithm.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public virtual byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

Exceptions:

- `CryptographicException`: The key could not be exported.

-or-

`pbeParameters` indicates that `PbeEncryptionAlgorithm.TripleDes3KeyPkcs12` should be used, which requires `Char`-based passwords.

#### Remarks
The password bytes are passed directly into the Key <example-value> Function (KDF) used by the algorithm indicated by `pbeParameters`.
This enables compatibility with other systems which use a text encoding other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

## AsymmetricAlgorithm.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public virtual byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

Exceptions:

- `CryptographicException`: The key could not be exported.

#### Remarks
When `pbeParameters` indicates an algorithm that uses PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

## AsymmetricAlgorithm.ExportEncryptedPkcs8PrivateKeyPem(Byte>, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password, PEM encoded.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A string containing the PEM-encoded PKCS#8 EncryptedPrivateKeyInfo.

Exceptions:

- `NotImplementedException`: An implementation for `AsymmetricAlgorithm.ExportEncryptedPkcs8PrivateKey` or
`AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKey` has not been provided.
- `CryptographicException`: The key could not be exported.

A PEM-encoded PKCS#8 EncryptedPrivateKeyInfo will begin with `-----BEGIN ENCRYPTED PRIVATE KEY-----` and end with `-----END ENCRYPTED PRIVATE KEY-----`, with the base64 encoded DER contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict" encoding rules.

## AsymmetricAlgorithm.ExportEncryptedPkcs8PrivateKeyPem(Char>, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password, PEM encoded.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A string containing the PEM-encoded PKCS#8 EncryptedPrivateKeyInfo.

Exceptions:

- `NotImplementedException`: An implementation for `AsymmetricAlgorithm.ExportEncryptedPkcs8PrivateKey` or
`AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKey` has not been provided.
- `CryptographicException`: The key could not be exported.

#### Remarks

When `pbeParameters` indicates an algorithm that
uses PBKDF2 (Password-Based Key <example-value> Function 2), the password
is converted to bytes via the UTF-8 encoding.

A PEM-encoded PKCS#8 EncryptedPrivateKeyInfo will begin with
`-----BEGIN ENCRYPTED PRIVATE KEY-----` and end with
`-----END ENCRYPTED PRIVATE KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict" encoding rules.
