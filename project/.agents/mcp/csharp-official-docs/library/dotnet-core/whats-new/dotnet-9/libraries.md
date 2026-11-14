---
title: "What's new in .NET libraries for .NET 9 (part 1 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-9/libraries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 9

This article describes new features in the .NET libraries for .NET 9.

## Base64Url

Base64 is an encoding scheme that translates arbitrary bytes into text composed of a specific set of 64 characters. It's a common approach for transferring data and has long been supported via a variety of methods, such as with `System.Convert.ToBase64String*` or `System.Buffers.Text.Base64.DecodeFromUtf8(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@,System.Int32@,System.Boolean)`. However, some of the characters it uses makes it less than ideal for use in some circumstances you might otherwise want to use it, such as in query strings. In particular, the 64 characters that comprise the Base64 table include '+' and '/', both of which have their own meaning in URLs. This led to the creation of the Base64Url scheme, which is similar to Base64 but uses a slightly different set of characters that makes it appropriate for use in URLs contexts. .NET 9 includes the new `System.Buffers.Text.Base64Url` class, which provides many helpful and optimized methods for encoding and decoding with `Base64Url` to and from a variety of data types.

The following example demonstrates using the new class.

```csharp
ReadOnlySpan<byte> bytes = ...;
string encoded = Base64Url.EncodeToString(bytes);
```

## BinaryFormatter

.NET 9 removes `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` from the .NET runtime. The APIs are still present, but their implementations always throw an exception, regardless of project type. For more information about the removal and your options if you're affected, see BinaryFormatter migration guide.

## Collections

The collection types in .NET gain the following updates for .NET 9:

- Collection lookups with spans
- `OrderedDictionary<TKey, TValue>`
- PriorityQueue.Remove() method lets you update the priority of an item in the queue.
- `ReadOnlySet<T>`

### Collection lookups with spans

In high-performance code, spans are often used to avoid allocating strings unnecessarily, and lookup tables with types like `System.Collections.Generic.Dictionary`2` and `System.Collections.Generic.HashSet`1` are frequently used as caches. However, there has been no safe, built-in mechanism for doing lookups on these collection types with spans. With the new `allows ref struct` feature in C# 13 and new features on these collection types in .NET 9, it's now possible to perform these kinds of lookups.

The following example demonstrates using Dictionary<TKey,TValue>.GetAlternateLookup.

```csharp
static Dictionary<string, int> CountWords(ReadOnlySpan<char> input)
{
    Dictionary<string, int> wordCounts = new(StringComparer.OrdinalIgnoreCase);
    Dictionary<string, int>.AlternateLookup<ReadOnlySpan<char>> spanLookup =
        wordCounts.GetAlternateLookup<ReadOnlySpan<char>>();

    foreach (Range wordRange in Regex.EnumerateSplits(input, @"\b\W+"))
    {
        if (wordRange.Start.Value == wordRange.End.Value)
        {
            continue; // Skip empty ranges.
        }
        ReadOnlySpan<char> word = input[wordRange];
        spanLookup[word] = spanLookup.TryGetValue(word, out int count) ? count + 1 : 1;
    }

    return wordCounts;
}
```
### `OrderedDictionary<TKey, TValue>`

In many scenarios, you might want to store key-value pairs in a way where order can be maintained (a list of key-value pairs) but where fast lookup by key is also supported (a dictionary of key-value pairs). Since the early days of .NET, the `System.Collections.Specialized.OrderedDictionary` type has supported this scenario, but only in a non-generic manner, with keys and values typed as `object`. .NET 9 introduces the long-requested `System.Collections.Generic.OrderedDictionary`2` collection, which provides an efficient, generic type to support these scenarios.

The following code uses the new class.

```csharp
OrderedDictionary<string, int> d = new()
{
    ["a"] = 1,
    ["b"] = 2,
    ["c"] = 3,
};

d.Add("d", 4);
d.RemoveAt(0);
d.RemoveAt(2);
d.Insert(0, "e", 5);

foreach (KeyValuePair<string, int> entry in d)
{
    Console.WriteLine(entry);
}

