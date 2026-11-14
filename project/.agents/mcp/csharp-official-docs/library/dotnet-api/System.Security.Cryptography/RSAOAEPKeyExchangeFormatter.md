---
title: "RSAOAEPKeyExchangeFormatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAOAEPKeyExchangeFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAOAEPKeyExchangeFormatter class

Namespace: `System.Security.Cryptography`

```csharp
public class RSAOAEPKeyExchangeFormatter : System.Security.Cryptography.AsymmetricKeyExchangeFormatter
```

Creates Optimal Asymmetric Encryption Padding (OAEP) key <example-value> data using `RSA`.

#### Remarks
Key <example-value> allows a sender to create secret <example-value>, for example, random data that can be used as a key in a symmetric encryption algorithm, and use encryption to send it to the intended recipient.

Use `RSAOAEPKeyExchangeDeformatter` to receive the key <example-value> and extract the secret <example-value> from it.

> **Caution:**
>  It is highly recommended that you not attempt to create your own key <example-value> method from the basic <example-value> provided, because many details of the operation must be performed carefully in order for the key <example-value> to be successful.

#### Examples
The following example shows how to use the `RSAOAEPKeyExchangeFormatter` class to create an exchange key for a message recipient.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter/Overview/program.cs._

## RSAOAEPKeyExchangeFormatter.RSAOAEPKeyExchangeFormatter() constructor

```csharp
public RSAOAEPKeyExchangeFormatter ();
```

Initializes a new instance of the `RSAOAEPKeyExchangeFormatter` class.

#### Remarks
Use `RSAOAEPKeyExchangeFormatter.SetKey` to set the key <example-value> calling `RSAOAEPKeyExchangeFormatter.CreateKeyExchange`.

## RSAOAEPKeyExchangeFormatter.RSAOAEPKeyExchangeFormatter(AsymmetricAlgorithm) constructor

```csharp
public RSAOAEPKeyExchangeFormatter (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `RSAOAEPKeyExchangeFormatter` class with the specified key.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the public key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## RSAOAEPKeyExchangeFormatter.Parameter property

```csharp
public byte[]? Parameter { get; set; }
```

Gets or sets the parameter used to create padding in the key <example-value> creation process.

Returns: The parameter value.

#### Examples
The following code example demonstrates how to set the `Parameter` property to an `InverseQ` field. This code example is part of a larger example provided for the `RSAOAEPKeyExchangeFormatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter/Parameters/rsaencoder.cs._

## RSAOAEPKeyExchangeFormatter.Parameters property

```csharp
public override string? Parameters { get; }
```

Gets the parameters for the Optimal Asymmetric Encryption Padding (OAEP) key exchange.

Returns: An XML string containing the parameters of the OAEP key <example-value> operation.

#### Examples
The following code example demonstrates how to call the `Parameters` property to retrieve an XML representation of the parameters. This code example is part of a larger example provided for the `RSAOAEPKeyExchangeFormatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter/Parameters/rsaencoder.cs._

## RSAOAEPKeyExchangeFormatter.Rng property

```csharp
public System.Security.Cryptography.RandomNumberGenerator? Rng { get; set; }
```

Gets or sets the random number generator algorithm to use in the creation of the key exchange.

Returns: The instance of a random number generator algorithm to use.

#### Remarks
If this property is `null`, the default random number generator algorithm is used.

#### Examples
The following code example demonstrates how to set the `Rng` property to a random number. This code example is part of a larger example provided for the `RSAOAEPKeyExchangeFormatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter/Parameters/rsaencoder.cs._

## RSAOAEPKeyExchangeFormatter.CreateKeyExchange(Byte[]) method

```csharp
public override byte[] CreateKeyExchange (byte[] rgbData);
```

Creates the encrypted key <example-value> data from the specified input data.

Parameters:

- `rgbData`: The secret <example-value> to be passed in the key exchange.

Returns: The encrypted key <example-value> data to be sent to the intended recipient.

Exceptions:

- `CryptographicUnexpectedOperationException`: The key is missing.

#### Remarks
This data can be interpreted only by the holder of the private key <example-value> to the public key used to encrypt the data. This helps to ensure that only the intended recipient can access the secret information.

## RSAOAEPKeyExchangeFormatter.CreateKeyExchange(Byte[], Type) method

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
The following example shows how to use the `RSAOAEPKeyExchangeFormatter.CreateKeyExchange` method to create an exchange key for a message recipient. This code example is part of a larger example provided for the `RSAOAEPKeyExchangeFormatter` class

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeFormatter/CreateKeyExchange/program.cs._

## RSAOAEPKeyExchangeFormatter.SetKey(AsymmetricAlgorithm) method

```csharp
public override void SetKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Sets the public key to use for encrypting the key <example-value> data.

Parameters:

- `key`: The instance of the `RSA` algorithm that holds the public key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
You must set the key <example-value> calling `RSAOAEPKeyExchangeFormatter.CreateKeyExchange`.

#### Examples
The following code example demonstrates how to use the `RSAOAEPKeyExchangeFormatter.SetKey` method to set an `RSA` key for decryption. This code example is part of a larger example provided for the `RSAOAEPKeyExchangeFormatter` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSAOAEPKeyExchangeDeformatter/Parameters/rsaencoder.cs._
