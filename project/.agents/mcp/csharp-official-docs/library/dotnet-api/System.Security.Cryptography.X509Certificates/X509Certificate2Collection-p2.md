---
title: "X509Certificate2Collection class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2Collection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2Collection class (part 2 of 3)

## X509Certificate2Collection.FindByThumbprint(HashAlgorithmName, Byte>) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection FindByThumbprint (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> thumbprintBytes);
```

Searches the collection for certificates with a matching thumbprint.

Parameters:

- `hashAlgorithm`: The name of the hash algorithm to compute the thumbprint.
- `thumbprintBytes`: The thumbprint to match.

Returns: A collection of certificates with a matching thumbprint.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or empty.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

-or-

An error occured while finding the certificates with a matching thumbprint.

To be added.

## X509Certificate2Collection.FindByThumbprint(HashAlgorithmName, Char>) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection FindByThumbprint (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<char> thumbprintHex);
```

Searches the collection for certificates with a matching thumbprint.

Parameters:

- `hashAlgorithm`: The name of the hash algorithm to compute the thumbprint.
- `thumbprintHex`: The thumbprint to match, hex-encoded.

Returns: A collection of certificates with a matching thumbprint.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or empty.

-or-

`thumbprintHex` contains invalid hexadecimal characters.

-or-

`thumbprintHex` does not decode evenly and contains an odd number of characters.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

-or-

An error occured while finding the certificates with a matching thumbprint.

To be added.

## X509Certificate2Collection.FindByThumbprint(HashAlgorithmName, String) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection FindByThumbprint (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, string thumbprintHex);
```

Searches the collection for certificates with a matching thumbprint.

Parameters:

- `hashAlgorithm`: The name of the hash algorithm to compute the thumbprint.
- `thumbprintHex`: The thumbprint to match, hex-encoded.

Returns: A collection of certificates with a matching thumbprint.

Exceptions:

- `ArgumentNullException`: `thumbprintHex` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or empty.

-or-

`thumbprintHex` contains invalid hexadecimal characters.

-or-

`thumbprintHex` does not decode evenly and contains an odd number of characters.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

-or-

An error occured while finding the certificates with a matching thumbprint.

To be added.

## X509Certificate2Collection.GetEnumerator() method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Enumerator GetEnumerator ();
```

Returns an enumerator that can iterate through a `X509Certificate2Collection` object.

Returns: An `X509Certificate2Enumerator` object that can iterate through the `X509Certificate2Collection` object.

#### Remarks
Enumerators allow read-only access to data in the collection. Enumerators cannot be used to modify the underlying collection.

## X509Certificate2Collection.Import(Byte[]) method

```csharp
public void Import (byte[] rawData);
```

Imports a certificate in the form of a byte array into a `X509Certificate2Collection` object.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.

#### Remarks
This method imports a certificate in the form of a byte array into a `X509Certificate2Collection` object. This method supports the following `X509ContentType` types:

-   `Cert`

-   `SerializedCert`

-   `Pfx`

-   `SerializedStore`

-   `Pkcs7`

-   `Authenticode`

## X509Certificate2Collection.Import(Byte>) method

```csharp
public void Import (ReadOnlySpan<byte> rawData);
```

Imports the certificates from the provided data into this collection.

Parameters:

- `rawData`: The certificate data to read.

To be added.

## X509Certificate2Collection.Import(String) method

```csharp
public void Import (string fileName);
```

Imports a certificate file into a `X509Certificate2Collection` object.

Parameters:

- `fileName`: The name of the file containing the certificate information.

#### Remarks
This method supports the following `X509ContentType` types:

-   `Cert`

-   `SerializedCert`

-   `Pfx`

-   `SerializedStore`

-   `Pkcs7`

-   `Authenticode`

## X509Certificate2Collection.Import(Byte[], String, X509KeyStorageFlags) method

```csharp
public void Import (byte[] rawData, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet);
```

Imports a certificate, in the form of a byte array that requires a password to access the certificate, into a `X509Certificate2Collection` object.

Parameters:

- `rawData`: A byte array containing data from an `X509Certificate2` object.
- `password`: The password <example-value> to access the certificate information.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control how and where the certificate is imported.

#### Remarks
This method can be used with a PFX/PKCS12 binary large object (BLOB) protected by a password. Key <example-value> associated with certificates in the PFX/PKCS12 BLOB can be created and the `X509KeyStorageFlags` value can be used to control this process. Note that if you do not create a key <example-value>, the private key is not persisted.

This method imports a certificate byte array into a collection of certificates. This method supports the following `X509ContentType` types:

-   `Cert`

-   `SerializedCert`

-   `Pfx`

-   `SerializedStore`

-   `Pkcs7`

## X509Certificate2Collection.Import(Byte>, Char>, X509KeyStorageFlags) method

```csharp
public void Import (ReadOnlySpan<byte> rawData, ReadOnlySpan<char> password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet);
```

Imports the certificates from the provided data into this collection.

Parameters:

- `rawData`: The certificate data to read.
- `password`: The password <example-value> to access the certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

To be added.

## X509Certificate2Collection.Import(Byte>, String, X509KeyStorageFlags) method

```csharp
public void Import (ReadOnlySpan<byte> rawData, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet);
```

Imports the certificates from the provided data into this collection.

Parameters:

- `rawData`: The certificate data to read.
- `password`: The password <example-value> to access the certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

To be added.

## X509Certificate2Collection.Import(String, Char>, X509KeyStorageFlags) method

