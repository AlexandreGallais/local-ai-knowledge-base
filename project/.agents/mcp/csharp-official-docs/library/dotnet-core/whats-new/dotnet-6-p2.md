---
title: "What's new in .NET 6 (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-6.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET 6 (part 2 of 2)

## Generic math

In *preview* is the ability to use operators on generic types in .NET 6. .NET 6 introduces numerous interfaces that make use of C# 10's new preview feature, `static abstract` interface members. These interfaces correspond to different operators, for example, `IAdditionOperators` represents the `+` operator. The interfaces are available in the System.Runtime.Experimental NuGet package. For more information, see the Generic math blog post.

## NuGet package validation

If you're a NuGet library developer, new package-validation tooling enables you to validate that your packages are consistent and well-formed. You can determine if:

- There are any breaking changes across package versions.
- The package has the same set of public APIs for all runtime-specific implementations.
- There are any gaps for target-framework or runtime applicability.

For more information, see the Package Validation blog post.

## Reflection APIs

.NET 6 introduces the following new APIs that inspect code and provide nullability information:

- `System.Reflection.NullabilityInfo`
- `System.Reflection.NullabilityInfoContext`
- `System.Reflection.NullabilityState`

These APIs are useful for reflection-based tools and serializers.

## Microsoft.Extensions APIs

Several extensions namespaces have improvements in .NET 6, as the following table shows.

| Namespace | Improvements |
| - | - |
| `Microsoft.Extensions.DependencyInjection` | `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.CreateAsyncScope*` lets you safely use a `using` statement for a service provider that registers an `System.IAsyncDisposable` service. |
| `Microsoft.Extensions.Hosting` | New `Microsoft.Extensions.Hosting.HostingHostBuilderExtensions.ConfigureHostOptions*` methods simplify application setup. |
| `Microsoft.Extensions.Logging` | `Microsoft.Extensions.Logging` has a new source generator for performant logging APIs. The source generator is triggered if you add the new `Microsoft.Extensions.Logging.LoggerMessageAttribute` to a `partial` logging method. At compile time, the generator generates the implementation of the `partial` method, which is typically faster at runtime than existing logging solutions. For more information, see Compile-time logging source generation. |

## New LINQ APIs

Numerous LINQ methods have been added in .NET 6. Most of the new methods listed in the following table have equivalent methods in the `System.Linq.Queryable` type.

| Method | Description |
| - | - |
| `System.Linq.Enumerable.TryGetNonEnumeratedCount``1(System.Collections.Generic.IEnumerable{``0},System.Int32@)` | Attempts to determine the number of elements in a sequence without forcing an enumeration. |
| `System.Linq.Enumerable.Chunk``1(System.Collections.Generic.IEnumerable{``0},System.Int32)` | Splits the elements of a sequence into chunks of a specified size. |
| `System.Linq.Enumerable.MaxBy*` and `System.Linq.Enumerable.MinBy*` | Finds maximal or minimal elements using a key selector. |
| `System.Linq.Enumerable.DistinctBy*`, `System.Linq.Enumerable.ExceptBy*`, `System.Linq.Enumerable.IntersectBy*`, and `System.Linq.Enumerable.UnionBy*` | These new variations of methods that perform set-based operations let you specify equality using a key <example-value> function. |
| `System.Linq.Enumerable.ElementAt``1(System.Collections.Generic.IEnumerable{``0},System.Index)` and `System.Linq.Enumerable.ElementAtOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Index)` | Accepts indexes counted from the beginning or end of the sequence—for example, `Enumerable.Range(1, 10).ElementAt(^2)` returns `9`. |
| `System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},``0)` and `System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean},``0)``System.Linq.Enumerable.LastOrDefault``1(System.Collections.Generic.IEnumerable{``0},``0)` and `System.Linq.Enumerable.LastOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean},``0)``System.Linq.Enumerable.SingleOrDefault``1(System.Collections.Generic.IEnumerable{``0},``0)` and `System.Linq.Enumerable.SingleOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean},``0)` | New overloads let you specify a default value to use if the sequence is empty. |
| `System.Linq.Enumerable.Max``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0})` and `System.Linq.Enumerable.Min``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0})` | New overloads let you specify a comparer. |
| `System.Linq.Enumerable.Take``1(System.Collections.Generic.IEnumerable{``0},System.Range)` | Accepts a `System.Range` argument to simplify taking a slice of a sequence—for example, you can use `source.Take(2..7)` instead of `source.Take(7).Skip(2)`. |
| `System.Linq.Enumerable.Zip``3(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1},System.Collections.Generic.IEnumerable{``2})` | Produces a sequence of tuples with elements from *three* specified sequences. |

## Date, time, and time zone improvements

The following two structs were added in .NET 6: `System.DateOnly` and `System.TimeOnly`. These represent the date part and the time part of a `System.DateTime`, respectively. `System.DateOnly` is useful for birthdays and anniversaries, and `System.TimeOnly` is useful for daily alarms and weekly business hours.

You can now use either Internet Assigned Numbers Authority (IANA) or Windows time zone IDs on any operating system that has time zone data installed. The `System.TimeZoneInfo.FindSystemTimeZoneById(System.String)` method has been updated to automatically convert its input from a Windows time zone to an IANA time zone (or vice versa) if the requested time zone is not found on the system. In addition, the new methods `System.TimeZoneInfo.TryConvertIanaIdToWindowsId(System.String,System.String@)` and `System.TimeZoneInfo.TryConvertWindowsIdToIanaId*` have been added for scenarios when you still need to manually convert from one time zone format to another.

There are a few other time zone improvements as well. For more information, see Date, Time, and Time Zone Enhancements in .NET 6.

## PriorityQueue class

The new `System.Collections.Generic.PriorityQueue`2` class represents a collection of items that have both a value and a priority. Items are dequeued in increasing priority order—that is, the item with the lowest priority value is dequeued first. This class implements a min heap data structure.

## See also

- What's new in F# 6
- What's new in EF Core 6
- What's new in ASP.NET Core 6
- Release notes for .NET 6
- Release notes for Visual Studio 2022
- Blog: Announcing .NET 6
- Blog: Try the new System.Text.Json source generator
