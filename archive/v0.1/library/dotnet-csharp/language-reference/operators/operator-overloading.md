---
title: "Operator overloading - Define unary, arithmetic, equality, and comparison operators."
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/operator-overloading.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Operator overloading - predefined unary, arithmetic, equality, and comparison operators

You can overload a predefined C# operator in a user-defined type. By overloading an operator, you provide a custom implementation for the operation when one or both operands are of that type. See the Overloadable operators section for a list of C# operators that you can overload.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Use the `operator` keyword to declare an operator. An operator declaration must satisfy the following rules:

- It includes a `public` modifier.
- A unary operator has one input parameter. A binary operator has two input parameters. In each case, at least one parameter must have type `T` or `T?` where `T` is the type that contains the operator declaration.
- It includes the `static` modifier, except for the compound assignment operators, such as `+=`.
- The increment (`++`) and decrement (`--`) operators can be implemented as either static or instance methods. Instance method operators are a new feature introduced in C# 14.

The following example defines a simplified structure to represent a rational number. The structure overloads some of the arithmetic operators:

```csharp
﻿public struct Fraction
{
    private int numerator;
    private int denominator;

    public Fraction(int numerator, int denominator)
    {
        if (denominator == 0)
        {
            throw new ArgumentException("Denominator cannot be zero.", nameof(denominator));
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }

    public static Fraction operator +(Fraction operand) => operand;
    public static Fraction operator -(Fraction operand) => new Fraction(-operand.numerator, operand.denominator);

    public static Fraction operator +(Fraction left, Fraction right)
        => new Fraction(left.numerator * right.denominator + right.numerator * left.denominator, left.denominator * right.denominator);

    public static Fraction operator -(Fraction left, Fraction right)
        => left + (-right);

    public static Fraction operator *(Fraction left, Fraction right)
        => new Fraction(left.numerator * right.numerator, left.denominator * right.denominator);

    public static Fraction operator /(Fraction left, Fraction right)
    {
        if (right.numerator == 0)
        {
            throw new DivideByZeroException();
        }
        return new Fraction(left.numerator * right.denominator, left.denominator * right.numerator);
    }

    // Define increment and decrement to add 1/den, rather than 1/1.
    public static Fraction operator ++(Fraction operand)
        => new Fraction(operand.numerator + 1, operand.denominator);

    public static Fraction operator --(Fraction operand) =>
        new Fraction(operand.numerator - 1, operand.denominator);

    public override string ToString() => $"{numerator} / {denominator}";

    // New operators allowed in C# 14:
    public void operator +=(Fraction operand) =>
        (numerator, denominator ) =
        (
            numerator * operand.denominator + operand.numerator * denominator,
            denominator * operand.denominator
        );

    public void operator -=(Fraction operand) =>
        (numerator, denominator) =
        (
            numerator * operand.denominator - operand.numerator * denominator,
            denominator * operand.denominator
        );

    public void operator *=(Fraction operand) =>
        (numerator, denominator) =
        (
            numerator * operand.numerator,
            denominator * operand.denominator
        );

    public void operator /=(Fraction operand)
    {
        if (operand.numerator == 0)
        {
            throw new DivideByZeroException();
        }
        (numerator, denominator) =
        (
            numerator * operand.denominator,
            denominator * operand.numerator
        );
    }

    public void operator ++() => numerator++;

    public void operator --() => numerator--;
}

public static class OperatorOverloading
{
    public static void Main()
    {
        var a = new Fraction(5, 4);
        var b = new Fraction(1, 2);
        Console.WriteLine(-a);   // output: -5 / 4
        Console.WriteLine(a + b);  // output: 14 / 8
        Console.WriteLine(a - b);  // output: 6 / 8
        Console.WriteLine(a * b);  // output: 5 / 8
        Console.WriteLine(a / b);  // output: 10 / 4
    }
}
```
You could extend the preceding example by defining an implicit conversion from `int` to `Fraction`. Then, overloaded operators would support arguments of those two types. That is, it would become possible to add an integer to a fraction and obtain a fraction as a result.

