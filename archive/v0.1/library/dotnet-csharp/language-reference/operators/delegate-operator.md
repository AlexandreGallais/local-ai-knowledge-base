---
title: "delegate operator - Create an anonymous method that can be converted to a delegate type."
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/delegate-operator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# delegate operator

The `delegate` operator creates an anonymous method that you can convert to a delegate type.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

You can convert an anonymous method to types such as `System.Action` and `System.Func`1`. Many methods use these types as arguments.

```csharp
﻿namespace operators;

public static class DelegateOperator
{
    public static void Examples()
    {
        AnonymousMethod();
        Lambda();
        WithoutParameterList();
        Discards();
        Static();
    }

    private static void AnonymousMethod()
    {
        Func<int, int, int> sum = delegate (int a, int b) { return a + b; };
        Console.WriteLine(sum(3, 4));  // output: 7
    }

    private static void Lambda()
    {
        Func<int, int, int> sum = (a, b) => a + b;
        Console.WriteLine(sum(3, 4));  // output: 7
    }

    private static void WithoutParameterList()
    {
        Action greet = delegate { Console.WriteLine("Hello!"); };
        greet();

        Action<int, double> introduce = delegate { Console.WriteLine("This is world!"); };
        introduce(42, 2.7);

        // Output:
        // Hello!
        // This is world!
    }

    private static void Discards()
    {
        Func<int, int, int> constant = delegate (int _, int _) { return 42; };
        Console.WriteLine(constant(3, 4));  // output: 42
    }

    private static void Static()
    {
        Func<int, int, int> sum = static delegate (int a, int b) { return a + b; };
        Console.WriteLine(sum(10, 4));  // output: 14
    }
}
```
> **Note:**
> Lambda expressions provide a more concise and expressive way to create an anonymous function. Use the => operator to construct a lambda expression:
>
> :::code language="csharp" source="snippets/shared/DelegateOperator.cs" id="Lambda":::
>
> For more information about features of lambda expressions, such as capturing outer variables, see Lambda expressions.

When you use the `delegate` operator, you can omit the parameter list. If you omit the parameter list, you create an anonymous method that you can convert to a delegate type with any list of parameters, as the following example shows:

```csharp
﻿namespace operators;

public static class DelegateOperator
{
    public static void Examples()
    {
        AnonymousMethod();
        Lambda();
        WithoutParameterList();
        Discards();
        Static();
    }

    private static void AnonymousMethod()
    {
        Func<int, int, int> sum = delegate (int a, int b) { return a + b; };
        Console.WriteLine(sum(3, 4));  // output: 7
    }

    private static void Lambda()
    {
        Func<int, int, int> sum = (a, b) => a + b;
        Console.WriteLine(sum(3, 4));  // output: 7
    }

    private static void WithoutParameterList()
    {
        Action greet = delegate { Console.WriteLine("Hello!"); };
        greet();

        Action<int, double> introduce = delegate { Console.WriteLine("This is world!"); };
        introduce(42, 2.7);

        // Output:
        // Hello!
        // This is world!
    }

    private static void Discards()
    {
        Func<int, int, int> constant = delegate (int _, int _) { return 42; };
        Console.WriteLine(constant(3, 4));  // output: 42
    }

    private static void Static()
    {
        Func<int, int, int> sum = static delegate (int a, int b) { return a + b; };
        Console.WriteLine(sum(10, 4));  // output: 14
    }
}
```
This functionality is the only feature of anonymous methods that lambda expressions don't support. In all other cases, use a lambda expression to write inline code. You can use discards to specify two or more input parameters of an anonymous method that the method doesn't use:

```csharp
Func<int, int, int> constant = delegate (int _, int _) { return 42; };
Console.WriteLine(constant(3, 4));  // output: 42
```
For backwards compatibility, if only a single parameter is named `_`, the compiler treats `_` as the name of that parameter within an anonymous method.

Use the `static` modifier when you declare an anonymous method:

```csharp
Func<int, int, int> sum = static delegate (int a, int b) { return a + b; };
Console.WriteLine(sum(10, 4));  // output: 14
```
A static anonymous method can't capture local variables or instance state from enclosing scopes.

Use the `delegate` keyword to declare a delegate type.

The compiler can cache the delegate object that it creates from a method group. Consider the following method:

```csharp
static void StaticFunction() { }
```

When you assign the method group to a delegate, the compiler caches the delegate:

```csharp
Action a = StaticFunction;
```

## C# language specification

For more information, see the Anonymous function expressions section of the C# language specification.

## See also

- C# operators and expressions
- => operator
