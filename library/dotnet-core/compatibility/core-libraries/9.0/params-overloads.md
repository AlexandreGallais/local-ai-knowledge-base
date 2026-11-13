---
title: "Breaking change: C# overload resolution prefers `params` span-type overloads"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/9.0/params-overloads.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# overload resolution prefers `params` span-type overloads

C# 13 added support for `params` parameters declared with collection types other than arrays. In particular, `params ReadOnlySpan<T>` and `params Span<T>` are supported, and overload resolution prefers a `params` span type over a `params` array type when both are applicable.

.NET 9 added `params` span overloads for various methods in the core .NET libraries. Those methods had pre-existing overloads that took `params` arrays. When you recompile code with existing calls to those methods where arguments are passed in expanded form, the compiler will now bind to the `params` span overload.

The new binding leads to a potential breaking change for existing calls to those overloads within `System.Linq.Expressions.Expression` lambda expressions, which don't support `ref struct` instances. In those cases, the C# 13 compiler reports an error when binding to the `params` span overload.

For example, consider `string.Join()`:

```csharp
using System;
using System.Linq.Expressions;

Expression<Func<string, string, string>> join =
    (x, y) => string.Join("", x, y);
```

When compiled with .NET 8, the call binds to `System.String.Join(System.String,System.String[])`, without errors.

When compiled with C# 13 and .NET 9, the call binds to `System.String.Join(System.String,System.ReadOnlySpan{System.String})`, and because the call is within an expression tree, the following errors are reported:

> error CS8640: Expression tree cannot contain value of ref struct or restricted type 'ReadOnlySpan'.
> error CS9226: An expression tree may not contain an expanded form of non-array params

## Version introduced

.NET 9

## Previous behavior

Prior to C# 13, `params` parameters were limited to array types only. Calls to those methods in expanded form resulted in implicit array instances only, which are supported in `System.Linq.Expressions.Expression` lambda expressions.

## New behavior

With C# 13 and .NET 9, for methods with overloads that take `params` array types and `params` span types, overload resolution prefers the `params` span overload. Such a call creates an implicit span instance at the call site. For calls within `System.Linq.Expressions.Expression` lambda expressions, the implicit `ref struct` span instance is reported as a compiler error.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The new method overloads were added for performance reasons. `params` span support allows the compiler to avoid an allocation for the `params` argument at the call site.

## Recommended action

If your code is affected, the recommended workaround is to call the method with an explicit array so the call binds to the `params` array overload.

For the previous example, use `new string[] { ... }`:

```csharp
Expression<Func<string, string, string>> join =
    (x, y) => string.Join("", new string[] { x, y });
```

## Affected APIs

