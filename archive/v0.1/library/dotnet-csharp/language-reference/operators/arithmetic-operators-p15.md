---
title: "Arithmetic operators (part 15 of 15)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/arithmetic-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Arithmetic operators (part 15 of 15)

## Round-off errors

Because of general limitations in the floating-point representation of real numbers and floating-point arithmetic, round-off errors can occur in calculations that use floating-point types. The result of an expression might differ from the expected mathematical result. The following example demonstrates several such cases:

```csharp
﻿namespace operators;

public static class ArithmeticOperators
{
    public static void Examples()
    {
        Console.WriteLine("==== ++ and -- operators");
        Increment();
        Decrement();

        Console.WriteLine("==== Unary + and - operators");
        UnaryPlusAndMinus();

        Console.WriteLine("==== *, /, %, +, and - operators");
        Multiplication();
        IntegerDivision();
        IntegerAsFloatingPointDivision();
        FloatingPointDivision();
        IntegerRemainder();
        FloatingPointRemainder();
        Addition();
        Subtraction();

        Console.WriteLine("==== Precedence and associativity examples");
        PrecedenceAndAssociativity();

        Console.WriteLine("==== Compound assignment");
        CompoundAssignment();
        CompoundAssignmentWithCast();

        Console.WriteLine("==== Special cases");
        CheckedUnchecked();
        IntegerDivisionOverflow();
        FloatingPointOverflow();
        RoundOffErrors();
    }

    private static void Increment()
    {
        double a = 1.5;
        Console.WriteLine(a);   // output: 1.5
        Console.WriteLine(++a); // output: 2.5
        Console.WriteLine(a);   // output: 2.5

        int i = 3;
        Console.WriteLine(i);   // output: 3
        Console.WriteLine(i++); // output: 3
        Console.WriteLine(i);   // output: 4
    }

    private static void Decrement()
    {
        double a = 1.5;
        Console.WriteLine(a);   // output: 1.5
        Console.WriteLine(--a); // output: 0.5
        Console.WriteLine(a);   // output: 0.5

        int i = 3;
        Console.WriteLine(i);   // output: 3
        Console.WriteLine(i--); // output: 3
        Console.WriteLine(i);   // output: 2
    }

    private static void UnaryPlusAndMinus()
    {
        Console.WriteLine(+4);     // output: 4

        Console.WriteLine(-4);     // output: -4
        Console.WriteLine(-(-4));  // output: 4

        uint a = 5;
        var b = -a;
        Console.WriteLine(b);            // output: -5
        Console.WriteLine(b.GetType());  // output: System.Int64

        Console.WriteLine(-double.NaN);  // output: NaN
    }

    private static void Multiplication()
    {
        Console.WriteLine(5 * 2);         // output: 10
        Console.WriteLine(0.5 * 2.5);     // output: 1.25
        Console.WriteLine(0.1m * 23.4m);  // output: 2.34
    }

    private static void IntegerDivision()
    {
        Console.WriteLine(13 / 5);    // output: 2
        Console.WriteLine(-13 / 5);   // output: -2
        Console.WriteLine(13 / -5);   // output: -2
        Console.WriteLine(-13 / -5);  // output: 2
    }

    private static void IntegerAsFloatingPointDivision()
    {
        Console.WriteLine(13 / 5.0);       // output: 2.6

        int a = 13;
        int b = 5;
        Console.WriteLine((double)a / b);  // output: 2.6
    }

    private static void FloatingPointDivision()
    {
        Console.WriteLine(16.8f / 4.1f);   // output: 4.097561
        Console.WriteLine(16.8d / 4.1d);   // output: 4.09756097560976
        Console.WriteLine(16.8m / 4.1m);   // output: 4.0975609756097560975609756098
    }

    private static void IntegerRemainder()
    {
        Console.WriteLine(5 % 4);   // output: 1
        Console.WriteLine(5 % -4);  // output: 1
        Console.WriteLine(-5 % 4);  // output: -1
        Console.WriteLine(-5 % -4); // output: -1
    }

    private static void FloatingPointRemainder()
    {
        Console.WriteLine(-5.2f % 2.0f); // output: -1.2
        Console.WriteLine(5.9 % 3.1);    // output: 2.8
        Console.WriteLine(5.9m % 3.1m);  // output: 2.8
    }

    private static void Addition()
    {
        Console.WriteLine(5 + 4);       // output: 9
        Console.WriteLine(5 + 4.3);     // output: 9.3
        Console.WriteLine(5.1m + 4.2m); // output: 9.3
    }

    private static void Subtraction()
    {
        Console.WriteLine(47 - 3);      // output: 44
        Console.WriteLine(5 - 4.3);     // output: 0.7
        Console.WriteLine(7.5m - 2.3m); // output: 5.2
    }

    private static void PrecedenceAndAssociativity()
    {
        Console.WriteLine(2 + 2 * 2);   // output: 6
        Console.WriteLine((2 + 2) * 2); // output: 8

        Console.WriteLine(9 / 5 / 2);   // output: 0
        Console.WriteLine(9 / (5 / 2)); // output: 4
    }

    private static void CompoundAssignment()
    {
        int a = 5;
        a += 9;
        Console.WriteLine(a);  // output: 14

        a -= 4;
        Console.WriteLine(a);  // output: 10

        a *= 2;
        Console.WriteLine(a);  // output: 20

        a /= 4;
        Console.WriteLine(a);  // output: 5

        a %= 3;
        Console.WriteLine(a);  // output: 2
    }

    private static void CompoundAssignmentWithCast()
    {
        byte a = 200;
        byte b = 100;

        var c = a + b;
        Console.WriteLine(c.GetType());  // output: System.Int32
        Console.WriteLine(c);  // output: 300

        a += b;
        Console.WriteLine(a);  // output: 44
    }

    private static void CheckedUnchecked()
    {
        int a = int.MaxValue;
        int b = 3;

        Console.WriteLine(unchecked(a + b));  // output: -2147483646
        try
        {
            int d = checked(a + b);
        }
        catch(OverflowException)
        {
            Console.WriteLine($"Overflow occurred when adding {a} to {b}.");
        }
    }

    private static void IntegerDivisionOverflow()
    {
        int a = int.MinValue;
        int b = -1;
        try
        {
            int c = unchecked(a / b);
        }
        catch (ArithmeticException)
        {
            Console.WriteLine($"Overflow occurred when dividing {a} by {b}.");
        }
    }

    public record struct Point(int X, int Y)
    {
        public static Point operator checked +(Point left, Point right)
        {
            checked
            {
                return new Point(left.X + right.X, left.Y + right.Y);
            }
        }
        
        public static Point operator +(Point left, Point right)
        {
            return new Point(left.X + right.X, left.Y + right.Y);
        }
    }

    private static void FloatingPointOverflow()
    {
        double a = 1.0 / 0.0;
        Console.WriteLine(a);                    // output: Infinity
        Console.WriteLine(double.IsInfinity(a)); // output: True

        Console.WriteLine(double.MaxValue + double.MaxValue); // output: Infinity

        double b = 0.0 / 0.0;
        Console.WriteLine(b);                // output: NaN
        Console.WriteLine(double.IsNaN(b));  // output: True
    }

    private static void RoundOffErrors()
    {
        Console.WriteLine(.41f % .2f); // output: 0.00999999

        double a = 0.1;
        double b = 3 * a;
        Console.WriteLine(b == 0.3);   // output: False
        Console.WriteLine(b - 0.3);    // output: 5.55111512312578E-17

        decimal c = 1 / 3.0m;
        decimal d = 3 * c;
        Console.WriteLine(d == 1.0m);  // output: False
        Console.WriteLine(d);          // output: 0.9999999999999999999999999999
    }
}
```
For more information, see the remarks at the System.Double, System.Single, or System.Decimal reference pages.

