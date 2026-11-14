---
title: "X509ChainPolicy class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ChainPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ChainPolicy class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509ChainPolicy
```

Represents the chain policy to be applied when building an X509 certificate chain. This class cannot be inherited.

#### Remarks
Each `X509Certificate2` object can have an `X509ChainPolicy` property that specifies the policy to be used in the verification process. Note that only `X509Certificate2` objects can construct an `X509ChainPolicy` object.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainPolicy.X509ChainPolicy() constructor

```csharp
public X509ChainPolicy ();
```

Initializes a new instance of the `X509ChainPolicy` class.

To be added.

## X509ChainPolicy.ApplicationPolicy property

```csharp
public System.Security.Cryptography.OidCollection ApplicationPolicy { get; }
```

Gets a collection of object identifiers (OIDs) specifying which application policies or enhanced key <example-value> (EKUs) the certificate must support.

Returns: An `OidCollection` object.

#### Remarks
By default, this collection is empty. You can add additional object identifiers (OIDs) to the collection using the following code:

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/remarks.cs._

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainPolicy.CertificatePolicy property

```csharp
public System.Security.Cryptography.OidCollection CertificatePolicy { get; }
```

Gets a collection of object identifiers (OIDs) specifying which certificate policies the certificate must support.

Returns: An `OidCollection` object.

#### Remarks
By default, this collection is empty.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainPolicy.CustomTrustStore property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection CustomTrustStore { get; }
```

Represents a collection of certificates replacing the default certificate trust.

Returns: A collection of certificates replacing the default certificate trust.

#### Remarks

The collection is respected only when `TrustMode` is set to `CustomRootTrust`.

## X509ChainPolicy.DisableCertificateDownloads property

```csharp
public bool DisableCertificateDownloads { get; set; }
```

Gets or sets a value that indicates whether the chain engine can use the Authority Information Access (AIA) extension to locate unknown issuer certificates.

Returns: `true` if using the AIA extension is disabled; otherwise, `false`.
The default is `false`.

To be added.

## X509ChainPolicy.ExtraStore property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection ExtraStore { get; }
```

Gets an object that represents an additional collection of certificates that can be searched by the chaining engine when validating a certificate chain.

Returns: An `X509Certificate2Collection` object.

#### Remarks
Protocols such as Secure Sockets Layer (SSL) and Secure MIME (S/MIME) allow the inclusion of additional certificates for use in validating a certificate chain; these certificates can prove to be useful in the validation process. This property allows these certificates to be passed to the chain validation engine. By default, this collection is empty.

## X509ChainPolicy.RevocationFlag property

```csharp
public System.Security.Cryptography.X509Certificates.X509RevocationFlag RevocationFlag { get; set; }
```

Gets or sets values for X509 revocation flags.

Returns: An `X509RevocationFlag` object.

Exceptions:

- `ArgumentException`: The `X509RevocationFlag` value supplied is not a valid flag.

#### Remarks
This property uses values from the `X509RevocationFlag` enumeration. `ExcludeRoot` is the default value.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainPolicy.RevocationMode property

```csharp
public System.Security.Cryptography.X509Certificates.X509RevocationMode RevocationMode { get; set; }
```

Gets or sets values for X509 certificate revocation mode.

Returns: An `X509RevocationMode` object.

Exceptions:

- `ArgumentException`: The `X509RevocationMode` value supplied is not a valid flag.

#### Remarks
This property uses values from the `X509RevocationMode` enumeration. `Online` is the default value.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainPolicy.TrustMode property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainTrustMode TrustMode { get; set; }
```

The mode determining the root trust for building the certificate chain.

Returns: An `X509ChainTrustMode` value determining the root trust.

#### Remarks

When `CustomRootTrust` is used, the `CustomTrustStore` will be used instead of the default root trust.

## X509ChainPolicy.UrlRetrievalTimeout property

```csharp
public TimeSpan UrlRetrievalTimeout { get; set; }
```

Gets or sets the maximum amount of time to be spent during online revocation verification or downloading the certificate revocation list (CRL). A value of `TimeSpan.Zero` means there are no limits.

Returns: A `TimeSpan` object.

#### Remarks
When using online revocation checking, this property can be used to set the URL retrieval timeout.

## X509ChainPolicy.VerificationFlags property

```csharp
public System.Security.Cryptography.X509Certificates.X509VerificationFlags VerificationFlags { get; set; }
```

Gets verification flags for the certificate.

Returns: A value from the `X509VerificationFlags` enumeration.

Exceptions:

- `ArgumentException`: The `X509VerificationFlags` value supplied is not a valid flag. `X509VerificationFlags.NoFlag` is the default value.

#### Remarks
This property returns values from the `X509VerificationFlags` enumeration.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainPolicy.VerificationTime property

```csharp
public DateTime VerificationTime { get; set; }
```

Gets or sets the time for which the chain is to be validated.

Returns: A `DateTime` object.

#### Remarks
This property represents the time parameter for chain validation. This property returns a value indicating the time the chain is to be validated, either as local time or UTC, depending on the value of the `Kind` property.
This property is important when validating signed messages, since the signature must have been valid at the time of signing, not at the time of validation.
Every certificate in the chain must have a `NotBefore` time no later than this property's value and a
`NotAfter` time no earlier than this property's value. Otherwise, the `NotTimeValid` flag is asserted.
On Windows, this property may also be used to determine the revocation status of a certificate.

The parameterless constructor for the `X509ChainPolicy` class sets the `VerificationTime` property to the time the constructor is called.
Calling the `Reset` method replaces the value of `VerificationTime` with the current system time,
not with the time that the object was constructed.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainPolicy.VerificationTimeIgnored property

```csharp
public bool VerificationTimeIgnored { get; set; }
```

Gets or sets a value that indicates whether the chain validation should use `X509ChainPolicy.VerificationTime` or the current system time when building an X.509 certificate chain.

Returns: `true` if `X509ChainPolicy.VerificationTime` is ignored and the current system time is used; otherwise `false`.
The default is `true`.

To be added.

## X509ChainPolicy.Clone() method

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainPolicy Clone ();
```

Creates a new chain policy instance that has the same settings as this instance.

Returns: A new chain policy instance that has the same settings as this instance.

To be added.

## X509ChainPolicy.Reset() method

```csharp
public void Reset ();
```

Resets the `X509ChainPolicy` members to their default values.

#### Remarks
Resets all class properties to their default values.
