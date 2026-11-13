---
title: "Union types (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/union.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Union types (part 2 of 2)

## Custom union types

The compiler converts a `union` declaration to a `struct` declaration. The struct is marked with the `[System.Runtime.CompilerServices.Union]` attribute and implements the `IUnion` interface. It includes a public constructor for each case type and a `Value` property. The language provides implicit union conversions that call those constructors. That generated form is opinionated. It's always a struct, always boxes value-type cases, and always stores contents as `object?`.

You might need different behavior if you want to adapt an existing type, create a class-based union, or use a custom storage strategy, or if you need interop support. You can create a union type manually.

Any class or struct with a `[Union]` attribute is a *union type* if it follows the *basic union pattern*. The basic union pattern requires:

- A `[Union]`  attribute on the type.
- One or more public constructors, each with a single by-value or `in` parameter. The parameter type of each constructor defines a *case type*.
- A public `Value` property of type `object?` (or `object`) with a `get` accessor.

All the preceding union members must be public. The compiler uses these members to implement union conversions, pattern matching, and exhaustiveness checks. You can also implement the non-boxing access pattern or create a class-based union type. Your custom union type can add more members.

The compiler assumes that custom union types satisfy these behavioral rules:

- **Soundness**: `Value` always returns `null` or a value of one of the case types, including for a default struct value. A custom union can represent its default value as a non-null case, unlike the null contents of a default generated union.
- **Stability**: If you create a union value from a case type, `Value` matches that case type (or is `null` if the input was `null`).
- **Creation equivalence**: If a value is implicitly convertible to two different case types, both creation members produce the same observable behavior.
- **Access pattern consistency**: The `HasValue` and `TryGetValue` members, if present, behave equivalently to checking `Value` directly.

The following example shows a custom union type:

```csharp
[System.Runtime.CompilerServices.Union]
public struct Shape : System.Runtime.CompilerServices.IUnion
{
    private readonly object? _value;

    public Shape(Circle value) { _value = value; }
    public Shape(Rectangle value) { _value = value; }

    public object? Value => _value;
}

public record class Circle(double Radius);
public record class Rectangle(double Width, double Height);
```
```csharp
static void ManualUnionExample()
{
    Shape shape = new Shape(new Circle(5.0));

    var area = shape switch
    {
        Circle c => Math.PI * c.Radius * c.Radius,
        Rectangle r => r.Width * r.Height,
    };
    Console.WriteLine($"{area:F2}"); // output: 78.54
}
```
### Non-boxing access pattern

A custom union type can optionally implement the *non-boxing access pattern* to enable strongly typed access to value-type cases without boxing during pattern matching. This pattern requires:

- A `HasValue` property of type `bool` that returns `true` when `Value` isn't `null`.
- A `TryGetValue` method for each case type that returns `bool` and delivers the value through an `out` parameter. `TryGetValue` returns `true` only when `Value` is a non-null value of that case type. The `out` parameter's type is identity-convertible to the case type, or to the underlying value type when the case type is a nullable value type.

```csharp
[System.Runtime.CompilerServices.Union]
public struct IntOrBool : System.Runtime.CompilerServices.IUnion
{
    private readonly int _intValue;
    private readonly bool _boolValue;
    private readonly byte _tag; // 0 = none, 1 = int, 2 = bool

    public IntOrBool(int? value)
    {
        if (value.HasValue)
        {
            _intValue = value.Value;
            _tag = 1;
        }
    }

    public IntOrBool(bool? value)
    {
        if (value.HasValue)
        {
            _boolValue = value.Value;
            _tag = 2;
        }
    }

    public object? Value => _tag switch
    {
        1 => _intValue,
        2 => _boolValue,
        _ => null
    };

    public bool HasValue => _tag != 0;

    public bool TryGetValue(out int value)
    {
        value = _intValue;
        return _tag == 1;
    }

    public bool TryGetValue(out bool value)
    {
        value = _boolValue;
        return _tag == 2;
    }
}
```
```csharp
static void NonBoxingExample()
{
    IntOrBool val = new IntOrBool((int?)42);

    var description = val switch
    {
        int i => $"int: {i}",
        bool b => $"bool: {b}",
    };
    Console.WriteLine(description); // output: int: 42
}
```
For pattern matching, the compiler calls `TryGetValue` for type-pattern checks (such as `union is T`) and `HasValue` for null-pattern checks (such as `union is null`), avoiding boxing for value-type cases. Each member applies to its own pattern kind—neither is a fallback for the other. When a member is missing, the compiler checks the `Value` property for that pattern instead. For more information, see How the compiler generates code for pattern matching.

