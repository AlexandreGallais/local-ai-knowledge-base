---
title: "required modifier"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/required.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# required modifier (C# Reference)

The `required` modifier indicates that the *field* or *property* it applies to must be initialized by an object initializer. Any expression that initializes a new instance of the type must initialize all *required members*. The `required` modifier is available starting with C# 11.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

By using the `required` modifier, developers can create types where properties or fields must be properly initialized, yet still allow initialization through object initializers. Several rules ensure this behavior:

- Apply the `required` modifier to *fields* and *properties* declared in `struct` and `class` types, including `record` and `record struct` types. You can't apply the `required` modifier to members of an `interface`.
- You can't mark explicit interface implementations as `required`. You can't set them in object initializers.
- You must initialize required members, but you can initialize them to `null`. If the type is a non-nullable reference type, the compiler issues a warning if you initialize the member to `null`. The compiler issues an error if the member isn't initialized at all.
- Required members must be at least as visible as their containing type. For example, a `public` class can't contain a `required` field that's `protected`. Furthermore, required properties must have setters (`set` or `init` accessors) that are at least as visible as their containing types. Code that creates an instance can't set members that aren't accessible.
- Derived classes can't hide a `required` member declared in the base class. Hiding a required member prevents callers from using object initializers for it. Furthermore, derived types that override a required property must include the `required` modifier.  The derived type can't remove the `required` state. Derived types can add the `required` modifier when overriding a property.
- You can't use a type with any `required` members as a type argument when the type parameter includes the `new()` constraint. The compiler can't enforce that all required members are initialized in the generic code.
- You can't use the `required` modifier on the declaration for positional parameters on a record. You can add an explicit declaration for a positional property that does include the `required` modifier.

Some types, such as positional records, use a primary constructor to initialize positional properties. If any of those properties include the `required` modifier, the primary constructor adds the `SetsRequiredMembers` attribute. This attribute indicates that the primary constructor initializes all required members. You can write your own constructor with the `System.Diagnostics.CodeAnalysis.SetsRequiredMembersAttribute` attribute. However, the compiler doesn't verify that these constructors do initialize all required members. Rather, the attribute asserts to the compiler that the constructor does initialize all required members. The `SetsRequiredMembers` attribute adds these rules to constructors:

- A constructor that chains to another constructor annotated with the `SetsRequiredMembers` attribute, either `this()`, or `base()`, must also include the `SetsRequiredMembers` attribute. That ensures that callers can correctly use all appropriate constructors.
- Copy constructors generated for `record` types have the `SetsRequiredMembers` attribute applied if any of the members are `required`.

> **Warning:**
> The `SetsRequiredMembers` attribute disables the compiler's checks that all `required` members are initialized when an object is created. Use it with caution.

The following code shows a class hierarchy that uses the `required` modifier for the `FirstName` and `LastName` properties:

```csharp
public class Person
{
    public Person() { }

    [SetsRequiredMembers]
    public Person(string firstName, string lastName) =>
        (FirstName, LastName) = (firstName, lastName);

    public required string FirstName { get; init; }
    public required string LastName { get; init; }

    public int? Age { get; set; }
}

public class Student : Person
{
    public Student() : base()
    {
    }

    [SetsRequiredMembers]
    public Student(string firstName, string lastName) :
        base(firstName, lastName)
    {
    }

    public double GPA { get; set; }
}
```
For more information on required members, see Properties and Required member attributes in the C# language specification.
