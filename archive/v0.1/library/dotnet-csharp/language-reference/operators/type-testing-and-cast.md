---
title: "Type-testing operators and cast expressions test the runtime type of an object (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/type-testing-and-cast.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Type-testing operators and cast expressions - `is`, `as`, `typeof`, and casts

These operators and expressions perform type checking or type conversion. The `is` operator checks if the run-time type of an expression is compatible with a given type. The `as` operator explicitly converts an expression to a given type if its run-time type is compatible with that type. Cast expressions perform an explicit conversion to a target type. The `typeof` operator obtains the `System.Type` instance for a type.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## The `is` operator

The `is` operator checks if the run-time type of an expression result is compatible with a given type. The `is` operator also tests an expression result against a pattern.

The expression with the type-testing `is` operator has the following form

```csharp
E is T
```

Where `E` is an expression that returns a value and `T` is the name of a type or a type parameter. `E` can't be an anonymous method or a lambda expression.

The `is` operator returns `true` when an expression result is non-null and any of the following conditions are true:

- The run-time type of an expression result has an identity conversion to `T`.

- The run-time type of an expression result derives from type `T`, implements interface `T`, or another implicit reference conversion exists from it to `T`. This condition covers inheritance relationships and interface implementations.

- The run-time type of an expression result is a nullable value type with the underlying type `T` and the `System.Nullable`1.HasValue` is `true`.

- A boxing or unboxing conversion exists from the run-time type of an expression result to type `T` when the expression isn't an instance of a `ref struct`.

The `is` operator doesn't consider user-defined conversions or implicit span conversions.

The following example demonstrates that the `is` operator returns `true` if the run-time type of an expression result derives from a given type, that is, there exists a reference conversion between types:

```csharp
﻿namespace operators;

public static class TypeTestingAndConversionOperators
{
    public static void Examples()
    {
        Cast();
        IsOperatorExample.Main();
        IsOperatorWithInt();
        IsOperatorDeclarationPattern();
        AsOperator();
        TypeOf();
        TypeOfUnboundGeneric();
        TypeOfExample.Main();
    }

    private static void Cast()
    {
        double x = 1234.7;
        int a = (int)x;
        Console.WriteLine(a);   // output: 1234

        int[] ints = [10, 20, 30];
        IEnumerable<int> numbers = ints;
        IList<int> list = (IList<int>)numbers;
        Console.WriteLine(list.Count);  // output: 3
        Console.WriteLine(list[1]);  // output: 20
    }

    public class Base { }

    public class Derived : Base { }

    public static class IsOperatorExample
    {
        public static void Main()
        {
            object b = new Base();
            Console.WriteLine(b is Base);  // output: True
            Console.WriteLine(b is Derived);  // output: False

            object d = new Derived();
            Console.WriteLine(d is Base);  // output: True
            Console.WriteLine(d is Derived); // output: True
        }
    }

    private static void IsOperatorWithInt()
    {
        int i = 27;
        Console.WriteLine(i is System.IFormattable);  // output: True

        object iBoxed = i;
        Console.WriteLine(iBoxed is int);  // output: True
        Console.WriteLine(iBoxed is long);  // output: False
    }

    private static void IsOperatorDeclarationPattern()
    {
        int i = 23;
        object iBoxed = i;
        int? jNullable = 7;
        if (iBoxed is int a && jNullable is int b)
        {
            Console.WriteLine(a + b);  // output 30
        }
    }

    private static void AsOperator()
    {
        IEnumerable<int> numbers = new List<int>(){10, 20, 30};
        IList<int> indexable = numbers as IList<int>;
        if (indexable != null)
        {
            Console.WriteLine(indexable[0] + indexable[indexable.Count - 1]);  // output: 40
        }
    }

    private static void TypeOf()
    {
        void PrintType<T>() => Console.WriteLine(typeof(T));

        Console.WriteLine(typeof(List<string>));
        PrintType<int>();
        PrintType<System.Int32>();
        PrintType<Dictionary<int, char>>();
        // Output:
        // System.Collections.Generic.List`1[System.String]
        // System.Int32
        // System.Int32
        // System.Collections.Generic.Dictionary`2[System.Int32,System.Char]
    }

    private static void TypeOfUnboundGeneric()
    {
        Console.WriteLine(typeof(Dictionary<,>));
        // Output:
        // System.Collections.Generic.Dictionary`2[TKey,TValue]
    }

    public class Animal { }

    public class Giraffe : Animal { }

    public static class TypeOfExample
    {
        public static void Main()
        {
            object b = new Giraffe();
            Console.WriteLine(b is Animal);  // output: True
            Console.WriteLine(b.GetType() == typeof(Animal));  // output: False

            Console.WriteLine(b is Giraffe);  // output: True
            Console.WriteLine(b.GetType() == typeof(Giraffe));  // output: True
        }
    }
}
```
The next example shows that the `is` operator takes into account boxing and unboxing conversions but doesn't consider numeric conversions:

```csharp
﻿namespace operators;

public static class TypeTestingAndConversionOperators
{
    public static void Examples()
    {
        Cast();
        IsOperatorExample.Main();
        IsOperatorWithInt();
        IsOperatorDeclarationPattern();
        AsOperator();
        TypeOf();
        TypeOfUnboundGeneric();
        TypeOfExample.Main();
    }

    private static void Cast()
    {
        double x = 1234.7;
        int a = (int)x;
        Console.WriteLine(a);   // output: 1234

        int[] ints = [10, 20, 30];
        IEnumerable<int> numbers = ints;
        IList<int> list = (IList<int>)numbers;
        Console.WriteLine(list.Count);  // output: 3
        Console.WriteLine(list[1]);  // output: 20
    }

    public class Base { }

