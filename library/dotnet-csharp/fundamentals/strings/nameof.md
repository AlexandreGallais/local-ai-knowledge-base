---
title: "The nameof operator in C# (part 1 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/strings/nameof.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The `nameof` operator

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the Get started tutorials first. For the complete operator reference, see `nameof` in the language reference.
>
> **Coming from another language?** Other languages have similar features. Java's reflective `Class.getSimpleName()`, JavaScript's `Function.name` and `Object.keys`, Python's `__name__` and `vars()`, and Swift's `#function`/`#keyPath`. Unlike most of those, C#'s `nameof` is a pure compile-time construct. It uses no reflection, allocates nothing at runtime, and produces a constant `string` that's baked into the assembly.

The `nameof` operator returns the textual identifier of a symbol, such as a variable, parameter, type, member, or namespace, as a compile-time `string` constant. Anywhere you'd otherwise hardcode an identifier as a string, use `nameof`: the compiler verifies that the symbol exists, and rename refactorings update the result automatically.

## What `nameof` returns

`nameof` evaluates to the *final* identifier in its operand. It runs at compile time and has no runtime cost.

```csharp
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace NameofSample;

public static class Program
{
    public static void Main()
    {
        ShowBasic();
        ShowGuardClause();
        ShowThrowIfNull();
        ShowPropertyChanged();
        ShowAttributeUsage();
        ShowUnboundGenerics();
        ShowQualifiedName();
    }

    private static void ShowBasic()
    {
        // nameof produces the textual identifier of a symbol at compile time.
        Console.WriteLine(nameof(Customer));        // Customer
        Console.WriteLine(nameof(Customer.Name));   // Name

        var customer = new Customer("Ada");
        Console.WriteLine(nameof(customer));        // customer
        Console.WriteLine(nameof(customer.Name));   // Name
    }

    private static void ShowGuardClause()
    {
        try
        {
            Greet("");
        }
        catch (ArgumentException ex)
        {
            // The exception's ParamName is the literal "name", produced by nameof at compile time.
            Console.WriteLine($"{ex.ParamName}: {ex.Message}");
        }

        static void Greet(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name must be non-empty.", nameof(name));
            }
            Console.WriteLine($"Hello, {name}!");
        }
    }

    private static void ShowThrowIfNull()
    {
        // ArgumentNullException.ThrowIfNull captures the argument's name automatically
        // through [CallerArgumentExpression], so a separate nameof isn't required for
        // the null check. Use nameof for cases the helpers don't cover.
        Customer? maybeCustomer = null;

        try
        {
            Save(maybeCustomer);
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine(ex.ParamName);   // customer
        }

        static void Save(Customer? customer)
        {
            ArgumentNullException.ThrowIfNull(customer);
            // ...
        }
    }

    private static void ShowPropertyChanged()
    {
        var person = new Person();
        person.PropertyChanged += (_, e) => Console.WriteLine($"changed: {e.PropertyName}");

        person.Name = "Ada";    // changed: Name
        person.Name = "Grace";  // changed: Name
    }

    private static void ShowAttributeUsage()
    {
        // nameof works inside attribute arguments. The compiler resolves the
        // identifier even when the attribute targets a method or its parameters.
        Console.WriteLine(NormalizeOrNull("  hi  ") ?? "<null>");   // hi
        Console.WriteLine(NormalizeOrNull(null) ?? "<null>");        // <null>

        [return: NotNullIfNotNull(nameof(input))]
        static string? NormalizeOrNull(string? input) => input?.Trim();
    }

    private static void ShowUnboundGenerics()
    {
        // Beginning in C# 14, nameof accepts an unbound generic type.
        // The result is the simple type name without any type-argument list.
        Console.WriteLine(nameof(List<>));                  // List
        Console.WriteLine(nameof(Dictionary<,>));           // Dictionary
    }

    private static void ShowQualifiedName()
    {
        // For a qualified expression, nameof returns only the final identifier.
        Console.WriteLine(nameof(System.Collections.Generic.List<int>)); // List
        Console.WriteLine(nameof(Customer.Name));                        // Name
    }
}

public sealed record Customer(string Name);

public sealed class Person : INotifyPropertyChanged
{
    private string _name = "";

    public string Name
    {
        get => _name;
        set
        {
            if (_name == value) return;
            _name = value;
            // nameof keeps the property name and the change notification in sync.
            // Renaming the property automatically updates this argument.
            OnPropertyChanged(nameof(Name));
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    private void OnPropertyChanged([CallerMemberName] string? propertyName = null) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```
The operand can also be a *qualified expression*, one that uses the dot operator to navigate from a containing scope to a member, such as `customer.Name`, `System.Console`, or `List<int>.Enumerator`. In that case, only the last identifier is captured: `nameof(customer.Name)` returns `"Name"`, not `"customer.Name"`.
