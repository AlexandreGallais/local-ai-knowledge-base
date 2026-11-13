---
title: "Discards and the discard pattern"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/patterns/discards.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Discards and the discard pattern

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to patterns, start with the pattern matching overview. For complete syntax, see the discard pattern reference.

The underscore token (`_`) communicates that a value isn't needed. Its exact meaning depends on where it appears:

| Context | Meaning of `_` |
| --- | --- |
| A switch expression arm or a nested pattern | A *discard pattern* that matches without capturing the result |
| A deconstruction or `out` argument | A *discard* that ignores one produced value |
| An assignment such as `_ = expression` | A *discard assignment* that evaluates the expression and ignores its result |
| Two or more lambda parameters named `_` | *Discard parameters* whose inputs aren't used |
| `var _` in a pattern | A `var` pattern with a discard designation |

These forms share spelling and intent, but they aren't interchangeable.

## Pattern matching with `switch`

In the following example, `statusCode` is an `int`. Each switch arm produces a `string` message, which the program writes to the console. The final `_` handles every status code other than `200` and `404`:

```csharp
namespace Discards;

class Program
{
    static void Main()
    {
        ShowStatus();
        ShowForecast();
        CheckInput();
        ShowLambdaDiscards();
    }

    static void ShowStatus()
    {
        int statusCode = 503;
        string message = statusCode switch
        {
            200 => "Ready",
            404 => "Not found",
            _ => "Another status"
        };

        Console.WriteLine(message);
    }

    static void ShowForecast()
    {
        var (city, high, _, _) = GetForecast();
        Console.WriteLine($"{city}: high {high}°C");

        static (string City, int High, int Low, int RainChance) GetForecast() =>
            ("Portland", 18, 9, 40);
    }

    static void CheckInput()
    {
        string text = "42";

        if (IsWholeNumber(text))
        {
            Console.WriteLine($"Accepted: {text}");
        }
        else
        {
            Console.WriteLine("Enter a whole number.");
        }

        static bool IsWholeNumber(string text) => int.TryParse(text, out _);
    }

    static void ShowLambdaDiscards()
    {
        EventHandler handler = (_, _) => Console.WriteLine("Timer tick");
        handler(null, EventArgs.Empty);
    }
}
```
A discard pattern is applied to an input expression. C# evaluates the expression, and `_` matches the evaluated value without capturing it. Choose `_` as the final switch-expression arm when every value not handled earlier should use the same fallback. Put it last because it matches everything, including `null`.

The form `var _` is a `var` pattern with a discard designation. It also matches every evaluated value, but it doesn't introduce a readable variable. Prefer the shorter `_` discard pattern for a switch catch-all. For more about `var` patterns and designations, see Declaration, constant, and `var` patterns.

## Deconstruction declarations

`GetForecast` returns a tuple with four components: a `string` city and three `int` values for the high temperature, low temperature, and rain chance. The deconstruction declaration retains `city` and `high` because the program displays them. It uses `_` for the low temperature and rain chance because naming those unused components would imply that the code needs them:

```csharp
namespace Discards;

class Program
{
    static void Main()
    {
        ShowStatus();
        ShowForecast();
        CheckInput();
        ShowLambdaDiscards();
    }

    static void ShowStatus()
    {
        int statusCode = 503;
        string message = statusCode switch
        {
            200 => "Ready",
            404 => "Not found",
            _ => "Another status"
        };

        Console.WriteLine(message);
    }

    static void ShowForecast()
    {
        var (city, high, _, _) = GetForecast();
        Console.WriteLine($"{city}: high {high}°C");

        static (string City, int High, int Low, int RainChance) GetForecast() =>
            ("Portland", 18, 9, 40);
    }

    static void CheckInput()
    {
        string text = "42";

        if (IsWholeNumber(text))
        {
            Console.WriteLine($"Accepted: {text}");
        }
        else
        {
            Console.WriteLine("Enter a whole number.");
        }

        static bool IsWholeNumber(string text) => int.TryParse(text, out _);
    }

    static void ShowLambdaDiscards()
    {
        EventHandler handler = (_, _) => Console.WriteLine("Timer tick");
        handler(null, EventArgs.Empty);
    }
}
```
The same discard syntax works when an object's `Deconstruct` method produces several values. For those forms, see Deconstructing tuples and other types.

## Calls to methods with `out` parameters

Suppose an input field accepts text only when it represents a whole number. The `System.Int32.TryParse(System.String,System.Int32@)` method returns a `bool` that reports whether parsing succeeded. It also produces the parsed `int` through its `out` parameter. The following code needs only the Boolean result to accept or reject the input:

```csharp
namespace Discards;

class Program
{
    static void Main()
    {
        ShowStatus();
        ShowForecast();
        CheckInput();
        ShowLambdaDiscards();
    }

    static void ShowStatus()
    {
        int statusCode = 503;
        string message = statusCode switch
        {
            200 => "Ready",
            404 => "Not found",
            _ => "Another status"
        };

        Console.WriteLine(message);
    }

    static void ShowForecast()
    {
        var (city, high, _, _) = GetForecast();
        Console.WriteLine($"{city}: high {high}°C");

        static (string City, int High, int Low, int RainChance) GetForecast() =>
            ("Portland", 18, 9, 40);
    }

    static void CheckInput()
    {
        string text = "42";

        if (IsWholeNumber(text))
        {
            Console.WriteLine($"Accepted: {text}");
        }
        else
        {
            Console.WriteLine("Enter a whole number.");
        }

        static bool IsWholeNumber(string text) => int.TryParse(text, out _);
    }

    static void ShowLambdaDiscards()
    {
        EventHandler handler = (_, _) => Console.WriteLine("Timer tick");
        handler(null, EventArgs.Empty);
    }
}
```
Use `out _` when only the success of the operation matters. The discard makes it clear that the parsed number isn't needed. If later code needs the number, give the `out` argument a name, such as `out int number`, and retain that value instead.

A discard assignment, `_ = expression`, evaluates an expression and intentionally ignores its result. It's occasionally useful when the expression isn't otherwise a valid statement.

> **Important:**
> Don't use `_ = Task.Run(...)` or `_ = SomeAsyncMethod()` to discard a task in application code. Await the task so its completion and exceptions remain in the calling flow. A discard assignment doesn't make a task safe, observe its exception, or create a supported fire-and-forget operation.

## Mark unused lambda parameters

An `System.EventHandler` receives an `object?` sender and an `System.EventArgs` value. The following handler needs neither parameter; it only writes `"Timer tick"` to the console. Naming both parameters `_` makes their unused status visible without inventing names that the body never uses:

```csharp
namespace Discards;

class Program
{
    static void Main()
    {
        ShowStatus();
        ShowForecast();
        CheckInput();
        ShowLambdaDiscards();
    }

    static void ShowStatus()
    {
        int statusCode = 503;
        string message = statusCode switch
        {
            200 => "Ready",
            404 => "Not found",
            _ => "Another status"
        };

        Console.WriteLine(message);
    }

    static void ShowForecast()
    {
        var (city, high, _, _) = GetForecast();
        Console.WriteLine($"{city}: high {high}°C");

        static (string City, int High, int Low, int RainChance) GetForecast() =>
            ("Portland", 18, 9, 40);
    }

    static void CheckInput()
    {
        string text = "42";

        if (IsWholeNumber(text))
        {
            Console.WriteLine($"Accepted: {text}");
        }
        else
        {
            Console.WriteLine("Enter a whole number.");
        }

        static bool IsWholeNumber(string text) => int.TryParse(text, out _);
    }

    static void ShowLambdaDiscards()
    {
        EventHandler handler = (_, _) => Console.WriteLine("Timer tick");
        handler(null, EventArgs.Empty);
    }
}
```
Choose discard parameters when a delegate signature requires inputs that the lambda body doesn't use. If a lambda has only one parameter named `_`, `_` remains an ordinary parameter name for backward compatibility.

## Avoid `_` as an identifier

`_` can be an ordinary identifier in contexts where C# doesn't recognize a discard. An in-scope variable named `_` can receive an assignment that looks like a discard assignment. In a pattern context, an accessible constant or type named `_` can also change how `_` is interpreted. Avoid declaring your own variables, constants, or types named `_`; use `_` to communicate discard intent.

## See also

- Pattern matching overview
- Declaration, constant, and `var` patterns
- Deconstructing tuples and other types
- Lambda expression parameters
- Discard pattern reference
