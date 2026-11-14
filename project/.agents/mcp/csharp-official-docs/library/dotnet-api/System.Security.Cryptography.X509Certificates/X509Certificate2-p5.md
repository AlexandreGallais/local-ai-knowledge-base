---
title: "X509Certificate2 class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2 class (part 5 of 5)

## X509Certificate2.GetSlhDsaPrivateKey() method

```csharp
public System.Security.Cryptography.SlhDsa? GetSlhDsaPrivateKey ();
```

Gets the `SlhDsa` private key from this certificate.

Returns: The private key, or `null` if this certificate does not have an SLH-DSA private key.

Exceptions:

- `CryptographicException`: An error occurred accessing the private key.

To be added.

## X509Certificate2.GetSlhDsaPublicKey() method

```csharp
public System.Security.Cryptography.SlhDsa? GetSlhDsaPublicKey ();
```

Gets the `SlhDsa` public key from this certificate.

Returns: The public key, or `null` if this certificate does not have an SLH-DSA public key.

Exceptions:

- `PlatformNotSupportedException`: The certificate has an SLH-DSA public key, but the platform does not support SLH-DSA.
- `CryptographicException`: The public key was invalid, or otherwise could not be imported.

To be added.

## X509Certificate2.Import(Byte[]) method

```csharp
public override void Import (byte[] rawData);
```

Populates an `X509Certificate2` object with data from a byte array.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.

To be added.

## X509Certificate2.Import(String) method

```csharp
public override void Import (string fileName);
```

Populates an `X509Certificate2` object with information from a certificate file.

Parameters:

- `fileName`: The name of a certificate.

To be added.

## X509Certificate2.Import(Byte[], SecureString, X509KeyStorageFlags) method

