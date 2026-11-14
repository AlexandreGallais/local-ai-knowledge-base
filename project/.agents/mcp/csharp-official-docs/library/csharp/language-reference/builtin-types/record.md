---
title: "Records (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/record.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Records (C# reference)

The `record` modifier provides built-in functionality for encapsulating data. The `record class` and `record` syntax define reference types. The `record struct` syntax defines a value type.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

When you declare a primary constructor on a record, the compiler generates public properties for the primary constructor parameters. The primary constructor parameters to a record are *positional parameters*. The compiler creates *positional properties* that mirror the primary constructor or positional parameters. The compiler doesn't synthesize properties for primary constructor parameters on types that don't have the `record` modifier.

The following two examples demonstrate `record` (or `record class`) reference types:

```csharp
public record Person(string FirstName, string LastName);
```
```csharp
public record Person
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
};
```
The following two examples demonstrate `record struct` value types:

```csharp
public readonly record struct Point(double X, double Y, double Z);
```
```csharp
public record struct Point
{
    public double X { get; init; }
    public double Y { get; init; }
    public double Z { get; init; }
}
```
You can also create records with mutable properties and fields:

```csharp
public record Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
};
```
Record structs can be mutable as well, both positional record structs and record structs with no positional parameters:

```csharp
public record struct DataMeasurement(DateTime TakenAt, double Measurement);
```
```csharp
public record struct Point
{
    public double X { get; set; }
    public double Y { get; set; }
    public double Z { get; set; }
}
```
While records can be mutable, they're primarily intended for supporting immutable data models. The record type offers the following features:

* Concise syntax for creating a reference type with immutable properties
* Built-in behavior useful for a data-centric reference type:
  * Value equality
  * Concise syntax for nondestructive mutation
  * Built-in formatting for display
* Support for inheritance hierarchies

The preceding examples show some distinctions between records that are reference types and records that are value types:

- A `record` or a `record class` declares a reference type. The `class` keyword is optional, but can add clarity for readers. A `record struct` declares a value type.
- Positional properties are *immutable* in a `record class` and a `readonly record struct`. They're *mutable* in a `record struct`.

The remainder of this article discusses both `record class` and `record struct` types. The differences are detailed in each section. Decide between a `record class` and a `record struct` similar to deciding between a `class` and a `struct`. The term *record* describes behavior that applies to all record types. Either `record struct` or `record class` is used to describe behavior that applies to only struct or class types, respectively.

## Positional syntax for property and field definition

Use positional parameters to declare properties of a record or to initialize property or field values. The following example creates a record with two positional properties:

```csharp
public record Person(string FirstName, string LastName);

public static void Main()
{
    Person person = new("Nancy", "Davolio");
    Console.WriteLine(person);
    // output: Person { FirstName = Nancy, LastName = Davolio }
}
```
When you use the positional syntax for property definition, the compiler creates:

* A public automatically implemented property for each positional parameter provided in the record declaration.
  - For `record` types and `readonly record struct` types: An init-only property.
  - For `record struct` types: A read-write property.
* A primary constructor whose parameters match the positional parameters on the record declaration.
* For record struct types, a parameterless constructor that sets each field to its default value.
* A `Deconstruct` method with an `out` parameter for each positional parameter provided in the record declaration. The method deconstructs properties defined by using positional syntax; it ignores properties that are defined by using standard property syntax.

You might want to add attributes to any of these elements the compiler creates from the record definition. You can add a *target* to any attribute you apply to the positional record's properties. The following example applies the `System.Text.Json.Serialization.JsonPropertyNameAttribute` to each property of the `Person` record. The `property:` target indicates that the attribute is applied to the compiler-generated property. Other values are `field:` to apply the attribute to the field, and `param:` to apply the attribute to the parameter.

```csharp
/// <summary>
/// Person record type
/// </summary>
/// <param name="FirstName">First Name</param>
/// <param name="LastName">Last Name</param>
/// <remarks>
/// The person type is a positional record containing the
/// properties for the first and last name. Those properties
/// map to the JSON elements "firstName" and "lastName" when
/// serialized or deserialized.
/// </remarks>
public record Person([property: JsonPropertyName("firstName")] string FirstName,
    [property: JsonPropertyName("lastName")] string LastName);
```
The preceding example also shows how to create XML documentation comments for the record. You can add the `<param>` tag to add documentation for the primary constructor's parameters.

If the generated automatically implemented property definition isn't what you want, define your own property or field of the same name. For example, you might want to change accessibility or mutability, or provide an implementation for either the `get` or `set` accessor. If you declare the member in your source, you must initialize it from the positional parameter of the record. If your property is an automatically implemented property, you must initialize the property. If you add a backing field in your source, you must initialize the backing field. The generated deconstructor uses your property or field definition. For instance, the following example declares the `FirstName` and `LastName` properties of a positional record `public`, but restricts the `Id` positional parameter to `internal`. You can use this syntax for records and record struct types.

