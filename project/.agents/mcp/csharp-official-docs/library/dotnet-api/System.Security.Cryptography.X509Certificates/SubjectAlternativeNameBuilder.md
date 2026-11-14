---
title: "SubjectAlternativeNameBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/SubjectAlternativeNameBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SubjectAlternativeNameBuilder class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class SubjectAlternativeNameBuilder
```

This class facilitates building a subject alternative name extension for an X.509 certificate.

To be added.

## SubjectAlternativeNameBuilder.SubjectAlternativeNameBuilder() constructor

```csharp
public SubjectAlternativeNameBuilder ();
```

Initializes a new instance of the `SubjectAlternativeNameBuilder` class.

To be added.

## SubjectAlternativeNameBuilder.AddDnsName(String) method

```csharp
public void AddDnsName (string dnsName);
```

Adds a DNS Name to the subject alternative name extension.

Parameters:

- `dnsName`: The DNS name to be added.

Exceptions:

- `ArgumentOutOfRangeException`: `dnsName` is either `null` or `String.Empty`.

To be added.

## SubjectAlternativeNameBuilder.AddEmailAddress(String) method

```csharp
public void AddEmailAddress (string emailAddress);
```

Adds an email address to the subject alternative name extension.

Parameters:

- `emailAddress`: The email address to be added.

Exceptions:

- `ArgumentOutOfRangeException`: `emailAddress` is either `null` or `String.Empty`.

To be added.

## SubjectAlternativeNameBuilder.AddIpAddress(IPAddress) method

```csharp
public void AddIpAddress (System.Net.IPAddress ipAddress);
```

Adds an IP address to the subject alternative name extension.

Parameters:

- `ipAddress`: The IP address to be added.

Exceptions:

- `ArgumentNullException`: `ipAddress` is `null`.

To be added.

## SubjectAlternativeNameBuilder.AddRegisteredId(String) method

```csharp
public void AddRegisteredId (string registeredId);
```

To be added.

Parameters:

- `registeredId`: To be added.

To be added.

## SubjectAlternativeNameBuilder.AddUri(Uri) method

```csharp
public void AddUri (Uri uri);
```

Adds a Uniform Resource Identifier (URI) to the subject alternative name extension.

Parameters:

- `uri`: The URI to be added.

Exceptions:

- `ArgumentNullException`: `uri` is `null`.

To be added.

## SubjectAlternativeNameBuilder.AddUserPrincipalName(String) method

```csharp
public void AddUserPrincipalName (string upn);
```

Adds a User Principal Name (UPN) to the subject alternative name extension.

Parameters:

- `upn`: The UPN to be added.

Exceptions:

- `ArgumentOutOfRangeException`: `upn` is either `null` or `String.Empty`.

To be added.

## SubjectAlternativeNameBuilder.Build(Boolean) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Extension Build (bool critical = false);
```

Returns an `X509Extension` object that represents the encoded subject alternative name extension.

Parameters:

- `critical`: `true` to mark the extension as `X509Extension.Critical`; otherwise, `false`. The default value is `false`.

Returns: An `X509Extension` object that represents the encoded subject alternative name extension.

To be added.
