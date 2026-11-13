---
title: "Records (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/record.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Records (part 2 of 3)

## Nondestructive mutation

If you need to copy an instance with some modifications, use a `with` expression to achieve *nondestructive mutation*. A `with` expression creates a new record instance that's a copy of an existing record instance, but with specified properties and fields modified. Use object initializer syntax to specify the values to change, as shown in the following example:

```csharp
public record Person(string FirstName, string LastName)
{
    public string[] PhoneNumbers { get; init; }
}

public static void Main()
{
    Person person1 = new("Nancy", "Davolio") { PhoneNumbers = new string[1] };
    Console.WriteLine(person1);
    // output: Person { FirstName = Nancy, LastName = Davolio, PhoneNumbers = System.String[] }

    Person person2 = person1 with { FirstName = "John" };
    Console.WriteLine(person2);
    // output: Person { FirstName = John, LastName = Davolio, PhoneNumbers = System.String[] }
    Console.WriteLine(person1 == person2); // output: False

    person2 = person1 with { PhoneNumbers = new string[1] };
    Console.WriteLine(person2);
    // output: Person { FirstName = Nancy, LastName = Davolio, PhoneNumbers = System.String[] }
    Console.WriteLine(person1 == person2); // output: False

    person2 = person1 with { };
    Console.WriteLine(person1 == person2); // output: True
}
```
The `with` expression can set positional properties or properties created by using standard property syntax. Explicitly declared properties must have an `init` or `set` accessor to be changed in a `with` expression.

The result of a `with` expression is a *shallow copy*. For a reference property, the expression copies only the reference to an instance. Both the original record and the copy end up with a reference to the same instance.

To implement this feature for `record class` types, the compiler synthesizes a clone method and a copy constructor. The virtual clone method returns a new record initialized by the copy constructor. When you use a `with` expression, the compiler creates code that calls the clone method and then sets the properties that the `with` expression includes.

> **Important:**
> The compiler also synthesizes a public parameterless constructor when the record lacks a primary constructor or any user-defined constructors. This parameterless constructor initializes all fields to their default values. Without this synthesized constructor, no public constructor is available.

If you need different copying behavior, write your own copy constructor in a `record class`. If you do, the compiler doesn't synthesize one. Make your constructor `private` if the record is `sealed`. Otherwise, make it `protected`. The compiler doesn't synthesize a copy constructor for `record struct` types. You can write one, but the compiler doesn't generate calls to it for `with` expressions. The values of the `record struct` are copied on assignment.

You can't override the clone method, and you can't create a member named `Clone` in any record type. The actual name of the clone method is compiler-generated.

> **Important:**
> In the preceding examples, all properties are independent. None of the properties are computed from other property values. A `with` expression first copies the existing record instance, then modifies any properties or fields that the `with` expression includes. Computed properties in `record` types should be computed on access, not initialized when the instance is created. Otherwise, a property could return the computed value based on the original instance, not the modified copy.

You ensure correctness on computed properties by computing the value on access, as shown in the following declaration:

```csharp
public record Point(int X, int Y)
{
    public double Distance => Math.Sqrt(X * X + Y * Y);
}
```
The preceding record type computes the `Distance` when accessed, as shown in the following example:

```csharp
Point p1 = new Point(3, 4);
Console.WriteLine($"Original point: {p1}");
p1 = p1 with { Y = 8 };
Console.WriteLine($"Modified point: {p1}");
// Output:
// Original point: Point { X = 3, Y = 4, Distance = 5 }
// Modified point: Point { X = 3, Y = 8, Distance = 8.54400374531753 }
```
Contrast that approach with the following declaration, where the `Distance` property is computed and cached as part of the initialization of a new instance:

```csharp
public record PointInit(int X, int Y)
{
    public double Distance { get; } = Math.Sqrt(X * X + Y * Y);
}
```
Because `Distance` is computed as part of initialization, the value is computed and cached before the `with` expression changes the value of `Y` in the copy. The result is that the distance is incorrect:

```csharp
PointInit pt1 = new PointInit(3, 4);
Console.WriteLine($"Original point: {pt1}");
pt1 = pt1 with { Y = 8 };
Console.WriteLine($"Incorrect Modified point: {pt1}");
// Output:
// Original point: PointInit { X = 3, Y = 4, Distance = 5 }
// Modified point: PointInit { X = 3, Y = 8, Distance = 5 }
```
The `Distance` computation isn't expensive to compute on each access. However, some computed properties might require access to more data or more extensive computation. In those cases, instead of a record, use a `class` type and compute the cached value when one of the components changes value.

## Built-in formatting for display

Record types have a compiler-generated `System.Object.ToString*` method that displays the names and values of public properties and fields. The `ToString` method returns a string in the following format:

> \<record type name> { \<property name> = \<value>, \<property name> = \<value>, ...}

The string printed for `<value>` is the string returned by the `System.Object.ToString` for the type of the property. In the following example, `ChildNames` is a `System.Array`, where `ToString` returns `System.String[]`:

```
Person { FirstName = Nancy, LastName = Davolio, ChildNames = System.String[] }
```

To implement this feature, in `record class` types, the compiler synthesizes a virtual `PrintMembers` method and a `System.Object.ToString*` override. In `record struct` types, this member is `private`.
The `ToString` override creates a `System.Text.StringBuilder` object with the type name followed by an opening bracket. It calls `PrintMembers` to add property names and values, then adds the closing bracket. The following example shows code similar to what the synthesized override contains:

```csharp
public override string ToString()
{
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.Append("Teacher"); // type name
    stringBuilder.Append(" { ");
    if (PrintMembers(stringBuilder))
    {
        stringBuilder.Append(" ");
    }
    stringBuilder.Append("}");
    return stringBuilder.ToString();
}
```
You can provide your own implementation of `PrintMembers` or the `ToString` override. Examples are provided in the `PrintMembers` formatting in derived records section later in this article. Your implementation of `ToString` might include the `sealed` modifier, which prevents the compiler from synthesizing a `ToString` implementation for any derived records. You can create a consistent string representation throughout a hierarchy of `record` types. (Derived records still have a `PrintMembers` method generated for all derived properties.)
