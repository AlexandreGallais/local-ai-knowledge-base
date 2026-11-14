---
title: "DynamicAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DynamicAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DynamicAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class DynamicAttribute : Attribute
```

Indicates that the use of `Object` on a member is meant to be treated as a dynamically dispatched type.

To be added.

## DynamicAttribute.DynamicAttribute() constructor

```csharp
public DynamicAttribute ();
```

Initializes a new instance of the `DynamicAttribute` class.

#### Remarks
When used in an attribute specification, the parameterless constructor is semantically equivalent to `DynamicAttribute({ true })`, and can be considered a shorthand for that expression. It should therefore only be used on an element of type `Object`.

## DynamicAttribute.DynamicAttribute(Boolean[]) constructor

```csharp
public DynamicAttribute (bool[] transformFlags);
```

Initializes a new instance of the `DynamicAttribute` class.

Parameters:

- `transformFlags`: Specifies, in a prefix traversal of a type's construction, which `Object` occurrences are meant to be treated as a dynamically dispatched type.

#### Remarks
This constructor is meant to be used on types that are built on an underlying occurrence of `Object` that is meant to be treated dynamically.

For instance, if `C` is a generic type with two type parameters, a use of the constructed type `C<Object,Object>` might be intended to treat the first type argument dynamically and the second typically, in which case the appropriate attribute specification should use a `transformFlags` value of `{ false, true, false }`.

## DynamicAttribute.TransformFlags property

```csharp
public System.Collections.Generic.IList<bool> TransformFlags { get; }
```

Specifies, in a prefix traversal of a type's construction, which `Object` occurrences are meant to be treated as a dynamically dispatched type.

Returns: The list of `Object` occurrences that are meant to be treated as a dynamically dispatched type.

To be added.
