---
title: "Built-in types"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/built-in-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Built-in types (C# reference)

The following table lists the C# built-in value types:

| C# type keyword                              | .NET type                                          |
|----------------------------------------------|----------------------------------------------------|
| `bool`                            | `System.Boolean` |
| `byte`          | `System.Byte`    |
| `sbyte`         | `System.SByte`   |
| `char`                            | `System.Char`    |
| `decimal` | `System.Decimal` |
| `double`  | `System.Double`  |
| `float`   | `System.Single`  |
| `int`           | `System.Int32`   |
| `uint`          | `System.UInt32`  |
| `nint`          | `System.IntPtr`  |
| `nuint`         | `System.UIntPtr` |
| `long`          | `System.Int64`   |
| `ulong`         | `System.UInt64`  |
| `short`         | `System.Int16`   |
| `ushort`        | `System.UInt16`  |

The following table lists the C# built-in reference types:

| C# type keyword                                    | .NET type                                          |
|----------------------------------------------------|----------------------------------------------------|
| `object`     |`System.Object`   |
| `string`     |`System.String`   |
| `delegate` |`System.Delegate` |
| `dynamic`   |`System.Object`   |

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

In the preceding tables, most C# type keywords from the left column are aliases for the corresponding .NET type. They're interchangeable. For example, the following declarations declare variables of the same type:

```csharp
int a = 123;
System.Int32 b = 123;
```

The `dynamic` type is similar to `object`. The main differences are:

- Operations on a `dynamic` expression are bound at runtime, not at compile time.
- You can't use `new dynamic()`.
- You can't derive a type from the `dynamic` type.

The `delegate` keyword is a built-in reference type keyword that declares a type derived from `System.Delegate`. Unlike the other built-in type keywords, `delegate` isn't an alias for a specific .NET type. Instead, it declares custom types that derive from the abstract `System.Delegate` type. Similarly, `dynamic` represents runtime binding behavior rather than being a direct alias for a specific .NET type.

The `void` keyword represents the absence of a type. You use it as the return type of a method that doesn't return a value.

The C# language includes specialized rules for the `System.Span`1` and `System.ReadOnlySpan`1` types. These types aren't classified as built-in types, because there aren't C# keywords that correspond to these types. The C# language defines implicit conversions from array types and the string type to `Span<T>` and `ReadOnlySpan<T>`. These conversions integrate `Span` types into more natural programming scenarios. The following conversions are defined as *implicit span conversions*:

- From any single-dimensional array with element type `E` to `System.Span<E>`
- From any single-dimensional array with element type `E` to `System.ReadOnlySpan`, when `E` has covariance conversion or an identity conversion to `U`
- From `System.Span<E>` to `System.ReadOnlySpan`, when `E` has a covariance conversion or an identity conversion to `U`
- From `System.ReadOnlySpan<E>` to `System.ReadOnlySpan`, when `E` has a covariance conversion or an identity conversion to `U`
- From `string` to `System.ReadOnlySpan<char>`

The compiler never ignores any user defined conversion where an applicable *implicit span conversion* exists. Implicit span conversions can be applied to receiver parameter of extension members. The receiver parameter is specified by the `extension` keyword in an extension member. The receiver parameter is the first parameter of an extension method using the `this` modifier. Implicit span conversions aren't considered for method group conversions.

## See also

- Use language keywords instead of framework type names (style rule IDE0049)
- Default values of C# types
