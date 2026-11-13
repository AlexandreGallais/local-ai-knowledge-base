---
title: "Boolean logical operators - the boolean and, or, not, and xor operators (part 4 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/boolean-logical-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Boolean logical operators - the boolean and, or, not, and xor operators (part 4 of 4)

## Compound assignment

For a binary operator `op`, a compound assignment expression of the form

```csharp
x op= y
```

Is equivalent to

```csharp
x = x op y
```

Except that `x` is only evaluated once.

The `&`, `|`, and `^` operators support compound assignment, as the following example shows:

```csharp
﻿namespace operators;

public static class BooleanLogicalOperators
{
    public static void Examples()
    {
        Console.WriteLine("==== !, &, |, ^ operators");
        Negation();
        And();
        Or();
        Xor();
        WithNullableBoolean();

        Console.WriteLine("==== && and || operators");
        ConditionalAnd();
        ConditionalOr();

        Console.WriteLine("==== Compound assignment and precedence");
        CompoundAssignment();
        Precedence();
    }

    private static void Negation()
    {
        bool passed = false;
        Console.WriteLine(!passed);  // output: True
        Console.WriteLine(!true);    // output: False
    }

    private static void And()
    {
        bool SecondOperand()
        {
            Console.WriteLine("Second operand is evaluated.");
            return true;
        }

        bool a = false & SecondOperand();
        Console.WriteLine(a);
        // Output:
        // Second operand is evaluated.
        // False

        bool b = true & SecondOperand();
        Console.WriteLine(b);
        // Output:
        // Second operand is evaluated.
        // True
    }

    private static void Or()
    {
        bool SecondOperand()
        {
            Console.WriteLine("Second operand is evaluated.");
            return true;
        }

        bool a = true | SecondOperand();
        Console.WriteLine(a);
        // Output:
        // Second operand is evaluated.
        // True

        bool b = false | SecondOperand();
        Console.WriteLine(b);
        // Output:
        // Second operand is evaluated.
        // True
    }

    private static void Xor()
    {
        Console.WriteLine(true ^ true);    // output: False
        Console.WriteLine(true ^ false);   // output: True
        Console.WriteLine(false ^ true);   // output: True
        Console.WriteLine(false ^ false);  // output: False
    }

    private static void ConditionalAnd()
    {
        bool SecondOperand()
        {
            Console.WriteLine("Second operand is evaluated.");
            return true;
        }

        bool a = false && SecondOperand();
        Console.WriteLine(a);
        // Output:
        // False

        bool b = true && SecondOperand();
        Console.WriteLine(b);
        // Output:
        // Second operand is evaluated.
        // True
    }

    private static void ConditionalOr()
    {
        bool SecondOperand()
        {
            Console.WriteLine("Second operand is evaluated.");
            return true;
        }

        bool a = true || SecondOperand();
        Console.WriteLine(a);
        // Output:
        // True

        bool b = false || SecondOperand();
        Console.WriteLine(b);
        // Output:
        // Second operand is evaluated.
        // True
    }

    private static void WithNullableBoolean()
    {
        bool? test = null;
        Display(!test);         // output: null
        Display(test ^ false);  // output: null
        Display(test ^ null);   // output: null
        Display(true ^ null);   // output: null

        void Display(bool? b) => Console.WriteLine(b is null ? "null" : b.Value.ToString());
    }

    private static void CompoundAssignment()
    {
        bool test = true;
        test &= false;
        Console.WriteLine(test);  // output: False

        test |= true;
        Console.WriteLine(test);  // output: True

        test ^= false;
        Console.WriteLine(test);  // output: True
    }

    private static void Precedence()
    {
        Console.WriteLine(true | true & false);   // output: True
        Console.WriteLine((true | true) & false); // output: False

        bool Operand(string name, bool value)
        {
            Console.WriteLine($"Operand {name} is evaluated.");
            return value;
        }

        var byDefaultPrecedence = Operand("A", true) || Operand("B", true) && Operand("C", false);
        Console.WriteLine(byDefaultPrecedence);
        // Output:
        // Operand A is evaluated.
        // True

        var changedOrder = (Operand("A", true) || Operand("B", true)) && Operand("C", false);
        Console.WriteLine(changedOrder);
        // Output:
        // Operand A is evaluated.
        // Operand C is evaluated.
        // False
    }
}
```
> **Note:**
> The conditional logical operators `&&` and `||` don't support compound assignment.

## Operator precedence

The following list orders logical operators in groups starting from the highest precedence to the lowest:

- (Primary) operators: Logical negation operator `!`.
- (Boolean logical AND) operators: `&`.
- (Boolean logical XOR) operators: Logical exclusive OR operator `^`.
- (Boolean logical OR) operators: `|`.
- (Conditional AND) operators: `&&`.
- (Conditional OR) operators: `||`.

Use parentheses, `()`, to change the order of evaluation imposed by operator precedence:

```csharp
﻿namespace operators;

public static class BooleanLogicalOperators
{
    public static void Examples()
    {
        Console.WriteLine("==== !, &, |, ^ operators");
        Negation();
        And();
        Or();
        Xor();
        WithNullableBoolean();

        Console.WriteLine("==== && and || operators");
        ConditionalAnd();
        ConditionalOr();

        Console.WriteLine("==== Compound assignment and precedence");
        CompoundAssignment();
        Precedence();
    }

    private static void Negation()
    {
        bool passed = false;
        Console.WriteLine(!passed);  // output: True
        Console.WriteLine(!true);    // output: False
    }

    private static void And()
    {
        bool SecondOperand()
        {
            Console.WriteLine("Second operand is evaluated.");
            return true;
        }

        bool a = false & SecondOperand();
        Console.WriteLine(a);
        // Output:
        // Second operand is evaluated.
        // False

        bool b = true & SecondOperand();
        Console.WriteLine(b);
        // Output:
        // Second operand is evaluated.
        // True
    }

    private static void Or()
    {
        bool SecondOperand()
        {
            Console.WriteLine("Second operand is evaluated.");
            return true;
        }

        bool a = true | SecondOperand();
        Console.WriteLine(a);
        // Output:
        // Second operand is evaluated.
        // True

        bool b = false | SecondOperand();
        Console.WriteLine(b);
        // Output:
        // Second operand is evaluated.
        // True
    }

    private static void Xor()
    {
        Console.WriteLine(true ^ true);    // output: False
        Console.WriteLine(true ^ false);   // output: True
        Console.WriteLine(false ^ true);   // output: True
        Console.WriteLine(false ^ false);  // output: False
    }

    private static void ConditionalAnd()
    {
        bool SecondOperand()
        {
            Console.WriteLine("Second operand is evaluated.");
            return true;
        }

        bool a = false && SecondOperand();
        Console.WriteLine(a);
        // Output:
        // False

        bool b = true && SecondOperand();
        Console.WriteLine(b);
        // Output:
        // Second operand is evaluated.
        // True
    }

    private static void ConditionalOr()
    {
        bool SecondOperand()
        {
            Console.WriteLine("Second operand is evaluated.");
            return true;
        }

        bool a = true || SecondOperand();
        Console.WriteLine(a);
        // Output:
        // True

        bool b = false || SecondOperand();
        Console.WriteLine(b);
        // Output:
        // Second operand is evaluated.
        // True
    }

    private static void WithNullableBoolean()
    {
        bool? test = null;
        Display(!test);         // output: null
        Display(test ^ false);  // output: null
        Display(test ^ null);   // output: null
        Display(true ^ null);   // output: null

        void Display(bool? b) => Console.WriteLine(b is null ? "null" : b.Value.ToString());
    }

    private static void CompoundAssignment()
    {
        bool test = true;
        test &= false;
        Console.WriteLine(test);  // output: False

        test |= true;
        Console.WriteLine(test);  // output: True

        test ^= false;
        Console.WriteLine(test);  // output: True
    }

    private static void Precedence()
    {
        Console.WriteLine(true | true & false);   // output: True
        Console.WriteLine((true | true) & false); // output: False

        bool Operand(string name, bool value)
        {
            Console.WriteLine($"Operand {name} is evaluated.");
            return value;
        }

        var byDefaultPrecedence = Operand("A", true) || Operand("B", true) && Operand("C", false);
        Console.WriteLine(byDefaultPrecedence);
        // Output:
        // Operand A is evaluated.
        // True

        var changedOrder = (Operand("A", true) || Operand("B", true)) && Operand("C", false);
        Console.WriteLine(changedOrder);
        // Output:
        // Operand A is evaluated.
        // Operand C is evaluated.
        // False
    }
}
```
For the complete list of C# operators ordered by precedence level, see the Operator precedence section of the C# operators article.

## Operator overloadability

A user-defined type can overload the `!`, `&`, `|`, and `^` operators. When a binary operator is overloaded, the corresponding compound assignment operator is also implicitly overloaded. Beginning with C# 14, a user-defined type can explicitly overload the compound assignment operators to provide a more efficient implementation. Typically, a type overloads these operators because the value can be updated in place, rather than allocating a new instance to hold the result of the binary operation. If a type doesn't provide an explicit overload, the compiler generates the implicit overload.

A user-defined type can't overload the conditional logical operators `&&` and `||`. However, if a user-defined type overloads the true and false operators and the `&` or `|` operator in a certain way, the `&&` or `||` operation, respectively, can be evaluated for the operands of that type. For more information, see the User-defined conditional logical operators section of the C# language specification.

## C# language specification

For more information, see the following sections of the C# language specification:

- Logical negation operator
- Logical operators
- Conditional logical operators
- Compound assignment
- User defined compound assignment

## See also

- C# operators and expressions
- Bitwise and shift operators