// Output:
// [e, 5]
// [b, 2]
// [c, 3]
```
### PriorityQueue.Remove() method

.NET 6 introduced the `System.Collections.Generic.PriorityQueue`2` collection, which provides a simple and fast array-heap implementation. One issue with array heaps in general is that they don't support priority updates, which makes them prohibitive for use in algorithms such as variations of Dijkstra's algorithm.

While it's not possible to implement efficient $O(\log n)$ priority updates in the existing collection, the new `System.Collections.Generic.PriorityQueue`2.Remove(`0,`0@,`1@,System.Collections.Generic.IEqualityComparer{`0})` method makes it possible to emulate priority updates (albeit at $O(n)$ time):

```csharp
public static void UpdatePriority<TElement, TPriority>(
    this PriorityQueue<TElement, TPriority> queue,
    TElement element,
    TPriority priority
    )
{
    // Scan the heap for entries matching the current element.
    queue.Remove(element, out _, out _);
    // Re-insert the entry with the new priority.
    queue.Enqueue(element, priority);
}
```
This method unblocks users who want to implement graph algorithms in contexts where asymptotic performance isn't a blocker. (Such contexts include education and prototyping.) For example, here's a toy implementation of Dijkstra's algorithm that uses the new API.

### `ReadOnlySet<T>`

It's often desirable to give out read-only views of collections. `System.Collections.ObjectModel.ReadOnlyCollection`1` lets you create a read-only wrapper around an arbitrary mutable `System.Collections.Generic.IList`1`, and `System.Collections.ObjectModel.ReadOnlyDictionary`2` lets you create a read-only wrapper around an arbitrary mutable `System.Collections.Generic.IDictionary`2`. However, past versions of .NET had no built-in support for doing the same with `System.Collections.Generic.ISet`1`. .NET 9 introduces `System.Collections.ObjectModel.ReadOnlySet`1` to address this.

The new class enables the following usage pattern.

```csharp
private readonly HashSet<int> _set = [];
private ReadOnlySet<int>? _setWrapper;

public ReadOnlySet<int> Set => _setWrapper ??= new(_set);
```
## Component model - `TypeDescriptor` trimming support

`System.ComponentModel` includes new opt-in trimmer-compatible APIs for describing components. Any application, especially self-contained trimmed applications, can use these new APIs to help support trimming scenarios.

The primary API is the `System.ComponentModel.TypeDescriptor.RegisterType*` method on the `TypeDescriptor` class. This method has the `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute` attribute so that the trimmer preserves members for that type. You should call this method once per type, and typically early on.

The secondary APIs have a `FromRegisteredType` suffix, such as `System.ComponentModel.TypeDescriptor.GetPropertiesFromRegisteredType(System.Type)`. Unlike their counterparts that don't have the `FromRegisteredType` suffix, these APIs don't have `[RequiresUnreferencedCode]` or `[DynamicallyAccessedMembers]` trimmer attributes. The lack of trimmer attributes helps consumers by no longer having to either:

- Suppress trimming warnings, which can be risky.
- Propagate a strongly typed `Type` parameter to other methods, which can be cumbersome or infeasible.

```csharp
﻿using System;
using System.ComponentModel;

internal class TypeDescriptorExamples
{
    public static void RunIt()
    {
        // The Type from typeof() is passed to a different method.
        // The trimmer doesn't know about ExampleClass anymore
        // and thus there will be warnings when trimming.
        Test(typeof(ExampleClass));
        Console.ReadLine();
    }

    private static void Test(Type type)
    {
        // When publishing self-contained + trimmed,
        // this line produces warnings IL2026 and IL2067.
        PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(type);

        // When publishing self-contained + trimmed,
        // the property count is 0 here instead of 2.
        Console.WriteLine($"Property count: {properties.Count}");

        // To avoid the warning and ensure reflection
        // can see the properties, register the type:
        TypeDescriptor.RegisterType<ExampleClass>();
        // Get properties from the registered type.
        properties = TypeDescriptor.GetPropertiesFromRegisteredType(type);

        Console.WriteLine($"Property count: {properties.Count}");
    }

    public class ExampleClass
    {
        public string? Property1 { get; set; }
        public int Property2 { get; set; }
    }
}
```
For more information, see the API proposal.
