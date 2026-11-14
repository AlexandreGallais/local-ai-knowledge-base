---
title: "Interfaces - define behavior for multiple types (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/types/interfaces.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Interfaces - define behavior for multiple types

> **Tip:**
> **New to developing software?** Start with the Get started tutorials first. You'll encounter interfaces once you need to define shared behavior across unrelated types.
>
> **Experienced in another language?** C# interfaces are similar to interfaces in Java or protocols in Swift. Skim the explicit implementation section for C#-specific patterns.

An *interface* defines a contract: a group of related methods, properties, events, and indexers that a `class` or `struct` must implement. Interfaces let a single type implement multiple contracts, which is important because C# doesn't support multiple inheritance of classes. Structs can't inherit from other structs or classes, so interfaces are the only way to add shared behavior across struct types.

The following example declares an interface and a class that implements it:

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
Any class or struct that implements `System.IEquatable`1` must provide an `Equals` method that matches the interface signature. You can count on any `IEquatable<T>` implementation to support equality comparison, regardless of the concrete type. That predictability is the core value of interfaces.

## Declare an interface

Define an interface with the `interface` keyword. By convention, interface names begin with a capital `I`:

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
Interfaces can contain methods, properties, events, and indexers. An interface can't contain instance fields, instance constructors, or finalizers. Members are `public` by default. You can specify other accessibility modifiers when needed. For example, use `internal` for members that shouldn't be visible outside the assembly.

## Implement an interface

A class or struct lists the interfaces it implements after a colon in its declaration. The class must provide an implementation for every member declared in the interface:

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
A class can implement multiple interfaces, separated by commas. It must provide implementations for all members from every interface it lists.

### Explicit implementation

Sometimes you need to implement an interface member without making it part of the class's public API. *Explicit implementation* qualifies the member with the interface name. The member is only accessible through a variable of the interface type:

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
Explicit implementation is useful when two interfaces declare members with the same name, or when you want to keep the class's public surface clean. For more detail, see Explicit Interface Implementation.
