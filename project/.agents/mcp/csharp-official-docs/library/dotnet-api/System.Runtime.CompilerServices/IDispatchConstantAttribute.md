---
title: "IDispatchConstantAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/IDispatchConstantAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDispatchConstantAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class IDispatchConstantAttribute : System.Runtime.CompilerServices.CustomConstantAttribute
```

Indicates that the default value for the attributed field or parameter is an instance of `DispatchWrapper`, where the `DispatchWrapper.WrappedObject` is `null`.

#### Remarks
You can apply this attribute to fields or parameters.

The type library importer uses this attribute to distinguish a default value of type `VT_DISPATCH` from `null`.

For more information about constant attributes, see the `CustomConstantAttribute` class.

The classes in `CompilerServices` are for compiler writers use only.

## IDispatchConstantAttribute.IDispatchConstantAttribute() constructor

```csharp
public IDispatchConstantAttribute ();
```

Initializes a new instance of the `IDispatchConstantAttribute` class.

To be added.

## IDispatchConstantAttribute.Value property

```csharp
public override object Value { get; }
```

Gets the `IDispatch` constant stored in this attribute.

Returns: The `IDispatch` constant stored in this attribute. Only `null` is allowed for an `IDispatch` constant value.

To be added.
