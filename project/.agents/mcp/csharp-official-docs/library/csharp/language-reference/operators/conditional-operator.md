---
title: "?: operator - the ternary conditional operator"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/conditional-operator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ?: operator - the ternary conditional operator

The conditional operator `?:`, also known as the ternary conditional operator, evaluates a Boolean expression and returns the result of one of the two expressions, depending on whether the Boolean expression evaluates to `true` or `false`, as the following example shows:

```csharp
string GetWeatherDisplay(double tempInCelsius) => tempInCelsius < 20.0 ? "Cold." : "Perfect!";

Console.WriteLine(GetWeatherDisplay(15));  // output: Cold.
Console.WriteLine(GetWeatherDisplay(27));  // output: Perfect!
```
As the preceding example shows, the syntax for the conditional operator is as follows:

```csharp
condition ? consequent : alternative
```

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The `condition` expression must evaluate to `true` or `false`. If `condition` evaluates to `true`, the `consequent` expression is evaluated, and its result becomes the result of the operation. If `condition` evaluates to `false`, the `alternative` expression is evaluated, and its result becomes the result of the operation. Only `consequent` or `alternative` is evaluated. Conditional expressions are target-typed. That is, if a target type of a conditional expression is known, the types of `consequent` and `alternative` must be implicitly convertible to the target type, as the following example shows:

```csharp
﻿namespace operators;

public class ConditionalOperator
{
    public static void Examples()
    {
        BasicExample();
        ConditionalRefExpressions();
        ComparisonWithIf();
        TargetTyped();
        NotTargetTyped();
    }

    private static void BasicExample()
    {
        string GetWeatherDisplay(double tempInCelsius) => tempInCelsius < 20.0 ? "Cold." : "Perfect!";
        
        Console.WriteLine(GetWeatherDisplay(15));  // output: Cold.
        Console.WriteLine(GetWeatherDisplay(27));  // output: Perfect!
    }

    private static void ConditionalRefExpressions()
    {
        int[] smallArray = {1, 2, 3, 4, 5};
        int[] largeArray = {10, 20, 30, 40, 50};

        int index = 7;
        ref int refValue = ref ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]);
        refValue = 0;

        index = 2;
        ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]) = 100;

        Console.WriteLine(string.Join(" ", smallArray));
        Console.WriteLine(string.Join(" ", largeArray));
        // Output:
        // 1 2 100 4 5
        // 10 20 0 40 50
    }

    private static void TargetTyped()
    {
        var rand = new Random();
        var condition = rand.NextDouble() > 0.5;

        int? x = condition ? 12 : null;

        IEnumerable<int> xs = x is null ? new List<int>() { 0, 1 } : new int[] { 2, 3 };
    }

    private static void NotTargetTyped()
    {
        var rand = new Random();
        var condition = rand.NextDouble() > 0.5;

        var x = condition ? 12 : (int?)null;
    }

    private static void ComparisonWithIf()
    {
        int input = new Random().Next(-5, 5);

        string classify;
        if (input >= 0)
        {
            classify = "nonnegative";
        }
        else
        {
            classify = "negative";
        }

        classify = (input >= 0) ? "nonnegative" : "negative";
    }
}
```
If a target type of a conditional expression is unknown (for example, when you use the `var` keyword) or the type of `consequent` and `alternative` must be the same or there must be an implicit conversion from one type to the other:

```csharp
﻿namespace operators;

public class ConditionalOperator
{
    public static void Examples()
    {
        BasicExample();
        ConditionalRefExpressions();
        ComparisonWithIf();
        TargetTyped();
        NotTargetTyped();
    }

    private static void BasicExample()
    {
        string GetWeatherDisplay(double tempInCelsius) => tempInCelsius < 20.0 ? "Cold." : "Perfect!";
        
        Console.WriteLine(GetWeatherDisplay(15));  // output: Cold.
        Console.WriteLine(GetWeatherDisplay(27));  // output: Perfect!
    }

    private static void ConditionalRefExpressions()
    {
        int[] smallArray = {1, 2, 3, 4, 5};
        int[] largeArray = {10, 20, 30, 40, 50};

        int index = 7;
        ref int refValue = ref ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]);
        refValue = 0;

        index = 2;
        ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]) = 100;

        Console.WriteLine(string.Join(" ", smallArray));
        Console.WriteLine(string.Join(" ", largeArray));
        // Output:
        // 1 2 100 4 5
        // 10 20 0 40 50
    }

    private static void TargetTyped()
    {
        var rand = new Random();
        var condition = rand.NextDouble() > 0.5;

        int? x = condition ? 12 : null;

        IEnumerable<int> xs = x is null ? new List<int>() { 0, 1 } : new int[] { 2, 3 };
    }

    private static void NotTargetTyped()
    {
        var rand = new Random();
        var condition = rand.NextDouble() > 0.5;

        var x = condition ? 12 : (int?)null;
    }

    private static void ComparisonWithIf()
    {
        int input = new Random().Next(-5, 5);

        string classify;
        if (input >= 0)
        {
            classify = "nonnegative";
        }
        else
        {
            classify = "negative";
        }

        classify = (input >= 0) ? "nonnegative" : "negative";
    }
}
```
The conditional operator is right-associative, that is, an expression of the form

