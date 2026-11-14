---
title: "Boolean logical operators - the boolean and, or, not, and xor operators (part 2 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/boolean-logical-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Boolean logical operators - the boolean and, or, not, and xor operators (part 2 of 4)

## Logical exclusive OR operator ^

The `^` operator computes the logical exclusive OR, also known as the logical XOR, of its operands. The result of `x ^ y` is `true` if `x` is `true` and `y` is `false`, or `x` is `false` and `y` is `true`. Otherwise, the result is `false`. For `bool` operands, the `^` operator computes the same result as the inequality operator `!=`.

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
For operands of the integral numeric types, the `^` operator computes the bitwise logical exclusive OR of its operands.

## Logical OR operator |

The `|` operator computes the logical OR of its operands. The result of `x | y` is `true` if either `x` or `y` evaluates to `true`. Otherwise, the result is `false`.

The `|` operator always evaluates both operands. When the left-hand operand evaluates to `true`, the operation result is `true` regardless of the value of the right-hand operand. However, even then, the right-hand operand is evaluated.

In the following example, the right-hand operand of the `|` operator is a method call, which is performed regardless of the value of the left-hand operand:

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
The conditional logical OR operator `||` also computes the logical OR of its operands, but it doesn't evaluate the right-hand operand if the left-hand operand evaluates to `true`.

For operands of the integral numeric types, the `|` operator computes the bitwise logical OR of its operands.

##  Conditional logical AND operator `&&`

The conditional logical AND operator `&&`, also known as the "short-circuiting" logical AND operator, computes the logical AND of its operands. The result of `x && y` is `true` if both `x` and `y` evaluate to `true`. Otherwise, the result is `false`. If `x` evaluates to `false`, `y` isn't evaluated.

In the following example, the right-hand operand of the `&&` operator is a method call, which isn't performed if the left-hand operand evaluates to `false`:

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
The logical AND operator `&` also computes the logical AND of its operands, but it always evaluates both operands.
