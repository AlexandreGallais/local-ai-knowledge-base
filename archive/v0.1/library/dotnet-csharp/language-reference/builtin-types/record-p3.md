---
title: "Records (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/record.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Records (part 3 of 3)

## Inheritance

This section only applies to `record class` types.

A record can inherit from another record. However, a record can't inherit from a class, and a class can't inherit from a record.

Starting in C# 15, a `record class` can use the `closed` modifier to restrict direct derivation to its declaring assembly. Consumers can then write exhaustive `switch` expressions over its direct descendants without a default arm. For details, see Closed hierarchy patterns. The `closed` modifier doesn't apply to `record struct` types, because struct records can't be abstract.

### Positional parameters in derived record types

The derived record declares positional parameters for all the parameters in the base record primary constructor. The base record declares and initializes those properties. The derived record doesn't hide them, but only creates and initializes properties for parameters that aren't declared in its base record.

The following example illustrates inheritance with positional property syntax:

```csharp
public abstract record Person(string FirstName, string LastName);
public record Teacher(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);
public static void Main()
{
    Person teacher = new Teacher("Nancy", "Davolio", 3);
    Console.WriteLine(teacher);
    // output: Teacher { FirstName = Nancy, LastName = Davolio, Grade = 3 }
}
```
### Equality in inheritance hierarchies

This section applies to `record class` types, but not `record struct` types. For two record variables to be equal, the run-time type must be equal. The types of the containing variables might be different. Inherited equality comparison is illustrated in the following code example:

```csharp
public abstract record Person(string FirstName, string LastName);
public record Teacher(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);
public record Student(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);
public static void Main()
{
    Person teacher = new Teacher("Nancy", "Davolio", 3);
    Person student = new Student("Nancy", "Davolio", 3);
    Console.WriteLine(teacher == student); // output: False

    Student student2 = new Student("Nancy", "Davolio", 3);
    Console.WriteLine(student2 == student); // output: True
}
```
In the example, all variables are declared as `Person`, even when the instance is a derived type of either `Student` or `Teacher`. The instances have the same properties and the same property values. But `student == teacher` returns `False` although both are `Person`-type variables, and `student == student2` returns `True` although one is a `Person` variable and one is a `Student` variable. The equality test depends on the runtime type of the actual object, not the declared type of the variable.

To implement this behavior, the compiler synthesizes an `EqualityContract` property that returns a `System.Type` object that matches the type of the record. The `EqualityContract` enables the equality methods to compare the runtime type of objects when they're checking for equality. If the base type of a record is `object`, this property is `virtual`. If the base type is another record type, this property is an override. If the record type is `sealed`, this property is effectively `sealed` because the type is `sealed`.

When code compares two instances of a derived type, the synthesized equality methods check all data members of the base and derived types for equality. The synthesized `GetHashCode` method uses the `GetHashCode` method from all data members declared in the base type and the derived record type. The data members of a `record` include all declared fields and the compiler-synthesized backing field for any automatically implemented properties.

### `with` expressions in derived records

The result of a `with` expression has the same run-time type as the expression's operand. All properties of the run-time type get copied, but you can only set properties of the compile-time type, as the following example shows:

```csharp
public record Point(int X, int Y)
{
    public int Zbase { get; set; }
};
public record NamedPoint(string Name, int X, int Y) : Point(X, Y)
{
    public int Zderived { get; set; }
};

public static void Main()
{
    Point p1 = new NamedPoint("A", 1, 2) { Zbase = 3, Zderived = 4 };

    Point p2 = p1 with { X = 5, Y = 6, Zbase = 7 }; // Can't set Name or Zderived
    Console.WriteLine(p2 is NamedPoint);  // output: True
    Console.WriteLine(p2);
    // output: NamedPoint { X = 5, Y = 6, Zbase = 7, Name = A, Zderived = 4 }

    Point p3 = (NamedPoint)p1 with { Name = "B", X = 5, Y = 6, Zbase = 7, Zderived = 8 };
    Console.WriteLine(p3);
    // output: NamedPoint { X = 5, Y = 6, Zbase = 7, Name = B, Zderived = 8 }
}
```
### `PrintMembers` formatting in derived records

The synthesized `PrintMembers` method of a derived record type calls the base implementation. The result is that the `ToString` output includes all public properties and fields of both derived and base types, as shown in the following example:

```csharp
public abstract record Person(string FirstName, string LastName);
public record Teacher(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);
public record Student(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);

public static void Main()
{
    Person teacher = new Teacher("Nancy", "Davolio", 3);
    Console.WriteLine(teacher);
    // output: Teacher { FirstName = Nancy, LastName = Davolio, Grade = 3 }
}
```
You can provide your own implementation of the `PrintMembers` method. If you do, use the following signature:

* For a `sealed` record that derives from `object` (doesn't declare a base record): `private bool PrintMembers(StringBuilder builder)`;
* For a `sealed` record that derives from another record (the enclosing type is `sealed`, so the method is effectively `sealed`): `protected override bool PrintMembers(StringBuilder builder)`;
* For a record that isn't `sealed` and derives from object: `protected virtual bool PrintMembers(StringBuilder builder);`
* For a record that isn't `sealed` and derives from another record: `protected override bool PrintMembers(StringBuilder builder);`

Here's an example of code that replaces the synthesized `PrintMembers` methods, one for a record type that derives from object, and one for a record type that derives from another record:

```csharp
public abstract record Person(string FirstName, string LastName, string[] PhoneNumbers)
{
    protected virtual bool PrintMembers(StringBuilder stringBuilder)
    {
        stringBuilder.Append($"FirstName = {FirstName}, LastName = {LastName}, ");
        stringBuilder.Append($"PhoneNumber1 = {PhoneNumbers[0]}, PhoneNumber2 = {PhoneNumbers[1]}");
        return true;
    }
}

public record Teacher(string FirstName, string LastName, string[] PhoneNumbers, int Grade)
    : Person(FirstName, LastName, PhoneNumbers)
{
    protected override bool PrintMembers(StringBuilder stringBuilder)
    {
        if (base.PrintMembers(stringBuilder))
        {
            stringBuilder.Append(", ");
        }
        ;
        stringBuilder.Append($"Grade = {Grade}");
        return true;
    }
};

public static void Main()
{
    Person teacher = new Teacher("Nancy", "Davolio", new string[2] { "555-1234", "555-6789" }, 3);
    Console.WriteLine(teacher);
    // output: Teacher { FirstName = Nancy, LastName = Davolio, PhoneNumber1 = 555-1234, PhoneNumber2 = 555-6789, Grade = 3 }
}
```
> **Note:**
> The compiler synthesizes `PrintMembers` in derived records even when a base record sealed the `ToString` method. You can also create your own implementation of `PrintMembers`.

### Deconstructor behavior in derived records

The `Deconstruct` method of a derived record returns the values of all positional properties of the compile-time type. If the variable type is a base record, the deconstruct operation returns only the base record properties unless the object is cast to the derived type. The following example demonstrates calling a deconstructor on a derived record.

```csharp
public abstract record Person(string FirstName, string LastName);
public record Teacher(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);
public record Student(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);

public static void Main()
{
    Person teacher = new Teacher("Nancy", "Davolio", 3);
    var (firstName, lastName) = teacher; // Doesn't deconstruct Grade
    Console.WriteLine($"{firstName}, {lastName}");// output: Nancy, Davolio

    var (fName, lName, grade) = (Teacher)teacher;
    Console.WriteLine($"{fName}, {lName}, {grade}");// output: Nancy, Davolio, 3
}
```
## Generic constraints

The `record` keyword is a modifier for either a `class` or `struct` type. Adding the `record` modifier includes the behavior described earlier in this article. There's no generic constraint that requires a type to be a record. A `record class` satisfies the `class` constraint. A `record struct` satisfies the `struct` constraint. For more information, see Constraints on type parameters.

## C# language specification

For more information, see the Classes section of the C# language specification.

For more information about these features, see the following feature proposal notes:

- Records
- Init-only setters
- Covariant returns

## See also

- Design guidelines - Choosing between class and struct
- Design guidelines - Struct design
- The C# type system
- Operator overloading
- `with` expression
