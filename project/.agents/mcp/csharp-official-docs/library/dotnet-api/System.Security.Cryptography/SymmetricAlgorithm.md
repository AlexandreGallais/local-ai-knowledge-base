---
title: "SymmetricAlgorithm class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SymmetricAlgorithm class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class SymmetricAlgorithm : IDisposable
```

Represents the abstract base class from which all implementations of symmetric algorithms must inherit.

#### Remarks
The classes that derive from the `SymmetricAlgorithm` class use a chaining mode called cipher block chaining (CBC), which requires a key (`SymmetricAlgorithm.Key`) and an initialization vector (`SymmetricAlgorithm.IV`) to perform cryptographic transformations on data.  To decrypt data that was encrypted using one of the `SymmetricAlgorithm` classes, you must set the `Key` property and the `IV` property to the same values that were used for encryption.  For a symmetric algorithm to be useful, the secret key must be known only to the sender and the receiver.

`Aes`, `DES`, `RC2`, and `TripleDES` are implementations of symmetric algorithms.

Note that when using derived classes, it is not enough, from a security perspective, to simply force a garbage collection after you have finished using the object. You must explicitly call the `SymmetricAlgorithm.Clear` method on the object to zero out any sensitive data within the object before it is released. Note that garbage collection does not zero out the contents of collected objects but simply marks the memory as available for reallocation. Thus the data contained within a garbage collected object may still be present in the memory heap in unallocated memory. In the case of cryptographic objects, this data could contain sensitive information such as key data or a block of plain text.

All cryptographic classes in .NET that hold sensitive data implement a `Clear` method. When called, the `Clear` method overwrites all sensitive data within the object with zeros and then releases the object so that it can be safely garbage collected. When the object has been zeroed and released, you should then call the `Dispose` method with the `disposing` parameter set to `True` to dispose of all managed and unmanaged resources associated with the object.

#### Examples
The following code example uses the `Aes` class with the specified `Key` property and initialization vector (`SymmetricAlgorithm.IV`) to encrypt a file specified by `inName`, and outputs the encrypted result to the file specified by `outName`. The `desKey` and `desIV` parameters to the method are 8-byte arrays. You must have the high encryption pack installed to run this example.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/SymmetricAlgorithm/Overview/source.cs._

## SymmetricAlgorithm.SymmetricAlgorithm() constructor

```csharp
protected SymmetricAlgorithm ();
```

Initializes a new instance of the `SymmetricAlgorithm` class.

Exceptions:

- `CryptographicException`: The implementation of the class derived from the symmetric algorithm is not valid.

#### Remarks
You cannot create an instance of an abstract class. Application code creates a new instance of a derived class.

## SymmetricAlgorithm.BlockSize property

```csharp
public virtual int BlockSize { get; set; }
```

Gets or sets the block size, in bits, of the cryptographic operation.

Returns: The block size, in bits.

Exceptions:

- `CryptographicException`: The block size is invalid.

#### Remarks
The block size is the basic unit of data that can be encrypted or decrypted in one operation. Messages longer than the block size are handled as successive blocks; messages shorter than the block size must be padded with extra bits to reach the size of a block. Valid block sizes are determined by the symmetric algorithm used.

## SymmetricAlgorithm.FeedbackSize property

```csharp
public virtual int FeedbackSize { get; set; }
```

Gets or sets the feedback size, in bits, of the cryptographic operation for the Cipher Feedback (CFB) and Output Feedback (OFB) cipher modes.

Returns: The feedback size in bits.

Exceptions:

- `CryptographicException`: The feedback size is larger than the block size.

#### Remarks
The feedback size determines the amount of data that is fed back to successive encryption or decryption operations. The feedback size cannot be greater than the block size.

## SymmetricAlgorithm.IV property

```csharp
public virtual byte[] IV { get; set; }
```

Gets or sets the initialization vector (`SymmetricAlgorithm.IV`) for the symmetric algorithm.

Returns: The initialization vector.

Exceptions:

- `ArgumentNullException`: An attempt was made to set the initialization vector to `null`.
- `CryptographicException`: An attempt was made to set the initialization vector to an invalid size.

#### Remarks
The `IV` property is automatically set to a new random value whenever you create a new instance of one of the `SymmetricAlgorithm` classes or when you manually call the `SymmetricAlgorithm.GenerateIV` method.  The size of the `IV` property must be the same as the `BlockSize` property divided by 8.

The classes that derive from the `SymmetricAlgorithm` class use a chaining mode called cipher block chaining (CBC), which requires a key and an initialization vector to perform cryptographic transformations on data.  To decrypt data that was encrypted using one of the `SymmetricAlgorithm` classes, you must set the `Key` property and `IV` property to the same values that were used for encryption.

For a given secret key *k*, a simple block cipher that does not use an initialization vector will encrypt the same input block of plain text into the same output block of cipher text. If you have duplicate blocks within your plain text stream, you will have duplicate blocks within your cipher text stream. If unauthorized users know anything about the structure of a block of your plain text, they can use that information to decipher the known cipher text block and possibly recover your key. To combat this problem, information from the previous block is mixed into the process of encrypting the next block. Thus, the output of two identical plain text blocks is different. Because this technique uses the previous block to encrypt the next block, an initialization vector is needed to encrypt the first block of data.

## SymmetricAlgorithm.Key <example-value>

```csharp
public virtual byte[] Key { get; set; }
```

Gets or sets the secret key for the symmetric algorithm.

Returns: The secret key to use for the symmetric algorithm.

Exceptions:

- `ArgumentNullException`: An attempt was made to set the key to `null`.
- `CryptographicException`: The key size is invalid.

#### Remarks
The secret key is used both for encryption and for decryption. For a symmetric algorithm to be successful, the secret key must be known only to the sender and the receiver. The valid key sizes are specified by the particular symmetric algorithm implementation and are listed in the `LegalKeySizes` property.

If this property is `null` when it is used, the `SymmetricAlgorithm.GenerateKey` method is called to create a new random value.

## SymmetricAlgorithm.KeySize property

```csharp
public virtual int KeySize { get; set; }
```

Gets or sets the size, in bits, of the secret key used by the symmetric algorithm.

Returns: The size, in bits, of the secret key used by the symmetric algorithm.

Exceptions:

- `CryptographicException`: The key size is not valid.

#### Remarks
The valid key sizes are specified by the particular symmetric algorithm implementation and are listed in the `LegalKeySizes` property.

Changing the `KeySize` value resets the key and generates a new random key. This happens whenever the `KeySize` property setter is invoked (including when it's assigned the same value).

## SymmetricAlgorithm.LegalBlockSizes property

```csharp
public virtual System.Security.Cryptography.KeySizes[] LegalBlockSizes { get; }
```

Gets the block sizes, in bits, that are supported by the symmetric algorithm.

Returns: An array that contains the block sizes supported by the algorithm.

#### Remarks
The symmetric algorithm supports only block sizes that match an entry in this array.

#### Examples
The following example shows the value of `SymmetricAlgorithm.LegalBlockSizes` for the symmetric algorithms.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/SymmetricAlgorithm/LegalBlockSizes/program.cs._

## SymmetricAlgorithm.LegalKeySizes property

```csharp
public virtual System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by the symmetric algorithm.

