---
title: "C# classes (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/types/classes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# classes (part 2 of 2)

## Static classes

A `static` class can't be instantiated and contains only static members. Use static classes to organize utility methods that don't operate on instance data:

```csharp
﻿// --- Top-level statements ---

var customer = new Customer("Allison");
Console.WriteLine(customer.Name); // Allison

var c1 = new Customer("Grace");
var c2 = c1; // both variables reference the same object

c2.Name = "Hopper";
Console.WriteLine(c1.Name); // Hopper — c1 sees the change made through c2

// var missing = new Person(); // Error: required properties not set
var person = new Person { FirstName = "Grace", LastName = "Hopper" };
Console.WriteLine($"{person.FirstName} {person.LastName}"); // Grace Hopper

double circumference = MathHelpers.CircleCircumference(5.0);
Console.WriteLine($"Circumference: {circumference:F2}"); // Circumference: 31.42

var options = new ConnectionOptions
{
    Host = "db.example.com",
    Port = 5432,
    UseSsl = true
};
Console.WriteLine($"{options.Host}:{options.Port} (SSL: {options.UseSsl})");
// db.example.com:5432 (SSL: True)

var manager = new Manager("Satya", "Engineering");
Console.WriteLine($"{manager.Name} manages {manager.Department}");
// Satya manages Engineering

// --- Type declarations ---

public class Customer
{
    public string Name { get; set; }

    public Customer(string name) => Name = name;
}

public class Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}

static class MathHelpers
{
    public static double CircleCircumference(double radius) =>
        2 * Math.PI * radius;
}

class ConnectionOptions
{
    public string Host { get; init; } = "localhost";
    public int Port { get; init; } = 80;
    public bool UseSsl { get; init; }
}

class Employee
{
    public string Name { get; set; }
    public Employee(string name) => Name = name;
}

class Manager : Employee
{
    public string Department { get; set; }

    public Manager(string name, string department) : base(name) =>
        Department = department;
}
```
```csharp
﻿// --- Top-level statements ---

var customer = new Customer("Allison");
Console.WriteLine(customer.Name); // Allison

var c1 = new Customer("Grace");
var c2 = c1; // both variables reference the same object

c2.Name = "Hopper";
Console.WriteLine(c1.Name); // Hopper — c1 sees the change made through c2

// var missing = new Person(); // Error: required properties not set
var person = new Person { FirstName = "Grace", LastName = "Hopper" };
Console.WriteLine($"{person.FirstName} {person.LastName}"); // Grace Hopper

double circumference = MathHelpers.CircleCircumference(5.0);
Console.WriteLine($"Circumference: {circumference:F2}"); // Circumference: 31.42

var options = new ConnectionOptions
{
    Host = "db.example.com",
    Port = 5432,
    UseSsl = true
};
Console.WriteLine($"{options.Host}:{options.Port} (SSL: {options.UseSsl})");
// db.example.com:5432 (SSL: True)

var manager = new Manager("Satya", "Engineering");
Console.WriteLine($"{manager.Name} manages {manager.Department}");
// Satya manages Engineering

// --- Type declarations ---

public class Customer
{
    public string Name { get; set; }

    public Customer(string name) => Name = name;
}

public class Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}

static class MathHelpers
{
    public static double CircleCircumference(double radius) =>
        2 * Math.PI * radius;
}

class ConnectionOptions
{
    public string Host { get; init; } = "localhost";
    public int Port { get; init; } = 80;
    public bool UseSsl { get; init; }
}

class Employee
{
    public string Name { get; set; }
    public Employee(string name) => Name = name;
}

class Manager : Employee
{
    public string Department { get; set; }

    public Manager(string name, string department) : base(name) =>
        Department = department;
}
```
The .NET class library includes many static classes, such as `System.Math` and `System.Console`. A static class is implicitly sealed. You can't derive from it or instantiate it.

## Object initializers

*Object initializers* let you set properties when you create an object, without writing a constructor for every combination of values:

```csharp
﻿// --- Top-level statements ---

var customer = new Customer("Allison");
Console.WriteLine(customer.Name); // Allison

var c1 = new Customer("Grace");
var c2 = c1; // both variables reference the same object

c2.Name = "Hopper";
Console.WriteLine(c1.Name); // Hopper — c1 sees the change made through c2

// var missing = new Person(); // Error: required properties not set
var person = new Person { FirstName = "Grace", LastName = "Hopper" };
Console.WriteLine($"{person.FirstName} {person.LastName}"); // Grace Hopper

double circumference = MathHelpers.CircleCircumference(5.0);
Console.WriteLine($"Circumference: {circumference:F2}"); // Circumference: 31.42

var options = new ConnectionOptions
{
    Host = "db.example.com",
    Port = 5432,
    UseSsl = true
};
Console.WriteLine($"{options.Host}:{options.Port} (SSL: {options.UseSsl})");
// db.example.com:5432 (SSL: True)

var manager = new Manager("Satya", "Engineering");
Console.WriteLine($"{manager.Name} manages {manager.Department}");
// Satya manages Engineering

// --- Type declarations ---

public class Customer
{
    public string Name { get; set; }

    public Customer(string name) => Name = name;
}

public class Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}

static class MathHelpers
{
    public static double CircleCircumference(double radius) =>
        2 * Math.PI * radius;
}

class ConnectionOptions
{
    public string Host { get; init; } = "localhost";
    public int Port { get; init; } = 80;
    public bool UseSsl { get; init; }
}

class Employee
{
    public string Name { get; set; }
    public Employee(string name) => Name = name;
}

class Manager : Employee
{
    public string Department { get; set; }

    public Manager(string name, string department) : base(name) =>
        Department = department;
}
```
```csharp
﻿// --- Top-level statements ---

var customer = new Customer("Allison");
Console.WriteLine(customer.Name); // Allison

var c1 = new Customer("Grace");
var c2 = c1; // both variables reference the same object

c2.Name = "Hopper";
Console.WriteLine(c1.Name); // Hopper — c1 sees the change made through c2

// var missing = new Person(); // Error: required properties not set
var person = new Person { FirstName = "Grace", LastName = "Hopper" };
Console.WriteLine($"{person.FirstName} {person.LastName}"); // Grace Hopper

double circumference = MathHelpers.CircleCircumference(5.0);
Console.WriteLine($"Circumference: {circumference:F2}"); // Circumference: 31.42

var options = new ConnectionOptions
{
    Host = "db.example.com",
    Port = 5432,
    UseSsl = true
};
Console.WriteLine($"{options.Host}:{options.Port} (SSL: {options.UseSsl})");
// db.example.com:5432 (SSL: True)

var manager = new Manager("Satya", "Engineering");
Console.WriteLine($"{manager.Name} manages {manager.Department}");
// Satya manages Engineering

// --- Type declarations ---

public class Customer
{
    public string Name { get; set; }

    public Customer(string name) => Name = name;
}

public class Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}

static class MathHelpers
{
    public static double CircleCircumference(double radius) =>
        2 * Math.PI * radius;
}

class ConnectionOptions
{
    public string Host { get; init; } = "localhost";
    public int Port { get; init; } = 80;
    public bool UseSsl { get; init; }
}

class Employee
{
    public string Name { get; set; }
    public Employee(string name) => Name = name;
}

class Manager : Employee
{
    public string Department { get; set; }

    public Manager(string name, string department) : base(name) =>
        Department = department;
}
```
Object initializers work with any accessible property that has a `set` or `init` accessor. They combine naturally with `required` properties and with constructors that accept some parameters while letting the caller set others.

When the property is a *collection*, you can use a Collection expressions (C# reference) to initialize that object.

## Inheritance

Classes support *inheritance*. You can define a new class that reuses, extends, or modifies the behavior of an existing class. The class you inherit from is the *base class*, and the new class is the *derived class*:

```csharp
﻿// --- Top-level statements ---

var customer = new Customer("Allison");
Console.WriteLine(customer.Name); // Allison

var c1 = new Customer("Grace");
var c2 = c1; // both variables reference the same object

c2.Name = "Hopper";
Console.WriteLine(c1.Name); // Hopper — c1 sees the change made through c2

// var missing = new Person(); // Error: required properties not set
var person = new Person { FirstName = "Grace", LastName = "Hopper" };
Console.WriteLine($"{person.FirstName} {person.LastName}"); // Grace Hopper

double circumference = MathHelpers.CircleCircumference(5.0);
Console.WriteLine($"Circumference: {circumference:F2}"); // Circumference: 31.42

var options = new ConnectionOptions
{
    Host = "db.example.com",
    Port = 5432,
    UseSsl = true
};
Console.WriteLine($"{options.Host}:{options.Port} (SSL: {options.UseSsl})");
// db.example.com:5432 (SSL: True)

var manager = new Manager("Satya", "Engineering");
Console.WriteLine($"{manager.Name} manages {manager.Department}");
// Satya manages Engineering

// --- Type declarations ---

public class Customer
{
    public string Name { get; set; }

    public Customer(string name) => Name = name;
}

public class Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}

static class MathHelpers
{
    public static double CircleCircumference(double radius) =>
        2 * Math.PI * radius;
}

class ConnectionOptions
{
    public string Host { get; init; } = "localhost";
    public int Port { get; init; } = 80;
    public bool UseSsl { get; init; }
}

class Employee
{
    public string Name { get; set; }
    public Employee(string name) => Name = name;
}

class Manager : Employee
{
    public string Department { get; set; }

    public Manager(string name, string department) : base(name) =>
        Department = department;
}
```
A class can inherit from one base class and implement multiple interfaces. Derived classes inherit all members of the base class except constructors. For more information, see Inheritance and Interfaces.

## See also

- Type system overview
- Structs
- Records
- Interfaces
- Inheritance
