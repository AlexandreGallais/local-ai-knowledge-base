---
title: "Arithmetic operators (part 1 of 15)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/arithmetic-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Arithmetic operators (C# reference)

The following operators perform arithmetic operations with operands of numeric types:

- Unary `++` (increment), `--` (decrement), `+` (plus), and `-` (minus) operators
- Binary `*` (multiplication), `/` (division), `%` (remainder), `+` (addition), and `-` (subtraction) operators

All integral and floating-point numeric types support these operators.

The `int`, `uint`, `long`, and `ulong` types define all these operators. The other integral types (`sbyte`, `byte`, `short`, `ushort`, and `char`) define only the `++` and `--` operators. For the other operators, if you use the integral types `sbyte`, `byte`, `short`, `ushort`, or `char` as operands, the values are converted to the `int` type and the result type is `int`. If the operands are different integral or floating-point types, their values are converted to the closest containing type, if such a type exists. For more information, see the Numeric promotions section of the C# language specification. The `++` and `--` operators are defined for all integral and floating-point numeric types and the char type. The result type of a compound assignment expression is the type of the left-hand operand.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.
