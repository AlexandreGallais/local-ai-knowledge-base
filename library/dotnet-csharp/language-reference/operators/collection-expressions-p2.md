---
title: "Collection expressions (Collection literals) (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/collection-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Collection expressions (Collection literals) (part 2 of 2)

## Collection expression arguments

Starting in C# 15, you can pass arguments to the underlying collection's constructor or factory method by using a `with(...)` element as the first element in a collection expression. This feature enables you to specify capacity, comparers, or other constructor parameters directly within the collection expression syntax. For more information, see the collection expression arguments feature specification.

The `with(...)` element must be the first element in the collection expression. The arguments declared in the `with(...)` element go to the appropriate constructor or create method based on the target type. You can use any valid expression for the arguments in the `with` element.

Argument expressions and element expressions are evaluated once, in left-to-right order, with the `with(...)` arguments evaluated before the collection elements. For a spread such as `.. GetItems()`, evaluation calls `GetItems()` to obtain the collection to spread. Enumeration is the separate step that reads items from that collection and adds them to the result. The compiler evaluates `GetItems()` at its left-to-right position, but can delay enumeration until after it evaluates later element expressions. Don't rely on side effects from enumeration occurring before those later expressions.

### Constructor arguments

When the target type is a class or struct that implements `System.Collections.IEnumerable`, the arguments in `with(...)` are evaluated and the results go to the constructor. The compiler uses overload resolution to select the best matching constructor:

```csharp
public void CollectionArgumentsExamples()
{
    string[] values = ["one", "two", "three"];

    // Pass capacity argument to List<T> constructor
    List<string> names = [with(capacity: values.Length * 2), .. values];

    // Pass comparer argument to HashSet<T> constructor
    HashSet<string> set = [with(StringComparer.OrdinalIgnoreCase), "Hello", "HELLO", "hello"];
    // set contains only one element because all strings are equal with OrdinalIgnoreCase

    // Pass capacity to IList<T> (uses List<T> constructor)
    IList<int> numbers = [with(capacity: 100), 1, 2, 3];
}
```
In the preceding example:

- The `List<string>` constructor with a `capacity` parameter gets called with `values.Length * 2`.
- The `HashSet<string>` constructor with an `System.Collections.Generic.IEqualityComparer`1` parameter gets called with `StringComparer.OrdinalIgnoreCase`.
- For interface target types like `System.Collections.Generic.IList`1`, the compiler creates a `List<T>` with the specified capacity.

For a target type constructed this way, `with(...)` is required if the type has no accessible parameterless constructor. Use it to supply the arguments to an accessible constructor. For example, `NamedValues` requires a name and inherits the collection behavior of `List<int>`:

```csharp
public class NamedValues(string name) : List<int>
{
    public string Name { get; } = name;
}
```
This collection expression supplies the required name and then adds the elements:

```csharp
NamedValues readings = [with("temperature"), 18, 21, 24];
Console.WriteLine($"{readings.Name}: {string.Join(", ", readings)}");
// output: temperature: 18, 21, 24
```
### Collection builder arguments

For types with a `System.Runtime.CompilerServices.CollectionBuilderAttribute`, the `with(...)` element evaluates the declared arguments and sends the results to the create method *before* the `ReadOnlySpan<T>` parameter. This feature allows create methods to accept configuration parameters:

```csharp
internal static class MySetBuilder
{
    internal static MySet<T> Create<T>(ReadOnlySpan<T> items) => new MySet<T>(items);
    internal static MySet<T> Create<T>(IEqualityComparer<T> comparer, ReadOnlySpan<T> items) => 
        new MySet<T>(items, comparer);
}
```
Use the `with(...)` element to pass the comparer:

```csharp
public void CollectionBuilderArgumentsExample()
{
    // Pass comparer to a type with CollectionBuilder attribute
    // The comparer argument is passed before the ReadOnlySpan<T> parameter
    MySet<string> mySet = [with(StringComparer.OrdinalIgnoreCase), "A", "a", "B"];
    // mySet contains only two elements: "A" and "B"
}
```
Overload resolution selects the create method based on the arguments you provide. The `ReadOnlySpan<T>` containing the collection elements is always the last parameter.

### Interface target types

Several interface target types support collection expression arguments. The following table shows the supported interfaces and their applicable constructor signatures:

| Interface | Supported `with` elements |
|-----------|---------------------|
| `System.Collections.Generic.IEnumerable`1`, `System.Collections.Generic.IReadOnlyCollection`1`, `System.Collections.Generic.IReadOnlyList`1` | `()` (empty only) |
| `System.Collections.Generic.ICollection`1`, `System.Collections.Generic.IList`1` | `()`, `(int capacity)` |

For `System.Collections.Generic.IList`1` and `System.Collections.Generic.ICollection`1`, the compiler uses a `System.Collections.Generic.List`1` with the specified constructor.

### Restrictions

The `with(...)` element has the following restrictions:

- It must be the first element in the collection expression.
- Arguments can't have `dynamic` type.
- It's not supported for arrays or span types (`Span<T>`, `ReadOnlySpan<T>`).
- The arguments in `with(...)` don't affect whether a conversion exists from the collection expression to a candidate target type. Overload resolution and type inference for an enclosing call ignore those arguments. Only the presence of a `with(...)` element, not its arguments, affects whether that conversion exists. Once the target type is determined, the arguments do participate in overload resolution for its constructor or collection builder method.

For example, a comparer argument doesn't tell the compiler to choose a `HashSet<string>` overload over a `List<string>` overload:

```csharp
class Examples
{
    static void Print(List<string> values) { }
    static void Print(HashSet<string> values) { }

    static void Example()
    {
        Print([with(StringComparer.OrdinalIgnoreCase), "one", "ONE"]);
    }
}
```

The call produces **CS0121**: "The call is ambiguous between the following methods or properties." Although only `HashSet<string>` has a constructor that accepts this comparer, the compiler ignores the `with(...)` arguments when it chooses the `Print` overload. Assign the collection expression to a `HashSet<string>` variable first to select that overload.

Similarly, `with(...)` arguments don't supply element types for generic type inference:

```csharp
class Examples
{
    static void Use<T>(List<T> values) { }

    static void Example()
    {
        Use([with(10)]);
    }
}
```

This call produces **CS0411**: "The type arguments can't be inferred from the usage. Try specifying the type arguments explicitly." The capacity argument doesn't determine `T`, and the collection has no elements from which to infer it. Specify the type argument, such as `Use<int>([with(10)])`.
