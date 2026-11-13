---
title: "Bitwise and shift operators - perform boolean (AND, NOT, OR, XOR) and shift operations on individual bits in integral types (part 8 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/bitwise-and-shift-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Bitwise and shift operators - perform boolean (AND, NOT, OR, XOR) and shift operations on individual bits in integral types (part 8 of 8)

## Operator overloadability

A user-defined type can overload the `~`, `<<`, `>>`, `>>>`, `&`, `|`, and `^` operators. When you overload a binary operator, you also implicitly overload the corresponding compound assignment operator. Beginning with C# 14, a user-defined type can explicitly overload the compound assignment operators to provide a more efficient implementation. Typically, a type overloads these operators because the value can be updated in place, rather than allocating a new instance to store the result of the binary operation. If a type doesn't provide an explicit overload, the compiler generates the implicit overload.

If a user-defined type `T` overloads the `<<`, `>>`, or `>>>` operator, the type of the left-hand operand must be `T`. In C# 10 and earlier, the type of the right-hand operand must be `int`; the type of the right-hand operand of an overloaded shift operator can be any.

## C# language specification

For more information, see the following sections of the C# language specification:

- Bitwise complement operator
- Shift operators
- Logical operators
- Compound assignment
- Numeric promotions
- User defined compound assignment

## See also

- C# operators and expressions
- Boolean logical operators
