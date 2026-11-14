---
title: "LicFileLicenseProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LicFileLicenseProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LicFileLicenseProvider class

Namespace: `System.ComponentModel`

```csharp
public class LicFileLicenseProvider : System.ComponentModel.LicenseProvider
```

Provides an implementation of a `LicenseProvider`. The provider works in a similar fashion to the standard .NET licensing model.

#### Remarks
The `LicFileLicenseProvider` offers `LicFileLicenseProvider.GetLicense` and `LicFileLicenseProvider.IsKeyValid` methods. The `LicFileLicenseProvider.IsKeyValid` method determines whether the `License.LicenseKey` retrieved by the `LicFileLicenseProvider.GetLicense` method is valid. When you inherit from this class, you can override the `LicFileLicenseProvider.IsKeyValid` method to provide your own validation logic.

This class exists to provide similar licensing functionality to COM licensing and uses text license files.

#### Examples
The following example creates a licensed control using the `LicenseManager.Validate` method. It uses `LicFileLicenseProvider` for the license manager.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LicenseManager/Overview/source.cs._

## LicFileLicenseProvider.LicFileLicenseProvider() constructor

```csharp
public LicFileLicenseProvider ();
```

Initializes a new instance of the `LicFileLicenseProvider` class.

To be added.

## LicFileLicenseProvider.GetKey(Type) method

```csharp
protected virtual string GetKey (Type type);
```

Returns a key for the specified type.

Parameters:

- `type`: The object type to return the key.

Returns: A confirmation that the `type` parameter is licensed.

To be added.

## LicFileLicenseProvider.GetLicense(LicenseContext, Type, Object, Boolean) method

```csharp
public override System.ComponentModel.License? GetLicense (System.ComponentModel.LicenseContext context, Type type, object? instance, bool allowExceptions);
```

Returns a license for the instance of the component, if one is available.

Parameters:

- `context`: A `LicenseContext` that specifies where you can use the licensed object.
- `type`: A `Type` that represents the component requesting the `License`.
- `instance`: An object that requests the `License`.
- `allowExceptions`: `true` if a `LicenseException` should be thrown when a component cannot be granted a license; otherwise, `false`.

Returns: A valid `License`. If this method cannot find a valid `License` or a valid `context` parameter, it returns `null`.

#### Remarks
At design time, the `LicFileLicenseProvider.GetLicense` method looks for a license file named `myClassName.LIC`, where `myClassName` is the `Type.FullName` of the component to create. This file must be in the same directory as the .dll file that contains the component.

Next, this method checks the first line of the license file against a key <example-value> in the `LicFileLicenseProvider.IsKeyValid` method. If the key is valid, this line is used as the `License.LicenseKey`.

## LicFileLicenseProvider.IsKeyValid(String, Type) method

```csharp
protected virtual bool IsKeyValid (string? key, Type type);
```

Determines whether the key that the `LicFileLicenseProvider.GetLicense` method retrieves is valid for the specified type.

Parameters:

- `key`: The `License.LicenseKey` to check.
- `type`: A `Type` that represents the component requesting the `License`.

Returns: `true` if the key is a valid `License.LicenseKey` for the specified type; otherwise, `false`.

#### Remarks
This method checks the key <example-value> the phrase: " `myClassName is a licensed component.` ", where `myClassName` is the `Type.FullName` of the component you want to create.
