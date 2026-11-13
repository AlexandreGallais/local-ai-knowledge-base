---
title: "Equality operators - test if two objects are equal or not equal (part 4 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/equality-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Equality operators - test if two objects are equal or not equal (part 4 of 4)

## Equality in class hierarchies

Records handle inheritance correctly without manual work. The compiler-generated equality checks both runtime type and all declared properties, so it automatically satisfies the symmetry and transitivity requirements. Prefer `record` over a manual unsealed hierarchy when value equality is the goal.

> **Important:**
> Use `record` whenever possible — the compiler generates all required equality members for you. Manual implementation is only needed when your type must derive from a non-record class or has other constraints that prevent `record`.

### Implement equality yourself when a type can't be a record

Here is a minimal manual implementation for a value type that can't be a record:

```csharp
class Color : IEquatable<Color>
{
    public Color(int r, int g, int b)
    {
        R = r;
        G = g;
        B = b;
    }

    public int R { get; }
    public int G { get; }
    public int B { get; }

    public bool Equals(Color? other) =>
        other is not null && R == other.R && G == other.G && B == other.B;

    public override bool Equals(object? obj) => obj is Color other && Equals(other);
    public override int GetHashCode() => HashCode.Combine(R, G, B);
}
```
The implementation provides three required members: `Equals(T?)` as the core comparison, `override Equals(object?)` for object-level calls, and `override GetHashCode()` so hash-based collections work correctly. `HashCode.Combine` is a library helper that builds one hash from the same values used by `Equals`. Implementing `System.IEquatable`1` (the `Equals(T?)` overload) is optional but avoids boxing when callers already have the concrete type.

When you also define `==` and `!=`, the language requires them as a pair; warnings CS0660 and CS0661 remind you to keep all four members consistent.

With the three members above in place, `Equals` reflects value equality, but `==` still tests identity because no `==` operator has been declared yet:

```csharp
var red1 = new Color(255, 0, 0);
var red2 = new Color(255, 0, 0);

Console.WriteLine(red1.Equals(red2)); // => True
Console.WriteLine(red1 == red2);      // => False  (no == overload; identity check)
```
A correct implementation must also satisfy the *equivalence contract* (assume `x`, `y`, and `z` are non-null):

1. **Reflexive**: `x.Equals(x)` returns `true`.
2. **Symmetric**: `x.Equals(y)` returns the same value as `y.Equals(x)`.
3. **Transitive**: if `x.Equals(y)` and `y.Equals(z)` are both `true`, then `x.Equals(z)` must be `true`.
4. **Consistent**: successive calls to `x.Equals(y)` return the same value as long as neither object changes.
5. **Null behavior**: `x.Equals(null)` returns `false`; `x.Equals(y)` must not throw when called on a non-null `x`.

Value equality in an unsealed class hierarchy requires more care than in a sealed class to satisfy the symmetric and transitive rules. The hazard is that `IEquatable<T>.Equals(T? other)` dispatch follows the *declared type* (the type written in the variable declaration) of the variable, not its runtime type. If `Shape` declares a non-`virtual` `Equals(Shape? other)`, a variable typed as `Shape` that holds a `Circle` at runtime invokes `Shape.Equals`—silently ignoring `Circle`-specific fields. Two `Circle` objects with different radii can compare as equal when accessed through a `Shape` variable.

The correct pattern requires two cooperating requirements: make the typed `Equals` method `virtual` so each derived class can extend the comparison, and add a `GetType() == other.GetType()` guard in the base-class implementation so objects of different runtime types are never considered equal.

### Base class implementation

```csharp
// Shape is an unsealed base class. Making Equals virtual and guarding with GetType()
// ensures a derived instance is never equal to an instance of a different runtime type.
class Shape : IEquatable<Shape>
{
    public string Color { get; }
    public Shape(string color) => Color = color;

    public override bool Equals(object? obj) => Equals(obj as Shape);

    // virtual so derived classes can override and augment the comparison
    public virtual bool Equals(Shape? other) =>
        other is not null &&
        GetType() == other.GetType() &&   // reject different runtime types
        Color == other.Color;

    // GetType() is included because equality requires matching runtime types
    public override int GetHashCode() => HashCode.Combine(GetType(), Color);

    public static bool operator ==(Shape? l, Shape? r) => l?.Equals(r) ?? r is null;
    public static bool operator !=(Shape? l, Shape? r) => !(l == r);
}
```
Key points:

- **`virtual` typed `Equals`**: each derived class overrides this method to augment the comparison with its own fields.
- **`GetType()` guard**: `GetType() == other.GetType()` prevents a `Circle` from equaling a `Shape` with the same color, and prevents objects of different derived types from equaling each other.
- **`GetHashCode` includes `GetType()`**: because two objects are equal only when their runtime types match, `GetHashCode` must hash the runtime type as well as the data fields. Omitting `GetType()` here causes incorrect behavior in `Dictionary<TKey,TValue>` and `HashSet<T>`.
- **`==` delegates to `Equals`**: keeps operator and method equality consistent.

### Derived class implementation

A derived class that adds fields overrides the typed `Equals`, casts to its own type, calls `base.Equals`, then compares its own fields:

```csharp
class Circle : Shape
{
    public double Radius { get; }
    public Circle(string color, double radius) : base(color) => Radius = radius;

    public override bool Equals(object? obj) => Equals(obj as Shape);

    // Calls base.Equals to verify Color and runtime type, then adds Radius
    public override bool Equals(Shape? other) =>
        other is Circle c && base.Equals(c) && Radius == c.Radius;

    public override int GetHashCode() => HashCode.Combine(GetType(), Color, Radius);
}
```
`base.Equals(c)` enforces the `GetType()` guard and checks the shared fields. The cast via `other is Circle c` fails fast when the argument is a `Shape` of any other derived type.

### Usage through a base-type variable

```csharp
Shape circle1 = new Circle("red", 5.0);
Shape circle2 = new Circle("red", 7.0);
Shape circle3 = new Circle("red", 5.0);
Shape shape1  = new Shape("red");

Console.WriteLine(circle1.Equals(circle2)); // => False  (Radius differs)
Console.WriteLine(circle1.Equals(circle3)); // => True
Console.WriteLine(circle1.Equals(shape1));  // => False  (different runtime types)
```
### Sealed classes are simpler

You can't subclass a `sealed` class, so compile-time and runtime types always agree. You don't need the `GetType()` guard or `virtual` dispatch. The `IEquatable<T>` pattern shown in Implement equality yourself when a type can't be a record is correct and complete for a sealed class.

## Operator overloadability

You can overload the `==` and `!=` operators in a user-defined type. If you overload one of these two operators, you must also overload the other operator.

You can't explicitly overload the `==` and `!=` operators in a record type. To change the behavior of the `==` and `!=` operators for record type `T`, implement the `System.IEquatable`1.Equals*` method with the following signature:

```csharp
public virtual bool Equals(T? other);
```

## C# language specification

For more information, see the Relational and type-testing operators section of the C# language specification.

For more information about equality of record types, see the Equality members section of the C# language specification.

## See also

- C# operators and expressions
- `System.IEquatable`1`
- `System.Object.Equals*`
- `System.Object.ReferenceEquals*`
- Equality comparisons
- Comparison operators
