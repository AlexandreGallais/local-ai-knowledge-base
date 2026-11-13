---
title: "Using Constructors (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/using-constructors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Use constructors (C# programming guide)

When a class or struct is instantiated, the runtime calls its constructor. Constructors have the same name as the class or struct, and they usually initialize the data members of the new object.

In the following example, a class named `Taxi` is defined by using a simple constructor. This class is then instantiated with the `new` operator. The runtime invokes the `Taxi` constructor immediately after memory is allocated for the new object.

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
A constructor that takes no parameters is called a *parameterless constructor*. The runtime invokes the parameterless constructor when an object is instantiated using the `new` operator and no arguments are provided to `new`. A *primary constructor* specifies parameters that must be provided to initialize a new object. For more information, see Instance Constructors.

Unless the class is static, classes without constructors are given a public parameterless constructor by the C# compiler in order to enable class instantiation. For more information, see Static Classes and Static Class Members.

You can prevent a class from being instantiated by making the constructor private, as follows:

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
For more information, see Private Constructors.

Constructors for struct types resemble class constructors. When a struct type is instantiated with `new`, the runtime invokes a constructor. When a `struct` is set to its `default` value, the runtime initializes all memory in the struct to 0. Beginning with C# 11, field initializers in a `struct` type run in any declared constructor, and the compiler initializes any fields that the constructor doesn't assign, so you don't need to declare a parameterless constructor. For more information, see the Struct initialization and default values section of the Structure types article.

The following code uses the parameterless constructor for `System.Int32`, so that you're assured that the integer is initialized:

```csharp
int i = new int();
Console.WriteLine(i);
```

The following code, however, causes a compiler error because it doesn't use `new`, and because it tries to use an object that isn't initialized:

```csharp
int i;
Console.WriteLine(i);
```

Alternatively, some `struct` types (including all built-in numeric types) can be initialized or assigned and then used as in the following example:

```csharp
int a = 44;  // Initialize the value type...
int b;
b = 33;      // Or assign it before using it.
Console.WriteLine("{0}, {1}", a, b);
```

Both classes and structs can define constructors that take parameters, including primary constructors. Constructors that take parameters must be called through a `new` statement or a base statement. Classes and structs can also define multiple constructors, and neither is required to define a parameterless constructor. For example:

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
This class can be created by using either of the following statements:

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
A constructor can use the `base` keyword to call the constructor of a base class. For example:

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
In this example, the constructor for the base class is called before the block for the constructor executes. The `base` keyword can be used with or without parameters. Any parameters to the constructor can be used as parameters to `base`, or as part of an expression. For more information, see base.

In a derived class, if a base-class constructor isn't called explicitly by using the `base` keyword, the parameterless constructor, if there's one, is called implicitly. The following constructor declarations are effectively the same:
