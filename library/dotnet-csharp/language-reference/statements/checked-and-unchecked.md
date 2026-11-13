---
title: "The checked and unchecked statements - overflow-checking"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/statements/checked-and-unchecked.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The checked and unchecked statements (C# reference)

The `checked` and `unchecked` statements specify the overflow-checking context for integral-type arithmetic operations and conversions. The default statement is `unchecked`. When integer arithmetic overflow occurs, the overflow-checking context defines what happens. In a checked context, a `System.OverflowException` is thrown. If overflow happens in a constant expression, a compile-time error occurs. In an unchecked context, the operation result is truncated by discarding any high-order bits that don't fit in the destination type. For example, addition wraps from the maximum value to the minimum value. The following example shows the same operation in both a checked and unchecked context:

```csharp
uint a = uint.MaxValue;

unchecked
{
    Console.WriteLine(a + 3);  // output: 2
}

try
{
    checked
    {
        Console.WriteLine(a + 3);
    }
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);  // output: Arithmetic operation resulted in an overflow.
}
```
> **Note:**
> The overflow behavior of *user-defined* operators and conversions can differ from the behavior described in the preceding paragraph. In particular, user-defined checked operators might not throw an exception in a checked context.

For more information, see the Arithmetic overflow and division by zero and User-defined checked operators sections of the Arithmetic operators article.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

To specify the overflow-checking context for an expression, you can also use the `checked` and `unchecked` operators, as the following example shows:

```csharp
double a = double.MaxValue;

int b = unchecked((int)a);
Console.WriteLine(b);  // output: -2147483648

try
{
    b = checked((int)a);
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);  // output: Arithmetic operation resulted in an overflow.
}
```
The `checked` and `unchecked` statements and operators only affect the overflow-checking context for those operations that are *textually* inside the statement block or operator's parentheses, as the following example shows:

```csharp
int Multiply(int a, int b) => a * b;

int factor = 2;

try
{
    checked
    {
        Console.WriteLine(Multiply(factor, int.MaxValue));  // output: -2
    }
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);
}

try
{
    checked
    {
        Console.WriteLine(Multiply(factor, factor * int.MaxValue));
    }
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);  // output: Arithmetic operation resulted in an overflow.
}
```
In the preceding example, the first invocation of the `Multiply` local function shows that the `checked` statement doesn't affect the overflow-checking context within the `Multiply` function as no exception is thrown. At the second invocation of the `Multiply` function, the expression that calculates the second argument of the function is evaluated in a checked context and results in an exception as it's textually inside the block of the `checked` statement.

The behavior of `checked` and `unchecked` depends on the type and the operation. Even for integers, operations like `unchecked(x / 0)` always throw because there's no sensible behavior. Check the behavior for the type and the operation to understand how the `checked` and `unchecked` keywords affect your code.

## Numeric types and overflow-checking context

The `checked` and `unchecked` keywords primarily apply to integral types where there's a sensible overflow behavior. The wraparound behavior where `T.MaxValue + 1` becomes `T.MinValue` is sensible in a two's complement value. The represented value isn't *correct* since it can't fit in the storage for the type. Therefore, the bits are representative of the lower n-bits of the full result.

For types like `decimal`, `float`, `double`, and `Half` that represent a more complex value or a one's complement value, wraparound isn't sensible. It can't be used to compute larger or more accurate results, so `unchecked` isn't beneficial.

`float`, `double`, and `Half` have sensible saturating values for `PositiveInfinity` and `NegativeInfinity`, so you can detect overflow in an `unchecked` context. For `decimal`, no such limits exist, and saturating at `MaxValue` can lead to errors or confusion. Operations that use `decimal` throw in both a `checked` and `unchecked` context.

## Operations affected by the overflow-checking context

The overflow-checking context affects the following operations:

- The following built-in arithmetic operators: unary `++`, `--`, `-` and binary `+`, `-`, `*`, and `/` operators, when their operands are of an integral type (that is, either integral numeric or char type) or an enum type.
- Explicit numeric conversions between integral types or from `float` or `double` to an integral type.

  > **Note:**
  > When you convert a `decimal` value to an integral type and the result is outside the range of the destination type, an `System.OverflowException` is always thrown, regardless of the overflow-checking context.

- You can use user-defined checked operators and conversions. For more information, see the User-defined checked operators section of the Arithmetic operators article.

## Default overflow-checking context

If you don't specify the overflow-checking context, the value of the **CheckForOverflowUnderflow** compiler option defines the default context for nonconstant expressions. By default the value of that option is unset and integral-type arithmetic operations and conversions are executed in an **unchecked** context.

Constant expressions are evaluated by default in a checked context and overflow causes a compile-time error. You can explicitly specify an unchecked context for a constant expression by using the `unchecked` statement or operator.

## C# language specification

For more information, see the following sections of the C# language specification:

- The checked and unchecked statements
- The checked and unchecked operators
- Operators

## See also

- **CheckForOverflowUnderflow** compiler option
