---
title: "Patterns - Pattern matching using the is and switch expressions. (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/patterns.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Patterns - Pattern matching using the is and switch expressions. (part 3 of 3)

## Closed hierarchy patterns

Starting in C# 15, a `switch` expression whose governing type is a `closed` class is *exhaustive* when its arms handle every direct descendant of that class. The compiler doesn't require a default arm because the switch is exhaustive:

```csharp
public closed record class PaymentMethod;
public record class Cash : PaymentMethod;
public record class Card(string Last4) : PaymentMethod;
public record class BankTransfer(string Iban) : PaymentMethod;
```
```csharp
public static string Describe(PaymentMethod method) => method switch
{
    Cash => "cash",
    Card(var last4) => $"card ending {last4}",
    BankTransfer(var iban) => $"bank transfer to {iban}",
    // No warning: every direct descendant of 'PaymentMethod' is handled.
};
```
A closed hierarchy switch is exhaustive only when every direct descendant is reachable from the location of the switch. If a direct descendant is less accessible than the closed base type and isn't visible at the switch site, the compiler treats it as unhandled and warns that the switch isn't exhaustive.

For example, a closed `public` base class can have an `internal` direct descendant. Code in the same assembly sees the full set of descendants, but code in another assembly doesn't:

```csharp
// Assembly 1
public closed record class Shape;
public record class Circle(double Radius) : Shape;
internal record class Triangle(double Base, double Height) : Shape;
```
```csharp
// Same assembly: 'Triangle' is visible, so the switch is exhaustive.
internal static double Area(Shape shape) => shape switch
{
    Circle(var r) => Math.PI * r * r,
    Triangle(var b, var h) => 0.5 * b * h,
};
```
```csharp
// Assembly 2
public static string Name(Shape shape) => shape switch
{
    Circle => "circle",
    // Warning CS8509: the switch expression doesn't handle all possible values.
    // 'Triangle' is a direct descendant of 'Shape' but isn't visible here.
};
```
To restore exhaustiveness in assembly 2, add a discard arm (`_ => ...`), add a base class arm (`Shape` in the preceding example), or make every direct descendant at least as accessible as the closed base type.

When the governing type is nullable, `null` is an extra value the switch must handle. A switch over `PaymentMethod?` that omits a `null` arm isn't exhaustive even when every direct descendant is matched.

Derivation from a closed class isn't transitive: a non-closed descendant of a closed class can be derived from in other assemblies. The compiler only treats the *direct* descendants as the exhaustive set. To make a switch over a descendant also benefit from exhaustiveness checking, declare the descendant `closed` (or `sealed`).

Because indirect descendants don't expand the exhaustive set of the closed base, you don't have to add an arm for every transitive subtype to satisfy exhaustiveness. Subsumption between arms still works the same way it does for any class hierarchy: an arm that matches a base type covers every subtype, and a later arm that matches one of those subtypes is unreachable. Consider a closed `Vehicle` whose direct descendants are `Car` and `Truck`, plus an indirect descendant `Sedan` declared in another assembly:

```csharp
// Assembly 1
public closed record class Vehicle;
public record class Car(int Doors) : Vehicle;
public record class Truck(double PayloadTons) : Vehicle;

// Assembly 2
public record class Sedan(int Doors) : Car(Doors);
```
A switch over `Vehicle` is exhaustive after it handles `Car` and `Truck`, even though `Sedan` exists. The `Car` arm covers every `Sedan` value:

```csharp
public static string Category(Vehicle v) => v switch
{
    Car => "car",
    Truck => "truck",
    // No warning. The 'Car' arm covers 'Sedan' through ordinary subtype matching.
};
```
To dispatch on `Sedan` specifically, place its arm *before* the `Car` arm. The `Car` arm remains reachable because it still matches every `Car` that isn't a `Sedan`:

```csharp
public static string CategorySedanFirst(Vehicle v) => v switch
{
    Sedan => "sedan",
    Car => "car",      // Reachable: 'Car' values that aren't 'Sedan'.
    Truck => "truck",
};
```
Reversing those two arms produces a subsumption error, just as it would in any other class hierarchy. The compiler detects that the `Car` arm already covers `Sedan`:

```csharp
string Category(Vehicle v) => v switch
{
    Car => "car",
    Sedan => "sedan",  // Error CS8510: the pattern is unreachable. It has already been handled by 'Car => ...'.
    Truck => "truck",
};
```

If you want exhaustiveness to follow the hierarchy further down, declare `Car` itself `closed`. The compiler then treats every direct descendant of `Car` (such as `Sedan`) as the exhaustive set rooted at `Car`. A switch whose governing type is `Car` is exhaustive when it does any of the following:

- Handles every direct descendant of `Car` with its own arm.
- Includes a `Car` arm, which covers every `Car` value (including all subtypes).
- Includes a discard arm (`_ => ...`) or an arm for a base type of `Car`, such as `Vehicle`.

A switch whose governing type is `Vehicle` has choices: Code that handles `Car` and `Truck` is still exhaustive, because the `Car` arm covers every subtype of `Car`. Marking `Car` `closed` simply gives you a second option for that switch. You can keep the single `Car` arm, or replace it with one arm per direct descendant of `Car` (alongside the `Truck` arm) and still be exhaustive.

Marking `Car` `closed` also makes it implicitly `abstract`, which means you can no longer create instances of `Car` directly. That condition might not fit your design. If you need `Car` to remain instantiable, leave it open and dispatch on the specific subtypes you care about by ordering arms as shown earlier.

### Type parameter governing types

The closed hierarchies feature specification defines a `switch` expression whose governing type is a type parameter constrained to a closed class as exhaustive on the same terms as a switch over the closed class itself. So, generic code can dispatch on a closed hierarchy by constraining the type parameter to the closed base and handling every direct descendant:

```csharp
public static string Describe<X>(X method) where X : PaymentMethod => method switch
{
    Cash => "cash",
    Card(var last4) => $"card ending {last4}",
    BankTransfer(var iban) => $"bank transfer to {iban}",
    // No warning: 'X' is constrained to the closed type 'PaymentMethod', so the
    // compiler treats this switch as exhaustive because every direct descendant is handled.
};
```
For more information, see the closed modifier. For the specification, see Closed hierarchies.

## Union patterns

C# 15 introduces union types. When you apply a type or declaration pattern to a union expression, the pattern tests the union's contents rather than the union instance. For example, these case types each have a `Name` property, and `Dog` also has a `Breed` property:

```csharp
public record class Cat(string Name);
public record class Dog(string Name, string Breed);
```

The following `Pet` union exposes its own read-only `Name` property, which delegates to the contained case:

```csharp
public union Pet(Cat, Dog)
{
    public string Name => this switch
    {
        Cat cat => cat.Name,
        Dog dog => dog.Name,
        null => "",
    };
}
```
Typed recursive patterns also test the contents: `Dog { Breed: "Labrador" }` reads the contained dog's `Breed`, a property the union doesn't have. In contrast, untyped property and positional patterns and list patterns use members of the union instance. Here, `{ Name: "Rex" }` reads the union's `Name` property, so it matches either a cat or a dog with that name:

```csharp
Pet pet = new Dog("Rex", "Labrador");
Console.WriteLine(pet is Dog { Breed: "Labrador" }); // output: True
Console.WriteLine(pet is { Name: "Rex" });           // output: True
pet = new Cat("Rex");
Console.WriteLine(pet is Dog { Breed: "Labrador" }); // output: False
Console.WriteLine(pet is { Name: "Rex" });           // output: True
```
These rules apply in both `is` and `switch` expressions. The discard `_` pattern matches the incoming union, and a `var` pattern captures it without unwrapping.

The `null` pattern checks whether the union's contents are null. It also succeeds when a class-based union reference or nullable union wrapper is null. The `not` pattern negates its nested pattern, so `pet is not null` tests for non-null contents. An empty untyped property pattern, `pet is { }`, instead tests the union instance: it matches a nonnullable struct union even when its contents are null.

A type pattern must be compatible with at least one case type. For the preceding `Pet` declaration, `pet is Pet` produces compiler error CS8121 rather than testing the union instance. It can succeed for a recursive declaration such as `union Pet(Cat, Dog, Pet)`, because `Pet` is then a case type. Recursive unions make these tests easy to misinterpret: this pattern tests for a contained `Pet`, not the outer instance. Prefer nonrecursive union declarations.

When a union type provides the *non-boxing access pattern*, the compiler calls `TryGetValue` for type-pattern checks and `HasValue` for null-pattern checks, avoiding boxing for value-type cases. Each member applies to its own pattern kind—neither is a fallback for the other. When a member is missing, the compiler checks the `Value` property for that pattern instead.

For more information, see Union matching. For the specification, see Unions.

## C# language specification

For more information, see the Patterns and pattern matching section of the C# language specification, including:

- List pattern
- Slice pattern
- Constant pattern

## See also

- C# operators and expressions
- Pattern matching overview
- Tutorial: Build algorithms using pattern matching
