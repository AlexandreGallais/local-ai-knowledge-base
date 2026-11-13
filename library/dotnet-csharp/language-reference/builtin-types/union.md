---
title: "Union types (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/union.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Union types (C# reference)

A *union type* represents a value that can be one of several *case types*. Unions provide implicit conversions from each case type, exhaustive pattern matching, and enhanced nullability tracking. Use the `union` keyword to declare a union type:

```csharp
public union Pet(Cat, Dog, Bird);
```
This declaration creates a `Pet` union with three case types: `Cat`, `Dog`, and `Bird`. You can assign any case type value to a `Pet` variable. The compiler ensures that `switch` expressions cover all case types.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Declare a union when a value must be exactly one of a fixed set of types and you want the compiler to enforce that every possibility is handled. Common scenarios include:

- **Result-or-error returns**: A method returns either a success value or an error value, and the caller must handle both. A union like `union Result(Success, Error)` makes the set of outcomes explicit.
- **Message or command dispatching**: A system processes a closed set of message types. A union ensures new message types produce compile-time warnings at every `switch` that doesn't handle them yet.
- **Replacing marker interfaces or abstract base classes**: If you use an interface or abstract class solely to group types for pattern matching, a union gives you exhaustiveness checking without requiring inheritance or shared members.

A union differs from other type declarations in important ways:

- Unlike a `class` or `struct`, a union doesn't define new data members. Instead, it composes existing types into a closed set of alternatives.
- Unlike an `interface`, a union is closed—you define the complete list of case types in the declaration, and the compiler uses that list for exhaustiveness checks.
- Unlike a `record`, a union doesn't add equality, cloning, or deconstruction behavior. A union focuses on "which case is it?" rather than "what fields does it have?"

Union types rely on the `System.Runtime.CompilerServices.UnionAttribute` and `System.Runtime.CompilerServices.IUnion` types in the `System.Runtime.CompilerServices` namespace. The .NET 11 runtime includes these types.

## Union declarations

A union declaration specifies a name and a list of case types:

```csharp
public union Pet(Cat, Dog, Bird);
```

*Case types* can be any type that converts to `object`, including classes, structs, interfaces, type parameters, nullable types, and other unions. The following examples show different case type possibilities:

```csharp
public record class Cat(string Name);
public record class Dog(string Name, string Breed);
public record class Bird(string Name);
```
```csharp
public record class None;
public record class Some<T>(T Value);
public union Option<T>(None, Some<T>);
```
```csharp
public union IntOrString(int, string);
```
When a case type is a value type (like `int`), a union declaration boxes the value and stores it as a single `object?` reference. Custom union types can use a different storage strategy.

A union declaration can include a body with additional members, just like a struct, subject to some restrictions. Union declarations can't include instance fields, auto-properties, or field-like events. You also can't declare public constructors with a single parameter, because the compiler generates those constructors as union creation members. Any constructor you declare must use a `this(...)` initializer to delegate, directly or indirectly, to a generated constructor. The following `Length` union adds a `TotalMeters` property that uses pattern matching to handle every case type, along with an `Add` method that combines two lengths:

```csharp
public record class Meters(double Value);
public record class Feet(double Value);

public union Length(Meters, Feet)
{
    public double TotalMeters => this switch
    {
        Meters m => m.Value,
        Feet f => f.Value * 0.3048,
        _ => throw new InvalidOperationException("The Length has no value."),
    };

    public Length Add(Length other) => new Meters(TotalMeters + other.TotalMeters);
}
```
## Union conversions

An implicit *union conversion* exists from each case type to the union type:

```csharp
static void BasicConversion()
{
    Pet pet = new Dog("Rex", "Labrador");
    Console.WriteLine(pet.Value); // output: Dog { Name = Rex, Breed = Labrador }

    Pet pet2 = new Cat("Whiskers");
    Console.WriteLine(pet2.Value); // output: Cat { Name = Whiskers }
}
```
Union conversions work by calling the corresponding generated constructor. If a user-defined implicit conversion operator exists for the same type, the user-defined operator takes priority over the union conversion. If more than one case type is equally applicable to the source value, the union conversion is ambiguous, and the compiler reports an error. For details on conversion priority, see the feature specification.

