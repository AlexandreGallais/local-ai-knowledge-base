---
title: "IUnknownConstantAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/IUnknownConstantAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IUnknownConstantAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class IUnknownConstantAttribute : System.Runtime.CompilerServices.CustomConstantAttribute
```

Indicates that the default value for the attributed field or parameter is an instance of `UnknownWrapper`, where the `UnknownWrapper.WrappedObject` is `null`. This class cannot be inherited.

#### Remarks
You can apply this attribute to fields or parameters.

The type library importer uses this attribute to distinguish a default value of type `VT_UNKNOWN` from `null`.

For more information about constant attributes, see the `CustomConstantAttribute` class.

The classes in `CompilerServices` are for compiler writers use only.

## IUnknownConstantAttribute.IUnknownConstantAttribute() constructor

```csharp
public IUnknownConstantAttribute ();
```

Initializes a new instance of the `IUnknownConstantAttribute` class.

To be added.

## IUnknownConstantAttribute.Value property

```csharp
public override object Value { get; }
```

Gets the `IUnknown` constant stored in this attribute.

Returns: The `IUnknown` constant stored in this attribute. Only `null` is allowed for an `IUnknown` constant value.

To be added.
