---
title: "InAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/InAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class InAttribute : Attribute
```

Indicates that data should be marshaled from the caller to the callee, but not back to the caller.

#### Remarks
You can apply this attribute to parameters.

The `InAttribute` is optional. The attribute is supported for COM interop and platform invoke only. In the absence of explicit settings, the interop marshaler assumes rules based on the parameter type, whether the parameter is passed by reference or by value, and whether the type is blittable or non-blittable. For example, the `StringBuilder` class is always assumed to be In/Out and an array of strings passed by value is assumed to be In.

You cannot apply the `InAttribute` to a parameter modified with the C#-styled `out` keyword. To avoid confusing the `In` keyword in Visual Basic with the `InAttribute`, minus Attribute, use the `<[In]>` form with brackets around the attribute.

Combining the `InAttribute` and `OutAttribute` is particularly useful when applied to arrays and formatted, non-blittable types. Callers see the changes a callee makes to these types only when you apply both attributes. Since these types require copying during marshaling, you can use `InAttribute` and `OutAttribute` to reduce unnecessary copies.

#### Examples
The following example shows how to apply the `InAttribute` and `OutAttribute` to a platform invoke prototype that passes an array as a parameter. The combination of directional attributes allows the caller to see the changes made by the callee.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/InAttribute/Overview/inout.cs._

## InAttribute.InAttribute() constructor

```csharp
public InAttribute ();
```

Initializes a new instance of the `InAttribute` class.

To be added.
