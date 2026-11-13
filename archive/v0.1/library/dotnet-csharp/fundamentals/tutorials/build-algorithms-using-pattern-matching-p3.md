---
title: "Tutorial: Build algorithms using pattern matching (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/build-algorithms-using-pattern-matching.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Build algorithms using pattern matching (part 3 of 3)

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
The preceding code works, but it can be simplified. All eight combinations for the weekend have the same toll. You can replace all eight with the following line:

```csharp
(false, _, _) => 1.0m,
```

Both inbound and outbound traffic have the same multiplier during the weekday daytime and overnight hours. You can replace those four switch arms with the following two lines:

```csharp
(true, TimeBand.Overnight, _) => 0.75m,
(true, TimeBand.Daytime, _)   => 1.5m,
```

The code should look like the following code after those two changes:

```csharp
public decimal PeakTimePremium(DateTime timeOfToll, bool inbound) =>
    (IsWeekDay(timeOfToll), GetTimeBand(timeOfToll), inbound) switch
    {
        (true, TimeBand.MorningRush, true)  => 2.00m,
        (true, TimeBand.MorningRush, false) => 1.00m,
        (true, TimeBand.Daytime,     _)     => 1.50m,
        (true, TimeBand.EveningRush, true)  => 1.00m,
        (true, TimeBand.EveningRush, false) => 2.00m,
        (true, TimeBand.Overnight,   _)     => 0.75m,
        (false, _,                   _)     => 1.00m,
    };
```

Finally, remove the two rush hour times that pay the regular price. After you remove those arms, replace the `false` with a discard (`_`) in the final switch arm. You get the following finished method:

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
This example highlights one of the advantages of pattern matching: the pattern branches are evaluated in order. If you rearrange them so that an earlier branch handles one of your later cases, the compiler warns you about the unreachable code. Those language rules made it easier to do the preceding simplifications with confidence that the code didn't change.

Pattern matching makes some types of code more readable and offers an alternative to object-oriented techniques when you can't add code to your classes. The cloud is causing data and functionality to live apart. The *shape* of the data and the *operations* on it aren't necessarily described together. In this tutorial, you consumed existing data in entirely different ways from its original function. Pattern matching gave you the ability to write functionality that overrode those types, even though you couldn't extend them.

## Next steps

You can download the finished code from the dotnet/samples GitHub repository. Explore patterns on your own and add this technique into your regular coding activities. Learning these techniques gives you another way to approach problems and create new functionality.

## See also

- Patterns
- `switch` expression
