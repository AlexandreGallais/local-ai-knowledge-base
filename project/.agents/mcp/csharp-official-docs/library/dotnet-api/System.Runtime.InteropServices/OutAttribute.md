---
title: "OutAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/OutAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OutAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class OutAttribute : Attribute
```

Indicates that data should be marshaled from callee back to caller.

#### Remarks
You can apply this attribute to parameters.

The `OutAttribute` is optional. The attribute is supported for COM interop and platform invoke only. In the absence of explicit settings, the interop marshaler assumes rules based on the parameter type, whether the parameter is passed by reference or by value, and whether the type is blittable or non-blittable. For example, the `StringBuilder` class is always assumed to be In/Out and an array of strings passed by value is assumed to be In.

Out-only behavior is never a default marshaling behavior for parameters. You can apply the `OutAttribute` to value and reference types passed by reference to change In/Out behavior to Out-only behavior, which is equivalent to using the `out` keyword in C#. For example, arrays passed by value, marshaled as In-only parameters by default, can be changed to Out-only. However, the behavior does not always provide expected semantics when the types include all-blittable elements or fields because the interop marshaler uses pinning. If you do not care about passing data into the callee, Out-only marshaling can provide better performance for non-blittable types.

Combining the `InAttribute` and `OutAttribute` is particularly useful when applied to arrays and formatted, non-blittable types. Callers see the changes a callee makes to these types only when you apply both attributes. Since these types require copying during marshaling, you can use `InAttribute` and `OutAttribute` to reduce unnecessary copies.

#### Examples
The following example shows how to apply the `InAttribute` and `OutAttribute` to a platform invoke prototype that passes an array as a parameter. The combination of directional attributes allows the caller to see the changes made by the callee.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/InAttribute/Overview/inout.cs._

## OutAttribute.OutAttribute() constructor

```csharp
public OutAttribute ();
```

Initializes a new instance of the `OutAttribute` class.

To be added.
