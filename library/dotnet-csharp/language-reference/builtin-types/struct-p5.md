---
title: "Structure types (part 5 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/struct.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Structure types (part 5 of 5)

## Struct initialization and default values

A variable of a `struct` type directly contains the data for that `struct`. This direct data storage creates a distinction between an uninitialized `struct`, which has its default value, and an initialized `struct`, which stores values set by constructing it. For example, consider the following code:

```csharp
public readonly struct Measurement
{
    public Measurement()
    {
        Value = double.NaN;
        Description = "Undefined";
    }

    public Measurement(double value, string description)
    {
        Value = value;
        Description = description;
    }

    public double Value { get; init; }
    public string Description { get; init; }

    public override string ToString() => $"{Value} ({Description})";
}

public static void Main()
{
    var m1 = new Measurement();
    Console.WriteLine(m1);  // output: NaN (Undefined)

    var m2 = default(Measurement);
    Console.WriteLine(m2);  // output: 0 ()

    var ms = new Measurement[2];
    Console.WriteLine(string.Join(", ", ms));  // output: 0 (), 0 ()
}
```
As the preceding example shows, the default value expression ignores a parameterless constructor and produces the default value of the structure type. Structure-type array instantiation also ignores a parameterless constructor and produces an array populated with the default values of a structure type.

The most common situation where you see default values is in arrays or in other collections where internal storage includes blocks of variables. The following example creates an array of 30 `TemperatureRange` structures, each of which has the default value:

```csharp
// All elements have default values of 0:
TemperatureRange[] lastMonth = new TemperatureRange[30];
```

All of a struct's member fields must be *definitely assigned* when created because `struct` types directly store their data. The `default` value of a struct *definitely assigns* all fields to 0. All fields must be definitely assigned when a constructor is invoked. You initialize fields by using the following mechanisms:

- Add *field initializers* to any field or auto-implemented property.
- Initialize any fields or auto properties in the body of the constructor.

If you don't initialize all fields in a struct, the compiler adds code to the constructor that initializes those fields to the default value. A struct assigned to its `default` value is initialized to the 0-bit pattern. A struct initialized with `new` is initialized to the 0-bit pattern, followed by executing any field initializers and a constructor.

```csharp
public readonly struct Measurement
{
    public Measurement(double value)
    {
        Value = value;
    }

    public Measurement(double value, string description)
    {
        Value = value;
        Description = description;
    }

    public Measurement(string description)
    {
        Description = description;
    }

    public double Value { get; init; }
    public string Description { get; init; } = "Ordinary measurement";

    public override string ToString() => $"{Value} ({Description})";
}

public static void Main()
{
    var m1 = new Measurement(5);
    Console.WriteLine(m1);  // output: 5 (Ordinary measurement)

    var m2 = new Measurement();
    Console.WriteLine(m2);  // output: 0 ()

    var m3 = default(Measurement);
    Console.WriteLine(m3);  // output: 0 ()
}
```
Every `struct` has a `public` parameterless constructor. If you write a parameterless constructor, it must be public. If a struct declares any field initializers, it must explicitly declare a constructor. That constructor need not be parameterless. If a struct declares a field initializer but no constructors, the compiler reports an error. Any explicitly declared constructor (with parameters, or parameterless) executes all field initializers for that struct. All fields without a field initializer or an assignment in a constructor are set to the default value. For more information, see the C# language specification—Constructors.

A `struct` type can define a primary constructor as part of its declaration. Primary constructors provide a concise syntax for constructor parameters that can be used throughout the `struct` body, in any member declaration for that struct.

If all instance fields of a structure type are accessible, you can also instantiate it without the `new` operator. In that case, you must initialize all instance fields before the first use of the instance. The following example shows how to do that:

```csharp
public static class StructWithoutNew
{
    public struct Coords
    {
        public double x;
        public double y;
    }

    public static void Main()
    {
        Coords p;
        p.x = 3;
        p.y = 4;
        Console.WriteLine($"({p.x}, {p.y})");  // output: (3, 4)
    }
}
```
For the built-in value types, use the corresponding literals to specify a value of the type.

## Limitations with the design of a structure type

Structs have most of the capabilities of a class type. There are some exceptions:

- A structure type can't inherit from other class or structure type and it can't be the base of a class. However, a structure type can implement interfaces.
- You can't declare a finalizer within a structure type.
- A constructor of a structure type must initialize all instance fields of the type.

## Passing structure-type variables by reference

When you pass a structure-type variable to a method as an argument or return a structure-type value from a method, the whole instance of a structure type is copied. Pass by value can affect the performance of your code in high-performance scenarios that involve large structure types. You can avoid value copying by passing a structure-type variable by reference. Use the `ref`, `out`, `in`, or `ref readonly` method parameter modifiers to indicate that an argument must be passed by reference. Use ref returns to return a method result by reference. For more information, see Avoid allocations.

## `struct` constraint

Use the `struct` keyword in the `struct` constraint to specify that a type parameter is a non-nullable value type. Both structure and enumeration types satisfy the `struct` constraint.

## Conversions

For any structure type (except `ref struct` types), boxing and unboxing conversions exist to and from the `System.ValueType` and `System.Object` types. Boxing and unboxing conversions also exist between a structure type and any interface that it implements.

## C# language specification

For more information, see the Structs section of the C# language specification, specifically the following clauses:

- Readonly structs
- Readonly instance members
- Parameterless struct constructors
- Allow `with` expression on structs
- Record structs

You can also read about Auto default structs in the C# language specification.

## See also

- The C# type system
- Design guidelines - Choosing between class and struct
- Design guidelines - Struct design
- Resolve errors and warnings with inline array declarations
