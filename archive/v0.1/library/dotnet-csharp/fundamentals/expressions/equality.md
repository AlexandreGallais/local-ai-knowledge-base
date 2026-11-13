---
title: "C# Equality comparisons (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/expressions/equality.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# Equality comparisons

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the Get started tutorials first.
>
> **Coming from another language?** In Java, `==` on objects and JavaScript `===` on objects test identity, not content. C# classes work the same way by default. In Python, `==` calls `__eq__` and tests content by default, similar to how C# records compare. C# structs also compare by value when you call `Equals`.

C# distinguishes two kinds of equality. *Value equality* means two instances are equal when their data matches. *Reference equality* means two variables are equal only when they point to the same object in memory. This condition is also called *identity*. Value types usually compare data, and reference types usually compare identity. Type authors can change those defaults, but that mental model prevents subtle bugs where two objects that look identical aren't considered equal, or where a mutation through one variable silently changes what another variable sees.

## Value types, reference types, and equality defaults

Every type in C# is either a *value type* or a *reference type*. A *value type* holds its data directly in the variable. A *reference type* holds a reference to an object. When you assign a reference-type variable to another variable, both variables refer to the same object. For more information about value types and reference types, see Type system overview.

The default equality behavior usually follows the kind of type:

- **Built-in numeric types and enums** are value types. Two `int` variables are equal when their numeric values match.
- **Structs** are value types. A plain `struct` uses value equality when you call `System.Object.Equals*`.
- **Tuples** are value types. Two tuples are equal when all their element values match.
- **Classes** are reference types. A plain class uses reference equality, so `==` and `System.Object.Equals*` test whether two variables point to the same object.

A class uses reference equality. Two separate objects with the same data aren't equal, but two variables that refer to the same object are equal:

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
A `struct` shows value equality through `System.Object.Equals*`. Two struct instances are equal when their fields match:

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
Plain structs don't get a predefined `==` operator. Writing `p1 == p2` on a plain struct compiles only if the struct declares its own `operator ==`. If you need operator comparisons for a struct, define `==` and `!=` as a pair and keep them consistent with `System.Object.Equals*` and `System.Object.GetHashCode*`.

Tuples are value types too. Two tuples are equal when every element value matches. Element names in a named tuple are a compile-time convenience and aren't considered during comparison. Only positions and values matter:

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
For more information about tuple syntax and deconstruction, see Tuples and deconstruction.

## Use `Object.ReferenceEquals` to test identity directly

`System.Object.ReferenceEquals*` always tests identity regardless of how a type overrides `System.Object.Equals*` or overloads `==`. Use it as an identity diagnostic when you need to confirm whether two variables point to the exact same object:

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
A common use is inside an `Equals` override to short-circuit the full comparison: when both arguments are the same reference, they're always equal without checking individual fields.

> **Note:**
> When variables are typed as an interface, `==` checks whether the interface variables refer to the same object. A call to `Equals` still runs the underlying object's implementation.

> **Note:**
> `System.Object.ReferenceEquals*` always returns `false` when comparing value types, even if both arguments contain the same values. This behavior occurs because each value-type argument is independently *boxed* into a separate heap object when passed to `ReferenceEquals`.

## Types can define different equality semantics

Types *can* define equality semantics that differ from the default behavior. The most common reason is to implement value equality. If you create a type that represents data, such as a bank account, a product in inventory, or a user in a system, consider instances with the same values as equal. *Choose record types for implementing value equality*, and the compiler generates all the necessary equality members for you.

> **Note:**
> **Strings** are classes, but `==` and `System.Object.Equals*` compare string content, not identity.

- `==`: the equality operator. Most types use this operator as the primary equality check. Its behavior depends on whether the type has a built-in or user-defined `==` operator.
- `!=`: the inequality operator. When a type defines a user-defined `==` operator, it must also define `!=`.
- `System.Object.Equals*`: a virtual method inherited by every type. You can override it to change equality semantics for a type.
- `System.Object.GetHashCode*`: a virtual method used by hash-based collections. When two values are equal, their hash codes must also be equal.
- `System.Object.ReferenceEquals*`: a static method that always tests identity.
