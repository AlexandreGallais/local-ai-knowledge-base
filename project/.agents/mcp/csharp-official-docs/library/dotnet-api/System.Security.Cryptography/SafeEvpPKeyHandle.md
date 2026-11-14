---
title: "SafeEvpPKeyHandle class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SafeEvpPKeyHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SafeEvpPKeyHandle class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class SafeEvpPKeyHandle : System.Runtime.InteropServices.SafeHandle
```

Represents the `EVP_PKEY*` pointer type from OpenSSL.

Exceptions:

- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

Before using `SafeEvpPKeyHandle` to perform interop with OpenSSL a caller must ensure that the version of OpenSSL they are calling is the same as the version the .NET runtime is calling, and not a side-by-side version. The version of OpenSSL that the runtime is calling can be determined by `OpenSslVersion`.

## SafeEvpPKeyHandle.SafeEvpPKeyHandle() constructor

```csharp
public SafeEvpPKeyHandle ();
```

Initializes a new instance of the `SafeEvpPKeyHandle` class, representing an invalid handle.

To be added.

## SafeEvpPKeyHandle.SafeEvpPKeyHandle(IntPtr, Boolean) constructor

```csharp
public SafeEvpPKeyHandle (IntPtr handle, bool ownsHandle);
```

Initializes a new instance of the `SafeEvpPKeyHandle` class with the specified handle value.

Parameters:

- `handle`: The handle value to represent.
- `ownsHandle`: `true` to reliably let `SafeEvpPKeyHandle` release the handle during the finalization phase; otherwise, `false` (not recommended).

To be added.

## SafeEvpPKeyHandle.IsInvalid property

```csharp
public override bool IsInvalid { get; }
```

Gets a value indicating whether the handle value is invalid.

Returns: `true` if the handle value is invalid; otherwise, `false`.

To be added.

## SafeEvpPKeyHandle.OpenSslVersion property

```csharp
public static long OpenSslVersion { get; }
```

Gets a value representing the version number as reported by the loaded version of OpenSSL.

Returns: A value representing the version number as reported by the loaded version of OpenSSL.

#### Remarks

Before using `SafeEvpPKeyHandle` to perform interop with OpenSSL a caller must ensure that the version of OpenSSL they are calling is the same as the version the .NET runtime is calling, and not a side-by-side version.

For OpenSSL 1.1.0 and newer, this value is reported from the `OpenSSL_version_num()` function. When an older version of OpenSSL is in use, this value is reported from the `SSLeay()` function.

Callers are encouraged to only perform an equality check with this value.

## SafeEvpPKeyHandle.DuplicateHandle() method

```csharp
public System.Security.Cryptography.SafeEvpPKeyHandle DuplicateHandle ();
```

Creates another instance of this type which has an independent lifetime but tracks the same resource.

Returns: Another instance of this type which has an independent lifetime but tracks the same resource.

Exceptions:

- `InvalidOperationException`: This handle is invalid.

In .NET 8 and earlier versions, this method creates a new `EVP_PKEY` instance. In .NET 9 and later versions, this method increments the reference count of the existing `EVP_PKEY` instance and returns a handle to the same key.

## SafeEvpPKeyHandle.OpenKeyFromProvider(String, String) method

```csharp
public static System.Security.Cryptography.SafeEvpPKeyHandle OpenKeyFromProvider (string providerName, string keyUri);
```

Opens a named key using a named
```csharp
OSSL_PROVIDER
```
.

Parameters:

- `providerName`: The name of the
```csharp
OSSL_PROVIDER
```
to process the key open request.
- `keyUri`: The URI assigned by the
```csharp
OSSL_PROVIDER
```
of the key to open.

Returns: The opened key.

Exceptions:

- `ArgumentNullException`: `providerName` or `keyUri` is `null`.
- `ArgumentException`: `providerName` or `keyUri` is the empty string.
- `PlatformNotSupportedException`: The current platform does not support OpenSSL Providers.
- `CryptographicException`: The key could not be opened via the specified named
```csharp
OSSL_PROVIDER
```
.

Both `providerName` and `keyUri` must be trusted inputs.

This operation will fail if OpenSSL cannot successfully load the named
```csharp
OSSL_PROVIDER
```
, or if the named
```csharp
OSSL_PROVIDER
```
cannot load the named key.

The syntax for `keyUri` is determined by each individual named
```csharp
OSSL_PROVIDER
```
.

## SafeEvpPKeyHandle.OpenKeyFromProvider(String>, String, String) method

```csharp
public static System.Security.Cryptography.SafeEvpPKeyHandle OpenKeyFromProvider (System.Collections.Generic.IEnumerable<string> providerNames, string keyUri, string? propertyQuery = default);
```

To be added.

Parameters:

- `providerNames`: To be added.
- `keyUri`: To be added.
- `propertyQuery`: To be added.

Returns: To be added.

To be added.

## SafeEvpPKeyHandle.OpenPrivateKeyFromEngine(String, String) method

```csharp
public static System.Security.Cryptography.SafeEvpPKeyHandle OpenPrivateKeyFromEngine (string engineName, string keyId);
```

Open a named private key using a named OpenSSL
```csharp
ENGINE
```
.

Parameters:

- `engineName`: The name of the
```csharp
ENGINE
```
to process the private key open request.
- `keyId`: The name of the key to open.

Returns: The opened key.

Exceptions:

- `ArgumentNullException`: `engineName` or `keyId` is `null`.
- `ArgumentException`: `engineName` or `keyId` is the empty string.
- `CryptographicException`: the key could not be opened via the specified ENGINE.

This operation will fail if OpenSSL cannot successfully load the named
```csharp
ENGINE
```
, or if the named
```csharp
ENGINE
```
cannot load the named key.

Not all
```csharp
ENGINE
```
s support loading private keys.

The syntax for `keyId` is determined by each individual
```csharp
ENGINE
```
.

## SafeEvpPKeyHandle.OpenPublicKeyFromEngine(String, String) method

```csharp
public static System.Security.Cryptography.SafeEvpPKeyHandle OpenPublicKeyFromEngine (string engineName, string keyId);
```

Open a named public key using a named OpenSSL
```csharp
ENGINE
```
.

Parameters:

- `engineName`: The name of the
```csharp
ENGINE
```
to process the public key open request.
- `keyId`: The name of the key to open.

Returns: The opened key.

Exceptions:

- `ArgumentNullException`: `engineName` or `keyId` is `null`.
- `ArgumentException`: `engineName` or `keyId` is the empty string.
- `CryptographicException`: the key could not be opened via the specified ENGINE.

This operation will fail if OpenSSL cannot successfully load the named
```csharp
ENGINE
```
, or if the named
```csharp
ENGINE
```
cannot load the named key.

Not all
```csharp
ENGINE
```
s support loading public keys, even ones that support loading private keys.

The syntax for `keyId` is determined by each individual
```csharp
ENGINE
```
.

## SafeEvpPKeyHandle.ReleaseHandle() method

```csharp
protected override bool ReleaseHandle ();
```

Executes the code required to free the handle.

Returns: `true` in all cases.

To be added.
