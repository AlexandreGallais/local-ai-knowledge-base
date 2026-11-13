---
title: "Breaking change: Ambiguous overload resolution affecting StringValues implicit operators"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/9.0/ambiguous-overload.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Ambiguous overload resolution affecting StringValues implicit operators

In .NET 9, a breaking change in the `params Span<T>` lang feature creates ambiguity with the implicit operators of `Microsoft.Extensions.Primitives.StringValues`. This change results in the compiler throwing error `CS0121` when it encounters ambiguous method calls.

## Previous behavior

The APIs mentioned in the Affected APIs section previously had no overloads ambiguous with the implicit operators of `Microsoft.Extensions.Primitives.StringValues`. As a result, the compiler would resolve the overloads without any issues.

## New behavior

The compiler throws error `CS0121` when encountering these ambiguous overloads, resulting in the following error:

```output
CS0121: The call is ambiguous between the following methods or properties: 'Program.Join(string, params string[])' and 'Program.Join(string, params ReadOnlySpan<string>)'
```

## Version introduced

.NET 9

## Type of breaking change

This change is a source compatibility change.

## Reason for change

`Microsoft.Extensions.Primitives.StringValues` has implicit operators for `string` and `string[]` that cause conflicts with the `params Span<T>` lang feature.

## Recommended action

Explicitly specify the method you intend to call by casting the arguments to the appropriate type or apply named parameters.

## Affected APIs

- `System.String.Concat(System.ReadOnlySpan{System.String})`
- `System.String.Join(System.Char,System.ReadOnlySpan{System.String})`
- `System.String.Join(System.String,System.ReadOnlySpan{System.String})`
- `System.IO.Path.Combine(System.ReadOnlySpan{System.String})`
- `System.IO.Path.Join(System.ReadOnlySpan{System.String})`
- `System.Text.StringBuilder.AppendJoin(System.String,System.ReadOnlySpan{System.String})`
- `System.Text.StringBuilder.AppendJoin(System.Char,System.ReadOnlySpan{System.Object})`
