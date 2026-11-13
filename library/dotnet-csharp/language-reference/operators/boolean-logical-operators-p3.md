---
title: "Boolean logical operators - the boolean and, or, not, and xor operators (part 3 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/boolean-logical-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Boolean logical operators - the boolean and, or, not, and xor operators (part 3 of 4)

## Conditional logical OR operator `||`

The conditional logical OR operator `||`, also known as the "short-circuiting" logical OR operator, computes the logical OR of its operands. The result of `x || y` is `true` if either `x` or `y` evaluates to `true`. Otherwise, the result is `false`. If `x` evaluates to `true`, `y` isn't evaluated.

In the following example, the right-hand operand of the `||` operator is a method call, which isn't performed if the left-hand operand evaluates to `true`:

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
The logical OR operator `|` also computes the logical OR of its operands, but always evaluates both operands.

## Nullable Boolean logical operators

For `bool?` operands, the `&` (logical AND) and `|` (logical OR) operators support three-valued logic as follows:

- The `&` operator returns `true` only if both its operands evaluate to `true`. If either `x` or `y` evaluates to `false`, `x & y` returns `false` (even if another operand evaluates to `null`). Otherwise, the result of `x & y` is `null`.

- The `|` operator produces `false` only if both its operands evaluate to `false`. If either `x` or `y` evaluates to `true`, `x | y` produces `true` (even if another operand evaluates to `null`). Otherwise, the result of `x | y` is `null`.

The following table presents that semantics:

| x     | y     | x & y | x \| y   |
|-------|-------|-------|----------|
| true  | true  | true  | true     |
| true  | false | false | true     |
| true  | null  | null  | true     |
| false | true  | false | true     |
| false | false | false | false    |
| false | null  | false | null     |
| null  | true  | null  | true     |
| null  | false | false | null     |
| null  | null  | null  | null     |

The behavior of those operators differs from the typical operator behavior with nullable value types. Typically, an operator that is defined for operands of a value type can also be used with operands of the corresponding nullable value type. Such an operator produces `null` if any of its operands evaluates to `null`. However, the `&` and `|` operators can produce non-null even if one of the operands evaluates to `null`. For more information about the operator behavior with nullable value types, see the Lifted operators section of the Nullable value types article.

You can also use the `!` and `^` operators with `bool?` operands, as the following example shows:

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
The conditional logical operators `&&` and `||` don't support `bool?` operands.
