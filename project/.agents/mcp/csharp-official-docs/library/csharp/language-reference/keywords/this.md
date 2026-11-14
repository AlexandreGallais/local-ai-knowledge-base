---
title: "The this keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/this.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The this keyword

The `this` keyword refers to the current instance of the class. It also serves as a modifier for the first parameter of an extension method.

> **Note:**
> This article discusses the use of `this` to refer to the receiver instance in the current member. For more information about its use in extension methods, see the `extension` keyword.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Common uses of `this` include:

- Qualifying members hidden by similar names, such as:
```csharp
public class Employee
{
    private string alias;
    private string name;

    public Employee(string name, string alias)
    {
        // Use this to qualify the members of the class
        // instead of the constructor parameters.
        this.name = name;
        this.alias = alias;
    }
}
```
- Passing an object as a parameter to other methods.

  ```csharp
  CalcTax(this);
  ```

- Declaring indexers, such as:
```csharp
public int this[int param]
{
    get => array[param];
    set => array[param] = value;
}
```
Static member functions exist at the class level and not as part of an object. They don't have a `this` pointer. Referring to `this` in a static method is an error.

In the following example, the parameters `name` and `alias` hide fields with the same names. The `this` keyword qualifies those variables as `Employee` class members. The `this` keyword also specifies the object for the method `CalcTax`, which belongs to another class.

```csharp
class Employee
{
    private string name;
    private string alias;

    // Constructor:
    public Employee(string name, string alias)
    {
        // Use this to qualify the fields, name and alias:
        this.name = name;
        this.alias = alias;
    }

    // Printing method:
    public void printEmployee()
    {
        Console.WriteLine($"""
        Name: {name}
        Alias: {alias}
        """);
        // Passing the object to the CalcTax method by using this:
        Console.WriteLine($"Taxes: {Tax.CalcTax(this):C}");
    }

    public decimal Salary { get; } = 3000.00m;
}

class Tax
{
    public static decimal CalcTax(Employee E)=> 0.08m * E.Salary;
}

class Program
{
    static void Main()
    {
        // Create objects:
        Employee E1 = new Employee("Mingda Pan", "mpan");

        // Display results:
        E1.printEmployee();
    }
}
/*
Output:
    Name: Mingda Pan
    Alias: mpan
    Taxes: $240.00
 */
```
## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- Member-access qualification preferences (IDE0003 and IDE0009)
- C# Keywords
- base
- Methods
