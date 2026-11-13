---
title: "Using Constructors (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/using-constructors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Using Constructors (part 2 of 2)

```csharp
public class Taxi
{
    private string taxiTag;

    public Taxi(string tag) => taxiTag = tag;

    public override string ToString() => $"Taxi: {taxiTag}";
}

class TestTaxi
{
    static void Main()
    {
        Taxi t = new Taxi("Tag1345");
        Console.WriteLine(t);
    }
}

class NLog
{
    // Private Constructor:
    private NLog() { }

    public static double e = Math.E;  //2.71828...
}

public class Employee
{
    public int Salary;

    public Employee() { }

    public Employee(int annualSalary) => Salary = annualSalary;

    public Employee(int weeklySalary, int numberOfWeeks) => Salary = weeklySalary * numberOfWeeks;
}

class TestEmployee
{
    static void test()
    {
        Employee e1 = new Employee(30000);
        Employee e2 = new Employee(500, 52);
    }
}

namespace ManagerCallingBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int annualSalary)
            : base(annualSalary)
        {
            //Add further instructions here.
        }
    }
}

namespace ManagerImplicitlyCallingParameterlessBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int initialData)
        {
            //Add further instructions here.
        }
    }
}

namespace ManagerExplicitlyCallingParameterlessBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int initialData)
            : base()
        {
            //Add further instructions here.
        }
    }
}

namespace EmployeeCallingConstructorInSameClass
{
    public class Employee
    {
        public Employee() { }
        public Employee(int annualSalary) { }
    
        public Employee(int weeklySalary, int numberOfWeeks)
            : this(weeklySalary * numberOfWeeks)
        {
        }
    }
}
```
```csharp
public class Taxi
{
    private string taxiTag;

    public Taxi(string tag) => taxiTag = tag;

    public override string ToString() => $"Taxi: {taxiTag}";
}

class TestTaxi
{
    static void Main()
    {
        Taxi t = new Taxi("Tag1345");
        Console.WriteLine(t);
    }
}

class NLog
{
    // Private Constructor:
    private NLog() { }

    public static double e = Math.E;  //2.71828...
}

public class Employee
{
    public int Salary;

    public Employee() { }

    public Employee(int annualSalary) => Salary = annualSalary;

    public Employee(int weeklySalary, int numberOfWeeks) => Salary = weeklySalary * numberOfWeeks;
}

class TestEmployee
{
    static void test()
    {
        Employee e1 = new Employee(30000);
        Employee e2 = new Employee(500, 52);
    }
}

namespace ManagerCallingBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int annualSalary)
            : base(annualSalary)
        {
            //Add further instructions here.
        }
    }
}

namespace ManagerImplicitlyCallingParameterlessBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int initialData)
        {
            //Add further instructions here.
        }
    }
}

namespace ManagerExplicitlyCallingParameterlessBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int initialData)
            : base()
        {
            //Add further instructions here.
        }
    }
}

namespace EmployeeCallingConstructorInSameClass
{
    public class Employee
    {
        public Employee() { }
        public Employee(int annualSalary) { }
    
        public Employee(int weeklySalary, int numberOfWeeks)
            : this(weeklySalary * numberOfWeeks)
        {
        }
    }
}
```
If a base class doesn't offer a parameterless constructor, the derived class must make an explicit call to a base constructor by using `base`.

A constructor can invoke another constructor in the same object by using the `this` keyword. Like `base`, `this` can be used with or without parameters, and any parameters in the constructor are available as parameters to `this`, or as part of an expression. For example, the second constructor in the previous example can be rewritten using `this`:

```csharp
public class Taxi
{
    private string taxiTag;

    public Taxi(string tag) => taxiTag = tag;

    public override string ToString() => $"Taxi: {taxiTag}";
}

class TestTaxi
{
    static void Main()
    {
        Taxi t = new Taxi("Tag1345");
        Console.WriteLine(t);
    }
}

class NLog
{
    // Private Constructor:
    private NLog() { }

    public static double e = Math.E;  //2.71828...
}

public class Employee
{
    public int Salary;

    public Employee() { }

    public Employee(int annualSalary) => Salary = annualSalary;

    public Employee(int weeklySalary, int numberOfWeeks) => Salary = weeklySalary * numberOfWeeks;
}

class TestEmployee
{
    static void test()
    {
        Employee e1 = new Employee(30000);
        Employee e2 = new Employee(500, 52);
    }
}

namespace ManagerCallingBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int annualSalary)
            : base(annualSalary)
        {
            //Add further instructions here.
        }
    }
}

namespace ManagerImplicitlyCallingParameterlessBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int initialData)
        {
            //Add further instructions here.
        }
    }
}

namespace ManagerExplicitlyCallingParameterlessBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int initialData)
            : base()
        {
            //Add further instructions here.
        }
    }
}

namespace EmployeeCallingConstructorInSameClass
{
    public class Employee
    {
        public Employee() { }
        public Employee(int annualSalary) { }
    
        public Employee(int weeklySalary, int numberOfWeeks)
            : this(weeklySalary * numberOfWeeks)
        {
        }
    }
}
```
The use of the `this` keyword in the previous example causes the following constructor to be called:

```csharp
public class Taxi
{
    private string taxiTag;

    public Taxi(string tag) => taxiTag = tag;

    public override string ToString() => $"Taxi: {taxiTag}";
}

class TestTaxi
{
    static void Main()
    {
        Taxi t = new Taxi("Tag1345");
        Console.WriteLine(t);
    }
}

class NLog
{
    // Private Constructor:
    private NLog() { }

    public static double e = Math.E;  //2.71828...
}

public class Employee
{
    public int Salary;

    public Employee() { }

    public Employee(int annualSalary) => Salary = annualSalary;

    public Employee(int weeklySalary, int numberOfWeeks) => Salary = weeklySalary * numberOfWeeks;
}

class TestEmployee
{
    static void test()
    {
        Employee e1 = new Employee(30000);
        Employee e2 = new Employee(500, 52);
    }
}

namespace ManagerCallingBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int annualSalary)
            : base(annualSalary)
        {
            //Add further instructions here.
        }
    }
}

namespace ManagerImplicitlyCallingParameterlessBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int initialData)
        {
            //Add further instructions here.
        }
    }
}

namespace ManagerExplicitlyCallingParameterlessBaseConstructor
{
    public class Manager : Employee
    {
        public Manager(int initialData)
            : base()
        {
            //Add further instructions here.
        }
    }
}

namespace EmployeeCallingConstructorInSameClass
{
    public class Employee
    {
        public Employee() { }
        public Employee(int annualSalary) { }
    
        public Employee(int weeklySalary, int numberOfWeeks)
            : this(weeklySalary * numberOfWeeks)
        {
        }
    }
}
```
Constructors can be marked as `public`, `private`, `protected`, internal, protected internal or `private protected`. These access modifiers define how users of the class can construct the class. For more information, see Access Modifiers.

A constructor can be declared static by using the `static` keyword. Static constructors are called automatically,  before any static fields are accessed, and are used to initialize static class members. For more information, see Static Constructors.

## C# Language Specification

For more information, see Instance constructors and Static constructors in the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- The C# type system
- Constructors
- Finalizers
