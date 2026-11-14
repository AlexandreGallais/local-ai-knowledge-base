---
title: "Type-testing operators and cast expressions test the runtime type of an object (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/type-testing-and-cast.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type-testing operators and cast expressions test the runtime type of an object (part 3 of 3)

## The `typeof` operator

The `typeof` operator gets the `System.Type` instance for a type. The argument to the `typeof` operator must be the name of a type or a type parameter, as the following example shows:

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
The argument can't be a type that requires metadata annotations. Examples of these types include the following types:

- `dynamic`
- `string?` (or any nullable reference type)

These types aren't directly represented in metadata. The types include attributes that describe the underlying type. In both cases, you can use the underlying type. Instead of `dynamic`, use `object`. Instead of `string?`, use `string`.

You can also use the `typeof` operator with unbound generic types. The name of an unbound generic type must contain the appropriate number of commas, which is one less than the number of type parameters. The following example shows the usage of the `typeof` operator with an unbound generic type:

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
An expression can't be an argument of the `typeof` operator. To get the `System.Type` instance for the run-time type of an expression result, use the `System.Object.GetType*` method.

### Type testing with the `typeof` operator

Use the `typeof` operator to check if the run-time type of the expression result exactly matches a given type. The following example demonstrates the difference between type checking done by using the `typeof` operator and the `is` operator:

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
## Operator overloadability

You can't overload the `is`, `as`, and `typeof` operators.

A user-defined type can't overload the `()` operator, but it can define custom type conversions that a cast expression performs. For more information, see User-defined conversion operators.

## C# language specification

For more information, see the following sections of the C# language specification:

- The `is` operator
- The `as` operator
- Cast expressions
- The `typeof` operator

## See also

- C# operators and expressions
- How to safely cast by using pattern matching and the is and as operators
- Generics in .NET
