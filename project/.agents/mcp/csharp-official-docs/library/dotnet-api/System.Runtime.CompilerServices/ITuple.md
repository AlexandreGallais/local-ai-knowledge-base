---
title: "ITuple interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ITuple.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ITuple interface

Namespace: `System.Runtime.CompilerServices`

```csharp
public interface ITuple
```

Defines a general-purpose Tuple implementation that allows access to Tuple instance members without knowing the underlying Tuple type.

#### Remarks
You use the `ITuple` interface to access individual elements of a Tuple instance without knowing beforehand the number or types of elements in the Tuple. You determine the number of items in the Tuple by retrieving the value of the `Length` property. You can then enumerate its elements by passing an index that ranges from zero to one less than value of the `Length` property to the `ITuple.Item` property.

`ITuple` is an explicit interface implementation of the `Tuple` classes and the `ValueTuple` structures. You must cast the `Tuple` object to an `ITuple` interface object before you can access its properties.

## ITuple.Item property

```csharp
public object? this[int index] { get; }
```

Returns the value of the specified `Tuple` element.

Parameters:

- `index`: The index of the specified `Tuple` element. `index` can range from 0 for `Item1` of the `Tuple` to one less than the number of elements in the `Tuple`.

Returns: The value of the specified `Tuple` element.

To be added.

## ITuple.Length property

```csharp
public int Length { get; }
```

Gets the number of elements in this `Tuple` instance.

Returns: The number of elements in this `Tuple` instance.

To be added.
