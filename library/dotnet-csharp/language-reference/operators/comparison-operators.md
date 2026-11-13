---
title: "Comparison operators - order items using the greater than and less than operators"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/comparison-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Comparison operators (C# reference)

The `<` (less than), `>` (greater than), `<=` (less than or equal), and `>=` (greater than or equal) comparison, also known as relational, operators compare their operands. All integral and floating-point numeric types support those operators.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

> **Note:**
> For the `==`, `<`, `>`, `<=`, and `>=` operators, if any of the operands isn't a number (`System.Double.NaN` or `System.Single.NaN`), the result of operation is `false`. This behavior means that the `NaN` value is neither greater than, less than, nor equal to any other `double` (or `float`) value, including `NaN`. For more information and examples, see the `System.Double.NaN` or `System.Single.NaN` reference article.

The char type also supports comparison operators. When you use `char` operands, the corresponding character codes are compared.

Enumeration types also support comparison operators. For operands of the same enum type, the corresponding values of the underlying integral type are compared.

The `==` and `!=` operators check if their operands are equal or not.

## Less than operator \<

The `<` operator returns `true` if its left-hand operand is less than its right-hand operand, `false` otherwise:

```csharp
﻿namespace operators;

public static class ComparisonOperators
{
    public static void Examples()
    {
        Console.WriteLine("--- >");
        Greater();
        Console.WriteLine("--- <");
        Less();
        Console.WriteLine("--- >=");
        GreaterOrEqual();
        Console.WriteLine("--- <=");
        LessOrEqual();
    }

    private static void Greater()
    {
        Console.WriteLine(7.0 > 5.1);   // output: True
        Console.WriteLine(5.1 > 5.1);   // output: False
        Console.WriteLine(0.0 > 5.1);   // output: False

        Console.WriteLine(double.NaN > 5.1);   // output: False
        Console.WriteLine(double.NaN <= 5.1);  // output: False
    }

    private static void Less()
    {
        Console.WriteLine(7.0 < 5.1);   // output: False
        Console.WriteLine(5.1 < 5.1);   // output: False
        Console.WriteLine(0.0 < 5.1);   // output: True

        Console.WriteLine(double.NaN < 5.1);   // output: False
        Console.WriteLine(double.NaN >= 5.1);  // output: False
    }

    private static void GreaterOrEqual()
    {
        Console.WriteLine(7.0 >= 5.1);   // output: True
        Console.WriteLine(5.1 >= 5.1);   // output: True
        Console.WriteLine(0.0 >= 5.1);   // output: False

        Console.WriteLine(double.NaN < 5.1);   // output: False
        Console.WriteLine(double.NaN >= 5.1);  // output: False
    }

    private static void LessOrEqual()
    {
        Console.WriteLine(7.0 <= 5.1);   // output: False
        Console.WriteLine(5.1 <= 5.1);   // output: True
        Console.WriteLine(0.0 <= 5.1);   // output: True

        Console.WriteLine(double.NaN > 5.1);   // output: False
        Console.WriteLine(double.NaN <= 5.1);  // output: False
    }
}
```
## Greater than operator >

The `>` operator returns `true` if its left-hand operand is greater than its right-hand operand, `false` otherwise:

```csharp
﻿namespace operators;

public static class ComparisonOperators
{
    public static void Examples()
    {
        Console.WriteLine("--- >");
        Greater();
        Console.WriteLine("--- <");
        Less();
        Console.WriteLine("--- >=");
        GreaterOrEqual();
        Console.WriteLine("--- <=");
        LessOrEqual();
    }

    private static void Greater()
    {
        Console.WriteLine(7.0 > 5.1);   // output: True
        Console.WriteLine(5.1 > 5.1);   // output: False
        Console.WriteLine(0.0 > 5.1);   // output: False

        Console.WriteLine(double.NaN > 5.1);   // output: False
        Console.WriteLine(double.NaN <= 5.1);  // output: False
    }

    private static void Less()
    {
        Console.WriteLine(7.0 < 5.1);   // output: False
        Console.WriteLine(5.1 < 5.1);   // output: False
        Console.WriteLine(0.0 < 5.1);   // output: True

        Console.WriteLine(double.NaN < 5.1);   // output: False
        Console.WriteLine(double.NaN >= 5.1);  // output: False
    }

    private static void GreaterOrEqual()
    {
        Console.WriteLine(7.0 >= 5.1);   // output: True
        Console.WriteLine(5.1 >= 5.1);   // output: True
        Console.WriteLine(0.0 >= 5.1);   // output: False

        Console.WriteLine(double.NaN < 5.1);   // output: False
        Console.WriteLine(double.NaN >= 5.1);  // output: False
    }

    private static void LessOrEqual()
    {
        Console.WriteLine(7.0 <= 5.1);   // output: False
        Console.WriteLine(5.1 <= 5.1);   // output: True
        Console.WriteLine(0.0 <= 5.1);   // output: True

        Console.WriteLine(double.NaN > 5.1);   // output: False
        Console.WriteLine(double.NaN <= 5.1);  // output: False
    }
}
```
## Less than or equal operator `<=`

The `<=` operator returns `true` if its left-hand operand is less than or equal to its right-hand operand. Otherwise, it returns `false`:

```csharp
﻿namespace operators;

public static class ComparisonOperators
{
    public static void Examples()
    {
        Console.WriteLine("--- >");
        Greater();
        Console.WriteLine("--- <");
        Less();
        Console.WriteLine("--- >=");
        GreaterOrEqual();
        Console.WriteLine("--- <=");
        LessOrEqual();
    }

    private static void Greater()
    {
        Console.WriteLine(7.0 > 5.1);   // output: True
        Console.WriteLine(5.1 > 5.1);   // output: False
        Console.WriteLine(0.0 > 5.1);   // output: False

        Console.WriteLine(double.NaN > 5.1);   // output: False
        Console.WriteLine(double.NaN <= 5.1);  // output: False
    }

    private static void Less()
    {
        Console.WriteLine(7.0 < 5.1);   // output: False
        Console.WriteLine(5.1 < 5.1);   // output: False
        Console.WriteLine(0.0 < 5.1);   // output: True

        Console.WriteLine(double.NaN < 5.1);   // output: False
        Console.WriteLine(double.NaN >= 5.1);  // output: False
    }

    private static void GreaterOrEqual()
    {
        Console.WriteLine(7.0 >= 5.1);   // output: True
        Console.WriteLine(5.1 >= 5.1);   // output: True
        Console.WriteLine(0.0 >= 5.1);   // output: False

        Console.WriteLine(double.NaN < 5.1);   // output: False
        Console.WriteLine(double.NaN >= 5.1);  // output: False
    }

    private static void LessOrEqual()
    {
        Console.WriteLine(7.0 <= 5.1);   // output: False
        Console.WriteLine(5.1 <= 5.1);   // output: True
        Console.WriteLine(0.0 <= 5.1);   // output: True

        Console.WriteLine(double.NaN > 5.1);   // output: False
        Console.WriteLine(double.NaN <= 5.1);  // output: False
    }
}
```
## Greater than or equal operator `>=`

The `>=` operator returns `true` if its left-hand operand is greater than or equal to its right-hand operand. Otherwise, it returns `false`:

```csharp
﻿namespace operators;

public static class ComparisonOperators
{
    public static void Examples()
    {
        Console.WriteLine("--- >");
        Greater();
        Console.WriteLine("--- <");
        Less();
        Console.WriteLine("--- >=");
        GreaterOrEqual();
        Console.WriteLine("--- <=");
        LessOrEqual();
    }

    private static void Greater()
    {
        Console.WriteLine(7.0 > 5.1);   // output: True
        Console.WriteLine(5.1 > 5.1);   // output: False
        Console.WriteLine(0.0 > 5.1);   // output: False

        Console.WriteLine(double.NaN > 5.1);   // output: False
        Console.WriteLine(double.NaN <= 5.1);  // output: False
    }

    private static void Less()
    {
        Console.WriteLine(7.0 < 5.1);   // output: False
        Console.WriteLine(5.1 < 5.1);   // output: False
        Console.WriteLine(0.0 < 5.1);   // output: True

        Console.WriteLine(double.NaN < 5.1);   // output: False
        Console.WriteLine(double.NaN >= 5.1);  // output: False
    }

    private static void GreaterOrEqual()
    {
        Console.WriteLine(7.0 >= 5.1);   // output: True
        Console.WriteLine(5.1 >= 5.1);   // output: True
        Console.WriteLine(0.0 >= 5.1);   // output: False

        Console.WriteLine(double.NaN < 5.1);   // output: False
        Console.WriteLine(double.NaN >= 5.1);  // output: False
    }

    private static void LessOrEqual()
    {
        Console.WriteLine(7.0 <= 5.1);   // output: False
        Console.WriteLine(5.1 <= 5.1);   // output: True
        Console.WriteLine(0.0 <= 5.1);   // output: True

        Console.WriteLine(double.NaN > 5.1);   // output: False
        Console.WriteLine(double.NaN <= 5.1);  // output: False
    }
}
```
## Operator overloadability

You can overload the `<`, `>`, `<=`, and `>=` operators in a user-defined type.

If you overload one of the `<` or `>` operators, you must overload both `<` and `>`. If you overload one of the `<=` or `>=` operators, you must overload both `<=` and `>=`.

## C# language specification

For more information, see the Relational and type-testing operators section of the C# language specification.

## See also

- C# operators and expressions
- `System.IComparable`1`
- Equality operators
