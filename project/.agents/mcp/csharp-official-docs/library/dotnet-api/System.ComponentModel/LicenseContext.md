---
title: "LicenseContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LicenseContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LicenseContext class

Namespace: `System.ComponentModel`

```csharp
public class LicenseContext : IServiceProvider
```

Specifies when you can use a licensed object and provides a way of obtaining additional services needed to support licenses running within its domain.

#### Remarks
This class provides the default `LicenseContext`. It implements only run-time support and does not support saved license keys.

## LicenseContext.LicenseContext() constructor

```csharp
public LicenseContext ();
```

Initializes a new instance of the `LicenseContext` class.

To be added.

## LicenseContext.UsageMode property

```csharp
public virtual System.ComponentModel.LicenseUsageMode UsageMode { get; }
```

When overridden in a derived class, gets a value that specifies when you can use a license.

Returns: One of the `LicenseUsageMode` values that specifies when you can use a license. The default is `LicenseUsageMode.Runtime`.

To be added.

## LicenseContext.GetSavedLicenseKey(Type, Assembly) method

```csharp
public virtual string? GetSavedLicenseKey (Type type, System.Reflection.Assembly? resourceAssembly);
```

When overridden in a derived class, returns a saved license key for the specified type, from the specified resource assembly.

Parameters:

- `type`: A `Type` that represents the type of component.
- `resourceAssembly`: An `Assembly` with the license key.

Returns: The `License.LicenseKey` for the specified type. This method returns `null` unless you override it.

To be added.

## LicenseContext.GetService(Type) method

```csharp
public virtual object? GetService (Type type);
```

Gets the requested service, if it is available.

Parameters:

- `type`: The type of service to retrieve.

Returns: An instance of the service, or `null` if the service cannot be found.

To be added.

## LicenseContext.SetSavedLicenseKey(Type, String) method

```csharp
public virtual void SetSavedLicenseKey (Type type, string key);
```

When overridden in a derived class, sets a license key for the specified type.

Parameters:

- `type`: A `Type` that represents the component associated with the license key.
- `key`: The `License.LicenseKey` to save for the type of component.

#### Remarks
Typically, call this method when you set `LicenseUsageMode` at design time. You must override the `UsageMode` property to implement design-time license support.
