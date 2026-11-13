---
title: "default value expressions - produce the default value for any type"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/default.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Default value expressions

A default value expression produces the default value of a type. Two kinds of default value expressions exist: the `default` operator call and a `default` literal.

You also use the `default` keyword as the default case label within a `switch` statement.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## `default` operator

The argument to the `default` operator must be the name of a type or a type parameter, as the following example shows:

```csharp
﻿namespace operators;

public static class DefaultOperator
{
    public static void Examples()
    {
        WithOperand();
        DefaultLiteral();
    }

    private static void WithOperand()
    {
        Console.WriteLine(default(int));  // output: 0
        Console.WriteLine(default(object) is null);  // output: True

        void DisplayDefaultOf<T>()
        {
            var val = default(T);
            Console.WriteLine($"Default value of {typeof(T)} is {(val == null ? "null" : val.ToString())}.");
        }

        DisplayDefaultOf<int?>();
        DisplayDefaultOf<System.Numerics.Complex>();
        DisplayDefaultOf<System.Collections.Generic.List<int>>();
        // Output:
        // Default value of System.Nullable`1[System.Int32] is null.
        // Default value of System.Numerics.Complex is (0, 0).
        // Default value of System.Collections.Generic.List`1[System.Int32] is null.
    }

    private static void DefaultLiteral()
    {
        T[] InitializeArray<T>(int length, T initialValue = default)
        {
            if (length < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(length), "Array length must be nonnegative.");
            }

            var array = new T[length];
            for (var i = 0; i < length; i++)
            {
                array[i] = initialValue;
            }
            return array;
        }

        void Display<T>(T[] values) => Console.WriteLine($"[ {string.Join(", ", values)} ]");

        Display(InitializeArray<int>(3));  // output: [ 0, 0, 0 ]
        Display(InitializeArray<bool>(4, default));  // output: [ False, False, False, False ]

        System.Numerics.Complex fillValue = default;
        Display(InitializeArray(3, fillValue));  // output: [ (0, 0), (0, 0), (0, 0) ]
    }
}
```
## `default` literal

You can use the `default` literal to produce the default value of a type when the compiler can infer the expression type. The `default` literal expression produces the same value as the `default(T)` expression where `T` is the inferred type. You can use the `default` literal in any of the following cases:

- In the assignment or initialization of a variable.
- In the declaration of the default value for an optional method parameter.
- In a method call to provide an argument value.
- In a `return` statement or as an expression in an expression-bodied member.

The following example shows the usage of the `default` literal:

```csharp
﻿namespace operators;

public static class DefaultOperator
{
    public static void Examples()
    {
        WithOperand();
        DefaultLiteral();
    }

    private static void WithOperand()
    {
        Console.WriteLine(default(int));  // output: 0
        Console.WriteLine(default(object) is null);  // output: True

        void DisplayDefaultOf<T>()
        {
            var val = default(T);
            Console.WriteLine($"Default value of {typeof(T)} is {(val == null ? "null" : val.ToString())}.");
        }

        DisplayDefaultOf<int?>();
        DisplayDefaultOf<System.Numerics.Complex>();
        DisplayDefaultOf<System.Collections.Generic.List<int>>();
        // Output:
        // Default value of System.Nullable`1[System.Int32] is null.
        // Default value of System.Numerics.Complex is (0, 0).
        // Default value of System.Collections.Generic.List`1[System.Int32] is null.
    }

    private static void DefaultLiteral()
    {
        T[] InitializeArray<T>(int length, T initialValue = default)
        {
            if (length < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(length), "Array length must be nonnegative.");
            }

            var array = new T[length];
            for (var i = 0; i < length; i++)
            {
                array[i] = initialValue;
            }
            return array;
        }

        void Display<T>(T[] values) => Console.WriteLine($"[ {string.Join(", ", values)} ]");

        Display(InitializeArray<int>(3));  // output: [ 0, 0, 0 ]
        Display(InitializeArray<bool>(4, default));  // output: [ False, False, False, False ]

        System.Numerics.Complex fillValue = default;
        Display(InitializeArray(3, fillValue));  // output: [ (0, 0), (0, 0), (0, 0) ]
    }
}
```
> **Tip:**
> Use .NET style rule IDE0034 to specify a preference on the use of the `default` literal in your codebase.

## C# language specification

For more information, see the Default value expressions section of the C# language specification.

## See also

- C# operators and expressions
- Default values of C# types
- Generics in .NET