```csharp
public override void Import (byte[] rawData, System.Security.SecureString? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Populates an `X509Certificate2` object using data from a byte array, a password, and a key <example-value> flag.

Parameters:

- `rawData`: A byte array that contains data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

To be added.

## X509Certificate2.Import(Byte[], String, X509KeyStorageFlags) method

```csharp
public override void Import (byte[] rawData, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Populates an `X509Certificate2` object using data from a byte array, a password, and flags for determining how to import the private key.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

To be added.

## X509Certificate2.Import(String, SecureString, X509KeyStorageFlags) method

```csharp
public override void Import (string fileName, System.Security.SecureString? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Populates an `X509Certificate2` object with information from a certificate file, a password, and a key <example-value> flag.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

To be added.

## X509Certificate2.Import(String, String, X509KeyStorageFlags) method

```csharp
public override void Import (string fileName, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags);
```

Populates an `X509Certificate2` object with information from a certificate file, a password, and a `X509KeyStorageFlags` value.

Parameters:

- `fileName`: The name of a certificate file.
- `password`: The password <example-value> to access the X.509 certificate data.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to import the certificate.

To be added.

## X509Certificate2.MatchesHostname(String, Boolean, Boolean) method

```csharp
public bool MatchesHostname (string hostname, bool allowWildcards = true, bool allowCommonName = true);
```

Checks to see if the certificate matches the provided host name.

Parameters:

- `hostname`: The host name to match against.
- `allowWildcards`: `true` to allow wildcard matching for `dNSName` values in the Subject Alternative Name extension; otherwise, `false`.
- `allowCommonName`: `true` to allow matching against the subject Common Name value; otherwise, `false`.

Returns: `true` if the certificate is a match for the requested hostname; otherwise, `false`

Exceptions:

- `ArgumentException`: The `hostname` parameter is not a valid DNS hostname or IP address.
- `CryptographicException`: The certificate contains multiple Subject Alternative Name extensions.

-or-

The Subject Alternative Name extension or Subject Name could not be decoded.

This method is a platform neutral implementation of IETF RFC 6125 host matching logic.
The SslStream class uses the host name validator from the operating system, which may result in different values from this implementation.

The logical flow of this method is:

 If the hostname parses as an `IPAddress` then IPAddress matching is done; otherwise, DNS Name matching is done.
 For IPAddress matching, the value must be an exact match against an `iPAddress` value in an entry of the Subject Alternative Name extension.
 For DNS Name matching, the value must be an exact match against a `dNSName` value in an entry of the Subject Alternative Name extension, or a wildcard match against the same.
 For wildcard matching, the wildcard must be the first character in the `dNSName` entry, the second character must be a period (.), and the entry must have a length greater than two.The wildcard will only match the `hostname` value up to the first period (.), remaining characters must be an exact match.
 If there is no Subject Alternative Name extension, or the extension does not have any entries of the appropriate type, then Common Name matching is used as a fallback.
 For Common Name matching, if the Subject Name contains a single Common Name, and that attribute is not defined as part of a multi-valued Relative Distinguished Name, then the hostname is matched against the Common Name attribute's value.Note that wildcards are not used in Common Name matching.

This implementation considers `SRV-ID` values or `URI-ID` values as out-of-scope, and will not use their presence as a reason to stop the fallback from `DNS-ID` matching to the `CN-ID`.

This method does not convert non-ASCII hostnames to the IDNA representation. For Unicode domains, the caller must make use of `IdnMapping` or an equivalent IDNA mapper.

The "exact" matches performed by this routine are `StringComparison.OrdinalIgnoreCase`, as domain names are not case-sensitive.

This method does not determine if the hostname is authorized by a trusted authority.  A trust decision cannot be made without additionally checking for trust via `X509Chain`.

This method does not check that the certificate has an `id-kp-serverAuth` (1.3.6.1.5.5.7.3.1) extended key usage.

## X509Certificate2.Reset() method

```csharp
public override void Reset ();
```

Resets the state of an `X509Certificate2` object.

#### Remarks
This method can be used to reset the state of the certificate. It also frees any resources associated with the certificate.

## X509Certificate2.ToString() method

```csharp
public override string ToString ();
```

Displays an X.509 certificate in text format.

Returns: The certificate information.

#### Remarks
As with all `ToString` methods, the output might not be consistent across versions of .NET, so the method results should not be parsed for content. Use the properties on the `X509Certificate2` object to obtain precise information about the content or use the `X509Certificate2.ToString` method to obtain information about the certificate.

This method displays the certificate in text format.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.ToString(Boolean) method

```csharp
public override string ToString (bool verbose);
```

Displays an X.509 certificate in text format.

Parameters:

- `verbose`: `true` to display the public key, private key, extensions, and so forth; `false` to display information that is similar to the `X509Certificate2` class, including thumbprint, serial number, subject and issuer names, and so on.

Returns: The certificate information.

#### Remarks
As with all `ToString` methods, the output might not be consistent across versions of .NET, so the method results should not be parsed for content. Use the properties on the `X509Certificate2` object to obtain precise information.

This method displays the certificate in text format. If the `verbose` parameter is set to `true`, the text display includes the public key, private key, and extensions. If `verbose` is set to `false`, the text display includes those fields available from the X.509 certificate, including thumbprint, serial number, subject and issuer names, and validity date information.

#### Examples
The following code example creates a command line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.TryExportCertificatePem(Char>, Int32) method

```csharp
public bool TryExportCertificatePem (Span<char> destination, out int charsWritten);
```

Attempts to export the public X.509 certificate, encoded as PEM.

Parameters:

- `destination`: The buffer to receive the PEM encoded certificate.
- `charsWritten`: When this method returns, the total number of characters written to `destination`.

Returns: `true` if `destination` was large enough to receive the encoded PEM; otherwise, `false`.

Exceptions:

- `CryptographicException`: The certificate is corrupt, in an invalid state, or could not be exported
to PEM.

#### Remarks

A PEM-encoded X.509 certificate will begin with `-----BEGIN CERTIFICATE-----`
and end with `-----END CERTIFICATE-----`, with the base64 encoded DER
contents of the certificate between the PEM boundaries.

The certificate is encoded according to the IETF RFC 7468 "strict" encoding rules.

## X509Certificate2.Verify() method

```csharp
public bool Verify ();
```

Performs a X.509 chain validation using basic <example-value> policy.

Returns: `true` if the validation succeeds; `false` if the validation fails.

Exceptions:

- `CryptographicException`: The certificate is unreadable.

#### Remarks
This method builds a simple chain for the certificate and applies the base policy to that chain. If you need more information about a failure, validate the certificate directly using the `X509Chain` object.

The default chaining engine can be overridden using the `CryptoConfig` class.

#### Examples
The following code example opens the current user certificate store, selects only active certificates, then allows the user to select one or more certificates. The example then writes certificate information to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._
