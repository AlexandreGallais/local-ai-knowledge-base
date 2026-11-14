---
title: "Interfaces - define behavior for multiple types (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/types/interfaces.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Interfaces - define behavior for multiple types (part 2 of 2)

## Interface inheritance

Interfaces can inherit from one or more other interfaces. A class that implements a derived interface must implement all members from the derived interface and all of its base interfaces:

```csharp
﻿namespace Interfaces;

interface IEquatable<T>
{
    bool Equals(T obj);
}

public class Car : IEquatable<Car>
{
    public string? Make { get; set; }
    public string? Model { get; set; }
    public string? Year { get; set; }

    public bool Equals(Car? car) =>
        car is not null &&
        (Make, Model, Year) == (car.Make, car.Model, car.Year);
}

interface ILogger
{
    void Log(string message);
    string Name { get; }
}

public class ConsoleLogger : ILogger
{
    public string Name => "Console";

    public void Log(string message) =>
        Console.WriteLine($"[{Name}] {message}");
}

public class FileLogger : ILogger
{
    public string Name => "File";

    public void Log(string message)
    {
        // In a real app, write to a file
        Console.WriteLine($"[{Name}] Writing to file: {message}");
    }
}

interface IMetric
{
    double GetDistance(); // Returns meters
}

interface IImperial
{
    double GetDistance(); // Returns feet
}

public class Runway(double meters) : IMetric, IImperial
{
    // Explicit implementation for IMetric
    double IMetric.GetDistance() => meters;

    // Explicit implementation for IImperial
    double IImperial.GetDistance() => meters * 3.28084;
}

interface IDrawable
{
    void Draw();
}

interface IShape : IDrawable
{
    double Area { get; }
}

public class Circle(double radius) : IShape
{
    public double Area => Math.PI * radius * radius;

    public void Draw() =>
        Console.WriteLine($"Drawing circle with area {Area:F2}");
}

internal class InternalConfiguration
{
    public string Setting { get; set; } = "";
}

internal interface ILoggable
{
    void Log(string message);
}

internal interface IConfigurable
{
    void Configure(InternalConfiguration config);
}

public class ServiceImplementation : ILoggable, IConfigurable
{
    // Implicit implementation: ILoggable uses only public types in its signature
    public void Log(string message) =>
        Console.WriteLine($"Log: {message}");

    // Explicit implementation: IConfigurable uses internal types
    void IConfigurable.Configure(InternalConfiguration config) =>
        Console.WriteLine($"Configured with: {config.Setting}");
}
```
A class that implements `IShape` can be implicitly converted to `IDrawable`, because `IShape` inherits from it.

## Interfaces vs. abstract classes

Both interfaces and abstract classes define contracts that derived types must fulfill.

- **Use an abstract class** when related types share state (fields), constructors, or non-public members. Abstract classes let you evolve a hierarchy by adding new members with default behavior without breaking existing derived types.
- **Use an interface** when a type needs to fulfill a contract that cuts across unrelated hierarchies, or when it needs to implement multiple contracts. Interfaces can't declare instance fields or constructors, so they're best suited for adding capabilities to types that already have a base class. For advanced scenarios, interfaces also support default member implementations.

A class can inherit from only one base class but can implement multiple interfaces. That distinction often makes interfaces the better choice for defining capabilities that cut across type hierarchies.

## Working with internal interfaces

You can typically implement an internal interface with public members, as long as all types in the interface signature are publicly accessible. When an interface uses internal types in its member signatures, you must use explicit implementation because the implementing member can't be public while exposing internal types:

```csharp
﻿namespace Interfaces;

interface IEquatable<T>
{
    bool Equals(T obj);
}

public class Car : IEquatable<Car>
{
    public string? Make { get; set; }
    public string? Model { get; set; }
    public string? Year { get; set; }

    public bool Equals(Car? car) =>
        car is not null &&
        (Make, Model, Year) == (car.Make, car.Model, car.Year);
}

interface ILogger
{
    void Log(string message);
    string Name { get; }
}

public class ConsoleLogger : ILogger
{
    public string Name => "Console";

    public void Log(string message) =>
        Console.WriteLine($"[{Name}] {message}");
}

public class FileLogger : ILogger
{
    public string Name => "File";

    public void Log(string message)
    {
        // In a real app, write to a file
        Console.WriteLine($"[{Name}] Writing to file: {message}");
    }
}

interface IMetric
{
    double GetDistance(); // Returns meters
}

interface IImperial
{
    double GetDistance(); // Returns feet
}

public class Runway(double meters) : IMetric, IImperial
{
    // Explicit implementation for IMetric
    double IMetric.GetDistance() => meters;

    // Explicit implementation for IImperial
    double IImperial.GetDistance() => meters * 3.28084;
}

interface IDrawable
{
    void Draw();
}

interface IShape : IDrawable
{
    double Area { get; }
}

public class Circle(double radius) : IShape
{
    public double Area => Math.PI * radius * radius;

    public void Draw() =>
        Console.WriteLine($"Drawing circle with area {Area:F2}");
}

internal class InternalConfiguration
{
    public string Setting { get; set; } = "";
}

internal interface ILoggable
{
    void Log(string message);
}

internal interface IConfigurable
{
    void Configure(InternalConfiguration config);
}

public class ServiceImplementation : ILoggable, IConfigurable
{
    // Implicit implementation: ILoggable uses only public types in its signature
    public void Log(string message) =>
        Console.WriteLine($"Log: {message}");

    // Explicit implementation: IConfigurable uses internal types
    void IConfigurable.Configure(InternalConfiguration config) =>
        Console.WriteLine($"Configured with: {config.Setting}");
}
```
In the preceding example, `IConfigurable` uses an internal type `InternalConfiguration` in its method signature. `ServiceImplementation` uses explicit implementation for that member. In contrast, `ILoggable` uses only public types (`string`) in its signature and can be implemented implicitly.

## Default interface members and static abstract members

Interfaces support two advanced features that go beyond basic <example-value>:

- **Default interface members** let an interface provide a method body. Implementing types inherit the default implementation and can optionally override it. For more information, see default interface methods.
- **Static abstract members** require implementing types to provide a static member, which is useful for defining operator contracts or factory patterns. For more information, see static abstract members in interfaces.

Both features are covered in the article on interfaces in the language reference. Most everyday interface usage involves the declaring and implementing patterns described earlier in this article.

## Interfaces summary

- An interface defines a contract of methods, properties, events, and indexers.
- A class or struct that implements an interface must provide implementations for all declared members (unless the interface provides a default implementation).
- You can't instantiate an interface directly.
- A class or struct can implement multiple interfaces. A class can inherit a base class and also implement one or more interfaces.
- Interface names conventionally start with `I`.
