---
title: "TypeFilter delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TypeFilter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeFilter delegate

Namespace: `System.Reflection`

```csharp
public delegate bool TypeFilter(Type m, object? filterCriteria);
```

Filters the classes represented in an array of `Type` objects.

Parameters:

- `m`: The `Type` object to which the filter is applied.
- `filterCriteria`: An arbitrary object used to filter the list.

Returns: `true` to include the `Type` in the filtered list; otherwise `false`.

#### Remarks
The `TypeFilter` delegate is used to filter a list of classes. Specifically, you use it to filter the classes represented in an array of `Type` objects. The `Type.FindInterfaces` method uses this delegate to filter the list of interfaces that it returns. Every derived class of `Delegate` and `MulticastDelegate` has a constructor and a `DynamicInvoke` method.

#### Examples
This example shows how to define a method matching the `TypeFilter` delegate prototype allowing you to use reflection to filter or return a subset of matching entries.
