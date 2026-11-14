---
title: "SignatureDescription class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SignatureDescription.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SignatureDescription class

Namespace: `System.Security.Cryptography`

```csharp
public class SignatureDescription
```

Contains information about the properties of a digital signature.

To be added.

## SignatureDescription.SignatureDescription() constructor

```csharp
public SignatureDescription ();
```

Initializes a new instance of the `SignatureDescription` class.

To be added.

## SignatureDescription.SignatureDescription(SecurityElement) constructor

```csharp
public SignatureDescription (System.Security.SecurityElement el);
```

Initializes a new instance of the `SignatureDescription` class from the specified `SecurityElement`.

Parameters:

- `el`: The `SecurityElement` from which to get the algorithms for the signature description.

Exceptions:

- `ArgumentNullException`: The `el` parameter is `null`.

To be added.

## SignatureDescription.DeformatterAlgorithm property

```csharp
public string? DeformatterAlgorithm { get; set; }
```

Gets or sets the deformatter algorithm for the signature description.

Returns: The deformatter algorithm for the signature description.

To be added.

## SignatureDescription.DigestAlgorithm property

```csharp
public string? DigestAlgorithm { get; set; }
```

Gets or sets the digest algorithm for the signature description.

Returns: The digest algorithm for the signature description.

To be added.

## SignatureDescription.FormatterAlgorithm property

```csharp
public string? FormatterAlgorithm { get; set; }
```

Gets or sets the formatter algorithm for the signature description.

Returns: The formatter algorithm for the signature description.

To be added.

## SignatureDescription.KeyAlgorithm property

```csharp
public string? KeyAlgorithm { get; set; }
```

Gets or sets the key <example-value> for the signature description.

Returns: The key <example-value> for the signature description.

To be added.

## SignatureDescription.CreateDeformatter(AsymmetricAlgorithm) method

```csharp
public virtual System.Security.Cryptography.AsymmetricSignatureDeformatter CreateDeformatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Creates an `AsymmetricSignatureDeformatter` instance with the specified key using the `SignatureDescription.DeformatterAlgorithm` property.

Parameters:

- `key`: The key to use in the `AsymmetricSignatureDeformatter`.

Returns: The newly created `AsymmetricSignatureDeformatter` instance.

To be added.

## SignatureDescription.CreateDigest() method

```csharp
public virtual System.Security.Cryptography.HashAlgorithm? CreateDigest ();
```

Creates a `HashAlgorithm` instance using the `SignatureDescription.DigestAlgorithm` property.

Returns: The newly created `HashAlgorithm` instance.

To be added.

## SignatureDescription.CreateFormatter(AsymmetricAlgorithm) method

```csharp
public virtual System.Security.Cryptography.AsymmetricSignatureFormatter CreateFormatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Creates an `AsymmetricSignatureFormatter` instance with the specified key using the `SignatureDescription.FormatterAlgorithm` property.

Parameters:

- `key`: The key to use in the `AsymmetricSignatureFormatter`.

Returns: The newly created `AsymmetricSignatureFormatter` instance.

To be added.
