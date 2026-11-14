---
title: "ECDiffieHellmanCngPublicKey class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDiffieHellmanCngPublicKey.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDiffieHellmanCngPublicKey class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class ECDiffieHellmanCngPublicKey : System.Security.Cryptography.ECDiffieHellmanPublicKey
```

Specifies an Elliptic Curve Diffie-Hellman (ECDH) public key for use with the `ECDiffieHellmanCng` class.

#### Remarks
`ECDiffieHellmanCngPublicKey` objects are used in key <example-value> with `ECDiffieHellmanCng` objects.

## ECDiffieHellmanCngPublicKey.BlobFormat property

```csharp
public System.Security.Cryptography.CngKeyBlobFormat BlobFormat { get; }
```

Gets the key BLOB format for a `ECDiffieHellmanCngPublicKey` object.

Returns: The format that the key BLOB is expressed in.

To be added.

## ECDiffieHellmanCngPublicKey.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## ECDiffieHellmanCngPublicKey.ExportExplicitParameters() method

```csharp
public override System.Security.Cryptography.ECParameters ExportExplicitParameters ();
```

Exports the key and explicit curve parameters used by the `ECCurve` object into an `ECParameters` object.

Returns: The key and explicit curve parameters used by the `ECCurve` object.

Exceptions:

- `CryptographicException`: The method cannot obtain curve values.
- `PlatformNotSupportedException`: Explicit export is not supported by this platform. Windows 10 or higher is required.

To be added.

## ECDiffieHellmanCngPublicKey.ExportParameters() method

```csharp
public override System.Security.Cryptography.ECParameters ExportParameters ();
```

Exports the key used by the `ECCurve` object into an `ECParameters` object.

Returns: The key and named curve parameters used by the `ECCurve` object.

Exceptions:

- `CryptographicException`: The method cannot obtain curve values.

#### Remarks
If the key was created as a named curve, the `Curve` field contains named curve parameters;          otherwise,  it contains explicit parameters.

## ECDiffieHellmanCngPublicKey.FromByteArray(Byte[], CngKeyBlobFormat) method

```csharp
public static System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value> (byte[] publicKeyBlob, System.Security.Cryptography.CngKeyBlobFormat format);
```

Converts a byte array that contains a public key to a `ECDiffieHellmanCngPublicKey` object according to the specified format.

Parameters:

- `publicKeyBlob`: A byte array that contains an Elliptic Curve Diffie-Hellman (ECDH) public key.
- `format`: An object that specifies the format of the key BLOB.

Returns: An object that contains the ECDH public key that is serialized in the byte array.

Exceptions:

- `ArgumentNullException`: The `publicKeyBlob` or `format` parameter is `null`.
- `ArgumentException`: The `publicKeyBlob` parameter does not contain an `ECDiffieHellman` key.

#### Remarks
This static method is shared among all `ECDiffieHellmanCngPublicKey` instances.

## ECDiffieHellmanCngPublicKey.FromXmlString(String) method

```csharp
public static System.Security.Cryptography.ECDiffieHellmanCngPublicKey <example-value> (string xml);
```

Converts an XML string to an `ECDiffieHellmanCngPublicKey` object.

Parameters:

- `xml`: An XML string that contains an Elliptic Curve Diffie-Hellman (ECDH) key.

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## ECDiffieHellmanCngPublicKey.Import() method

```csharp
public System.Security.Cryptography.CngKey <example-value> ();
```

Converts the `ECDiffieHellmanCngPublicKey` object to a `CngKey` object.

Returns: An object that contains the key <example-value> by the `ECDiffieHellmanCngPublicKey` object.

To be added.

## ECDiffieHellmanCngPublicKey.ToXmlString() method

```csharp
public override string ToXmlString ();
```

Serializes the `ECDiffieHellmanCngPublicKey` public key to an XML string in RFC 4050 format.

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.
