---
title: "abstract keyword (part 1 of 10)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/abstract.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# abstract (C# Reference)

The `abstract` modifier indicates that its target has a missing or incomplete implementation. Use the abstract modifier with classes, methods, properties, indexers, and events. Use the `abstract` modifier in a class declaration to indicate that a class is intended only to be a base class of other classes, not instantiated on its own. Non-abstract classes that derive from the abstract class must implement members marked as abstract.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Abstract classes can contain both abstract members (which have no implementation and must be overridden in derived classes) and fully implemented members (such as regular methods, properties, and constructors). This feature allows abstract classes to provide common functionality while still requiring derived classes to implement specific abstract members.

> **Note:**
> Interface members are `abstract` by default.

## Abstract class with mixed members

The following example demonstrates an abstract class that contains both implemented methods and abstract members:

```csharp
namespace LanguageKeywords;

public abstract class Vehicle
{
    protected string _brand;
    
    // Constructor - implemented method in abstract class
    public Vehicle(string brand) => _brand = brand;
    
    // Implemented method - provides functionality that all vehicles share
    public string GetInfo() => $"This is a {_brand} vehicle.";
    
    // Another implemented method
    public virtual void StartEngine() => Console.WriteLine($"{_brand} engine is starting...");
    
    // Abstract method - must be implemented by derived classes
    public abstract void Move();
    
    // Abstract property - must be implemented by derived classes  
    public abstract int MaxSpeed { get; }
}

public class Car : Vehicle
{
    public Car(string brand) : base(brand) { }
    
    // Implementation of abstract method
    public override void Move() => Console.WriteLine($"{_brand} car is driving on the road.");
    
    // Implementation of abstract property
    public override int MaxSpeed => 200;
}

public class Boat : Vehicle
{
    public Boat(string brand) : base(brand) { }
    
    // Implementation of abstract method
    public override void Move() => Console.WriteLine($"{_brand} boat is sailing on the water.");
    
    // Implementation of abstract property
    public override int MaxSpeed => 50;
}

public class AbstractExample
{
    public static void Examples()
    {
        // Cannot instantiate abstract class: Vehicle v = new Vehicle("Generic"); // Error!
        
        Car car = new Car("Toyota");
        Boat boat = new Boat("Yamaha");
        
        // Using implemented methods from abstract class
        Console.WriteLine(car.GetInfo());
        car.StartEngine();
        
        // Using abstract methods implemented in derived class
        car.Move();
        Console.WriteLine($"Max speed: {car.MaxSpeed} km/h");
        
        Console.WriteLine();
        
        Console.WriteLine(boat.GetInfo());
        boat.StartEngine();
        boat.Move();
        Console.WriteLine($"Max speed: {boat.MaxSpeed} km/h");
    }
}

class Program
{
    static void Main()
    {
        AbstractExample.Examples();
    }
}
/* Output:
This is a Toyota vehicle.
Toyota engine is starting...
Toyota car is driving on the road.
Max speed: 200 km/h

This is a Yamaha vehicle.
Yamaha engine is starting...
Yamaha boat is sailing on the water.
Max speed: 50 km/h
*/
```
In this example, the `Vehicle` abstract class provides:

- **Implemented members**: `GetInfo()` method, `StartEngine()` method, and constructor - these members provide common functionality for all vehicles.
- **Abstract members**: `Move()` method and `MaxSpeed` property - these members must be implemented by each specific vehicle type.

This design allows the abstract class to provide shared functionality while ensuring that derived classes implement vehicle-specific behavior.
