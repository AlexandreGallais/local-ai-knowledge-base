---
title: "Tutorial: Pattern matching basics (part 2 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/tutorials/pattern-matching-basics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Pattern matching basics (part 2 of 4)

## Define the class

Create a console project, and then add a class named `CanalLock`. Start by designing the public API and leaving the methods unimplemented:

```csharp
﻿// This file contains versions of the code used in the patterns & objects tutorial
namespace InterimSteps;

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
        throw new NotImplementedException();
    }

    // Change the lower gate.
    public void SetLowGate(bool open)
    {
        throw new NotImplementedException();
    }

    // Change water level.
    public void SetWaterLevel(WaterLevel newLevel)
    {
        throw new NotImplementedException();
    }

    public override string ToString() =>
        $"The lower gate is {(LowWaterGateOpen ? "Open" : "Closed")}. " +
        $"The upper gate is {(HighWaterGateOpen ? "Open" : "Closed")}. " +
        $"The water level is {CanalLockWaterLevel}.";
}

public class CanalLockV2
{
    // Query canal lock state:
    public WaterLevel CanalLockWaterLevel { get; private set; } = WaterLevel.Low;
    public bool HighWaterGateOpen { get; private set; } = false;
    public bool LowWaterGateOpen { get; private set; } = false;

    // Change the upper gate.
    public void SetHighGate(bool open)
    {
        HighWaterGateOpen = open;
    }

    // Change the lower gate.
    public void SetLowGate(bool open)
    {
        LowWaterGateOpen = open;
    }

    // Change water level.
    public void SetWaterLevel(WaterLevel newLevel)
    {
        CanalLockWaterLevel = newLevel;
    }
}

public class CanalLockV3
{
    // Query canal lock state:
    public WaterLevel CanalLockWaterLevel { get; private set; } = WaterLevel.Low;
    public bool HighWaterGateOpen { get; private set; } = false;
    public bool LowWaterGateOpen { get; private set; } = false;

    // Change the upper gate.
    public void SetHighGate(bool open)
    {
        if (open && (CanalLockWaterLevel == WaterLevel.High))
            HighWaterGateOpen = true;
        else if (open && (CanalLockWaterLevel == WaterLevel.Low))
            throw new InvalidOperationException("Cannot open high gate when the water is low");
    }

    private void SetHighGateV2(bool open)
    {
#pragma warning disable CS8524 // The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value.
        HighWaterGateOpen = (open, HighWaterGateOpen, CanalLockWaterLevel) switch
        {
            (false, false, WaterLevel.High) => false,
            (false, false, WaterLevel.Low) => false,
            (false, true, WaterLevel.High) => false,
            (false, true, WaterLevel.Low) => false, // should never happen
            (true, false, WaterLevel.High) => true,
            (true, false, WaterLevel.Low) => throw new InvalidOperationException("Cannot open high gate when the water is low"),
            (true, true, WaterLevel.High) => true,
            (true, true, WaterLevel.Low) => false, // should never happen
        };
#pragma warning restore CS8524 // The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value.
    }
}
```
The preceding code initializes the lock with both gates closed and the water level low. Next, add the following code to `Main` to guide your first implementation:

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
Now add a first implementation that changes each state value without enforcing the safety rules:

```csharp
﻿// This file contains versions of the code used in the patterns & objects tutorial
namespace InterimSteps;

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
        throw new NotImplementedException();
    }

    // Change the lower gate.
    public void SetLowGate(bool open)
    {
        throw new NotImplementedException();
    }

    // Change water level.
    public void SetWaterLevel(WaterLevel newLevel)
    {
        throw new NotImplementedException();
    }

    public override string ToString() =>
        $"The lower gate is {(LowWaterGateOpen ? "Open" : "Closed")}. " +
        $"The upper gate is {(HighWaterGateOpen ? "Open" : "Closed")}. " +
        $"The water level is {CanalLockWaterLevel}.";
}

public class CanalLockV2
{
    // Query canal lock state:
    public WaterLevel CanalLockWaterLevel { get; private set; } = WaterLevel.Low;
    public bool HighWaterGateOpen { get; private set; } = false;
    public bool LowWaterGateOpen { get; private set; } = false;

    // Change the upper gate.
    public void SetHighGate(bool open)
    {
        HighWaterGateOpen = open;
    }

    // Change the lower gate.
    public void SetLowGate(bool open)
    {
        LowWaterGateOpen = open;
    }

    // Change water level.
    public void SetWaterLevel(WaterLevel newLevel)
    {
        CanalLockWaterLevel = newLevel;
    }
}

public class CanalLockV3
{
    // Query canal lock state:
    public WaterLevel CanalLockWaterLevel { get; private set; } = WaterLevel.Low;
    public bool HighWaterGateOpen { get; private set; } = false;
    public bool LowWaterGateOpen { get; private set; } = false;

    // Change the upper gate.
    public void SetHighGate(bool open)
    {
        if (open && (CanalLockWaterLevel == WaterLevel.High))
            HighWaterGateOpen = true;
        else if (open && (CanalLockWaterLevel == WaterLevel.Low))
            throw new InvalidOperationException("Cannot open high gate when the water is low");
    }

    private void SetHighGateV2(bool open)
    {
#pragma warning disable CS8524 // The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value.
        HighWaterGateOpen = (open, HighWaterGateOpen, CanalLockWaterLevel) switch
        {
            (false, false, WaterLevel.High) => false,
            (false, false, WaterLevel.Low) => false,
            (false, true, WaterLevel.High) => false,
            (false, true, WaterLevel.Low) => false, // should never happen
            (true, false, WaterLevel.High) => true,
            (true, false, WaterLevel.Low) => throw new InvalidOperationException("Cannot open high gate when the water is low"),
            (true, true, WaterLevel.High) => true,
            (true, true, WaterLevel.Low) => false, // should never happen
        };
#pragma warning restore CS8524 // The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value.
    }
}
```
These first checks pass. You have the mechanics working. Next, add a test for the first failure condition. At the end of the previous sequence, both gates are closed and the water level is low. Try to open the upper gate:

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
That test fails because the upper gate opens when it shouldn't. A first fix could look like this:
