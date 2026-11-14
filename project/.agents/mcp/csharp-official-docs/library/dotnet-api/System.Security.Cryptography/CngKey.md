---
title: "CngKey class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngKey.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngKey class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CngKey : <example-value>
```

Defines the core functionality for keys that are used with Cryptography Next Generation (CNG) objects.

Exceptions:

- `PlatformNotSupportedException`: On Linux and macOS: In all cases.

#### Remarks
This class wraps NCrypt keys, not BCrypt keys. NCrypt is a subset of CNG that provides key <example-value> functionality. BCrypt is a subset that provides base cryptographic services such as random number generation, hash functions, signatures, and encryption keys.

> **Note:**
> CNG classes don't work on non-Windows platforms.

## CngKey.Algorithm property

```csharp
public System.Security.Cryptography.CngAlgorithm Algorithm { get; }
```

Gets the algorithm that is used by the key.

Returns: An object that specifies the name of an encryption algorithm.

To be added.

## CngKey.AlgorithmGroup property

```csharp
public System.Security.Cryptography.CngAlgorithmGroup? AlgorithmGroup { get; }
```

Gets the algorithm group that is used by the key.

Returns: An object that specifies the name of an encryption algorithm group.

To be added.

## CngKey.ExportPolicy property

```csharp
public System.Security.Cryptography.CngExportPolicies ExportPolicy { get; }
```

Gets the export policy that is used by the key.

Returns: An object that specifies the export policy for the key.

#### Remarks
The export policy controls the export frequency and format for the key.

## CngKey.Handle property

```csharp
public Microsoft.Win32.SafeHandles.SafeNCryptKeyHandle Handle { get; }
```

Gets a safe handle that represents a native key (NCRYPT_KEY_HANDLE).

Returns: A safe handle that represents the key.

#### Remarks
The returned handle is a duplicate of the handle in the current `CngKey` object. It will persist even if the current `CngKey` is disposed, and must be disposed of separately.

You can release the current object and the handle in any order without any adverse effects.

## CngKey.IsEphemeral property

```csharp
public bool IsEphemeral { get; }
```

Gets the persistence state of the key.

Returns: `true` if the key is ephemeral; otherwise, `false`.

#### Remarks
This property determines whether the key is ephemeral (that is, the key <example-value> only for the lifetime of the handle), or persisted (that is, the key <example-value> independently of the handle).

The return value depends on the method that is used to obtain the key:

- If the key was not opened by the `Open` method overload, the common language runtime (CLR) is managing the key and can determine whether it is ephemeral.

- If the key was opened by the `Open` method overload, the CLR cannot determine whether it is ephemeral. Therefore, the key is assumed to be persisted. However, if this method is used to open a handle to a key that is created by the CLR, the CLR will be able to determine whether it is ephemeral.

This property does not have a public setter; it is read-only.

## CngKey.IsMachineKey <example-value>

```csharp
public bool IsMachineKey { get; }
```

Gets the scope (machine or user) of the key.

Returns: `true` if the key is available on a machine-wide basis; `false` if the key is only for the current user.

To be added.

## CngKey.KeyName property

```csharp
public string? KeyName { get; }
```

Gets the name of the key.

Returns: The name of the key. If the key is ephemeral, the value is `null`.

To be added.

## CngKey.KeySize property

```csharp
public int KeySize { get; }
```

Gets the key size in bits.

Returns: The key size in bits.

To be added.

## CngKey.KeyUsage property

```csharp
public System.Security.Cryptography.CngKeyUsages KeyUsage { get; }
```

Gets the cryptographic operations specified by the key.

Returns: A bitwise combination of the enumeration values that specify the usages allowed for the key.

To be added.

## CngKey.ParentWindowHandle property

```csharp
public IntPtr ParentWindowHandle { get; set; }
```

Gets or sets the window handle (HWND) that should be used for user interface (UI) prompts caused by accessing the key.

Returns: The parent window handle for the key.

#### Remarks
The parent window handle for the key is used in UI prompts, such as smart card PIN prompts. This value is not persisted with persisted keys.

We recommend that you always set this property for keys that display a user interface. Do not use the default value of `null` for such keys.

## CngKey.Provider property

```csharp
public System.Security.Cryptography.CngProvider? Provider { get; }
```

Gets the key <example-value> provider (KSP) that manages the key.

Returns: The KSP that manages the key.

To be added.

## CngKey.ProviderHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafeNCryptProviderHandle ProviderHandle { get; }
```

Gets a native handle (an NCRYPT_PROV_HANDLE) to the key <example-value> provider (KSP).

Returns: A handle to the KSP.

#### Remarks
The returned handle is a duplicate of the handle in the current `CngKey` object. It will persist even if the current `CngKey` is disposed, and must be disposed of separately.

You can release the current object and the handle in any order without any adverse effects.

## CngKey.UIPolicy property

```csharp
public System.Security.Cryptography.CngUIPolicy UIPolicy { get; }
```

Gets parameters that control the user interface (UI) for accessing the key.

Returns: An object that contains configuration parameters for displaying the UI.

#### Remarks
The key UI policy is used with UI prompts such as smart card PIN prompts. This policy also controls password <example-value> boxes for protected keys.

## CngKey.UniqueName property

```csharp
public string? UniqueName { get; }
```

Gets the unique name for the key.

Returns: An alternate name for the key. If the key is ephemeral, the value is `null`.

#### Remarks
This property gets an alternate name that can be used when accessing the key. You can use this property if the original key name does not uniquely identify the persisted key. The `MicrosoftSoftwareKeyStorageProvider` property will return the file name of the key as this property. The name returned by the `CngProvider.MicrosoftSmartCardKeyStorageProvider` is implementation-dependent.

