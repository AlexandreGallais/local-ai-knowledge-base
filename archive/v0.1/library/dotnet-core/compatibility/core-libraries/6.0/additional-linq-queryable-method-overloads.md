---
title: ".NET 6 breaking change: Additional overloads of LINQ Queryable methods"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/additional-linq-queryable-method-overloads.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# New System.Linq.Queryable method overloads

Additional public method overloads have been added to `System.Linq.Queryable` as part of the new features implemented in <https://github.com/dotnet/runtime/pull/47231>. If your reflection code isn't sufficiently robust when looking up methods, these additions can break your query provider implementations.

## Change description

In .NET 6, new overloads were added to the methods listed in the Affected APIs section. Reflection code, such as that shown in the following example, may break as a result of these additions:

```csharp
typeof(System.Linq.Queryable)
    .GetMethods(BindingFlags.Public | BindingFlags.Static)
    .Where(m => m.Name == "ElementAt")
    .Single();
```

This reflection code will now throw an `System.InvalidOperationException` with a message similar to: **Sequence contains more than one element**.

## Version introduced

.NET 6

## Reason for change

The new overloads were added to extend the LINQ `Queryable` API.

## Recommended action

If you're a query-provider library author, ensure that your reflection code is tolerant of method overload additions. For example, use a `System.Type.GetMethod*` overload that explicitly accepts the method's parameter types.

## Affected APIs

New overloads were added for the following `System.Linq.Queryable` extension methods:

- `System.Linq.Queryable.ElementAt*`
- `System.Linq.Queryable.ElementAtOrDefault*`
- `System.Linq.Queryable.Take*`
- `System.Linq.Queryable.Min*`
- `System.Linq.Queryable.Max*`
- `System.Linq.Queryable.FirstOrDefault*`
- `System.Linq.Queryable.LastOrDefault*`
- `System.Linq.Queryable.SingleOrDefault*`
- `System.Linq.Queryable.Zip*`
