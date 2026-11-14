---
title: "Structure types (part 3 of 5)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/struct.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Structure types (part 3 of 5)

## `readonly` instance members

Use the `readonly` modifier to declare that an instance member doesn't modify the state of a struct. If you can't declare the whole structure type as `readonly`, use the `readonly` modifier to mark the instance members that don't modify the state of the struct.

Within a `readonly` instance member, you can't assign to the structure's instance fields. However, a `readonly` member can call a non-`readonly` member. In that case, the compiler creates a copy of the structure instance and calls the non-`readonly` member on that copy. As a result, the original structure instance isn't modified.

Typically, you apply the `readonly` modifier to the following kinds of instance members:

- Methods:

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
  You can also apply the `readonly` modifier to methods that override methods declared in `System.Object`:

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
- Properties and indexers:
