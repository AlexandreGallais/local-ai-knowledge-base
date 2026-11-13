---
title: "C# record types (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/types/records.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# record types (part 2 of 2)

## Positional records and deconstruction

Positional records generate a `Deconstruct` method that you use to extract property values into individual variables:

```csharp
namespace FirstRecord;

public record Person(string FirstName, string LastName);

public record Product
{
    public required string Name { get; init; }
    public decimal Price { get; set; }
}

public record Student(string FirstName, string LastName, int GradeLevel)
    : Person(FirstName, LastName);

public static class Program
{
    public static void Main()
    {
        var person = new Person("Grace", "Hopper");
        var (first, last) = person;
        Console.WriteLine($"{first} {last}");
        // Grace Hopper

        var student = new Student("Grace", "Hopper", 12);
        Console.WriteLine(student);
        // Student { FirstName = Grace, LastName = Hopper, GradeLevel = 12 }
        Console.WriteLine(person == student); // False — different runtime types
    }
}
```
Deconstruction works with both `record class` and `record struct` types. You can use it in assignments, `foreach` loops, and pattern matching.

## Record inheritance

A `record class` can inherit from another `record class`. A record can't inherit from a regular class, and a class can't inherit from a record:

```csharp
namespace FirstRecord;

public record Person(string FirstName, string LastName);

public record Product
{
    public required string Name { get; init; }
    public decimal Price { get; set; }
}

public record Student(string FirstName, string LastName, int GradeLevel)
    : Person(FirstName, LastName);

public static class Program
{
    public static void Main()
    {
        var person = new Person("Grace", "Hopper");
        var (first, last) = person;
        Console.WriteLine($"{first} {last}");
        // Grace Hopper

        var student = new Student("Grace", "Hopper", 12);
        Console.WriteLine(student);
        // Student { FirstName = Grace, LastName = Hopper, GradeLevel = 12 }
        Console.WriteLine(person == student); // False — different runtime types
    }
}
```
Value equality checks include the run-time type, so a `Person` and a `Student` with the same `FirstName` and `LastName` aren't considered equal. Record structs don't support inheritance because structs can't inherit from other types.

## See also

- Type system overview
- Classes
- Structs
- Records (C# reference)
