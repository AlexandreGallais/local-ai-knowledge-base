---
title: "Extension members (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/extension-methods.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Extension members (part 2 of 2)

## Common usage patterns

### Collection Functionality

In the past, it was common to create "Collection Classes" that implemented the `System.Collections.Generic.IEnumerable`1` interface for a given type and contained functionality that acted on collections of that type. While there's nothing wrong with creating this type of collection object, the same functionality can be achieved by using an extension on the `System.Collections.Generic.IEnumerable`1`. Extensions have the advantage of allowing the functionality to be called from any collection such as an `System.Array` or `System.Collections.Generic.List`1` that implements `System.Collections.Generic.IEnumerable`1` on that type. An example of this using an Array of Int32 can be found earlier in this article.

### Layer-Specific Functionality

When using an Onion Architecture or other layered application design, it's common to have a set of Domain Entities or Data Transfer Objects that can be used to communicate across application boundaries. These objects generally contain no functionality, or only minimal functionality that applies to all layers of the application. Extension methods can be used to add functionality that's specific to each application layer.

```csharp
public class DomainEntity
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}

static class DomainEntityExtensions
{
    static string FullName(this DomainEntity value)
        => $"{value.FirstName} {value.LastName}";
}
```
You can declare an equivalent `FullName` property in C# 14 and later using the new extension block syntax:

```csharp
static class DomainEntityExtensions
{
    extension(DomainEntity value)
    {
        string FullName => $"{value.FirstName} {value.LastName}";
    }
}
```
### Extending Predefined Types

Rather than creating new objects when reusable functionality needs to be created, you can often extend an existing type, such as a .NET or CLR type. As an example, if you don't use extension methods, you might create an `Engine` or `Query` class to do the work of executing a query on a SQL Server that might be called from multiple places in our code. However you can instead extend the `Microsoft.Data.SqlClient.SqlConnection` class using extension methods to perform that query from anywhere you have a connection to a SQL Server. Other examples might be to add common functionality to the `System.String` class, extend the data processing capabilities of the `System.IO.Stream` object, and `System.Exception` objects for specific error handling functionality. These types of use-cases are limited only by your imagination and good sense.

Extending predefined types can be difficult with `struct` types because they're passed by value to methods. That means any changes to the struct are made to a copy of the struct. Those changes aren't visible once the extension method exits. You can add the `ref` modifier to the first argument making it a `ref` extension method. The `ref` keyword can appear before or after the `this` keyword without any semantic differences. Adding the `ref` modifier indicates that the first argument is passed by reference. This technique enables you to write extension methods that change the state of the struct being extended (note that private members aren't accessible). Only value types or generic types constrained to struct (For more information about these rules, see the article on the `struct` constraint) are allowed as the first parameter of a `ref` extension method or as the receiver of an extension block. The following example shows how to use a `ref` extension method to directly modify a built-in type without the need to reassign the result or pass it through a function with the `ref` keyword:

```csharp
public static class IntExtensions
{
    public static void Increment(this int number)
        => number++;

    // Take note of the extra ref keyword here
    public static void RefIncrement(this ref int number)
        => number++;
}
```
The equivalent extension blocks are shown in the following code:

```csharp
public static class IntExtensions
{
    extension(int number)
    {
        public void Increment()
            => number++;
    }

    // Take note of the extra ref keyword here
    extension(ref int number)
    {
        public void RefIncrement()
            => number++;
    }
}
```
Different extension blocks are required to distinguish by-value and by-ref parameter modes for the receiver.

You can see the difference applying `ref` to the receiver has in the following example:

```csharp
int x = 1;

// Takes x by value leading to the extension method
// Increment modifying its own copy, leaving x unchanged
x.Increment();
Console.WriteLine($"x is now {x}"); // x is now 1

// Takes x by reference leading to the extension method
// RefIncrement changing the value of x directly
x.RefIncrement();
Console.WriteLine($"x is now {x}"); // x is now 2
```
You can apply the same technique by adding `ref` extension members to user-defined struct types:

```csharp
public struct Account
{
    public uint id;
    public float balance;

    private int secret;
}

public static class AccountExtensions
{
    // ref keyword can also appear before the this keyword
    public static void Deposit(ref this Account account, float amount)
    {
        account.balance += amount;

        // The following line results in an error as an extension
        // method is not allowed to access private members
        // account.secret = 1; // CS0122
    }
}
```
The preceding sample can also be created using extension blocks in C# 14:

```csharp
public static class AccountExtensions
{
    extension(ref Account account)
    {
        // account is the receiver (analogous to the this parameter in extension methods).
        // The ref modifier on the extension block means the receiver is passed by reference.
        public void Deposit(float amount)
        {
            account.balance += amount;

            // The following line results in an error as an extension
            // method is not allowed to access private members
            // account.secret = 1; // CS0122
        }
    }
}
```
You can access these extension methods as follows:

```csharp
Account account = new()
{
    id = 1,
    balance = 100f
};

Console.WriteLine($"I have ${account.balance}"); // I have $100

account.Deposit(50f);
Console.WriteLine($"I have ${account.balance}"); // I have $150
```
## General Guidelines

It's preferable to add functionality by modifying an object's code or deriving a new type whenever it's reasonable and possible to do so. Extension methods are a crucial option for creating reusable functionality throughout the .NET ecosystem. Extension members are preferable when the original source isn't under your control, when a derived object is inappropriate or impossible, or when the functionality has limited scope.

For more information on derived types, see Inheritance.

If you do implement extension methods for a given type, remember the following points:

- An extension method isn't called if it has the same signature as a method defined in the type.
- Extension methods are brought into scope at the namespace level. For example, if you have multiple static classes that contain extension methods in a single namespace named `Extensions`, all of them are brought into scope by the `using Extensions;` directive.

For a class library that you implemented, you shouldn't use extension methods to avoid incrementing the version number of an assembly. If you want to add significant functionality to a library for which you own the source code, follow the .NET guidelines for assembly versioning. For more information, see Assembly Versioning.

## See also

- Parallel Programming Samples (many examples demonstrate extension methods)
- Lambda Expressions
- Standard Query Operators Overview
