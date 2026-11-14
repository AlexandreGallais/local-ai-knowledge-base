---
title: "LicenseProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LicenseProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LicenseProvider class

Namespace: `System.ComponentModel`

```csharp
public abstract class LicenseProvider
```

Provides the `abstract` base class for implementing a license provider.

#### Examples
The following code example creates a licensed control using the `LicenseManager.Validate` method. It uses a `LicenseProvider` that is implemented by the `LicFileLicenseProvider` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LicenseManager/Overview/source.cs._

## LicenseProvider.LicenseProvider() constructor

```csharp
protected LicenseProvider ();
```

Initializes a new instance of the `LicenseProvider` class.

To be added.

## LicenseProvider.GetLicense(LicenseContext, Type, Object, Boolean) method

```csharp
public abstract System.ComponentModel.License? GetLicense (System.ComponentModel.LicenseContext context, Type type, object? instance, bool allowExceptions);
```

When overridden in a derived class, gets a license for an instance or type of component, when given a context and whether the denial of a license throws an exception.

Parameters:

- `context`: A `LicenseContext` that specifies where you can use the licensed object.
- `type`: A `Type` that represents the component requesting the license.
- `instance`: An object that is requesting the license.
- `allowExceptions`: `true` if a `LicenseException` should be thrown when the component cannot be granted a license; otherwise, `false`.

Returns: A valid `License`.

To be added.
