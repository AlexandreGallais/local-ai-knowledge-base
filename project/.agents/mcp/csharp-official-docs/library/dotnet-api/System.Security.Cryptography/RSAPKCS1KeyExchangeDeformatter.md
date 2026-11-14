---
title: "RSAPKCS1KeyExchangeDeformatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAPKCS1KeyExchangeDeformatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAPKCS1KeyExchangeDeformatter class

Namespace: `System.Security.Cryptography`

```csharp
public class RSAPKCS1KeyExchangeDeformatter : System.Security.Cryptography.AsymmetricKeyExchangeDeformatter
```

Decrypts the PKCS #1 key <example-value> data.

#### Remarks
Key <example-value> allows a sender to create secret <example-value> (such as random data that can be used as a key in a symmetric encryption algorithm) and use encryption to send it to the intended recipient.

Use `RSAPKCS1KeyExchangeFormatter` to create the key <example-value> message using the `RSA` algorithm.

> **Caution:**
>  It is highly recommended that you not attempt to create your own key <example-value> method from the basic <example-value> provided, because many details of the operation must be performed carefully in order for the key <example-value> to be successful.

#### Examples
The following example shows how to use the `RSAPKCS1KeyExchangeDeformatter` class to recreate an exchange key to be used to decrypt a message.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeFormatter/CreateKeyExchange/program.cs._

## RSAPKCS1KeyExchangeDeformatter.RSAPKCS1KeyExchangeDeformatter() constructor

```csharp
public RSAPKCS1KeyExchangeDeformatter ();
```

Initializes a new instance of the `RSAPKCS1KeyExchangeDeformatter` class.

#### Remarks
Use `RSAPKCS1KeyExchangeDeformatter.SetKey` to establish the key <example-value> calling `RSAPKCS1KeyExchangeDeformatter.DecryptKeyExchange`.

## RSAPKCS1KeyExchangeDeformatter.RSAPKCS1KeyExchangeDeformatter(AsymmetricAlgorithm) constructor

```csharp
public RSAPKCS1KeyExchangeDeformatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `RSAPKCS1KeyExchangeDeformatter` class with the specified key.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the private key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## RSAPKCS1KeyExchangeDeformatter.Parameters property

```csharp
public override string? Parameters { get; set; }
```

Gets the parameters for the PKCS #1 key exchange.

Returns: An XML string containing the parameters of the PKCS #1 key <example-value> operation.

To be added.

## RSAPKCS1KeyExchangeDeformatter.RNG property

```csharp
public System.Security.Cryptography.RandomNumberGenerator? RNG { get; set; }
```

Gets or sets the random number generator algorithm to use in the creation of the key exchange.

Returns: The instance of a random number generator algorithm to use.

To be added.

## RSAPKCS1KeyExchangeDeformatter.DecryptKeyExchange(Byte[]) method

```csharp
public override byte[] DecryptKeyExchange (byte[] rgbIn);
```

Extracts secret <example-value> from the encrypted key <example-value> data.

Parameters:

- `rgbIn`: The key <example-value> data within which the secret <example-value> is hidden.

Returns: The secret <example-value> derived from the key <example-value> data.

Exceptions:

- `CryptographicUnexpectedOperationException`: The key is missing.

#### Remarks
You must specify a key <example-value> calling this method.

#### Examples
The following example shows how to use the `RSAPKCS1KeyExchangeDeformatter.DecryptKeyExchange` method to recreate an exchange key from a message sender. This code example is part of a larger example provided for the `RSAPKCS1KeyExchangeDeformatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeFormatter/CreateKeyExchange/program.cs._

## RSAPKCS1KeyExchangeDeformatter.SetKey(AsymmetricAlgorithm) method

```csharp
public override void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Sets the private key to use for decrypting the secret information.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the private key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
You must specify a key <example-value> calling `RSAPKCS1KeyExchangeDeformatter.DecryptKeyExchange`.
