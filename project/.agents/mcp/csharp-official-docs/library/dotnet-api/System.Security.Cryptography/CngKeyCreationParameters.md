---
title: "CngKeyCreationParameters class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngKeyCreationParameters.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngKeyCreationParameters class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CngKeyCreationParameters
```

Contains advanced properties for key creation.

#### Remarks
`CngKey` objects contain properties. Some properties must be added to a key when it is created. Other properties can be added after the key is created.

The `CngKeyCreationParameters` class enables you to add properties to a key as it is being created. You can do this by passing a `CngKeyCreationParameters` object that contains standard key <example-value>, such as key <example-value> provider (KSP), export policy, key usage, user interface (UI) policy, and parent window handle, to the `CngKey.Create` method. The `CngKey` object that is being created will be initialized with these values before it is finalized.

You can also add non-standard properties to a key by using the `Parameters` property.

If you need to add properties after a key is created, use the `CngKey.SetProperty` method.

> **Note:**
> CNG classes don't work on non-Windows platforms.

## CngKeyCreationParameters.CngKeyCreationParameters() constructor

```csharp
public CngKeyCreationParameters ();
```

Initializes a new instance of the `CngKeyCreationParameters` class.

To be added.

## CngKeyCreationParameters.ExportPolicy property

```csharp
public System.Security.Cryptography.CngExportPolicies? ExportPolicy { get; set; }
```

Gets or sets the key <example-value> policy.

Returns: An object that specifies a key <example-value> policy. The default value is `null`, which indicates that the key <example-value> provider's default export policy is set.

#### Remarks
For information about key <example-value> policies, see the `CngExportPolicies` class.

## CngKeyCreationParameters.KeyCreationOptions property

```csharp
public System.Security.Cryptography.CngKeyCreationOptions KeyCreationOptions { get; set; }
```

Gets or sets the key <example-value> options.

Returns: An object that specifies options for creating keys. The default value is `null`, which indicates that the key <example-value> provider's default key <example-value> options are set.

#### Remarks
The returned `CngKeyCreationOptions` object defines options that are used when you create a new `CngKey` object. These options determine whether the key is created in the user or machine key store, and whether a new key <example-value> overwrite an existing key. By default, if `MachineKey` is not specified, the key is created in the user store.

## CngKeyCreationParameters.KeyUsage property

```csharp
public System.Security.Cryptography.CngKeyUsages? KeyUsage { get; set; }
```

Gets or sets the cryptographic operations that apply to the current key.

Returns: A bitwise combination of one or more enumeration values that specify key usage. The default value is `null`, which indicates that the key <example-value> provider's default key usage is set.

#### Remarks
This property is used when you create a new `CngKey` object. It specifies the usages (such as encryption/decryption, signing/verification, and secret <example-value> generation) that will be enabled on the new key.

## CngKeyCreationParameters.Parameters property

```csharp
public System.Security.Cryptography.CngPropertyCollection Parameters { get; }
```

Enables a `CngKey` object to be created with additional properties that are set before the key is finalized.

Returns: A collection object that contains any additional parameters that you must set on a `CngKey` object during key creation.

#### Remarks
The `CngKeyCreationParameters` class enables you to create a new `CngKey` object and initialize it with common properties. If you must set additional properties on the key <example-value> its creation, follow these steps:

1.  Create a new `CngProperty` object for each additional property that you must set.

2.  Call the `Parameters` property to obtain an empty `CngPropertyCollection` object.

3.  Add the `CngProperty` objects to the `CngPropertyCollection` object.

4.  Call the `Create` method overload and pass the initialized `CngKeyCreationParameters` object to it.

## CngKeyCreationParameters.ParentWindowHandle property

```csharp
public IntPtr ParentWindowHandle { get; set; }
```

Gets or sets the window handle that should be used as the parent window for dialog boxes that are created by Cryptography Next Generation (CNG) classes.

Returns: The HWND of the parent window that is used for CNG dialog boxes.

#### Remarks
This property should be set if key <example-value> causes CNG to show a dialog box.

## CngKeyCreationParameters.Provider property

```csharp
public System.Security.Cryptography.CngProvider Provider { get; set; }
```

Gets or sets the key <example-value> provider (KSP) to create a key in.

Returns: An object that specifies the KSP that a new key will be created in.

Exceptions:

- `ArgumentNullException`: The `CngKeyCreationParameters.Provider` property is set to a `null` value.

To be added.

## CngKeyCreationParameters.UIPolicy property

```csharp
public System.Security.Cryptography.CngUIPolicy? UIPolicy { get; set; }
```

Gets or sets information about the user interface to display when a key is created or accessed.

Returns: An object that contains details about the user interface shown by Cryptography Next Generation (CNG) classes when a key is created or accessed. A `null` value indicates that the key <example-value> provider's default user interface policy is set.

To be added.
