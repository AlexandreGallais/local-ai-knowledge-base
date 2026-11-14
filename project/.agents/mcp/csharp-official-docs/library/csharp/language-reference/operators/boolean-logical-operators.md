---
title: "Boolean logical operators - the boolean and, or, not, and xor operators (part 1 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/boolean-logical-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Boolean logical operators - AND, OR, NOT, XOR

The logical Boolean operators perform logical operations with bool operands. The operators include the unary logical negation (`!`), binary logical AND (`&`), OR (`|`), and exclusive OR (`^`), and the binary conditional logical AND (`&&`) and OR (`||`).

- Unary `!` (logical negation) operator.
- Binary `&` (logical AND), `|` (logical OR), and `^` (logical exclusive OR) operators. Those operators always evaluate both operands.
- Binary `&&` (conditional logical AND) and `||` (conditional logical OR) operators. Those operators evaluate the right-hand operand only if it's necessary.

For operands of the integral numeric types, the `&`, `|`, and `^` operators perform bitwise logical operations. For more information, see Bitwise and shift operators.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Logical negation operator !

The unary prefix `!` operator computes the logical negation of its operand. It produces `true` if the operand evaluates to `false`, and `false` if the operand evaluates to `true`:

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
The unary postfix `!` operator is the null-forgiving operator.

##  Logical AND operator &

The `&` operator computes the logical AND of its operands. The result of `x & y` is `true` if both `x` and `y` are `true`. Otherwise, the result is `false`.

The `&` operator always evaluates both operands. When the left-hand operand is `false`, the operation result is `false` regardless of the value of the right-hand operand. However, the right-hand operand is still evaluated.

In the following example, the right-hand operand of the `&` operator is a method call, which runs regardless of the value of the left-hand operand:

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
The conditional logical AND operator `&&` also computes the logical AND of its operands, but it doesn't evaluate the right-hand operand if the left-hand operand is `false`.

For operands of the integral numeric types, the `&` operator computes the bitwise logical AND of its operands. The unary `&` operator is the address-of operator.
