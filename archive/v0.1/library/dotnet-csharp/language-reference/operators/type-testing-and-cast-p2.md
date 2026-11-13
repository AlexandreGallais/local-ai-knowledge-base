---
title: "Type-testing operators and cast expressions test the runtime type of an object (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/type-testing-and-cast.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Type-testing operators and cast expressions test the runtime type of an object (part 2 of 3)

## The `as` operator

Use the `as` operator to explicitly convert the result of an expression to a given reference or nullable value type. If the conversion isn't possible, the `as` operator returns `null`. Unlike a cast expression, the `as` operator never throws an exception.

The expression of the form

```csharp
E as T
```

Where `E` is an expression that returns a value and `T` is the name of a type or a type parameter, produces the same result as

```csharp
E is T ? (T)(E) : (T)null
```

Except that `E` is only evaluated once.

The `as` operator considers only reference, nullable, boxing, and unboxing conversions. You can't use the `as` operator to perform a user-defined conversion. To perform a user-defined conversion, use a cast expression.

The following example demonstrates the usage of the `as` operator:

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
> **Note:**
> As the preceding example shows, you need to compare the result of the `as` expression with `null` to check if the conversion was successful. You can use the `is` operator both to test if the conversion succeeds and, if it succeeds, assign its result to a new variable.

## Cast expression

A cast expression of the form `(T)E` explicitly converts the result of expression `E` to type `T`. If no explicit conversion exists from the type of `E` to type `T`, the compiler issues an error. At run time, an explicit conversion might not succeed and a cast expression might throw an exception.

The following example demonstrates explicit numeric and reference conversions:

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
For information about supported explicit conversions, see the Explicit conversions section of the C# language specification. For information about how to define a custom explicit or implicit type conversion, see User-defined conversion operators.

### Other usages of ()

You also use parentheses to call a method or invoke a delegate.

Another use of parentheses is to adjust the order in which C# evaluates operations in an expression. For more information, see C# operators.
