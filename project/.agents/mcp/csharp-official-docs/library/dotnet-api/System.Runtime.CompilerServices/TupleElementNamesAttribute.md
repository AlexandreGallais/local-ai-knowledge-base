---
title: "TupleElementNamesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/TupleElementNamesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TupleElementNamesAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class TupleElementNamesAttribute : Attribute
```

Indicates that the use of a value tuple on a member is meant to be treated as a tuple with element names.

To be added.

## TupleElementNamesAttribute.TupleElementNamesAttribute(String[]) constructor

```csharp
public TupleElementNamesAttribute (string?[] transformNames);
```

Initializes a new instance of the `TupleElementNamesAttribute` class.

Parameters:

- `transformNames`: A string array that specifies, in a pre-order depth-first traversal of a type's construction, which value tuple occurrences are meant to carry element names.

#### Remarks
This constructor is used on types that contain a value tuple instance with element names.  For example, if `C` is a generic type with          two type parameters, then the use of the constructed type `C(``ValueTuple<T1,T2>``,` `ValueTuple<T1,T2,T3>``)` might be intended to          treat the first type argument as a tuple with element names and the          second as a tuple without element names. In this case, the          appropriate attribute specification should use a          `transformNames` value of `{ "name1", "name2", null, null,          null}`.

## TupleElementNamesAttribute.TransformNames property

```csharp
public System.Collections.Generic.IList<string?> TransformNames { get; }
```

Specifies, in a pre-order depth-first traversal of a type's construction, which value tuple elements are meant to carry element names.

Returns: An array that indicates which value tuple elements are meant to carry element names.

To be added.
