---
title: "X509Certificate2Collection class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2Collection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2Collection class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public class X509Certificate2Collection : System.Security.Cryptography.X509Certificates.X509CertificateCollection, System.Collections.Generic.IEnumerable<System.Security.Cryptography.X509Certificates.X509Certificate2>
```

Represents a collection of `X509Certificate2` objects. This class cannot be inherited.

#### Remarks
When an `X509Certificate2` store is opened, the result is represented by an `X509Certificate2Collection` object. If you are familiar with the unmanaged Cryptographic API constructs, you can think of an `X509Certificate2Collection` as a memory store of `X509Certificate2` objects.

#### Examples
The following code example opens the current user's personal certificate store, selects only valid certificates, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate the user selects.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2Collection.X509Certificate2Collection() constructor

```csharp
public X509Certificate2Collection ();
```

Initializes a new instance of the `X509Certificate2Collection` class without any `X509Certificate2` information.

#### Remarks
This constructor creates an empty `X509Certificate2Collection` object, which is unlike the other constructors that use certificate or collection information to create the object.

#### Examples
The following code example opens the current user's personal certificate store, selects only valid certificates, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate the user selects.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2Collection.X509Certificate2Collection(X509Certificate2) constructor

```csharp
public X509Certificate2Collection (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Initializes a new instance of the `X509Certificate2Collection` class using an `X509Certificate2` object.

Parameters:

- `certificate`: An `X509Certificate2` object to start the collection from.

To be added.

## X509Certificate2Collection.X509Certificate2Collection(X509Certificate2[]) constructor

```csharp
public X509Certificate2Collection (System.Security.Cryptography.X509Certificates.X509Certificate2[] certificates);
```

Initializes a new instance of the `X509Certificate2Collection` class using an array of `X509Certificate2` objects.

Parameters:

- `certificates`: An array of `X509Certificate2` objects.

#### Examples
The following code example opens the current user's personal certificate store, selects only valid certificates, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2Collection.X509Certificate2Collection(X509Certificate2Collection) constructor

```csharp
public X509Certificate2Collection (System.Security.Cryptography.X509Certificates.X509Certificate2Collection certificates);
```

Initializes a new instance of the `X509Certificate2Collection` class using the specified certificate collection.

Parameters:

- `certificates`: An `X509Certificate2Collection` object.

#### Examples
The following code example opens the current user's personal certificate store, selects only valid certificates, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate the user selects.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2Collection.Item property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than the `CollectionBase.Count` property.
- `ArgumentNullException`: `index` is `null`.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

#### Examples
The following code example opens the current user's personal certificate store, selects only valid certificates, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate the user selects.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2Collection.Add(X509Certificate2) method

```csharp
public int Add (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Adds an object to the end of the `X509Certificate2Collection`.

Parameters:

- `certificate`: An X.509 certificate represented as an `X509Certificate2` object.

Returns: The `X509Certificate2Collection` index at which the `certificate` has been added.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.

#### Remarks
This method adds an `X509Certificate2` object to a collection and returns the index location of the certificate.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Certificate2Collection.AddRange(X509Certificate2[]) method

```csharp
public void AddRange (System.Security.Cryptography.X509Certificates.X509Certificate2[] certificates);
```

Adds multiple `X509Certificate2` objects in an array to the `X509Certificate2Collection` object.

Parameters:

- `certificates`: An array of `X509Certificate2` objects.

Exceptions:

- `ArgumentNullException`: `certificates` is `null`.

#### Remarks
Use this method if you have an array of `X509Certificate2` objects to add to an `X509Certificate2Collection` object. The `X509Certificate2Collection.AddRange` and `X509Certificate2Collection.RemoveRange` methods process requests transactionally, so that if a single add or remove fails, the entire operation is aborted.

## X509Certificate2Collection.AddRange(X509Certificate2Collection) method

```csharp
public void AddRange (System.Security.Cryptography.X509Certificates.X509Certificate2Collection certificates);
```

Adds multiple `X509Certificate2` objects in an `X509Certificate2Collection` object to another `X509Certificate2Collection` object.

Parameters:

- `certificates`: An `X509Certificate2Collection` object.

Exceptions:

- `ArgumentNullException`: `certificates` is `null`.

#### Remarks
Use this method if you have certificates in an `X509Certificate2Collection` object that you want to add to another `X509Certificate2Collection` object. The `X509Certificate2Collection.AddRange` and `X509Certificate2Collection.RemoveRange` methods process requests transactionally, so that if a single add or remove fails, the entire operation is aborted.

## X509Certificate2Collection.Contains(X509Certificate2) method

```csharp
public bool Contains (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Determines whether the `X509Certificate2Collection` object contains a specific certificate.

Parameters:

- `certificate`: The `X509Certificate2` object to locate in the collection.

Returns: `true` if the `X509Certificate2Collection` contains the specified `certificate`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.

#### Remarks
This method performs a linear search; therefore, the average execution time is proportional to the `Count` property. That is, this method is an O(`n`) operation, where `n` is `CollectionBase.Count`.

This method determines equality by calling the `Object.Equals` method.

## X509Certificate2Collection.Export(X509ContentType) method

```csharp
public byte[]? Export (System.Security.Cryptography.X509Certificates.X509ContentType contentType);
```

Exports X.509 certificate information into a byte array.

Parameters:

- `contentType`: A supported `X509ContentType` object.

Returns: X.509 certificate information in a byte array.

#### Remarks
This method supports content types that do not require a password.

## X509Certificate2Collection.Export(X509ContentType, String) method

```csharp
public byte[]? Export (System.Security.Cryptography.X509Certificates.X509ContentType contentType, string? password);
```

Exports X.509 certificate information into a byte array using a password.

Parameters:

- `contentType`: A supported `X509ContentType` object.
- `password`: A string used to protect the byte array.

Returns: X.509 certificate information in a byte array.

Exceptions:

- `CryptographicException`: The certificate is unreadable, the content is invalid or, in the case of a certificate requiring a password, the private key could not be exported because the password <example-value> was incorrect.

#### Remarks
This method supports the following `X509ContentType` types:

-   `Cert`

-   `SerializedCert`

-   `Pfx`

-   `SerializedStore`

-   `Pkcs7`

## X509Certificate2Collection.ExportCertificatePems() method

```csharp
public string ExportCertificatePems ();
```

Exports the public X.509 certificates, encoded as PEM.

Returns: The PEM encoding of the certificates.

Exceptions:

- `CryptographicException`: A certificate is corrupt, in an invalid state, or could not be exported
to PEM.
- `OverflowException`: The combined size of encoding all certificates exceeds <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

A PEM-encoded X.509 certificate collection will contain certificates
where each certificate begins with `-----BEGIN CERTIFICATE-----`
and ends with `-----END CERTIFICATE-----`, with the base64 encoded DER
contents of the certificate between the PEM boundaries. Each certificate is
separated by a single line-feed character.

Certificates are encoded according to the IETF RFC 7468 "strict" encoding rules.

## X509Certificate2Collection.ExportPkcs12(PbeParameters, String) method

```csharp
public byte[] ExportPkcs12 (System.Security.Cryptography.PbeParameters exportParameters, string? password);
```

Exports the certificates and private keys in PKCS#12 / PFX format.

Parameters:

- `exportParameters`: The algorithm parameters to use for the export.
- `password`: The password to use for the export.

Returns: A byte array containing the encoded PKCS#12.

Exceptions:

- `ArgumentException`: `password` contains a Unicode 'NULL' character.
- `ArgumentNullException`: `exportParameters` is `null` .
- `CryptographicException`: The export operation failed.

-or-

`exportParameters` specifies a `PbeParameters.HashAlgorithm` value that is not supported for the `PbeParameters.EncryptionAlgorithm` value.

-or-

`exportParameters` contains an invalid encryption algorithm for `PbeParameters.EncryptionAlgorithm`.

To be added.

## X509Certificate2Collection.ExportPkcs12(Pkcs12ExportPbeParameters, String) method

```csharp
public byte[] ExportPkcs12 (System.Security.Cryptography.X509Certificates.Pkcs12ExportPbeParameters exportParameters, string? password);
```

Exports the certificate and private key in PKCS#12 / PFX format.

Parameters:

- `exportParameters`: The algorithm parameters to use for the export.
- `password`: The password to use for the export.

Returns: A byte array containing the encoded PKCS#12.

Exceptions:

- `ArgumentException`: `password` contains a Unicode 'NULL' character.
- `ArgumentOutOfRangeException`: `exportParameters` is not a valid value.
- `CryptographicException`: The export operation failed.

To be added.

## X509Certificate2Collection.ExportPkcs7Pem() method

```csharp
public string ExportPkcs7Pem ();
```

Exports the X.509 public certificates as a PKCS7 certificate collection, encoded as PEM.

Returns: The PEM encoded PKCS7 collection.

Exceptions:

- `CryptographicException`: A certificate is corrupt, in an invalid state, or could not be exported
to PEM.

To be added.

## X509Certificate2Collection.Find(X509FindType, Object, Boolean) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection Find (System.Security.Cryptography.X509Certificates.X509FindType findType, object findValue, bool validOnly);
```

Searches an `X509Certificate2Collection` object using the search criteria specified by the `X509FindType` enumeration and the `findValue` object.

Parameters:

- `findType`: One of the `X509FindType` values.
- `findValue`: The search criteria as an object.
- `validOnly`: `true` to allow only valid certificates to be returned from the search; otherwise, `false`.

Returns: An `X509Certificate2Collection` object.

Exceptions:

- `CryptographicException`: `findType` is invalid.

#### Remarks
Use this method to find `X509Certificate2` objects if no user interaction is needed. Use the `X509Certificate2Collection.Find` method to allow the user to select `X509Certificate2` objects.

Note that this method can be used in a cascading or nested style, narrowing the search criteria with each call to the method.

#### Examples
The following code example opens the current user's personal certificate store, finds only valid certificates, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate the user selects.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._
