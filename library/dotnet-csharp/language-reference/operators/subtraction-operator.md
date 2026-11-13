---
title: "- and -= operators - subtraction (minus) operators"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/subtraction-operator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# - and -= operators - subtraction (minus)

The built-in delegate types and integral and floating-point numeric types all support the `-` and `-=` operators.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

For information about the arithmetic `-` operator, see the Unary plus and minus operators and Subtraction operator - sections of the Arithmetic operators article.

## Delegate removal

For operands of the same delegate type, the `-` operator returns a delegate instance that's calculated as follows:

- If both operands are not `null` and the invocation list of the right-hand operand is a proper contiguous sublist of the invocation list of the left-hand operand, the result of the operation is a new invocation list that you get by removing the right-hand operand's entries from the invocation list of the left-hand operand. If the right-hand operand's list matches multiple contiguous sublists in the left-hand operand's list, the operation removes only the right-most matching sublist. If removal results in an empty list, the result is `null`.

```csharp
﻿namespace operators;

public static class SubtractionOperator
{
    public static void Examples()
    {
        DelegateRemoval();
        DelegateRemovalNoChange();
        DelegateRemovalAndNull();
        SubtractAndAssign();
    }

    private static void DelegateRemoval()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");

        var abbaab = a + b + b + a + a + b;
        abbaab();  // output: abbaab
        Console.WriteLine();

        var ab = a + b;
        var abba = abbaab - ab;
        abba();  // output: abba
        Console.WriteLine();

        var nihil = abbaab - abbaab;
        Console.WriteLine(nihil is null);  // output: True
    }

    private static void DelegateRemovalNoChange()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");

        var abbaab = a + b + b + a + a + b;
        var aba = a + b + a;

        var first = abbaab - aba;
        first();  // output: abbaab
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(abbaab, first));  // output: True

        Action a2 = () => Console.Write("a");
        var changed = aba - a;
        changed();  // output: ab
        Console.WriteLine();
        var unchanged = aba - a2;
        unchanged();  // output: aba
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(aba, unchanged));  // output: True
    }

    private static void DelegateRemovalAndNull()
    {
        Action a = () => Console.Write("a");

        var nothing = null - a;
        Console.WriteLine(nothing is null);  // output: True

        var first = a - null;
        a();  // output: a
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(first, a));  // output: True
    }

    private static void SubtractAndAssign()
    {
        int i = 5;
        i -= 9;
        Console.WriteLine(i);
        // Output: -4

        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");
        var printer = a + b + a;
        printer();  // output: aba

        Console.WriteLine();
        printer -= a;
        printer();  // output: ab
        Console.WriteLine();
    }
}
```
- If the invocation list of the right-hand operand isn't a proper contiguous sublist of the invocation list of the left-hand operand, the result of the operation is the left-hand operand. For example, removing a delegate that isn't part of the multicast delegate does nothing and results in the unchanged multicast delegate.

```csharp
﻿namespace operators;

public static class SubtractionOperator
{
    public static void Examples()
    {
        DelegateRemoval();
        DelegateRemovalNoChange();
        DelegateRemovalAndNull();
        SubtractAndAssign();
    }

    private static void DelegateRemoval()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");

        var abbaab = a + b + b + a + a + b;
        abbaab();  // output: abbaab
        Console.WriteLine();

        var ab = a + b;
        var abba = abbaab - ab;
        abba();  // output: abba
        Console.WriteLine();

        var nihil = abbaab - abbaab;
        Console.WriteLine(nihil is null);  // output: True
    }

    private static void DelegateRemovalNoChange()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");

        var abbaab = a + b + b + a + a + b;
        var aba = a + b + a;

        var first = abbaab - aba;
        first();  // output: abbaab
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(abbaab, first));  // output: True

        Action a2 = () => Console.Write("a");
        var changed = aba - a;
        changed();  // output: ab
        Console.WriteLine();
        var unchanged = aba - a2;
        unchanged();  // output: aba
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(aba, unchanged));  // output: True
    }

    private static void DelegateRemovalAndNull()
    {
        Action a = () => Console.Write("a");

        var nothing = null - a;
        Console.WriteLine(nothing is null);  // output: True

        var first = a - null;
        a();  // output: a
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(first, a));  // output: True
    }

    private static void SubtractAndAssign()
    {
        int i = 5;
        i -= 9;
        Console.WriteLine(i);
        // Output: -4

        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");
        var printer = a + b + a;
        printer();  // output: aba

        Console.WriteLine();
        printer -= a;
        printer();  // output: ab
        Console.WriteLine();
    }
}
```
  The preceding example also demonstrates that during delegate removal delegate instances are compared. For example, delegates that are produced from evaluation of identical lambda expressions aren't equal. For more information about delegate equality, see the Delegate equality operators section of the C# language specification.

- If the left-hand operand is `null`, the result of the operation is `null`. If the right-hand operand is `null`, the result of the operation is the left-hand operand.

```csharp
﻿namespace operators;

public static class SubtractionOperator
{
    public static void Examples()
    {
        DelegateRemoval();
        DelegateRemovalNoChange();
        DelegateRemovalAndNull();
        SubtractAndAssign();
    }

    private static void DelegateRemoval()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");

        var abbaab = a + b + b + a + a + b;
        abbaab();  // output: abbaab
        Console.WriteLine();

        var ab = a + b;
        var abba = abbaab - ab;
        abba();  // output: abba
        Console.WriteLine();

        var nihil = abbaab - abbaab;
        Console.WriteLine(nihil is null);  // output: True
    }

    private static void DelegateRemovalNoChange()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");

        var abbaab = a + b + b + a + a + b;
        var aba = a + b + a;

        var first = abbaab - aba;
        first();  // output: abbaab
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(abbaab, first));  // output: True

        Action a2 = () => Console.Write("a");
        var changed = aba - a;
        changed();  // output: ab
        Console.WriteLine();
        var unchanged = aba - a2;
        unchanged();  // output: aba
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(aba, unchanged));  // output: True
    }

    private static void DelegateRemovalAndNull()
    {
        Action a = () => Console.Write("a");

        var nothing = null - a;
        Console.WriteLine(nothing is null);  // output: True

        var first = a - null;
        a();  // output: a
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(first, a));  // output: True
    }

    private static void SubtractAndAssign()
    {
        int i = 5;
        i -= 9;
        Console.WriteLine(i);
        // Output: -4

        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");
        var printer = a + b + a;
        printer();  // output: aba

        Console.WriteLine();
        printer -= a;
        printer();  // output: ab
        Console.WriteLine();
    }
}
```
To combine delegates, use the `+` operator.

For more information about delegate types, see Delegates.

## Subtraction assignment operator `-=`

An expression that uses the `-=` operator, such as

```csharp
x -= y
```

Is equivalent to

```csharp
x = x - y
```

Except that `x` is only evaluated once.

The following example demonstrates how to use the `-=` operator:

```csharp
﻿namespace operators;

public static class SubtractionOperator
{
    public static void Examples()
    {
        DelegateRemoval();
        DelegateRemovalNoChange();
        DelegateRemovalAndNull();
        SubtractAndAssign();
    }

    private static void DelegateRemoval()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");

        var abbaab = a + b + b + a + a + b;
        abbaab();  // output: abbaab
        Console.WriteLine();

        var ab = a + b;
        var abba = abbaab - ab;
        abba();  // output: abba
        Console.WriteLine();

        var nihil = abbaab - abbaab;
        Console.WriteLine(nihil is null);  // output: True
    }

    private static void DelegateRemovalNoChange()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");

        var abbaab = a + b + b + a + a + b;
        var aba = a + b + a;

        var first = abbaab - aba;
        first();  // output: abbaab
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(abbaab, first));  // output: True

        Action a2 = () => Console.Write("a");
        var changed = aba - a;
        changed();  // output: ab
        Console.WriteLine();
        var unchanged = aba - a2;
        unchanged();  // output: aba
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(aba, unchanged));  // output: True
    }

    private static void DelegateRemovalAndNull()
    {
        Action a = () => Console.Write("a");

        var nothing = null - a;
        Console.WriteLine(nothing is null);  // output: True

        var first = a - null;
        a();  // output: a
        Console.WriteLine();
        Console.WriteLine(object.ReferenceEquals(first, a));  // output: True
    }

    private static void SubtractAndAssign()
    {
        int i = 5;
        i -= 9;
        Console.WriteLine(i);
        // Output: -4

        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");
        var printer = a + b + a;
        printer();  // output: aba

        Console.WriteLine();
        printer -= a;
        printer();  // output: ab
        Console.WriteLine();
    }
}
```
You also use the `-=` operator to specify an event handler method to remove when you unsubscribe from an event. For more information, see How to subscribe to and unsubscribe from events.

## Operator overloadability

A user-defined type can overload the `-` operator. When you overload a binary `-` operator, you also implicitly overload the `-=` operator. Starting with C# 14, a user-defined type can explicitly overload the `-=` operator to provide a more efficient implementation. Typically, a type overloads the `-=` operator because the value can be updated in place, rather than allocating a new instance to store the result of the subtraction. If a type doesn't provide an explicit overload, the compiler generates the implicit overload.

## C# language specification

For more information, see the Unary minus operator and Subtraction operator sections of the C# language specification. For more information on overloading the compound assignment operators in C# 14 and later, see the user defined compound assignment feature specification.

## See also

- C# operators and expressions
- Events
- Arithmetic operators
- + and += operators
