---
title: "Pattern matching overview (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/patterns/pattern-matching.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Pattern matching overview (part 2 of 2)

## Choose between a statement and an expression

Patterns work with both forms of `switch`:

- Use a `switch` statement when each match should run one or more statements.
- Use a `switch` expression when each match should produce a value.

The following switch statement reports a delivery update. The express-delivery branch writes two messages, so a statement fits naturally:

```csharp
static class Overview
{
    public static void Run()
    {
        Console.WriteLine(GetDeliveryMessage(new ExpressDelivery("ZX-42")));
        PrintTrackingCode(new ExpressDelivery("ZX-42"));
        PrintPackageStatus(null);
        PrintDeliveryUpdate(new ExpressDelivery("ZX-42"));
        Console.WriteLine(GetStatusMessage(new StandardDelivery(2)));
    }

    static string GetDeliveryMessage(Delivery? delivery) =>
        delivery switch
        {
            null => "No delivery was scheduled.",
            ExpressDelivery express => $"Express package {express.TrackingCode}",
            StandardDelivery { Days: <= 2 } => "Standard delivery arriving soon",
            _ => "Standard delivery"
        };

    static void PrintTrackingCode(Delivery delivery)
    {
        if (delivery is ExpressDelivery express)
        {
            Console.WriteLine($"Track express package {express.TrackingCode}");
        }
    }

    static void PrintPackageStatus(Delivery? delivery)
    {
        if (delivery is null)
        {
            Console.WriteLine("No package is available.");
        }
        else
        {
            Console.WriteLine("A package is ready to track.");
        }
    }

    static void PrintDeliveryUpdate(Delivery? delivery)
    {
        switch (delivery)
        {
            case null:
                Console.WriteLine("No delivery was scheduled.");
                break;
            case ExpressDelivery express:
                Console.WriteLine($"Express delivery {express.TrackingCode} is ready.");
                Console.WriteLine("Notify the priority desk.");
                break;
            case StandardDelivery standard:
                Console.WriteLine($"Standard delivery arrives in {standard.Days} days.");
                break;
            default:
                Console.WriteLine("Another delivery type is scheduled.");
                break;
        }
    }

    static string GetStatusMessage(StandardDelivery delivery) =>
        delivery.Days switch
        {
            0 => "Delivered today",
            1 => "Arriving tomorrow",
            <= 3 => "Arriving soon",
            _ => "In transit"
        };
}

abstract record Delivery;
sealed record ExpressDelivery(string TrackingCode) : Delivery;
sealed record StandardDelivery(int Days) : Delivery;
```
Each `case` applies a pattern to the `delivery` expression. The matching section can run any number of statements before `break` exits the switch. The `default` section handles anything that the earlier cases don't match.

The following switch expression replaces an `if` / `else if` chain that assigns one result:

```csharp
static class Overview
{
    public static void Run()
    {
        Console.WriteLine(GetDeliveryMessage(new ExpressDelivery("ZX-42")));
        PrintTrackingCode(new ExpressDelivery("ZX-42"));
        PrintPackageStatus(null);
        PrintDeliveryUpdate(new ExpressDelivery("ZX-42"));
        Console.WriteLine(GetStatusMessage(new StandardDelivery(2)));
    }

    static string GetDeliveryMessage(Delivery? delivery) =>
        delivery switch
        {
            null => "No delivery was scheduled.",
            ExpressDelivery express => $"Express package {express.TrackingCode}",
            StandardDelivery { Days: <= 2 } => "Standard delivery arriving soon",
            _ => "Standard delivery"
        };

    static void PrintTrackingCode(Delivery delivery)
    {
        if (delivery is ExpressDelivery express)
        {
            Console.WriteLine($"Track express package {express.TrackingCode}");
        }
    }

    static void PrintPackageStatus(Delivery? delivery)
    {
        if (delivery is null)
        {
            Console.WriteLine("No package is available.");
        }
        else
        {
            Console.WriteLine("A package is ready to track.");
        }
    }

    static void PrintDeliveryUpdate(Delivery? delivery)
    {
        switch (delivery)
        {
            case null:
                Console.WriteLine("No delivery was scheduled.");
                break;
            case ExpressDelivery express:
                Console.WriteLine($"Express delivery {express.TrackingCode} is ready.");
                Console.WriteLine("Notify the priority desk.");
                break;
            case StandardDelivery standard:
                Console.WriteLine($"Standard delivery arrives in {standard.Days} days.");
                break;
            default:
                Console.WriteLine("Another delivery type is scheduled.");
                break;
        }
    }

    static string GetStatusMessage(StandardDelivery delivery) =>
        delivery.Days switch
        {
            0 => "Delivered today",
            1 => "Arriving tomorrow",
            <= 3 => "Arriving soon",
            _ => "In transit"
        };
}

abstract record Delivery;
sealed record ExpressDelivery(string TrackingCode) : Delivery;
sealed record StandardDelivery(int Days) : Delivery;
```
A switch expression is concise because every arm has the same purpose: produce the value returned. Use a switch statement when branches perform actions, and use a switch expression when branches calculate one result.

## Pattern categories

C# includes patterns for common kinds of data tests:

| Pattern category | What it tests |
| --- | --- |
| Declaration, constant, and `var` patterns | A run-time type, a specific constant value, or any value that you want to capture |
| Type patterns | A run-time type without declaring a variable |
| Property and positional patterns | Properties, fields, or deconstructed values |
| Relational, logical, and parenthesized patterns | Comparisons and combinations such as `and`, `or`, and `not` |
| List and slice patterns | The values and shape of a supported sequence |
| Discard patterns and discards | Any remaining value, or a value your code intentionally ignores |

The linked Fundamentals articles explain when to choose each category. For complete syntax and examples, see the patterns reference.

## See also

- Declaration, constant, and `var` patterns
- Type patterns
- Property and positional patterns
- Relational, logical, and parenthesized patterns
- List and slice patterns
- Discards
- Patterns reference
- `switch` expression reference