A union conversion to a nullable union struct (`T?`) also works when `T` is a union type:

```csharp
static void NullableUnionExample()
{
    Pet? maybePet = new Dog("Buddy", "Beagle");
    Pet? noPet = null;

    Console.WriteLine(Describe(maybePet)); // output: Buddy
    Console.WriteLine(Describe(noPet));    // output: no pet

    static string Describe(Pet? pet) => pet switch
    {
        Dog d => d.Name,
        Cat c => c.Name,
        Bird b => b.Name,
        null => "no pet",
    };
}
```
## Union pattern matching

When you use a type or declaration pattern on a union expression, the pattern tests the union's contents, not the union instance. For example, a `Dog` pattern tests whether `Value` is a `Dog`:

```csharp
static void PatternMatching()
{
    Pet pet = new Dog("Rex", "Labrador");

    var name = pet switch
    {
        Dog d => d.Name,
        Cat c => c.Name,
        Bird b => b.Name,
    };
    Console.WriteLine(name); // output: Rex
}
```
The pattern's form determines which value it tests:

| Pattern | Behavior on a union expression |
|---|---|
| Type or declaration pattern, such as `Dog` or `Dog dog` | Tests the contents against the specified type. |
| Property or positional pattern with a type, such as `Dog { Breed: "Labrador" }` | Tests the contents against the type, then applies the nested patterns to that case value. |
| Property or positional pattern without a type, such as `{ Name: "Rex" }` | Uses the union instance's properties or `Deconstruct` method. |
| List pattern | Uses the union instance's count and indexing members, not those of its contents. |
| `var` or discard `_` pattern | Captures or matches the incoming union instance without unwrapping it. |
| Constant or relational pattern | Tests the contents. The `null` pattern also handles a null union reference or nullable wrapper. |

For example, define a `Pet` union with a read-only `Name` property that delegates to the contained `Cat` or `Dog`. The type patterns in the property's `switch` expression test the contents:

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
The typed pattern `Dog { Breed: "Labrador" }` tests the contents and reads the dog's `Breed`, a property the union doesn't have. The untyped pattern `{ Name: "Rex" }` reads the union's `Name` property instead, so it also matches a cat named Rex:

```csharp
Pet pet = new Dog("Rex", "Labrador");
Console.WriteLine(pet is Dog { Breed: "Labrador" }); // output: True
Console.WriteLine(pet is { Name: "Rex" });           // output: True
pet = new Cat("Rex");
Console.WriteLine(pet is Dog { Breed: "Labrador" }); // output: False
Console.WriteLine(pet is { Name: "Rex" });           // output: True
```
The `not` pattern negates its nested pattern. In `pet is not null`, the nested `null` pattern checks the contents, so `not null` is a useful has-a-value test. In contrast, an empty untyped property pattern, `{ }`, checks the union instance. It always matches a nonnullable struct union, even when `Value` is null:

```csharp
Pet empty = default;
Console.WriteLine(empty is { });       // output: True
Console.WriteLine(empty is not null);  // output: False
if (empty is var captured)
{
    Console.WriteLine(captured.Value is null); // output: True
}
```
Logical patterns preserve these distinctions. In `var pet and not null`, `var pet` captures the incoming union, and `not null` tests whether it has non-null contents. In `not null and var pet`, the `var` pattern still captures the incoming union: `not` doesn't change the value passed to the right-hand pattern. By contrast, in `Dog and { Breed: "Labrador" }`, the type pattern passes the matched `Dog` to the property pattern.

> **Note:**
> A type pattern must be compatible with at least one case type. For the `Pet` declarations in this article, `pet is Pet` produces compiler error CS8121: none of their case types can match `Pet`. It isn't a runtime test of the union instance. To check for contents, use `pet is not null` or `pet.Value is not null`; to capture the union itself, use a `var` pattern.

In short, type and declaration patterns test the contents. Recursive patterns with a type test the contents too; recursive patterns without a type use the union's own members. These rules are the same in an `is` expression and a `switch` expression.

### Null matching

For struct unions, the `null` pattern checks whether `Value` is null:

```csharp
static void NullHandling()
{
    Pet pet = default;
    var description = pet switch
    {
        Dog d => d.Name,
        Cat c => c.Name,
        Bird b => b.Name,
        null => "no pet",
    };
    Console.WriteLine(description); // output: no pet
    Console.WriteLine(pet.Value is null); // output: True
}
```
For class-based unions, `null` succeeds when either the union reference itself is null or its `Value` property is null:

```csharp
Result<string>? result = null;
if (result is null) { /* true — the reference is null */ }

Result<string> empty = new Result<string>((string?)null);
if (empty is null) { /* true — Value is null */ }
```

For nullable union struct types (`Pet?`), `null` succeeds when the nullable wrapper has no value or when the underlying union's `Value` is null.

## Union exhaustiveness

A `switch` expression is exhaustive over a union's case types when it handles each case type. If nullability analysis also considers the contents non-null, you don't need a discard (`_`) or `var` arm:

```csharp
static void PatternMatching()
{
    Pet pet = new Dog("Rex", "Labrador");

    var name = pet switch
    {
        Dog d => d.Name,
        Cat c => c.Name,
        Bird b => b.Name,
    };
    Console.WriteLine(name); // output: Rex
}
```
To handle null contents, prefer a `null` arm over a `var` or discard (`_`) arm. The `null` pattern states your intent and preserves warnings when you add a new case type without a matching arm. A `var` or discard arm also accepts any new case, so the compiler can't warn you about that missing case.

When the tracked null state of `Value` is "maybe null," the compiler also warns if you omit a `null` arm. For example, `NullablePet` has a nullable case type, so its parameter's contents might be null:

```csharp
public union NullablePet(Cat?, Dog, Bird);

static string DescribeNullableCase(NullablePet pet) => pet switch
{
    Cat cat => cat.Name,
    Dog dog => dog.Name,
    Bird bird => bird.Name,
    null => "no pet",
};
```
Removing the `null` arm from this switch produces warning CS8655.

Nullable analysis doesn't guarantee that a generated union has non-null contents at runtime. A default union contains null, including when it's a default-initialized field or array element. If all case types are nonnullable, the default tracked state of `Value` is nevertheless "not null," so the compiler doesn't necessarily warn about an omitted `null` arm. Handle `null` for correctness whenever default contents can reach your switch:

```csharp
static void NullHandling()
{
    Pet pet = default;
    var description = pet switch
    {
        Dog d => d.Name,
        Cat c => c.Name,
        Bird b => b.Name,
        null => "no pet",
    };
    Console.WriteLine(description); // output: no pet
    Console.WriteLine(pet.Value is null); // output: True
}
```
For this `Pet` example, removing the `null` arm produces no missing-null-arm warning unless earlier code changes the tracked null state, but the switch throws `System.Runtime.CompilerServices.SwitchExpressionException` when it receives the default value. An earlier `is null` test can change the tracked state and cause a warning. This behavior is separate from definite assignment: the compiler rejects a read of an unassigned local variable.

## Nullability

The compiler tracks the null state of a union's `Value` property through the following rules:

- The default null state of a union's `Value` property is "maybe null" if the default null state of any case type is "maybe null." Otherwise, the default null state is "not null."
- When you create a union value from a case type (through a constructor or union conversion), `Value` gets the null state of the incoming value.
- When the non-boxing access pattern's `HasValue` or `TryGetValue(...)` members query the union's contents, the null state of `Value` becomes "not null" on the `true` branch.
