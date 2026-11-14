---
title: "Pkcs12LoaderLimits class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/Pkcs12LoaderLimits.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Pkcs12LoaderLimits class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class Pkcs12LoaderLimits
```

Represents a set of constraints to apply when loading PKCS#12/PFX contents.

To be added.

## Pkcs12LoaderLimits.Pkcs12LoaderLimits() constructor

```csharp
public Pkcs12LoaderLimits ();
```

Initializes a new instance of the `Pkcs12LoaderLimits` class
with default values.

The default values for each property on a default instance of this class
are chosen as a compromise between maximizing compatibility and minimizing
"nuisance" work.  The defaults for any given property may vary over time.

## Pkcs12LoaderLimits.Pkcs12LoaderLimits(Pkcs12LoaderLimits) constructor

```csharp
public Pkcs12LoaderLimits (System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits copyFrom);
```

Initializes a new instance of the `Pkcs12LoaderLimits` class
by copying the values from another instance.

Parameters:

- `copyFrom`: The instance to copy the values from.

Exceptions:

- `ArgumentNullException`: `copyFrom` is `null`.

To be added.

## Pkcs12LoaderLimits.AllowDuplicateAttributes property

```csharp
public bool AllowDuplicateAttributes { get; set; }
```

Gets or sets a value indicating whether duplicate attributes are permitted.

Returns: `true` to permit duplicate attributes; `false` to fail loading when duplicate attributes are found.

The default is `false`.

To be added.

## Pkcs12LoaderLimits.DangerousNoLimits property

```csharp
public static System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits DangerousNoLimits { get; }
```

Gets a shared reference to loader limits that indicate no
filtering or restrictions of the contents should be applied
before sending them to the underlying system loader.

Returns: A shared reference to loader limits that indicate no
filtering or restrictions of the contents should be applied
before sending them to the underlying system loader.

The system loader may have its own limits where only part
of the contents are respected, or where the load is rejected.
Using this set of limits only affects the .NET layer of filtering.

The `X509CertificateLoader` class checks for reference
equality to this property to determine if filtering should be bypassed.
Making a new Pkcs12LoaderLimits value that has all of the same property
values may give different results for certain inputs.

## Pkcs12LoaderLimits.Defaults property

```csharp
public static System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits Defaults { get; }
```

Gets a shared reference to the default loader limits.

Returns: A shared reference to the default loader limits.

The singleton instance returned from this property is equivalent to an
instance produced via the default constructor, except the properties
prohibit reassignment.  As with the default constructor, the individual
property values may change over time.

## Pkcs12LoaderLimits.IgnoreEncryptedAuthSafes property

```csharp
public bool IgnoreEncryptedAuthSafes { get; set; }
```

Gets or sets a value indicating whether to ignore encrypted authentication safes.

Returns: `true` to skip over encrypted PFX AuthSafe values;
`false` to decrypt encrypted PFX AuthSafe values to process their
contents.
The default is `false`.

To be added.

## Pkcs12LoaderLimits.IgnorePrivateKeys property

```csharp
public bool IgnorePrivateKeys { get; set; }
```

Gets or sets a value indicating whether to ignore private keys.

Returns: `true` to skip loading private keys;
`false` to load both certificates and private keys.
The default is `false`.

To be added.

## Pkcs12LoaderLimits.IndividualKdfIterationLimit property

```csharp
public int? IndividualKdfIterationLimit { get; set; }
```

Gets or sets the iteration limit for the individual Key <example-value> Function (KDF) calculations.

Returns: The iteration limit for the individual Key <example-value> Function (KDF) calculations,
or `null` for no limit.

To be added.

## Pkcs12LoaderLimits.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the instance is read-only.

Returns: `true` if the instance is read-only; otherwise, `false`.

To be added.

## Pkcs12LoaderLimits.MacIterationLimit property

```csharp
public int? MacIterationLimit { get; set; }
```

Gets or sets the iteration limit for the MAC calculation.

Returns: The iteration limit for the MAC calculation, or `null` for no limit.

To be added.

## Pkcs12LoaderLimits.MaxCertificates property

```csharp
public int? MaxCertificates { get; set; }
```

Gets or sets the maximum number of certificates permitted.

Returns: The maximum number of certificates permitted, or `null` for no maximum.

To be added.

## Pkcs12LoaderLimits.MaxKeys property

```csharp
public int? MaxKeys { get; set; }
```

Gets or sets the maximum number of keys permitted.

Returns: The maximum number of keys permitted, or `null` for no maximum.

To be added.

## Pkcs12LoaderLimits.PreserveCertificateAlias property

```csharp
public bool PreserveCertificateAlias { get; set; }
```

Gets or sets a value indicating whether to preserve the certificate alias,
also known as the friendly name.

Returns: `true` to respect the alias for a
certificate; `false` to ignore the alias
information.
The default is `false`.

Certificate alias values from the PFX are only processed on the
Microsoft Windows family of operating systems.
This property has no effect on non-Windows systems.

## Pkcs12LoaderLimits.PreserveKeyName property

```csharp
public bool PreserveKeyName { get; set; }
```

Gets or sets a value indicating whether to preserve the key name.

Returns: `true` to respect the key name identifier for a
private key; `false` to ignore the key name
information and use a randomly generated identifier.
The default is `false`.

Key name identifier values from the PFX are only processed on the
Microsoft Windows family of operating systems.
This property has no effect on non-Windows systems.

## Pkcs12LoaderLimits.PreserveStorageProvider property

```csharp
public bool PreserveStorageProvider { get; set; }
```

Gets or sets a value indicating whether to preserve the storage provider.

Returns: `true` to respect the storage provider identifier for a
private key; `false` to ignore the storage provider
information and use the system defaults.
The default is `false`.

Storage Provider values from the PFX are only processed on the
Microsoft Windows family of operating systems.
This property has no effect on non-Windows systems.

## Pkcs12LoaderLimits.PreserveUnknownAttributes property

```csharp
public bool PreserveUnknownAttributes { get; set; }
```

Gets or sets a value indicating whether to preserve unknown attributes.

Returns: `true` to keep any attributes of a certificate or
private key that are not described by another property on this type intact
when invoking the system PKCS#12/PFX loader;
`false` to remove the unknown attributes prior to invoking
the system loader.
The default is `false`.

To be added.

## Pkcs12LoaderLimits.TotalKdfIterationLimit property

```csharp
public int? TotalKdfIterationLimit { get; set; }
```

Gets or sets the total iteration limit for the Key <example-value> Function (KDF) calculations.

Returns: The total iteration limit for the Key <example-value> Function (KDF) calculations,
or `null` for no limit.

To be added.

## Pkcs12LoaderLimits.MakeReadOnly() method

```csharp
public void MakeReadOnly ();
```

Makes the `Pkcs12LoaderLimits` instance read-only.

To be added.
