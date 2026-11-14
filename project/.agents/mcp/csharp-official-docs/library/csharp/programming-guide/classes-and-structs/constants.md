---
title: "Constants"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/constants.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Constants (C# Programming Guide)

Constants are immutable values which are known at compile time and do not change for the life of the program. Constants are declared with the const modifier. Only the C# built-in types may be declared as `const`. Reference type constants other than `System.String` can only be initialized with a null value. User-defined types, including classes, structs, and arrays, cannot be `const`. Use the readonly modifier to create a class, struct, or array that is initialized one time at run time (for example in a constructor) and thereafter cannot be changed.

 C# does not support `const` methods, properties, or events.

 The enum type enables you to define named constants for integral built-in types (for example `int`, `uint`, `long`, and so on). For more information, see enum.

 Constants must be initialized as they are declared. For example:

 ```csharp
class Calendar1
{
    public const int Months = 12;
}

class Calendar2
{
    public const int Months = 12, Weeks = 52, Days = 365;
}

class Calendar3
{
    public const int Months = 12;
    public const int Weeks = 52;
    public const int Days = 365;

    public const double DaysPerWeek = (double) Days / (double) Weeks;
    public const double DaysPerMonth = (double) Days / (double) Months;
}

class Calendar
{
    public const int Months = 12;

    static void Main()
    {
        int birthstones = Calendar.Months;

        Console.WriteLine(birthstones.ToString());
    }
}
```

 In this example, the constant `Months` is always 12, and it cannot be changed even by the class itself. In fact, when the compiler encounters a constant identifier in C# source code (for example, `Months`), it substitutes the literal value directly into the intermediate language (IL) code that it produces. Because there is no variable address associated with a constant at run time, `const` fields cannot be passed by reference and cannot appear as an l-value in an expression.

> **Note:**
> Use caution when you refer to constant values defined in other code such as DLLs. If a new version of the DLL defines a new value for the constant, your program will still hold the old literal value until it is recompiled against the new version.

 Multiple constants of the same type can be declared at the same time, for example:

 ```csharp
class Calendar1
{
    public const int Months = 12;
}

class Calendar2
{
    public const int Months = 12, Weeks = 52, Days = 365;
}

class Calendar3
{
    public const int Months = 12;
    public const int Weeks = 52;
    public const int Days = 365;

    public const double DaysPerWeek = (double) Days / (double) Weeks;
    public const double DaysPerMonth = (double) Days / (double) Months;
}

class Calendar
{
    public const int Months = 12;

    static void Main()
    {
        int birthstones = Calendar.Months;

        Console.WriteLine(birthstones.ToString());
    }
}
```

 The expression that is used to initialize a constant can refer to another constant if it does not create a circular reference. For example:

 ```csharp
class Calendar1
{
    public const int Months = 12;
}

class Calendar2
{
    public const int Months = 12, Weeks = 52, Days = 365;
}

class Calendar3
{
    public const int Months = 12;
    public const int Weeks = 52;
    public const int Days = 365;

    public const double DaysPerWeek = (double) Days / (double) Weeks;
    public const double DaysPerMonth = (double) Days / (double) Months;
}

class Calendar
{
    public const int Months = 12;

    static void Main()
    {
        int birthstones = Calendar.Months;

        Console.WriteLine(birthstones.ToString());
    }
}
```

 Constants can be marked as public, private, protected, internal, protected internal or private protected. These access modifiers define how users of the class can access the constant. For more information, see Access Modifiers.

 Constants are accessed as if they were static fields because the value of the constant is the same for all instances of the type. You do not use the `static` keyword to declare them. Expressions that are not in the class that defines the constant must use the class name, a period, and the name of the constant to access the constant. For example:

 ```csharp
class Calendar1
{
    public const int Months = 12;
}

class Calendar2
{
    public const int Months = 12, Weeks = 52, Days = 365;
}

class Calendar3
{
    public const int Months = 12;
    public const int Weeks = 52;
    public const int Days = 365;

    public const double DaysPerWeek = (double) Days / (double) Weeks;
    public const double DaysPerMonth = (double) Days / (double) Months;
}

class Calendar
{
    public const int Months = 12;

    static void Main()
    {
        int birthstones = Calendar.Months;

        Console.WriteLine(birthstones.ToString());
    }
}
```

## C# Language Specification

 For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- Properties
- Types
- readonly
- Immutability in C# Part One: Kinds of Immutability
