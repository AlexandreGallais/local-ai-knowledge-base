---
title: "X509Certificate class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate class (part 4 of 4)

## X509Certificate.Import(Byte[], SecureString, X509KeyStorageFlags) method

```csharp
public virtual void Import (byte[] rawData, System.Security.SecureString? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Populates an `X509Certificate` object using data from a byte array, a password, and a key <example-value> flag.

Parameters:

- `rawData`: A byte array that contains data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate.Import(Byte[], String, X509KeyStorageFlags) method

```csharp
public virtual void Import (byte[] rawData, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Populates the `X509Certificate` object using data from a byte array, a password, and flags for determining how the private key is imported.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate.Import(String, SecureString, X509KeyStorageFlags) method

```csharp
public virtual void Import (string fileName, System.Security.SecureString? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Populates an `X509Certificate` object with information from a certificate file, a password, and a key <example-value> flag.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate.Import(String, String, X509KeyStorageFlags) method

```csharp
public virtual void Import (string fileName, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Populates the `X509Certificate` object with information from a certificate file, a password, and a `X509KeyStorageFlags` value.

Parameters:

- `fileName`: The name of a certificate file represented as a string.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate.Reset() method

```csharp
public virtual void Reset ();
```

Resets the state of the `X509Certificate2` object.

#### Remarks
Use the `X509Certificate.Reset` method to reset the state of the certificate. This method also frees any resources associated with the certificate.

## X509Certificate.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Implements the `ISerializable` interface and is called back by the deserialization event when deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Gets serialization information with all the data needed to recreate an instance of the current `X509Certificate` object.

Parameters:

- `info`: The object to populate with serialization information.
- `context`: The destination context of the serialization.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the current `X509Certificate` object.

Returns: A string representation of the current `X509Certificate` object.

#### Examples
The following example uses the `X509Certificate.ToString` method to display the value of a certificate to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/CreateFromCertFile/example.cs._

## X509Certificate.ToString(Boolean) method

```csharp
public virtual string ToString (bool fVerbose);
```

Returns a string representation of the current `X509Certificate` object, with extra information, if specified.

Parameters:

- `fVerbose`: `true` to produce the verbose form of the string representation; otherwise, `false`.

Returns: A string representation of the current `X509Certificate` object.

#### Examples
The following example uses the `X509Certificate.ToString` method to display the value of a certificate to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/CreateFromCertFile/example.cs._

## X509Certificate.TryGetCertHash(HashAlgorithmName, Byte>, Int32) method

```csharp
public virtual bool TryGetCertHash (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, Span<byte> destination, out int bytesWritten);
```

Attempts to produce a "thumbprint" for the certificate by hashing the encoded representation of the certificate with the specified hash algorithm.

Parameters:

- `hashAlgorithm`: The algorithm to use for the thumbprint.
- `destination`: The buffer to receive the certificate thumbprint.
- `bytesWritten`: When this method returns, the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the hash value; otherwise, `false`.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or an empty string.
- `CryptographicException`: `hashAlgorithm` is not a known hash algorithm.

To be added.
