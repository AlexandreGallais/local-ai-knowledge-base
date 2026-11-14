---
title: "LicenseUsageMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LicenseUsageMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LicenseUsageMode enum

Namespace: `System.ComponentModel`

```csharp
public enum LicenseUsageMode
```

Specifies when the `License` can be used.

#### Remarks
The `LicenseManager` and the `LicenseContext` classes use this enumeration. It is used to set a component's `LicenseManager.CurrentContext`. See the `LicenseManager` class for details.

## LicenseUsageMode.Designtime field

```csharp
Designtime
```

Used during design time by a visual designer or the compiler.

## LicenseUsageMode.Runtime field

```csharp
Runtime
```

Used during runtime.
