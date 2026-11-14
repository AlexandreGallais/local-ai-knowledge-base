---
title: "Extension member declarations (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/extension.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Extension member declarations (part 2 of 2)

## Extension indexers

Starting with C# 15, you can declare *indexers* in an `extension` block. An extension indexer lets you index into a receiver as though the indexer were declared on the receiver type. Because indexers are always instance members, an extension block that declares an indexer must provide a named receiver parameter. Extension indexers support the same features as ordinary indexers, including `get` and `set` accessors, expression-bodied accessors, and ref-returning accessors.

The following example declares a get-only indexer on `IEnumerable<int>` that returns the element at a specified position:

```csharp
/// <summary>
/// Contains an extension indexer for numeric sequences.
/// </summary>
public static class SequenceIndexer
{
    /// <summary>
    /// Defines an indexer for integer sequences.
    /// </summary>
    /// <param name="sequence">The sequence used as a receiver.</param>
    extension(IEnumerable<int> sequence)
    {
        /// <summary>
        /// Gets the element at the specified position in the sequence.
        /// </summary>
        /// <param name="index">The zero-based position of the element to retrieve.</param>
        /// <value>The element at the specified position.</value>
        public int this[int index] => sequence.ElementAt(index);
    }
}
```
You index into the receiver as though the indexer were a member of the receiver type:

```csharp
int third = numbers[2];
```
### Index and range access

Extension members can also supply the members needed for implicit `Index` and `Range` access. A `Length` or `Count` property and an integer indexer support indexing from the end. A `Slice(int, int)` method supports range access. These members can be instance members, extension members, or a combination of both.

For example, `Readings` wraps an array without declaring indexing members. Its extensions supply `Count`, an integer indexer, and `Slice`:

```csharp
/// <summary>Stores sensor readings.</summary>
public sealed class Readings(int[] values)
{
    /// <summary>Gets the stored readings.</summary>
    public int[] Values { get; } = values;
}

/// <summary>Provides indexing for sensor readings.</summary>
public static class ReadingExtensions
{
    /// <summary>Defines indexing members for readings.</summary>
    /// <param name="readings">The readings to access.</param>
    extension(Readings readings)
    {
        /// <summary>Gets the number of readings.</summary>
        public int Count => readings.Values.Length;

        /// <summary>Gets a reading by position.</summary>
        /// <param name="index">The zero-based position.</param>
        public int this[int index] => readings.Values[index];

        /// <summary>Gets a range of readings.</summary>
        /// <param name="start">The first position.</param>
        /// <param name="length">The number of readings.</param>
        public Readings Slice(int start, int length)
            => new(readings.Values.AsSpan(start, length).ToArray());
    }
}
```
These members enable ordinary indexing, indexing from the end, ranges, and list patterns:

```csharp
Readings readings = new([10, 20, 30, 40]);
Console.WriteLine(readings[^1]);                    // output: 40
Console.WriteLine(readings[1..3][0]);               // output: 20
Console.WriteLine(readings is [10, .., 40]);        // output: True
```
### Lookup and restrictions

For indexer lookup, the compiler tries applicable members in this order:

1. An indexer declared on the receiver type.
2. Implicit index or range access using instance members.
3. An extension indexer.
4. Implicit index or range access using extension members.

An earlier applicable form takes precedence over a later one. For example, an instance integer indexer with an instance `Length` property can handle `receiver[^1]` before an extension indexer that directly accepts `Index`.

Extension indexers and related members have the following restrictions:

- Extension indexers aren't used for string or array element access, even if you declare extensions for those types.
- An expression tree can't contain an extension property or indexer access.
- Extension `Length` and `Count` properties don't participate in collection-expression spread optimizations.

## See also

- Extensions feature specification
- Extension indexers feature specification

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.
