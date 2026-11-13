---
title: "new operator - Create and initialize a new instance of a type"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/new-operator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# new operator - The `new` operator creates a new instance of a type

The `new` operator creates a new instance of a type. You can also use the `new` keyword as a member declaration modifier or a generic type constraint.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Constructor invocation

To create a new instance of a type, invoke one of the constructors of that type by using the `new` operator:

```csharp
﻿namespace operators;

public static class NewOperator
{
    public static void Examples()
    {
        Constructor();
        ConstructorWithInitializer();
        Array();
        ArrayInitialization();
        AnonymousType();
    }

    private static void Constructor()
    {
        var dict = new Dictionary<string, int>();
        dict["first"] = 10;
        dict["second"] = 20;
        dict["third"] = 30;

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void ConstructorWithInitializer()
    {
        var dict = new Dictionary<string, int>
        {
            ["first"] = 10,
            ["second"] = 20,
            ["third"] = 30
        };

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void TargetTyped()
    {
        List<int> xs = new();
        List<int> ys = new(capacity: 10_000);
        List<int> zs = new() { Capacity = 20_000 };

        Dictionary<int, List<int>> lookup = new()
        {
            [1] = new() { 1, 2, 3 },
            [2] = new() { 5, 8, 3 },
            [5] = new() { 1, 0, 4 }
        };
    }

    private static void Array()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var numbers = new int[3];
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        Console.WriteLine(string.Join(", ", numbers));
        // Output:
        // 10, 20, 30
    }

    private static void ArrayInitialization()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var a = new int[3] { 10, 20, 30 };
        var b = new int[] { 10, 20, 30 };
        var c = new[] { 10, 20, 30 };
        Console.WriteLine(c.GetType());  // output: System.Int32[]
    }

    private static void AnonymousType()
    {
        var example = new { Greeting = "Hello", Name = "World" };
        Console.WriteLine($"{example.Greeting}, {example.Name}!");
        // Output:
        // Hello, World!
    }
}
```
You can use an object or collection initializer with the `new` operator to instantiate and initialize an object in one statement, as the following example shows:

```csharp
﻿namespace operators;

public static class NewOperator
{
    public static void Examples()
    {
        Constructor();
        ConstructorWithInitializer();
        Array();
        ArrayInitialization();
        AnonymousType();
    }

    private static void Constructor()
    {
        var dict = new Dictionary<string, int>();
        dict["first"] = 10;
        dict["second"] = 20;
        dict["third"] = 30;

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void ConstructorWithInitializer()
    {
        var dict = new Dictionary<string, int>
        {
            ["first"] = 10,
            ["second"] = 20,
            ["third"] = 30
        };

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void TargetTyped()
    {
        List<int> xs = new();
        List<int> ys = new(capacity: 10_000);
        List<int> zs = new() { Capacity = 20_000 };

        Dictionary<int, List<int>> lookup = new()
        {
            [1] = new() { 1, 2, 3 },
            [2] = new() { 5, 8, 3 },
            [5] = new() { 1, 0, 4 }
        };
    }

    private static void Array()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var numbers = new int[3];
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        Console.WriteLine(string.Join(", ", numbers));
        // Output:
        // 10, 20, 30
    }

    private static void ArrayInitialization()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var a = new int[3] { 10, 20, 30 };
        var b = new int[] { 10, 20, 30 };
        var c = new[] { 10, 20, 30 };
        Console.WriteLine(c.GetType());  // output: System.Int32[]
    }

    private static void AnonymousType()
    {
        var example = new { Greeting = "Hello", Name = "World" };
        Console.WriteLine($"{example.Greeting}, {example.Name}!");
        // Output:
        // Hello, World!
    }
}
```
### Target-typed `new`

Constructor invocation expressions are target-typed. That is, if a target type of an expression is known, you can omit a type name, as the following example shows:

```csharp
List<int> xs = new();
List<int> ys = new(capacity: 10_000);
List<int> zs = new() { Capacity = 20_000 };

Dictionary<int, List<int>> lookup = new()
{
    [1] = new() { 1, 2, 3 },
    [2] = new() { 5, 8, 3 },
    [5] = new() { 1, 0, 4 }
};
```
As the preceding example shows, always use parentheses in a target-typed `new` expression.

If a target type of a `new` expression is unknown (for example, when you use the `var` keyword), you must specify a type name.

## Array creation

You also use the `new` operator to create an array instance, as the following example shows:

```csharp
﻿namespace operators;

public static class NewOperator
{
    public static void Examples()
    {
        Constructor();
        ConstructorWithInitializer();
        Array();
        ArrayInitialization();
        AnonymousType();
    }

    private static void Constructor()
    {
        var dict = new Dictionary<string, int>();
        dict["first"] = 10;
        dict["second"] = 20;
        dict["third"] = 30;

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void ConstructorWithInitializer()
    {
        var dict = new Dictionary<string, int>
        {
            ["first"] = 10,
            ["second"] = 20,
            ["third"] = 30
        };

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void TargetTyped()
    {
        List<int> xs = new();
        List<int> ys = new(capacity: 10_000);
        List<int> zs = new() { Capacity = 20_000 };

        Dictionary<int, List<int>> lookup = new()
        {
            [1] = new() { 1, 2, 3 },
            [2] = new() { 5, 8, 3 },
            [5] = new() { 1, 0, 4 }
        };
    }

    private static void Array()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var numbers = new int[3];
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        Console.WriteLine(string.Join(", ", numbers));
        // Output:
        // 10, 20, 30
    }

    private static void ArrayInitialization()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var a = new int[3] { 10, 20, 30 };
        var b = new int[] { 10, 20, 30 };
        var c = new[] { 10, 20, 30 };
        Console.WriteLine(c.GetType());  // output: System.Int32[]
    }

    private static void AnonymousType()
    {
        var example = new { Greeting = "Hello", Name = "World" };
        Console.WriteLine($"{example.Greeting}, {example.Name}!");
        // Output:
        // Hello, World!
    }
}
```
Use array initialization syntax to create an array instance and populate it with elements in one statement. The following example shows various ways how you can do that:

```csharp
﻿namespace operators;

public static class NewOperator
{
    public static void Examples()
    {
        Constructor();
        ConstructorWithInitializer();
        Array();
        ArrayInitialization();
        AnonymousType();
    }

    private static void Constructor()
    {
        var dict = new Dictionary<string, int>();
        dict["first"] = 10;
        dict["second"] = 20;
        dict["third"] = 30;

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void ConstructorWithInitializer()
    {
        var dict = new Dictionary<string, int>
        {
            ["first"] = 10,
            ["second"] = 20,
            ["third"] = 30
        };

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void TargetTyped()
    {
        List<int> xs = new();
        List<int> ys = new(capacity: 10_000);
        List<int> zs = new() { Capacity = 20_000 };

        Dictionary<int, List<int>> lookup = new()
        {
            [1] = new() { 1, 2, 3 },
            [2] = new() { 5, 8, 3 },
            [5] = new() { 1, 0, 4 }
        };
    }

    private static void Array()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var numbers = new int[3];
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        Console.WriteLine(string.Join(", ", numbers));
        // Output:
        // 10, 20, 30
    }

    private static void ArrayInitialization()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var a = new int[3] { 10, 20, 30 };
        var b = new int[] { 10, 20, 30 };
        var c = new[] { 10, 20, 30 };
        Console.WriteLine(c.GetType());  // output: System.Int32[]
    }

    private static void AnonymousType()
    {
        var example = new { Greeting = "Hello", Name = "World" };
        Console.WriteLine($"{example.Greeting}, {example.Name}!");
        // Output:
        // Hello, World!
    }
}
```
For more information about arrays, see Arrays.

## Instantiation of anonymous types

To create an instance of an anonymous type, use the `new` operator and object initializer syntax:

```csharp
﻿namespace operators;

public static class NewOperator
{
    public static void Examples()
    {
        Constructor();
        ConstructorWithInitializer();
        Array();
        ArrayInitialization();
        AnonymousType();
    }

    private static void Constructor()
    {
        var dict = new Dictionary<string, int>();
        dict["first"] = 10;
        dict["second"] = 20;
        dict["third"] = 30;

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void ConstructorWithInitializer()
    {
        var dict = new Dictionary<string, int>
        {
            ["first"] = 10,
            ["second"] = 20,
            ["third"] = 30
        };

        Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
        // Output:
        // first: 10; second: 20; third: 30
    }

    private static void TargetTyped()
    {
        List<int> xs = new();
        List<int> ys = new(capacity: 10_000);
        List<int> zs = new() { Capacity = 20_000 };

        Dictionary<int, List<int>> lookup = new()
        {
            [1] = new() { 1, 2, 3 },
            [2] = new() { 5, 8, 3 },
            [5] = new() { 1, 0, 4 }
        };
    }

    private static void Array()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var numbers = new int[3];
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        Console.WriteLine(string.Join(", ", numbers));
        // Output:
        // 10, 20, 30
    }

    private static void ArrayInitialization()
    {
        // This snippet is used with try.net,
        // which doesn't support collection expressions yet.
        var a = new int[3] { 10, 20, 30 };
        var b = new int[] { 10, 20, 30 };
        var c = new[] { 10, 20, 30 };
        Console.WriteLine(c.GetType());  // output: System.Int32[]
    }

    private static void AnonymousType()
    {
        var example = new { Greeting = "Hello", Name = "World" };
        Console.WriteLine($"{example.Greeting}, {example.Name}!");
        // Output:
        // Hello, World!
    }
}
```
## Destruction of type instances

You don't need to destroy previously created type instances. The system automatically destroys instances of both reference and value types. The system destroys instances of value types as soon as the context that contains them is destroyed. The garbage collector destroys instances of reference types at some unspecified time after the last reference to them is removed.

For type instances that contain unmanaged resources, such as a file handle, employ deterministic clean-up to ensure that the resources are released as soon as possible. For more information, see the `System.IDisposable` API reference and the `using` statement article.

## Operator overloadability

A user-defined type can't overload the `new` operator.

## C# language specification

For more information, see The new operator section of the C# language specification.

For more information about a target-typed `new` expression, see the Object creation expressions section of the C# language specification.

## See also

- C# operators and expressions
- Object and collection initializers