You also use the `operator` keyword to define a custom type conversion. For more information, see User-defined conversion operators.

## Overloadable operators

The following table shows the operators that can be overloaded:

| Operators | Notes |
| :--------------------: | ------------- |
|`+x`, `-x`, `!x`, `~x`, `++`, `--`, `true`, `false`|The `true` and `false` operators must be overloaded together.|
|`x + y`, `x - y`, `x * y`, `x / y`, `x % y`,  `x & y`, `x &#124; y`, `x ^ y`,  `x << y`, `x >> y`, `x >>> y` | |
|`x == y`, `x != y`, `x < y`, `x > y`, `x <= y`, `x >= y`|Must be overloaded in pairs as follows:  `==` and `!=`, `<` and `>`, `<=` and `>=`.|
|`+=`, `-=`, `*=`, `/=`, `%=`, `&=`, `|=`, `^=`, `<<=`, `>>=`, `>>>=`|The compound assignment operators can be overloaded in C# 14 and later.|

A compound assignment overloaded operator must follow these rules:

- It must include the `public` modifier.
- It can't include the `static` modifier.
- The return type must be `void`.
- The declaration must include one parameter, which represents the right hand side of the compound assignment.

Starting in C# 14, you can overload the increment (`++`) and decrement (`--`) operators as instance members. Instance operators can improve performance by avoiding the creation of a new instance. An instance operator must follow these rules:

- It must include the `public` modifier.
- It can't include the `static` modifier.
- The return type must be `void`.
- It can't declare any parameters, even if those parameters have a default value.

## Non overloadable operators

The following table shows the operators that can't be overloaded:

| Operators | Alternatives |
| :---------: | --------------- |
|`x && y`, `x &#124;&#124; y`| Overload both the `true` and `false` operators and the `&` or `&#124;` operators. For more information, see User-defined conditional logical operators.|
|`a&#91;i&#93;`, `a?[i]`|Define an indexer.|
|`(T)x`|Define custom type conversions performed by a cast expression. For more information, see User-defined conversion operators.|
|`^x`, `x = y`, `x.y`, `x?.y`, `c ? t : f`, `x ?? y`, `??= y`,`x..y`, `x->y`, `=>`, `f(x)`, `as`, `await`, `checked`, `unchecked`, `default`, `delegate`, `is`, `nameof`, `new`, `sizeof`, `stackalloc`, `switch`, `typeof`, `with`|None.|

Before C# 14, the compound operators can't be overloaded. Overloading the corresponding binary operator implicitly overloads the corresponding compound assignment operator.

## Operator overload resolution

> **Important:**
> This section applies to C# 14 and later. Before C# 14, user-defined compound assignment operators and instance increment and decrement operators aren't allowed.

If `x` is classified as a variable in a compound assignment expression such as `x «op»= y`, instance operators take precedence over any static operator for `«op»`. If the type of `x` doesn't declare an overloaded `«op»=` operator or `x` isn't classified as a variable, the static operators are used.

For the postfix operator `++`, if `x` isn't classified as a variable *or* the expression `x++` is used, the instance `operator++` is ignored. Otherwise, preference is given to the instance `operator ++`. For example,

```csharp
x++; // Instance operator++ preferred.
y = x++; // instance operator++ isn't considered.
```

The reason for this rule is that `y` should be assigned to the value of `x` *before* it's incremented. The compiler can't determine that for a user-defined implementation in a reference type.

For the prefix operator `++`, if `x` is classified as a variable in `++x`, the instance operator is preferred over a static unary operator.

## C# language specification

For more information, see the following sections of the C# language specification:

- Operator overloading
- Operators

## See also

- C# operators and expressions
- User-defined conversion operators
- Design guidelines - Operator overloads
- Design guidelines - Equality operators
