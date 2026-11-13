---
title: "The base keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/base.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The base keyword

Use the `base` keyword to access members of the base class from within a derived class. Use it if you want to:

- Call a method on the base class that's overridden by another method.
- Specify which base-class constructor to call when creating instances of the derived class.

You can access the base class only in a constructor, in an instance method, and in an instance property accessor. Using the `base` keyword from within a static method produces an error.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The base class you access is the base class you specify in the class declaration. For example, if you specify `class ClassB : ClassA`, you access the members of ClassA from ClassB, regardless of the base class of ClassA.

In this example, both the base class `Person` and the derived class `Employee` have a method named `GetInfo`. By using the `base` keyword, you can call the `GetInfo` method of the base class from within the derived class.

```csharp
public class Person
{
    protected string ssn = "444-55-6666";
    protected string name = "John L. Malgraine";

    public virtual void GetInfo()
    {
        Console.WriteLine($"Name: {name}");
        Console.WriteLine($"SSN: {ssn}");
    }
}
class Employee : Person
{
    public readonly string id = "ABC567EFG";
    public override void GetInfo()
    {
        // Calling the base class GetInfo method:
        base.GetInfo();
        Console.WriteLine($"Employee ID: {id}");
    }
}

class TestClass
{
    static void Main()
    {
        Employee E = new Employee();
        E.GetInfo();
    }
}
/*
Output
Name: John L. Malgraine
SSN: 444-55-6666
Employee ID: ABC567EFG
*/
```
This example shows how to specify the base-class constructor to call when creating instances of a derived class.

```csharp
public class BaseClass
{
    private int num;

    public BaseClass() => 
        Console.WriteLine("in BaseClass()");

    public BaseClass(int i)
    {
        num = i;
        Console.WriteLine("in BaseClass(int i)");
    }

    public int GetNum() => num;
}

public class DerivedClass : BaseClass
{
    // This constructor will call BaseClass.BaseClass()
    public DerivedClass() : base() { }

    // This constructor will call BaseClass.BaseClass(int i)
    public DerivedClass(int i) : base(i) { }

    static void Main()
    {
        DerivedClass md = new DerivedClass();
        DerivedClass md1 = new DerivedClass(1);
    }
}
/*
Output:
in BaseClass()
in BaseClass(int i)
*/
```
For more examples, see new, virtual, and override.

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- C# Keywords
- The `this` keyword