## CngKey.Create(CngAlgorithm) method

```csharp
public static System.Security.Cryptography.CngKey <example-value> (System.Security.Cryptography.CngAlgorithm algorithm);
```

Creates a `CngKey` object that can be used with the specified algorithm.

Parameters:

- `algorithm`: The algorithm that the key will be used with.

Returns: An ephemeral key.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
This overload creates a key <example-value> a name, which means that the key is ephemeral (that is, it will not be persisted). It also creates a default `CngKeyCreationParameters` object that specifies a default `CngProvider` and other advanced parameters for the key.

## CngKey.Create(CngAlgorithm, String) method

```csharp
public static System.Security.Cryptography.CngKey <example-value> (System.Security.Cryptography.CngAlgorithm algorithm, string? keyName);
```

Creates a named `CngKey` object that provides the specified algorithm.

Parameters:

- `algorithm`: The algorithm that the key will be used with.
- `keyName`: The key name. If a name is not provided, the key will not be persisted.

Returns: A persisted or ephemeral key that provides the specified algorithm.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
If `keyName` is provided, this overload creates a persisted key. If `keyName` is not provided, the key will be ephemeral. This overload also creates a default `CngKeyCreationParameters` object that specifies a default `CngProvider` and other advanced parameters for the key.

## CngKey.Create(CngAlgorithm, String, CngKeyCreationParameters) method

```csharp
public static System.Security.Cryptography.CngKey <example-value> (System.Security.Cryptography.CngAlgorithm algorithm, string? keyName, System.Security.Cryptography.CngKeyCreationParameters? creationParameters);
```

Creates a named `CngKey` object that provides the specified algorithm, using the supplied key <example-value> parameters.

Parameters:

- `algorithm`: The algorithm that the key will be used with.
- `keyName`: The key name. If a name is not provided, the key will not be persisted.
- `creationParameters`: An object that specifies advanced parameters for the method, including the `CngProvider`.

Returns: A persisted or ephemeral key that provides the specified algorithm.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
If `keyName` is provided, this overload creates a persisted key. If `keyName` is not provided, the key will be ephemeral.

## CngKey.Delete() method

```csharp
public void Delete ();
```

Removes the key that is associated with the object.

Exceptions:

- `ObjectDisposedException`: An attempt was made to access a deleted key.
- `CryptographicException`: All other errors.

#### Remarks

- When you call the `CngKey.Delete` method on an ephemeral key, it closes the handle to the key.

When you call the `CngKey.Delete` method on a named key, the `CngKey` object can no longer be used after the named key is deleted.

## CngKey.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `CngKey` class.

#### Remarks
Call `CngKey.Dispose` when you are finished using the `CngKey`. The `CngKey.Dispose` method leaves the `CngKey` in an unusable state. After calling `CngKey.Dispose`, you must release all references to the `CngKey` so the garbage collector can reclaim the memory that the `CngKey` was occupying. For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `CngKey.Dispose` before you release your last reference to the `CngKey`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `CngKey` object's `Finalize` method.

## CngKey.Exists(String) method

```csharp
public static bool Exists (string keyName);
```

Checks to see whether a named key <example-value> in the default key <example-value> provider (KSP).

Parameters:

- `keyName`: The key name.

Returns: `true` if the named key <example-value> in the default KSP; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `keyName` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
The default KSP is `CngProvider.MicrosoftSoftwareKeyStorageProvider`.

## CngKey.Exists(String, CngProvider) method

```csharp
public static bool Exists (string keyName, System.Security.Cryptography.CngProvider provider);
```

Checks to see whether a named key <example-value> in the specified key <example-value> provider (KSP).

Parameters:

- `keyName`: The key name.
- `provider`: The KSP to check for the key.

Returns: `true` if the named key <example-value> in the specified provider; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `keyName` or `provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
Use this overload to check for the existence of a key in a KSP other than the default KSP, which is `CngProvider.MicrosoftSoftwareKeyStorageProvider`.

## CngKey.Exists(String, CngProvider, CngKeyOpenOptions) method

```csharp
public static bool Exists (string keyName, System.Security.Cryptography.CngProvider provider, System.Security.Cryptography.CngKeyOpenOptions options);
```

Checks to see whether a named key <example-value> in the specified key <example-value> provider (KSP), according to the specified options.

Parameters:

- `keyName`: The key name.
- `provider`: The KSP to search for the key.
- `options`: A bitwise combination of the enumeration values that specify options for opening a key.

Returns: `true` if the named key <example-value> in the specified provider; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `keyName` or `provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
Use this overload to check for the existence of a key in a KSP other than the default `CngProvider.MicrosoftSoftwareKeyStorageProvider`, and to specify key open options.

## CngKey.Export(CngKeyBlobFormat) method

```csharp
public byte[] Export (System.Security.Cryptography.CngKeyBlobFormat format);
```

Exports the key <example-value> into a BLOB, in the specified format.

Parameters:

- `format`: An object that specifies the format of the key BLOB.

Returns: A BLOB that contains the key <example-value> in the specified format.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `CryptographicException`: All other errors. Typically, the `CngKey.ExportPolicy` does not allow the key to be exported.

#### Remarks
Cryptography Next Generation (CNG) allows export in any format that the underlying key <example-value> provider (KSP) supports. For example, on Windows Vista,the default KSP (which is `CngProvider.MicrosoftSoftwareKeyStorageProvider`) only allows export of private keys in the `CngKeyBlobFormat.Pkcs8PrivateBlob`, `CngKeyBlobFormat.EccPrivateBlob`, and `CngKeyBlobFormat.OpaqueTransportBlob` formats. This restriction is controlled by the underlying KSP. If you use a different KSP, other formats may apply.
