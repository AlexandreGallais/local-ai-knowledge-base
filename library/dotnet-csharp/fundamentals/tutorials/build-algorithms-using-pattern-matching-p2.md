---
title: "Tutorial: Build algorithms using pattern matching (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/build-algorithms-using-pattern-matching.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Build algorithms using pattern matching (part 2 of 3)

## Add peak pricing

For the final feature, the toll authority wants to add time-sensitive peak pricing. During the morning and evening rush hours, the tolls are doubled. That rule only affects traffic in one direction: inbound to the city in the morning, and outbound in the evening rush hour. During other times during the workday, tolls increase by 50%. Late night and early morning, tolls are reduced by 25%. During the weekend, it's the normal rate, regardless of the time. You could use a series of `if` and `else` statements to express this rule using the following code:

```csharp
public decimal PeakTimePremiumIfElse(DateTime timeOfToll, bool inbound)
{
    if ((timeOfToll.DayOfWeek == DayOfWeek.Saturday) ||
        (timeOfToll.DayOfWeek == DayOfWeek.Sunday))
    {
        return 1.0m;
    }
    else
    {
        int hour = timeOfToll.Hour;
        if (hour < 6)
        {
            return 0.75m;
        }
        else if (hour < 10)
        {
            if (inbound)
            {
                return 2.0m;
            }
            else
            {
                return 1.0m;
            }
        }
        else if (hour < 16)
        {
            return 1.5m;
        }
        else if (hour < 20)
        {
            if (inbound)
            {
                return 1.0m;
            }
            else
            {
                return 2.0m;
            }
        }
        else // Overnight
        {
            return 0.75m;
        }
    }
}
```
The preceding code works correctly, but isn't readable. You have to chain through all the input cases and the nested `if` statements to reason about the code. Instead, you'll use pattern matching for this feature, but you'll integrate it with other techniques. You could build a single pattern match expression that accounts for all the combinations of direction, day of the week, and time. The result would be a complicated expression. It would be hard to read and difficult to understand. That makes it hard to ensure correctness. Instead, combine those methods to build a tuple of values that concisely describes all those states. Then use pattern matching to calculate a multiplier for the toll. The tuple contains three discrete conditions:

- The day is either a weekday or a weekend.
- The band of time when the toll is collected.
- The direction is into the city or out of the city.

The following table shows the combinations of input values and the peak pricing multiplier:

| Day        | Time         | Direction | Premium |
| ---------- | ------------ | --------- |--------:|
| Weekday    | morning rush | inbound   | x 2.00  |
| Weekday    | morning rush | outbound  | x 1.00  |
| Weekday    | daytime      | inbound   | x 1.50  |
| Weekday    | daytime      | outbound  | x 1.50  |
| Weekday    | evening rush | inbound   | x 1.00  |
| Weekday    | evening rush | outbound  | x 2.00  |
| Weekday    | overnight    | inbound   | x 0.75  |
| Weekday    | overnight    | outbound  | x 0.75  |
| Weekend    | morning rush | inbound   | x 1.00  |
| Weekend    | morning rush | outbound  | x 1.00  |
| Weekend    | daytime      | inbound   | x 1.00  |
| Weekend    | daytime      | outbound  | x 1.00  |
| Weekend    | evening rush | inbound   | x 1.00  |
| Weekend    | evening rush | outbound  | x 1.00  |
| Weekend    | overnight    | inbound   | x 1.00  |
| Weekend    | overnight    | outbound  | x 1.00  |

There are 16 different combinations of the three variables. By combining some of the conditions, you simplify the final switch expression.

The system that collects the tolls uses a `System.DateTime` structure for the time when the toll was collected. Build member methods that create the variables from the preceding table. The following function uses a pattern matching switch expression to express whether a `System.DateTime` represents a weekend or a weekday:

```csharp
private static bool IsWeekDay(DateTime timeOfToll) =>
    timeOfToll.DayOfWeek switch
    {
        DayOfWeek.Monday    => true,
        DayOfWeek.Tuesday   => true,
        DayOfWeek.Wednesday => true,
        DayOfWeek.Thursday  => true,
        DayOfWeek.Friday    => true,
        DayOfWeek.Saturday  => false,
        DayOfWeek.Sunday    => false
    };
```

That method is correct, but it's repetitious. You can simplify it, as shown in the following code:

```csharp
﻿using CommercialRegistration;
using ConsumerVehicleRegistration;
using LiveryRegistration;

namespace Calculators;

public class TollCalculator
{
    public decimal CalculateToll(object vehicle) =>
        vehicle switch
        {
            Car c => c.Passengers switch
            {
                0 => 2.00m + 0.5m,
                1 => 2.0m,
                2 => 2.0m - 0.5m,
                _ => 2.00m - 1.0m
            },

            Taxi t => t.Fares switch
            {
                0 => 3.50m + 1.00m,
                1 => 3.50m,
                2 => 3.50m - 0.50m,
                _ => 3.50m - 1.00m
            },

            Bus b when ((double)b.Riders / (double)b.Capacity) < 0.50 => 5.00m + 2.00m,
            Bus b when ((double)b.Riders / (double)b.Capacity) > 0.90 => 5.00m - 1.00m,
            Bus => 5.00m,

            DeliveryTruck t when (t.GrossWeightClass > 5000) => 10.00m + 5.00m,
            DeliveryTruck t when (t.GrossWeightClass < 3000) => 10.00m - 2.00m,
            DeliveryTruck => 10.00m,

            { } => throw new ArgumentException(message: "Not a known vehicle type", paramName: nameof(vehicle)),
            null => throw new ArgumentNullException(nameof(vehicle))
        };

    public decimal PeakTimePremium(DateTime timeOfToll, bool inbound) =>
        (IsWeekDay(timeOfToll), GetTimeBand(timeOfToll), inbound) switch
        {
            (true, TimeBand.Overnight, _) => 0.75m,
            (true, TimeBand.Daytime, _) => 1.5m,
            (true, TimeBand.MorningRush, true) => 2.0m,
            (true, TimeBand.EveningRush, false) => 2.0m,
            _ => 1.0m,
        };

    public decimal PeakTimePremiumIfElse(DateTime timeOfToll, bool inbound)
    {
        if ((timeOfToll.DayOfWeek == DayOfWeek.Saturday) ||
            (timeOfToll.DayOfWeek == DayOfWeek.Sunday))
        {
            return 1.0m;
        }
        else
        {
            int hour = timeOfToll.Hour;
            if (hour < 6)
            {
                return 0.75m;
            }
            else if (hour < 10)
            {
                if (inbound)
                {
                    return 2.0m;
                }
                else
                {
                    return 1.0m;
                }
            }
            else if (hour < 16)
            {
                return 1.5m;
            }
            else if (hour < 20)
            {
                if (inbound)
                {
                    return 1.0m;
                }
                else
                {
                    return 2.0m;
                }
            }
            else // Overnight
            {
                return 0.75m;
            }
        }
    }

    public decimal PeakTimePremiumFull(DateTime timeOfToll, bool inbound) =>
        (IsWeekDay(timeOfToll), GetTimeBand(timeOfToll), inbound) switch
        {
            (true, TimeBand.MorningRush, true) => 2.00m,
            (true, TimeBand.MorningRush, false) => 1.00m,
            (true, TimeBand.Daytime, true) => 1.50m,
            (true, TimeBand.Daytime, false) => 1.50m,
            (true, TimeBand.EveningRush, true) => 1.00m,
            (true, TimeBand.EveningRush, false) => 2.00m,
            (true, TimeBand.Overnight, true) => 0.75m,
            (true, TimeBand.Overnight, false) => 0.75m,
            (false, TimeBand.MorningRush, true) => 1.00m,
            (false, TimeBand.MorningRush, false) => 1.00m,
            (false, TimeBand.Daytime, true) => 1.00m,
            (false, TimeBand.Daytime, false) => 1.00m,
            (false, TimeBand.EveningRush, true) => 1.00m,
            (false, TimeBand.EveningRush, false) => 1.00m,
            (false, TimeBand.Overnight, true) => 1.00m,
            (false, TimeBand.Overnight, false) => 1.00m,
        };

    private static bool IsWeekDay(DateTime timeOfToll) =>
        timeOfToll.DayOfWeek switch
        {
            DayOfWeek.Saturday => false,
            DayOfWeek.Sunday => false,
            _ => true
        };

    private enum TimeBand
    {
        MorningRush,
        Daytime,
        EveningRush,
        Overnight
    }

    private static TimeBand GetTimeBand(DateTime timeOfToll) =>
        timeOfToll.Hour switch
        {
            < 6 or > 19 => TimeBand.Overnight,
            < 10 => TimeBand.MorningRush,
            < 16 => TimeBand.Daytime,
            _ => TimeBand.EveningRush,
        };
}
```
Next, add a similar function to categorize the time into the blocks:

```csharp
﻿using CommercialRegistration;
using ConsumerVehicleRegistration;
using LiveryRegistration;

namespace Calculators;

public class TollCalculator
{
    public decimal CalculateToll(object vehicle) =>
        vehicle switch
        {
            Car c => c.Passengers switch
            {
                0 => 2.00m + 0.5m,
                1 => 2.0m,
                2 => 2.0m - 0.5m,
                _ => 2.00m - 1.0m
            },

            Taxi t => t.Fares switch
            {
                0 => 3.50m + 1.00m,
                1 => 3.50m,
                2 => 3.50m - 0.50m,
                _ => 3.50m - 1.00m
            },

            Bus b when ((double)b.Riders / (double)b.Capacity) < 0.50 => 5.00m + 2.00m,
            Bus b when ((double)b.Riders / (double)b.Capacity) > 0.90 => 5.00m - 1.00m,
            Bus => 5.00m,

            DeliveryTruck t when (t.GrossWeightClass > 5000) => 10.00m + 5.00m,
            DeliveryTruck t when (t.GrossWeightClass < 3000) => 10.00m - 2.00m,
            DeliveryTruck => 10.00m,

            { } => throw new ArgumentException(message: "Not a known vehicle type", paramName: nameof(vehicle)),
            null => throw new ArgumentNullException(nameof(vehicle))
        };

    public decimal PeakTimePremium(DateTime timeOfToll, bool inbound) =>
        (IsWeekDay(timeOfToll), GetTimeBand(timeOfToll), inbound) switch
        {
            (true, TimeBand.Overnight, _) => 0.75m,
            (true, TimeBand.Daytime, _) => 1.5m,
            (true, TimeBand.MorningRush, true) => 2.0m,
            (true, TimeBand.EveningRush, false) => 2.0m,
            _ => 1.0m,
        };

    public decimal PeakTimePremiumIfElse(DateTime timeOfToll, bool inbound)
    {
        if ((timeOfToll.DayOfWeek == DayOfWeek.Saturday) ||
            (timeOfToll.DayOfWeek == DayOfWeek.Sunday))
        {
            return 1.0m;
        }
        else
        {
            int hour = timeOfToll.Hour;
            if (hour < 6)
            {
                return 0.75m;
            }
            else if (hour < 10)
            {
                if (inbound)
                {
                    return 2.0m;
                }
                else
                {
                    return 1.0m;
                }
            }
            else if (hour < 16)
            {
                return 1.5m;
            }
            else if (hour < 20)
            {
                if (inbound)
                {
                    return 1.0m;
                }
                else
                {
                    return 2.0m;
                }
            }
            else // Overnight
            {
                return 0.75m;
            }
        }
    }

    public decimal PeakTimePremiumFull(DateTime timeOfToll, bool inbound) =>
        (IsWeekDay(timeOfToll), GetTimeBand(timeOfToll), inbound) switch
        {
            (true, TimeBand.MorningRush, true) => 2.00m,
            (true, TimeBand.MorningRush, false) => 1.00m,
            (true, TimeBand.Daytime, true) => 1.50m,
            (true, TimeBand.Daytime, false) => 1.50m,
            (true, TimeBand.EveningRush, true) => 1.00m,
            (true, TimeBand.EveningRush, false) => 2.00m,
            (true, TimeBand.Overnight, true) => 0.75m,
            (true, TimeBand.Overnight, false) => 0.75m,
            (false, TimeBand.MorningRush, true) => 1.00m,
            (false, TimeBand.MorningRush, false) => 1.00m,
            (false, TimeBand.Daytime, true) => 1.00m,
            (false, TimeBand.Daytime, false) => 1.00m,
            (false, TimeBand.EveningRush, true) => 1.00m,
            (false, TimeBand.EveningRush, false) => 1.00m,
            (false, TimeBand.Overnight, true) => 1.00m,
            (false, TimeBand.Overnight, false) => 1.00m,
        };

    private static bool IsWeekDay(DateTime timeOfToll) =>
        timeOfToll.DayOfWeek switch
        {
            DayOfWeek.Saturday => false,
            DayOfWeek.Sunday => false,
            _ => true
        };

    private enum TimeBand
    {
        MorningRush,
        Daytime,
        EveningRush,
        Overnight
    }

    private static TimeBand GetTimeBand(DateTime timeOfToll) =>
        timeOfToll.Hour switch
        {
            < 6 or > 19 => TimeBand.Overnight,
            < 10 => TimeBand.MorningRush,
            < 16 => TimeBand.Daytime,
            _ => TimeBand.EveningRush,
        };
}
```
You add a private `enum` to convert each range of time to a discrete value. Then, the `GetTimeBand` method uses relational patterns and logical patterns. A relational pattern lets you test a numeric value using `<`, `>`, `<=`, or `>=`. Logical patterns combine other patterns: an `or` pattern tests if an expression matches one or more patterns, an `and` pattern tests that an expression matches two distinct patterns, and a `not` pattern tests that an expression doesn't match a pattern.

After you create those methods, you can use another `switch` expression with a **tuple pattern** — a positional pattern that matches each element of a tuple — to calculate the pricing premium. You could build a `switch` expression with all 16 arms:
