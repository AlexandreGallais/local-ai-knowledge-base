---
title: "CngKey class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngKey.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngKey class (part 2 of 2)

## CngKey.GetProperty(String, CngPropertyOptions) method

```csharp
public System.Security.Cryptography.CngProperty GetProperty (string name, System.Security.Cryptography.CngPropertyOptions options);
```

Gets a property, given a name and a set of property options.

Parameters:

- `name`: The name of the desired property.
- `options`: A bitwise combination of the enumeration values that specify options for the named property.

Returns: An object that contains the raw value of the specified property.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `CryptographicException`: All other errors.

#### Remarks
The purpose of this method is to return the value of an arbitrary property of the key. The typical way to retrieve properties is by using the property accessors provided by the `CngKey` class. `CngKey` provides wrappers for several, but not all, properties. The `CngKey.GetProperty` method is primarily used to access the value of a property that is not wrapped.

This method is useful in the following cases:

- A new version of the operating system supports a new Cryptography Next Generation (CNG) key <example-value> that does not have a wrapper.

- You add a custom property to the key.

The `options` parameter is specifically used to indicate the following:

- Whether the property is built-in, or custom.

- Whether the property should be persisted with the key.

These options must match the value that the property was set with, or the property will not be found.

`CryptographicException` is thrown if the property cannot be found. You should call the `CngKey.HasProperty` method first to avoid the exception instead of wrapping the method call in a `try/catch` block.

## CngKey.HasProperty(String, CngPropertyOptions) method

```csharp
public bool HasProperty (string name, System.Security.Cryptography.CngPropertyOptions options);
```

Checks to see whether the specified property exists on the key.

Parameters:

- `name`: The property name to check.
- `options`: A bitwise combination of the enumeration values that specify options for the named property.

Returns: `true` if the specified property is found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
The `options` parameter is specifically used to indicate the following:

- Whether the property is built-in, or custom.

- Whether the property should be persisted with the key.

These options must match the value that the property was set with, or the property will not be found.

This method operates correctly even if the property is set to `false` or zero.

## CngKey.Import(Byte[], CngKeyBlobFormat) method

```csharp
public static System.Security.Cryptography.CngKey <example-value> (byte[] keyBlob, System.Security.Cryptography.CngKeyBlobFormat format);
```

Creates a new key by importing the specified key <example-value> into the default key <example-value> provider (KSP) and using the specified format.

Parameters:

- `keyBlob`: An array that contains the key information.
- `format`: An object that specifies the format of the `keyBlob` array.

Returns: A new key.

Exceptions:

- `ArgumentNullException`: `keyBlob` or `format` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
The default KSP is `CngProvider.MicrosoftSoftwareKeyStorageProvider`.

> **Important:**
>  On Windows operating systems before Windows 7 and Windows Server 2008 R2, some CNG key <example-value> large object (BLOB) formats are not supported.

## CngKey.Import(Byte[], CngKeyBlobFormat, CngProvider) method

```csharp
public static System.Security.Cryptography.CngKey <example-value> (byte[] keyBlob, System.Security.Cryptography.CngKeyBlobFormat format, System.Security.Cryptography.CngProvider provider);
```

Creates a new key by importing the specified key <example-value> into the specified key <example-value> provider (KSP), using the specified format.

Parameters:

- `keyBlob`: An array that contains the key information.
- `format`: An object that specifies the format of the `keyBlob` array.
- `provider`: The KSP.

Returns: A new key.

Exceptions:

- `ArgumentNullException`: `keyBlob`, `format`, or `provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks

> **Important:**
>  On Windows operating systems before Windows 7 and Windows Server 2008 R2, some CNG key <example-value> large object (BLOB) formats are not supported.

## CngKey.Open(String) method

```csharp
public static System.Security.Cryptography.CngKey Open (string keyName);
```

Creates an instance of an `CngKey` object that represents an existing named key.

Parameters:

- `keyName`: The name of the key.

Returns: An existing key.

Exceptions:

- `ArgumentNullException`: `keyName` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
This overload uses the following defaults:

- Key <example-value> provider (KSP): `CngProvider.MicrosoftSoftwareKeyStorageProvider`. Use the `Open` overload if you want to specify another KSP.

- Key open options: `None`.

## CngKey.Open(SafeNCryptKeyHandle, CngKeyHandleOpenOptions) method

```csharp
public static System.Security.Cryptography.CngKey Open (Microsoft.Win32.SafeHandles.SafeNCryptKeyHandle keyHandle, System.Security.Cryptography.CngKeyHandleOpenOptions keyHandleOpenOptions);
```

Creates an instance of an `CngKey` object by using a handle to an existing key.

Parameters:

- `keyHandle`: A handle to an existing key.
- `keyHandleOpenOptions`: One of the enumeration values that indicates whether `keyHandle` represents an ephemeral key or a named key.

Returns: An existing key.

Exceptions:

- `ArgumentNullException`: `keyHandle` is `null`.
- `ArgumentException`: `keyHandle` is invalid or malformed, or it is already closed. This exception is also thrown if the key is an ephemeral key that is created by the common language runtime (CLR), but the `CngKeyHandleOpenOptions.EphemeralKey` value is not specified.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
This overload enables advanced users to use the CNG classes even if they rely on platform invoke or the managed interop capability of C++. For example, if you have a native library that returns the key as an NCRYPT_KEY_HANDLE, this overload lets you create a managed wrapper around the key and use the CNG classes to manipulate it.

When you open a key by using its handle, you cannot determine the key's ephemeral state and must specify it yourself. Several properties of the `CngKey` class rely on this value to be correct. Therefore, make sure that you pass the correct flag value to the `CngKey.Open` methods.

## CngKey.Open(String, CngProvider) method

```csharp
public static System.Security.Cryptography.CngKey Open (string keyName, System.Security.Cryptography.CngProvider provider);
```

Creates an instance of an `CngKey` object that represents an existing named key, using the specified key <example-value> provider (KSP).

Parameters:

- `keyName`: The name of the key.
- `provider`: The KSP that contains the key.

Returns: An existing key.

Exceptions:

- `ArgumentNullException`: `keyName` or `provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
Unlike the `Open` method overload, this overload lets you specify the provider. In addition, a default `CngKeyOpenOptions` value of `None` is created and bound to the key.

## CngKey.Open(String, CngProvider, CngKeyOpenOptions) method

```csharp
public static System.Security.Cryptography.CngKey Open (string keyName, System.Security.Cryptography.CngProvider provider, System.Security.Cryptography.CngKeyOpenOptions openOptions);
```

Creates an instance of an `CngKey` object that represents an existing named key, using the specified key <example-value> provider (KSP) and key open options.

Parameters:

- `keyName`: The name of the key.
- `provider`: The KSP that contains the key.
- `openOptions`: A bitwise combination of the enumeration values that specify options for opening the key, such as where the key is opened from (machine or user storage) and whether to suppress UI prompting.

Returns: An existing key.

Exceptions:

- `ArgumentNullException`: `keyName` or `provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
Unlike the `Open` method overload, this overload lets you specify both the provider and the key open options.

## CngKey.SetProperty(CngProperty) method

```csharp
public void SetProperty (System.Security.Cryptography.CngProperty property);
```

Sets a named property on the key.

Parameters:

- `property`: The key <example-value> to set.

#### Remarks
This method enables you to add a new custom property to an existing key by using a `CngProperty` object. The options set on the `CngProperty` object must exactly match the options in the `CngKey.GetProperty` call. Otherwise, the property will not be found.
