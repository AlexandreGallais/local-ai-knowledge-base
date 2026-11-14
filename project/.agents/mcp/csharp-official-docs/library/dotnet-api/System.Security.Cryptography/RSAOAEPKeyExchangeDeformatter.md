---
title: "RSAOAEPKeyExchangeDeformatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAOAEPKeyExchangeDeformatter class

Namespace: `System.Security.Cryptography`

```csharp
public class RSAOAEPKeyExchangeDeformatter : System.Security.Cryptography.AsymmetricKeyExchangeDeformatter
```

Decrypts Optimal Asymmetric Encryption Padding (OAEP) key <example-value> data.

#### Remarks
Key <example-value> allows a sender to create secret <example-value>, for example, random data that can be used as a key in a symmetric encryption algorithm, and use encryption to send it to the intended recipient.

Use `RSAOAEPKeyExchangeFormatter` to create the key <example-value> message with the `RSA` algorithm.

> **Caution:**
>  It is highly recommended that you not attempt to create your own key <example-value> method from the basic <example-value> provided, because many details of the operation must be performed carefully in order for the key <example-value> to be successful.

#### Examples
The following example shows how to use the `RSAOAEPKeyExchangeDeformatter` class to recreate an exchange key to be used to decrypt a message.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter/Overview/program.cs._

## RSAOAEPKeyExchangeDeformatter.RSAOAEPKeyExchangeDeformatter() constructor

```csharp
public RSAOAEPKeyExchangeDeformatter ();
```

Initializes a new instance of the `RSAOAEPKeyExchangeDeformatter` class.

#### Remarks
Use `RSAOAEPKeyExchangeDeformatter.SetKey` to establish the key <example-value> calling `RSAOAEPKeyExchangeDeformatter.DecryptKeyExchange`.

## RSAOAEPKeyExchangeDeformatter.RSAOAEPKeyExchangeDeformatter(AsymmetricAlgorithm) constructor

```csharp
public RSAOAEPKeyExchangeDeformatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `RSAOAEPKeyExchangeDeformatter` class with the specified key.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the private key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## RSAOAEPKeyExchangeDeformatter.Parameters property

```csharp
public override string? Parameters { get; set; }
```

Gets the parameters for the Optimal Asymmetric Encryption Padding (OAEP) key exchange.

Returns: An XML string containing the parameters of the OAEP key <example-value> operation.

#### Examples
The following code example demonstrates how to call the `Parameters` property to retrieve an XML representation of the parameters. This code example is part of a larger example provided for the `RSAOAEPKeyExchangeDeformatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter/Parameters/rsaencoder.cs._

## RSAOAEPKeyExchangeDeformatter.DecryptKeyExchange(Byte[]) method

```csharp
public override byte[] DecryptKeyExchange (byte[] rgbData);
```

Extracts secret <example-value> from the encrypted key <example-value> data.

Parameters:

- `rgbData`: The key <example-value> data within which the secret <example-value> is hidden.

Returns: The secret <example-value> derived from the key <example-value> data.

Exceptions:

- `CryptographicException`: The key <example-value> data verification has failed.
- `CryptographicUnexpectedOperationException`: The key is missing.

#### Remarks
You must specify a key <example-value> calling this method.

#### Examples
The following example shows how to use the `RSAOAEPKeyExchangeDeformatter.DecryptKeyExchange` method to recreate an exchange key from a message sender. This code example is part of a larger example provided for the `RSAPKCS1KeyExchangeDeformatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter/Overview/program.cs._

## RSAOAEPKeyExchangeDeformatter.SetKey(AsymmetricAlgorithm) method

```csharp
public override void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Sets the private key to use for decrypting the secret information.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the private key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
You must set a key <example-value> calling `RSAOAEPKeyExchangeDeformatter.DecryptKeyExchange`.