Returns: An array that contains the key sizes supported by the algorithm.

#### Remarks
The symmetric algorithm supports only key sizes that match an entry in this array.

#### Examples
The following example shows the value of `SymmetricAlgorithm.LegalKeySizes` for the AES symmetric algorithm.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/SymmetricAlgorithm/LegalBlockSizes/program.cs._

## SymmetricAlgorithm.Mode property

```csharp
public virtual System.Security.Cryptography.CipherMode Mode { get; set; }
```

Gets or sets the mode for operation of the symmetric algorithm.

Returns: The mode for operation of the symmetric algorithm. The default is `CipherMode.CBC`.

Exceptions:

- `CryptographicException`: The cipher mode is not one of the `CipherMode` values.

#### Remarks
See `CipherMode` enumeration for a description of specific modes.

## SymmetricAlgorithm.Padding property

```csharp
public virtual System.Security.Cryptography.PaddingMode Padding { get; set; }
```

Gets or sets the padding mode used in the symmetric algorithm.

Returns: The padding mode used in the symmetric algorithm. The default is `PaddingMode.PKCS7`.

Exceptions:

- `CryptographicException`: The padding mode is not one of the `PaddingMode` values.

#### Remarks
Most plain text messages do not consist of a number of bytes that completely fill blocks. Often, there are not enough bytes to fill the last block. When this happens, a padding string is added to the text. For example, if the block length is 64 bits and the last block contains only 40 bits, 24 bits of padding are added. See the `PaddingMode` enumeration for a description of specific modes.

