---
title: "AsymmetricKeyExchangeFormatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsymmetricKeyExchangeFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsymmetricKeyExchangeFormatter class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class AsymmetricKeyExchangeFormatter
```

Represents the base class from which all asymmetric key <example-value> formatters derive.

#### Remarks
Asymmetric key <example-value> formatters encrypt key <example-value> data.

Key <example-value> allows a sender to create secret <example-value>, such as random data that can be used as a key in a symmetric encryption algorithm, and use encryption to send it to the intended recipient.

> **Caution:**
>  It is highly recommended that you not attempt to create your own key <example-value> method from the basic <example-value> provided, because many details of the operation must be performed carefully in order for the key <example-value> to be successful.

## AsymmetricKeyExchangeFormatter.AsymmetricKeyExchangeFormatter() constructor

```csharp
protected AsymmetricKeyExchangeFormatter ();
```

Initializes a new instance of `AsymmetricKeyExchangeFormatter`.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

Use `AsymmetricKeyExchangeFormatter.SetKey` to set the key <example-value> calling `AsymmetricKeyExchangeFormatter.CreateKeyExchange`.

## AsymmetricKeyExchangeFormatter.Parameters property

```csharp
public abstract string? Parameters { get; }
```

When overridden in a derived class, gets the parameters for the asymmetric key exchange.

Returns: A string in XML format containing the parameters of the asymmetric key <example-value> operation.

To be added.

## AsymmetricKeyExchangeFormatter.CreateKeyExchange(Byte[]) method

```csharp
public abstract byte[] CreateKeyExchange (byte[] data);
```

When overridden in a derived class, creates the encrypted key <example-value> data from the specified input data.

Parameters:

- `data`: The secret <example-value> to be passed in the key exchange.

Returns: The encrypted key <example-value> data to be sent to the intended recipient.

#### Remarks
This data can only be interpreted by the holder of the private key <example-value> to the public key used to encrypt the data. This helps to ensure that only the intended recipient can access the secret information.

## AsymmetricKeyExchangeFormatter.CreateKeyExchange(Byte[], Type) method

```csharp
public abstract byte[] CreateKeyExchange (byte[] data, Type? symAlgType);
```

When overridden in a derived class, creates the encrypted key <example-value> data from the specified input data.

Parameters:

- `data`: The secret <example-value> to be passed in the key exchange.
- `symAlgType`: This parameter is not used in the current version.

Returns: The encrypted key <example-value> data to be sent to the intended recipient.

#### Remarks
This data can only be interpreted by the holder of the private key <example-value> to the public key used to encrypt the data. This helps to ensure that only the intended recipient can access the secret information.

## AsymmetricKeyExchangeFormatter.SetKey(AsymmetricAlgorithm) method

```csharp
public abstract void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

When overridden in a derived class, sets the public key to use for encrypting the secret information.

Parameters:

- `key`: The instance of the implementation of `AsymmetricAlgorithm` that holds the public key.

#### Remarks
You must set a key <example-value> calling a `AsymmetricKeyExchangeFormatter.CreateKeyExchange` implementation.
