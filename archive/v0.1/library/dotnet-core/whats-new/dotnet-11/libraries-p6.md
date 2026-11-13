---
title: "What's new in .NET libraries for .NET 11 (part 6 of 8)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 11 (part 6 of 8)

### Collections improvements

- BitArray span constructors
- BitArray.PopCount
- EqualityComparer\<T>.Create
- ConcurrentQueue reliability fix
- System.Numerics.Tensors package compatibility

#### BitArray span constructors

`System.Collections.BitArray` now has constructors that accept `System.ReadOnlySpan`1`: `ReadOnlySpan<bool>`, `ReadOnlySpan<byte>`, and `ReadOnlySpan<int>`. You can construct a bit array directly from a slice or stack-allocated data without first allocating an array:

```csharp
Span<byte> bytes = stackalloc byte[] { 0b_0000_0011, 0b_1000_0000 };
var bits = new BitArray(bytes);

Console.WriteLine(bits[0]);  // True
Console.WriteLine(bits[1]);  // True
Console.WriteLine(bits[15]); // True
```
The span-based constructors avoid the intermediate array allocation that `new BitArray(span.ToArray())` requires.

#### BitArray.PopCount

The `System.Collections.BitArray` class now includes a `System.Collections.BitArray.PopCount` method that returns the number of bits set to `true` in the array. This provides an efficient way to count set bits without manually iterating through the array.

#### EqualityComparer\<T>.Create

To create an equality comparer from a key <example-value> function, use the new `System.Collections.Generic.EqualityComparer`1.Create*` factory method. You can pass an optional `System.Collections.Generic.IEqualityComparer`1` for the key type itself:

```csharp

// Create an equality comparer based on a key <example-value>
var byName = EqualityComparer<(string Name, int Age)>.Create(p => p.Name);

var people = new HashSet<(string Name, int Age)>(byName)
{
    ("Alice", 30),
    ("Bob", 25),
    ("Alice", 40), // Duplicate by name — not added
};
Console.WriteLine(people.Count); // 2
```
#### ConcurrentQueue reliability fix

`System.Collections.Concurrent.ConcurrentQueue`1.TryDequeue*` and `System.Collections.Concurrent.ConcurrentQueue`1.TryPeek*` no longer spuriously report an empty queue while the queue freezes a segment during growth.

#### System.Numerics.Tensors package compatibility

Updating the `System.Numerics.Tensors` package changes shape alignment and rejects unsupported overlapping storage layouts, including on target frameworks older than .NET 11. Review code that depends on a particular shape or on overlapping copies. Use separate destination storage or snapshot the source when overlap isn't supported. For details, see Tensor shape alignment and Tensor storage-layout validation.

## Extensions and developer platform

- Discriminated-union scaffolding
- MetadataLoadContext additions
- Reflection improvements
- Assembly.Location override for AssemblyLoadContext
- Reduced contention in System.IO.Pipelines
- URI data scheme constant
- StringSyntax attribute enhancements

### Discriminated-union scaffolding

.NET 11 introduces `System.Runtime.CompilerServices.UnionAttribute` and `System.Runtime.CompilerServices.IUnion` in `System.Runtime.CompilerServices`. These types are the runtime side of the C# discriminated-union design. They aren't directly user-facing yet—the C# compiler and source generators are the expected producers—but they ship in the framework so libraries can author against the surface now.

For the language-side design, see the discriminated unions working group overview.

### MetadataLoadContext additions

`System.Reflection.MetadataLoadContext.GetLoadContext(System.Reflection.Assembly)` returns the load context that produced a given `Assembly`, mirroring the long-existing API on `System.Runtime.Loader.AssemblyLoadContext`. This closes a gap for tooling that reflects over assemblies in an isolated `MetadataLoadContext` and needs to walk back from an `Assembly` reference to the context that owns it:

```csharp
using System.Reflection;
using System.Reflection.Metadata;

string[] paths = [typeof(object).Assembly.Location];
using var mlc = new MetadataLoadContext(new PathAssemblyResolver(paths));
Assembly asm = mlc.LoadFromAssemblyPath(typeof(object).Assembly.Location);

MetadataLoadContext owner = MetadataLoadContext.GetLoadContext(asm)!;
Console.WriteLine(ReferenceEquals(owner, mlc)); // true
```

### URI data scheme constant

A new `System.Uri.UriSchemeData` constant has been added, representing the `data:` URI scheme. This constant provides a standardized way to reference data URIs.

### Reflection improvements

#### Type.GetNullableUnderlyingType

`System.Type` gains a new virtual method, `System.Type.GetNullableUnderlyingType`, that returns the underlying value type for a `Nullable<T>` type, or `null` for any non-nullable type. Implementations are provided on `System.Type`, `System.Reflection.Emit.TypeBuilder`, `System.Reflection.Emit.EnumBuilder`, `System.Reflection.Emit.GenericTypeParameterBuilder`, and `System.Reflection.TypeDelegator`:

```csharp
Type nullableIntType = typeof(int?);
Type? underlying = nullableIntType.GetNullableUnderlyingType();
Console.WriteLine(underlying); // System.Int32

Type nonNullable = typeof(int);
Console.WriteLine(nonNullable.GetNullableUnderlyingType() is null); // True
```
#### ConstructorInfo.GetGenericArguments

`System.Reflection.ConstructorInfo.GetGenericArguments` now has an override, providing a consistent way to retrieve generic type arguments for constructor definitions, matching the behavior already available on other `MethodBase` subclasses.

### Assembly.Location override for AssemblyLoadContext

`System.Runtime.Loader.AssemblyLoadContext.SetAssemblyLocationOverride(System.Func{System.Reflection.Assembly,System.String,System.String})` is a set-once callback that can override the location reported by `System.Reflection.Assembly.Location`. This API helps hosts that stage assemblies in temporary paths or virtualized locations report stable, meaningful locations to diagnostics and resource-loading code.

### Reduced contention in System.IO.Pipelines

`System.IO.Pipelines` reduces reader and writer lock contention under high fan-in workloads. Internal changes include lower lock scope, local queue continuation scheduling, and pool updates that improve cache locality.

### StringSyntax attribute enhancements

The `System.Diagnostics.CodeAnalysis.StringSyntaxAttribute` class now includes constants for common programming languages:

- `System.Diagnostics.CodeAnalysis.StringSyntaxAttribute.CSharp` - Indicates C# syntax.
- `System.Diagnostics.CodeAnalysis.StringSyntaxAttribute.FSharp` - Indicates F# syntax.
- `System.Diagnostics.CodeAnalysis.StringSyntaxAttribute.VisualBasic` - Indicates Visual Basic syntax.

These constants can be used with the `StringSyntax` attribute to provide better tooling support for string literals containing code in these languages.
