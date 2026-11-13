---
title: "Operators and expressions - List all operators and expression"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# operators and expressions

C# provides many operators. The built-in types support many of these operators, so you can perform basic operations with values of those types.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

These operators include the following groups:

- Arithmetic operators that perform arithmetic operations with numeric operands
- Comparison operators that compare numeric operands
- Boolean logical operators that perform logical operations with `bool` operands
- Bitwise and shift operators that perform bitwise or shift operations with operands of the integral types
- Equality operators that check if their operands are equal or not

Typically, you can overload these operators. By overloading an operator, you specify the operator behavior for the operands of a user-defined type.

The simplest C# expressions are literals (for example, integer and real numbers) and names of variables. You can combine them into complex expressions by using operators. Operator precedence and associativity determine the order in which the operations in an expression are performed. You can use parentheses to change the order of evaluation imposed by operator precedence and associativity.

In the following code, examples of expressions appear on the right-hand side of assignments:

```csharp
﻿namespace operators;

public static class Overview
{
    public static void Examples()
    {
        GeneralExamples();
        InterpolatedString();
        Lambda();
        Query();
    }

    private static readonly int[] collection = [1, 2, 3];

    private static void GeneralExamples()
    {
        int a, b, c;
        a = 7;
        b = a;
        c = b++;
        b = a + b * c;
        c = a >= 100 ? b : c / 10;
        a = (int)Math.Sqrt(b * b + c * c);
        
        string s = "String literal";
        char l = s[s.Length - 1];

        List<int> numbers = [..collection];
        b = numbers.FindLast(n => n > 1);
    }

    private static void InterpolatedString()
    {
        var r = 2.3;
        var message = $"The area of a circle with radius {r} is {Math.PI * r * r:F3}.";
        Console.WriteLine(message);
        // Output:
        // The area of a circle with radius 2.3 is 16.619.
    }

    private static void Lambda()
    {
        int[] numbers = { 2, 3, 4, 5 };
        var maximumSquare = numbers.Max(x => x * x);
        Console.WriteLine(maximumSquare);
        // Output:
        // 25
    }

    private static void Query()
    {
        int[] scores = { 90, 97, 78, 68, 85 };
        IEnumerable<int> highScoresQuery =
            from score in scores
            where score > 80
            orderby score descending
            select score;
        Console.WriteLine(string.Join(" ", highScoresQuery));
        // Output:
        // 97 90 85
    }
}
```
Typically, an expression produces a result and can be included in another expression. A `void` method call is an example of an expression that doesn't produce a result. It can be used only as a statement, as the following example shows:

```csharp
Console.WriteLine("Hello, world!");
```

Here are some other kinds of expressions that C# provides:

- Interpolated string expressions that provide convenient syntax to create formatted strings:

```csharp
﻿namespace operators;

public static class Overview
{
    public static void Examples()
    {
        GeneralExamples();
        InterpolatedString();
        Lambda();
        Query();
    }

    private static readonly int[] collection = [1, 2, 3];

    private static void GeneralExamples()
    {
        int a, b, c;
        a = 7;
        b = a;
        c = b++;
        b = a + b * c;
        c = a >= 100 ? b : c / 10;
        a = (int)Math.Sqrt(b * b + c * c);
        
        string s = "String literal";
        char l = s[s.Length - 1];

        List<int> numbers = [..collection];
        b = numbers.FindLast(n => n > 1);
    }

    private static void InterpolatedString()
    {
        var r = 2.3;
        var message = $"The area of a circle with radius {r} is {Math.PI * r * r:F3}.";
        Console.WriteLine(message);
        // Output:
        // The area of a circle with radius 2.3 is 16.619.
    }

    private static void Lambda()
    {
        int[] numbers = { 2, 3, 4, 5 };
        var maximumSquare = numbers.Max(x => x * x);
        Console.WriteLine(maximumSquare);
        // Output:
        // 25
    }

    private static void Query()
    {
        int[] scores = { 90, 97, 78, 68, 85 };
        IEnumerable<int> highScoresQuery =
            from score in scores
            where score > 80
            orderby score descending
            select score;
        Console.WriteLine(string.Join(" ", highScoresQuery));
        // Output:
        // 97 90 85
    }
}
```
- Lambda expressions that allow you to create anonymous functions:

```csharp
﻿namespace operators;

public static class Overview
{
    public static void Examples()
    {
        GeneralExamples();
        InterpolatedString();
        Lambda();
        Query();
    }

    private static readonly int[] collection = [1, 2, 3];

    private static void GeneralExamples()
    {
        int a, b, c;
        a = 7;
        b = a;
        c = b++;
        b = a + b * c;
        c = a >= 100 ? b : c / 10;
        a = (int)Math.Sqrt(b * b + c * c);
        
        string s = "String literal";
        char l = s[s.Length - 1];

        List<int> numbers = [..collection];
        b = numbers.FindLast(n => n > 1);
    }

    private static void InterpolatedString()
    {
        var r = 2.3;
        var message = $"The area of a circle with radius {r} is {Math.PI * r * r:F3}.";
        Console.WriteLine(message);
        // Output:
        // The area of a circle with radius 2.3 is 16.619.
    }

    private static void Lambda()
    {
        int[] numbers = { 2, 3, 4, 5 };
        var maximumSquare = numbers.Max(x => x * x);
        Console.WriteLine(maximumSquare);
        // Output:
        // 25
    }

    private static void Query()
    {
        int[] scores = { 90, 97, 78, 68, 85 };
        IEnumerable<int> highScoresQuery =
            from score in scores
            where score > 80
            orderby score descending
            select score;
        Console.WriteLine(string.Join(" ", highScoresQuery));
        // Output:
        // 97 90 85
    }
}
```
- Query expressions that allow you to use query capabilities directly in C#:

```csharp
﻿namespace operators;

public static class Overview
{
    public static void Examples()
    {
        GeneralExamples();
        InterpolatedString();
        Lambda();
        Query();
    }

    private static readonly int[] collection = [1, 2, 3];

    private static void GeneralExamples()
    {
        int a, b, c;
        a = 7;
        b = a;
        c = b++;
        b = a + b * c;
        c = a >= 100 ? b : c / 10;
        a = (int)Math.Sqrt(b * b + c * c);
        
        string s = "String literal";
        char l = s[s.Length - 1];

        List<int> numbers = [..collection];
        b = numbers.FindLast(n => n > 1);
    }

    private static void InterpolatedString()
    {
        var r = 2.3;
        var message = $"The area of a circle with radius {r} is {Math.PI * r * r:F3}.";
        Console.WriteLine(message);
        // Output:
        // The area of a circle with radius 2.3 is 16.619.
    }

    private static void Lambda()
    {
        int[] numbers = { 2, 3, 4, 5 };
        var maximumSquare = numbers.Max(x => x * x);
        Console.WriteLine(maximumSquare);
        // Output:
        // 25
    }

    private static void Query()
    {
        int[] scores = { 90, 97, 78, 68, 85 };
        IEnumerable<int> highScoresQuery =
            from score in scores
            where score > 80
            orderby score descending
            select score;
        Console.WriteLine(string.Join(" ", highScoresQuery));
        // Output:
        // 97 90 85
    }
}
```
You can use an expression body definition to provide a concise definition for a method, constructor, property, indexer, or finalizer.

## Operator precedence

In an expression with multiple operators, the operators with higher precedence are evaluated before the operators with lower precedence. Operators of the same precedence are evaluated in lexical order. In the following example, the multiplication is performed first because it has higher precedence than addition:

```csharp
var a = 2 + 2 * 2;
Console.WriteLine(a); //  output: 6
```

Use parentheses to change the order of evaluation imposed by operator precedence:

```csharp
var a = (2 + 2) * 2;
Console.WriteLine(a); //  output: 8
```

