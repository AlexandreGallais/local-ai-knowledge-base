---
title: "AutomationProxyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/AutomationProxyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AutomationProxyAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class AutomationProxyAttribute : Attribute
```

Specifies whether the type should be marshaled using the Automation marshaler or a custom proxy and stub.

#### Remarks
You can apply this attribute to assemblies, classes, or interfaces.

When applied to a class, it extends to the class interface for that class, if present.

## AutomationProxyAttribute.AutomationProxyAttribute(Boolean) constructor

```csharp
public AutomationProxyAttribute (bool val);
```

Initializes a new instance of the `AutomationProxyAttribute` class.

Parameters:

- `val`: `true` if the class should be marshaled using the Automation Marshaler; `false` if a proxy stub marshaler should be used.

To be added.

## AutomationProxyAttribute.Value property

```csharp
public bool Value { get; }
```

Gets a value indicating the type of marshaler to use.

Returns: `true` if the class should be marshaled using the Automation Marshaler; `false` if a proxy stub marshaler should be used.

To be added.
