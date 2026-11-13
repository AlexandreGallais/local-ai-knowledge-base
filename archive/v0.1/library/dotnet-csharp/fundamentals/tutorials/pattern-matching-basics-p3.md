---
title: "Tutorial: Pattern matching basics (part 3 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/pattern-matching-basics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Pattern matching basics (part 3 of 4)

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
Your tests pass again. But as you add more conditions, you accumulate more `if` statements. The code gets harder to scan because each rule is separated from the others.

## Implement the commands with patterns

A clearer option is to use *patterns* to describe the valid combinations directly. In the next step, each switch expression uses one tuple as the *pattern input*. C# evaluates that tuple once, and each switch arm tests the current gate state, the water level, and the requested new setting.

For the upper gate, you can summarize those combinations like this:

| New setting | Gate state | Water level | Result |
| --- | --- | --- | --- |
| Closed | Closed | High | Closed |
| Closed | Closed | Low | Closed |
| Closed | Open | High | Closed |
| ~~Closed~~ | ~~Open~~ | ~~Low~~ | ~~Closed~~ |
| Open | Closed | High | Open |
| Open | Closed | Low | Closed (error) |
| Open | Open | High | Open |
| ~~Open~~ | ~~Open~~ | ~~Low~~ | ~~Closed (error)~~ |

The struck-through rows represent invalid internal states. The switch expression can encode the valid transitions directly. `false` still means the gate is closed:

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
Try this version. Your tests pass. The compiler also warns that the switch expression isn't *exhaustive* — it doesn't cover every possible value — because `WaterLevel` is an enum, and C# allows any value of the enum's underlying numeric type to be cast to that enum, even one without a named member. Add a final arm with the discard pattern (`_`) to handle those impossible internal states:

```csharp
_ => throw new InvalidOperationException("Invalid internal state"),
```

That arm must be last because the discard pattern matches every remaining input.

You can then simplify the earlier arms. Closing the gate is always allowed, so one arm can replace the four separate closed cases:

```csharp
(false, _, _) => false,
```

You can also combine the valid open cases and preserve the one safety error:

```csharp
(true, _, WaterLevel.High) => true,
(true, false, WaterLevel.Low) => throw new InvalidOperationException("Cannot open high gate when the water is low"),
_ => throw new InvalidOperationException("Invalid internal state"),
```

Run the program again. The tests still pass. Here is the final `SetHighGate` implementation:

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
