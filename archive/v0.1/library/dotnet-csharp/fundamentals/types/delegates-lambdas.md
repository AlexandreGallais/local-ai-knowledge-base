---
title: "Lambda expressions, delegates, and events (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/types/delegates-lambdas.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Lambda expressions, delegates, and events

> **Tip:**
> **New to developing software?** Start with the Get started tutorials first. Build core type and method skills there before you use lambda expressions.

Sometimes you want to pass a small piece of behavior, a function, directly to another method. For example, you might want to filter a list, but the filtering condition changes depending on the situation. Rather than writing a separate named method for every possible condition, you pass the condition itself as an argument.

*Lambda expressions* are the C# feature that makes this possible. A lambda expression is a compact, inline function that you write without giving it a name. You use the arrow operator `=>` to separate the parameter list from the body:

```csharp
x => x * 2
```

Reading left to right: `x` is the input parameter, `=>` means "goes to," and `x * 2` is the body. It computes the value returned. When there are no parameters or more than one, wrap them in parentheses: `() => 42` or `(left, right) => left + right`.

## Delegates support lambda expressions

To use a lambda expression, the C# compiler needs to know two things: the types of the parameters and the return type. That description, the parameter types plus return type, is called a *delegate type*.

A delegate type is a type that represents a method signature. A variable of a delegate type can hold any matching method such as a lambda expression or a named method, as long as its parameter types and return type match.

You declare a delegate type with the `delegate` keyword:

```csharp
delegate int Transform(int value);
```

This declaration says: "`Transform` is a delegate type for methods that accept one `int` and return an `int`." You can then assign a lambda expression or a named method to a variable of that type:

```csharp
namespace DelegatesLambdasSample;

delegate int Transform(int value);

public sealed class MessagePublisher
{
    public event EventHandler<string>? MessagePublished;

    public void Publish(string message) => MessagePublished?.Invoke(this, message);
}

public static class Program
{
    public static void Main()
    {
        ShowDelegateBasics();
        ShowFuncAndAction();
        ShowLambdaAsArgument();
        ShowStaticLambda();
        ShowDiscardParameters();
        ShowMinimalEventIntro();
    }

    private static void ShowDelegateBasics()
    {
        Transform doubler = x => x * 2;    // assign a lambda expression
        Transform squarer = Square;         // assign a named method

        Console.WriteLine(doubler(5));      // 10
        Console.WriteLine(squarer(5));      // 25

        static int Square(int value) => value * value;
    }

    private static void ShowFuncAndAction()
    {
        Func<int, int, int> add = (left, right) => left + right;
        Action<string> report = message => Console.WriteLine($"Report: {message}");

        int total = add(5, 9);
        report($"5 + 9 = {total}");
    }

    private static void ShowLambdaAsArgument()
    {
        int[] numbers = [1, 2, 3, 4, 5, 6];
        int[] evenNumbers = Filter(numbers, value => value % 2 == 0).ToArray();

        Console.WriteLine(string.Join(", ", evenNumbers));
    }

    private static IEnumerable<int> Filter(IEnumerable<int> source, Func<int, bool> predicate)
    {
        foreach (int value in source)
        {
            if (predicate(value))
            {
                yield return value;
            }
        }
    }

    private static void ShowStaticLambda()
    {
        Func<int, bool> isEven = static value => value % 2 == 0;

        Console.WriteLine(isEven(14));
        Console.WriteLine(isEven(15));
    }

    private static void ShowDiscardParameters()
    {
        Action<int, int, string> statusUpdate = (_, _, message) => Console.WriteLine(message);
        statusUpdate(200, 42, "Operation completed");
    }

    private static void ShowMinimalEventIntro()
    {
        MessagePublisher publisher = new();
        publisher.MessagePublished += (_, message) => Console.WriteLine($"Received: {message}");

        publisher.Publish("Records updated");
    }
}
```
Both `doubler` and `squarer` hold a value of type `Transform`. You call them exactly like regular methods. The compiler verifies that whatever you assign matches the declared signature.

## Built-in delegate types: `Func` and `Action`

Declaring a custom delegate type for every situation can be repetitive. .NET provides two families of generic delegate types, `Func` and `Action`, that cover most scenarios, so you rarely need to use the `delegate` keyword yourself.

Both families come in versions with zero to sixteen input type parameters, so they scale to any number of inputs. The key <example-value> between the two families is:

- `System.Func`2` (and `Func<T1, T2, TResult>`, and so on) represents a method that **returns a value**. The last type parameter is always the return type; all earlier ones are input types.
- `System.Action`1` (and `Action<T1, T2>`, and so on) represents a method that **returns nothing** (`void`). All type parameters are input types. `System.Action` with no type parameters represents a method with no inputs and no return value.

For example, `Func<int, int, int>` describes a method with two `int` inputs and one `int` result. `Action<string>` describes a method with one `string` input and no return value.

```csharp
namespace DelegatesLambdasSample;

delegate int Transform(int value);

public sealed class MessagePublisher
{
    public event EventHandler<string>? MessagePublished;

    public void Publish(string message) => MessagePublished?.Invoke(this, message);
}

public static class Program
{
    public static void Main()
    {
        ShowDelegateBasics();
        ShowFuncAndAction();
        ShowLambdaAsArgument();
        ShowStaticLambda();
        ShowDiscardParameters();
        ShowMinimalEventIntro();
    }

    private static void ShowDelegateBasics()
    {
        Transform doubler = x => x * 2;    // assign a lambda expression
        Transform squarer = Square;         // assign a named method

        Console.WriteLine(doubler(5));      // 10
        Console.WriteLine(squarer(5));      // 25

        static int Square(int value) => value * value;
    }

    private static void ShowFuncAndAction()
    {
        Func<int, int, int> add = (left, right) => left + right;
        Action<string> report = message => Console.WriteLine($"Report: {message}");

        int total = add(5, 9);
        report($"5 + 9 = {total}");
    }

    private static void ShowLambdaAsArgument()
    {
        int[] numbers = [1, 2, 3, 4, 5, 6];
        int[] evenNumbers = Filter(numbers, value => value % 2 == 0).ToArray();

        Console.WriteLine(string.Join(", ", evenNumbers));
    }

    private static IEnumerable<int> Filter(IEnumerable<int> source, Func<int, bool> predicate)
    {
        foreach (int value in source)
        {
            if (predicate(value))
            {
                yield return value;
            }
        }
    }

    private static void ShowStaticLambda()
    {
        Func<int, bool> isEven = static value => value % 2 == 0;

        Console.WriteLine(isEven(14));
        Console.WriteLine(isEven(15));
    }

    private static void ShowDiscardParameters()
    {
        Action<int, int, string> statusUpdate = (_, _, message) => Console.WriteLine(message);
        statusUpdate(200, 42, "Operation completed");
    }

    private static void ShowMinimalEventIntro()
    {
        MessagePublisher publisher = new();
        publisher.MessagePublished += (_, message) => Console.WriteLine($"Received: {message}");

        publisher.Publish("Records updated");
    }
}
```
Use descriptive parameter names in lambdas so readers can understand intent without scanning the full method body.

## Pass a lambda expression to a method

When a method declares a `Func` or `Action` parameter, callers pass a lambda expression that matches that delegate type. The compiler checks that the lambda's parameter types and return type match the declared delegate type. If they don't match, the code doesn't compile.

```csharp
namespace DelegatesLambdasSample;

delegate int Transform(int value);

public sealed class MessagePublisher
{
    public event EventHandler<string>? MessagePublished;

    public void Publish(string message) => MessagePublished?.Invoke(this, message);
}

public static class Program
{
    public static void Main()
    {
        ShowDelegateBasics();
        ShowFuncAndAction();
        ShowLambdaAsArgument();
        ShowStaticLambda();
        ShowDiscardParameters();
        ShowMinimalEventIntro();
    }

    private static void ShowDelegateBasics()
    {
        Transform doubler = x => x * 2;    // assign a lambda expression
        Transform squarer = Square;         // assign a named method

        Console.WriteLine(doubler(5));      // 10
        Console.WriteLine(squarer(5));      // 25

        static int Square(int value) => value * value;
    }

    private static void ShowFuncAndAction()
    {
        Func<int, int, int> add = (left, right) => left + right;
        Action<string> report = message => Console.WriteLine($"Report: {message}");

        int total = add(5, 9);
        report($"5 + 9 = {total}");
    }

    private static void ShowLambdaAsArgument()
    {
        int[] numbers = [1, 2, 3, 4, 5, 6];
        int[] evenNumbers = Filter(numbers, value => value % 2 == 0).ToArray();

        Console.WriteLine(string.Join(", ", evenNumbers));
    }

    private static IEnumerable<int> Filter(IEnumerable<int> source, Func<int, bool> predicate)
    {
        foreach (int value in source)
        {
            if (predicate(value))
            {
                yield return value;
            }
        }
    }

    private static void ShowStaticLambda()
    {
        Func<int, bool> isEven = static value => value % 2 == 0;

        Console.WriteLine(isEven(14));
        Console.WriteLine(isEven(15));
    }

    private static void ShowDiscardParameters()
    {
        Action<int, int, string> statusUpdate = (_, _, message) => Console.WriteLine(message);
        statusUpdate(200, 42, "Operation completed");
    }

    private static void ShowMinimalEventIntro()
    {
        MessagePublisher publisher = new();
        publisher.MessagePublished += (_, message) => Console.WriteLine($"Received: {message}");

        publisher.Publish("Records updated");
    }
}
```
The `Filter` method declares a `Func<int, bool>` parameter named `predicate`. The `Func<int, bool>` type tells callers the expected shape: one `int` input, one `bool` result. The caller passes `value => value % 2 == 0` as that argument. This pattern appears throughout LINQ and many .NET APIs.

## Keep lambda expressions self-contained

A lambda expression can reference variables from the surrounding code. *Capturing* means the lambda holds a reference to a variable declared outside its own body. The combination of the lambda and the variables it captures is called a *closure*.

When you don't need to capture anything, add the `static` modifier to the lambda. A static lambda can only use its own parameters and values declared inside its body. It can't capture local variables or instance state from the enclosing scope.

```csharp
namespace DelegatesLambdasSample;

delegate int Transform(int value);

public sealed class MessagePublisher
{
    public event EventHandler<string>? MessagePublished;

    public void Publish(string message) => MessagePublished?.Invoke(this, message);
}

public static class Program
{
    public static void Main()
    {
        ShowDelegateBasics();
        ShowFuncAndAction();
        ShowLambdaAsArgument();
        ShowStaticLambda();
        ShowDiscardParameters();
        ShowMinimalEventIntro();
    }

    private static void ShowDelegateBasics()
    {
        Transform doubler = x => x * 2;    // assign a lambda expression
        Transform squarer = Square;         // assign a named method

        Console.WriteLine(doubler(5));      // 10
        Console.WriteLine(squarer(5));      // 25

        static int Square(int value) => value * value;
    }

    private static void ShowFuncAndAction()
    {
        Func<int, int, int> add = (left, right) => left + right;
        Action<string> report = message => Console.WriteLine($"Report: {message}");

        int total = add(5, 9);
        report($"5 + 9 = {total}");
    }

    private static void ShowLambdaAsArgument()
    {
        int[] numbers = [1, 2, 3, 4, 5, 6];
        int[] evenNumbers = Filter(numbers, value => value % 2 == 0).ToArray();

        Console.WriteLine(string.Join(", ", evenNumbers));
    }

    private static IEnumerable<int> Filter(IEnumerable<int> source, Func<int, bool> predicate)
    {
        foreach (int value in source)
        {
            if (predicate(value))
            {
                yield return value;
            }
        }
    }

    private static void ShowStaticLambda()
    {
        Func<int, bool> isEven = static value => value % 2 == 0;

        Console.WriteLine(isEven(14));
        Console.WriteLine(isEven(15));
    }

    private static void ShowDiscardParameters()
    {
        Action<int, int, string> statusUpdate = (_, _, message) => Console.WriteLine(message);
        statusUpdate(200, 42, "Operation completed");
    }

    private static void ShowMinimalEventIntro()
    {
        MessagePublisher publisher = new();
        publisher.MessagePublished += (_, message) => Console.WriteLine($"Received: {message}");

        publisher.Publish("Records updated");
    }
}
```
Static lambdas make intent clear and prevent accidental captures.
