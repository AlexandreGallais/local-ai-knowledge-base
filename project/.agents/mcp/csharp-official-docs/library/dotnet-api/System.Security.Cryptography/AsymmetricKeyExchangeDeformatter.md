---
title: "AsymmetricKeyExchangeDeformatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsymmetricKeyExchangeDeformatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsymmetricKeyExchangeDeformatter class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class AsymmetricKeyExchangeDeformatter
```

Represents the base class from which all asymmetric key <example-value> deformatters derive.

#### Remarks
Asymmetric key <example-value> deformatters decrypt key <example-value> data.

Key <example-value> allows a sender to create secret <example-value>, such as random data that can be used as a key in a symmetric encryption algorithm, and use encryption to send it to the intended recipient.

> **Caution:**
>  It is highly recommended that you not attempt to create your own key <example-value> method from the basic <example-value> provided, because many details of the operation must be performed carefully in order for the key <example-value> to be successful.

#### Examples
The following example demonstrates how to extend the `AsymmetricKeyExchangeDeformatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricKeyExchangeDeformatter/Overview/contosodeformatter.cs._

## AsymmetricKeyExchangeDeformatter.AsymmetricKeyExchangeDeformatter() constructor

```csharp
protected AsymmetricKeyExchangeDeformatter ();
```

Initializes a new instance of `AsymmetricKeyExchangeDeformatter`.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

Use an implementation of `AsymmetricKeyExchangeDeformatter.SetKey` to establish the key <example-value> calling an implementation of `AsymmetricKeyExchangeDeformatter.DecryptKeyExchange`.

## AsymmetricKeyExchangeDeformatter.Parameters property

```csharp
public abstract string? Parameters { get; set; }
```

When overridden in a derived class, gets or sets the parameters for the asymmetric key exchange.

Returns: A string in XML format containing the parameters of the asymmetric key <example-value> operation.

#### Examples
The following code example demonstrates how to override the `Parameters` property to disallow access to the parameters of the formatter. This code example is part of a larger example provided for the `AsymmetricKeyExchangeDeformatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricKeyExchangeDeformatter/Overview/contosodeformatter.cs._

## AsymmetricKeyExchangeDeformatter.DecryptKeyExchange(Byte[]) method

```csharp
public abstract byte[] DecryptKeyExchange (byte[] rgb);
```

When overridden in a derived class, extracts secret <example-value> from the encrypted key <example-value> data.

Parameters:

- `rgb`: The key <example-value> data within which the secret <example-value> is hidden.

Returns: The secret <example-value> derived from the key <example-value> data.

#### Remarks
You must specify a key <example-value> calling an implementation of this method.

#### Examples
The following code example demonstrates how to override the `AsymmetricKeyExchangeDeformatter.DecryptKeyExchange` method to create an encrypted key <example-value> for the specified input data. This code example is part of a larger example provided for the `AsymmetricKeyExchangeDeformatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricKeyExchangeDeformatter/Overview/contosodeformatter.cs._

## AsymmetricKeyExchangeDeformatter.SetKey(AsymmetricAlgorithm) method

```csharp
public abstract void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

When overridden in a derived class, sets the private key to use for decrypting the secret information.

Parameters:

- `key`: The instance of the implementation of `AsymmetricAlgorithm` that holds the private key.

#### Remarks
You must set a key <example-value> calling a `AsymmetricKeyExchangeDeformatter.DecryptKeyExchange` implementation.

#### Examples
The following code example demonstrates how to override the `AsymmetricKeyExchangeDeformatter.SetKey` to set the public key for encryption operations. This code example is part of a larger example provided for the `AsymmetricKeyExchangeDeformatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricKeyExchangeDeformatter/Overview/contosodeformatter.cs._
