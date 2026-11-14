---
title: "X509Certificate class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate class (part 2 of 4)

## X509Certificate.X509Certificate(Byte[], String, X509KeyStorageFlags) constructor

```csharp
public X509Certificate (byte[] rawData, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Initializes a new instance of the `X509Certificate` class using a byte array, a password, and a key <example-value> flag.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `rawData` parameter is `null`.

-or-

The length of the `rawData` parameter is 0.

#### Remarks
This constructor creates a new `X509Certificate` object using a byte array, a password that is needed to access the certificate data, and a key <example-value> flag.  Calling this constructor with the correct password <example-value> the private key and saves it to a Microsoft Cryptographic API Cryptographic Service Provider (CSP).

The `X509KeyStorageFlags` value can be used to control where and how the private key is imported.

ASN.1 DER is the only certificate format supported by this class.

> **Important:**
> Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate.X509Certificate(String, SecureString, X509KeyStorageFlags) constructor

```csharp
public X509Certificate (string fileName, System.Security.SecureString? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Initializes a new instance of the `X509Certificate` class using a certificate file name, a password, and a key <example-value> flag.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `fileName` parameter is `null`.

#### Remarks
If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate.X509Certificate(String, String, X509KeyStorageFlags) constructor

```csharp
public X509Certificate (string fileName, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Initializes a new instance of the `X509Certificate` class using the name of a PKCS7 signed file, a password to access the certificate, and a key <example-value> flag.

Parameters:

- `fileName`: The name of a PKCS7 signed file.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `fileName` parameter is `null`.

#### Remarks
If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate.Handle property

```csharp
public IntPtr Handle { get; }
```

Gets a handle to a Microsoft Cryptographic API certificate context described by an unmanaged `PCCERT_CONTEXT` structure.

Returns: An `IntPtr` structure that represents an unmanaged `PCCERT_CONTEXT` structure.

#### Remarks
The handle is valid only for the lifetime of the `X509Certificate` object.

## X509Certificate.Issuer property

```csharp
public string Issuer { get; }
```

Gets the name of the certificate authority that issued the X.509v3 certificate.

Returns: The name of the certificate authority that issued the X.509v3 certificate.

Exceptions:

- `CryptographicException`: The certificate handle is invalid.

To be added.

## X509Certificate.SerialNumberBytes property

```csharp
public ReadOnlyMemory<byte> SerialNumberBytes { get; }
```

Gets the big-endian representation of the certificate's serial number.

Returns: The big-endian representation of the certificate's serial number.

To be added.

## X509Certificate.Subject property

```csharp
public string Subject { get; }
```

Gets the subject distinguished name from the certificate.

Returns: The subject distinguished name from the certificate.

Exceptions:

- `CryptographicException`: The certificate handle is invalid.

To be added.

## X509Certificate.CreateFromCertFile(String) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate CreateFromCertFile (string filename);
```

Creates an X.509v3 certificate from the specified PKCS7 signed file.

Parameters:

- `filename`: The path of the PKCS7 signed file from which to create the X.509 certificate.

Returns: The newly created X.509 certificate.

Exceptions:

- `ArgumentException`: The `filename` parameter is `null`.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.

> **Note:**
> The certificate file is not restricted to .cer files. Any PKCS7 signed file can be used, including an Authenticode signed .pfx file.

#### Examples
The following example creates an `X509Certificate` from a specified certification file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/CreateFromCertFile/example.cs._

## X509Certificate.CreateFromSignedFile(String) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate CreateFromSignedFile (string filename);
```

Creates an X.509v3 certificate from the specified signed file.

Parameters:

- `filename`: The path of the signed file from which to create the X.509 certificate.

Returns: The newly created X.509 certificate.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.

## X509Certificate.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current `X509Certificate` object.

To be added.

## X509Certificate.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases all of the unmanaged resources used by this `X509Certificate` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## X509Certificate.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares two `X509Certificate` objects for equality.

Parameters:

- `obj`: An `X509Certificate` object to compare to the current object.

Returns: `true` if the current `X509Certificate` object is equal to the object specified by the `obj` parameter; otherwise, `false`.

#### Remarks
Two objects are considered equal if they are `X509Certificate` objects and they have the same issuer and serial number.

> **Important:**
> The `Equals` method should not be used when comparing certificates for security purposes. Instead, use a hash of the `RawData` property, or the `Thumbprint` property.

#### Examples
The following example compares two certificates for equality.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/Equals/example.cs._

## X509Certificate.Equals(X509Certificate) method

```csharp
public virtual bool Equals (System.Security.Cryptography.X509Certificates.X509Certificate? other);
```

Compares two `X509Certificate` objects for equality.

Parameters:

- `other`: An `X509Certificate` object to compare to the current object.

Returns: `true` if the current `X509Certificate` object is equal to the object specified by the `other` parameter; otherwise, `false`.

#### Remarks
Two `X509Certificate` objects are considered equal if they have the same issuer and serial number.

> **Important:**
> The `Equals` method should not be used when comparing certificates for security purposes. Instead, use a hash of the `RawData` property, or the `Thumbprint` property.

#### Examples
The following example compares two certificates for equality.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/Equals/example.cs._

## X509Certificate.Export(X509ContentType) method

```csharp
public virtual byte[] Export (System.Security.Cryptography.X509Certificates.X509ContentType contentType);
```

Exports the current `X509Certificate` object to a byte array in a format described by one of the `X509ContentType` values.

Parameters:

- `contentType`: One of the `X509ContentType` values that describes how to format the output data.

Returns: An array of bytes that represents the current `X509Certificate` object.

Exceptions:

- `CryptographicException`: A value other than `X509ContentType.Cert`, `X509ContentType.SerializedCert`, or `X509ContentType.Pkcs12` was passed to the `contentType` parameter.

-or-

The certificate could not be exported.

#### Remarks
The `contentType` parameter accepts only the following values of the `X509ContentType` enumeration: `Cert`, `SerializedCert`, and `Pkcs12`.  Passing any other value causes a `CryptographicException` to be thrown.

#### Examples
The following example loads an X.509 certificate file into an `X509Certificate` object, exports the certificate as a byte array, and then imports the byte array into another `X509Certificate` object.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/.ctor/sample.cs._

## X509Certificate.Export(X509ContentType, SecureString) method

```csharp
public virtual byte[] Export (System.Security.Cryptography.X509Certificates.X509ContentType contentType, System.Security.SecureString? password);
```

Exports the current `X509Certificate` object to a byte array using the specified format and a password.

Parameters:

- `contentType`: One of the `X509ContentType` values that describes how to format the output data.
- `password`: The password <example-value> to access the X.509 certificate data.

Returns: A byte array that represents the current `X509Certificate` object.

Exceptions:

- `CryptographicException`: A value other than `X509ContentType.Cert`, `X509ContentType.SerializedCert`, or `X509ContentType.Pkcs12` was passed to the `contentType` parameter.

-or-

The certificate could not be exported.

#### Remarks
The `contentType` parameter accepts only the following values of the `X509ContentType` enumeration: `Cert`, `SerializedCert`, and `Pkcs12`.  Passing any other value causes a `CryptographicException` to be thrown.

> **Important:**
> Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening the assembly in a text editor such as Notepad.exe.

## X509Certificate.Export(X509ContentType, String) method

```csharp
public virtual byte[] Export (System.Security.Cryptography.X509Certificates.X509ContentType contentType, string? password);
```

Exports the current `X509Certificate` object to a byte array in a format described by one of the `X509ContentType` values, and using the specified password.

Parameters:

- `contentType`: One of the `X509ContentType` values that describes how to format the output data.
- `password`: The password <example-value> to access the X.509 certificate data.

Returns: An array of bytes that represents the current `X509Certificate` object.

Exceptions:

- `CryptographicException`: A value other than `X509ContentType.Cert`, `X509ContentType.SerializedCert`, or `X509ContentType.Pkcs12` was passed to the `contentType` parameter.

-or-

The certificate could not be exported.

#### Remarks
The `contentType` parameter accepts only the following values of the `X509ContentType` enumeration: `Cert`, `SerializedCert`, and `Pkcs12`.  Passing any other value causes a `CryptographicException` to be thrown.

> **Important:**
> Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening the assembly in a text editor such as Notepad.exe.

## X509Certificate.ExportPkcs12(PbeParameters, String) method

```csharp
public byte[] ExportPkcs12 (System.Security.Cryptography.PbeParameters exportParameters, string? password);
```

Exports the certificate and private key in PKCS#12 / PFX format.

Parameters:

- `exportParameters`: The algorithm parameters to use for the export.
- `password`: The password to use for the export.

Returns: A byte array containing the encoded PKCS#12.

Exceptions:

- `ArgumentException`: `password` contains a Unicode 'NULL' character.
- `ArgumentNullException`: `exportParameters` is `null` .
- `CryptographicException`: The current instance is disposed.

-or-

The export operation failed.

-or-

`exportParameters` specifies a `PbeParameters.HashAlgorithm` value that is not supported for the `PbeParameters.EncryptionAlgorithm` value.

-or-

`exportParameters` contains an invalid encryption algorithm for `PbeParameters.EncryptionAlgorithm`.

To be added.