## Operator overloadability

You can overload the unary (`++`, `--`, `+`, and `-`) and binary (`*`, `/`, `%`, `+`, and `-`) arithmetic operators for a user-defined type. When you overload a binary operator, you also implicitly overload the corresponding compound assignment operator. Starting with C# 14, a user-defined type can explicitly overload the compound assignment operators (`op=`) to provide a more efficient implementation. Typically, a type overloads these operators because the value can be updated in place, rather than allocating a new instance to store the result of the operation. If a type doesn't provide an explicit overload, the compiler generates the implicit overload.

### User-defined checked operators

When you overload an arithmetic operator, you can use the `checked` keyword to define the *checked* version of that operator. The following example shows how to do that:

```csharp
public record struct Point(int X, int Y)
{
    public static Point operator checked +(Point left, Point right)
    {
        checked
        {
            return new Point(left.X + right.X, left.Y + right.Y);
        }
    }
    
    public static Point operator +(Point left, Point right)
    {
        return new Point(left.X + right.X, left.Y + right.Y);
    }
}
```
When you define a checked operator, you must also define the corresponding operator without the `checked` modifier. A checked context calls the checked operator, and an unchecked context calls the operator without the `checked` modifier.

When you define both versions of an operator, their behavior differs only when the result of an operation is too large to represent in the result type as follows:

- A checked operator throws an `System.OverflowException`.
- An operator without the `checked` modifier returns an instance representing a *truncated* result.

For information about the difference in behavior of the built-in arithmetic operators, see the Arithmetic overflow and division by zero section.

You can use the `checked` modifier only when you overload any of the following operators:

- Unary `++`, `--`, and `-` operators
- Binary `*`, `/`, `+`, and `-` operators
- Compound assignment `*=`, `/=`, `+=`, and `-=` operators (C# 14 and later)
- Explicit conversion operators

> **Note:**
> The `checked` modifier doesn't affect the overflow-checking context within its body. The default context is defined by the value of the **CheckForOverflowUnderflow** compiler option. Use the `checked` and `unchecked` statements to explicitly specify the overflow-checking context, as the example at the beginning of this section demonstrates.

## C# language specification

For more information, see the following sections of the C# language specification:

- Postfix increment and decrement operators
- Prefix increment and decrement operators
- Unary plus operator
- Unary minus operator
- Multiplication operator
- Division operator
- Remainder operator
- Addition operator
- Subtraction operator
- Compound assignment
- The checked and unchecked operators
- Numeric promotions
- User defined compound assignment

## See also

- C# operators and expressions
- `System.Math`
- `System.MathF`
- Numerics in .NET
