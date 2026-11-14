---
title: "Addition operators - + and +="
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/addition-operator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Addition operators - `+` and `+=`

The built-in integral and floating-point numeric types, the string type, and delegate types all support the `+` and `+=` operators.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

For information about the arithmetic `+` operator, see the Unary plus and minus operators and Addition operator + sections of the Arithmetic operators article.

## String concatenation

When one or both operands are of type string, the `+` operator concatenates the string representations of its operands (the string representation of `null` is an empty string):

```csharp
﻿namespace operators;

public static class AdditionOperator
{
    public static void Examples()
    {
        NumericAddition();
        StringConcatenation();
        AddDelegates();
        AddAndAssign();
    }

    private static void NumericAddition()
    {
        Console.WriteLine(5 + 4);       // output: 9
        Console.WriteLine(5 + 4.3);     // output: 9.3
        Console.WriteLine(5.1m + 4.2m); // output: 9.3
    }

    private static void StringConcatenation()
    {
        Console.WriteLine("Forgot" + "white space");
        Console.WriteLine("Probably the oldest constant: " + Math.PI);
        Console.WriteLine(null + "Nothing to add.");
        // Output:
        // Forgotwhite space
        // Probably the oldest constant: 3.14159265358979
        // Nothing to add.

        Console.WriteLine($"Probably the oldest constant: {Math.PI:F2}");
        // Output:
        // Probably the oldest constant: 3.14
    }

    private static void AddDelegates()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");
        Action ab = a + b;
        ab();  // output: ab
        Console.WriteLine();
    }

    private static void AddAndAssign()
    {
        int i = 5;
        i += 9;
        Console.WriteLine(i);
        // Output: 14

        string story = "Start. ";
        story += "End.";
        Console.WriteLine(story);
        // Output: Start. End.

        Action printer = () => Console.Write("a");
        printer();  // output: a

        Console.WriteLine();
        printer += () => Console.Write("b");
        printer();  // output: ab
        Console.WriteLine();
    }
}
```
String interpolation provides a more convenient way to format strings:

```csharp
﻿namespace operators;

public static class AdditionOperator
{
    public static void Examples()
    {
        NumericAddition();
        StringConcatenation();
        AddDelegates();
        AddAndAssign();
    }

    private static void NumericAddition()
    {
        Console.WriteLine(5 + 4);       // output: 9
        Console.WriteLine(5 + 4.3);     // output: 9.3
        Console.WriteLine(5.1m + 4.2m); // output: 9.3
    }

    private static void StringConcatenation()
    {
        Console.WriteLine("Forgot" + "white space");
        Console.WriteLine("Probably the oldest constant: " + Math.PI);
        Console.WriteLine(null + "Nothing to add.");
        // Output:
        // Forgotwhite space
        // Probably the oldest constant: 3.14159265358979
        // Nothing to add.

        Console.WriteLine($"Probably the oldest constant: {Math.PI:F2}");
        // Output:
        // Probably the oldest constant: 3.14
    }

    private static void AddDelegates()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");
        Action ab = a + b;
        ab();  // output: ab
        Console.WriteLine();
    }

    private static void AddAndAssign()
    {
        int i = 5;
        i += 9;
        Console.WriteLine(i);
        // Output: 14

        string story = "Start. ";
        story += "End.";
        Console.WriteLine(story);
        // Output: Start. End.

        Action printer = () => Console.Write("a");
        printer();  // output: a

        Console.WriteLine();
        printer += () => Console.Write("b");
        printer();  // output: ab
        Console.WriteLine();
    }
}
```
You can use string interpolation to initialize a constant string when all the expressions used for placeholders are also constant strings.

The `+` operator performs string concatenation for UTF-8 literal strings. This operator concatenates two `ReadOnlySpan<byte>` objects.

## Delegate combination

For operands of the same delegate type, the `+` operator returns a new delegate instance that, when invoked, calls the left-hand operand and then calls the right-hand operand. If any of the operands is `null`, the `+` operator returns the value of the other operand (which also might be `null`). The following example shows how delegates can be combined using the `+` operator:

```csharp
﻿namespace operators;

public static class AdditionOperator
{
    public static void Examples()
    {
        NumericAddition();
        StringConcatenation();
        AddDelegates();
        AddAndAssign();
    }

    private static void NumericAddition()
    {
        Console.WriteLine(5 + 4);       // output: 9
        Console.WriteLine(5 + 4.3);     // output: 9.3
        Console.WriteLine(5.1m + 4.2m); // output: 9.3
    }

    private static void StringConcatenation()
    {
        Console.WriteLine("Forgot" + "white space");
        Console.WriteLine("Probably the oldest constant: " + Math.PI);
        Console.WriteLine(null + "Nothing to add.");
        // Output:
        // Forgotwhite space
        // Probably the oldest constant: 3.14159265358979
        // Nothing to add.

        Console.WriteLine($"Probably the oldest constant: {Math.PI:F2}");
        // Output:
        // Probably the oldest constant: 3.14
    }

    private static void AddDelegates()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");
        Action ab = a + b;
        ab();  // output: ab
        Console.WriteLine();
    }

    private static void AddAndAssign()
    {
        int i = 5;
        i += 9;
        Console.WriteLine(i);
        // Output: 14

        string story = "Start. ";
        story += "End.";
        Console.WriteLine(story);
        // Output: Start. End.

        Action printer = () => Console.Write("a");
        printer();  // output: a

        Console.WriteLine();
        printer += () => Console.Write("b");
        printer();  // output: ab
        Console.WriteLine();
    }
}
```
To remove a delegate, use the `-` operator.

For more information about delegate types, see Delegates.

## Addition assignment operator +=

An expression that uses the `+=` operator, such as

```csharp
x += y
```

Is equivalent to:

```csharp
x = x + y
```

Except that `x` is only evaluated once.

The following example demonstrates the usage of the `+=` operator:

```csharp
﻿namespace operators;

public static class AdditionOperator
{
    public static void Examples()
    {
        NumericAddition();
        StringConcatenation();
        AddDelegates();
        AddAndAssign();
    }

    private static void NumericAddition()
    {
        Console.WriteLine(5 + 4);       // output: 9
        Console.WriteLine(5 + 4.3);     // output: 9.3
        Console.WriteLine(5.1m + 4.2m); // output: 9.3
    }

    private static void StringConcatenation()
    {
        Console.WriteLine("Forgot" + "white space");
        Console.WriteLine("Probably the oldest constant: " + Math.PI);
        Console.WriteLine(null + "Nothing to add.");
        // Output:
        // Forgotwhite space
        // Probably the oldest constant: 3.14159265358979
        // Nothing to add.

        Console.WriteLine($"Probably the oldest constant: {Math.PI:F2}");
        // Output:
        // Probably the oldest constant: 3.14
    }

    private static void AddDelegates()
    {
        Action a = () => Console.Write("a");
        Action b = () => Console.Write("b");
        Action ab = a + b;
        ab();  // output: ab
        Console.WriteLine();
    }

    private static void AddAndAssign()
    {
        int i = 5;
        i += 9;
        Console.WriteLine(i);
        // Output: 14

        string story = "Start. ";
        story += "End.";
        Console.WriteLine(story);
        // Output: Start. End.

        Action printer = () => Console.Write("a");
        printer();  // output: a

        Console.WriteLine();
        printer += () => Console.Write("b");
        printer();  // output: ab
        Console.WriteLine();
    }
}
```
You also use the `+=` operator to specify an event handler method when you subscribe to an event. For more information, see How to: subscribe to and unsubscribe from events.

## Operator overloadability

A user-defined type can overload the `+` operator. When you overload a binary `+` operator, you also implicitly overload the `+=` operator. Starting with C# 14, a user-defined type can explicitly overload the `+=` operator to provide a more efficient implementation. Typically, a type overloads the `+=` operator because the value can be updated in place, rather than allocate a new instance to hold the result of the addition. If a type doesn't provide an explicit overload, the compiler generates the implicit overload.

## C# language specification

For more information, see the Unary plus operator and Addition operator sections of the C# language specification. For more information on overloading the compound assignment operators in C# 14 and later, see the user defined compound assignment feature specification.

## See also

- C# operators and expressions
- How to concatenate multiple strings
- Events
- Arithmetic operators
- - and -= operators