```csharp
public record Person(string FirstName, string LastName, string Id)
{
    internal string Id { get; init; } = Id;
}

public static void Main()
{
    Person person = new("Nancy", "Davolio", "12345");
    Console.WriteLine(person.FirstName); //output: Nancy

}
```
If you want to create a field instead of a property, assign the positional parameter to a field, as shown in the following example:

```csharp
public record Person(string FirstName, string LastName, string Id)
{
    internal readonly string Id = Id; // this.Id set to parameter Id
}

public static void Main()
{
    Person person = new("Nancy", "Davolio", "12345");
    Console.WriteLine(person.FirstName); //output: Nancy

}
```
A record type doesn't have to declare any positional properties. You can declare a record without any positional properties, and you can declare other fields and properties, as in the following example:

```csharp
public record Person(string FirstName, string LastName)
{
    public string[] PhoneNumbers { get; init; } = [];
};
```
Properties that the compiler generates from positional parameters are `public`. You declare the access modifiers on any properties you explicitly declare.

## Immutability

A *positional record class* and a *positional readonly record struct* declare init-only properties. A *positional record struct* declares read-write properties. You can override either of those defaults, as shown in the previous section.

Immutability might be useful when you need a data-centric type to be thread-safe or when you depend on a hash code remaining the same in a hash table. However, immutability isn't appropriate for all data scenarios. Entity Framework Core, for example, doesn't support updating with immutable entity types.

Init-only properties, whether created from positional parameters (`record class` and `readonly record struct`) or by specifying `init` accessors, have *shallow immutability*. After initialization, you can't change the value of value-type properties or the reference of reference-type properties. However, the data that a reference-type property refers to can be changed. The following example shows that the content of a reference-type immutable property (an array in this case) is mutable:

```csharp
public record Person(string FirstName, string LastName, string[] PhoneNumbers);

public static void Main()
{
    Person person = new("Nancy", "Davolio", new string[1] { "555-1234" });
    Console.WriteLine(person.PhoneNumbers[0]); // output: 555-1234

    person.PhoneNumbers[0] = "555-6789";
    Console.WriteLine(person.PhoneNumbers[0]); // output: 555-6789
}
```
The features unique to record types are implemented by compiler-synthesized methods, and none of these methods compromises immutability by modifying object state. Unless specified, the synthesized methods are generated for `record`, `record struct`, and `readonly record struct` declarations.

## Value equality

If you don't override or replace equality methods, the type you declare governs how equality is defined:

- For `class` types, two objects are equal if they refer to the same object in memory.
- For `struct` types, two objects are equal if they are of the same type and store the same values.
- For types with the `record` modifier (`record class`, `record struct`, and `readonly record struct`), two objects are equal if they are of the same type and store the same values.

The definition of equality for a `record struct` is the same as for a `struct`. The difference is that for a `struct`, the implementation is in `System.ValueType.Equals(System.Object)` and relies on reflection. For records, the implementation is compiler synthesized and uses the declared data members.

Reference equality is required for some data models. For example, Entity Framework Core depends on reference equality to ensure that it uses only one instance of an entity type for what is conceptually one entity. For this reason, records and record structs aren't appropriate for use as entity types in Entity Framework Core.

The following example illustrates value equality of record types:

```csharp
public record Person(string FirstName, string LastName, string[] PhoneNumbers);

public static void Main()
{
    var phoneNumbers = new string[2];
    Person person1 = new("Nancy", "Davolio", phoneNumbers);
    Person person2 = new("Nancy", "Davolio", phoneNumbers);
    Console.WriteLine(person1 == person2); // output: True

    person1.PhoneNumbers[0] = "555-1234";
    Console.WriteLine(person1 == person2); // output: True

    Console.WriteLine(ReferenceEquals(person1, person2)); // output: False
}
```
To implement value equality, the compiler synthesizes several methods, including:

* An override of `System.Object.Equals(System.Object)`. It's an error if you declare the override explicitly.

  This method is used as the basis for the `System.Object.Equals(System.Object,System.Object)` static method when both parameters are non-null.

* A `virtual`, or `sealed`, `Equals(R? other)` where `R` is the record type. This method implements `System.IEquatable`1`. You can declare this method explicitly.

* If the record type is derived from a base record type `Base`, `Equals(Base? other)`. It's an error if you declare the override explicitly. If you provide your own implementation of `Equals(R? other)`, provide an implementation of `GetHashCode` also.

* An override of `System.Object.GetHashCode`. You can declare this method explicitly.

* Overrides of operator `==` and operator `!=`. It's an error if you declare the operators explicitly.

* If the record type is derived from a base record type, `protected override Type EqualityContract { get; };`. You can declare this property explicitly. For more information, see Equality in inheritance hierarchies.

The compiler doesn't synthesize a method when a record type has a method that matches the signature of a synthesized method and the method is allowed to be declared explicitly.
