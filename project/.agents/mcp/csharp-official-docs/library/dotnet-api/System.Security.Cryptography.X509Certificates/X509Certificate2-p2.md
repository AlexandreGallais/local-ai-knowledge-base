---
title: "X509Certificate2 class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2 class (part 2 of 5)

## X509Certificate2.X509Certificate2(Byte[], String, X509KeyStorageFlags) constructor

```csharp
public X509Certificate2 (byte[] rawData, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Initializes a new instance of the `X509Certificate2` class using a byte array, a password, and a key <example-value> flag.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor creates a new `X509Certificate2` object using a byte array, a password that is needed to access the certificate data, and a key <example-value> flag. It is used with PKCS12 (PFX) files that contain the certificate's private key. Calling this constructor with the correct password <example-value> the private key and saves it to a Microsoft Cryptographic API Cryptographic Service Provider (CSP).

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate2` certificate by specifying a PKCS7 signed file store for `rawData`, the `X509Certificate2` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(Byte>, Char>, X509KeyStorageFlags) constructor

```csharp
public X509Certificate2 (ReadOnlySpan<byte> rawData, ReadOnlySpan<char> password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet);
```

Initializes a new instance of the `X509Certificate2` class from certificate data, a password, and key <example-value> flags.

Parameters:

- `rawData`: The certificate data to process.
- `password`: The password <example-value> to access the certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs.

To be added.

## X509Certificate2.X509Certificate2(String, Char>, X509KeyStorageFlags) constructor

```csharp
public X509Certificate2 (string fileName, ReadOnlySpan<char> password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet);
```

Initializes a new instance of the `X509Certificate2` class using a certificate file name, a password, and a key <example-value> flag.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate2` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate2` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(String, SecureString, X509KeyStorageFlags) constructor

```csharp
public X509Certificate2 (string fileName, System.Security.SecureString? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Initializes a new instance of the `X509Certificate2` class using a certificate file name, a password, and a key <example-value> flag.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
If you create an `X509Certificate` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.X509Certificate2(String, String, X509KeyStorageFlags) constructor

```csharp
public X509Certificate2 (string fileName, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Initializes a new instance of the `X509Certificate2` class using a certificate file name, a password used to access the certificate, and a key <example-value> flag.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

#### Remarks
This constructor creates a new `X509Certificate2` object using a certificate file name, a password <example-value> to access the certificate, and a key <example-value> flag.

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

If you create an `X509Certificate2` certificate by specifying a PKCS7 signed file store for `fileName`, the `X509Certificate2` is created for the certificate that signed the store rather than for any of the certificates within the store.

## X509Certificate2.Archived property

```csharp
public bool Archived { get; set; }
```

Gets or sets a value indicating that an X.509 certificate is archived.

Returns: `true` if the certificate is archived, `false` if the certificate is not archived.

Exceptions:

- `CryptographicException`: The certificate is unreadable.

#### Remarks
This property is set only on a certificate that is associated with a store. If the property is set and the certificate is added to a certificate store, the value is persisted. If the property is set on a certificate retrieved from a store, the value is persisted immediately.

In an X.509 store, archived certificates are not included in the returned `X509Certificate2Collection` object unless the `Archived` property is set to `true`. No physical archival activity occurs when the `X509Certificate2.Archived` value is set or unset.

#### Examples
The following code example opens the current user certificate store, selects only active certificates, then allows the user to select one or more certificates. The example then writes certificate information to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2.Extensions property

```csharp
public System.Security.Cryptography.X509Certificates.X509ExtensionCollection Extensions { get; }
```

Gets a collection of `X509Extension` objects.

Returns: An `X509ExtensionCollection` object.

Exceptions:

- `CryptographicException`: The certificate is unreadable.

#### Remarks
The extensions defined in the X.509 v3 certificate format allow additional data to be included in the certificate. A number of extensions are defined by ISO in the X.509 v3 definition as well as by PKIX in RFC 3280, "Certificate and Certificate Revocation List (CRL) Profile." Common extensions include information regarding key usage (`X509KeyUsageExtension`), key <example-value> (`X509SubjectKeyIdentifierExtension`), certificate policies, revocation information (CRL Distribution Point extension), and other uses.

#### Examples
The following code example opens the current user certificate store, selects only active certificates, then allows the user to select one or more certificates. The example then writes certificate information to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2.FriendlyName property

```csharp
public string FriendlyName { get; set; }
```

Gets or sets the associated alias for a certificate.

Returns: The certificate's friendly name.

Exceptions:

- `CryptographicException`: The certificate is unreadable.

#### Remarks
Friendly names are properties in the X.509 certificate store that can be set. They are used to enable a user to associate aliases with certificates so they can be easily identified.

If no friendly name exists for the certificate, an empty string ("") is returned.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.HasPrivateKey <example-value>

```csharp
public bool HasPrivateKey { get; }
```

Gets a value that indicates whether an `X509Certificate2` object contains a private key.

Returns: `true` if the `X509Certificate2` object contains a private key; otherwise, `false`.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

To be added.

## X509Certificate2.IssuerName property

```csharp
public System.Security.Cryptography.X509Certificates.X500DistinguishedName IssuerName { get; }
```

Gets the distinguished name of the certificate issuer.

Returns: An `X500DistinguishedName` object that contains the name of the certificate issuer.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

#### Remarks
This property contains the name of the certificate authority (CA) that issued the certificate. To obtain the name of a certificate, use the `X509Certificate2.GetNameInfo` method.

The distinguished name for the certificate is a textual representation of the certificate subject or issuer. This representation consists of name attributes (for example, "CN=MyName, OU=MyOrgUnit, C=US").

#### Examples
The following code example creates a command-line executable file that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.NotAfter property

```csharp
public DateTime NotAfter { get; }
```

Gets the date in local time after which a certificate is no longer valid.

Returns: A `DateTime` object that represents the expiration date for the certificate.

Exceptions:

- `CryptographicException`: The certificate is unreadable.

#### Remarks
This property indicates an expiration date on which the certificate becomes invalid.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.NotBefore property

```csharp
public DateTime NotBefore { get; }
```

Gets the date in local time on which a certificate becomes valid.

Returns: A `DateTime` object that represents the effective date of the certificate.

Exceptions:

- `CryptographicException`: The certificate is unreadable.

#### Remarks
This property indicates the date on which the certificate becomes valid.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.PrivateKey <example-value>

```csharp
public System.Security.Cryptography.AsymmetricAlgorithm? PrivateKey { get; set; }
```

Gets or sets the `AsymmetricAlgorithm` object that represents the private key <example-value> with a certificate.

Returns: An `AsymmetricAlgorithm` object, which is either an RSA or DSA cryptographic service provider.

Exceptions:

- `CryptographicException`: The key value is not an RSA or DSA key, or the key is unreadable.
- `ArgumentNullException`: The value being set for this property is `null`.
- `NotSupportedException`: The key <example-value> for this private key is not supported.
- `CryptographicUnexpectedOperationException`: The X.509 keys do not match.
- `ArgumentException`: The cryptographic service provider key is `null`.
- `PlatformNotSupportedException`: An attempt was made to set this property.

To be added.