### Union member providers

A union type can delegate its union members to a public nested `IUnionMembers` interface that it directly contains and implements. That interface is the *union member provider*. The compiler finds union members only on the provider interface, including inherited members. Members declared only on the union type itself aren't used as union members.

When using a union member provider, the interface must declare these required members:

- **Static `Create` methods**: One for each case type, with a single parameter and a return type identity-convertible to the union type. These methods establish your case types.
- **`Value` property**: A public `object` or `object?` property with a `get` accessor that returns the contained value.

You can optionally declare these members on the interface so the compiler generates more efficient pattern matching code:

- **`TryGetValue` methods**: One for each case type, returning `bool` with an `out` parameter of the case type.
- **`HasValue` property**: A public `bool` property with a `get` accessor returning `true` when `Value` isn't `null`.

**How the compiler generates code for pattern matching**: `TryGetValue` and `HasValue` apply to different kinds of patterns—neither is a fallback for the other:

- For a *type pattern*, such as `union is T`, the compiler calls `TryGetValue(out T value)` when declared, extracting the value and applying the pattern to it without boxing. Otherwise, the compiler applies the pattern to the `Value` property, which performs a runtime type check against `T` and can box the value when `T` is a value type.
- For a *null pattern*, such as `union is null`, the compiler calls `HasValue` when declared to test whether the union contains a value. Otherwise, the compiler applies the null pattern to the `Value` property directly.

Each member is independently optional: without `TryGetValue`, type patterns use `Value`; without `HasValue`, null patterns use `Value`. Declaring either member lets the compiler generate more efficient, strongly typed code for that pattern kind:

```csharp
[System.Runtime.CompilerServices.Union]
public struct Outcome<T> : Outcome<T>.IUnionMembers
{
    private readonly object? _value;

    private Outcome(object? value) => _value = value;

    public interface IUnionMembers
    {
        static Outcome<T> Create(T? value) => new(value);
        static Outcome<T> Create(Exception? value) => new(value);
        object? Value { get; }

        // Optional but recommended: TryGetValue enables efficient pattern matching
        bool TryGetValue(out T value);
        bool TryGetValue(out Exception value);
    }

    object? IUnionMembers.Value => _value;

    public bool TryGetValue(out T value)
    {
        if (_value is T t)
        {
            value = t;
            return true;
        }
        value = default!;
        return false;
    }

    public bool TryGetValue(out Exception value)
    {
        if (_value is Exception e)
        {
            value = e;
            return true;
        }
        value = default!;
        return false;
    }
}
```
Union member providers are useful when the union type needs a private constructor or when the creation logic requires a factory pattern, such as with `record class` union types.

### Class-based union types

A class can also be a union type. This type of union is useful when you need reference semantics or inheritance:

```csharp
[System.Runtime.CompilerServices.Union]
public class Result<T> : System.Runtime.CompilerServices.IUnion
{
    private readonly object? _value;

    public Result(T? value) { _value = value; }
    public Result(Exception? value) { _value = value; }

    public object? Value => _value;
}
```
```csharp
static void ClassUnionExample()
{
    Result<string> ok = new Result<string>("success");
    Result<string> err = new Result<string>(new InvalidOperationException("failed"));

    Console.WriteLine(Describe(ok));  // output: OK: success
    Console.WriteLine(Describe(err)); // output: Error: failed

    static string Describe(Result<string> result) => result switch
    {
        string s => $"OK: {s}",
        Exception e => $"Error: {e.Message}",
        null => "null",
    };
}
```
For class-based unions, the `null` pattern matches both a null reference and a null `Value`.

## C# language specification

For more information, see the Unions feature specification.

## See also

- The C# type system
- Pattern matching
- Switch expression
- Value types
- Records
