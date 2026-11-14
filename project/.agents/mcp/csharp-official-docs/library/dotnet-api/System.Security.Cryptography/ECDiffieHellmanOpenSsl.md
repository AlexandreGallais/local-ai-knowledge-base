---
title: "ECDiffieHellmanOpenSsl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDiffieHellmanOpenSsl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDiffieHellmanOpenSsl class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class ECDiffieHellmanOpenSsl : System.Security.Cryptography.ECDiffieHellman
```

Provides an implementation of the Elliptic Curve Diffie-Hellman (ECDH) algorithm backed by OpenSSL.

#### Remarks

This class should only be used directly when doing platform interop with the system OpenSSL library. When platform interop is not needed, you should use the `ECDiffieHellman.Create` factory methods instead of a specific derived implementation.

## ECDiffieHellmanOpenSsl.ECDiffieHellmanOpenSsl() constructor

```csharp
public ECDiffieHellmanOpenSsl ();
```

Initializes a new instance of the `ECDiffieHellmanOpenSsl` class with a default curve of NIST P-521/secp521r1.

Exceptions:

- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

This constructor does not generate a new public/private keypair immediately, it just sets the size that will be used to generate a key when one is needed.
If key is loaded via the `ECDiffieHellmanOpenSsl.ImportParameters` method, or other key <example-value> method, the key size from this constructor has no meaning.

## ECDiffieHellmanOpenSsl.ECDiffieHellmanOpenSsl(Int32) constructor

```csharp
public ECDiffieHellmanOpenSsl (int keySize);
```

Initializes a new instance of the `ECDiffieHellmanOpenSsl` class defaulting to the NIST prime curve of the specified size.

Parameters:

- `keySize`: The size of the key to generate, when a key is needed.

Exceptions:

- `CryptographicException`: The `keySize` value is not supported by this implementation.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

Only three key sizes are supported by this constructor: 256 (NIST P-256/secp256r1), 384 (NIST P-384/secp384r1), and 521 (NIST P-521/secp521r1).
To generate keys For any other curve, use the `%23ctor` constructor
or the `GenerateKey` method.

This constructor does not generate a new public/private keypair immediately, it just sets the size that will be used to generate a key when one is needed.
If key is loaded via the `ECDiffieHellmanOpenSsl.ImportParameters` method, or other key <example-value> method, the key size from this constructor has no meaning.

## ECDiffieHellmanOpenSsl.ECDiffieHellmanOpenSsl(IntPtr) constructor

```csharp
public ECDiffieHellmanOpenSsl (IntPtr handle);
```

Initializes a new instance of the `ECDiffieHellmanOpenSsl` class from an existing OpenSSL key <example-value> as an `EC_KEY*`.

Parameters:

- `handle`: The OpenSSL `EC_KEY*` value to use as the key.

Exceptions:

- `ArgumentException`: `handle` is `IntPtr.Zero`.
- `CryptographicException`: `handle` is not a valid `EC_KEY*`.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

> **Important:**
> OpenSSL supports multiple library versions being loaded within the same process. Before calling this constructor, verify your pointer value came from the same version of OpenSSL that this class uses. For more information, see `OpenSslVersion`.

## ECDiffieHellmanOpenSsl.ECDiffieHellmanOpenSsl(ECCurve) constructor

```csharp
public ECDiffieHellmanOpenSsl (System.Security.Cryptography.ECCurve curve);
```

Initializes a new instance of the `ECDiffieHellmanOpenSsl` class and generates a new key on the specified curve.

Parameters:

- `curve`: The curve used to generate an ephemeral public/private key pair.

Exceptions:

- `CryptographicException`: `curve` does not validate.
- `PlatformNotSupportedException`: On macOS: In all cases.

To be added.

## ECDiffieHellmanOpenSsl.ECDiffieHellmanOpenSsl(SafeEvpPKeyHandle) constructor

```csharp
public ECDiffieHellmanOpenSsl (System.Security.Cryptography.SafeEvpPKeyHandle pkeyHandle);
```

Initializes a new instance of the `ECDiffieHellmanOpenSsl` class from an existing OpenSSL key <example-value> as an `EVP_PKEY*`.

Parameters:

- `pkeyHandle`: The OpenSSL `EVP_PKEY*` value to use as the key, represented as a `SafeEvpPKeyHandle`.

Exceptions:

- `ArgumentException`: `pkeyHandle` represents an invalid handle.
- `ArgumentNullException`: `pkeyHandle` is `null`.
- `CryptographicException`: `pkeyHandle` does not represent a elliptic curve (EC) key.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks
> **Important:**
> OpenSSL supports multiple library versions being loaded within the same process. Before calling this constructor, verify your pointer value came from the same version of OpenSSL that this class uses. For more information, see `OpenSslVersion`.

## ECDiffieHellmanOpenSsl.PublicKey <example-value>

```csharp
public override System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value> { get; }
```

Gets the public key that can be used by another `ECDiffieHellman` object to generate a shared secret agreement.

Returns: The public key that is associated with this instance of the `ECDiffieHellmanOpenSsl` object.

To be added.

## ECDiffieHellmanOpenSsl.DuplicateKeyHandle() method

```csharp
public System.Security.Cryptography.SafeEvpPKeyHandle DuplicateKeyHandle ();
```

Gets a `SafeEvpPKeyHandle` representation of the cryptographic key.

Returns: A `SafeEvpPKeyHandle` representation of the cryptographic key.

#### Remarks

Each call to this method produces a new `SafeEvpPKeyHandle` object with its own lifetime.
The objects returned by this method can safely be used even after this `ECDiffieHellmanOpenSsl` instance has been disposed.

## ECDiffieHellmanOpenSsl.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.ECParameters ExportParameters (bool includePrivateParameters);
```

Exports the key used by the `ECCurve` object into an `ECParameters` object.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The key and named curve parameters used by the `ECCurve` object.

Exceptions:

- `CryptographicException`: The method cannot obtain curve values.

#### Remarks
If the key was created as a named curve, the `Curve` field contains named curve parameters; otherwise,  it contains explicit parameters.

## ECDiffieHellmanOpenSsl.ImportParameters(ECParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.ECParameters parameters);
```

Imports the specified parameters for an `ECCurve` object as a key into the current instance.

Parameters:

- `parameters`: The curve's parameters to import.

Exceptions:

- `CryptographicException`: `parameters` does not validate.
- `NotSupportedException`: `parameters` references a curve that cannot be imported.
- `PlatformNotSupportedException`: `parameters` references a curve that is not supported by this platform.

#### Remarks
The `ECDiffieHellmanCng.ImportParameters` method replaces the existing key that this object is working with by creating a         new `CngKey` object. If `parameters` contains only the `Q` field, then only a public key is imported.         If `parameters` also contains `D`, then a full key pair is be imported. The `parameter` `Curve` value specifies the type of the curve to import.
