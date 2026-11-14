---
title: "Explore closed hierarchies in C#"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/whats-new/tutorials/closed-hierarchies.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Explore C# closed hierarchies

A *closed hierarchy* restricts the direct subtypes of a base type to the assembly that declares it. Because the compiler knows the full set of subtypes, it can verify that a `switch` expression is exhaustive without a default arm. Closed hierarchies suit domains where the set of cases is stable and you want the compiler to flag every place that needs to change when you add a case.

In this tutorial, you build the sensor model of a smart-home telemetry monitor. You declare a closed hierarchy of sensor types, match the sensors exhaustively, and decide which cases to seal and which to leave open for extension.

In this tutorial, you:

>
> * Declare a closed hierarchy and match its cases exhaustively.
> * Decide which subtypes to seal and which to leave open.
> * Extend an open case from another assembly.
> * Use a closed hierarchy with generics.

## Prerequisites

This tutorial uses C# 15 closed hierarchies. To get started, you need:

- The .NET 11 SDK.
- An editor such as Visual Studio or Visual Studio Code with the C# Dev Kit.

Projects that target `net11.0` use C# 15 by default. You don't need to set `LangVersion` to `preview`.

## Create the sample solution

You build a class library, `SmartHome.Core`, that holds the closed hierarchy, a second library, `SmartHome.Extensions`, that extends an open case, and a console app, `SmartHome.App`, that drives them.

1. Open a terminal and run the following `dotnet` commands from a new folder previously created to store the code for tutorial:

   ```dotnetcli
   dotnet new sln -n TelemetryMonitor
   dotnet new classlib -f net11.0 -n SmartHome.Core
   dotnet new classlib -f net11.0 -n SmartHome.Extensions
   dotnet new console -f net11.0 -n SmartHome.App
   dotnet sln add SmartHome.Core SmartHome.Extensions SmartHome.App
   dotnet add SmartHome.Extensions reference SmartHome.Core
   dotnet add SmartHome.App reference SmartHome.Core SmartHome.Extensions
   ```

1. In each project file, verify that the target framework is .NET 11. The SDK selects C# 15 for this target:

   ```xml
   <PropertyGroup>
     <TargetFramework>net11.0</TargetFramework>
   </PropertyGroup>
   ```

## Declare a closed hierarchy

Start with the sensor model. The monitor supports a fixed set of sensor kinds, so you model them as a closed hierarchy in a single assembly.

1. In `SmartHome.Core`, add a file named `Sensors.cs` and declare the `Sensor` base type with the `closed` modifier and its three derived types:

```csharp
// A closed class restricts its direct subtypes to this assembly. A 'closed'
// class is implicitly abstract.
public closed record class Sensor;

// Seal the cases whose shape is final.
public sealed record class Temperature(double Celsius) : Sensor;
public sealed record class Humidity(double Percent) : Sensor;

// Leave a case unsealed as an "escape hatch" so other assemblies can specialize it.
public record class Contact(bool Open) : Sensor;
```
1. In the same file, add a method that matches every sensor with a switch expression:

```csharp
public static string Describe(Sensor sensor) => sensor switch
{
    Temperature temperature => $"{temperature.Celsius:F1}°C",
    Humidity humidity => $"{humidity.Percent:F0}% RH",
    Contact contact => contact.Open ? "open" : "closed",
    // No default arm is needed. Sensor is closed, so these cases are exhaustive.
};
```
1. Build the project to check the declarations and the exhaustive switch.

The `closed` modifier restricts the direct subtypes of `Sensor` to the declaring assembly, and a `closed` type is implicitly abstract, so you can't instantiate it directly. Because the compiler knows the complete set of subtypes, the switch needs no default arm. If you add a new sensor type later, the compiler reports that this switch no longer covers every case. That feedback is the central benefit of a closed hierarchy. The compiler points you to every match that needs to change. The `Temperature` and `Humidity` cases are sealed because their shape is final, while `Contact` stays open as an extension point that the next section covers. For more information, see the `closed` modifier and Closed hierarchy patterns.

## Decide what to seal

A subtype of a closed type isn't itself closed unless you declare it so. For each subtype, you have three choices:

- Mark it `closed` to continue the hierarchy: further subtypes are allowed, but only in the same assembly.
- Mark it `sealed` to end the hierarchy: no further subtypes are allowed anywhere.
- Leave it unmarked to make it open: other assemblies can derive from it, and those derived types still match the original case.