## SymmetricAlgorithm.Clear() method

```csharp
public void Clear ();
```

Releases all resources used by the `SymmetricAlgorithm` class.

#### Remarks
Note that when using derived classes, it is not enough, from a security perspective, to simply force a garbage collection after you have finished using the object. You must explicitly call the `SymmetricAlgorithm.Clear` method on the object to zero out any sensitive data within the object before it is released. Note that garbage collection does not zero out the contents of collected objects but simply marks the memory as available for reallocation. Thus the data contained within a garbage collected object may still be present in the memory heap in unallocated memory. In the case of cryptographic objects, this data could contain sensitive information such as key data or a block of plain text.

All cryptographic classes in .NET that hold sensitive data implement a `Clear` method. When called, the `Clear` method overwrites all sensitive data within the object with zeros and then releases the object so that it can be safely garbage collected. When the object has been zeroed and released, you should then call the `Dispose` method with the `disposing` parameter set to `True` to dispose of all managed and unmanaged resources associated with the object.

## SymmetricAlgorithm.Create() method

```csharp
public static System.Security.Cryptography.SymmetricAlgorithm Create ();
```

Creates a default cryptographic object used to perform the symmetric algorithm.

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## SymmetricAlgorithm.Create(String) method

```csharp
public static System.Security.Cryptography.SymmetricAlgorithm? Create (string algName);
```

Creates the specified cryptographic object used to perform the symmetric algorithm.

Parameters:

- `algName`: The name of the specific implementation of the `SymmetricAlgorithm` class to use.

Returns: A cryptographic object used to perform the symmetric algorithm.

To be added.

## SymmetricAlgorithm.CreateDecryptor() method

```csharp
public virtual System.Security.Cryptography.ICryptoTransform CreateDecryptor ();
```

Creates a symmetric decryptor object with the current `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric decryptor object.

#### Remarks
This method decrypts an encrypted message created using the `SymmetricAlgorithm.CreateEncryptor` overload with the same signature.

## SymmetricAlgorithm.CreateDecryptor(Byte[], Byte[]) method

```csharp
public abstract System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

When overridden in a derived class, creates a symmetric decryptor object with the specified `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric decryptor object.

#### Remarks
This method decrypts an encrypted message created using the `SymmetricAlgorithm.CreateEncryptor` overload with the same parameters.

## SymmetricAlgorithm.CreateEncryptor() method

```csharp
public virtual System.Security.Cryptography.ICryptoTransform CreateEncryptor ();
```

Creates a symmetric encryptor object with the current `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric encryptor object.

#### Remarks
If the current `Key` property is `null`, the `SymmetricAlgorithm.GenerateKey` method is called to create a new random `SymmetricAlgorithm.Key`. If the current `IV` property is `null`, the `SymmetricAlgorithm.GenerateIV` method is called to create a new random `SymmetricAlgorithm.IV`.

Use the `SymmetricAlgorithm.CreateDecryptor` overload with the same signature to decrypt the result of this method.

#### Examples
The following example encrypts a string using the transform object returned from the `SymmetricAlgorithm.CreateEncryptor` method.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/SymmetricAlgorithm/CreateEncryptor/encryptor.cs._
