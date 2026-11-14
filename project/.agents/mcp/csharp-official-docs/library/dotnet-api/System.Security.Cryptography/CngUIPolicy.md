---
title: "CngUIPolicy class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngUIPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngUIPolicy class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CngUIPolicy
```

Encapsulates optional configuration parameters for the user interface (UI) that Cryptography Next Generation (CNG) displays when you access a protected key.

#### Remarks
This class enables you to create a UI policy for displaying prompts about key <example-value> such as smart card PIN prompts. It also enables you to enforce user interaction to access a key, even if the key is stored in a software key <example-value> provider (KSP) instead of in a smart card. CNG displays these configuration parameters for the UI when you access a protected key.

> **Note:**
> CNG classes don't work on non-Windows platforms.

## CngUIPolicy.CngUIPolicy(CngUIProtectionLevels) constructor

```csharp
public CngUIPolicy (System.Security.Cryptography.CngUIProtectionLevels protectionLevel);
```

Initializes a new instance of the `CngUIPolicy` class by using the specified protection level.

Parameters:

- `protectionLevel`: A bitwise combination of the enumeration values that specify the protection level.

#### Remarks
This constructor sets the protection level for the key in UI prompting scenarios.

## CngUIPolicy.CngUIPolicy(CngUIProtectionLevels, String) constructor

```csharp
public CngUIPolicy (System.Security.Cryptography.CngUIProtectionLevels protectionLevel, string? friendlyName);
```

Initializes a new instance of the `CngUIPolicy` class by using the specified protection level and friendly name.

Parameters:

- `protectionLevel`: A bitwise combination of the enumeration values that specify the protection level.
- `friendlyName`: A friendly name for the key to be used in the UI prompt. Specify a null string to use the default name.

To be added.

## CngUIPolicy.CngUIPolicy(CngUIProtectionLevels, String, String) constructor

```csharp
public CngUIPolicy (System.Security.Cryptography.CngUIProtectionLevels protectionLevel, string? friendlyName, string? description);
```

Initializes a new instance of the `CngUIPolicy` class by using the specified protection level, friendly name, and description.

Parameters:

- `protectionLevel`: A bitwise combination of the enumeration values that specify the protection level.
- `friendlyName`: A friendly name for the key to be used in the UI prompt. Specify a null string to use the default name.
- `description`: The full-text description of the key. Specify a null string to use the default description.

To be added.

## CngUIPolicy.CngUIPolicy(CngUIProtectionLevels, String, String, String) constructor

```csharp
public CngUIPolicy (System.Security.Cryptography.CngUIProtectionLevels protectionLevel, string? friendlyName, string? description, string? useContext);
```

Initializes a new instance of the `CngUIPolicy` class by using the specified protection level, friendly name, description string, and use context.

Parameters:

- `protectionLevel`: A bitwise combination of the enumeration values that specify the protection level.
- `friendlyName`: A friendly name for the key to be used in the UI prompt. Specify a null string to use the default name.
- `description`: The full-text description of the key. Specify a null string to use the default description.
- `useContext`: A description of how the key will be used. Specify a null string to use the default description.

To be added.

## CngUIPolicy.CngUIPolicy(CngUIProtectionLevels, String, String, String, String) constructor

```csharp
public CngUIPolicy (System.Security.Cryptography.CngUIProtectionLevels protectionLevel, string? friendlyName, string? description, string? useContext, string? creationTitle);
```

Initializes a new instance of the `CngUIPolicy` class by using the specified protection level, friendly name, description string, use context, and title.

Parameters:

- `protectionLevel`: A bitwise combination of the enumeration values that specify the protection level.
- `friendlyName`: A friendly name for the key to be used in the UI prompt. Specify a null string to use the default name.
- `description`: The full-text description of the key. Specify a null string to use the default description.
- `useContext`: A description of how the key will be used. Specify a null string to use the default description.
- `creationTitle`: The title for the dialog box that provides the UI prompt. Specify a null string to use the default title.

To be added.

## CngUIPolicy.CreationTitle property

```csharp
public string? CreationTitle { get; }
```

Gets the title that is displayed by the UI prompt.

Returns: The title of the dialog box that appears when the key is accessed.

To be added.

## CngUIPolicy.Description property

```csharp
public string? Description { get; }
```

Gets the description string that is displayed by the UI prompt.

Returns: The description text for the dialog box that appears when the key is accessed.

To be added.

## CngUIPolicy.FriendlyName property

```csharp
public string? FriendlyName { get; }
```

Gets the friendly name that is displayed by the UI prompt.

Returns: The friendly name that is used to describe the key in the dialog box that appears when the key is accessed.

To be added.

## CngUIPolicy.ProtectionLevel property

```csharp
public System.Security.Cryptography.CngUIProtectionLevels ProtectionLevel { get; }
```

Gets the UI protection level for the key.

Returns: An object that describes the level of UI protection to apply to the key.

To be added.

## CngUIPolicy.UseContext property

```csharp
public string? UseContext { get; }
```

Gets the description of how the key will be used.

Returns: The description of how the key will be used.

To be added.
