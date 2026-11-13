---
title: "C# Equality comparisons (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/expressions/equality.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# Equality comparisons (part 2 of 2)

## Use records for value equality

Use the `record` modifier to give a data-focused type value equality when the type can be a record. The compiler generates `System.Object.Equals*`, `System.Object.GetHashCode*`, and `==`/`!=` members that compare every declared property value.

A `record class` is still a reference type, but it compares values instead of identity:

```csharp
var order1 = new Order(42, "Shoes");
var order2 = new Order(42, "Shoes");

Console.WriteLine(order1 == order2);               // => False
Console.WriteLine(order1.Equals(order2));          // => False
Console.WriteLine(ReferenceEquals(order1, order2)); // => False

Order order3 = order1;
Console.WriteLine(order1 == order3);               // => True

var pt1 = new Point(3, 4);
var pt2 = new Point(3, 4);

Console.WriteLine(pt1.Equals(pt2)); // => True

var person1 = new Person("Ada", "Lovelace");
var person2 = new Person("Ada", "Lovelace");

Console.WriteLine(person1 == person2);               // => True
Console.WriteLine(person1.Equals(person2));          // => True
Console.WriteLine(ReferenceEquals(person1, person2)); // => False

var dim1 = new Dimension(1920, 1080);
var dim2 = new Dimension(1920, 1080);

Console.WriteLine(dim1 == dim2);      // => True
Console.WriteLine(dim1.Equals(dim2)); // => True

var t1 = (Name: "Grace", Role: "Engineer");
var t2 = (Name: "Grace", Role: "Engineer");

Console.WriteLine(t1 == t2); // => True

var doc1 = new Document("Report");
var doc2 = new Document("Report");
var doc3 = doc1;

Console.WriteLine(ReferenceEquals(doc1, doc2)); // => False
Console.WriteLine(ReferenceEquals(doc1, doc3)); // => True

var playlist1 = new Playlist("Chill", new List<string> { "Song A", "Song B" });
var playlist2 = new Playlist("Chill", new List<string> { "Song A", "Song B" });

Console.WriteLine(playlist1.Equals(playlist2));                        // => False (different List instances)
Console.WriteLine(playlist1.Tracks.SequenceEqual(playlist2.Tracks));   // => True

// ── Type declarations ────────────────────────────────────────────────────────

class Order(int id, string name)
{
    public int Id { get; } = id;
    public string Name { get; } = name;
}

struct Point(int x, int y)
{
    public int X { get; } = x;
    public int Y { get; } = y;
}

record Person(string First, string Last);

record struct Dimension(double Width, double Height);

class Document(string title)
{
    public string Title { get; } = title;
}

record Playlist(string Name, List<string> Tracks);
```
`System.Object.ReferenceEquals*` confirms that `person1` and `person2` are different objects in memory, while `==` and `System.Object.Equals*` return `True` because the compiler-generated equality compares property values.

The same compiler generation applies to `record struct` types:

```csharp
var order1 = new Order(42, "Shoes");
var order2 = new Order(42, "Shoes");

Console.WriteLine(order1 == order2);               // => False
Console.WriteLine(order1.Equals(order2));          // => False
Console.WriteLine(ReferenceEquals(order1, order2)); // => False

Order order3 = order1;
Console.WriteLine(order1 == order3);               // => True

var pt1 = new Point(3, 4);
var pt2 = new Point(3, 4);

Console.WriteLine(pt1.Equals(pt2)); // => True

var person1 = new Person("Ada", "Lovelace");
var person2 = new Person("Ada", "Lovelace");

Console.WriteLine(person1 == person2);               // => True
Console.WriteLine(person1.Equals(person2));          // => True
Console.WriteLine(ReferenceEquals(person1, person2)); // => False

var dim1 = new Dimension(1920, 1080);
var dim2 = new Dimension(1920, 1080);

Console.WriteLine(dim1 == dim2);      // => True
Console.WriteLine(dim1.Equals(dim2)); // => True

var t1 = (Name: "Grace", Role: "Engineer");
var t2 = (Name: "Grace", Role: "Engineer");

Console.WriteLine(t1 == t2); // => True

var doc1 = new Document("Report");
var doc2 = new Document("Report");
var doc3 = doc1;

Console.WriteLine(ReferenceEquals(doc1, doc2)); // => False
Console.WriteLine(ReferenceEquals(doc1, doc3)); // => True

var playlist1 = new Playlist("Chill", new List<string> { "Song A", "Song B" });
var playlist2 = new Playlist("Chill", new List<string> { "Song A", "Song B" });

Console.WriteLine(playlist1.Equals(playlist2));                        // => False (different List instances)
Console.WriteLine(playlist1.Tracks.SequenceEqual(playlist2.Tracks));   // => True

// ── Type declarations ────────────────────────────────────────────────────────

class Order(int id, string name)
{
    public int Id { get; } = id;
    public string Name { get; } = name;
}

struct Point(int x, int y)
{
    public int X { get; } = x;
    public int Y { get; } = y;
}

record Person(string First, string Last);

record struct Dimension(double Width, double Height);

class Document(string title)
{
    public string Title { get; } = title;
}

record Playlist(string Name, List<string> Tracks);
```
Record types generate the whole equality set for their own type. Both `record class` and `record struct` types override `System.Object.Equals*` and `System.Object.GetHashCode*`. They also generate `==` and `!=` operators, plus a typed `Equals` method for the record type. Unlike a plain `struct`, a `record struct` therefore supports `==` and `!=` automatically. For more information about record types and their equality semantics, see Records.