    public class Derived : Base { }

    public static class IsOperatorExample
    {
        public static void Main()
        {
            object b = new Base();
            Console.WriteLine(b is Base);  // output: True
            Console.WriteLine(b is Derived);  // output: False

            object d = new Derived();
            Console.WriteLine(d is Base);  // output: True
            Console.WriteLine(d is Derived); // output: True
        }
    }

    private static void IsOperatorWithInt()
    {
        int i = 27;
        Console.WriteLine(i is System.IFormattable);  // output: True

        object iBoxed = i;
        Console.WriteLine(iBoxed is int);  // output: True
        Console.WriteLine(iBoxed is long);  // output: False
    }

    private static void IsOperatorDeclarationPattern()
    {
        int i = 23;
        object iBoxed = i;
        int? jNullable = 7;
        if (iBoxed is int a && jNullable is int b)
        {
            Console.WriteLine(a + b);  // output 30
        }
    }

    private static void AsOperator()
    {
        IEnumerable<int> numbers = new List<int>(){10, 20, 30};
        IList<int> indexable = numbers as IList<int>;
        if (indexable != null)
        {
            Console.WriteLine(indexable[0] + indexable[indexable.Count - 1]);  // output: 40
        }
    }

    private static void TypeOf()
    {
        void PrintType<T>() => Console.WriteLine(typeof(T));

        Console.WriteLine(typeof(List<string>));
        PrintType<int>();
        PrintType<System.Int32>();
        PrintType<Dictionary<int, char>>();
        // Output:
        // System.Collections.Generic.List`1[System.String]
        // System.Int32
        // System.Int32
        // System.Collections.Generic.Dictionary`2[System.Int32,System.Char]
    }

    private static void TypeOfUnboundGeneric()
    {
        Console.WriteLine(typeof(Dictionary<,>));
        // Output:
        // System.Collections.Generic.Dictionary`2[TKey,TValue]
    }

    public class Animal { }

    public class Giraffe : Animal { }

    public static class TypeOfExample
    {
        public static void Main()
        {
            object b = new Giraffe();
            Console.WriteLine(b is Animal);  // output: True
            Console.WriteLine(b.GetType() == typeof(Animal));  // output: False

            Console.WriteLine(b is Giraffe);  // output: True
            Console.WriteLine(b.GetType() == typeof(Giraffe));  // output: True
        }
    }
}
```
For information about C# conversions, see the Conversions chapter of the C# language specification.

### Type testing with pattern matching

The `is` operator also tests an expression result against a pattern. The following example shows how to use a declaration pattern to check the run-time type of an expression:

```csharp
﻿namespace operators;

public static class TypeTestingAndConversionOperators
{
    public static void Examples()
    {
        Cast();
        IsOperatorExample.Main();
        IsOperatorWithInt();
        IsOperatorDeclarationPattern();
        AsOperator();
        TypeOf();
        TypeOfUnboundGeneric();
        TypeOfExample.Main();
    }

    private static void Cast()
    {
        double x = 1234.7;
        int a = (int)x;
        Console.WriteLine(a);   // output: 1234

        int[] ints = [10, 20, 30];
        IEnumerable<int> numbers = ints;
        IList<int> list = (IList<int>)numbers;
        Console.WriteLine(list.Count);  // output: 3
        Console.WriteLine(list[1]);  // output: 20
    }

    public class Base { }

    public class Derived : Base { }

    public static class IsOperatorExample
    {
        public static void Main()
        {
            object b = new Base();
            Console.WriteLine(b is Base);  // output: True
            Console.WriteLine(b is Derived);  // output: False

            object d = new Derived();
            Console.WriteLine(d is Base);  // output: True
            Console.WriteLine(d is Derived); // output: True
        }
    }

    private static void IsOperatorWithInt()
    {
        int i = 27;
        Console.WriteLine(i is System.IFormattable);  // output: True

        object iBoxed = i;
        Console.WriteLine(iBoxed is int);  // output: True
        Console.WriteLine(iBoxed is long);  // output: False
    }

    private static void IsOperatorDeclarationPattern()
    {
        int i = 23;
        object iBoxed = i;
        int? jNullable = 7;
        if (iBoxed is int a && jNullable is int b)
        {
            Console.WriteLine(a + b);  // output 30
        }
    }

    private static void AsOperator()
    {
        IEnumerable<int> numbers = new List<int>(){10, 20, 30};
        IList<int> indexable = numbers as IList<int>;
        if (indexable != null)
        {
            Console.WriteLine(indexable[0] + indexable[indexable.Count - 1]);  // output: 40
        }
    }

    private static void TypeOf()
    {
        void PrintType<T>() => Console.WriteLine(typeof(T));

        Console.WriteLine(typeof(List<string>));
        PrintType<int>();
        PrintType<System.Int32>();
        PrintType<Dictionary<int, char>>();
        // Output:
        // System.Collections.Generic.List`1[System.String]
        // System.Int32
        // System.Int32
        // System.Collections.Generic.Dictionary`2[System.Int32,System.Char]
    }

    private static void TypeOfUnboundGeneric()
    {
        Console.WriteLine(typeof(Dictionary<,>));
        // Output:
        // System.Collections.Generic.Dictionary`2[TKey,TValue]
    }

    public class Animal { }

    public class Giraffe : Animal { }

    public static class TypeOfExample
    {
        public static void Main()
        {
            object b = new Giraffe();
            Console.WriteLine(b is Animal);  // output: True
            Console.WriteLine(b.GetType() == typeof(Animal));  // output: False

            Console.WriteLine(b is Giraffe);  // output: True
            Console.WriteLine(b.GetType() == typeof(Giraffe));  // output: True
        }
    }
}
```
For information about the supported patterns, see Patterns.
