---
title: "Tutorial: Pattern matching basics (part 4 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/pattern-matching-basics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Pattern matching basics (part 4 of 4)

## Implement the remaining rules

Now apply the same idea to `SetLowGate` and `SetWaterLevel`. Start by adding tests that expose invalid operations:

```csharp
﻿namespace pattern_matching_objects;

class Program
{
    static void Main(string[] args)
    {
        // Create a new canal lock:
        var canalGate = new CanalLock();

        // State should be doors closed, water level low:
        Console.WriteLine(canalGate);

        canalGate.SetLowGate(open: true);
        Console.WriteLine($"Open the lower gate:  {canalGate}");

        Console.WriteLine("Boat enters lock from lower gate");

        canalGate.SetLowGate(open: false);
        Console.WriteLine($"Close the lower gate:  {canalGate}");

        canalGate.SetWaterLevel(WaterLevel.High);
        Console.WriteLine($"Raise the water level: {canalGate}");

        canalGate.SetHighGate(open: true);
        Console.WriteLine($"Open the higher gate:  {canalGate}");

        Console.WriteLine("Boat exits lock at upper gate");
        Console.WriteLine("Boat enters lock from upper gate");

        canalGate.SetHighGate(open: false);
        Console.WriteLine($"Close the higher gate: {canalGate}");

        canalGate.SetWaterLevel(WaterLevel.Low);
        Console.WriteLine($"Lower the water level: {canalGate}");

        canalGate.SetLowGate(open: true);
        Console.WriteLine($"Open the lower gate:  {canalGate}");

        Console.WriteLine("Boat exits lock at upper gate");

        canalGate.SetLowGate(open: false);
        Console.WriteLine($"Close the lower gate:  {canalGate}");

        // Failure tests:
        Console.WriteLine("=============================================");
        Console.WriteLine("     Test invalid commands");
        // Open "wrong" gate (2 tests)
        try
        {
            canalGate = new CanalLock();
            canalGate.SetHighGate(open: true);
        }
        catch (InvalidOperationException)
        {
            Console.WriteLine("Invalid operation: Can't open the high gate. Water is low.");
        }
        Console.WriteLine($"Try to open upper gate: {canalGate}");
        Console.WriteLine();
        Console.WriteLine();
        try
        {
            canalGate = new CanalLock();
            canalGate.SetWaterLevel(WaterLevel.High);
            canalGate.SetLowGate(open: true);
        }
        catch (InvalidOperationException)
        {
            Console.WriteLine("invalid operation: Can't open the lower gate. Water is high.");
        }
        Console.WriteLine($"Try to open lower gate: {canalGate}");
        // change water level with gate open (2 tests)
        Console.WriteLine();
        Console.WriteLine();
        try
        {
            canalGate = new CanalLock();
            canalGate.SetLowGate(open: true);
            canalGate.SetWaterLevel(WaterLevel.High);
        }
        catch (InvalidOperationException)
        {
            Console.WriteLine("invalid operation: Can't raise water when the lower gate is open.");
        }
        Console.WriteLine($"Try to raise water with lower gate open: {canalGate}");
        Console.WriteLine();
        Console.WriteLine();
        try
        {
            canalGate = new CanalLock();
            canalGate.SetWaterLevel(WaterLevel.High);
            canalGate.SetHighGate(open: true);
            canalGate.SetWaterLevel(WaterLevel.Low);
        }
        catch (InvalidOperationException)
        {
            Console.WriteLine("invalid operation: Can't lower water when the high gate is open.");
        }
        Console.WriteLine($"Try to lower water with high gate open: {canalGate}");
    }
}
```
Run the app again. These tests fail, and the canal lock reaches invalid states. Implement the remaining methods by matching on the full state. `SetLowGate` is similar to `SetHighGate`. `SetWaterLevel` uses the current water level plus both gate positions:

```csharp
CanalLockWaterLevel = (newLevel, CanalLockWaterLevel, LowWaterGateOpen, HighWaterGateOpen) switch
{
    // arms go here
};
```

You have 16 combinations to consider. Start with the full table, write the switch arms, run the tests, and then simplify repeated outcomes.

Did you end up with methods similar to these?

```csharp
﻿namespace pattern_matching_objects;

public enum WaterLevel
{
    Low,
    High
}
public class CanalLock
{
    // Query canal lock state:
    public WaterLevel CanalLockWaterLevel { get; private set; } = WaterLevel.Low;
    public bool HighWaterGateOpen { get; private set; } = false;
    public bool LowWaterGateOpen { get; private set; } = false;

    // Change the upper gate.
    public void SetHighGate(bool open)
    {
        HighWaterGateOpen = (open, HighWaterGateOpen, CanalLockWaterLevel) switch
        {
            (false, _,    _)               => false,
            (true, _,     WaterLevel.High) => true,
            (true, false, WaterLevel.Low)  => throw new InvalidOperationException("Cannot open high gate when the water is low"),
            _                              => throw new InvalidOperationException("Invalid internal state"),
        };
    }

    // Change the lower gate.
    public void SetLowGate(bool open)
    {
        LowWaterGateOpen = (open, LowWaterGateOpen, CanalLockWaterLevel) switch
        {
            (false, _, _) => false,
            (true, _, WaterLevel.Low) => true,
            (true, false, WaterLevel.High) => throw new InvalidOperationException("Cannot open low gate when the water is high"),
            _ => throw new InvalidOperationException("Invalid internal state"),
        };
    }

    // Change water level.
    public void SetWaterLevel(WaterLevel newLevel)
    {
        CanalLockWaterLevel = (newLevel, CanalLockWaterLevel, LowWaterGateOpen, HighWaterGateOpen) switch
        {
            (WaterLevel.Low, WaterLevel.Low, true, false) => WaterLevel.Low,
            (WaterLevel.High, WaterLevel.High, false, true) => WaterLevel.High,
            (WaterLevel.Low, _, false, false) => WaterLevel.Low,
            (WaterLevel.High, _, false, false) => WaterLevel.High,
            (WaterLevel.Low, WaterLevel.High, false, true) => throw new InvalidOperationException("Cannot lower water when the high gate is open"),
            (WaterLevel.High, WaterLevel.Low, true, false) => throw new InvalidOperationException("Cannot raise water when the low gate is open"),
            _ => throw new InvalidOperationException("Invalid internal state"),
        };
    }

    public override string ToString() =>
        $"The lower gate is {(LowWaterGateOpen ? "Open" : "Closed")}. " +
        $"The upper gate is {(HighWaterGateOpen ? "Open" : "Closed")}. " +
        $"The water level is {CanalLockWaterLevel}.";
}
```
Your tests should now pass, and the canal lock should enforce its safety rules.

## Summary

In this tutorial, you used pattern matching to express how an object can change from one valid state to another. Patterns kept the allowed transitions together so you could compare them more easily than with a long series of branching statements. This approach works well when behavior depends on the combined shape of several state values.
