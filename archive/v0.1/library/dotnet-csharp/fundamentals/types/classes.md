---
title: "C# classes (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/types/classes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# classes

> **Tip:**
> **New to developing software?** Start with the Get started tutorials first. You'll encounter classes once you need to model objects with behavior and state.
>
> **Experienced in another language?** C# classes are similar to classes in Java or C++. Skim the object initializers section for C#-specific patterns, and see Records for a data-focused alternative.

A *class* is a reference type that defines a blueprint for objects. When you create a variable of a class type, the variable holds a *reference* to an object on the managed heap. The variable doesn't hold the object data itself. Assigning a class variable to another variable copies the reference, so both variables point to the same object. Classes are the most common way to define custom types in C#. Use them when you need complex behavior, inheritance, or shared identity between references.

## When to use classes

Use a class when:

- The type has complex behavior or manages mutable state.
- You need inheritance to create a base class with derived specializations, or to create a derived type that extends an existing class.
- Instances represent a shared identity, not objects that happen to hold equal values. Two references to the same object should stay in sync.
- The type is large or long-lived and benefits from heap allocation and reference semantics.

## Declare a class

Define a class with the `class` keyword followed by the type name. An optional access modifier controls visibility. The default is `internal`. Specify `public` to allow callers from other assemblies to use your types.

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
The class body contains fields, properties, methods, and events, collectively called *class members*. The name must be a valid C# identifier name.

## Create objects

A class defines a type, but it isn't an object itself. You create an object (an *instance* of the class) with the `new` keyword:

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
The variable `customer` holds a reference to the object, not the object itself. You can assign multiple variables to the same object. Changes through one reference are visible through the other:

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
This reference-sharing behavior is one distinction between classes and structs. With structs, assignment copies the data. More importantly, classes support inheritance. You can build hierarchies where derived types reuse and specialize behavior from a base class. Structs can't participate in inheritance hierarchies. For more on the distinction, see Value types and reference types.

## Constructors and initialization

When you create an instance, you want its fields and properties initialized to useful values. C# offers several approaches: field initializers, constructor parameters, primary constructors, and required properties.

**Field initializers** set a default value directly on the field declaration:

```csharp
#pragma warning disable CS0414 // Field is assigned but never read (snippets demonstrate declaration patterns)

namespace FieldInit
{
    public class Container
    {
        private int _capacity = 10;
    }
}

namespace ConstructorInit
{
    public class Container
    {
        private int _capacity;

        public Container(int capacity) => _capacity = capacity;
    }
}

namespace PrimaryInit
{
    public class Container(int capacity)
    {
        private int _capacity = capacity;
    }
}
```
Field initializers assign a reasonable default to a field or property. This distinguishes it from the following approaches where callers can provide the initial value.

**Constructor parameters** require callers to provide values:

```csharp
#pragma warning disable CS0414 // Field is assigned but never read (snippets demonstrate declaration patterns)

namespace FieldInit
{
    public class Container
    {
        private int _capacity = 10;
    }
}

namespace ConstructorInit
{
    public class Container
    {
        private int _capacity;

        public Container(int capacity) => _capacity = capacity;
    }
}

namespace PrimaryInit
{
    public class Container(int capacity)
    {
        private int _capacity = capacity;
    }
}
```
**Primary constructors** add parameters directly to the class declaration. Those parameters are available throughout the class body:

```csharp
#pragma warning disable CS0414 // Field is assigned but never read (snippets demonstrate declaration patterns)

namespace FieldInit
{
    public class Container
    {
        private int _capacity = 10;
    }
}

namespace ConstructorInit
{
    public class Container
    {
        private int _capacity;

        public Container(int capacity) => _capacity = capacity;
    }
}

namespace PrimaryInit
{
    public class Container(int capacity)
    {
        private int _capacity = capacity;
    }
}
```
Primary constructors and field initializers can work together: the field initializer `_capacity = capacity` uses the primary-constructor parameter as its value. This pattern lets you capture constructor arguments in fields with a single, concise declaration.

**Required properties** enforce that callers set specific properties through an object initializer:

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
For a deeper look at constructor patterns, including parameter validation and constructor chaining, see Constructors.