```csharp
a ? b : c ? d : e
```

is evaluated as

```csharp
a ? b : (c ? d : e)
```

> **Tip:**
> You can use the following mnemonic device to remember how the conditional operator is evaluated:
>
> ```text
> is this condition true ? yes : no
> ```

## Conditional ref expression

A conditional ref expression conditionally returns a variable reference, as the following example shows:

```csharp
﻿namespace operators;

public class ConditionalOperator
{
    public static void Examples()
    {
        BasicExample();
        ConditionalRefExpressions();
        ComparisonWithIf();
        TargetTyped();
        NotTargetTyped();
    }

    private static void BasicExample()
    {
        string GetWeatherDisplay(double tempInCelsius) => tempInCelsius < 20.0 ? "Cold." : "Perfect!";
        
        Console.WriteLine(GetWeatherDisplay(15));  // output: Cold.
        Console.WriteLine(GetWeatherDisplay(27));  // output: Perfect!
    }

    private static void ConditionalRefExpressions()
    {
        int[] smallArray = {1, 2, 3, 4, 5};
        int[] largeArray = {10, 20, 30, 40, 50};

        int index = 7;
        ref int refValue = ref ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]);
        refValue = 0;

        index = 2;
        ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]) = 100;

        Console.WriteLine(string.Join(" ", smallArray));
        Console.WriteLine(string.Join(" ", largeArray));
        // Output:
        // 1 2 100 4 5
        // 10 20 0 40 50
    }

    private static void TargetTyped()
    {
        var rand = new Random();
        var condition = rand.NextDouble() > 0.5;

        int? x = condition ? 12 : null;

        IEnumerable<int> xs = x is null ? new List<int>() { 0, 1 } : new int[] { 2, 3 };
    }

    private static void NotTargetTyped()
    {
        var rand = new Random();
        var condition = rand.NextDouble() > 0.5;

        var x = condition ? 12 : (int?)null;
    }

    private static void ComparisonWithIf()
    {
        int input = new Random().Next(-5, 5);

        string classify;
        if (input >= 0)
        {
            classify = "nonnegative";
        }
        else
        {
            classify = "negative";
        }

        classify = (input >= 0) ? "nonnegative" : "negative";
    }
}
```
You can `ref` assign the result of a conditional ref expression. Use it as a reference return or pass it as a `ref`, `out`, `in`, or `ref readonly` method parameter. You can also assign to the result of a conditional ref expression, as the preceding example shows.

The syntax for a conditional ref expression is as follows:

```csharp
condition ? ref consequent : ref alternative
```

Like the conditional operator, a conditional ref expression evaluates only one of the two expressions: either `consequent` or `alternative`.

In a conditional ref expression, the type of `consequent` and `alternative` must be the same. Conditional ref expressions aren't target-typed.

## Conditional operator and an `if` statement

Using the conditional operator instead of an `if` statement can result in more concise code when you need to conditionally compute a value. The following example demonstrates two ways to classify an integer as negative or nonnegative:

```csharp
﻿namespace operators;

public class ConditionalOperator
{
    public static void Examples()
    {
        BasicExample();
        ConditionalRefExpressions();
        ComparisonWithIf();
        TargetTyped();
        NotTargetTyped();
    }

    private static void BasicExample()
    {
        string GetWeatherDisplay(double tempInCelsius) => tempInCelsius < 20.0 ? "Cold." : "Perfect!";
        
        Console.WriteLine(GetWeatherDisplay(15));  // output: Cold.
        Console.WriteLine(GetWeatherDisplay(27));  // output: Perfect!
    }

    private static void ConditionalRefExpressions()
    {
        int[] smallArray = {1, 2, 3, 4, 5};
        int[] largeArray = {10, 20, 30, 40, 50};

        int index = 7;
        ref int refValue = ref ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]);
        refValue = 0;

        index = 2;
        ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]) = 100;

        Console.WriteLine(string.Join(" ", smallArray));
        Console.WriteLine(string.Join(" ", largeArray));
        // Output:
        // 1 2 100 4 5
        // 10 20 0 40 50
    }

    private static void TargetTyped()
    {
        var rand = new Random();
        var condition = rand.NextDouble() > 0.5;

        int? x = condition ? 12 : null;

        IEnumerable<int> xs = x is null ? new List<int>() { 0, 1 } : new int[] { 2, 3 };
    }

    private static void NotTargetTyped()
    {
        var rand = new Random();
        var condition = rand.NextDouble() > 0.5;

        var x = condition ? 12 : (int?)null;
    }

    private static void ComparisonWithIf()
    {
        int input = new Random().Next(-5, 5);

        string classify;
        if (input >= 0)
        {
            classify = "nonnegative";
        }
        else
        {
            classify = "negative";
        }

        classify = (input >= 0) ? "nonnegative" : "negative";
    }
}
```
## Operator overloadability

A user-defined type can't overload the conditional operator.

## C# language specification

For more information, see the Conditional operator section of the C# language specification.

Specifications for newer features are:

- Target-typed conditional expression

## See also

- Simplify conditional expression (style rule IDE0075)
- C# operators and expressions
- if statement
- ?. and ?[] operators
- ?? and ??= operators
- ref keyword
