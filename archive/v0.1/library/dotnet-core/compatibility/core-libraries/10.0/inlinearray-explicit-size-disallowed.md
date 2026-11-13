---
title: "Breaking change: Specifying explicit struct Size disallowed with InlineArray"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/10.0/inlinearray-explicit-size-disallowed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Specifying explicit struct Size disallowed with InlineArray

Applying explicit `Size` to a struct decorated with `System.Runtime.CompilerServices.InlineArrayAttribute` is ambiguous and no longer supported in the type loader. Previously, specifying explicit `Size` would result in implementation-specific behavior that might or might not match user expectations.

## Version introduced

.NET 10

## Previous behavior

Previously, specifying `System.Runtime.InteropServices.StructLayoutAttribute.Size` on a struct decorated with `System.Runtime.CompilerServices.InlineArrayAttribute` was allowed, but resulted in implementation-specific behavior that might or might not match user expectations.

```csharp
[InlineArray(8)]
[StructLayout(LayoutKind.Explicit, Size=32)]
struct Int8InlineArray
{
    private int _value;
}
```

## New behavior

Starting in .NET 10, specifying `System.Runtime.InteropServices.StructLayoutAttribute.Size` on a struct decorated with `System.Runtime.CompilerServices.InlineArrayAttribute` is disallowed. If you attempt to create an instance of such a struct, you'll get a `System.TypeLoadException`.

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

Specifying `System.Runtime.InteropServices.StructLayoutAttribute.Size` for an inline array struct is ambiguous and any interpretation would contradict the specification.

## Recommended action

In the unlikely case you need to specify explicit size either for the array element or for the whole inline array, introduce a struct wrapping the element type or the whole array type. In the layout of the wrapper, specify `System.Runtime.InteropServices.StructLayoutAttribute.Size` accordingly.

## Affected APIs

- Type loader
