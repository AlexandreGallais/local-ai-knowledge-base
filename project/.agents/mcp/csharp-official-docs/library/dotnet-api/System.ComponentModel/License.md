---
title: "License class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/License.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# License class

Namespace: `System.ComponentModel`

```csharp
public abstract class License : IDisposable
```

Provides the `abstract` base class for all licenses. A license is granted to a specific instance of a component.

#### Remarks
All components must call `License.Dispose` for the licenses they grant when the component is disposed or finalized.

## License.License() constructor

```csharp
protected License ();
```

Initializes a new instance of the `License` class.

To be added.

## License.LicenseKey <example-value>

```csharp
public abstract string LicenseKey { get; }
```

When overridden in a derived class, gets the license key <example-value> to this component.

Returns: A license key <example-value> to this component.

#### Remarks
A `LicenseProvider` can use any Unicode character string as a license key. The `License.LicenseKey` should be treated as an opaque cookie, that is, a cookie with a deliberately hidden internal structure.

## License.Dispose() method

```csharp
public abstract void Dispose ();
```

When overridden in a derived class, disposes of the resources used by the license.

#### Remarks
All components must call `License.Dispose` for the licenses that they grant when the component is disposed of or finalized.

A `LicenseProvider` can use the licenses it grants to track its usage.

Call `License.Dispose` when you are finished using the `License`. The `License.Dispose` method leaves the `License` in an unusable state. After calling `License.Dispose`, you must release all references to the `License` so the memory it was occupying can be reclaimed by garbage collection.

> **Note:**
>  Always call `License.Dispose` before you release your last reference to the `License`. Otherwise, the resources the `License` is using will not be freed until garbage collection calls the `License` object's destructor.
