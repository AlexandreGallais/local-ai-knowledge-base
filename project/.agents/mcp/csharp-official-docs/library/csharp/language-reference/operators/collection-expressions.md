---
title: "Collection expressions (Collection literals) (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/collection-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Collection expressions - C# language reference

Use a *collection expression* to create common collection values. A *collection expression* is a terse syntax that you can assign to many different collection types. A collection expression contains a sequence of elements between `[` and `]` brackets.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example declares a `System.Span`1` of `string` elements and initializes them to the days of the week:

```csharp
Span<string> weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
foreach (var day in weekDays)
{
    Console.WriteLine(day);
}
```
You can convert a *collection expression* to many different collection types. The first example demonstrated how to initialize a variable by using a collection expression. The following code shows many of the other locations where you can use a collection expression:

```csharp
// Initialize private field:
private static readonly ImmutableArray<string> _months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// property with expression body:
public IEnumerable<int> MaxDays =>
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

public int Sum(IEnumerable<int> values) =>
    values.Sum();

public void Example()
{
    // As a parameter:
    int sum = Sum([1, 2, 3, 4, 5]);
}
```
You can't use a collection expression where a compile-time constant is expected, such as when initializing a constant, or as the default value for a method argument.

Both of the previous examples used constants as the elements of a collection expression. You can also use variables for the elements, as shown in the following example:

```csharp
string hydrogen = "H";
string helium = "He";
string lithium = "Li";
string beryllium = "Be";
string boron = "B";
string carbon = "C";
string nitrogen = "N";
string oxygen = "O";
string fluorine = "F";
string neon = "Ne";
string[] elements = [hydrogen, helium, lithium, beryllium, boron, carbon, nitrogen, oxygen, fluorine, neon];
foreach (var element in elements)
{
    Console.WriteLine(element);
}
```
## Spread element

Use a *spread element* `..` to inline collection values in a collection expression. The following example creates a collection for the full alphabet by combining a collection of the vowels, a collection of the consonants, and the letter "y", which can be either:

```csharp
string[] vowels = ["a", "e", "i", "o", "u"];
string[] consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
                       "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
string[] alphabet = [.. vowels, .. consonants, "y"];
```
The spread element `..vowels`, when evaluated, produces five elements: `"a"`, `"e"`, `"i"`, `"o"`, and `"u"`. The spread element `..consonants` produces 20 elements, the number in the `consonants` array. The expression in a spread element must be enumerable by using a `foreach` statement. As shown in the previous example, you can combine spread elements with individual elements in a collection expression.

## Conversions

You can convert a *collection expression* to different collection types, including:

- `System.Span`1` and `System.ReadOnlySpan`1`.
- Arrays, such as `int[]` or `string[]`.
- Any type with a *create* method whose parameter type is `ReadOnlySpan<T>` where there's an implicit conversion from the collection expression type to `T`.
- Any type that supports a collection initializer, such as `System.Collections.Generic.List`1`. Usually, this requirement means the type supports `System.Collections.Generic.IEnumerable`1` and there's an accessible `Add` method to add items to the collection. There must be an implicit conversion from the collection expression elements' type to the collection's element type. For spread elements, there must be an implicit conversion from the spread element's type to the collection's element type.
- Any of the following interfaces:
  - `System.Collections.Generic.IEnumerable`1`.
  - `System.Collections.Generic.IReadOnlyCollection`1`.
  - `System.Collections.Generic.IReadOnlyList`1`.
  - `System.Collections.Generic.ICollection`1`.
  - `System.Collections.Generic.IList`1`.

> **Note:**
> You can't use collection expressions to initialize inline arrays. Inline arrays require different initialization syntax.