You left `Contact` unmarked for that reason, so now you extend it from another assembly.

1. In `SmartHome.Extensions`, add a file named `DoorContact.cs` that derives from the open `Contact` case:

```csharp
// This type lives in a different assembly than the closed Sensor hierarchy.
// It can't derive from Sensor directly, but it can extend the unsealed Contact
// leaf. A DoorContact still matches the 'Contact' case, so switches over Sensor
// stay exhaustive.
public sealed record class DoorContact(bool Open, string Door) : Contact(Open);
```
1. In `SmartHome.App`, add code that matches a `DoorContact` through the existing `Sensor` switch:

```csharp
// A DoorContact from another assembly still matches the Contact case.
Sensor frontDoor = new DoorContact(Open: false, Door: "Front");
Console.WriteLine($"Sensor: {SensorReporter.Describe(frontDoor)}");
```
A `DoorContact` can't derive from `Sensor` directly, because it's closed to other assemblies. `DoorContact` extends the open `Contact` leaf instead. A `DoorContact` still matches the `Contact` case, so the exhaustive switch over `Sensor` stays correct without any change. When you choose what to seal, weigh the trade-off: seal a case to lock its shape and keep the hierarchy fully known, or leave a case open to allow extension at the cost of a less precise match, because the switch sees the open base case rather than the derived type. For more information, see the `closed` modifier.

## Use a closed hierarchy with generics

A closed hierarchy can be generic. A report from the monitor is either a single value or a group of nested reports, so model it as a generic closed hierarchy.

1. In `SmartHome.Core`, add a file named `Report.cs` and declare the closed `Report<T>` base with its two cases. A derived type can't introduce a type parameter that the base type doesn't have, but it can supply fixed arguments for one or more of the base type's type parameters:

```csharp
// A generic closed hierarchy. Every type parameter of a derived type must appear
// in the base type, so a single derived construction exhausts each Report<T>.
public closed record class Report<T>;
public sealed record class Single<T>(T Value) : Report<T>;
public sealed record class Group<T>(Report<T> Left, Report<T> Right) : Report<T>;
```
1. Add a recursive method that accumulates the report by switching over its cases:

```csharp
public static int Count<T>(Report<T> report) => report switch
{
    Single<T> => 1,
    Group<T> group => Count(group.Left) + Count(group.Right),
    // Exhaustive: Report<T> is closed and both subtypes are handled.
};
```
The switch over `Single<T>` and `Group<T>` is exhaustive because `Report<T>` is closed, so the recursive accumulator needs no default arm. For more information, see Closed hierarchy patterns.

## Run the sample

The console app builds each sensor and report, then prints them through the exhaustive switches. Open `Program.cs` and add the following code:

```csharp
// Closed hierarchy with an exhaustive switch.
Sensor[] sensors =
[
    new Temperature(21.4),
    new Humidity(55),
    new Contact(Open: true),
];
foreach (Sensor sensor in sensors)
{
    Console.WriteLine($"Sensor: {SensorReporter.Describe(sensor)}");
}

// A DoorContact from another assembly still matches the Contact case.
Sensor frontDoor = new DoorContact(Open: false, Door: "Front");
Console.WriteLine($"Sensor: {SensorReporter.Describe(frontDoor)}");

// Generic closed hierarchy.
Report<string> report = new Group<string>(
    new Single<string>("Kitchen"),
    new Group<string>(new Single<string>("Garage"), new Single<string>("Attic")));
Console.WriteLine($"Report leaves: {ReportReporter.Count(report)}");
```
Then, run the app:

```dotnetcli
dotnet run --project SmartHome.App
```

The sensors and report print through their exhaustive switches:

```output
Sensor: 21.4°C
Sensor: 55% RH
Sensor: open
Sensor: closed
Report leaves: 3
```

## Summary

You built the sensor model of a smart-home telemetry monitor and, in the process, worked through closed-hierarchy scenarios. You:

- Declared a `closed Sensor` base type and matched its subtypes with an exhaustive switch that needs no default arm.
- Weighed the three choices for each subtype: `closed` to continue the hierarchy in the same assembly, `sealed` to end it, or unmarked to leave an extension point.
- Extended the open `Contact` case from a separate assembly with `DoorContact`, and confirmed it still matches the `Contact` case in the existing switch.
- Declared a generic closed hierarchy, `Report<T>`, and folded it with a recursive exhaustive switch.

## Related content

- Union types tutorial
- Pattern matching overview
- What's new in C# 15
