---
title: "X509Certificate class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public class X509Certificate : IDisposable, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Provides methods that help you use X.509 v.3 certificates.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.

For most scenarios, you should use the `X509Certificate2` class instead.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

#### Examples
The following example loads an X.509 certificate from a file, calls the `X509Certificate.ToString` method, and displays the results to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/Overview/example.cs._

## X509Certificate.X509Certificate() constructor

```csharp
public X509Certificate ();
```

Initializes a new instance of the `X509Certificate` class.

To be added.

## X509Certificate.X509Certificate(Byte[]) constructor

```csharp
public X509Certificate (byte[] data);
```

Initializes a new instance of the `X509Certificate` class defined from a sequence of bytes representing an X.509v3 certificate.

Parameters:

- `data`: A byte array containing data from an X.509 certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `data` parameter is `null`.

-or-

The length of the `data` parameter is 0.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `data`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

#### Examples
The following example loads an X.509 certificate file into an `X509Certificate` object, exports the certificate as a byte array, and then imports the byte array into another `X509Certificate` object.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/.ctor/sample.cs._

## X509Certificate.X509Certificate(IntPtr) constructor

```csharp
public X509Certificate (IntPtr handle);
```

Initializes a new instance of the `X509Certificate` class using a handle to an unmanaged `PCCERT_CONTEXT` structure.

Parameters:

- `handle`: A handle to an unmanaged `PCCERT_CONTEXT` structure.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The handle parameter does not represent a valid `PCCERT_CONTEXT` structure.

#### Remarks
This constructor creates a new `X509Certificate` object using a handle for the Microsoft Cryptographic API certificate context, `PCCERT_CONTEXT`.

> **Important:**
> This constructor creates a copy of the certificate context. Do not assume that the context structure you passed to the constructor is valid; it may have been released. You can get a copy of the current `PCCERT_CONTEXT` structure from the `Handle` property, but it is valid only during the lifetime of the `X509Certificate` object.

## X509Certificate.X509Certificate(X509Certificate) constructor

```csharp
public X509Certificate (System.Security.Cryptography.X509Certificates.X509Certificate cert);
```

Initializes a new instance of the `X509Certificate` class using another `X509Certificate` class.

Parameters:

- `cert`: A `X509Certificate` class from which to initialize this class.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentNullException`: The value of the `cert` parameter is `null`.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.

## X509Certificate.X509Certificate(String) constructor

```csharp
public X509Certificate (string fileName);
```

Initializes a new instance of the `X509Certificate` class using the name of a PKCS7 signed file.

Parameters:

- `fileName`: The name of a PKCS7 signed file.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `fileName` parameter is `null`.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

#### Examples
The following example loads an X.509 certificate from a file, calls the `X509Certificate.ToString` method, and displays the results to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/Overview/example.cs._

## X509Certificate.X509Certificate(Byte[], SecureString) constructor

```csharp
public X509Certificate (byte[] rawData, System.Security.SecureString? password);
```

Initializes a new instance of the `X509Certificate` class using a byte array and a password.

Parameters:

- `rawData`: A byte array that contains data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `rawData` parameter is `null`.

-or-

The length of the `rawData` parameter is 0.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.

> **Important:**
> Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate.X509Certificate(Byte[], String) constructor

```csharp
public X509Certificate (byte[] rawData, string? password);
```

Initializes a new instance of the `X509Certificate` class using a byte array and a password.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `rawData` parameter is `null`.

-or-

The length of the `rawData` parameter is 0.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.

> **Important:**
> Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate.X509Certificate(SerializationInfo, StreamingContext) constructor

```csharp
public X509Certificate (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `X509Certificate` class using a `SerializationInfo` object and a `StreamingContext` structure.

Parameters:

- `info`: A `SerializationInfo` object that describes serialization information.
- `context`: A `StreamingContext` structure that describes how serialization should be performed.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate.X509Certificate(String, SecureString) constructor

```csharp
public X509Certificate (string fileName, System.Security.SecureString? password);
```

Initializes a new instance of the `X509Certificate` class using a certificate file name and a password.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `fileName` parameter is `null`.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.  Calling this constructor with the correct password <example-value> the private key and saves it to a key container.

> **Important:**
> Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate.X509Certificate(String, String) constructor

```csharp
public X509Certificate (string fileName, string? password);
```

Initializes a new instance of the `X509Certificate` class using the name of a PKCS7 signed file and a password to access the certificate.

Parameters:

- `fileName`: The name of a PKCS7 signed file.
- `password`: The password <example-value> to access the X.509 certificate data.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.
- `ArgumentException`: The `fileName` parameter is `null`.

#### Remarks
ASN.1 DER is the only certificate format supported by this class.  Calling this constructor with the correct password <example-value> the private key and saves it to a key container.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate.X509Certificate(Byte[], SecureString, X509KeyStorageFlags) constructor

```csharp
public X509Certificate (byte[] rawData, System.Security.SecureString? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Initializes a new instance of the `X509Certificate` class using a byte array, a password, and a key <example-value> flag.

Parameters:

- `rawData`: A byte array that contains data from an X.509 certificate.
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
Calling this constructor with the correct password <example-value> the private key and saves it to a Microsoft Cryptographic API Cryptographic Service Provider (CSP).

ASN.1 DER is the only certificate format supported by this class.

> **Important:**
> Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.
