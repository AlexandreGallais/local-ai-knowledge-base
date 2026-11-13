---
title: "Arithmetic operators (part 13 of 15)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/arithmetic-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Arithmetic operators (part 13 of 15)

## Arithmetic overflow and division by zero

When the result of an arithmetic operation is outside the range of possible finite values of the involved numeric type, the behavior of an arithmetic operator depends on the type of its operands.

### Integer arithmetic overflow

Integer division by zero always throws a `System.DivideByZeroException`.

If integer arithmetic overflow occurs, the overflow-checking context, which can be checked or unchecked, controls the resulting behavior:

- In a checked context, if overflow happens in a constant expression, a compile-time error occurs. Otherwise, when the operation is performed at run time, an `System.OverflowException` is thrown.
- In an unchecked context, the result is truncated by discarding any high-order bits that don't fit in the destination type.

> **Note:**
> Integer division has a special case where an `System.ArithmeticException` can be thrown even in an unchecked context. When the left operand is the minimum value of a signed integer type (`int.MinValue` or `long.MinValue`) and the right operand is `-1`, the result cannot be represented in the destination type. The .NET runtime throws an `System.ArithmeticException` in this case, as shown in the following example:
>
> :::code language="csharp" source="snippets/shared/ArithmeticOperators.cs" id="IntegerDivisionOverflow":::

Along with the checked and unchecked statements, you can use the `checked` and `unchecked` operators to control the overflow-checking context, in which an expression is evaluated:

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
By default, arithmetic operations occur in an *unchecked* context.
