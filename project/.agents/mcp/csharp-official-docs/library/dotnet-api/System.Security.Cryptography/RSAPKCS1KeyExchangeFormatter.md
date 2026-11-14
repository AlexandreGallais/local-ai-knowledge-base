---
title: "RSAPKCS1KeyExchangeFormatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAPKCS1KeyExchangeFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAPKCS1KeyExchangeFormatter class

Namespace: `System.Security.Cryptography`

```csharp
public class RSAPKCS1KeyExchangeFormatter : System.Security.Cryptography.AsymmetricKeyExchangeFormatter
```

Creates the PKCS#1 key <example-value> data using `RSA`.

#### Remarks
Key <example-value> allows a sender to create secret <example-value> (such as random data that can be used as a key in a symmetric encryption algorithm) and use encryption to send it to the intended recipient.

Use `RSAPKCS1KeyExchangeDeformatter` to receive the key <example-value> and extract the secret <example-value> from it.

> **Caution:**
>  We recommend that you do not attempt to create your own key <example-value> method from the basic <example-value> provided, because many details of the operation must be performed carefully in order for the key <example-value> to be successful.

#### Examples
The following example shows how to use the `RSAPKCS1KeyExchangeFormatter` class to create an exchange key for a message recipient.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeFormatter/CreateKeyExchange/program.cs._

## RSAPKCS1KeyExchangeFormatter.RSAPKCS1KeyExchangeFormatter() constructor

```csharp
public RSAPKCS1KeyExchangeFormatter ();
```

Initializes a new instance of the `RSAPKCS1KeyExchangeFormatter` class.

#### Remarks
Use `RSAPKCS1KeyExchangeFormatter.SetKey` method to set the key to be used for key <example-value> before calling `RSAPKCS1KeyExchangeFormatter.CreateKeyExchange`.

## RSAPKCS1KeyExchangeFormatter.RSAPKCS1KeyExchangeFormatter(AsymmetricAlgorithm) constructor

```csharp
public RSAPKCS1KeyExchangeFormatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `RSAPKCS1KeyExchangeFormatter` class with the specified key.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the public key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## RSAPKCS1KeyExchangeFormatter.Parameters property

```csharp
public override string Parameters { get; }
```

Gets the parameters for the PKCS #1 key exchange.

Returns: An XML string containing the parameters of the PKCS #1 key <example-value> operation.

#### Remarks
The `Parameters` property returns an XML string that contains Uniform Resource Identifiers (URIs) that describe the parameters of the PKCS #1 key <example-value> operation.  Note that the URIs are not guaranteed to point to active addresses.

## RSAPKCS1KeyExchangeFormatter.Rng property

```csharp
public System.Security.Cryptography.RandomNumberGenerator? Rng { get; set; }
```

Gets or sets the random number generator algorithm to use in the creation of the key exchange.

Returns: The instance of a random number generator algorithm to use.

#### Remarks
If this property is `null`, the default random number generator algorithm is used.

## RSAPKCS1KeyExchangeFormatter.CreateKeyExchange(Byte[]) method

```csharp
public override byte[] CreateKeyExchange (byte[] rgbData);
```

Creates the encrypted key <example-value> data from the specified input data.

Parameters:

- `rgbData`: The secret <example-value> to be passed in the key exchange.

Returns: The encrypted key <example-value> data to be sent to the intended recipient.

Exceptions:

- `CryptographicException`: `rgbData` is too big.
- `CryptographicUnexpectedOperationException`: The key is `null`.

#### Remarks
This data can be interpreted only by the holder of the private key <example-value> to the public key used to encrypt the data. This helps to ensure that only the intended recipient can access the secret information.

## RSAPKCS1KeyExchangeFormatter.CreateKeyExchange(Byte[], Type) method

```csharp
public override byte[] CreateKeyExchange (byte[] rgbData, Type? symAlgType);
```

Creates the encrypted key <example-value> data from the specified input data.

Parameters:

- `rgbData`: The secret <example-value> to be passed in the key exchange.
- `symAlgType`: This parameter is not used in the current version.

Returns: The encrypted key <example-value> data to be sent to the intended recipient.

#### Remarks
This data can be interpreted only by the holder of the private key <example-value> to the public key used to encrypt the data. This helps to ensure that only the intended recipient can access the secret information.

#### Examples
The following example shows how to use the `RSAPKCS1KeyExchangeFormatter.CreateKeyExchange` method to create an exchange key for a message recipient. This code example is part of a larger example provided for the `RSAPKCS1KeyExchangeFormatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeFormatter/CreateKeyExchange/program.cs._

## RSAPKCS1KeyExchangeFormatter.SetKey(AsymmetricAlgorithm) method

```csharp
public override void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Sets the public key to use for encrypting the key <example-value> data.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the public key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
You must set the key <example-value> calling `RSAPKCS1KeyExchangeFormatter.CreateKeyExchange`.
