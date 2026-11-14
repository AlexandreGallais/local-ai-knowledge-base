---
title: "DSAOpenSsl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSAOpenSsl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSAOpenSsl class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class DSAOpenSsl : System.Security.Cryptography.DSA
```

Provides an implementation of the Digital Signature Algorithm (DSA) backed by OpenSSL.

#### Remarks

This class should only be used directly when doing platform interop with the system OpenSSL library. When platform interop is not needed, you should use the `DSA.Create` factory methods instead of a specific derived implementation.

> **Important:**
> The creators of the DSA algorithm have withdrawn their support for it. Consider using the `RSA` class or the `ECDsa` class instead of the `DSA` class. Use `DSA` only for compatibility with legacy applications and data.

DSAOpenSSL provides the FIPS 186-3 version of DSA.

## DSAOpenSsl.DSAOpenSsl() constructor

```csharp
public DSAOpenSsl ();
```

Initializes a new instance of the `DSAOpenSsl` class with a default key size of 2048 bits.

Exceptions:

- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

This constructor does not generate a new DSA public/private keypair immediately, it just sets the size that will be used to generate a key when one is needed.
If key is loaded via the `DSAOpenSsl.ImportParameters` method, or other key <example-value> method, the key size from this constructor has no meaning.

## DSAOpenSsl.DSAOpenSsl(Int32) constructor

```csharp
public DSAOpenSsl (int keySize);
```

Initializes a new instance of the `DSAOpenSsl` class with a specified key size.

Exceptions:

- `CryptographicException`: The `keySize` value is not supported by this implementation.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

This constructor does not generate a new DSA public/private keypair immediately, it just sets the size that will be used to generate a key when one is needed.
If key is loaded via the `DSAOpenSsl.ImportParameters` method, or other key <example-value> method, the `keySize` provided to this constructor has no meaning.

## DSAOpenSsl.DSAOpenSsl(IntPtr) constructor

```csharp
public DSAOpenSsl (IntPtr handle);
```

Initializes a new instance of the `DSAOpenSsl` class from an existing OpenSSL key <example-value> as a `DSA*`.

Exceptions:

- `ArgumentException`: `handle` is `IntPtr.Zero`.
- `CryptographicException`: `handle` is not a valid `DSA*`.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

> **Important:**
> OpenSSL supports multiple library versions being loaded within the same process.
> Before calling this constructor, verify your pointer value came from the same version of OpenSSL that this class uses.
> For more information, see `OpenSslVersion`.

## DSAOpenSsl.DSAOpenSsl(DSAParameters) constructor

```csharp
public DSAOpenSsl (System.Security.Cryptography.DSAParameters parameters);
```

Initializes a new instance of the `DSAOpenSsl` class and imports parameters from an existing key.

Exceptions:

- `ArgumentException`: `parameters` is missing required fields.

-or-

`parameters` has fields with inconsistent lengths for a valid key.
- `CryptographicException`: `parameters` does not represent a valid DSA key <example-value> set.
- `PlatformNotSupportedException`: On macOS: In all cases.

To be added.

## DSAOpenSsl.DSAOpenSsl(SafeEvpPKeyHandle) constructor

```csharp
public DSAOpenSsl (System.Security.Cryptography.SafeEvpPKeyHandle pkeyHandle);
```

Initializes a new instance of the `DSAOpenSsl` class from an existing OpenSSL key <example-value> as an `EVP_PKEY*`.

Exceptions:

- `ArgumentException`: `pkeyHandle` represents an invalid handle.
- `ArgumentNullException`: `pkeyHandle` is `null`.
- `CryptographicException`: `pkeyHandle` does not represent a DSA key.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

> **Important:**
> OpenSSL supports multiple library versions being loaded within the same process.
> Before calling this constructor, verify your pointer value came from the same version of OpenSSL that this class uses.
> For more information, see `OpenSslVersion`.

## DSAOpenSsl.KeySize property

```csharp
public override int KeySize { set; }
```

Gets or sets the size, in bits, of the key <example-value> used by the asymmetric algorithm.

Returns: The size, in bits, of the key <example-value> used by the asymmetric algorithm.

Exceptions:

- `CryptographicException`: `value` is not permitted by `DSAOpenSsl.LegalKeySizes`.

#### Remarks

Setting this property to its current value has no visible effect.
Setting this property to a new legal value discards the current key, but defers creation of a new key until one is needed.

## DSAOpenSsl.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by the DSA algorithm.

Returns: An array that contains the key sizes supported by the algorithm.

To be added.

## DSAOpenSsl.CreateSignature(Byte[]) method

```csharp
public override byte[] CreateSignature (byte[] rgbHash);
```

When overridden in a derived class, creates the `DSA` signature for the specified hash value.

Returns: The digital signature for the specified hash value.

Exceptions:

- `ArgumentNullException`: `rgbHash` is `null`.
- `CryptographicException`: This instance represents only a public key.

-or-

An error occurred during signature creation.

To be added.

## DSAOpenSsl.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the resources used by the current instance of the `DSAOpenSsl` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## DSAOpenSsl.DuplicateKeyHandle() method

```csharp
public System.Security.Cryptography.SafeEvpPKeyHandle DuplicateKeyHandle ();
```

Gets a `SafeEvpPKeyHandle` representation of the cryptographic key.

Returns: A `SafeEvpPKeyHandle` representation of the cryptographic key.

#### Remarks

Each call to this method produces a new `SafeEvpPKeyHandle` object with its own lifetime.
The objects returned by this method can safely be used even after this `DSAOpenSsl` instance has been disposed.

## DSAOpenSsl.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.DSAParameters ExportParameters (bool includePrivateParameters);
```

Exports the `DSAParameters` representing this key.

Returns: The DSA parameters for the current cryptographic key.

Exceptions:

- `CryptographicException`: `includePrivateParameters` is `true`, but this instance represents only a DSA public key.

To be added.

## DSAOpenSsl.ImportParameters(DSAParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.DSAParameters parameters);
```

Imports the specified `DSAParameters`.

Exceptions:

- `ArgumentException`: `parameters` is missing required fields.

-or-

`parameters` has fields with inconsistent lengths for a valid key.
- `CryptographicException`: `parameters` does not represent a valid DSA key <example-value> set.

To be added.

## DSAOpenSsl.VerifySignature(Byte[], Byte[]) method

```csharp
public override bool VerifySignature (byte[] rgbHash, byte[] rgbSignature);
```

Verifies if the specified digital signature matches the specified hash.

Returns: `true` if `rgbSignature` matches the signature computed using the specified hash; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `rgbHash` or `rgbSignature` is `null`.

To be added.
