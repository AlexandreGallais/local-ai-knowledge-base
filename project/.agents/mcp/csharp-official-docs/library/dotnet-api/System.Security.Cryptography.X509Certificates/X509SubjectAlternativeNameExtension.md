---
title: "X509SubjectAlternativeNameExtension class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509SubjectAlternativeNameExtension.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509SubjectAlternativeNameExtension class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509SubjectAlternativeNameExtension : System.Security.Cryptography.X509Certificates.X509Extension
```

Represents the Subject Alternative Name X.509 Extension (2.5.29.17).

To be added.

## X509SubjectAlternativeNameExtension.X509SubjectAlternativeNameExtension() constructor

```csharp
public X509SubjectAlternativeNameExtension ();
```

Initializes a new instance of the `X509SubjectAlternativeNameExtension` class.

To be added.

## X509SubjectAlternativeNameExtension.X509SubjectAlternativeNameExtension(Byte[], Boolean) constructor

```csharp
public X509SubjectAlternativeNameExtension (byte[] rawData, bool critical = false);
```

Initializes a new instance of the `X509SubjectAlternativeNameExtension` class from an encoded representation of the extension and an optional critical marker.

Parameters:

- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`. The default is `false`.

Exceptions:

- `ArgumentNullException`: `rawData` is `null`.
- `CryptographicException`: `rawData` did not decode as a Subject Alternative Name extension.

To be added.

## X509SubjectAlternativeNameExtension.X509SubjectAlternativeNameExtension(Byte>, Boolean) constructor

```csharp
public X509SubjectAlternativeNameExtension (ReadOnlySpan<byte> rawData, bool critical = false);
```

Initializes a new instance of the `X509SubjectAlternativeNameExtension` class from an encoded representation of the extension and an optional critical marker.

Parameters:

- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`. The default is `false`.

Exceptions:

- `CryptographicException`: `rawData` did not decode as a Subject Alternative Name extension.

To be added.

## X509SubjectAlternativeNameExtension.CopyFrom(AsnEncodedData) method

```csharp
public override void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Copies the extension properties of the specified `AsnEncodedData` object.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` to be copied.

To be added.

## X509SubjectAlternativeNameExtension.EnumerateDnsNames() method

```csharp
public System.Collections.Generic.IEnumerable<string> EnumerateDnsNames ();
```

Enumerates the alternative name entries with a DNS Name type identifier.

Returns: The name entries with a DNS Name type identifier.

Exceptions:

- `CryptographicException`: The contents of the extension could not be decoded successfully.

To be added.

## X509SubjectAlternativeNameExtension.EnumerateIPAddresses() method

```csharp
public System.Collections.Generic.IEnumerable<System.Net.IPAddress> EnumerateIPAddresses ();
```

Enumerates the alternative name entries with an IP Address type identifier.

Returns: The name entries with an IP Address type identifier.

To be added.
