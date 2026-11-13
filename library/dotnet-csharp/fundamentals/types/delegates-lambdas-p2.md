---
title: "Lambda expressions, delegates, and events (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/types/delegates-lambdas.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Lambda expressions, delegates, and events (part 2 of 2)

## Use discard parameters when inputs are irrelevant

Sometimes a delegate signature includes parameters you don't need. Use the discard `_` to signal that choice explicitly.

Common examples include event handlers where you don't use `sender` or `EventArgs`, callbacks where you only need some of several inputs, and LINQ overloads that provide an index you don't use.

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
Discards improve readability because they show which parameters matter.

## Events provide optional notifications

An *event* is a mechanism that one object (the *publisher*) uses to notify other objects (the *subscribers*) when something happens. The publisher doesn't need to know who is listening or how many subscribers there are. Subscribers choose to opt in.

Events are built on delegates. An event is a delegate field with extra restrictions enforced by the `event` keyword: outside code can only subscribe (`+=`) or unsubscribe (`-=`) from the event; only the class that declares the event can invoke (raise) it.

The .NET convention for event delegate types is `System.EventHandler`1`, where `T` is the type of data included with the notification. Its signature always has two parameters: the `sender` (the object that raised the event) and the event data of type `T`.

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
The following snippet shows its use:

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
Walking through the code:

- `MessagePublisher` declares `event EventHandler<string>? MessagePublished`. The `event` keyword means callers can only subscribe or unsubscribe—they can't invoke it directly.
- `publisher.MessagePublished += (_, message) => ...` subscribes with a lambda expression. The `_` discards the `sender` parameter because this handler doesn't need it.
- `publisher.Publish("Records updated")` raises the event and runs every subscribed handler.

Subscribing is optional. The `?.Invoke(...)` in the `Publish` method means the event raises only when at least one subscriber is attached. The publisher raises the event without knowing or caring whether anyone is listening.

## See also

- Lambda expressions
- Type system overview
- Methods
- Pattern matching
- Events (C# programming guide)
