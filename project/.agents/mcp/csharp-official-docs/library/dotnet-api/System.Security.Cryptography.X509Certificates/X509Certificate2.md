---
title: "X509Certificate2 class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2 class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public class X509Certificate2 : System.Security.Cryptography.X509Certificates.X509Certificate
```

Represents an X.509 certificate.

#### Remarks
The X.509 structure originated in the International Organization for Standardization (ISO) working groups. This structure can be used to represent various types of information including identity, entitlement, and holder attributes (permissions, age, sex, location, affiliation, and so forth). Although the ISO specifications are most informative on the structure itself, the `X509Certificate2` class is designed to model the usage scenarios defined in specifications issued by the Internet Engineering Task Force (IETF) Public Key <example-value>, X.509 (PKIX) working group. The most informative of these specifications is RFC 3280, "Certificate and Certificate Revocation List (CRL) Profile."

> **Important:**
> When you have finished using the type, you should dispose of it either directly or indirectly.

#### Examples
The following example demonstrates how to use an `X509Certificate2` object to encrypt and decrypt a file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/program.cs._

The following example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.X509Certificate2() constructor

```csharp
public X509Certificate2 ();
```

Initializes a new instance of the `X509Certificate2` class.

To be added.

## X509Certificate2.X509Certificate2(Byte[]) constructor

```csharp
public X509Certificate2 (byte[] rawData);
```

Initializes a new instance of the `X509Certificate2` class using information from a byte array.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor creates a new `X509Certificate2` object using certificate information from a byte array. The byte array can be binary (DER) encoded or PEM-encoded X.509 data. The byte array can also be a PKCS7 (Authenticode) signed file; the signer certificate is used to create the object.

If you create an `X509Certificate2` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate2` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(IntPtr) constructor

```csharp
public X509Certificate2 (IntPtr handle);
```

Initializes a new instance of the `X509Certificate2` class using an unmanaged handle.

Parameters:

- `handle`: A pointer to a certificate context in unmanaged code. The C structure is called `PCCERT_CONTEXT`.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor creates a new `X509Certificate2` object using a handle for the Microsoft Cryptographic API certificate context, `PCCERT_CONTEXT`.

> **Important:**
>  The constructor creates a copy of the certificate context. Do not assume that the context structure you passed to the constructor is valid; it may have been released. You can get a copy of the current `PCCERT_CONTEXT` structure from the `Handle` property, but it is valid only during the lifetime of the `X509Certificate2` object.

## X509Certificate2.X509Certificate2(Byte>) constructor

```csharp
public X509Certificate2 (ReadOnlySpan<byte> rawData);
```

Initializes a new instance of the `X509Certificate2` class from certificate data.

Parameters:

- `rawData`: The certificate data to process.

Exceptions:

- `CryptographicException`: An error with the certificate occurs.

To be added.

## X509Certificate2.X509Certificate2(X509Certificate) constructor

```csharp
public X509Certificate2 (System.Security.Cryptography.X509Certificates.X509Certificate certificate);
```

Initializes a new instance of the `X509Certificate2` class using an `X509Certificate` object.

Parameters:

- `certificate`: An `X509Certificate` object.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This method creates a new instance of the `X509Certificate2` class using an `X509Certificate` object.

## X509Certificate2.X509Certificate2(String) constructor

```csharp
public X509Certificate2 (string fileName);
```

Initializes a new instance of the `X509Certificate2` class using a certificate file name.

Parameters:

- `fileName`: The name of a certificate file.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor creates a new `X509Certificate2` object using a certificate file name. It supports binary (DER) encoding or PEM encoding.

If you create an `X509Certificate2` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate2` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(Byte[], SecureString) constructor

```csharp
public X509Certificate2 (byte[] rawData, System.Security.SecureString? password);
```

Initializes a new instance of the `X509Certificate2` class using a byte array and a password.

Parameters:

- `rawData`: A byte array that contains data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor is used with PKCS12 (PFX) files that contain the certificate's private key. Calling this constructor with the correct password <example-value> the private key and saves it to a key container.

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(Byte[], String) constructor

```csharp
public X509Certificate2 (byte[] rawData, string? password);
```

Initializes a new instance of the `X509Certificate2` class using a byte array and a password.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor creates a new `X509Certificate2` object using a byte array and a password that is needed to access the certificate data. It is used with PKCS12 (PFX) files that contain the certificate's private key. Calling this constructor with the correct password <example-value> the private key and saves it to a key container.

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate2` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate2` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(SerializationInfo, StreamingContext) constructor

```csharp
protected X509Certificate2 (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `X509Certificate2` class using the specified serialization and stream context information.

Parameters:

- `info`: The serialization information required to deserialize the new `X509Certificate2`.
- `context`: Contextual information about the source of the stream to be deserialized.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate2.X509Certificate2(String, SecureString) constructor

```csharp
public X509Certificate2 (string fileName, System.Security.SecureString? password);
```

Initializes a new instance of the `X509Certificate2` class using a certificate file name and a password.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor is used with PKCS12 (PFX) files that contain the certificate's private key. Calling this constructor with the correct password <example-value> the private key and saves it to a key container.

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(String, String) constructor

```csharp
public X509Certificate2 (string fileName, string? password);
```

Initializes a new instance of the `X509Certificate2` class using a certificate file name and a password used to access the certificate.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor creates a new `X509Certificate2` object using a certificate file name and a password <example-value> to access the certificate. It is used with PKCS12 (PFX) files that contain the certificate's private key. Calling this constructor with the correct password <example-value> the private key and saves it to a key container.

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate2` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate2` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(Byte[], SecureString, X509KeyStorageFlags) constructor

```csharp
public X509Certificate2 (byte[] rawData, System.Security.SecureString? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Initializes a new instance of the `X509Certificate2` class using a byte array, a password, and a key <example-value> flag.

Parameters:

- `rawData`: A byte array that contains data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor is used with PKCS12 (PFX) files that contain the certificate's private key. Calling this constructor with the correct password <example-value> the private key and saves it to a Microsoft Cryptographic API Cryptographic Service Provider (CSP).

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.