- `System.Collections.Immutable.ImmutableArray.Create``1(System.ReadOnlySpan{``0})`
- `System.Collections.Immutable.ImmutableArray`1.AddRange(System.ReadOnlySpan{`0})`
- `System.Collections.Immutable.ImmutableArray`1.InsertRange(System.Int32,System.ReadOnlySpan{`0})`
- `System.Collections.Immutable.ImmutableArray`1.Builder.AddRange(System.ReadOnlySpan{`0})`
- `System.Collections.Immutable.ImmutableArray`1.Builder.AddRange``1(System.ReadOnlySpan{``0})`
- `System.Collections.Immutable.ImmutableHashSet.Create``1(System.Collections.Generic.IEqualityComparer{``0},System.ReadOnlySpan{``0})`
- `System.Collections.Immutable.ImmutableHashSet.Create``1(System.ReadOnlySpan{``0})`
- `System.Collections.Immutable.ImmutableList.Create``1(System.ReadOnlySpan{``0})`
- `System.Collections.Immutable.ImmutableQueue.Create``1(System.ReadOnlySpan{``0})`
- `System.Collections.Immutable.ImmutableSortedSet.Create``1(System.Collections.Generic.IComparer{``0},System.ReadOnlySpan{``0})`
- `System.Collections.Immutable.ImmutableSortedSet.Create``1(System.ReadOnlySpan{``0})`
- `System.Collections.Immutable.ImmutableStack.Create``1(System.ReadOnlySpan{``0})`
- `System.Console.Write(System.String,System.ReadOnlySpan{System.Object})`
- `System.Console.WriteLine(System.String,System.ReadOnlySpan{System.Object})`
- `System.Diagnostics.Metrics.Counter`1.Add(`0,System.ReadOnlySpan{System.Collections.Generic.KeyValuePair{System.String,System.Object}})`
- `System.Diagnostics.Metrics.Gauge`1.Record(`0,System.ReadOnlySpan{System.Collections.Generic.KeyValuePair{System.String,System.Object}})`
- `System.Diagnostics.Metrics.UpDownCounter`1.Add(`0,System.ReadOnlySpan{System.Collections.Generic.KeyValuePair{System.String,System.Object}})`
- `System.Diagnostics.Metrics.Histogram`1.Record(`0,System.ReadOnlySpan{System.Collections.Generic.KeyValuePair{System.String,System.Object}})`
- `System.MemoryExtensions.TryWrite(System.Span{System.Char},System.IFormatProvider,System.Text.CompositeFormat,System.Int32@,System.ReadOnlySpan{System.Object})`
- `System.Delegate.Combine(System.ReadOnlySpan{System.Delegate})`
- `System.String.Concat(System.ReadOnlySpan{System.Object})`
- `System.String.Concat(System.ReadOnlySpan{System.String})`
- `System.String.Format(System.IFormatProvider,System.Text.CompositeFormat,System.ReadOnlySpan{System.Object})`
- `System.String.Format(System.IFormatProvider,System.String,System.ReadOnlySpan{System.Object})`
- `System.String.Format(System.String,System.ReadOnlySpan{System.Object})`
- `System.String.Join(System.Char,System.ReadOnlySpan{System.Object})`
- `System.String.Join(System.Char,System.ReadOnlySpan{System.String})`
- `System.String.Join(System.String,System.ReadOnlySpan{System.Object})`
- `System.String.Join(System.String,System.ReadOnlySpan{System.String})`
- `System.String.Split(System.ReadOnlySpan{System.Char})`
- `System.CodeDom.Compiler.IndentedTextWriter.Write(System.String,System.ReadOnlySpan{System.Object})`
- `System.CodeDom.Compiler.IndentedTextWriter.WriteLine(System.String,System.ReadOnlySpan{System.Object})`
- `System.IO.Path.Combine(System.ReadOnlySpan{System.String})`
- `System.IO.Path.Join(System.ReadOnlySpan{System.String})`
- `System.IO.StreamWriter.Write(System.String,System.ReadOnlySpan{System.Object})`
- `System.IO.StreamWriter.WriteLine(System.String,System.ReadOnlySpan{System.Object})`
- `System.IO.TextWriter.Write(System.String,System.ReadOnlySpan{System.Object})`
- `System.IO.TextWriter.WriteLine(System.String,System.ReadOnlySpan{System.Object})`
- `System.Text.StringBuilder.AppendFormat(System.IFormatProvider,System.Text.CompositeFormat,System.ReadOnlySpan{System.Object})`
- `System.Text.StringBuilder.AppendFormat(System.IFormatProvider,System.String,System.ReadOnlySpan{System.Object})`
- `System.Text.StringBuilder.AppendFormat(System.String,System.ReadOnlySpan{System.Object})`
- `System.Text.StringBuilder.AppendJoin(System.Char,System.ReadOnlySpan{System.Object})`
- `System.Text.StringBuilder.AppendJoin(System.Char,System.ReadOnlySpan{System.String})`
- `System.Text.StringBuilder.AppendJoin(System.String,System.ReadOnlySpan{System.Object})`
- `System.Text.StringBuilder.AppendJoin(System.String,System.ReadOnlySpan{System.String})`
- `System.Threading.CancellationTokenSource.CreateLinkedTokenSource(System.ReadOnlySpan{System.Threading.CancellationToken})`
- `System.Threading.Tasks.Task.WaitAll(System.ReadOnlySpan{System.Threading.Tasks.Task})`
- `System.Threading.Tasks.Task.WhenAll(System.ReadOnlySpan{System.Threading.Tasks.Task})`
- `System.Threading.Tasks.Task.WhenAll``1(System.ReadOnlySpan{System.Threading.Tasks.Task{``0}})`
- `System.Threading.Tasks.Task.WhenAny(System.ReadOnlySpan{System.Threading.Tasks.Task})`
- `System.Threading.Tasks.Task.WhenAny``1(System.ReadOnlySpan{System.Threading.Tasks.Task{``0}})`
- `System.Text.Json.Nodes.JsonArray.#ctor(System.Text.Json.Nodes.JsonNodeOptions,System.ReadOnlySpan{System.Text.Json.Nodes.JsonNode})`
- `System.Text.Json.Nodes.JsonArray.#ctor(System.ReadOnlySpan{System.Text.Json.Nodes.JsonNode})`
- `System.Text.Json.Serialization.Metadata.JsonTypeInfoResolver.Combine(System.ReadOnlySpan{System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver})`

## See also

- What's new: `params ReadOnlySpan<T>` overloads