### Records with reference-type members

Record equality uses the members' own equality semantics. Each property or field is compared by using its own `Equals` method. For most scalar values, such as `int`, `string`, or `DateTime`, this approach compares the values of the record members. The subtlety arises with common mutable collections such as `List<T>` or `T[]`: these types compare by reference, so two record instances that contain *different list objects with the same content* are **not** considered equal by the synthesized record equality.

```csharp
var order1 = new Order(42, "Shoes");
var order2 = new Order(42, "Shoes");

Console.WriteLine(order1 == order2);               // => False
Console.WriteLine(order1.Equals(order2));          // => False
Console.WriteLine(ReferenceEquals(order1, order2)); // => False

Order order3 = order1;
Console.WriteLine(order1 == order3);               // => True

var pt1 = new Point(3, 4);
var pt2 = new Point(3, 4);

Console.WriteLine(pt1.Equals(pt2)); // => True

var person1 = new Person("Ada", "Lovelace");
var person2 = new Person("Ada", "Lovelace");

Console.WriteLine(person1 == person2);               // => True
Console.WriteLine(person1.Equals(person2));          // => True
Console.WriteLine(ReferenceEquals(person1, person2)); // => False

var dim1 = new Dimension(1920, 1080);
var dim2 = new Dimension(1920, 1080);

Console.WriteLine(dim1 == dim2);      // => True
Console.WriteLine(dim1.Equals(dim2)); // => True

var t1 = (Name: "Grace", Role: "Engineer");
var t2 = (Name: "Grace", Role: "Engineer");

Console.WriteLine(t1 == t2); // => True

var doc1 = new Document("Report");
var doc2 = new Document("Report");
var doc3 = doc1;

Console.WriteLine(ReferenceEquals(doc1, doc2)); // => False
Console.WriteLine(ReferenceEquals(doc1, doc3)); // => True

var playlist1 = new Playlist("Chill", new List<string> { "Song A", "Song B" });
var playlist2 = new Playlist("Chill", new List<string> { "Song A", "Song B" });

Console.WriteLine(playlist1.Equals(playlist2));                        // => False (different List instances)
Console.WriteLine(playlist1.Tracks.SequenceEqual(playlist2.Tracks));   // => True

// ── Type declarations ────────────────────────────────────────────────────────

class Order(int id, string name)
{
    public int Id { get; } = id;
    public string Name { get; } = name;
}

struct Point(int x, int y)
{
    public int X { get; } = x;
    public int Y { get; } = y;
}

record Person(string First, string Last);

record struct Dimension(double Width, double Height);

class Document(string title)
{
    public string Title { get; } = title;
}

record Playlist(string Name, List<string> Tracks);
```
`playlist1` and `playlist2` are separate `List<string>` instances. Even though their contents match, `Equals` returns `false`.

When you need record equality to reflect collection *contents*, you have a few options:

- **Implement `IEquatable<T>`** on the record and override `Equals` to use `System.Linq.Enumerable.SequenceEqual*` for the collection members.
- **Use a collection type with value equality** — for example, a custom `IEqualityComparer<T>` or a type whose own `Equals` compares elements.
- **Design around identity**: if the record represents an entity rather than a pure value, reference equality for its collection members might be intentional.

> **Important:**
> Manual implementation of equality is rare today in C#. Records handle the common scenario of value equality automatically. If you need to implement equality manually - for example, because your type must derive from a non-record base class - see Implement equality yourself when a type can't be a record in the language reference.

## See also

- Type system overview
- Classes
- Structs
- Records
- Tuples and deconstruction.
- Equality operators (language reference).
- Equality in class hierarchies — advanced guidance on polymorphic equality.
- Arithmetic, comparison, logical, and assignment operators — the equality operator survey alongside arithmetic, logical, and assignment operators.
