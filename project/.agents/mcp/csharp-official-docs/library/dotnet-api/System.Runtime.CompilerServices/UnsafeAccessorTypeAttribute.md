---
title: "UnsafeAccessorTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/UnsafeAccessorTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnsafeAccessorTypeAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class UnsafeAccessorTypeAttribute : Attribute
```

Provides access to an inaccessible type.

To be added.

## UnsafeAccessorTypeAttribute.UnsafeAccessorTypeAttribute(String) constructor

```csharp
public UnsafeAccessorTypeAttribute (string typeName);
```

Instantiates an `UnsafeAccessorTypeAttribute` providing access to a type supplied by `typeName`.

Parameters:

- `typeName`: A fully qualified or partially qualified type name.

`typeName` is expected to follow the same rules as if it were being passed to . When unbound generics are involved they should follow the IL syntax of referencing a type or method generic variables using the syntax of `!N` or `!!N` respectively, where N is the zero-based index of the generic parameters. The generic rules defined for `UnsafeAccessorAttribute` apply to this attribute as well, meaning the arity and type of generic parameter must match the target type.

This attribute only has behavior on parameters or return values of methods marked with `UnsafeAccessorAttribute`.

This attribute should only be applied to parameters or return types of methods that are typed as follows:

References should be typed as `object`.
Byref arguments should be typed with `in`, `ref`, or `out` to `object`.
Unmanaged pointers should be typed as `void*`.
Byref arguments to reference types or arrays should be typed with `in`, `ref`, or `out` to `object`.
Byref arguments to unmanaged pointer types should be typed with `in`, `ref`, or `out` to `void*`.
 Value types are not supported.

Due to lack of variance for byrefs, returns involving byrefs are not supported. This specifically means that accessors for fields of inaccessible types are not supported.

## UnsafeAccessorTypeAttribute.TypeName property

```csharp
public string TypeName { get; }
```

Fully qualified or partially qualified type name to target.

Returns: To be added.

To be added.
