---
title: "The lambda operator - The `=>` operator is used to define a lambda expression"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/lambda-operator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Lambda expression (`=>`) operator defines a lambda expression

The `=>` token is supported in two forms: as the lambda operator and as a separator of a member name and the member implementation in an expression body definition.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Lambda operator

In lambda expressions, the lambda operator `=>` separates the input parameters on the left side from the lambda body on the right side.

The following example uses the LINQ feature with method syntax to demonstrate the usage of lambda expressions:

```csharp
﻿namespace operators;

public static class LambdaOperator
{
    public static void Examples()
    {
        WithInferredTypes();
        WithExplicitTypes();
        WithoutInput();
    }

    private static void WithInferredTypes()
    {
        string[] words = { "bot", "apple", "apricot" };
        int minimalLength = words
          .Where(w => w.StartsWith("a"))
          .Min(w => w.Length);
        Console.WriteLine(minimalLength);   // output: 5

        int[] numbers = { 4, 7, 10 };
        int product = numbers.Aggregate(1, (interim, next) => interim * next);
        Console.WriteLine(product);   // output: 280
    }

    private static void WithExplicitTypes()
    {
        int[] numbers = { 4, 7, 10 };
        int product = numbers.Aggregate(1, (int interim, int next) => interim * next);
        Console.WriteLine(product);   // output: 280
    }

    private static void WithoutInput()
    {
        Func<string> greet = () => "Hello, World!";
        Console.WriteLine(greet());
    }
}
```
Input parameters of a lambda expression are strongly typed at compile time. When the compiler infers the types of input parameters, like in the preceding example, you can omit type declarations. If you need to specify the type of input parameters, you must specify the type for each parameter, as the following example shows:

```csharp
﻿namespace operators;

public static class LambdaOperator
{
    public static void Examples()
    {
        WithInferredTypes();
        WithExplicitTypes();
        WithoutInput();
    }

    private static void WithInferredTypes()
    {
        string[] words = { "bot", "apple", "apricot" };
        int minimalLength = words
          .Where(w => w.StartsWith("a"))
          .Min(w => w.Length);
        Console.WriteLine(minimalLength);   // output: 5

        int[] numbers = { 4, 7, 10 };
        int product = numbers.Aggregate(1, (interim, next) => interim * next);
        Console.WriteLine(product);   // output: 280
    }

    private static void WithExplicitTypes()
    {
        int[] numbers = { 4, 7, 10 };
        int product = numbers.Aggregate(1, (int interim, int next) => interim * next);
        Console.WriteLine(product);   // output: 280
    }

    private static void WithoutInput()
    {
        Func<string> greet = () => "Hello, World!";
        Console.WriteLine(greet());
    }
}
```
The following example shows how to define a lambda expression without input parameters:

```csharp
﻿namespace operators;

public static class LambdaOperator
{
    public static void Examples()
    {
        WithInferredTypes();
        WithExplicitTypes();
        WithoutInput();
    }

    private static void WithInferredTypes()
    {
        string[] words = { "bot", "apple", "apricot" };
        int minimalLength = words
          .Where(w => w.StartsWith("a"))
          .Min(w => w.Length);
        Console.WriteLine(minimalLength);   // output: 5

        int[] numbers = { 4, 7, 10 };
        int product = numbers.Aggregate(1, (interim, next) => interim * next);
        Console.WriteLine(product);   // output: 280
    }

    private static void WithExplicitTypes()
    {
        int[] numbers = { 4, 7, 10 };
        int product = numbers.Aggregate(1, (int interim, int next) => interim * next);
        Console.WriteLine(product);   // output: 280
    }

    private static void WithoutInput()
    {
        Func<string> greet = () => "Hello, World!";
        Console.WriteLine(greet());
    }
}
```
For more information, see Lambda expressions.

## Expression body definition

An expression body definition uses the following general syntax:

```csharp
member => expression;
```

For a member that returns a value, the expression's result must be implicitly convertible to the member's return type. For a `void` member, constructor, finalizer, or `set`, `init`, `add`, or `remove` accessor, the body must be a *statement expression*. A statement expression can be an assignment, method invocation, object creation, increment or decrement operation, or `await` expression. Its result, if any, is discarded.

The following example shows an expression body definition for a `Person.ToString` method:

```csharp
public override string ToString() => $"{fname} {lname}".Trim();
```

It's a shorthand version of the following method definition:

```csharp
public override string ToString()
{
   return $"{fname} {lname}".Trim();
}
```

You can use expression body definitions for the following members:

- **Methods and local functions:** A member that returns a value has the form `T M() => expression;`. A `void` member has the form `void M() => statementExpression;`. For more information, see Methods and Local functions.
- **Operators:** An operator has the form `public static T operator +(T left, T right) => expression;`. For more information, see Operator overloading.
- **Properties and indexers:** A read-only property or indexer has the form `T P => expression;` or `T this[int i] => expression;`. You can also use expression bodies for individual accessors. A `get` accessor has the form `get => expression;`. A `set` or `init` accessor has the form `set => statementExpression;` or `init => statementExpression;`. For more information, see Properties and Indexers.
- **Constructors and finalizers:** These members have the form `C() => statementExpression;` or `~C() => statementExpression;`. For more information, see Constructors and Finalizers.
- **Event accessors:** An `add` or `remove` accessor has the form `add => statementExpression;` or `remove => statementExpression;`. For more information, see Events.

## Operator overloadability

You can't overload the `=>` operator.

## C# language specification

For more information about the lambda operator, see the Anonymous function expressions section of the C# language specification.

## See also

- C# operators and expressions
