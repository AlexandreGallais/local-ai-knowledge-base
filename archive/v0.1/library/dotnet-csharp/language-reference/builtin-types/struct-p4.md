---
title: "Structure types (part 4 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/struct.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Structure types (part 4 of 5)

```csharp
﻿namespace builtin_types
{
    public static class StructType
    {
        public static void Examples()
        {
            without_new.StructWithoutNew.Main();
            parameterless_constructor.Example.Main();
            field_initializer.Example.Main();
            with_expression.Example.Main();
        }

        public struct Coords
        {
            public Coords(double x, double y)
            {
                X = x;
                Y = y;
            }

            public double X { get; }
            public double Y { get; }

            public override string ToString() => $"({X}, {Y})";
        }
    }

    namespace without_new
    {
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
    }

    namespace readonly_struct
    {
        public readonly struct Coords
        {
            public Coords(double x, double y)
            {
                X = x;
                Y = y;
            }

            public double X { get; init; }
            public double Y { get; init; }

            public override string ToString() => $"({X}, {Y})";
        }
    }

    namespace readonly_members
    {
        public struct Example
        {
            private int counter;
            public int Counter
            {
                readonly get => counter;
                set => counter = value;
            }

            public readonly double X { get; init; }
            public readonly double Y { get; init; }

            public readonly double Sum()
            {
                return X + Y;
            }

            public readonly override string ToString() => $"({X}, {Y})";
        }
    }

    namespace ref_struct
    {
        public ref struct CustomRef
        {
            public bool IsValid;
            public Span<int> Inputs;
            public Span<int> Outputs;
        }

        public readonly ref struct ConversionRequest
        {
            public ConversionRequest(double rate, ReadOnlySpan<double> values)
            {
                Rate = rate;
                Values = values;
            }

            public double Rate { get; }
            public ReadOnlySpan<double> Values { get; }
        }

        public ref struct RefFieldExample
        {
            private ref int number;

            public int GetNumber()
            {
                if (System.Runtime.CompilerServices.Unsafe.IsNullRef(ref number))
                {
                    throw new InvalidOperationException("The number ref field is not initialized.");
                }

                return number;
            }
        }
    }

    namespace parameterless_constructor
    {
        public static class Example
        {
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
        }
    }

    namespace field_initializer
    {
        public static class Example
        {
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
        }
    }

    namespace with_expression
    {
        public static class Example
        {
            public readonly struct Coords
            {
                public Coords(double x, double y)
                {
                    X = x;
                    Y = y;
                }

                public double X { get; init; }
                public double Y { get; init; }

                public override string ToString() => $"({X}, {Y})";
            }

            public static void Main()
            {
                var p1 = new Coords(0, 0);
                Console.WriteLine(p1);  // output: (0, 0)

                var p2 = p1 with { X = 3 };
                Console.WriteLine(p2);  // output: (3, 0)

                var p3 = p1 with { X = 1, Y = 4 };
                Console.WriteLine(p3);  // output: (1, 4)
            }
        }
    }

    namespace InlineArrays
    {
        [System.Runtime.CompilerServices.InlineArray(10)]
        public struct CharBuffer
        {
            private char _firstElement;
        }

        [System.Runtime.CompilerServices.InlineArray(10)]
        public struct CharBufferWithPointer
        {
            private unsafe char* _pointerElement;    // CS9184
        }

        [System.Runtime.CompilerServices.InlineArray(10)]
        public struct CharBufferWithReferenceType
        {
            private string _referenceElement;
        }
    }
}
```
  If you need to apply the `readonly` modifier to both accessors of a property or indexer, apply it in the declaration of the property or indexer.

  > **Note:**
  > The compiler declares a `get` accessor of an automatically implemented property as `readonly`, regardless of the presence of the `readonly` modifier in a property declaration.

  You can apply the `readonly` modifier to a property or indexer with an `init` accessor:

```csharp
public readonly double X { get; init; }
```
You can apply the `readonly` modifier to static fields of a structure type, but not to any other static members, such as properties or methods.

The compiler can make use of the `readonly` modifier for performance optimizations. For more information, see Avoiding allocations.

## Nondestructive mutation

Use the `with` expression to create a copy of a structure-type instance with the specified properties and fields changed. Use object initializer syntax to specify which members to modify and their new values, as the following example shows:

```csharp
public readonly struct Coords
{
    public Coords(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double X { get; init; }
    public double Y { get; init; }

    public override string ToString() => $"({X}, {Y})";
}

public static void Main()
{
    var p1 = new Coords(0, 0);
    Console.WriteLine(p1);  // output: (0, 0)

    var p2 = p1 with { X = 3 };
    Console.WriteLine(p2);  // output: (3, 0)

    var p3 = p1 with { X = 1, Y = 4 };
    Console.WriteLine(p3);  // output: (1, 4)
}
```
## `record` struct

You can define record structure types. Record types provide built-in functionality for encapsulating data. You can define both `record struct` and `readonly record struct` types. A record struct can't be a `ref struct`. For more information and examples, see Records.

## Inline arrays

You can declare *inline arrays* as a `struct` type:

```csharp
[System.Runtime.CompilerServices.InlineArray(10)]
public struct CharBuffer
{
    private char _firstElement;
}
```
An inline array is a structure that contains a contiguous block of N elements of the same type. It's a safe-code equivalent of the fixed buffer declaration available only in unsafe code. An inline array is a `struct` with the following characteristics:

- It contains a single field.
- The struct doesn't specify an explicit layout.

In addition, the compiler validates the `System.Runtime.CompilerServices.InlineArrayAttribute` attribute:

- The length must be greater than zero (`> 0`).
- The target type must be a struct.

In most cases, you can access an inline array like an array, both to read and write values. You can also use the range and index operators.

There are minimal restrictions on the type of the single field of an inline array. It can't be a pointer type:

```csharp
[System.Runtime.CompilerServices.InlineArray(10)]
public struct CharBufferWithPointer
{
    private unsafe char* _pointerElement;    // CS9184
}
```
But it can be any reference type, or any value type:

```csharp
[System.Runtime.CompilerServices.InlineArray(10)]
public struct CharBufferWithReferenceType
{
    private string _referenceElement;
}
```
You can use inline arrays with almost any C# data structure.

Inline arrays are an advanced language feature. They're intended for high-performance scenarios where an inline, contiguous block of elements is faster than other alternative data structures. You can learn more about inline arrays from §16.6 Inline arrays in the C# standard.
