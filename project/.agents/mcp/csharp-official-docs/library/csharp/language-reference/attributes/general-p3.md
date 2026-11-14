---
title: "Attributes interpreted by the compiler: Miscellaneous (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/attributes/general.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Attributes interpreted by the compiler: Miscellaneous (part 3 of 3)

## `OverloadResolutionPriority` attribute

The `System.Runtime.CompilerServices.OverloadResolutionPriorityAttribute` enables library authors to prefer one overload over another when two overloads can be ambiguous. Its primary use case is for library authors to write better performing overloads while still supporting existing code without breaks.

For example, you might add a new overload that uses `System.ReadOnlySpan`1` to reduce memory allocations:

```csharp
﻿using System.Runtime.CompilerServices;

namespace attributes;
public class OverloadExample
{

    public static void OrpaExample()
    {
        var d = new OverloadExample();
        int[] arr = [1, 2, 3];
        d.M(1, 2, 3, 4); // Prints "Span"
        d.M(arr); // Prints "Span" when PriorityAttribute is applied
        d.M([1, 2, 3, 4]); // Prints "Span"
        d.M(1, 2, 3, 4); // Prints "Span"
    }

    [OverloadResolutionPriority(1)]
    public void M(params ReadOnlySpan<int> s) => Console.WriteLine("Span");
    // Default overload resolution priority of 0
    public void M(params int[] a) => Console.WriteLine("Array");
}
```
Overload resolution considers the two methods equally good for some argument types. For an argument of `int[]`, it prefers the first overload. To get the compiler to prefer the `ReadOnlySpan` version, you can increase the priority of that overload. The following example shows the effect of adding the attribute:

```csharp
﻿using System.Runtime.CompilerServices;

namespace attributes;
public class OverloadExample
{

    public static void OrpaExample()
    {
        var d = new OverloadExample();
        int[] arr = [1, 2, 3];
        d.M(1, 2, 3, 4); // Prints "Span"
        d.M(arr); // Prints "Span" when PriorityAttribute is applied
        d.M([1, 2, 3, 4]); // Prints "Span"
        d.M(1, 2, 3, 4); // Prints "Span"
    }

    [OverloadResolutionPriority(1)]
    public void M(params ReadOnlySpan<int> s) => Console.WriteLine("Span");
    // Default overload resolution priority of 0
    public void M(params int[] a) => Console.WriteLine("Array");
}
```
All overloads with a lower priority than the highest overload priority are removed from the set of applicable methods. Methods without this attribute have the overload priority set to the default of zero. Library authors should use this attribute as a last resort when adding a new and better method overload. Library authors should have a deep understanding of how overload resolution priority impacts choosing the better method. Otherwise, unexpected errors can result.

## EnumeratorCancellation attribute

The `System.Runtime.CompilerServices.EnumeratorCancellationAttribute` attribute specifies which parameter should receive the cancellation token from the `System.Collections.Generic.IAsyncEnumerable`1.GetAsyncEnumerator(System.Threading.CancellationToken)` API. It's part of the infrastructure for the async streams feature.

## CollectionBuilder attribute

The `System.Runtime.CompilerServices.CollectionBuilderAttribute` attribute specifies a method that builds an instance of a collection type from a collection expression. You use this attribute to specify a method that builds the collection. The compiler generates code to call that method when a collection expression is converted to that type.

## InlineArray attribute

The `System.Runtime.CompilerServices.InlineArrayAttribute` attribute marks a type as an inline array. You can learn more about this feature in the article on `structs`, in the section on inline arrays.

> **Important:**
> This attribute can't be combined with the `ExtendedLayout` attribute.

## ExtendedLayout attribute

The `System.Runtime.InteropServices.ExtendedLayoutAttribute` instructs the compiler to set the `System.Reflection.TypeAttributes.ExtendedLayout` flag in the type's `System.Type.Attributes` flags.

> **Important:**
> This attribute can't be combined with the `StructLayoutAttribute` or the `InlineArray` attribute.

## IUnknownConstant and IDispatchConstant attributes

The `System.Runtime.CompilerServices.IUnknownConstantAttribute` and `System.Runtime.CompilerServices.IDispatchConstantAttribute` attributes can be added to default parameters to indicate that a missing argument should be supplied as `new UnknownWrapper(null)` or `new DispatchWrapper(null)`.

## See also

- `System.Attribute`
- `System.Reflection`
- Attributes
- Reflection