> **Important:**
> A collection expression always creates a collection that includes all elements in the collection expression, regardless of the target type of the conversion. For example, when the target of the conversion is `System.Collections.Generic.IEnumerable`1`, the generated code evaluates the collection expression and stores the results in an in-memory collection.
>
> This behavior is distinct from LINQ, where a sequence might not be instantiated until it is enumerated. You can't use collection expressions to generate an infinite sequence that won't be enumerated.

The compiler uses static analysis to determine the most performant way to create the collection declared with a collection expression. For example, the empty collection expression, `[]`, can be realized as `System.Array.Empty``1` if the target won't be modified after initialization. When the target is a `System.Span`1` or `System.ReadOnlySpan`1`, the storage might be stack allocated. The §12.8.25 Collection expressions clause of the C# standard specifies the rules the compiler must follow.

Many APIs are overloaded with multiple collection types as parameters. Because a collection expression can be converted to many different expression types, these APIs might require casts on the collection expression to specify the correct conversion. The following conversion rules resolve some of the ambiguities:

- A better element conversion is preferred over a better collection type conversion. In other words, the type of elements in the collection expression has more importance than the type of the collection. These rules are described in the better conversion from expression clause of the C# language specification.
- Conversion to `System.Span`1`, `System.ReadOnlySpan`1`, or another `ref struct` type is better than a conversion to a non-ref struct type.
- Conversion to a noninterface type is better than a conversion to an interface type.

When you convert a collection expression to a `Span` or `ReadOnlySpan`, the span object's *safe context* comes from the *safe context* of all elements included in the span. For detailed rules, see §9.7.2 Ref safe contexts in the C# standard.

## Collection builder

Collection expressions work with any collection type that is *well-behaved*. A well-behaved collection has the following characteristics:

- The value of `Count` or `Length` on a countable collection produces the same value as the number of elements when you enumerate the collection.
- The types in the `System.Collections.Generic` namespace are side-effect free. The compiler optimizes scenarios where these types might be used as intermediary values, but it doesn't expose them otherwise.
- A call to an applicable `.AddRange(x)` member on a collection results in the same final value as iterating over `x` and adding all of its enumerated values individually to the collection by using `.Add`.

All the collection types in the .NET runtime are well-behaved.

> **Warning:**
> If a custom collection type isn't well-behaved, the behavior is undefined when you use that collection type with collection expressions.

Your types opt in to collection expression support by writing a `Create()` method and applying the `System.Runtime.CompilerServices.CollectionBuilderAttribute` attribute on the collection type to indicate the builder method. For example, consider an application that uses fixed length buffers of 80 characters. That class might look something like the following code:

```csharp
public class LineBuffer : IEnumerable<char>
{
    private readonly char[] _buffer;
    private readonly int _count;

    public LineBuffer(ReadOnlySpan<char> buffer)
    {
        _buffer = new char[buffer.Length];
        _count = buffer.Length;
        for (int i = 0; i < _count; i++)
        {
            _buffer[i] = buffer[i];
        }
    }

    public int Count => _count;
    
    public char this[int index]
    {
        get
        {
            if (index >= _count)
                throw new IndexOutOfRangeException();
            return _buffer[index];
        }
    }

    public IEnumerator<char> GetEnumerator()
    {
        for (int i = 0; i < _count; i++)
        {
            yield return _buffer[i];
        }
    }
    
    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

    // etc
}
```
You want to use it with collection expressions as shown in the following sample:

```csharp
LineBuffer line = ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!'];
```
The `LineBuffer` type implements `IEnumerable<char>`, so the compiler recognizes it as a collection of `char` items. The type parameter of the implemented `System.Collections.Generic.IEnumerable`1` interface indicates the element type. You need to make two additions to your application to be able to assign collection expressions to a `LineBuffer` object. First, you need to create a class that contains a `Create` method:

```csharp
internal static class LineBufferBuilder
{
    internal static LineBuffer Create(ReadOnlySpan<char> values) => new LineBuffer(values);
}
```
The `Create` method must return a `LineBuffer` object, and it must take a final parameter of the type `ReadOnlySpan<char>`. The type parameter of the `ReadOnlySpan` must match the element type of the collection. A builder method that returns a generic collection has the generic `ReadOnlySpan<T>` as its parameter. The method must be accessible and `static`.

Starting in C# 15, the `Create` method can have additional parameters before the `ReadOnlySpan<T>` parameter. You can pass <example-value> to these parameters by using a `with(...)` element in the collection expression. See Collection builder arguments for details.

Finally, you must add the `System.Runtime.CompilerServices.CollectionBuilderAttribute` to the `LineBuffer` class declaration:

```csharp
[CollectionBuilder(typeof(LineBufferBuilder), "Create")]
```
The first parameter provides the name of the *Builder* class. The second attribute provides the name of the builder method.