```csharp
public void Import (string fileName, ReadOnlySpan<char> password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet);
```

Imports the certificates from the specified file a into this collection.

Parameters:

- `fileName`: The name of the file containing the certificate information.
- `password`: The password <example-value> to access the certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

To be added.

## X509Certificate2Collection.Import(String, String, X509KeyStorageFlags) method

```csharp
public void Import (string fileName, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet);
```

Imports a certificate file that requires a password into a `X509Certificate2Collection` object.

Parameters:

- `fileName`: The name of the file containing the certificate information.
- `password`: The password <example-value> to access the certificate information.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control how and where the certificate is imported.

#### Remarks
This method can be used with a PFX/PKCS12 file or other certificate files that require a password. Key <example-value> associated with certificates in the PFX/PKCS12 file can be created and `X509KeyStorageFlags` value can be used to control this process. Note that if you do not create a key <example-value>, the private key is not persisted.

Note that a PFX/PKCS12 file can contain more than one certificate. This method imports the first certificate associated with the private key or, if no private key is found, the first certificate found.

This method supports the following `X509ContentType` types:

-   `Cert`

-   `SerializedCert`

-   `Pfx`

-   `SerializedStore`

-   `Pkcs7`

-   `Authenticode`

## X509Certificate2Collection.ImportFromPem(Char>) method

```csharp
public void ImportFromPem (ReadOnlySpan<char> certPem);
```

Imports a collection of RFC 7468 PEM-encoded certificates.

Parameters:

- `certPem`: The text of the PEM-encoded X509 certificate collection.

Exceptions:

- `CryptographicException`: The decoded contents of a PEM are invalid or corrupt and could not be imported.

#### Remarks

PEM-encoded items with a CERTIFICATE PEM label will be imported. PEM items with other labels will be ignored.

More advanced scenarios for loading certificates and can leverage `PemEncoding` to enumerate PEM-encoded values and apply any custom loading behavior.

## X509Certificate2Collection.ImportFromPemFile(String) method

```csharp
public void ImportFromPemFile (string certPemFilePath);
```

Imports a collection of RFC 7468 PEM-encoded certificates.

Parameters:

- `certPemFilePath`: The path for the PEM-encoded X509 certificate collection.

Exceptions:

- `CryptographicException`: The decoded contents of a PEM are invalid or corrupt and could not be imported.
- `ArgumentNullException`: `certPemFilePath` is `null`.

#### Remarks

See `ReadAllText` for additional documentation about exceptions that can be thrown.

PEM-encoded items with a CERTIFICATE PEM label will be imported. PEM items with other labels will be ignored.

More advanced scenarios for loading certificates and can leverage `PemEncoding` to enumerate PEM-encoded values and apply any custom loading behavior.

## X509Certificate2Collection.Insert(Int32, X509Certificate2) method

```csharp
public void Insert (int index, System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Inserts an object into the `X509Certificate2Collection` object at the specified index.

Parameters:

- `index`: The zero-based index at which to insert `certificate`.
- `certificate`: The `X509Certificate2` object to insert.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than the `CollectionBase.Count` property.
- `NotSupportedException`: The collection is read-only.

-or-

The collection has a fixed size.
- `ArgumentNullException`: `certificate` is `null`.

#### Remarks
If the `Count` property already equals the capacity of the list, the capacity is doubled by automatically reallocating the internal array before the new element is inserted.

If `index` is equal to `CollectionBase.Count`, `certificate` is added to the end of the collection.

## X509Certificate2Collection.Remove(X509Certificate2) method

```csharp
public void Remove (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Removes the first occurrence of a certificate from the `X509Certificate2Collection` object.

Parameters:

- `certificate`: The `X509Certificate2` object to be removed from the `X509Certificate2Collection` object.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.

#### Remarks
This method removes the first occurrence of a certificate.

## X509Certificate2Collection.RemoveRange(X509Certificate2[]) method

```csharp
public void RemoveRange (System.Security.Cryptography.X509Certificates.X509Certificate2[] certificates);
```

Removes multiple `X509Certificate2` objects in an array from an `X509Certificate2Collection` object.

Parameters:

- `certificates`: An array of `X509Certificate2` objects.

Exceptions:

- `ArgumentNullException`: `certificates` is `null`.

#### Remarks
Use this method if you have an array of `X509Certificate2` objects to remove from an `X509Certificate2Collection` object. The `X509Certificate2Collection.AddRange` and `X509Certificate2Collection.RemoveRange` methods process requests transactionally, so that if a single add or remove fails, the entire operation is aborted.

## X509Certificate2Collection.RemoveRange(X509Certificate2Collection) method

```csharp
public void RemoveRange (System.Security.Cryptography.X509Certificates.X509Certificate2Collection certificates);
```

Removes multiple `X509Certificate2` objects in an `X509Certificate2Collection` object from another `X509Certificate2Collection` object.

Parameters:

- `certificates`: An `X509Certificate2Collection` object.

Exceptions:

- `ArgumentNullException`: `certificates` is `null`.

#### Remarks
Use this method if you have certificates in an `X509Certificate2Collection` object that you want to remove from another `X509Certificate2Collection` object. The `X509Certificate2Collection.AddRange` and `X509Certificate2Collection.RemoveRange` methods process requests transactionally, so that if a single add or remove fails, the entire operation is aborted.

## X509Certificate2Collection.System.Collections.Generic.IEnumerable<System.Security.Cryptography.X509Certificates.X509Certificate2>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Security.Cryptography.X509Certificates.X509Certificate2> IEnumerable<X509Certificate2>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.