The following table lists the C# operators starting with the highest precedence to the lowest. The operators within each row have the same precedence.

| Operators | Category or name |
| --------- | ---------------- |
| `x.y`, `f(x)`, `a[i]`, `x?.y`, `x?[y]`, `x++`, `x--`, `x!`, `new`, `typeof`, `checked`, `unchecked`, `default`, `nameof`, `delegate`, `sizeof`, `stackalloc`, `x->y` | Primary |
| `&#43;x`, `&#45;x`, `&#33;x`, `&#126;x`, `++x`, `--x`, `^x`, `(T)x`, `await`, `&x`, `*x`, `true and false` | Unary |
| `x..y` | Range |
| `switch`, `with` | `switch` and `with` expressions |
| `x * y`, `x / y`, `x % y` | Multiplicative |
| `x + y`, `x – y` | Additive |
| `x << y`, `x >> y`, `x >>> y` | Shift |
| `x < y`, `x > y`, `x <= y`, `x >= y`, `is`, `as` | Relational and type-testing |
| `x == y`, `x != y` | Equality |
| `x & y` | Boolean logical AND or bitwise logical AND |
| `x ^ y` | Boolean logical XOR or bitwise logical XOR |
| `x &#124; y` | Boolean logical OR or bitwise logical OR |
| `x && y` | Conditional AND |
| `x &#124;&#124; y` | Conditional OR |
| `x ?? y` | Null-coalescing operator |
| `c ? t : f` | Conditional operator |
| `x = y`, `x += y`, `x -= y`, `x *= y`, `x /= y`, `x %= y`, `x &= y`, `x \|= y`, `x ^= y`, `x <<= y`, `x >>= y`, `x >>>= y`, `x ??= y`, `=>` | Assignment and lambda declaration |

For information about the precedence of logical pattern combinators, see the Precedence and order of checking of logical patterns section of the Patterns article.

## Operator associativity

When operators have the same precedence, associativity of the operators determines the order in which the operations are performed:

- *Left-associative* operators are evaluated in order from left to right. Except for the assignment operators and the null-coalescing operators, all binary operators are left-associative. For example, `a + b - c` is evaluated as `(a + b) - c`.
- *Right-associative* operators are evaluated in order from right to left. The assignment operators, the null-coalescing operators, lambdas, and the conditional operator `?:` are right-associative. For example, `x = y = z` is evaluated as `x = (y = z)`.

> **Important:**
> In an expression of the form `P?.A0?.A1`, if `P` is `null`, neither `A0` nor `A1` are evaluated. Similarly, in an expression of the form `P?.A0.A1`, because `A0` isn't evaluated when `P` is null, neither is `A0.A1`. See the C# language specification for more details.

Use parentheses to change the order of evaluation imposed by operator associativity:

```csharp
int a = 13 / 5 / 2;
int b = 13 / (5 / 2);
Console.WriteLine($"a = {a}, b = {b}");  // output: a = 1, b = 6
```

## Operand evaluation

Unrelated to operator precedence and associativity, operands in an expression are evaluated from left to right. The following examples demonstrate the order in which operators and operands are evaluated:

| Expression        | Order of evaluation |
|-------------------|---------------------|
| `a + b`           | a, b, +             |
| `a + b * c`       | a, b, c, *, +       |
| `a / b + c * d`   | a, b, /, c, d, *, + |
| `a / (b + c) * d` | a, b, c, +, /, d, * |

Typically, all operator operands are evaluated. However, some operators evaluate operands conditionally. That condition means the value of the leftmost operand of such an operator defines if (or which) other operands should be evaluated. These operators are the conditional logical AND (`&&`) and OR (`||`) operators, the null-coalescing operators `??` and `??=`, the null-conditional operators `?.` and `?[]`, and the conditional operator `?:`. For more information, see the description of each operator.

## C# language specification

For more information, see the following sections of the C# language specification:

- Expressions
- Operators

## See also

- Operator overloading
- Expression trees
